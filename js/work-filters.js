/**
 * Filter static work items on work.html by data-category.
 */

function initWorkFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.work-item');
    if (!buttons.length || !items.length) return;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category') || 'all';

            buttons.forEach((btn) => {
                const active = btn === button;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });

            items.forEach((item) => {
                const match = category === 'all' || item.getAttribute('data-category') === category;
                item.hidden = !match;
            });
        });
    });
}

window.initWorkFilters = initWorkFilters;
