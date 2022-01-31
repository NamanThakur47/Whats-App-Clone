import  { Server } from 'socket.io';

const PORT = 7000;

const io = new Server(PORT,{
    cors:{
        origin:'http://localhost:3000'
    }
})

let users = [];

const addUser = (userId,socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}


const removeUser = (socketId) =>{
    users = users.filter(user => user.socketId != socketId);
}


io.on('connection', (socket) => {
    console.log('User Connected');

    // Connecting Socket
    socket.on('addUser', userId => {
        addUser(userId,socket.id);
        io.emit('getUsers' , users);
        console.log(users);
    })

    // Send Message Socket
    socket.on('sendMessage', ({senderId, receiverId, text}) =>{
        const user = getUser(receiverId);
        console.log(text);
        io.to(user.socketId).emit('getMessage',{
            senderId,text
        })
    })

        
    // User Disconnection Case :-//
    socket.on('disconnect',() =>{
        console.log('User Disconnected');
        removeUser(socket.id);
        io.emit('getUsers' , users);
    })
})


