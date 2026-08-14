/* form.js — form submission persistence.
 * On submit: validate -> save record to server log (POST /api/submissions)
 * with localStorage fallback -> show confirmation/error states.
 * The record is always ALSO kept in localStorage (retrievable log per browser). */
(function () {
  'use strict';

  var LS_KEY = 'autoforms_log';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function readLog() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch (e) { return []; }
  }
  function appendLog(rec) {
    try {
      var log = readLog();
      log.push(rec);
      localStorage.setItem(LS_KEY, JSON.stringify(log.slice(-200)));
    } catch (e) { /* storage full/unavailable — record still went to server */ }
  }

  function refId() {
    return 'R' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function setError(input, msg) {
    var err = document.getElementById('e-' + input.name);
    if (err) { err.textContent = msg; err.hidden = false; }
    input.setAttribute('aria-invalid', 'true');
  }
  function clearError(input) {
    var err = document.getElementById('e-' + input.name);
    if (err) { err.hidden = true; }
    input.removeAttribute('aria-invalid');
  }

  function validate(form) {
    var ok = true;
    form.querySelectorAll('input,textarea,select').forEach(function (input) {
      var val = (input.value || '').trim();
      clearError(input);
      if (input.required && !val) { setError(input, 'This field is required.'); ok = false; return; }
      if (input.type === 'email' && val && !EMAIL_RE.test(val)) { setError(input, 'Enter a valid email address.'); ok = false; return; }
      if (input.type === 'tel' && val && val.replace(/[^0-9+]/g, '').length < 7) { setError(input, 'Enter a valid phone number.'); ok = false; return; }
    });
    return ok;
  }

  function postRecord(rec) {
    return fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rec)
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  function showState(card, which, rec) {
    var form = card.querySelector('form[data-persist]');
    var done = card.querySelector('.form-done');
    var fail = card.querySelector('.form-fail');
    if (form) form.hidden = true;
    if (done) done.hidden = which !== 'done';
    if (fail) fail.hidden = which !== 'fail';
    if (which === 'done' && done) {
      var id = done.querySelector('.ref-id');
      if (id) id.textContent = rec.ref;
      var mode = done.querySelector('.done-mode');
      if (mode) mode.textContent = rec.mode === 'server'
        ? 'Saved to the server record log (data/submissions.jsonl).'
        : 'Server log unavailable — saved to this browser\'s local record log instead.';
      done.querySelectorAll('button[data-reset-form]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (form) { form.reset(); form.hidden = false; }
          if (done) done.hidden = true;
        });
      });
    }
    if (which === 'fail' && fail) {
      fail.querySelectorAll('button[data-reset-form]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (form) form.hidden = false;
          if (fail) fail.hidden = true;
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form[data-persist]').forEach(function (form) {
      var card = form.closest('.form-card') || form.parentElement;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

        var data = {};
        form.querySelectorAll('input,textarea,select').forEach(function (input) {
          data[input.name] = input.value.trim();
        });
        var rec = {
          ref: refId(),
          site: document.body.getAttribute('data-site') || 'unknown',
          page: document.body.getAttribute('data-page') || 'unknown',
          form: form.getAttribute('data-form') || 'contact',
          ts: new Date().toISOString(),
          data: data
        };

        var done = function (mode) {
          rec.mode = mode;
          appendLog(rec);
          if (btn) { btn.disabled = false; btn.textContent = form.getAttribute('data-submit-label') || 'Send'; }
          showState(card, 'done', rec);
        };
        var failed = function () {
          if (btn) { btn.disabled = false; btn.textContent = form.getAttribute('data-submit-label') || 'Send'; }
          showState(card, 'fail', rec);
        };

        var timer = setTimeout(function () { fallback(); }, 5000);
        function fallback() { clearTimeout(timer); done('local'); }

        postRecord(rec).then(function () { clearTimeout(timer); done('server'); })
          .catch(function () { clearTimeout(timer); fallback(); });
      });
    });
  });
})();
