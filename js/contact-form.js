/**
 * Contact Form Module - Form validation, submission, spam protection
 */

// ====== CONSTANTS & VALIDATORS (file scope) ======
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[\p{L}\p{M}\s'.-]+$/u;
const CHAR_LIMITS = {
    name: { min: 2, max: 100 },
    email: { min: 5, max: 100 },
    subject: { min: 5, max: 200 },
    message: { min: 10, max: 2000 }
};

const VALIDATORS = {
    name(value) {
        if (!value.trim()) return 'Name is required';
        if (value.length < CHAR_LIMITS.name.min) return `Name must be at least ${CHAR_LIMITS.name.min} characters`;
        if (value.length > CHAR_LIMITS.name.max) return `Name must be less than ${CHAR_LIMITS.name.max} characters`;
        if (!NAME_REGEX.test(value)) return 'Name contains invalid characters';
        return '';
    },
    email(value) {
        if (!value.trim()) return 'Email is required';
        if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
        return '';
    },
    subject(value) {
        const ownerForm = document.querySelector('#contactForm [name="audience"][value="small-business"]');
        const emptyMsg = ownerForm ? 'Tell me what’s eating the week, in a few words' : 'Subject is required';
        const shortMsg = ownerForm
            ? `A few more words. At least ${CHAR_LIMITS.subject.min} characters`
            : `Subject must be at least ${CHAR_LIMITS.subject.min} characters`;
        if (!value.trim()) return emptyMsg;
        if (value.length < CHAR_LIMITS.subject.min) return shortMsg;
        if (value.length > CHAR_LIMITS.subject.max) return `Must be less than ${CHAR_LIMITS.subject.max} characters`;
        return '';
    },
    message(value) {
        if (!value.trim()) return 'Message is required';
        if (value.length < CHAR_LIMITS.message.min) return `Message must be at least ${CHAR_LIMITS.message.min} characters`;
        if (value.length > CHAR_LIMITS.message.max) return `Message must be less than ${CHAR_LIMITS.message.max} characters`;
        return '';
    }
};

function announceToScreenReader(message, priority) {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;
    document.body.appendChild(liveRegion);
    setTimeout(() => liveRegion.remove(), 1000);
}

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
    const buttonText = submitButton ? submitButton.querySelector('.button-text') : null;
    const formSuccess = document.getElementById('form-success');
    const formLoadTime = performance.now();

    // Initialize character count
    if (messageInput && messageCount) {
        updateCharacterCount();
        messageInput.addEventListener('input', updateCharacterCount);
    }

    // Form submission handler
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const isNameValid = validateField(nameInput, VALIDATORS.name);
        const isEmailValid = validateField(emailInput, VALIDATORS.email);
        const isSubjectValid = validateField(subjectInput, VALIDATORS.subject);
        const isMessageValid = validateField(messageInput, VALIDATORS.message);

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
            const validationFn = VALIDATORS[input.id];
            if (validationFn) validateField(input, validationFn);
        }, 200);
    }

    function showError(input, errorElement, message) {
        if (!input || !errorElement) return;
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
        announceToScreenReader(message, 'assertive');
    }

    function clearError(input, errorElement) {
        if (!input) return;
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        const error = errorElement || document.getElementById(`${input.id}-error`);
        if (error) error.textContent = '';
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

    async function submitForm() {
        // Anti-spam checks
        const timeTaken = performance.now() - formLoadTime;
        if (timeTaken < 3000) {
            await new Promise(resolve => setTimeout(resolve, 2000));
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
        if (buttonText) buttonText.textContent = submitButton.getAttribute('data-loading-text');

        try {
            const formData = new FormData();
            const audienceInput = form.querySelector('[name="audience"]');
            const audience = audienceInput ? audienceInput.value.trim() : '';
            const subjectValue = subjectInput.value.trim();
            formData.append('name', nameInput.value.trim());
            formData.append('email', emailInput.value.trim());
            formData.append(
                'subject',
                audience === 'small-business' ? `[Owner] ${subjectValue}` : subjectValue
            );
            formData.append('message', messageInput.value.trim());
            if (audience) formData.append('audience', audience);

            const response = await fetch('https://formspree.io/f/xjkrzwlq', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset();
                formSuccess.hidden = false;
                formSuccess.innerHTML = `<p><strong>Message sent.</strong> Thanks. I’ll reply within 1 to 2 business days.</p>`;
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
            if (buttonText) buttonText.textContent = 'Send message';
        }
    }

    function showFakeSuccess() {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
        if (buttonText) buttonText.textContent = 'Send message';

        const fakeSuccess = document.createElement('div');
        fakeSuccess.className = 'success-message';
        fakeSuccess.textContent = 'Message sent successfully!';
        form.appendChild(fakeSuccess);
        form.reset();
        setTimeout(() => fakeSuccess.remove(), 3000);
    }

    function showFormError(message) {
        const existingError = form.querySelector('.form-submit-error');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-submit-error';
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
}

// Export for use in main.js
window.initContactForm = initContactForm;
