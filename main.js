/* ==========================================================================
   Honeycomb lattice generator — the site's signature visual.
   Draws a tiled pointy-top hex grid (same topology as a graphene / TMD
   monolayer viewed from above) into any element with [data-hex-lattice].
   On load, cells "grow in" outward from the center, like nucleation during
   thin-film growth. Nodes near the cursor glow, as if being probed.
   Attributes: data-cols, data-rows, data-r, data-nodes (density 0-1).
   ========================================================================== */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hexPoints(cx, cy, r) {
    var pts = [];
    for (var i = 0; i < 6; i++) {
      var angle = (Math.PI / 180) * (60 * i - 30);
      pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
    }
    return pts;
  }

  function buildLattice(el) {
    var cols = parseInt(el.dataset.cols || '10', 10);
    var rows = parseInt(el.dataset.rows || '4', 10);
    var r = parseFloat(el.dataset.r || '20');
    var nodeDensity = parseFloat(el.dataset.nodes || '0.14');

    var hexW = Math.sqrt(3) * r;
    var hexH = 1.5 * r;
    var width = cols * hexW + hexW;
    var height = rows * hexH + hexW;

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.classList.add('lattice-svg');

    var seedRand = 1337;
    function rand() {
      seedRand = (seedRand * 9301 + 49297) % 233280;
      return seedRand / 233280;
    }

    var centerCol = (cols - 1) / 2;
    var centerRow = (rows - 1) / 2;
    var maxDist = Math.hypot(centerCol, centerRow) || 1;
    var nodes = [];

    for (var row = 0; row < rows; row++) {
      var y = row * hexH + r;
      var xOffset = row % 2 === 1 ? hexW / 2 : 0;
      for (var col = 0; col < cols; col++) {
        var x = col * hexW + xOffset + r;
        var pts = hexPoints(x, y, r * 0.92);
        var dist = Math.hypot(col - centerCol, row - centerRow) / maxDist;
        var delay = dist * 0.9 + rand() * 0.12;

        var g = document.createElementNS(svgNS, 'g');
        if (!reduceMotion) {
          g.style.transformOrigin = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
          g.style.animation = 'hexPop .5s cubic-bezier(.34,1.56,.64,1) both';
          g.style.animationDelay = delay.toFixed(2) + 's';
        }

        var poly = document.createElementNS(svgNS, 'polygon');
        poly.setAttribute('points', pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '));
        poly.setAttribute('fill', 'none');
        poly.setAttribute('stroke', 'currentColor');
        poly.setAttribute('stroke-width', '1');
        poly.setAttribute('opacity', (0.14 + rand() * 0.12).toFixed(2));
        poly.classList.add('lattice-poly');
        g.appendChild(poly);

        if (rand() < nodeDensity) {
          var vi = Math.floor(rand() * 6);
          var node = document.createElementNS(svgNS, 'circle');
          var nx = pts[vi][0], ny = pts[vi][1];
          node.setAttribute('cx', nx.toFixed(1));
          node.setAttribute('cy', ny.toFixed(1));
          node.setAttribute('r', 2.2);
          node.setAttribute('fill', 'currentColor');
          node.classList.add('lattice-node');
          node.style.animationDelay = (rand() * 4).toFixed(2) + 's';
          g.appendChild(node);
          nodes.push({ el: node, x: nx, y: ny, baseR: 2.2 });
        }
        svg.appendChild(g);
      }
    }
    el.appendChild(svg);

    // cursor-reactive glow: nodes near the pointer brighten and swell,
    // as if being probed by an AFM tip.
    if (!reduceMotion && nodes.length) {
      var raf = null, pendingX = null, pendingY = null;
      function applyHover(px, py) {
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          var d = Math.hypot(n.x - px, n.y - py);
          var influence = Math.max(0, 1 - d / (r * 2.6));
          if (influence > 0.02) {
            n.el.setAttribute('r', (n.baseR + influence * 3.4).toFixed(2));
            n.el.style.opacity = Math.min(1, 0.5 + influence).toFixed(2);
          } else {
            n.el.setAttribute('r', n.baseR);
            n.el.style.opacity = '';
          }
        }
        raf = null;
      }
      svg.addEventListener('pointermove', function (e) {
        var rect = svg.getBoundingClientRect();
        var vb = svg.viewBox.baseVal;
        pendingX = (e.clientX - rect.left) / rect.width * vb.width;
        pendingY = (e.clientY - rect.top) / rect.height * vb.height;
        if (!raf) raf = requestAnimationFrame(function () { applyHover(pendingX, pendingY); });
      });
      svg.addEventListener('pointerleave', function () {
        nodes.forEach(function (n) { n.el.setAttribute('r', n.baseR); n.el.style.opacity = ''; });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-hex-lattice]').forEach(buildLattice);

    // mark current nav link active
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav.links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  });
})();
