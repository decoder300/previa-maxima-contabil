/* Máxima Contábil — revelações suaves + FAQ aberto na impressão */
(function () {
  "use strict";

  // FAQ: abrir todos os <details> ao imprimir/gerar PDF, restaurar depois
  var faqDetails = Array.prototype.slice.call(document.querySelectorAll(".faq-list details"));
  var prevOpen = [];
  function openAll(){ prevOpen = faqDetails.map(function(d){ var o=d.open; d.open=true; return o; }); }
  function restoreAll(){ faqDetails.forEach(function(d,i){ d.open = prevOpen[i]; }); }
  if (window.matchMedia){ var mq=window.matchMedia("print"); if(mq.addEventListener) mq.addEventListener("change",function(e){ e.matches?openAll():restoreAll(); }); }
  window.addEventListener("beforeprint", openAll);
  window.addEventListener("afterprint", restoreAll);

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var els = document.querySelectorAll(".section h2, .serv-grid>li, .who-list>div, .why-list li, .steps li, .faq-list details, .ph, .about-lead, .contact-info, .loc-card");
  els.forEach(function (el) { el.classList.add("reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  els.forEach(function (el) { io.observe(el); });
})();
