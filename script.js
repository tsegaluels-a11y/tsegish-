// DOM Elements (ንኹሎም ኤለመንትታት ካብ HTML ምውሳድ)
const loginContainer = document.getElementById('login-container');
const trackerContainer = document.getElementById('tracker-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

const welcomeMessage = document.getElementById('welcome-message');
const lastDoseDateInput = document.getElementById('last-dose-date');
const checkBtn = document.getElementById('check-btn');
const resultContainer = document.getElementById('result-container');
const daysSinceSpan = document.getElementById('days-since');
const reminderMessage = document.getElementById('reminder-message');

// ንግዚኡ ዝተወሰነ Userን Passwordን (ኣብ ሓቀኛ ፕሮጀክት ካብ ዳታቤዝ ይመጽእ)
const CORRECT_USER = 'tehakami01'; // ንኣብነት፡ ስም ተጠቃሚ
const CORRECT_PASS = 'medhanit123'; // ንኣብነት፡ መዝገብ ቃል

// ናይ Login Event Listener
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // ንሓድሽ ገጽ ከይከፍት ይከላኸል

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === CORRECT_USER && password === CORRECT_PASS) {
        // እንተ ተሰማሚዑ
        loginContainer.classList.add('hidden'); // ነቲ ናይ login ክፍል ሕብኣዮ
        trackerContainer.classList.remove('hidden'); // ነቲ ናይ መከታተሊ ክፍል ኣርእዮ
        welcomeMessage.textContent = `እንቋዕ ብደሓን መጻእካ/ኺ, ${username}!`;
    } else {
        // እንተዘይተሰማሚዑ
        loginError.textContent = 'ጌጋ ዝኾነ ስም ተጠቃሚ ወይ መዝገብ ቃል! በጃኻ/ኺ እንደገና ፈትን/ኒ።';
    }
});

// ናይ "ኩነታት ኣረጋግጽ" መልጎም Event Listener
checkBtn.addEventListener('click', function() {
    const lastDoseDate = lastDoseDateInput.value;

    if (!lastDoseDate) {
        alert('በጃኻ/ኺ መወዳእታ መድሓኒት ዝወሰድካሉ/ክሉ መዓልቲ ምረጽ/ጺ።');
        return; // ካብቲ ፋንክሽን ውጻእ
    }

    const lastDose = new Date(lastDoseDate);
    const today = new Date();

    // ሰዓታት፡ ደቓይቕን ካልኢታትን ብምዕጻው ንጹር ናይ መዓልቲ ፍልልይ ንምርካብ
    today.setHours(0, 0, 0, 0);
    lastDose.setHours(0, 0, 0, 0);
    
    // ፍልልይ ብሚሊሰከንድ ምሕሳብ
    const diffTime = today.getTime() - lastDose.getTime();
    
    // ካብ ሚሊሰከንድ ናብ መዓልቲ ምቕያር
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // ውጽኢት ኣብቲ HTML ምግላጽ
    daysSinceSpan.textContent = diffDays;
    resultContainer.classList.remove('hidden');

    // ናይ መጠንቀቕታ መልእኽቲ ምድላው
    reminderMessage.className = ''; // ዝነበረ class ንምጽራይ

    if (diffDays <= 1) {
        // ሎሚ ወይ ትማሊ እንተወሲዱ
        reminderMessage.textContent = 'ብሉጽ! መድሓኒትካ/ኺ ብግቡእ ትከታተል/ሊ ኣለኻ/ኺ።';
        reminderMessage.classList.add('reminder-ok');
    } else {
        // ልዕሊ ሓደ መዓልቲ እንተደንጒዩ
        reminderMessage.textContent = ` መጠንቀቕታ! ልክዕ ${diffDays} መዓልታት ሓሊፉ ኣሎ። በጃኻ/ኺ ብህጹጽ መድሓኒትካ/ኺ ውሰድ/ዲ!`;
        reminderMessage.classList.add('reminder-alert');
    }
});