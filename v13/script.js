let timer;
let duration;
let isPaused = false;

// Seletores de elementos do DOM
const timerDisplay = document.getElementById('timerDisplay');
const pauseResumeButton = document.getElementById('PauseResume');
const toastContainer = document.getElementById('toastContainer');

// Formata o tempo no formato MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Exibe notificações em intervalos específicos
function handleToastNotifications(seconds) {
    const minutesLeft = Math.floor(seconds / 60);
    const notifications = [24, 23, 22, 21, 20, 15, 10, 5, 3, 1];

    if (notifications.includes(minutesLeft) && seconds % 60 === 0) {
        showToast(`${minutesLeft} minutos restantes`);
    }
}

// Exibe um toast na tela
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

// Inicia o timer
function startTimer(seconds, nextAction) {
    clearInterval(timer); // Limpa qualquer timer anterior
    duration = seconds;
    timerDisplay.textContent = formatTime(duration);
    isPaused = false;
    pauseResumeButton.textContent = "Pausar"; // Reseta o botão

    // Carrega o áudio usando o caminho absoluto
    const audio = new Audio('http://localhost/neto/pomodoro/v13/assets/alerta.mp3');

    timer = setInterval(() => {
        if (!isPaused && duration > 0) {
            duration--; // Diminui o tempo
            timerDisplay.textContent = formatTime(duration); // Atualiza a exibição do timer
            handleToastNotifications(duration); // Verifica os intervalos para exibir os toasts
        } else if (duration === 0) { // Quando o tempo chega a 0
            clearInterval(timer); // Para o timer
            audio.play() // Reproduz o som
                .catch((err) => console.error('Erro ao reproduzir áudio:', err)); // Captura erros
            setTimeout(() => {
                window.location.href = nextAction; // Redireciona após o som
            }, 3000); // Aguarda 3 segundos antes de redirecionar
        }
    }, 1000);
}

// Alterna entre pausar e retomar o timer
pauseResumeButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseResumeButton.textContent = isPaused ? "Retomar" : "Pausar";
});

// Eventos dos Botões
document.getElementById('StartPomodoro').addEventListener('click', () => startTimer(25 * 60, 'index.php?action=short_break'));
document.getElementById('StartShortBreak').addEventListener('click', () => startTimer(5 * 60, 'index.php?action=pomodoro'));
document.getElementById('StartLongBreak').addEventListener('click', () => startTimer(15 * 60, 'index.php?action=pomodoro'));
