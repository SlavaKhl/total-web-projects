/* NIKA LAT site scripts: menu, sticky header, reveal, forms, quote wizard, chat */
(function () {
  var doc = document.documentElement;
  doc.classList.remove('no-js');
  var lang = doc.lang === 'ru' ? 'ru' : 'lv';
  var EMAIL = 'nikalat@apollo.lv';

  try { localStorage.setItem('nl-lang', lang); } catch (e) {}

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Header shadow + mobile call bar
  var header = document.querySelector('.header');
  var callbar = document.querySelector('.callbar');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (callbar) callbar.classList.toggle('is-visible', y > 480);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('is-in'); });

  // Forms open the visitor's mail client with a prepared message (no backend yet).
  function mailto(subject, body) {
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }
  function collect(form) {
    var lines = [];
    form.querySelectorAll('[data-label]').forEach(function (el) {
      var val;
      if (el.tagName === 'FIELDSET') {
        val = Array.prototype.map.call(el.querySelectorAll('input:checked'), function (i) { return i.value; }).join(', ');
      } else val = el.value.trim();
      if (val) lines.push(el.getAttribute('data-label').replace(/[?:]\s*$/, '') + ': ' + val);
    });
    return lines.join('\n');
  }

  document.querySelectorAll('form[data-mail]').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      mailto(form.getAttribute('data-mail'), collect(form) + '\n\n— ' + location.href);
      var st = form.querySelector('.form-status');
      if (st) st.classList.add('is-visible');
    });
  });

  // Quote wizard
  var wiz = document.querySelector('[data-wizard]');
  if (wiz) {
    var steps = wiz.querySelectorAll('.wizard__step');
    var bars = wiz.querySelectorAll('.wizard__progress i');
    var prev = wiz.querySelector('[data-prev]');
    var next = wiz.querySelector('[data-next]');
    var send = wiz.querySelector('[data-send]');
    var summary = wiz.querySelector('.wizard__summary');
    var i = 0;
    function show(n) {
      i = n;
      steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      bars.forEach(function (b, k) { b.classList.toggle('is-done', k <= i); });
      prev.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      send.hidden = i !== steps.length - 1;
      if (i === steps.length - 1 && summary) summary.textContent = collect(wiz) || '—';
    }
    function valid() {
      var ok = true;
      steps[i].querySelectorAll('input, select, textarea').forEach(function (el) {
        if (ok && !el.checkValidity()) { el.reportValidity(); ok = false; }
      });
      return ok;
    }
    next.addEventListener('click', function () { if (valid()) show(i + 1); });
    prev.addEventListener('click', function () { show(i - 1); });
    wiz.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!valid()) return;
      mailto(wiz.getAttribute('data-subject'), collect(wiz) + '\n\n— ' + location.href);
      wiz.querySelector('.form-status').classList.add('is-visible');
    });
    show(0);
  }

  // Year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Chatbase assistant (existing Nika-Lat agent). Set data-chatbase="" on <body> to switch off.
  var chatId = document.body.getAttribute('data-chatbase');
  if (chatId) {
    window.chatbase = window.chatbase || function () { (window.chatbase.q = window.chatbase.q || []).push(arguments); };
    window.addEventListener('load', function () {
      if (document.getElementById(chatId)) return;
      var s = document.createElement('script');
      s.src = 'https://www.chatbase.co/embed.min.js';
      s.id = chatId;
      s.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(s);
    }, { once: true });
  }
})();
