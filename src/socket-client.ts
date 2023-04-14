import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (token: string) => {
    // http://localhost:3000/socket.io/socket.io.js
    
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    // console.log({socket});
    addEventListener();

}

const addEventListener = () => {
    const serverStatusLabel = document.querySelector('#server-status');
    const clientsList = document.querySelector<HTMLUListElement>('#clients-list');
    const messageForm = document.querySelector<HTMLFormElement>('#message-form');
    const messageInput = document.querySelector<HTMLInputElement>('#message-input');
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul');

    socket.on('connect', () => {
        console.log('connected');
        serverStatusLabel.innerHTML = 'Connected';
    })

    socket.on('disconnect', () => {
        console.log('disconected');
        serverStatusLabel.innerHTML = 'Disconnected';
    })

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml+= `<li>${clientId }</li>`
        })
        clientsList.innerHTML = clientsHtml;
    })

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <strong>${payload.message}</strong>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);

        // const messagesHtml = messagesUl.children.length > 0 ?  messagesUl.children.toString() : '' + payload.message;
        // messagesUl.innerHTML = messagesHtml;
    })

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if( messageInput.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', {id: 'YO!', message: messageInput.value});
    })

}