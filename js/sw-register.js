/**
 * Service worker registration + simple update toast.
 */

function showUpdateNotification(message) {
    const existing = document.getElementById('update-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'update-notification';
    toast.className = 'update-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
        <p>${message || 'A new version is available.'}</p>
        <div class="cta-row">
            <button type="button" class="btn btn-primary sw-update-btn">Refresh</button>
            <button type="button" class="btn btn-secondary sw-dismiss-btn">Later</button>
        </div>
    `;
    document.body.appendChild(toast);

    toast.querySelector('.sw-update-btn').addEventListener('click', () => location.reload());
    toast.querySelector('.sw-dismiss-btn').addEventListener('click', () => toast.remove());
    setTimeout(() => toast.remove(), 12000);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');

            registration.addEventListener('updatefound', () => {
                const worker = registration.installing;
                if (!worker) return;
                worker.addEventListener('statechange', () => {
                    if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateNotification('A new version is available.');
                    }
                });
            });

            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) registration.update();
            });
        } catch (err) {
            console.warn('Service worker registration failed:', err);
        }
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
            showUpdateNotification(event.data.message);
        }
    });
}
