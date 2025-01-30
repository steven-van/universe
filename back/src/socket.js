const { Server } = require("socket.io");
const BodyguardAPI = require("./bodyguardAPI");
const messageService = require("./services/messageService");
const conversationService =  require("./services/conversationService");

let io; // Stocke l'instance du serveur Socket.IO
let = []; // list all 
 
const users = {}; 
const sockets = {}; 
const userIds = [];

function handleUserDisconnection(userId, socketId) {
  if (userId) {
    console.log(`${userId} is being removed`);

    const index = userIds.indexOf(userId);
    if (index !== -1) {
      userIds.splice(index, 1);
    }

    delete sockets[socketId];
    delete users[userId];

    io.emit("list-connected-users", Object.keys(users));

    console.log(`Users remaining: ${Object.keys(users)}`);
  }
}

const initializeSocket = (server) => {

    console.log(`Initializing IO server`);
    io = new Server(server, {
      cors: {
        origin: "http://localhost:5173", 
        credentials: true
      },
    });
  
    // All event for the socket
    io.on("connection", (socket) => { 

        console.log(`User connected with socket ID: ${socket.id}`);
        

        socket.on("login", (userId) => {
            
            users[userId] = socket.id; // link the userId to the socket ID
            sockets[socket.id] = userId; // link the socket ID to the userId
            userIds.push(userId); // add the userId to the list
            //socket.userId = data.userId;
            console.log(`${userId} logged in with socket ID: ${socket.id}`);

            socket.join("default"); // test

            socket.emit('welcome', { userId });

            io.emit("update-user-list", Object.keys(users)); // all user connected
            console.log(`All connected users : ${userIds}`);
          });

          // connection error 
          socket.on("disconnect", () => {
            const userId = sockets[socket.id];
            console.log(`Socket disconnected: ${socket.id}`);
            handleUserDisconnection(userId, socket.id);
          });
        
          // User choose to log out 
          socket.on("logout", (userId) => {
            console.log(`User logged out: ${userId}`);
            handleUserDisconnection(userId, socket.id);
          });


        
        socket.on("list-connected-users", (arg1, callback) => {
            console.log(users)
            callback(
              {users: Object.keys(users)

              });
          });

        socket.on("send-message", async (data, callback ) => {

          // fonction pour récupérer l'userId d'une personne grâce a son id 
        
          const userId_receiver = data.userId_receiver;
          const message = data.message;
          const sender_id = data.sender_id;
          const recipient_id = data.recipient_id;
          const conversation_id = data.conversation_id;

          const currentDate_message = new Date();

          const response = await BodyguardAPI.analyzeMessage(message, currentDate_message);
          const recommendedAction = response.data[0].recommendedAction
          const type = response.data[0].type

          // console.log((`${sockets[socket.id]} is trying to send a message.`));

          if (recommendedAction == 'REMOVE') {
            console.log(`Message from ${sockets[socket.id]} to ${receiver} failed: Message refused by Bodyguard because type : ${type} `);
            
            socket.to(socket_id_receiver).emit("receive-message", {
              newMessage
             });

            callback({
              success: false,
              errorMessage: "Attention, veuillez rester bienveillant envers votre prochain",
            });
            return;
          }
          else{
            socket_id_receiver = users[userId_receiver];           
            sender = sockets[socket.id]

            if (socket_id_receiver) {
                
              console.log(`Message from ${sender} to ${userId_receiver}: ${message}`);
              //création en base de données
              const newMessage = await messageService.createmessage({ text_message: message, status_message: type,sender_id: sender_id, receiver_id: recipient_id, conversation_id: conversation_id });

              socket.to(socket_id_receiver).emit("receive-message", {
               newMessage
              });
              
              callback({
                success: true,
              });
              console.log(`Message from ${sender} to ${userId_receiver} saved in the database`);
            } 
            else {
              // Le destinataire n'est pas connecté
              console.log(`Message from ${sender} to ${userId_receiver} failed: User not connected`);
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