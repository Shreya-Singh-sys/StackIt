//Sample data
const sampleQuestions = [
    {
        id: 1,
        title: "How to join 2 columns in a data set to make a separate column in SQL",
        content: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine...",
        tags: ["sql", "database"],
        votes: 5,
        answers: 3,
        views: 127,
        author: "John Doe",
        authorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "2 hours ago",
        isAnswered: true
    },
    {
        id: 2,
        title: "React useState hook not updating state immediately",
        content: "I'm having trouble with React useState hook. When I call the setter function, the state doesn't seem to update immediately. How can I access the updated state right after setting it?",
        tags: ["react", "javascript", "hooks"],
        votes: 12,
        answers: 5,
        views: 245,
        author: "Jane Smith",
        authorAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "4 hours ago",
        isAnswered: true
    },
    {
        id: 3,
        title: "CSS Grid vs Flexbox: When to use which?",
        content: "I'm confused about when to use CSS Grid and when to use Flexbox. Can someone explain the differences and provide examples of when each should be used?",
        tags: ["css", "layout", "grid", "flexbox"],
        votes: 8,
        answers: 0,
        views: 89,
        author: "Mike Johnson",
        authorAvatar: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "1 day ago",
        isAnswered: false
    },
    {
        id: 4,
        title: "How to implement JWT authentication in Node.js",
        content: "I'm building a REST API with Node.js and Express, and I want to implement JWT authentication. What's the best practice for handling JWT tokens securely?",
        tags: ["nodejs", "jwt", "authentication", "express"],
        votes: 15,
        answers: 7,
        views: 332,
        author: "Sarah Wilson",
        authorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "2 days ago",
        isAnswered: true
    },
    {
        id: 5,
        title: "Python list comprehension vs for loop performance",
        content: "I've heard that list comprehensions are faster than regular for loops in Python. Is this true? And if so, why?",
        tags: ["python", "performance", "loops"],
        votes: 6,
        answers: 2,
        views: 156,
        author: "David Chen",
        authorAvatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "3 days ago",
        isAnswered: true
    }
];

const sampleAnswers = [
    {
        id: 1,
        questionId: 1,
        content: "You can use the CONCAT function in SQL to combine columns. Here's the syntax:<br><br><code>SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM your_table;</code><br><br>This will create a new column called 'full_name' that combines the first_name and last_name columns with a space in between.",
        votes: 8,
        author: "Alice Developer",
        authorAvatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "1 hour ago",
        isAccepted: true
    },
    {
        id: 2,
        questionId: 1,
        content: "Another approach is to use the pipe operator (||) which is supported in some SQL databases:<br><br><code>SELECT first_name || ' ' || last_name AS full_name FROM your_table;</code><br><br>This does the same thing as CONCAT but with different syntax.",
        votes: 3,
        author: "Bob SQL Expert",
        authorAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "30 minutes ago",
        isAccepted: false
    }
];

// Application state
let currentPage = 'home';
let currentQuestionId = null;
let selectedTags = [];
let notificationCount = 3;

// DOM elements
const pages = {
    home: document.getElementById('homePage'),
    askQuestion: document.getElementById('askQuestionPage'),
    questionDetail: document.getElementById('questionDetailPage')
};

const navigation = {
    askQuestionBtn: document.getElementById('askQuestionBtn'),
    askQuestionHeader: document.getElementById('askQuestionHeader'),
    cancelQuestion: document.getElementById('cancelQuestion'),
    notificationIcon: document.querySelector('.notification-icon'),
    notificationDropdown: document.getElementById('notificationDropdown')
};

const form = {
    questionForm: document.getElementById('questionForm'),
    questionTitle: document.getElementById('questionTitle'),
    questionDescription: document.getElementById('questionDescription'),
    tagsInput: document.getElementById('tagsInput'),
    tagsList: document.getElementById('tagsList')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderQuestions();
    setupRichEditor();
    setupTagsInput();
    showPage('home');
}

