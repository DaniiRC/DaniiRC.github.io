// form.js
export function setupForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validación personalizada
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        // Validar email con expresión regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            showNotification('El nombre es obligatorio.', 'error');
            return;
        }
        if (!email || !emailRegex.test(email)) {
            showNotification('Introduce un correo electrónico válido.', 'error');
            return;
        }
        if (!message || message.length < 15) {
            showNotification('El mensaje debe tener al menos 15 caracteres.', 'error');
            return;
        }

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Usar FormSubmit.co como servicio gratuito
            const response = await fetch('https://formsubmit.co/ajax/daniirc.contacto@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const result = await response.json();

            if (response.ok) {
                showNotification('Se ha enviado correctamente su mensaje, ¡gracias!', 'success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Error al enviar');
            }
        } catch (error) {
            showNotification(`Error: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    // Posición abajo a la izquierda
    notification.style.position = 'fixed';
    notification.style.left = '30px';
    notification.style.bottom = '30px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '260px';
    notification.style.padding = '16px 24px';
    notification.style.borderRadius = '8px';
    notification.style.background = type === 'success' ? '#2ecc40' : '#e74c3c';
    notification.style.color = '#fff';
    notification.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
    notification.style.fontSize = '1rem';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}