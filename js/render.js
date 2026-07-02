/* Renders cards from js/data.js into containers present on each page. */
(function () {
  var ICONS = {
    sputter: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="10" y="8" width="28" height="32" rx="2"/><circle cx="24" cy="20" r="6"/><path d="M24 26v10M18 40h12M14 14h20"/></svg>',
    probe: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="8" y="30" width="32" height="8" rx="1"/><path d="M16 30V16l6-6M32 30V16l-6-6M22 10h4"/></svg>',
    xrd: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 34c4-14 8-14 12 0M18 34c4-18 8-18 12 0M30 34c3-10 6-10 12 0" stroke-linecap="round"/><path d="M6 40h36" stroke-linecap="round"/></svg>',
    furnace: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="16" width="36" height="16" rx="2"/><circle cx="14" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="34" cy="24" r="3"/><path d="M12 16V9h24v7" stroke-linecap="round"/></svg>'
  };

  function initials(name) {
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function personCard(p) {
    return (
      '<div class="person-card">' +
        '<div class="avatar">' + initials(p.name) + '</div>' +
        '<div>' +
          '<span class="role">' + p.role + '</span>' +
          '<h3>' + p.title + ' ' + p.name + '</h3>' +
          '<div class="joined">Joined ' + p.joined + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function facilityCard(f) {
    return (
      '<div class="card facility-card">' +
        '<div class="thumb">' + (ICONS[f.icon] || '') + '</div>' +
        '<h3>' + f.name + '</h3>' +
        '<p>' + f.note + '</p>' +
      '</div>'
    );
  }

  function pubItem(p) {
    return (
      '<div class="pub-item">' +
        '<div class="pub-title">' + p.title + '</div>' +
        '<div class="pub-meta">' + p.authors + '</div>' +
        '<div class="pub-meta">' + p.journal + ', ' + p.vol + ' (' + p.year + ') \u00b7 DOI: ' +
          '<a href="https://doi.org/' + p.doi + '" target="_blank" rel="noopener" style="color:var(--teal)">' + p.doi + '</a>' +
        '</div>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var phdEl = document.getElementById('phd-list');
    if (phdEl) phdEl.innerHTML = LAB_DATA.phdStudents.map(personCard).join('');

    var pdEl = document.getElementById('postdoc-list');
    if (pdEl) pdEl.innerHTML = LAB_DATA.postdocs.map(personCard).join('');

    var facEl = document.getElementById('facilities-list');
    if (facEl) facEl.innerHTML = LAB_DATA.facilities.map(facilityCard).join('');

    var pubEl = document.getElementById('publications-list');
    if (pubEl) pubEl.innerHTML = LAB_DATA.publications.map(pubItem).join('');
  });
})();
