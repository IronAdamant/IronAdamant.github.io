/**
 * Contact Form Module - Form validation, submission, spam protection
 */

// ====== CONTACT FORM ======
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const messageCount = document.getElementById('message-count');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const formSuccess = document.getElementById('form-success');

    // Validation regexes
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s'-]+$/;

    // Character limits
    const CHAR_LIMITS = {
        name: { min: 2, max: 100 },
        email: { min: 5, max: 100 },
        subject: { min: 5, max: 200 },
        message: { min: 10, max: 2000 }
    };

    // Track form load time for spam detection
    window.formLoadTime = performance.now();

    // Initialize character count
    if (messageInput && messageCount) {
        updateCharacterCount();
        messageInput.addEventListener('input', updateCharacterCount);
    }

    // Form submission handler
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const isNameValid = validateField(nameInput, validateName);
        const isEmailValid = validateField(emailInput, validateEmail);
        const isSubjectValid = validateField(subjectInput, validateSubject);
        const isMessageValid = validateField(messageInput, validateMessage);

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            await submitForm();
        } else {
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Real-time validation on blur
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('blur', () => validateOnBlur(input));
            input.addEventListener('input', () => clearError(input));
        }
    });

    // Validation functions
    function validateName(value) {
        if (!value.trim()) return 'Name is required';
        if (value.length < CHAR_LIMITS.name.min) return `Name must be at least ${CHAR_LIMITS.name.min} characters`;
        if (value.length > CHAR_LIMITS.name.max) return `Name must be less than ${CHAR_LIMITS.name.max} characters`;
        if (!nameRegex.test(value)) return 'Name contains invalid characters';
        return '';
    }

    function validateEmail(value) {
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
    }

    function validateSubject(value) {
        if (!value.trim()) return 'Subject is required';
        if (value.length < CHAR_LIMITS.subject.min) return `Subject must be at least ${CHAR_LIMITS.subject.min} characters`;
        if (value.length > CHAR_LIMITS.subject.max) return `Subject must be less than ${CHAR_LIMITS.subject.max} characters`;
        return '';
    }

    function validateMessage(value) {
        if (!value.trim()) return 'Message is required';
        if (value.length < CHAR_LIMITS.message.min) return `Message must be at least ${CHAR_LIMITS.message.min} characters`;
        if (value.length > CHAR_LIMITS.message.max) return `Message must be less than ${CHAR_LIMITS.message.max} characters`;
        return '';
    }

    function validateField(input, validationFn) {
        if (!input) return true;

        const errorElement = document.getElementById(`${input.id}-error`);
        const errorMessage = validationFn(input.value);

        if (errorMessage) {
            showError(input, errorElement, errorMessage);
            return false;
        } else {
            clearError(input, errorElement);
            return true;
        }
    }

    let blurTimeout;
    function validateOnBlur(input) {
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(() => {
            let validationFn;
            switch (input.id) {
                case 'name': validationFn = validateName; break;
                case 'email': validationFn = validateEmail; break;
                case 'subject': validationFn = validateSubject; break;
                case 'message': validationFn = validateMessage; break;
            }
            if (validationFn) validateField(input, validationFn);
        }, 200);
    }

    function showError(input, errorElement, message) {
        if (!input || !errorElement) return;

        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
        errorElement.classList.add('visible');

        announceToScreenReader(message, 'assertive');
    }

    function clearError(input, errorElement) {
        if (!input) return;

        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');

        const error = errorElement || document.getElementById(`${input.id}-error`);
        if (error) {
            error.textContent = '';
            error.classList.remove('visible');
        }
    }

    function updateCharacterCount() {
        if (!messageInput || !messageCount) return;

        const currentLength = messageInput.value.length;
        messageCount.textContent = currentLength;

        const maxLength = CHAR_LIMITS.message.max;
        const limitPercentage = currentLength / maxLength;

        if (limitPercentage > 0.9) {
            messageCount.style.color = 'var(--error)';
        } else if (limitPercentage > 0.7) {
            messageCount.style.color = 'orange';
        } else {
            messageCount.style.color = 'var(--text-secondary)';
        }

        if ([maxLength - 100, maxLength - 50, maxLength - 10].includes(currentLength)) {
            announceToScreenReader(`You have ${maxLength - currentLength} characters remaining.`, 'polite');
        }
    }

    function announceToScreenReader(message, priority) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.className = 'sr-only';
        liveRegion.textContent = message;
        document.body.appendChild(liveRegion);
        setTimeout(() => document.body.removeChild(liveRegion), 1000);
    }

    async function submitForm() {
        // Anti-spam checks
        const timeTaken = performance.now() - (window.formLoadTime || performance.now() - 2000);
        if (timeTaken < 3000) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Content spam detection
        const messageText = messageInput.value.toLowerCase();
        const spamKeywords = ['crypto', 'bitcoin', 'investment', 'earn money', 'guaranteed', 'click here', 'free money', 'viagra', 'casino'];
        const spamScore = spamKeywords.filter(keyword => messageText.includes(keyword)).length;
        if (spamScore >= 2) {
            const extraVerify = confirm('Your message contains content that might be flagged as spam. Are you sure you want to send this message?');
            if (!extraVerify) return;
        }

        // Honeypot check
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value !== '') {
            await new Promise(resolve => setTimeout(resolve, 3000));
            showFakeSuccess();
            return;
        }

        // Disable submit button
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        buttonText.textContent = submitButton.getAttribute('data-loading-text');

        try {
            const formData = new FormData();
            formData.append('name', nameInput.value.trim());
            formData.append('email', emailInput.value.trim());
            formData.append('subject', subjectInput.value.trim());
            formData.append('message', messageInput.value.trim());

            const response = await fetch('https://formspree.io/f/xjkrzwlq', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formSuccess.hidden = false;
                form.reset();
                formSuccess.innerHTML = `
                    <i class="fas fa-check-circle" aria-hidden="true"></i>
                    <strong>Message Transmitted Successfully!</strong><br>
                    <small>Thank you for reaching out. I'll respond within 24-48 hours.</small>
                `;
                announceToScreenReader(formSuccess.textContent.trim(), 'polite');
                formSuccess.focus();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('Unable to send your message. Please email me directly at aron.amos@ironadamant.com');
        } finally {
            submitButton.disabled = false;
            submitButton.removeAttribute('aria-busy');
            buttonText.textContent = 'Transmit Message';
        }
    }

    function showFakeSuccess() {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
        buttonText.textContent = 'Transmit Message';

        const fakeSuccess = document.createElement('div');
        fakeSuccess.style.cssText = 'margin-top:1rem;padding:1rem;background:#00ff9d;color:#000;border-radius:4px;';
        fakeSuccess.textContent = 'Message sent successfully!';
        form.appendChild(fakeSuccess);
        form.reset();
        setTimeout(() => fakeSuccess.remove(), 3000);
    }

    function showFormError(message) {
        const existingError = form.querySelector('.error-message');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'margin-top:1rem;padding:1rem;background:#ff4444;color:white;border-radius:4px;';
        errorDiv.textContent = message;
        form.appendChild(errorDiv);

        announceToScreenReader(message, 'assertive');
        setTimeout(() => errorDiv.remove(), 5000);
    }

    // Initialize ARIA attributes
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) {
            input.setAttribute('aria-describedby', `${input.id}-error`);
            input.setAttribute('aria-required', 'true');
        }
    });

    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        button[aria-busy="true"] { position:relative; color:transparent!important; pointer-events:none; }
        button[aria-busy="true"] .button-spinner {
            display:inline-block; width:1.5em; height:1.5em;
            border:2px solid currentColor; border-radius:50%; border-top-color:transparent;
            animation:spin 1s linear infinite;
            position:absolute; top:50%; left:50%; margin:-0.75em 0 0 -0.75em;
        }
        @keyframes spin { to { transform:rotate(360deg); } }
    `;
    document.head.appendChild(style);
}

// Export for use in main.js
window.initContactForm = initContactForm;
