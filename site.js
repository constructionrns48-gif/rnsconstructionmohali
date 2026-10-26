(function () {
  var WA = 'https://wa.me/918750510489?text=';
  function waMsg(t) { return WA + encodeURIComponent(t); }

  // Mobile menu
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var existing = document.querySelector('.m-menu');
      if (existing) { existing.remove(); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); return; }
      burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Close menu');
      var m = document.createElement('div');
      m.className = 'm-menu open';
      m.innerHTML = '<a href="/">Home</a><a href="/about.html">About Us</a><a href="/services.html">Services</a>' +
        '<div class="m-grp">Services</div>' +
        '<a href="/services-house-construction.html">House Construction</a>' +
        '<a href="/services-commercial-building.html">Commercial Building Construction</a>' +
        '<a href="/services-turnkey-projects.html">Turnkey Projects</a>' +
        '<a href="/services-architectural-design.html">Architectural &amp; Structural Design</a>' +
        '<a href="/services-interior-design.html">Interior Design</a>' +
        '<a href="/services-renovation.html">Home Renovation &amp; Remodeling</a>' +
        '<a href="/projects.html">Projects</a>' +
        '<div class="m-grp">Areas We Serve</div>' +
        '<a href="/areas-mohali.html">Mohali</a><a href="/areas-zirakpur.html">Zirakpur</a><a href="/areas-kharar.html">Kharar</a><a href="/areas-chandigarh.html">Chandigarh</a><a href="/areas-panchkula.html">Panchkula</a>' +
        '<a href="/faq.html">FAQ</a><a href="/blog.html">Blog</a>' +
        '<a class="btn btn-gold" href="#enquiry">Get Free Quote</a>' +
        '<a class="btn btn-wa" href="' + waMsg('Hello RNS Construction Mohali, I would like to enquire about your construction services. Please contact me regarding my project.') + '" target="_blank" rel="noopener">WhatsApp Enquiry</a>';
      m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { m.remove(); burger.setAttribute('aria-expanded', 'false'); }); });
      document.querySelector('.header').appendChild(m);
    });
  }

  // Enquiry form -> WhatsApp
  var eform = document.querySelector('form.enq-form');
  if (eform) {
    eform.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (n) { var el = eform.elements.namedItem(n); return el && el.value ? el.value.trim() : ''; };
      var name = get('name'), phone = get('phone');
      if (!name) { eform.elements.namedItem('name').focus(); return; }
      if (!/^[0-9+()\-\s]{10,15}$/.test(phone)) { eform.elements.namedItem('phone').focus(); return; }
      var btn = eform.querySelector('button[type="submit"] span') || eform.querySelector('button[type="submit"]');
      var lines = ['Hello RNS Construction Mohali, I would like to enquire about your construction services.', '', 'Name: ' + name, 'Mobile: ' + phone];
      if (get('location')) lines.push('Location: ' + get('location'));
      if (get('property-type')) lines.push('Property Type: ' + get('property-type'));
      if (get('service')) lines.push('Service: ' + get('service'));
      if (get('area')) lines.push('Plot / Area: ' + get('area'));
      if (get('message')) lines.push('Message: ' + get('message'));
      if (btn) btn.textContent = 'Opening WhatsApp...';
      window.open(waMsg(lines.join('\n')), '_blank');
      if (btn) { btn.textContent = 'Enquiry opened in WhatsApp'; setTimeout(function () { btn.textContent = 'Submit Enquiry on WhatsApp'; }, 4000); }
    });
  }

  // Subscribe form -> FormSubmit
  var sform = document.querySelector('.f-sub form');
  if (sform) {
    var status = document.createElement('p');
    status.className = 'sub-status'; status.setAttribute('role', 'status');
    sform.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = sform.elements.namedItem('email').value;
      status.textContent = 'Subscribing...';
      if (!status.parentNode) sform.appendChild(status);
      fetch('https://formsubmit.co/ajax/constructionrns48@gmail.com', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, _subject: 'New RNS website subscriber', _captcha: 'false' })
      }).then(function (r) { if (!r.ok) throw 0; status.textContent = 'Thank you! Please check your inbox.'; sform.reset(); })
        .catch(function () { status.textContent = 'Could not subscribe right now. Please try again.'; });
    });
  }

  // Ask RNS chat widget
  var CHAT = {
    'Our services': 'We provide house construction, commercial building construction, turnkey projects, architectural and structural design, interior design, and home renovation across Mohali, Chandigarh and nearby areas.',
    'Areas we serve': 'We serve Mohali, Chandigarh, Zirakpur, Panchkula, Kharar and New Chandigarh. Free site visit is available across these areas.',
    'Get a quotation': 'Share your plot size, location and requirements and we will give you a detailed free estimate. Final cost depends on plot size, design, materials and site conditions.',
    'Contact & office': 'Office: SCF 103, 1st Floor, Phase 11, Above Gadget World, Mohali, Punjab 160062. Call or WhatsApp: +91 87505 10489.'
  };
  var launch = document.querySelector('.rns-chat-launch');
  if (launch) {
    launch.addEventListener('click', function () {
      var widget = document.querySelector('.rns-chat-widget');
      var panel = widget.querySelector('.rns-chat-panel');
      if (panel) { panel.remove(); launch.setAttribute('aria-expanded', 'false'); return; }
      launch.setAttribute('aria-expanded', 'true');
      panel = document.createElement('div');
      panel.className = 'rns-chat-panel open'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Ask RNS quick help');
      var head = document.createElement('div'); head.className = 'rns-chat-head';
      head.innerHTML = '<div><div class="t">Ask RNS</div><div class="s">Quick answers about our construction services</div></div>';
      var close = document.createElement('button'); close.className = 'rns-chat-close'; close.setAttribute('aria-label', 'Close chat'); close.innerHTML = '&times;';
      close.addEventListener('click', function () { panel.remove(); launch.setAttribute('aria-expanded', 'false'); });
      head.appendChild(close);
      var body = document.createElement('div'); body.className = 'rns-chat-body';
      Object.keys(CHAT).forEach(function (k) {
        var q = document.createElement('button'); q.className = 'rns-chat-q'; q.textContent = k;
        q.addEventListener('click', function () {
          body.querySelectorAll('.rns-chat-q').forEach(function (b) { b.classList.remove('sel'); });
          q.classList.add('sel');
          body.querySelectorAll('.rns-chat-a').forEach(function (el) { el.remove(); });
          var a = document.createElement('div'); a.className = 'rns-chat-a';
          a.textContent = CHAT[k] + ' ';
          if (k === 'Contact & office') { var mp = document.createElement('a'); mp.className = 'rns-chat-map'; mp.target = '_blank'; mp.rel = 'noopener'; mp.href = 'https://www.google.com/maps/dir/?api=1&destination=SCF%20103%2C%201st%20Floor%2C%20Phase%2011%2C%20Above%20Gadget%20World%2C%20Mohali%2C%20Punjab%20160062'; mp.textContent = 'Open in Google Maps'; a.appendChild(mp); }
          var wa = document.createElement('a'); wa.className = 'rns-chat-wa'; wa.target = '_blank'; wa.rel = 'noopener';
          wa.href = waMsg('Hi, I want a site visit for RNS Construction. Topic: ' + k); wa.textContent = 'Chat on WhatsApp';
          a.appendChild(wa); body.appendChild(a); body.scrollTop += a.getBoundingClientRect().top - body.getBoundingClientRect().top - 6;
        });
        body.appendChild(q);
      });
      var foot = document.createElement('div'); foot.className = 'rns-chat-foot';
      foot.innerHTML = '<small>Free site visit &middot; Mohali, Chandigarh &amp; nearby areas</small>';
      panel.appendChild(head); panel.appendChild(body); panel.appendChild(foot);
      widget.appendChild(panel);
    });
  }
})();

;(function () {
  var nums = document.querySelectorAll('.stats .stat .n');
  if (!nums.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  nums.forEach(function (el) {
    var finalTxt = el.textContent || '';
    var m = finalTxt.match(/^([\d,]+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1].replace(/,/g, ''), 10);
    var suffix = m[2];
    var done = false;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !done) {
          done = true;
          var t0 = performance.now();
          var dur = 1300;
          var tick = function (t) {
            var p = Math.min(1, (t - t0) / dur);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
            if (p < 1) requestAnimationFrame(tick); else el.textContent = finalTxt;
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });
})();

/* RNS admin content overlay */
(function(){var s=document.createElement("script");s.src="/rns-overlay.js";s.defer=true;document.head.appendChild(s);})();
