const gallery = document.getElementById("gallery");

if (gallery) {
  let target = 0;
  let current = 0;

  const storageKey = "portfolio-shared-scroll";
  const saved = sessionStorage.getItem(storageKey);

  if (saved) {
    target = parseFloat(saved);
    current = parseFloat(saved);
    gallery.scrollLeft = current;
  }

  gallery.innerHTML += gallery.innerHTML;

  let mobileAutoScroll = window.innerWidth <= 700;
  let mobilePaused = false;

  window.addEventListener(
    "wheel",
    (e) => {
      if (window.innerWidth > 700) {
        e.preventDefault();
        target += e.deltaY + e.deltaX;
      }
    },
    { passive: false }
  );

  gallery.addEventListener("touchstart", () => {
    if (window.innerWidth <= 700) {
      mobilePaused = true;
    }
  });

  gallery.addEventListener("touchend", () => {
    if (window.innerWidth <= 700) {
      setTimeout(() => {
        mobilePaused = false;
      }, 2000);
    }
  });

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sessionStorage.setItem(storageKey, current);
    });
  });

  function animate() {
    if (window.innerWidth <= 700) {
      if (!mobilePaused) {
        target += 2;
      }
    }

    current += (target - current) * 0.08;
    gallery.scrollLeft = current;

    const half = gallery.scrollWidth / 2;

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

    sessionStorage.setItem(storageKey, current);
    requestAnimationFrame(animate);
  }

  animate();
}