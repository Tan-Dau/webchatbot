// Bot responses database
const botResponses = {
    greetings: [
        "Hello! How can I assist you today?",
        "Hi there! What can I help you with?",
        "Hey! Great to see you. How may I help?",
        "Good day! What brings you here today?"
    ],
    help: [
        "I'm here to help! You can ask me about various topics or just have a conversation.",
        "I can assist you with general questions, provide information, or just chat!",
        "Feel free to ask me anything. I'm designed to be helpful and informative.",
        "I'm your AI assistant, ready to help with whatever you need!"
    ],
    weather: [
        "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for current conditions!",
        "For accurate weather information, I suggest using a dedicated weather service.",
        "I can't check the weather in real-time, but I'm happy to help with other questions!"
    ],
    time: [
        `The current time is ${new Date().toLocaleTimeString()}.`,
        `It's currently ${new Date().toLocaleString()}.`,
        `Right now it's ${new Date().toLocaleTimeString()}.`
    ],
    name: [
        "I'm an AI assistant created to help you!",
        "I'm your friendly AI chatbot, here to assist you.",
        "You can call me AI Assistant or just Assistant!"
    ],
    capabilities: [
        "I can help with general questions, provide information, have conversations, and assist with various topics!",
        "I'm designed to be helpful, informative, and engaging. I can discuss many different subjects!",
        "I can chat about various topics, answer questions, and provide assistance in many areas!"
    ],
    goodbye: [
        "Goodbye! Have a great day!",
        "See you later! Take care!",
        "Farewell! Feel free to come back anytime!",
        "Bye! It was nice chatting with you!"
    ],
    default: [
        "That's interesting! Can you tell me more about that?",
        "I see! What else would you like to know?",
        "That's a great point! How can I help you further?",
        "Thanks for sharing! Is there anything specific you'd like to discuss?",
        "I understand. What would you like to talk about next?",
        "That's fascinating! What other questions do you have?"
    ]
};

// Keywords for response matching
const keywordMap = {
    'hello': 'greetings',
    'hi': 'greetings',
    'hey': 'greetings',
    'good morning': 'greetings',
    'good afternoon': 'greetings',
    'good evening': 'greetings',
    'help': 'help',
    'assist': 'help',
    'support': 'help',
    'weather': 'weather',
    'temperature': 'weather',
    'rain': 'weather',
    'sunny': 'weather',
    'time': 'time',
    'clock': 'time',
    'what time': 'time',
    'name': 'name',
    'who are you': 'name',
    'what are you': 'name',
    'capabilities': 'capabilities',
    'what can you do': 'capabilities',
    'features': 'capabilities',
    'goodbye': 'goodbye',
    'bye': 'goodbye',
    'see you': 'goodbye',
    'farewell': 'goodbye'
};

// DOM elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const chatbotBody = document.getElementById('chatbotBody');

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    messageInput.focus();
    
    // Add event listeners
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    messageInput.addEventListener('input', function() {
        sendButton.disabled = messageInput.value.trim() === '';
        
        // Add character count indicator
        updateCharacterCount();
    });
    
    // Add modern animations on load
    setTimeout(() => {
        document.querySelector('.chatbot-container').style.opacity = '1';
        document.querySelector('.chatbot-container').style.transform = 'translateY(0)';
    }, 100);
    
    // Add floating particles effect
    createFloatingParticles();
});

// Send message function
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    sendButton.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate bot response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = generateBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${text}</p>
            <span class="message-time">${currentTime}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // Smooth scroll with animation
    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
    
    // Add message animation
    messageDiv.style.animationDelay = '0.1s';
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="typing-indicator">
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate bot response based on user input
function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords and return appropriate response
    for (const [keyword, category] of Object.entries(keywordMap)) {
        if (lowerMessage.includes(keyword)) {
            const responses = botResponses[category];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Check for question patterns
    if (lowerMessage.includes('?')) {
        const questionResponses = [
            "That's a great question! Let me think about that...",
            "Interesting question! I'd be happy to help with that.",
            "I understand your question. Let me provide some insight.",
            "That's something I can help you explore!"
        ];
        return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }
    
    // Check for emotional content
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "You're very welcome! I'm glad I could help!";
    }
    
    if (lowerMessage.includes('sorry') || lowerMessage.includes('apologize')) {
        return "No need to apologize! I'm here to help and understand.";
    }
    
    // Default response
    const defaultResponses = botResponses.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Toggle chatbot minimize/expand
function toggleChatbot() {
    const container = document.querySelector('.chatbot-container');
    const minimizeBtn = document.querySelector('.minimize-btn');
    
    container.classList.toggle('minimized');
    
    if (container.classList.contains('minimized')) {
        minimizeBtn.textContent = '+';
        minimizeBtn.style.transform = 'rotate(180deg)';
    } else {
        minimizeBtn.textContent = '−';
        minimizeBtn.style.transform = 'rotate(0deg)';
        setTimeout(() => messageInput.focus(), 300);
    }
}

// Add some sample conversation starters
function addSampleQuestions() {
    const sampleQuestions = [
        "What can you help me with?",
        "What's your name?",
        "What time is it?",
        "Tell me about your capabilities"
    ];
    
    // Add sample questions as clickable buttons (optional enhancement)
    // This could be implemented as a future feature
}

// Auto-resize input
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Handle window resize
window.addEventListener('resize', function() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Character count indicator
function updateCharacterCount() {
    const maxLength = 500;
    const currentLength = messageInput.value.length;
    const remaining = maxLength - currentLength;
    
    // Add visual feedback for character count
    if (remaining < 50) {
        messageInput.style.borderColor = remaining < 10 ? '#f56565' : '#f6ad55';
    } else {
        messageInput.style.borderColor = 'transparent';
    }
}

// Create floating particles effect
function createFloatingParticles() {
    const particleCount = 20;
    const body = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}vw;
            top: 100vh;
        `;
        
        body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .chatbot-container {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);
