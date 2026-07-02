/* ==========================================================================
   Honeycomb lattice generator — the site's signature visual.
   Draws a tiled pointy-top hex grid (same topology as a graphene / TMD
   monolayer viewed from above) into any element with [data-hex-lattice].
   Attributes: data-cols, data-rows, data-r, data-nodes (density 0-1),
   data-color (defaults to currentColor / CSS var).
   ========================================================================== */
(function () {
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

    for (var row = 0; row < rows; row++) {
      var y = row * hexH + r;
      var xOffset = row % 2 === 1 ? hexW / 2 : 0;
      for (var col = 0; col < cols; col++) {
        var x = col * hexW + xOffset + r;
        var pts = hexPoints(x, y, r * 0.92);
        var poly = document.createElementNS(svgNS, 'polygon');
        poly.setAttribute('points', pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '));
        poly.setAttribute('fill', 'none');
        poly.setAttribute('stroke', 'currentColor');
        poly.setAttribute('stroke-width', '1');
        poly.setAttribute('opacity', (0.14 + rand() * 0.12).toFixed(2));
        svg.appendChild(poly);

        if (rand() < nodeDensity) {
          var vi = Math.floor(rand() * 6);
          var node = document.createElementNS(svgNS, 'circle');
          node.setAttribute('cx', pts[vi][0].toFixed(1));
          node.setAttribute('cy', pts[vi][1].toFixed(1));
          node.setAttribute('r', 2.2);
          node.setAttribute('fill', 'currentColor');
          node.classList.add('lattice-node');
          node.style.animationDelay = (rand() * 4).toFixed(2) + 's';
          svg.appendChild(node);
        }
      }
    }
    el.appendChild(svg);
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
