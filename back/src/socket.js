const { Server } = require("socket.io");
const BodyguardAPI = require("./bodyguardAPI");
const messageService = require("./services/messageService");

let io; // Stocke l'instance du serveur Socket.IO
let 
 = []; // list all 
 
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
        

        socket.on("login", (email) => {
            users[email] = socket.id; // link the email to the socket ID
            sockets[socket.id] = email; // link the socket ID to the email
            emails.push(email); // add the email to the list

            console.log(`${email} logged in with socket ID: ${socket.id}`);

            socket.join("default"); // test

            socket.emit('welcome', { email });

            io.emit("update-user-list", Object.keys(users)); // all user connected
            console.log(`All connected users : ${emails}`);
          });

        // when the user disconnect
        socket.on("disconnect", () => {
            
            const email = sockets[socket.id];
            console.log(`${email} logged out`);

            const index = emails.indexOf(email);
            if (index !== -1) {
                emails.splice(index, 1);
            }
            delete sockets[socket.id]; // delete the socket from the list
            delete users[email]; // delete the user from the list

            console.log( Object.keys(users));
          });
        
        socket.on("logout", (email) => {

          if (users[email]) {
              console.log(`${email} logged out`);
              // Supprime les données utilisateur
              delete sockets[users[email]];
              delete users[email];
      
              const index = emails.indexOf(email);
              if (index !== -1) {
                  emails.splice(index, 1);
              }
      
              // Informe les autres clients
              io.emit("update-user-list", Object.keys(users));
              console.log(`${email} s'est déconnecté via logout.`);
              console.log(`All connected users : ${emails}`);
          }});
        
        socket.on("list-connected-users", (arg1, callback) => {
            console.log(users)
            callback(
              {users: Object.keys(users)

              });
          });

        socket.on("send-message", async (receiver, message, sender_id, recipient_id, conversation_id ) => {

          const currentDate_message = new Date();
          const response = await BodyguardAPI.analyzeMessage(message, currentDate_message);
          
          const recommendedAction = response.data[0].recommendedAction
          const type = response.data[0].type

          console.log(response);  

          console.log(users);
          console.log((`${sockets[socket.id]} is trying to send a message.`));

          if (recommendedAction == 'REMOVE') {
            console.log(`Message from ${sockets[socket.id]} to ${receiver} failed: Message refused by Bodyguard because type : ${type} `);
            console.log(`Message from not saved in the database`);
            socket.emit("error-notification", {
              type: "warning",
              text: "Attention, veuillez rester bienveillant envers votre prochain",
            });
            return;
          }
          else{
            socket_id_recipient = users[receiver];           
            sender = sockets[socket.id]

            if (socket_id_receiver) {
              
              // user connected
              socket.to(socket_id_receiver).emit("receive-message", {
                sender,
                message,
              });
              
              console.log(`Message from ${sender} to ${receiver}: ${message}`);
              //création en base de données
              await messageService.createmessage({ texte_message: message, status_message: type,senderID: sender_id, recipientID: recipient_id, conversationID: conversation_id });
              console.log(`Message from ${sender} to ${receiver} saved in the database`);
            } 
            else {
              // Le destinataire n'est pas connecté
              console.log(`Message from ${sender} to ${receiver} failed: User not connected`);
            }
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