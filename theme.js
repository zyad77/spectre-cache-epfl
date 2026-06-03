(() => {
  const root = document.documentElement;
  const storageKey = 'spectre-theme';

  const themes = {
    light: {
      '--bg': '#ffffff',
      '--bg-card': '#f7f7f7',
      '--bg-elevated': '#ffffff',
      '--section-bg': '#ffffff',
      '--section-alt': '#f7f7f7',
      '--border': '#e5e5e5',
      '--border-glow': 'rgba(255,0,0,0.25)',
      '--text': '#181820',
      '--text-muted': '#5f6270',
      '--text-light': '#858895',
      '--code-bg': '#f7f7f7',
      '--sim-bg': '#f7f7f7',
      '--log-bg': '#ffffff',
      '--cache-cold': '#ededed',
      '--cache-flush': '#f4f4f4'
    },
    dark: {
      '--bg': '#0a0a0f',
      '--bg-card': '#0f0f1a',
      '--bg-elevated': '#14141f',
      '--section-bg': '#0a0a0f',
      '--section-alt': '#0f0f1a',
      '--border': 'rgba(255,255,255,0.07)',
      '--border-glow': 'rgba(255,80,80,0.25)',
      '--text': '#e8e8f0',
      '--text-muted': '#8888a8',
      '--text-light': '#55556a',
      '--code-bg': '#060609',
      '--sim-bg': '#06060a',
      '--log-bg': '#030305',
      '--cache-cold': '#1a1a2a',
      '--cache-flush': '#0a0a0f'
    }
  };

  function readTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (_) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_) {
      /* The toggle still works when localStorage is unavailable. */
    }
  }

  function ensureButton() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner || document.querySelector('.theme-toggle')) return;

    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.type = 'button';
    button.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true">☾</span><span class="theme-toggle-text">Mode sombre</span>';
    navInner.appendChild(button);
  }

  function updateButtons(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll('.theme-toggle').forEach((button) => {
      button.removeAttribute('onclick');
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');

      const icon = button.querySelector('.theme-toggle-icon');
      const text = button.querySelector('.theme-toggle-text');
      if (icon) icon.textContent = isDark ? '☀' : '☾';
      if (text) text.textContent = isDark ? 'Mode clair' : 'Mode sombre';
    });
  }

  function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', nextTheme);

    Object.entries(themes[nextTheme]).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    saveTheme(nextTheme);
    updateButtons(nextTheme);
  }

  function toggleTheme() {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  window.toggleSpectreTheme = toggleTheme;
  applyTheme(readTheme() === 'dark' ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', () => {
    ensureButton();
    updateButtons(root.getAttribute('data-theme') || 'light');

    document.addEventListener('click', (event) => {
      if (event.target.closest('.theme-toggle')) {
        toggleTheme();
      }
    });
  });
})();
