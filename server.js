import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// It's a quick hack to import characters if we need server-side random validation,
// but to keep server simple, we'll just track ID and Role picking.
// Since ES Modules is a bit tricky with paths, we'll keep the server state generic.

const app = express();
app.use(cors());

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, "dist")));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] } // Allow any origin in production to simplify setup
});

// Game State
const rooms = {};
let matchmakingQueue = null;

function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for(let i=0; i<6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Create private room
  socket.on("create_room", (playerName) => {
    const code = generateRoomCode();
    rooms[code] = {
      code,
      players: [{ id: socket.id, name: playerName, team: 0 }],
      status: "waiting",
      currentTurn: 0,
      drawnIds: [],
    };
    socket.join(code);
    socket.emit("room_created", code);
  });

  // Join private room
  socket.on("join_room", ({ code, playerName }) => {
    const room = rooms[code];
    if (room && room.status === "waiting" && room.players.length === 1) {
      room.players.push({ id: socket.id, name: playerName, team: 1 });
      room.status = "playing";
      socket.join(code);
      
      // Notify both players game is starting
      io.to(code).emit("game_start", {
        players: room.players,
        turn: room.currentTurn
      });
    } else {
      socket.emit("error", "Room not found or full");
    }
  });

  // Random Matchmaking
  socket.on("find_match", (playerName) => {
    if (matchmakingQueue) {
      // Pair them up
      const code = generateRoomCode();
      const p1 = matchmakingQueue;
      const p2 = { socket, id: socket.id, name: playerName };
      
      rooms[code] = {
        code,
        players: [
          { id: p1.id, name: p1.name, team: 0 },
          { id: p2.id, name: p2.name, team: 1 }
        ],
        status: "playing",
        currentTurn: 0,
        drawnIds: [],
      };
      
      p1.socket.join(code);
      p2.socket.join(code);
      
      io.to(code).emit("game_start", {
        players: rooms[code].players,
        turn: 0
      });
      matchmakingQueue = null;
    } else {
      // Waiting in queue
      matchmakingQueue = { socket, id: socket.id, name: playerName };
    }
  });

  socket.on("cancel_match", () => {
    if (matchmakingQueue && matchmakingQueue.id === socket.id) {
      matchmakingQueue = null;
    }
  });

  // Game Moves
  // Note: we could do server-side validation here, but for now we trust the client logic
  socket.on("game_action", ({ roomCode, type, payload }) => {
    const room = rooms[roomCode];
    if (!room) return;
    
    // Broadcast action to the OTHER player
    socket.to(roomCode).emit("opponent_action", { type, payload });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    if (matchmakingQueue && matchmakingQueue.id === socket.id) matchmakingQueue = null;
    
    // Find if they were in a room
    for (const code in rooms) {
      const room = rooms[code];
      const isPlayer = room.players.some(p => p.id === socket.id);
      if (isPlayer) {
        socket.to(code).emit("opponent_disconnected");
        delete rooms[code]; // End game
      }
    }
  });
});

// Catch-all to serve index.html for React SPA (Express 5 Regex format)
app.get("(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`One Piece Game running on port ${PORT}`);
});
