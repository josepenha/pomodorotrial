<?php include 'templates/header.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pomodoro Timer</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php include 'templates/menu.php'; ?>
    <main>
        <h1>Pomodoro Timer</h1>
        <div class="timer-container">
            <button id="StartPomodoro" class="btn">Iniciar Pomodoro</button>
            <button id="StartShortBreak" class="btn">Iniciar Curta Pausa</button>
            <button id="StartLongBreak" class="btn">Iniciar Longa Pausa</button>
        </div>
        <div id="timerDisplay">25:00</div>
        <button id="PauseResume" class="btn pause-btn">Pausar</button>

        <!-- Toast container -->
    <div id="toastContainer" class="toast-container"></div>
  
    </main>
    <script src="script.js"></script>
</body>
<?php include 'templates/footer.php'; ?>
</html>
