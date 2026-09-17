/**
 * Filter static work items on work.html by data-category.
 */

function initWorkFilters() {
    const bar = document.querySelector('.filter-bar');
    const items = document.querySelectorAll('.work-item');
    if (!bar || !items.length) return;

    const buttons = bar.querySelectorAll('.filter-btn');
    if (!buttons.length) return;

    function applyFilter(category) {
        items.forEach((item) => {
            const match = category === 'all' || item.getAttribute('data-category') === category;
            item.hidden = !match;
        });
    }

    bar.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-btn');
        if (!button || !bar.contains(button)) return;

        const category = button.getAttribute('data-category') || 'all';

        buttons.forEach((btn) => {
            const active = btn === button;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        applyFilter(category);
    });
}

window.initWorkFilters = initWorkFilters;
