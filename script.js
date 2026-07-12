// ══════════════════════════════
// PORTFOLIO FUNCTIONS
// ══════════════════════════════

const galleries = {
  'email-bot': [
    'images/sscmd.png',
    'images/ssgmail.png'
  ]
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(name) {
  currentGallery = galleries[name] || [];
  currentIndex = 0;
  if (currentGallery.length === 0) return;
  document.getElementById('gallery-img').src = currentGallery[0];
  document.getElementById('gallery-counter').textContent = '1 / ' + currentGallery.length;
  document.getElementById('gallery').classList.add('active');
}

function closeGallery() {
  document.getElementById('gallery').classList.remove('active');
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  document.getElementById('gallery-img').src = currentGallery[currentIndex];
  document.getElementById('gallery-counter').textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  document.getElementById('gallery-img').src = currentGallery[currentIndex];
  document.getElementById('gallery-counter').textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
}


// ══════════════════════════════
// ZALE AI ASSISTANT
// ══════════════════════════════

let chatOpen   = false;
let chunkShown = false;
let animating  = false;

function showChunk() {
  document.getElementById('chunk-clip').innerHTML =
    '<path fill-rule="evenodd" d="M0,0 H72 V72 H0 Z M4,36 m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0"/>';
  chunkShown = true;
}

function hideChunk() {
  document.getElementById('chunk-clip').innerHTML =
    '<rect x="0" y="0" width="72" height="72"/>';
  chunkShown = false;
}

function doPunch() {
  if (animating) return;
  animating = true;
  var wrap = document.getElementById('boxer-wrap');
  wrap.classList.add('punching');
  setTimeout(function() {
    wrap.classList.remove('punching');
    showChunk();
    setTimeout(function() { animating = false; }, 200);
  }, 180);
}

function openChat() {
  chatOpen = true;
  document.getElementById('chat-window').classList.add('open');
  document.getElementById('notif-dot').style.opacity = '0';
  document.getElementById('boxer-wrap').classList.add('hidden');
  if (document.getElementById('messages').children.length === 0) {
    setTimeout(function() {
      addMsg("Hey there! I'm Zale, Zach's portfolio assistant. Ask me about his projects, skills, or how to get in touch!", 'bot');
    }, 300);
  }
}

function closeChat() {
  chatOpen = false;
  document.getElementById('chat-window').classList.remove('open');
  document.getElementById('boxer-wrap').classList.remove('hidden');
  hideChunk();
}

function bubbleClick() {
  if (chatOpen) { closeChat(); }
  else { doPunch(); setTimeout(function() { openChat(); }, 260); }
}

function getGreeting(txt) {
  var t = txt.toLowerCase().trim();
  if (/good\s*morning/.test(t))   return "Good morning! Hope your day is off to a great start. How can I help you?";
  if (/good\s*afternoon/.test(t)) return "Good afternoon! Hope you are having a great day. How can I help you?";
  if (/good\s*evening/.test(t))   return "Good evening! How can I help you tonight?";
  if (/good\s*night/.test(t))     return "Good night! Feel free to come back anytime. Have a great rest!";
  if (/^(hi|hey|hello|howdy|sup|hiya|heya|yo)[\s!?.]*$/.test(t))
    return "Hey! Welcome to Zach's portfolio. What can I help you with?";
  return null;
}

function getThanks(txt) {
  var t = txt.toLowerCase().trim();
  if (/thank(s| you)|thx|ty\b/.test(t))
    return "You're welcome! Let me know if there's anything else I can help with.";
  if (/^(ok|okay|got it|sounds good|cool|great|nice|perfect|alright|awesome)[\s!.]*$/.test(t))
    return "Great! Feel free to ask if you have any other questions.";
  if (/^(bye|goodbye|see you|cya|later)[\s!.]*$/.test(t))
    return "Goodbye! Feel free to come back anytime. See ya!";
  return null;
}

var PROJECTS = [
  {
    kw: ["rs11v", "glove", "product page", "sparring", "e-commerce", "ecommerce", "boxing glove", "website", "rs11" , "shop", "product"],
    ans: "RS11V Product Page\n\n An interactive e-commerce concept for a sparring glove. Clickable hotspots zoom into each feature across different photo angles, with a thumbnail gallery, six live colorway previews, scroll-driven animation, and a mock checkout with phone and country validation.\n\nBuilt with: HTML, CSS, vanilla JavaScript\nDeployed on: Vercel"
  },
  {
    kw: ["boxing timer", "boxing", "timer"],
    ans: "Boxing Timer\n\nA dual-mode countdown and stopwatch tool built for boxing workouts. Features round timing, rest periods, and audio cues with no third-party libraries needed.\n\nBuilt with: HTML, CSS, vanilla JavaScript, Web Audio API\nDeployed on: Vercel"
  },
  {
    kw: ["calculator", "calc"],
    ans: "Calculator\n\nA fully functional calculator with smart bracket handling and full keyboard support. Features a terminal-inspired aesthetic with an orange-on-black colour palette.\n\nBuilt with: HTML, CSS, vanilla JavaScript\nHosted on: GitHub Pages"
  },
  {
    kw: ["expenses tracker", "expense tracker", "expenses", "expense", "tracker", "spending"],
    ans: "Expenses Tracker\n\nA personal finance tracker for logging expenses, setting budgets, and viewing spending breakdowns with charts. Supports custom categories, budget alerts, and a print-to-PDF function. Uses BHD currency with a dark theme.\n\nBuilt with: HTML, CSS, vanilla JavaScript, Chart.js\nStorage: localStorage\nDeployed on: Vercel"
  },
  {
    kw: ["gmail", "email bot", "automation bot", "gmail bot", "automation", "email automation"],
    ans: "Gmail Automation Bot\n\nZach's most impressive project. Connects to Gmail via OAuth2 and uses the Claude API to automatically read, categorise, and respond to emails with no manual input needed.\n\nBuilt with: Python, Gmail API, Claude API (Anthropic)\nAuth: OAuth2"
  }
];

var FAQS = [
  {
    kw: ["who are you", "tell me about yourself", "what are you", "introduce yourself", "what is zale", "who is zale"],
    ans: "I'm Zale, Zach's portfolio assistant. Zach is a Computer Science graduate and developer based in Bahrain. He builds web apps, automation tools, and AI-powered projects. Ask me anything about his work!"
  },
  {
    kw: ["project", "built", "portfolio", "what have you made", "show me your work", "apps", "build", "all projects"],
    ans: "Zach has built several projects including:\n- RS11V Product Page - interactive e-commerce concept with zoomable feature hotspots\n- Boxing Timer - countdown and stopwatch with Web Audio API\n- Calculator - keyboard support, terminal aesthetic\n- Expenses Tracker - Chart.js, BHD currency, dark theme\n- Gmail Automation Bot - Python and Claude API\n\nAsk me about any specific project for more details!"
  },
  {
    kw: ["contact", "email", "reach", "message", "get in touch", "how do i find", "where can i find"],
    ans: "You can reach Zach directly via email at zlee337.zl@gmail.com\n\nHe is also available through his portfolio site and LinkedIn. He is actively looking for developer roles and open to freelance work and collaborations."
  },
  {
    kw: ["skill", "technology", "tech stack", "language", "what do you know", "what can you do", "framework"],
    ans: "Zach works with:\n- Frontend: HTML, CSS, JavaScript, React\n- Backend: Python, Flask\n- Tools: Claude API, Git, Vercel, GitHub Pages\n- Design: Affinity Designer\n\nHe is strong in web automation and AI integration."
  },
  {
    kw: ["hire", "available", "job", "open to work", "position", "looking for work", "opportunity", "freelance"],
    ans: "Yes! Zach is actively job hunting for developer roles. He is open to full-time positions, internships, and freelance projects. Feel free to reach out at zlee337.zl@gmail.com"
  },
  {
    kw: ["boxing", "basketball", "video game", "gaming", "art", "design", "hobby", "hobbies", "interest", "outside of coding", "free time", "personal"],
    ans: "Outside of coding, Zach is into:\n- Boxing\n- Basketball\n- Video games\n- Art and design\n\nHe is a well-rounded person with a lot going on beyond the keyboard."
  },
  {
    kw: ["cv", "resume", "experience", "background", "education", "degree", "qualification"],
    ans: "Zach holds a Computer Science degree and has hands-on experience building real-world apps."
  },
  {
    kw: ["github", "vercel", "deployed", "live site", "link", "url", "where are your projects"],
    ans: "Zach's projects are hosted at github.com/zlee30/portfolio and deployed via Vercel and GitHub Pages. You can browse his code and live demos from there."
  }
];

function getReply(txt) {
  var g = getGreeting(txt); if (g) return g;
  var t = getThanks(txt);   if (t) return t;
  var lo = txt.toLowerCase();
  for (var i = 0; i < PROJECTS.length; i++) {
    if (PROJECTS[i].kw.some(function(k) { return lo.includes(k); })) return PROJECTS[i].ans;
  }
  for (var j = 0; j < FAQS.length; j++) {
    if (FAQS[j].kw.some(function(k) { return lo.includes(k); })) return FAQS[j].ans;
  }
  return "I'm not sure, Zach hasn't taught me that yet.";
}

function addMsg(txt, role) {
  var wrap = document.getElementById('messages');
  var d = document.createElement('div');
  d.className = 'msg ' + role;
  d.textContent = txt;
  wrap.appendChild(d);
  wrap.scrollTop = wrap.scrollHeight;
}

function addTyping() {
  var wrap = document.getElementById('messages');
  var d = document.createElement('div');
  d.className = 'msg bot';
  d.id = 'typing-ind';
  d.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  wrap.appendChild(d);
  wrap.scrollTop = wrap.scrollHeight;
}

function removeTyping() {
  var t = document.getElementById('typing-ind');
  if (t) t.remove();
}

function sendMsg() {
  var inp = document.getElementById('user-input');
  var txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  document.getElementById('suggestions').style.display = 'none';
  addMsg(txt, 'user');
  addTyping();
  setTimeout(function() { removeTyping(); addMsg(getReply(txt), 'bot'); }, 700);
}

function sendChip(txt) {
  document.getElementById('suggestions').style.display = 'none';
  addMsg(txt, 'user');
  addTyping();
  setTimeout(function() { removeTyping(); addMsg(getReply(txt), 'bot'); }, 700);
}