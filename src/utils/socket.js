import { io } from "socket.io-client";

// In production (e.g. Render), we connect to the same origin correctly.
// In development, we fallback to localhost:3001.
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? "http://localhost:3001" : window.location.origin);

export const socket = io(SOCKET_URL, {
  autoConnect: false // We will connect manually when entering online modes
});
