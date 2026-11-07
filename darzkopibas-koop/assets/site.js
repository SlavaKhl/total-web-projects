/* Cooperative site scripts: mobile menu, language memory, year, electricity sum, mail forms */
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

  // Electricity form: show the sum to pay (kWh × rate).
  document.querySelectorAll('[data-rate]').forEach(function (input) {
    var form = input.form, box = form.querySelector('[data-sum]'), out = form.querySelector('[data-sum-value]');
    input.addEventListener('input', function () {
      var kwh = parseFloat(input.value.replace(',', '.'));
      box.hidden = !(kwh > 0);
      if (kwh > 0) out.textContent = (kwh * parseFloat(input.getAttribute('data-rate'))).toFixed(2).replace('.', ',');
    });
  });

  // Forms open the visitor's mail client with a prepared message (no server needed).
  document.querySelectorAll('form[data-mail]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      form.querySelectorAll('input, textarea').forEach(function (el) {
        if (el.value.trim()) lines.push(el.name + ': ' + el.value.trim());
      });
      var sum = form.querySelector('[data-sum]');
      if (sum && !sum.hidden) lines.push(sum.textContent.replace(/\s+/g, ' ').trim());
      window.location.href = 'mailto:' + form.getAttribute('data-mail') +
        '?subject=' + encodeURIComponent(form.getAttribute('data-subject')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  });
})();
