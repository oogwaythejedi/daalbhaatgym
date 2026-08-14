/* main.js — shared site behavior: inline icons, mobile nav, active link, reveal, year */
(function () {
  'use strict';

  var ICONS = {
    'arrow-right': 'M5 12h14M13 6l6 6-6 6',
    'arrow-up-right': 'M7 17L17 7M8 7h9v9',
    check: 'M5 12l5 5 9-10',
    'chevron-down': 'M6 9l6 6 6-6',
    star: 'M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8L12 3z',
    bag: 'M6 8h12l-1.2 11a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8zM9 8V6a3 3 0 0 1 6 0v2',
    bolt: 'M13 2L4.5 14H10l-1 8L18.5 10H13l1-8z',
    leaf: 'M5 19C5 10 13 5 20 5c0 8-6 14-15 14zM5 19c4-6 8-9 12-11',
    dumbbell: 'M7 6v12M17 6v12M4 9v6M20 9v6M7 12h10',
    home: 'M4 11l8-7 8 7M6 10v10h12V10',
    phone: 'M5 4h4l2 5-2.2 1.6a12 12 0 0 0 5.6 5.6L16 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    chat: 'M4 5h16v11H9.5L4 19V5z',
    board: 'M4 4h16v4H4zM4 11h6v9H4zM13 11h7v5h-7z',
    school: 'M4 10l8-5 8 5M6 10v8h12v-8M10 18v-5h4v5',
    wrench: 'M14.5 6a4.5 4.5 0 0 1 6.3 4.1l-3.4 3.4-3.3-3.3 3.4-3.4a4.4 4.4 0 0 1-3-1.8zM9.5 12.5L4 18a2 2 0 1 0 2.8 2.8l5.6-5.6',
    heart: 'M12 21S4 15.5 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z',
    moon: 'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z',
    swap: 'M7 4v13M7 17l-3-3M7 17l3-3M17 20V7M17 7l-3 3M17 7l3 3',
    wallet: 'M3 6h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3V6zM3 6a2 2 0 0 1 2-2h12v4M16 14h.01',
    users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2.5 20a6.5 6.5 0 0 1 13 0M16 6.5a3 3 0 0 1 0 5.8M17.5 20a5 5 0 0 0-2.4-4.3',
    shield: 'M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3zM9 12l2 2 4-4',
    truck: 'M2 7h12v9H2zM14 10h4l3 3v3h-7zM6 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    spark: 'M12 2l2.1 7.1L21 11l-6.9 1.9L12 20l-2.1-7.1L3 11l6.9-1.9L12 2z',
    play: 'M7 5l12 7-12 7V5z',
    pin: 'M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11zM12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    utensils: 'M6 3v7m0 0v11M6 10a3 3 0 0 1 3 3M16 3c0 6 3 7 3 13v5M16 3v18',
    bed: 'M3 18v-8h18v8M3 14h18M7 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    car: 'M4 17v-4l2-5h12l2 5v4M4 17h16M6 17v2M18 17v2M7 14h.01M17 14h.01',
    camera: 'M4 7h3l2-2h6l2 2h3v12H4V7zM12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    bookmark: 'M6 4h12v17l-6-4-6 4V4z',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    calendar: 'M4 5h16v15H4zM4 9h16M8 3v4M16 3v4',
    mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.5-4.5',
    filter: 'M4 5h16M7 12h10M10 19h4',
    plus: 'M12 5v14M5 12h14',
    menu: 'M4 7h16M4 12h16M4 17h16',
    x: 'M6 6l12 12M18 6L6 18',
    send: 'M4 11l16-7-7 16-2-7-7-2z',
    download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
    refresh: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    lock: 'M6 11h12v10H6zM8 11V8a4 4 0 0 1 8 0v3',
    globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18',
    cup: 'M6 8h12v3a6 6 0 0 1-12 0V8zM8 21h8M10 8V4M14 8V4',
    facebook: 'M14 8h3V5h-3a4 4 0 0 0-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1z',
    instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.2 6.8h.01',
    twitter: 'M4 4l7.2 9.3L4.4 20h2.6l5.4-5.4L16.8 20H20l-7.5-9.7L18.9 4h-2.6l-4.9 5L8.3 4H4z',
    youtube: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zM10 9.5v5l4.5-2.5L10 9.5z',
    whatsapp: 'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zM9 8.5c.3 1.6 1.6 2.9 3.2 3.2l.8-1-1.2-.6.6-1.4-1.8.4c-.9-.5-1.6-1.2-1.6-.6z',
    linkedin: 'M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 10v7M8 7.5v.01M12 17v-4a2 2 0 0 1 4 0v4',
    tiktok: 'M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.3 2.5 2 4.3 4.5 4.5',
    sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    tent: 'M12 4l9 15H3l9-15zM6.5 19l2.2-5M17.5 19l-2.2-5M9 14l3-4 3 4',
    mountain: 'M3 19h18L13 5l-2.5 5L8 8 3 19zM13 19l-2-6M7 19l1-3',
    chart: 'M4 20v-9M10 20V4M16 20v-7M21 20H3'
  };

  function injectIcons(root) {
    var els = (root || document).querySelectorAll('[data-icon]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var name = el.getAttribute('data-icon');
      var d = ICONS[name] || ICONS.spark;
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
      el.appendChild(svg);
    }
  }

  function setupNav() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.hidden = open;
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    });
  }

  function setupHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setupReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.sec');
    els.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  function setupYear() {
    var y = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectIcons(document);
    setupNav();
    setupHeader();
    setupReveal();
    setupYear();
  });
})();
