/* ==========================================================================
   Scroll-reveal + card tilt micro-interactions.
   Both are skipped entirely for prefers-reduced-motion users.
   ========================================================================== */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- scroll reveal ---- */
    var revealSelectors = '.card, .person-card, .research-entry, .pub-item, .timeline .tl-item, .contact-line, .leader-block, section > .wrap > h2';
    var revealEls = document.querySelectorAll(revealSelectors);

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('reveal', 'in-view'); });
    } else {
      revealEls.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (Math.min(i % 6, 5) * 0.06).toFixed(2) + 's';
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    /* ---- card tilt ---- */
    if (!reduceMotion) {
      var tiltEls = document.querySelectorAll('.card, .person-card, .facility-card, .pub-item');
      tiltEls.forEach(function (el) {
        el.classList.add('tilt-target');
        var raf = null;

        el.addEventListener('mousemove', function (e) {
          var rect = el.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width;   // 0..1
          var py = (e.clientY - rect.top) / rect.height;   // 0..1
          var rotY = (px - 0.5) * 8;   // deg
          var rotX = (0.5 - py) * 8;   // deg
          if (raf) return;
          raf = requestAnimationFrame(function () {
            el.style.transform = 'perspective(700px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-3px)';
            el.style.boxShadow = (px - 0.5) * 20 + 'px ' + (py - 0.5) * 20 + 'px 32px -18px rgba(79, 209, 197, 0.35)';
            raf = null;
          });
        });

        el.addEventListener('mouseleave', function () {
          el.style.transform = '';
          el.style.boxShadow = '';
        });
      });
    }
  });
})();
