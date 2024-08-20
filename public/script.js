const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');
const userCountDisplay = document.getElementById('user-count');

let Username = ""
let Connected = false

// Update user count
socket.on('user count', function(count) {
    userCountDisplay.textContent = `Users Online: ${count}`;
    if (!Connected) {
        Username = "Anonymous " + count.toString()
        console.log(Username)
        Connected = true
    }
    

});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', Username + ': ' + input.value);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    const item = document.createElement('div');
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
