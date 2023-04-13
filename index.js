// Equipe10
// 12/04/2023
// Érika Messias Rodrigues, RA: 183591, 3° Semestre SI
// Vitoria Izaine dos Santos, RA: 193034, 3° Semestre Engenharia da computação
// Henrique Michelini, RA: 047792, 5 SI
// Felipe Ambruste Credendio, RA: 197067, 1° semestre engenharia computação
// Gabriel Cabral Gregório de Lima, RA: 060993, 5 SI
// Vinicius Cabral Gregório de Lima, RA: 060994, 7 Engenharia da computação
// Henry Adriel Oliveira, RA: 194901, 1° semestre, Engenharia da computação
// João Pedro Ferreira da Costa , RA: 060008, 3° Semestre engenharia de computação
// Gustavo Ferreira do nascimento, RA: 060067, 5 semestre engrenharia da computação


var selected = "1"
var mask2Regex = /[^0-9]/g

function caesarCipher(txt, steps){
    let chars = ["a",
                 "b",
                 "c",
                 "d",
                 "e",
                 "f",
                 "g",
                 "h",
                 "i",
                 "j",
                 "k",
                 "l",
                 "m",
                 "n",
                 "o",
                 "p",
                 "q",
                 "r",
                 "s",
                 "t",
                 "u",
                 "v",
                 "w",
                 "x",
                 "y",
                 "z",
                 " ",
                 "0",
                 "1",
                 "2",
                 "3",
                 "4",
                 "5",
                 "6",
                 "7",
                 "8",
                 "9"]

    let lenTxt = txt.length
    let msg = ""
    let lowerTxt = txt.toLowerCase()
    for(let i = 0; i<lenTxt; i++){
        let char = lowerTxt.slice(i,i+1)
        let charFindIndex = chars.indexOf(char)
        charFindIndex = charFindIndex + parseInt(steps)
        if(charFindIndex > 36){
            charFindIndex = charFindIndex - 36
        }else if(charFindIndex < 0){
            charFindIndex = charFindIndex + 36
        }
        console.log(charFindIndex)
        msg += chars[charFindIndex]
    }
    return msg
}

function Vigenere(strEcrypt, EncryptKey, method="encode"){
    let textChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890'
    let nonChangeChars= '1234567890.?@#$%&*,;:!'
    var newSizedKey = ""
    var msg = ""
    var strEcryptLen = strEcrypt.length
    for(var x = 0; x < Math.ceil(strEcryptLen/EncryptKey.length); x++){
        newSizedKey+=EncryptKey
    }
    newSizedKey = newSizedKey.slice(0, strEcryptLen)
    
    for(var i = 0; i < strEcryptLen; i++){
        var char = strEcrypt.slice(i,i+1)
        var encChar = newSizedKey.slice(i,i+1)
        var postion = textChars.indexOf(char.toUpperCase()) + (method==="encode"? textChars.indexOf(encChar.toUpperCase()):-textChars.indexOf(encChar.toUpperCase()))
        msg += textChars.slice(postion,postion+1)
        
        
    }
    return msg
}


document.getElementById("cypher_type_selection").addEventListener(
    "change", function(){
        selected = document.getElementById("cypher_type_selection").value
        clear()
        if(selected==="1"){
            mask2Regex = /[^0-9]/g
        }else if(selected==="2"){
            mask2Regex = /[^a-zA-Z0-9] ]/g
        }else if(selected==="3"){
            mask2Regex = /[^0-9]/g
        }
    }
)
function clear(){
        document.getElementById("field_text").value = ""
        document.getElementById("key_input").value = ""
        document.getElementById("returned_area").value = ""
}
document.getElementById("clear").addEventListener(
    
    "click", function(){
        clear()
        }
)


document.getElementById("cript").addEventListener(
    "click", function(){
        
        if(selected==="1"){
            
            let txt = document.getElementById("field_text").value
            let key = document.getElementById("key_input").value
            if(txt.length > 0  && !isNaN(parseInt(key))){
                alert(1)
                document.getElementById("returned_area").value=caesarCipher(txt, key)
            }else{
                alert("Preencha os Campos Corretamente")
                clear()
            }
        }else if(selected==="2"){
            
            let txt = document.getElementById("field_text").value
            let key = document.getElementById("key_input").value
            if(txt.length > 0  && isNaN(key)){
                document.getElementById("returned_area").value=Vigenere(txt, key, "encode")
            }else{
                alert("Preencha os Campos Corretamente")
                clear()
            }
        }else if(selected==="3"){
            let txt = document.getElementById("field_text").value
            let key = document.getElementById("key_input").value
            if(txt.length > 0 && !isNaN(parseInt(key))){
                document.getElementById("returned_area").value=TrilhoEncrypt(txt,key)
            }else{
                alert("Preencha os Campos Corretamente")
                clear()
            }
        }
    }
)

