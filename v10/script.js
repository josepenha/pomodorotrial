let timer;
let duration;
const timerDisplay = document.getElementById('timerDisplay');

function startTimer(seconds, nextAction) {
    clearInterval(timer); // Limpa qualquer timer anterior
    duration = seconds;
    timerDisplay.textContent = formatTime(duration);

    timer = setInterval(() => {
        if (duration > 0) {
            duration--;
            timerDisplay.textContent = formatTime(duration);
        } else {
            clearInterval(timer);
            window.location.href = nextAction; // Redireciona para a próxima ação
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

document.getElementById('StartPomodoro').addEventListener('click', () => startTimer(25 * 60, 'index.php?action=short_break'));
document.getElementById('StartShortBreak').addEventListener('click', () => startTimer(5 * 60, 'index.php?action=pomodoro'));
document.getElementById('StartLongBreak').addEventListener('click', () => startTimer(15 * 60, 'index.php?action=pomodoro'));
