axios.defaults.headers.common['Authorization'] = 'Meh43yYsROYVeaKeFPT3RzyR';

const username = () => {
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
        username()
    }
    return
}


const sendMessage = () => {
    const promessa = axios.post()
}

const enviarMensagem = () => {
    let mensagem;
    let texto_msg;

    texto_msg = document.querySelector("#name");
    var msg = texto_msg.value;
    
    mensagem = document.querySelector(".conteudo");
    mensagem.innerHTML += `
    <div class = "div_mensagem">${msg}</div>`
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
    for (let i = 0; i<arrayMessages.length; i++) {
        if (arrayMessages[i].type === "status" && arrayMessages[i].to === "Todos") {
            mensagem.innerHTML += `
            <div class = "div_mensagem">
            <span class = "msgTime">(${arrayMessages[i].time})</span>
            <span class = "msgFrom">${arrayMessages[i].from}</span>
            <span class = "msgText">${arrayMessages[i].text}</span>
            </div>
            `;
            
        }
        else if (arrayMessages[i].type === "message") {
            mensagem.innerHTML += `
            <div class = "div_mensagem">
            <span class = "msgTime">(${arrayMessages[i].time})</span>
            <span class = "msgFrom">${arrayMessages[i].from} <span class="messageText">para</span> ${arrayMessages[i].to}:</span>
            <span class = "messageText">${arrayMessages[i].text}</span>
            `
        }
        else {
            mensagem.innerHTML += `
            <div class = "div_mensagem">
            <span class = "msgTime">(${arrayMessages[i].time})</span>
            <span class = "msgFrom">${arrayMessages[i].from} <span class="messageText">reservadamente para</span> ${arrayMessages[i].to}:</span>
            <span class = "messageText">${arrayMessages[i].text}</span>
            `
        }
    }
}
username()
renderMessages()