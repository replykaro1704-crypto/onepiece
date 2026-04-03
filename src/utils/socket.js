import { io } from "socket.io-client";

// Connect to localhost backend (Vite dev server usually runs on 5173, backend on 3001)
// For production, this would be your absolute backend URL or empty for same-origin
const SOCKET_URL = "http://localhost:3001";
export const socket = io(SOCKET_URL, {
  autoConnect: false // We will connect manually when entering online modes
});
