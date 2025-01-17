const { Server } = require("socket.io");

let io; // Stocke l'instance du serveur Socket.IO
let usernames = []; // list all usernames 
const users = {}; 
const sockets = {}; 

const initializeSocket = (server) => {

    console.log(`Initializing IO server`);
    io = new Server(server, {
      cors: {
        origin: "http://localhost:5173", 
      },
    });
  
    // All event for the socket
    io.on("connection", (socket) => { 

        console.log(`User connected with socket ID: ${socket.id}`);
        

        socket.on("login", (username) => {
            users[username] = socket.id; // link the username to the socket ID
            sockets[socket.id] = username; // link the socket ID to the username
            usernames.push(username); // add the username to the list

            console.log(`${username} logged in with socket ID: ${socket.id}`);

            socket.join("default"); // test

            socket.emit('welcome', { username });

            io.emit("update-user-list", Object.keys(users)); // all user connected
            console.log(`All connected users : ${usernames}`);
          });

        // when the user disconnect
        socket.on("disconnect", () => {
            
            const username = sockets[socket.id];
            console.log(`${username} logged out`);

            const index = usernames.indexOf(username);
            if (index !== -1) {
                usernames.splice(index, 1);
            }
            delete sockets[socket.id]; // delete the socket from the list
            delete users[username]; // delete the user from the list

            console.log( Object.keys(users));
          });
        
        socket.on("logout", (username) => {

          if (users[username]) {
              console.log(`${username} logged out`);
              // Supprime les données utilisateur
              delete sockets[users[username]];
              delete users[username];
      
              const index = usernames.indexOf(username);
              if (index !== -1) {
                  usernames.splice(index, 1);
              }
      
              // Informe les autres clients
              io.emit("update-user-list", Object.keys(users));
              console.log(`${username} s'est déconnecté via logout.`);
              console.log(`All connected users : ${usernames}`);
          }});
        

        socket.on("say to someone", (username, msg) => {
            // send a private message to the socket with the given id
            socket.to(id).emit("my message", msg);
          });

        socket.on("list-connected-users", (arg1, callback) => {
            console.log(users)
            callback(
              {users: Object.keys(users)

              });
          });

        socket.on("send-message", (receiver, message) => {
          console.log(users)
          console.log((`${sockets[socket.id]} is trying to send a message.`))

          socket_id_receiver = users[receiver]; 
          console.log(socket_id_receiver)
          
          sender = sockets[socket.id]

          if (receiver) {

            // user connected
            socket.to(socket_id_receiver).emit("receive-message", {
              sender,
              message,
            });
            console.log(`Message from ${sender} to ${receiver}: ${message}`);
          } else {
            // Le destinataire n'est pas connecté
            console.log(`Message from ${sender} to ${receiver} failed: User not connected`);
          }
          
        });

    });
  };

const getSocketIo = () => {
    if (!io) throw new Error("Socket.IO not initialized");
    return io;
  };

module.exports = { initializeSocket, getSocketIo };

  // si on a une valeur dans le form on l'envoie sur socket io
// if (input.value) {
//    socket.emit('chat message', input.value);
//    input.value = '';
//}

// puis on a besoin d'un event chat message pour recevoir le message et l'afficher
//socket.on('chat message', (msg) => {
 //   console.log('message: ' + msg);
//  }); msg correspond à input.value