function setupEventListeners() {
    // Navigation events
    navigation.askQuestionBtn.addEventListener('click', () => showPage('askQuestion'));
    navigation.askQuestionHeader.addEventListener('click', () => showPage('askQuestion'));
    navigation.cancelQuestion.addEventListener('click', () => showPage('home'));
    
    // Form submission
    form.questionForm.addEventListener('submit', handleQuestionSubmit);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Notification dropdown
    navigation.notificationIcon.addEventListener('click', toggleNotificationDropdown);
    
    // Close notification dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!navigation.notificationIcon.contains(e.target) && 
            !navigation.notificationDropdown.contains(e.target)) {
            navigation.notificationDropdown.classList.remove('active');
        }
    });
    
    // Mark all notifications as read
    document.querySelector('.mark-all-read').addEventListener('click', markAllNotificationsRead);
}

function showPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => page.classList.remove('active'));
    
    // Show selected page
    if (pages[pageName]) {
        pages[pageName].classList.add('active');
        currentPage = pageName;
    }
    
    // Reset form when showing ask question page
    if (pageName === 'askQuestion') {
        resetQuestionForm();
    }
}

function renderQuestions(filter = 'newest') {
    const questionsList = document.getElementById('questionsList');
    let questions = [...sampleQuestions];
    
    // Apply filter
    switch (filter) {
        case 'unanswered':
            questions = questions.filter(q => q.answers === 0);
            break;
        case 'active':
            questions = questions.sort((a, b) => b.answers - a.answers);
            break;
        case 'votes':
            questions = questions.sort((a, b) => b.votes - a.votes);
            break;
        default: // newest
            questions = questions.sort((a, b) => a.id - b.id);
    }
    
    questionsList.innerHTML = questions.map(question => `
        <div class="question-card fade-in" onclick="showQuestionDetail(${question.id})">
            <div class="question-header">
                <div>
                    <h3 class="question-title">${question.title}</h3>
                    <div class="question-stats">
                        <div class="stat-item">
                            <i class="fas fa-arrow-up"></i>
                            <span>${question.votes}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-comment"></i>
                            <span>${question.answers} answers</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-eye"></i>
                            <span>${question.views} views</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="question-content">
                ${question.content.substring(0, 200)}${question.content.length > 200 ? '...' : ''}
            </div>
            
            <div class="question-footer">
                <div class="question-tags">
                    ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="question-meta">
                    <div class="user-info">
                        <img src="${question.authorAvatar}" alt="${question.author}">
                        <span>${question.author}</span>
                    </div>
                    <span>${question.timeAgo}</span>
                    ${question.isAnswered ? '<span class="accepted">Answered</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function showQuestionDetail(questionId) {
    currentQuestionId = questionId;
    const question = sampleQuestions.find(q => q.id === questionId);
    const answers = sampleAnswers.filter(a => a.questionId === questionId);
    
    if (!question) return;
    
    const container = pages.questionDetail.querySelector('.container');
    container.innerHTML = `
        <div class="question-detail slide-up">
            <div class="question-detail-header">
                <button class="btn btn-secondary" onclick="showPage('home')" style="margin-bottom: 1rem;">
                    <i class="fas fa-arrow-left"></i> Back to Questions
                </button>
                <h1 class="question-detail-title">${question.title}</h1>
                <div class="question-detail-meta">
                    <span>Asked ${question.timeAgo}</span>
                    <span>•</span>
                    <span>Viewed ${question.views} times</span>
                    <span>•</span>
                    <span>Active today</span>
                </div>
            </div>
            
            <div class="question-detail-content">
                ${question.content}
            </div>
            
            <div class="question-detail-footer">
                <div class="vote-controls">
                    <button class="vote-btn" onclick="voteQuestion(${question.id}, 'up')">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <span class="vote-count">${question.votes}</span>
                    <button class="vote-btn" onclick="voteQuestion(${question.id}, 'down')">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                
                <div class="question-tags">
                    ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="question-meta">
                    <div class="user-info">
                        <img src="${question.authorAvatar}" alt="${question.author}">
                        <div>
                            <div>${question.author}</div>
                            <small>${question.timeAgo}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="answers-section">
            <h2 class="answers-header">${answers.length} Answer${answers.length !== 1 ? 's' : ''}</h2>
            
            ${answers.map(answer => `
                <div class="answer-card slide-up">
                    <div class="answer-content">
                        ${answer.content}
                    </div>
                    <div class="answer-footer">
                        <div class="vote-controls">
                            <button class="vote-btn" onclick="voteAnswer(${answer.id}, 'up')">
                                <i class="fas fa-chevron-up"></i>
                            </button>
                            <span class="vote-count">${answer.votes}</span>
                            <button class="vote-btn" onclick="voteAnswer(${answer.id}, 'down')">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                        
                        <div class="answer-actions">
                            ${answer.isAccepted ? 
                                '<span class="accepted"><i class="fas fa-check"></i> Accepted</span>' : 
                                '<button class="accept-btn" onclick="acceptAnswer(' + answer.id + ')"><i class="fas fa-check"></i> Accept</button>'
                            }
                        </div>
                        
                        <div class="question-meta">
                            <div class="user-info">
                                <img src="${answer.authorAvatar}" alt="${answer.author}">
                                <div>
                                    <div>${answer.author}</div>
                                    <small>${answer.timeAgo}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
            
            <div class="answer-form" style="margin-top: 2rem;">
                <h3 style="margin-bottom: 1rem;">Your Answer</h3>
                <div class="editor-toolbar">
                    <button type="button" class="editor-btn" data-command="bold"><i class="fas fa-bold"></i></button>
                    <button type="button" class="editor-btn" data-command="italic"><i class="fas fa-italic"></i></button>
                    <button type="button" class="editor-btn" data-command="underline"><i class="fas fa-underline"></i></button>
                    <button type="button" class="editor-btn" data-command="strikethrough"><i class="fas fa-strikethrough"></i></button>
                    <div class="toolbar-separator"></div>
                    <button type="button" class="editor-btn" data-command="insertUnorderedList"><i class="fas fa-list-ul"></i></button>
                    <button type="button" class="editor-btn" data-command="insertOrderedList"><i class="fas fa-list-ol"></i></button>
                    <div class="toolbar-separator"></div>
                    <button type="button" class="editor-btn" data-command="createLink"><i class="fas fa-link"></i></button>
                    <button type="button" class="editor-btn" data-command="insertImage"><i class="fas fa-image"></i></button>
                </div>
                <div class="rich-editor" contenteditable="true" placeholder="Write your answer here..." style="min-height: 150px;"></div>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="submitAnswer()">Post Answer</button>
                    <button class="btn btn-secondary" style="margin-left: 0.5rem;">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    // Setup rich editor for the answer form
    setupRichEditorForAnswers();
    
    showPage('questionDetail');
}

function setupRichEditor() {
    const toolbar = document.querySelector('.editor-toolbar');
    const editor = form.questionDescription;
    
    if (!toolbar || !editor) return;
    
    toolbar.addEventListener('click', (e) => {
        e.preventDefault();
        const button = e.target.closest('.editor-btn');
        if (!button) return;
        
        const command = button.dataset.command;
        
        switch (command) {
            case 'createLink':
                const url = prompt('Enter URL:');
                if (url) {
                    document.execCommand('createLink', false, url);
                }
                break;
            case 'insertImage':
                const imageUrl = prompt('Enter image URL:');
                if (imageUrl) {
                    document.execCommand('insertImage', false, imageUrl);
                }
                break;
            case 'insertEmoji':
                const emoji = prompt('Enter emoji:');
                if (emoji) {
                    document.execCommand('insertText', false, emoji);
                }
                break;
            default:
                document.execCommand(command, false, null);
        }
        
        editor.focus();
    });
}

function setupRichEditorForAnswers() {
    const toolbar = document.querySelector('#questionDetailPage .editor-toolbar');
    const editor = document.querySelector('#questionDetailPage .rich-editor');
    
    if (!toolbar || !editor) return;
    
    toolbar.addEventListener('click', (e) => {
        e.preventDefault();
        const button = e.target.closest('.editor-btn');
        if (!button) return;
        
        const command = button.dataset.command;
        
        switch (command) {
            case 'createLink':
                const url = prompt('Enter URL:');
                if (url) {
                    document.execCommand('createLink', false, url);
                }
                break;
            case 'insertImage':
                const imageUrl = prompt('Enter image URL:');
                if (imageUrl) {
                    document.execCommand('insertImage', false, imageUrl);
                }
                break;
            default:
                document.execCommand(command, false, null);
        }
        
        editor.focus();
    });
}

function setupTagsInput() {
    form.tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
    });
    
    form.tagsInput.addEventListener('blur', addTag);
}

function addTag() {
    const tagValue = form.tagsInput.value.trim().toLowerCase();
    
    if (tagValue && !selectedTags.includes(tagValue) && selectedTags.length < 5) {
        selectedTags.push(tagValue);
        renderTags();
        form.tagsInput.value = '';
    }
}

function removeTag(tag) {
    selectedTags = selectedTags.filter(t => t !== tag);
    renderTags();
}

function renderTags() {
    form.tagsList.innerHTML = selectedTags.map(tag => `
        <div class="tag-item">
            <span>${tag}</span>
            <button type="button" class="tag-remove" onclick="removeTag('${tag}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function handleFilterClick(e) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Re-render questions with new filter
    const filter = e.target.dataset.filter;
    renderQuestions(filter);
}

function handleQuestionSubmit(e) {
    e.preventDefault();
    
    const title = form.questionTitle.value.trim();
    const content = form.questionDescription.innerHTML.trim();
    
    if (!title || !content) {
        alert('Please fill in both title and description');
        return;
    }
    
    // Create new question object
    const newQuestion = {
        id: sampleQuestions.length + 1,
        title,
        content,
        tags: [...selectedTags],
        votes: 0,
        answers: 0,
        views: 1,
        author: "Current User",
        authorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "just now",
        isAnswered: false
    };
    
    // Add to questions array
    sampleQuestions.unshift(newQuestion);
    
    // Show success message
    showNotification('Question posted successfully!', 'success');
    
    // Redirect to home page
    showPage('home');
    renderQuestions();
}

function resetQuestionForm() {
    form.questionTitle.value = '';
    form.questionDescription.innerHTML = '';
    form.tagsInput.value = '';
    selectedTags = [];
    renderTags();
}

function voteQuestion(questionId, direction) {
    const question = sampleQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    if (direction === 'up') {
        question.votes++;
        showNotification('Question upvoted!', 'success');
    } else {
        question.votes = Math.max(0, question.votes - 1);
        showNotification('Question downvoted!', 'info');
    }
    
    // Refresh the current view
    if (currentPage === 'questionDetail') {
        showQuestionDetail(questionId);
    } else {
        renderQuestions();
    }
}

function voteAnswer(answerId, direction) {
    const answer = sampleAnswers.find(a => a.id === answerId);
    if (!answer) return;
    
    if (direction === 'up') {
        answer.votes++;
        showNotification('Answer upvoted!', 'success');
    } else {
        answer.votes = Math.max(0, answer.votes - 1);
        showNotification('Answer downvoted!', 'info');
    }
    
    // Refresh the question detail view
    showQuestionDetail(currentQuestionId);
}

function acceptAnswer(answerId) {
    // Remove acceptance from other answers
    sampleAnswers.forEach(a => {
        if (a.questionId === currentQuestionId) {
            a.isAccepted = false;
        }
    });
    
    // Accept this answer
    const answer = sampleAnswers.find(a => a.id === answerId);
    if (answer) {
        answer.isAccepted = true;
        showNotification('Answer accepted!', 'success');
        showQuestionDetail(currentQuestionId);
    }
}

function submitAnswer() {
    const editor = document.querySelector('#questionDetailPage .rich-editor');
    const content = editor.innerHTML.trim();
    
    if (!content) {
        alert('Please write an answer');
        return;
    }
    
    const newAnswer = {
        id: sampleAnswers.length + 1,
        questionId: currentQuestionId,
        content,
        votes: 0,
        author: "Current User",
        authorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face",
        timeAgo: "just now",
        isAccepted: false
    };
    
    sampleAnswers.push(newAnswer);
    
    // Update question answer count
    const question = sampleQuestions.find(q => q.id === currentQuestionId);
    if (question) {
        question.answers++;
        if (!question.isAnswered) {
            question.isAnswered = true;
        }
    }
    
    showNotification('Answer posted successfully!', 'success');
    showQuestionDetail(currentQuestionId);
}

function toggleNotificationDropdown() {
    navigation.notificationDropdown.classList.toggle('active');
}

function markAllNotificationsRead() {
    notificationCount = 0;
    document.querySelector('.notification-badge').style.display = 'none';
    document.querySelectorAll('.notification-item').forEach(item => {
        item.classList.remove('unread');
    });
    showNotification('All notifications marked as read', 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" 
               style="color: var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : 'primary'}-color);"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-left: auto; background: none; border: none; cursor: pointer; color: var(--text-muted);">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);