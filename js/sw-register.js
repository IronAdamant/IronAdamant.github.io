// Register Service Worker with automatic update checking
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');

      // Check for updates every 30 seconds when page is visible
      setInterval(() => {
        if (!document.hidden) {
          registration.update();
        }
      }, 30000);

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateNotification();
          }
        });
      });
    } catch (err) {
      console.warn('Service worker registration failed:', err);
    }
  });

  // Listen for messages from service worker
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.type === 'CACHE_UPDATED') {
      showUpdateNotification(event.data.message);
    }
  });
}

// Show update notification to user
function showUpdateNotification(message = 'A new version is available!') {
  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'update-notification';
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #00ff9d, #00cc7a);
      color: #000;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 255, 157, 0.3);
      z-index: 10000;
      font-family: 'Orbitron', monospace;
      font-weight: 600;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    ">
      <div style="margin-bottom: 10px;">${message}</div>
      <button class="sw-update-btn" style="
        background: #000;
        color: #00ff9d;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        margin-right: 10px;
      ">Update Now</button>
      <button class="sw-dismiss-btn" style="
        background: transparent;
        color: #000;
        border: 1px solid #000;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
      ">Later</button>
    </div>
  `;
  
  // Add animation styles
  if (!document.getElementById('update-notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'update-notification-styles';
    styles.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }
  
  // Remove existing notification if any
  const existing = document.getElementById('update-notification');
  if (existing) {
    existing.remove();
  }
  
  document.body.appendChild(notification);

  notification.querySelector('.sw-update-btn').addEventListener('click', refreshPage);
  notification.querySelector('.sw-dismiss-btn').addEventListener('click', dismissNotification);

  // Auto-dismiss after 10 seconds
  setTimeout(() => {
    if (document.getElementById('update-notification')) {
      dismissNotification();
    }
  }, 10000);
}

// Refresh page to apply updates
function refreshPage() {
  window.location.reload();
}

// Dismiss notification
function dismissNotification() {
  const notification = document.getElementById('update-notification');
  if (notification) {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }
}

// Check for updates when page becomes visible
document.addEventListener('visibilitychange', () => {
  const controller = navigator.serviceWorker && navigator.serviceWorker.controller;
  if (!document.hidden && controller) {
    controller.postMessage({ action: 'checkForUpdates' });
  }
});
