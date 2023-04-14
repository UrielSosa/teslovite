import { connectToServer } from './socket-client'
import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
    <input id="jwtoken" placeholder="Json web token" />
    <button id="btn-connect">Connect</button>

    <span id="server-status">Offline</span>

    <ul id="clients-list"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

  <h3>Messages</h3>
  <ul id="messages-ul"></ul>
    
  </div>
`
// connectToServer();
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const inputJwt = document.querySelector('#jwtoken');
const btnConnect = document.querySelector('#btn-connect');

btnConnect?.addEventListener('click', () => {
  if (inputJwt.value.trim().length <= 0) return alert('enter a valid jwt');

  connectToServer(inputJwt.value);
})