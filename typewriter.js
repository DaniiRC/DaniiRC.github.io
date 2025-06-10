function setupTypewriter(phrases) {
    const element = document.querySelector('.typewriter');
    if (!element) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let timeoutId;

    // Limpia cualquier animación anterior
    if (element._typewriterTimeout) {
        clearTimeout(element._typewriterTimeout);
    }

    function type() {
        if (isPaused) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isPaused = true;
            timeoutId = setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, 1500);
            element._typewriterTimeout = timeoutId;
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const speed = isDeleting ? 50 : 100;
        timeoutId = setTimeout(type, speed);
        element._typewriterTimeout = timeoutId;
    }

    // Inicia la animación
    type();
}

export { setupTypewriter };