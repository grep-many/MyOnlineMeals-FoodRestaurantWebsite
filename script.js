document.addEventListener('DOMContentLoaded', () => {
    const notificationContainer = document.getElementById('notification-container');

    function showNotification(msg) {
        const notification = document.createElement('div');
        notification.className = 'notification';

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => closeNotification(notification));
        notification.appendChild(closeButton);

        const message = document.createElement('span');
        message.textContent = msg;
        notification.appendChild(message);

        notificationContainer.prepend(notification);

        notification.style.height = 'auto';

        const startTime = Date.now();
        const duration = 3000;

        const startTimer = (timeLeft) => {
            return setTimeout(() => {
                if (notificationContainer.contains(notification)) {
                    closeNotification(notification);
                }
            }, timeLeft);
        };

        let timer = startTimer(duration);

        notification.addEventListener('mouseenter', () => {
            clearTimeout(timer);
        });

        notification.addEventListener('mouseleave', () => {
            const elapsedTime = Date.now() - startTime;
            const timeLeft = duration - elapsedTime;

            if (timeLeft > 0) {
                timer = startTimer(timeLeft);
            } else {
                closeNotification(notification);
            }
        });
    }

    function closeNotification(notification) {
        notification.style.animation = 'slide-out 0.5s forwards';
        notification.addEventListener('animationend', () => {
            if (notificationContainer.contains(notification)) {
                notificationContainer.removeChild(notification);
            }
        });
    }

    document.querySelectorAll('button').forEach(button=>(
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification("Static website! It doesn't work");
        })
    ));
});
