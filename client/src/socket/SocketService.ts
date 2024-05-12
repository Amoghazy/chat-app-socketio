// socketService.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function createSocketConnection(token: string | null) {
  if (socket) {
    socket.disconnect();
  }
  if (token) {
    socket = io(import.meta.env.VITE_SERVER_URL, {
      auth: {
        token: token,
      },
    });
  }
}

export function getSocketInstance(): Socket | null {
  return socket;
}
