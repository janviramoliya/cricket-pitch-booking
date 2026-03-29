const { Server } = require("socket.io");
const { CustomAPIError } = require("./src/errors");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // adjust in production
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join room (pitch + date)
    socket.on("join_slot_room", ({ pitchId, bookingDate }) => {
      const room = `slots:${pitchId}:${bookingDate}`;
      socket.join(room);
      console.log(`Socket ${socket.id} joined ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) throw new CustomAPIError("Socket.io not initialized");
  return io;
};

module.exports = { initSocket, getIO };
