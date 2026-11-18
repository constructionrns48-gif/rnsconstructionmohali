
/* Reviewed responsive spacing, 6 November 2026. */
(function () {
  var path = window.location.pathname;
  var css = '';
  if (path === '/' || path === '/index.html') {
    css = '@media(max-width:768px){#services{padding-bottom:24px}#real-projects{padding-top:24px}#real-projects .sec-head{margin-bottom:28px}}';
  } else if (["/about.html", "/areas-chandigarh.html", "/areas-kharar.html", "/areas-mohali.html", "/areas-new-chandigarh.html", "/areas-panchkula.html", "/areas-zirakpur.html", "/best-areas-mohali-house-construction-2026.html", "/blog.html", "/construction-calculators-tools.html", "/construction-questions-mohali.html", "/faq.html", "/projects.html", "/services-architectural-design.html", "/services-commercial-building.html", "/services-house-construction.html", "/services-interior-design.html", "/services-renovation.html", "/services-turnkey-projects.html", "/services.html", "/terms.html"].indexOf(path) !== -1) {
    css = '@media(max-width:768px){main>.sec{padding-top:36px;padding-bottom:36px}main>.sec .sec-head{margin-bottom:32px}}@media(min-width:769px){main>.sec{padding-top:48px;padding-bottom:48px}main>.sec .sec-head{margin-bottom:32px}.f-bottom{padding-bottom:90px}}';
  }
  if (css && !document.getElementById('rns-approved-spacing-nov6')) {
    var style = document.createElement('style');
    style.id = 'rns-approved-spacing-nov6';
    style.textContent = css;
    document.head.appendChild(style);
  }
})();
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
      // Keep every option reachable above the fixed mobile action bar.
      m.style.cssText = 'position:absolute;left:0;right:0;top:100%;height:calc(100dvh - ' + document.querySelector('.header .wrap').getBoundingClientRect().bottom + 'px - 72px - env(safe-area-inset-bottom, 0px));overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;';
      m.innerHTML = '<a href="/">Home</a><a href="/calculator.html">Cost Calculator</a><details class="m-services"><summary>Services <span aria-hidden="true">⌄</span></summary><a href="/services.html">All Services</a>' +
        '<a href="/services-house-construction.html">House Construction</a>' +
        '<a href="/services-commercial-building.html">Commercial Building Construction</a>' +
        '<a href="/services-turnkey-projects.html">Turnkey Projects</a>' +
        '<a href="/services-architectural-design.html">Architectural &amp; Structural Design</a>' +
        '<a href="/services-interior-design.html">Interior Design</a>' +
        '<a href="/services-renovation.html">Home Renovation &amp; Remodeling</a>' +
        '</details><a href="/projects.html">Projects</a>' +
        '<details class="m-services m-areas"><summary>Areas We Serve <span aria-hidden="true">⌄</span></summary>' +
        '<a href="/areas-mohali.html">Mohali</a><a href="/areas-zirakpur.html">Zirakpur</a><a href="/areas-kharar.html">Kharar</a><a href="/areas-chandigarh.html">Chandigarh</a><a href="/areas-panchkula.html">Panchkula</a>' +
        '</details>' +
        '<a class="btn btn-gold" href="#enquiry">Get Free Quote</a>' +
        '<a class="btn btn-wa" href="' + waMsg('Hello RNS Construction Mohali, I would like to enquire about your construction services. Please contact me regarding my project.') + '" target="_blank" rel="noopener">WhatsApp Enquiry</a>';
      m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { m.remove(); burger.setAttribute('aria-expanded', 'false'); }); });
      var menuStyle = document.createElement('style');
      menuStyle.textContent = '.m-services summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;color:#E6EDF5;font-weight:600;padding:13px 4px;border-bottom:1px solid rgba(255,255,255,.08)}.m-services summary::-webkit-details-marker{display:none}.m-services summary span{transition:transform .2s}.m-services[open] summary span{transform:rotate(180deg)}.m-services>a{padding-left:18px;background:rgba(0,0,0,.09);font-size:.92em}';
      m.appendChild(menuStyle);
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

