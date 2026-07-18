/* =========================================================
   SCRIPT.JS - FRONTEND LOGIC FOR NOVA AI
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- 1. Auto-resize Textarea ---
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto'; // Reset the height
        chatInput.style.height = chatInput.scrollHeight + 'px'; // Set to scroll height
    });

    // --- 2. Hamburger Menu Toggle (Mobile) ---
    hamburger.addEventListener('click', () => {
        // Simple toggle logic for mobile menu
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(8, 8, 11, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
            navLinks.style.zIndex = '999';
        }
    });

    // --- 3. Helper: Scroll Chat to Bottom ---
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- 4. Helper: Append a Message to the UI ---
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender === 'user' ? 'user-message' : ''}`;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i></div>
            <div class="bubble">${text}</div>
            <span class="timestamp">${time}</span>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // --- 5. Helper: Show "Thinking" Loader ---
    function showLoader() {
        const loaderDiv = document.createElement('div');
        loaderDiv.className = 'message';
        loaderDiv.id = 'thinking-loader';
        loaderDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="bubble">NOVA is thinking<span class="typing-dots"></span></div>
        `;
        chatMessages.appendChild(loaderDiv);
        scrollToBottom();
    }

    function removeLoader() {
        const loader = document.getElementById('thinking-loader');
        if (loader) loader.remove();
    }

    // --- 6. MAIN SEND LOGIC (Connects to Python Backend) ---
    async function handleSend() {
        const message = chatInput.value.trim();
        if (!message) return;

        // 1. Add user message to UI
        appendMessage('user', message);
        
        // 2. Clear input box and reset height
        chatInput.value = '';
        chatInput.style.height = 'auto';

        // 3. Show thinking indicator
        showLoader();

        try {
            // 4. Fetch Request to Python Backend on port 5000
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            // 5. Remove loader
            removeLoader();

            // 6. Handle errors from backend
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            // 7. Parse JSON and display AI reply
            const data = await response.json();
            appendMessage('assistant', data.reply);

        } catch (error) {
            // 8. Handle Network/Connection Errors
            removeLoader();
            console.error('Error fetching AI response:', error);
            appendMessage('assistant', '⚠️ Connection Error: Make sure your Python backend is running on port 5000.');
        }
    }

    // --- 7. Event Listeners ---
    
    // Send on button click
    sendBtn.addEventListener('click', handleSend);

    // Send on "Enter" key (Shift+Enter for newline)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
});