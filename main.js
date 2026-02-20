document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated if you only want it to reveal once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: "0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // Countdown Timer (Resets to 24 hours on each visit)
    const timeDisplay = document.querySelector('.countdown-time');
    if (timeDisplay) {
        let timeRemaining = 24 * 60 * 60; // 24 hours in seconds

        const updateTimer = () => {
            if (timeRemaining < 0) timeRemaining = 0;

            const days = Math.floor(timeRemaining / (24 * 3600));
            const hours = Math.floor((timeRemaining % (24 * 3600)) / 3600);
            const mins = Math.floor((timeRemaining % 3600) / 60);
            const secs = Math.floor(timeRemaining % 60);

            const d = String(days).padStart(2, '0');
            const h = String(hours).padStart(2, '0');
            const m = String(mins).padStart(2, '0');
            const s = String(secs).padStart(2, '0');

            timeDisplay.innerHTML = `${d} : ${h} : ${m} : ${s}`;

            if (timeRemaining > 0) {
                timeRemaining--;
            }
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }
});
