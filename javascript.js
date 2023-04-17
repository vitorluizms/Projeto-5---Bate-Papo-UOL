axios.defaults.headers.common['Authorization'] = 'Meh43yYsROYVeaKeFPT3RzyR';
let nick = [];
const usernamePost = () => {
    let arrayName;
    let nameUser = prompt("Digite seu nome de usuário: ")
    arrayName = {
        name: nameUser,
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/vm/uol/participants", arrayName);
    promise.catch(invalidUser);
    promise.then(renderMessages)
    

    // setInterval(keepConnection, 5000);
    // setInverval(renderMessages, 3000);
}
const invalidUser = (wrongName) => {
    if (wrongName.response.status === 400){
        alert('Nome de usuário inválido!')
        usernamePost()
    }
    return
}

const keepConnection = () => {
    const nick = {
        'name' : nameUser,
    }

    const promisse = axios.post("https://mock-api.driven.com.br/api/vm/uol/status", nick);
    promisse.catch(reload)

}

const reload = () => {
    window.location.reload(true);
}



let arrayMessages = []
const renderMessages = () => {
    const promise = axios.get("https://mock-api.driven.com.br/api/vm/uol/messages")
    promise.then(messages)
}

const messages = (allMessages) => {
    let mensagem;
    mensagem = document.querySelector('.conteudo')
    
    arrayMessages = allMessages.data;
    console.log(arrayMessages)
    for (let i = 0; i<arrayMessages.length; i++) {
        if (arrayMessages[i].type === "status" && arrayMessages[i].to === 'Todos') {
            mensagem.innerHTML += `
            <div class = "msgStatus" data-test="message">
            <span class = "msgTime">(${arrayMessages[i].time})</span>
            <span class = "msgFrom">${arrayMessages[i].from}</span>
            <span class = "msgText">${arrayMessages[i].text}</span>
            </div>
            `;
            
        }
        else if (arrayMessages[i].type === "message") {
            mensagem.innerHTML += `
            <div class = "msgNormal" data-test="message">
            <span class = "msgTime">(${arrayMessages[i].time})</span>
            <span class = "msgFrom">${arrayMessages[i].from} <span class="messageText">para</span> ${arrayMessages[i].to}:</span>
            <span class = "messageText">${arrayMessages[i].text}</span>
            `
        }
        else if (arrayMessages[i].type === "private_message"){
            mensagem.innerHTML += `
            <div class = "msgPrivate" data-test="message">
            <span class = "msgTime">(${arrayMessages[i].time})</span>
            <span class = "msgFrom">${arrayMessages[i].from} <span class="messageText">reservadamente para</span> ${arrayMessages[i].to}:</span>
            <span class = "messageText">${arrayMessages[i].text}</span>
            `
        }
    }
}



const sendMessage = () => {

    texto_msg = document.querySelector("#name");
    const msg = {
        from: nameUser,
        to: 'Todos',
        text: texto_msg.value,
        type: 'message'
    }
    const promisseMessage = axios.post("https://mock-api.driven.com.br/api/vm/uol/messages")
    promisseMessage.then(renderMessages)

    texto_msg.value = "";
}
usernamePost()
renderMessages()