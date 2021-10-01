$(function(){
    const socket = io();
    //console.log('works!')

    //getting items from html
    const $msgForm = $('#mensaje-form')
    const $msg = $('#mensaje')
    const $chat = $('#chat')

    //eventos
    $msgForm.submit( e => {
        e.preventDefault()
        console.log('sending data')
        var angulos = []
        for(let i=1;i<=10;i++){
            angulos.push(Number($('#arrow_'+i).attr("alt")))
        }
        const txt = $msg.val() //falta codificar el mensaje codifica($msg.val())
        $msg.val("");
        socket.emit('send message',txt) 
    })

    socket.on('new message', function(text){
        $chat.append('<p id="msg_onchat">'+text+'</p>'+'<br>')
        $("#msg_onchat").click(function(){
            alert(text)
        })
    })
})

function rotar(id){
    var val = Number($("#"+id).attr("alt")) + 45
    console.log(val)
    $("#"+id).css("transform",'rotate('+(val)+'deg)')
    $("#"+id).css("transition",".5s")
    if(val>=360) val = 0
    $("#"+id).attr("alt",val)
}