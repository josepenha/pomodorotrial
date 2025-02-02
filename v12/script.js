let timer;
let duration;
let isPaused = false;
const timerDisplay = document.getElementById('timerDisplay');
const pauseResumeButton = document.getElementById('PauseResume');
const toastContainer = document.getElementById('toastContainer');

function startTimer(seconds, nextAction) {
    clearInterval(timer); // Limpa qualquer timer anterior
    duration = seconds;
    timerDisplay.textContent = formatTime(duration);
    isPaused = false;
    pauseResumeButton.textContent = "Pausar"; // Reseta o botão

    timer = setInterval(() => {
        if (!isPaused && duration > 0) {
            duration--;
            timerDisplay.textContent = formatTime(duration);
            handleToastNotifications(duration); // Verifica os intervalos para exibir os toasts
        } else if (duration === 0) {
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

function handleToastNotifications(seconds) {
    const minutesLeft = Math.floor(seconds / 60);
    const notifications = [24, 23, 22, 21, 20, 15, 10, 5, 3, 1];

    if (notifications.includes(minutesLeft) && seconds % 60 === 0) {
        showToast(`${minutesLeft} minutos restantes`);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Remove o toast após 10 segundos
    setTimeout(() => {
        toast.remove();
    }, 10000);
}

// Alterna entre pausar e retomar
pauseResumeButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseResumeButton.textContent = isPaused ? "Retomar" : "Pausar";
});

// Eventos dos botões de ação
document.getElementById('StartPomodoro').addEventListener('click', () => startTimer(25 * 60, 'index.php?action=short_break'));
document.getElementById('StartShortBreak').addEventListener('click', () => startTimer(5 * 60, 'index.php?action=pomodoro'));
document.getElementById('StartLongBreak').addEventListener('click', () => startTimer(15 * 60, 'index.php?action=pomodoro'));
