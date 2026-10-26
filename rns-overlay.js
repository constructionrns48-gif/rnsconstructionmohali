/* RNS content overlay: applies edits made in /admin/ (content/content.json) to the static pages.
   Sections are only touched after they were edited in the admin (managed flag). If anything fails, the static page stays as is. */
(function () {
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function path() { var p = location.pathname.replace(/\/index\.html$/, '/'); return p === '' ? '/' : p; }
  function pkgHtml(p) {
    return '<div class="price-card' + (p.hot ? ' hot' : '') + '"><h3>' + esc(p.name) + '</h3><p class="pd">' + esc(p.desc) + '</p><p class="pr">' + esc(p.price) + ' <span>' + esc(p.unit) + '</span></p><ul>' +
      (p.features || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul><a class="btn ' + (p.hot ? 'btn-gold' : 'btn-ghost') + '" href="#enquiry"' +
      (p.hot ? '' : ' style="color:var(--navy);border-color:var(--navy)"') + '>Get Free Estimate</a></div>';
  }
  function safeUrl(u) { u = String(u || ''); return /^(https?:\/\/|\/|#|tel:|mailto:)/i.test(u) ? u : '#'; }
  function apply(c) {
    var m = c.managed || {};
    if (m.packages) document.querySelectorAll('.price-grid').forEach(function (g) { g.innerHTML = (c.packages || []).map(pkgHtml).join(''); });
    if (m.projects && /^\/projects\.html$/.test(path())) {
      var g = document.querySelector('.proj-grid');
      if (g) g.innerHTML = (c.projects || []).map(function (p) {
        return '<div class="proj"><img alt="' + esc(p.alt || p.title) + '" loading="lazy" src="' + esc(safeUrl(p.image)) + '"/><div class="pj"><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p></div></div>';
      }).join('');
    }
    if (m.reviews) {
      var r = c.reviews || {}, card = document.querySelector('.rev-card');
      if (card) {
        card.innerHTML = '<div class="rev-score"><div class="rs">' + esc(r.score) + '</div><div class="rev-stars" aria-label="' + esc(r.score) + ' out of 5 stars">' + esc(r.stars) + '</div><div class="rc">' + esc(r.label) + '</div></div>' +
          '<div class="rev-txt"><h3>' + esc(r.heading) + '</h3><p>' + esc(r.text) + '</p><a class="btn btn-gold" href="' + esc(safeUrl(r.linkUrl)) + '" rel="noopener" target="_blank">' + esc(r.linkText) + '</a></div>';
        var old = document.querySelector('.rns-rev-list'); if (old) old.remove();
        if ((r.items || []).length) {
          var d = document.createElement('div'); d.className = 'rns-rev-list';
          d.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:20px';
          d.innerHTML = r.items.map(function (i) {
            return '<div style="background:#fff;border:1px solid #e3e8ef;border-radius:14px;padding:18px"><div style="color:#e8a21a;letter-spacing:2px">' + esc('★★★★★'.slice(0, Math.max(1, Math.min(5, +i.stars || 5)))) + '</div><p style="margin:8px 0;line-height:1.6">' + esc(i.text) + '</p><b>' + esc(i.name) + '</b>' + (i.place ? '<div style="font-size:13px;opacity:.7">' + esc(i.place) + '</div>' : '') + '</div>';
          }).join('');
          card.parentNode.appendChild(d);
        }
      }
    }
    if (m.services) (c.services || []).forEach(function (s) {
      document.querySelectorAll('.svc-card').forEach(function (el) {
        var a = el.querySelector('a.enq'); if (a && a.getAttribute('href') === s.href) { var h = el.querySelector('h3'), p = el.querySelector('.svc-body p'); if (h) h.textContent = s.title; if (p) p.textContent = s.desc; }
      });
      document.querySelectorAll('a.link-card').forEach(function (el) {
        if (el.getAttribute('href') === s.href) { var b = el.querySelector('b'), sp = el.querySelectorAll('span')[0]; if (b && s.pageTitle) b.textContent = s.pageTitle; if (sp && s.pageDesc) sp.textContent = s.pageDesc; }
      });
    });
    if (m.scripts) (c.scripts || []).forEach(function (s) {
      if (!s.enabled || !s.code) return;
      var pg = s.pages; if (pg && pg !== 'all') { var list = String(pg).split(',').map(function (x) { return x.trim(); }); if (list.indexOf(path()) < 0 && list.indexOf(location.pathname) < 0) return; }
      var t = document.createElement('template'); t.innerHTML = s.code;
      var host = s.placement === 'head' ? document.head : document.body;
      Array.prototype.slice.call(t.content.childNodes).forEach(function (n) {
        if (n.nodeName === 'SCRIPT') { var x = document.createElement('script'); Array.prototype.slice.call(n.attributes).forEach(function (a) { x.setAttribute(a.name, a.value); }); x.text = n.text; if (s.placement === 'bodyStart') host.insertBefore(x, host.firstChild); else host.appendChild(x); }
        else if (s.placement === 'bodyStart') host.insertBefore(n, host.firstChild); else host.appendChild(n);
      });
    });
  }
  function run() {
    fetch('/content/content.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (c) { if (c) apply(c); }).catch(function () { });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
