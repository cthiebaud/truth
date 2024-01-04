// timerModule.js

export function startTimer(totalTime, canvasId, onTimerEndCallback, onTimerKilledCallback) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let timerId;

    function drawTimer(timeRemaining) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Set lineJoin to 'round' to eliminate the border
        ctx.lineJoin = 'round';
        ctx.lineWidth = 0.001;
        const angle = ((totalTime - timeRemaining) / totalTime) * 2 * Math.PI;

        // Increase the radius slightly to cover any potential border artifacts
        const whiteRadius = radius + 1;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, whiteRadius, -Math.PI / 2, -Math.PI / 2 + angle);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    function updateTimer(timestamp, startTime) {
        const progress = (timestamp - startTime) / 1000;
        const timeRemaining = Math.max(totalTime - progress, 0);

        drawTimer(timeRemaining);

        if (timeRemaining > 0) {
            timerId = requestAnimationFrame((timestamp) => updateTimer(timestamp, startTime));
        } else {
            // Timer has ended, call the callback function
            onTimerEndCallback();
        }
    }

    const start = () => {
        const startTime = performance.now();
        timerId = requestAnimationFrame((timestamp) => updateTimer(timestamp, startTime));
    };

    const stop = () => {
        cancelAnimationFrame(timerId);
        if (onTimerKilledCallback) {
            onTimerKilledCallback();
        }
    };

    return {
        start, stop
    };
}
