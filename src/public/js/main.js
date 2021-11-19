
const ascii = [
    "␀","␁","␂", "␃","␄",
    "␅","␆", "␇", "␈", "␉",
    "␊", "␋",  "␌",  "␍", "␎",
    "␏", "␐", "␑", "␒","␓",    
    "␔","␕", "␖", "␗","␘",
    "␙", "␚", "␛", "␜", "␝",
    "␞", "␟",  "␡", 
    " ",  "!",   "\"", "#",    
    "$",  "%",   "&",   "'",  "(",    
    ")",  "*",   "+",   ",",  "-",    
    ".",  "/",   "0",   "1",  "2",    
    "3",  "4",   "5",   "6",  "7",    
    "8",  "9",   ":",   ";",  "<",    
    "=",  ">",   "?",   "@",  "A",    
    "B",  "C",   "D",   "E",  "F",    
    "G",  "H",   "I",   "J",  "K",    
    "L",  "M",   "N",   "O",  "P",    
    "Q",  "R",   "S",   "T",  "U",    
    "V",  "W",   "X",   "Y",  "Z",    
    "[",  "\\",  "]",   "^",  "_",    
    "`",  "a",   "b",   "c",  "d",    
    "e",  "f",   "g",   "h",  "i",    
    "j",  "k",   "l",   "m",  "n",    
    "o",  "p",   "q",   "r",  "s",    
    "t",  "u",   "v",   "w",  "x",    
    "y",  "z",   "{",   "|",  "}",    
    "~",         "Ç",   "ü",  "é",
    "â",  "ä",   "à",   "å",  "ç",
    "ê",  "ë",   "è",   "ï",  "î",
    "ì",  "Ä",   "Å",   "É",  "æ",
    "Æ",  "ô",   "ö",   "ò",  "û",
    "ù",  "ÿ",   "Ö",   "Ü",  "ø",
    "£",  "Ø",   "×",   "ƒ",  "á",    
    "í",  "ó",   "ú",   "ñ",  "Ñ",   
    "ª",  "º",   "¿",   "®",  "¬",    
    "½",  "¼",   "¡",   "«",  "»",    
    "░",  "▒",   "▓",   "│",  "┤",
    "Á",  "Â",   "À",   "©",  "╣",
    "║",  "╗",   "╝",   "¢",  "¥",
    "┐",  "└",   "┴",   "┬",  "├",    
    "─",  "┼",   "ã",   "Ã",  "╚",
    "╔",  "╩",   "╦",   "╠",  "═",
    "╬",  "¤",   "ð",   "Ð",  "Ê",
    "Ë",  "È",   "ı",   "Í",  "Î",
    "Ï",  "┘",   "┌",   "█",  "▄",
    "¦",  "Ì",   "▀",   "Ó",  "ß",
    "Ô",  "Ò",   "õ",   "Õ",  "µ",
    "þ",  "Þ",   "Ú",   "Û",  "Ù",
    "ý",  "Ý",   "¯",   "´",  "≡",
    "±",  "‗",   "¾",   "¶",  "§",
    "÷",  "¸",   "°",   "¨",  "·",
    "¹",  "³",   "²",   "■",  " "
  ]

// const key = "zÇ{ouvw}kx" // == qwertyuiop

$(function(){
    const socket = io();
    //console.log('works!')

    //getting items from html
    const $msgForm = $('#mensaje-form')
    const $msg = $('#mensaje')
    const $chat = $('#chat')
    const $nickForm = $('#nickForm')
    const $nickName = $('#nickName')
    //eventos
    $msgForm.submit( e => {
        e.preventDefault()
        console.log('sending data')
        const img_file = document.getElementById("image_to_use").files[0];
        console.log(`file: ${img_file.name} size: ${img_file.size}`)
        var img = document.createElement('img')
        img.src = URL.createObjectURL(img_file)
        img.onload = function(){
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            var imageData = context.getImageData(0,0,img.naturalWidth,img.naturalHeight)
            var pixeles = imageData.data
            console.log(pixeles)
            var newcanvas = document.createElement('canvas');
            var ctx = newcanvas.getContext('2d');
            newcanvas.width = img.naturalWidth
            newcanvas.height = img.naturalHeight
            // console.log($('#mensaje').val())
            var newImageData = new ImageData(codifica(pixeles,$('#mensaje').val()),img.naturalWidth,img.naturalHeight)
            ctx.putImageData(newImageData,0,0)
            var newpixeles = newImageData.data
            console.log(newpixeles)
            let l = $('#mensaje').val().length
            $chat.append(newcanvas)
            var date = new Date()
            $chat.append('<p class="msg_onchat">'+$('#user_name').val()+' at '+ date.getHours()+':'+date.getMinutes()+'<br><br>')
            socket.emit('send message') 
            $(".msg_onchat").click(function(){
                alert(decodifica(newpixeles,l))
            })
        }   


        // const bytesResultado = codifica($msg.val(),/*Aqui entra la imagen*/) 
    })

    $nickForm.submit(e =>{
        e.preventDefault()
        if(claveValida($('#password').val())){
            console.log('Iniciando sesión')
            $('#user_name').append('<p id="my_user">'+'<i class="far fa-user"></i> '+$nickName.val()+'<p>')
            $('#containerWrap').css('display','block')
            $('#nickWrap').css('display','none')
        }
        else{
            alert("Contraseña incorrecta")
        }
    })

    socket.on('new message', function(){
        $msg.val("");
        $chat.scrollTop($chat.prop('scrollHeight'))
    })
})

function claveValida(attemp){
    return true
    // return (cipherCajas(attemp) == key) ? true : false   
}

function codifica(array,msg){
    //[rojo, verde, azul, y alfa]
    let i = 0
    let j = 3
    // console.log(msg.length)
    while (i<msg.length){
        // console.log(`${array[j]} por ${ascii.indexOf(msg[i])}`)
        array[j] = ascii.indexOf(msg[i])
        j += 4
        i++
    }
    return array
}

function decodifica(pixeles,l){   
    text = ""
    let i = 0
    let j = 3
    console.log(typeof(pixeles))
    while(i<l){
        console.log(`${pixeles[j]} por ${ascii[pixeles[j]]}`)
        text += ascii[pixeles[j]]
        j += 4
        i++
    }
    return text
}

//funciones auxiliares 
function binarioADecimal(num) {
    let sum = 0;

    for (let i = 0; i < num.length; i++) {
       sum += +num[i] * 2 ** (num.length - 1 - i);
    }
    return sum;
}
