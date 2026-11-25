// EatWellStories — progressive enhancement only
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Footer year
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // Newsletter forms: progressive enhancement (action already points to thanks page)
  document.querySelectorAll("form.newsletter-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (form.classList.contains("contact-form")) { return; }
      e.preventDefault();
      var email = form.querySelector("input[type=email]");
      var target = form.getAttribute("action") || "newsletter-thanks.html";
      if (email && email.value) {
        window.location.href = target + "?email=" + encodeURIComponent(email.value);
      } else {
        window.location.href = target;
      }
    });
  });

  // Home hero search: filter latest guide cards by keyword
  var search = document.querySelector(".hero-search input");
  if (search) {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".card-grid-latest .card"));
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        card.style.display = !q || text.indexOf(q) !== -1 ? "" : "none";
      });
    });
  }

  // Mark external links with rel noopener (defensive; static markup already sets it)
  document.querySelectorAll("a[href^='http']").forEach(function (a) {
    if (!a.getAttribute("rel")) { a.setAttribute("rel", "noopener"); }
  });
})();
