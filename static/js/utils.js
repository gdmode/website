// Utility functions for the website

// Show the notice bar only when the navbar is at the very top
window.addEventListener('scroll', () => {
  const noticeBar = document.querySelector('.notice-bar');
  const heroSection = document.querySelector('.hero');

  if (window.scrollY === 0) {
    noticeBar.style.display = 'block';
  } else if (heroSection && window.scrollY >= heroSection.offsetTop) {
    noticeBar.style.display = 'none';
  }
});

// Tabs for scripting examples
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.script-tab');
  if (!tabs.length) return;

  function activateTab(tab) {
    const target = tab.dataset.target;
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.script-example').forEach(el => el.setAttribute('hidden', ''));
    const example = document.getElementById(target);
    if (example) example.removeAttribute('hidden');
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => activateTab(t));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const idx = Array.from(tabs).indexOf(t);
        const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        activateTab(tabs[next]);
        e.preventDefault();
      }
    });
  });
});

// Create a persistent horizontal scrollbar under each code pane and sync it
function initCodeScrollbars() {
  document.querySelectorAll('.script-pane').forEach(pane => {
    // avoid creating multiple scrollbars
    if (pane.querySelector('.code-scrollbar')) return;

    const highlight = pane.querySelector('.highlight') || pane.querySelector('.chroma') || pane.querySelector('pre');
    if (!highlight) return;

    // append scrollbar INSIDE the pane so it's always visible
    const scrollbar = document.createElement('div');
    scrollbar.className = 'code-scrollbar';
    const inner = document.createElement('div');
    inner.className = 'scrollbar-inner';
    scrollbar.appendChild(inner);
    pane.appendChild(scrollbar);

    function syncWidth() {
      // set inner width to content scrollWidth so scrollbar reflects content
      inner.style.width = (highlight.scrollWidth) + 'px';
    }

    function onScroll() {
      scrollbar.scrollLeft = highlight.scrollLeft;
    }

    function onBarScroll() {
      highlight.scrollLeft = scrollbar.scrollLeft;
    }

    // initial sync
    syncWidth();

  // event listeners
  highlight.addEventListener('scroll', onScroll);
  scrollbar.addEventListener('scroll', onBarScroll);
  window.addEventListener('resize', syncWidth);

    // track DOM changes that could change width (e.g., highlighting applied)
    const ro = new MutationObserver(syncWidth);
    ro.observe(highlight, { childList: true, subtree: true, characterData: true });
  });
}

document.addEventListener('DOMContentLoaded', initCodeScrollbars);
