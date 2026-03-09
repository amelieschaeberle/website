const gallery = document.getElementById("gallery");

if (gallery) {
  let target = 0;
  let current = 0;

  /* gleicher Speicher für alle Seiten */
  const storageKey = "portfolio-shared-scroll";

  /* gespeicherte Position laden */
  const saved = sessionStorage.getItem(storageKey);

  if (saved) {
    target = parseFloat(saved);
    current = parseFloat(saved);
    gallery.scrollLeft = current;
  }

  /* content für endless scroll duplizieren */
  gallery.innerHTML += gallery.innerHTML;

  /* scroll input */
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      target += e.deltaY + e.deltaX;
    },
    { passive: false }
  );

  /* position vor klick auf links speichern */
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sessionStorage.setItem(storageKey, current);
    });
  });

  /* smooth animation */
  function animate() {
    current += (target - current) * 0.08;
    gallery.scrollLeft = current;

    const half = gallery.scrollWidth / 2;

    /* endless reset */
    if (gallery.scrollLeft >= half) {
      gallery.scrollLeft -= half;
      target -= half;
      current -= half;
    }

    if (gallery.scrollLeft < 0) {
      gallery.scrollLeft += half;
      target += half;
      current += half;
    }

    /* scrollposition laufend speichern */
    sessionStorage.setItem(storageKey, current);

    requestAnimationFrame(animate);
  }

  animate();
}
document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});