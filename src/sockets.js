module.exports = function(io){
    io.on('connection', socket =>{
        console.log("Nuevo usuario conectado")

        socket.on('send message',function(){
            io.sockets.emit('new message')
        })

    })
}