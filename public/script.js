

const socket = io();


const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', "Message: " + input.value);
        console.log(dns.reverse())
        input.value = '';
        
    }
});

socket.on('chat message', function(msg) {
    const item = document.createElement('div');
    item.textContent = msg;
    
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

