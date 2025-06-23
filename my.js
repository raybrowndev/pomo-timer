let interval;
let isRunning = false;
let isWorkTime = true;
let sessionCount = 0;
let totalSessions = 1;
let minutes = 25;
let seconds = 0;

const hourEl = document.getElementById('hour-num');
const minEl = document.getElementById('min-num');
const secEl = document.getElementById('sec-num');
const tickSound = document.getElementById('tickSound');
const ringSound = document.getElementById('ringSound');


const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');

function addTodo() {
const task = todoInput.value.trim();
if (!task) return;

const li = document.createElement('li');
li.innerHTML = `
    <div style="display: flex; align-items: center;">
    <input type="checkbox" class="todo-checkbox" />
    <span>${task}</span>
    </div>
    <button class="remove-btn">&times;</button>
`;

li.querySelector('.remove-btn').addEventListener('click', () => {
    todoList.removeChild(li);
});

todoList.appendChild(li);
todoInput.value = '';
todoInput.focus();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
if (e.key === 'Enter') {
    addTodo();
}
});

function updateDisplay() {
hourEl.textContent = Math.floor(minutes / 60);
minEl.textContent = minutes % 60;
secEl.textContent = seconds.toString().padStart(2, '0');
}


function startTimer() {
    if (isRunning) return;
    isRunning = true;
  
    const sessionDuration = parseInt(document.getElementById('sessionType').value);
    const breakDuration = parseInt(document.getElementById('breakType').value);
    totalSessions = parseInt(document.getElementById('cycles').value);
  
    // Always set minutes and seconds based on whether it's work or break time
    minutes = isWorkTime ? sessionDuration : breakDuration;
    seconds = 0;
  
    updateDisplay(); // Update the display immediately
  
    interval = setInterval(() => {
      tickSound.play();
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          ringSound.play();
          isRunning = false;
          isWorkTime = !isWorkTime;
          sessionCount += isWorkTime ? 1 : 0;
  
          if (sessionCount >= totalSessions) {
            alert('Pomodoro sessions complete!');
            return;
          }
  
          minutes = isWorkTime ? sessionDuration : breakDuration;
          seconds = 0;
          updateDisplay();
          startTimer();
          return;
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }

function pauseTimer() {
    clearInterval(interval);
    isRunning = false;
    tickSound.pause();       // Stops the ticking sound
    tickSound.currentTime = 0; // Optional: resets it to the beginning
  }

  
updateDisplay();