document.getElementById("descript").addEventListener(
    "click", function(){
        if(selected==="1"){
            
            let txt = document.getElementById("field_text").value
            let key = document.getElementById("key_input").value
            if(txt.length > 0  && !isNaN(key)){
                document.getElementById("returned_area").value=caesarCipher(txt, -key)
            }else{
                alert("Preencha os Campos Corretamente")
                clear()
            }
        }else if(selected==="2"){
            let txt = document.getElementById("field_text").value
            let key = document.getElementById("key_input").value
            if(txt.length > 0){
                document.getElementById("returned_area").value=Vigenere(txt, key, "decode")
            }
            
        }else if(selected==="3"){
            let txt = document.getElementById("field_text").value
            let key = document.getElementById("key_input").value
            if(txt.length > 0 && !isNaN(key)){
                document.getElementById("returned_area").value=TrilhoDecrypt(txt,key)
            }else{
                alert("Preencha os Campos Corretamente")
                clear()
            }
        }
    }
)

document.getElementById("field_text").addEventListener("input", function(){
    document.getElementById("field_text").value = document.getElementById("field_text").value.replace(/[^a-zA-Z0-9 ]/g,'');
})
document.getElementById("key_input").addEventListener("input", function(){
    let val =document.getElementById("key_input").value
    document.getElementById("key_input").value = document.getElementById("key_input").value.replace(mask2Regex,'');
    if(selected==="1" && parseInt(document.getElementById("key_input").value) >35){
        document.getElementById("key_input").value = 35
    }else if(selected==="2"){
        
    }else if(selected==="3"&& val.length > 7){
        document.getElementById("key_input").value = val.slice(0,8)
    }
    if(selected==="3"){
        if(/(.).*\1/.test(val)){
            document.getElementById("key_input").value = val.slice(0,val.length-1)
        }
    }
})
//string.replace(/[^a-zA-Z0-9]/g,'_');
function TrilhoEncrypt(text_arg, key_arg) {
    let grade = []

    for (let i = 0; i < key_arg; i++) {
        let sub = []
        for (let j = 0; j < text_arg.length; j++)
            sub.push('&nbsp')
        grade.push(sub)
    }

    let flag = false
    let x = 0
    let y = 0;

    for (let i = 0; i < text_arg.length; i++) {
        if (x === 0 || x === key_arg - 1)
            flag = !flag;
        grade[x][y++] = text_arg[i];
        flag ? x++ : x--;
    }

    let result = "";
    for (let i = 0; i < key_arg; i++)
        for (let j = 0; j < text_arg.length; j++)
            if (grade[i][j] !== '&nbsp')
                result += `${grade[i][j]}`;
    return result
}

function TrilhoDecrypt(text_arg, key_arg) {
    let grade = []

    for (let i = 0; i < key_arg; i++) {
        let sub = []
        for (let j = 0; j < text_arg.length; j++)
            sub.push('&nbsp')
        grade.push(sub)
    }

    let flag = false
    let x = 0
    let y = 0;

    for (let i = 0; i < text_arg.length; i++) {
        if (x === 0)
            flag = true;
        if (x === key_arg - 1)
            flag = false;
        grade[x][y++] = '*';
        flag ? x++ : x--;
    }

    let index = 0;
    for (let i = 0; i < key_arg; i++)
        for (let j = 0; j < text_arg.length; j++)
            if (grade[i][j] === '*' && index < text_arg.length)
                grade[i][j] = text_arg[index++];

    let result = "";
    x = 0;
    y = 0;

    for (let i = 0; i < text_arg.length; i++) {
        if (x === 0)
            flag = true;
        if (x === key_arg - 1)
            flag = false;
        if (grade[x][y] !== '*')
            result += `${grade[x][y++]}`;
        flag ? x++ : x--;
    }
    return result;
}

function copy(){
    navigator.clipboard.writeText(document.getElementById("returned_area").value);
    document.getElementById("img_changer").src = "./assets/4436481.png"
    document.getElementById("img_changer").style.filter = "invert(0%)"
    document.getElementById("img_changer").style.opacity = "1"
    document.getElementById("img_changer").style.backgroundColor = "#3E4562"
    setTimeout(function(){
        document.getElementById("img_changer").src = "./assets/copyicon.png"
        document.getElementById("img_changer").style.filter = "invert(100%)"
        document.getElementById("img_changer").style.opacity = "0.4"
        document.getElementById("img_changer").style.backgroundColor = "#c1ba9d"
    }, 500); 

    
    //./assets/copyicon.png"
}

