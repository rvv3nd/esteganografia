module.exports = function(io){
    io.on('connection', socket =>{
        console.log("Nuevo usuario conectado")

        socket.on('send message',function(text){
            io.sockets.emit('new message',text)
        })

    })
}