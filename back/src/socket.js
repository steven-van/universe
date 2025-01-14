const { Server } = require("socket.io");
const { createServer } = require("http");


let io; // Stocke l'instance du serveur Socket.IO
const users = {}; // Stocke les utilisateurs connectés
const sockets = {}; // Stocke les sockets des utilisateurs connectés

const initializeSocket = (server) => {

    io = new Server(server, {
      cors: {
        origin: "http://localhost:3000", 
      },
    });
  
    // All event for the socket
    io.on("connection", (socket) => { 

        console.log(`User connected with socket ID: ${socket.id}`);
        

        socket.on("login", (username) => {
            users[username] = socket.id; // Associe le socket ID à l'username
            sockets[socket.id] = username; // Associe le username au socket ID

            console.log(`${username} logged in with socket ID: ${socket.id}`);
            io.emit("update-user-list", Object.keys(users)); // Diffuse la liste des utilisateurs connectés
          });

        // quand un user se deconnecte
        socket.on("disconnect", () => {
            
            const username = sockets[socket.id];
            console.log(`${username} logged out`);
            delete sockets[socket.id]; // Supprime le socket ID de la liste
            delete users[username]; // Supprime le username de la liste

            console.log(usernames);
          });

        socket.on("say to someone", (id, msg) => {
            // send a private message to the socket with the given id
            socket.to(id).emit("my message", msg);
            });

        socket.on("send-private-message", ({ tosomeone, message }) => {

            const fromUsername = sockets[socket.id]; // Récupère l'expéditeur
            const toSocketId = users[tosomeone]; // Trouve le socket ID du destinataire
            
            if (toSocketId) {
                const timestamp = new Date().toLocaleTimeString(); // Horodatage du message
                io.to(toSocketId).emit("receive-private-message", {
                from: fromUsername,
                text: message,
                timestamp,
                });
                console.log(`Message from ${fromUsername} to ${toUsername}: ${message}`);
            } else {
                console.log(`User ${toUsername} not found.`);
            }
            });

    });
  };

module.exports = { initializeSocket };

  // si on a une valeur dans le form on l'envoie sur socket io
// if (input.value) {
//    socket.emit('chat message', input.value);
//    input.value = '';
//}

// puis on a besoin d'un event chat message pour recevoir le message et l'afficher
//socket.on('chat message', (msg) => {
 //   console.log('message: ' + msg);
//  }); msg correspond à input.value