/* Cooperative site scripts: mobile menu, language memory, year, mail forms */
(function () {
  document.documentElement.classList.remove('no-js');
  // Remember the chosen language for the root page redirect.
  try { localStorage.setItem('dks-lang', document.documentElement.lang); } catch (e) {}

  var btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Forms open the visitor's mail client with a prepared message (no server needed).
  document.querySelectorAll('form[data-mail]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      form.querySelectorAll('input, textarea').forEach(function (el) {
        if (el.value.trim()) lines.push(el.name + ': ' + el.value.trim());
      });
      window.location.href = 'mailto:' + form.getAttribute('data-mail') +
        '?subject=' + encodeURIComponent(form.getAttribute('data-subject')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  });
})();