/* RNS mobile viewport containment, 19 November 2026. */
(function(){
  var style=document.createElement('style');style.id='rns-ios-viewport-preview';
  style.textContent=`
.rns-mobile-actions{display:contents}
@media(min-width:769px){.header.rns-header-tight .wrap{flex-wrap:wrap}.header.rns-header-tight .brand,.header.rns-header-tight .nav,.header.rns-header-tight .h-cta{min-width:0}.header.rns-header-tight .nav,.header.rns-header-tight .h-cta{flex-wrap:wrap}}
@media(max-width:768px){
html,body{max-width:100%;overflow-x:clip;overscroll-behavior-x:none}
.header .wrap,.brand,.brand>div,.f-grid>*,.enq-grid>*,.frow>*,.fg{min-width:0}
.brand{flex:1}.brand img,.burger{flex-shrink:0}.brand .bs{overflow-wrap:anywhere}
.f-grid{grid-template-columns:minmax(0,1fr)}
.frow{grid-template-columns:minmax(0,1fr)}
.f-ct a,.f-brand,.f-dir{overflow-wrap:anywhere}
.f-soc{flex-wrap:wrap}.f-soc a{flex:0 0 38px}
.fg input,.fg select,.fg textarea,.f-sub input{min-width:0;max-width:100%;font-size:16px}
body{padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))}
body::after{display:none!important}
.rns-mobile-actions{position:fixed;left:0;right:auto;bottom:0;width:100%;box-sizing:border-box;display:flex;align-items:center;gap:8px;padding:10px max(16px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(12px,env(safe-area-inset-left,0px));min-height:66px;background:var(--navy,#0b1f33);border-top:1px solid rgba(217,164,65,.35);z-index:999}
.rns-mobile-actions .rns-chat-widget{display:contents}
.rns-mobile-actions .rns-chat-launch,.rns-mobile-actions .float-quote,.rns-mobile-actions .float-call,.rns-mobile-actions .float-wa{position:static!important;inset:auto!important;flex:0 0 44px;width:44px;height:44px;box-sizing:border-box;transform:none!important;transition:none;box-shadow:none}
.rns-mobile-actions .rns-chat-launch{margin-right:auto;font-size:0;padding:0}
.rns-mobile-actions .rns-chat-panel{max-width:calc(100vw - 32px);bottom:calc(80px + env(safe-area-inset-bottom,0px))}
}
`;
  document.head.appendChild(style);
  var wa=document.querySelector('.float-wa'),call=document.querySelector('.float-call'),quote=document.querySelector('.float-quote'),widget=document.querySelector('.rns-chat-widget');
  if(!wa||!call||!quote||!widget)return;
  var bar=document.createElement('nav');bar.className='rns-mobile-actions';bar.setAttribute('aria-label','Quick contact actions');
  [widget,quote,call,wa].forEach(function(el){bar.appendChild(el)});document.body.appendChild(bar);
  var vv=window.visualViewport,queued=false;
  function sync(){queued=false;if(!matchMedia('(max-width:768px)').matches){bar.style.width='';bar.style.left='';bar.style.bottom='';return}var width=vv?vv.width:document.documentElement.clientWidth;bar.style.width=width+'px';bar.style.left=(vv?Math.max(0,vv.offsetLeft):0)+'px';bar.style.bottom=(vv?Math.max(0,innerHeight-vv.height-vv.offsetTop):0)+'px'}
  function schedule(){if(!queued){queued=true;requestAnimationFrame(sync)}}
  addEventListener('resize',schedule);addEventListener('orientationchange',schedule);if(vv){vv.addEventListener('resize',schedule);vv.addEventListener('scroll',schedule)}sync();
})();

/* Wrap the existing header only when its unwrapped layout actually exceeds the viewport. */
(function(){var h=document.querySelector('.header'),wrap=h&&h.querySelector('.wrap');if(!wrap)return;var queued=false;function fit(){queued=false;h.classList.remove('rns-header-tight');if(innerWidth<=768)return;var limit=document.documentElement.clientWidth;var overflow=Array.from(wrap.children).some(function(e){return e.getBoundingClientRect().right>limit+1});if(overflow)h.classList.add('rns-header-tight')}function schedule(){if(!queued){queued=true;requestAnimationFrame(fit)}}addEventListener('resize',schedule);if(document.fonts)document.fonts.ready.then(schedule);if(window.ResizeObserver){var ro=new ResizeObserver(schedule);ro.observe(wrap);Array.from(wrap.children).forEach(function(e){ro.observe(e)})}schedule()})();
