(function () {
  "use strict";

  const select = (selector, all = false) => {
    selector = selector.trim();
    return all
      ? [...document.querySelectorAll(selector)]
      : document.querySelector(selector);
  };

  const on = (type, selector, listener, all = false) => {
    const elements = select(selector, all);
    if (!elements) return;

    if (all) {
      elements.forEach((element) => element.addEventListener(type, listener));
    } else {
      elements.addEventListener(type, listener);
    }
  };

  const navbarLinks = select("#navbar .scrollto", true);

  const navbarLinksActive = () => {
    const position = window.scrollY + 200;

    navbarLinks.forEach((navbarLink) => {
      if (!navbarLink.hash) return;

      const section = select(navbarLink.hash);
      if (!section) return;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarLink.classList.add("active");
      } else {
        navbarLink.classList.remove("active");
      }
    });
  };

  const scrollToSection = (selector) => {
    const section = select(selector);
    if (!section) return;

    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  };

  window.addEventListener("load", navbarLinksActive);
  document.addEventListener("scroll", navbarLinksActive);

  const backToTop = select(".back-to-top");

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle("active", window.scrollY > 100);
    };

    window.addEventListener("load", toggleBackToTop);
    document.addEventListener("scroll", toggleBackToTop);
  }

  on("click", ".mobile-nav-toggle", function () {
    document.body.classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on(
    "click",
    ".scrollto",
    function (event) {
      if (!select(this.hash)) return;

      event.preventDefault();

      if (document.body.classList.contains("mobile-nav-active")) {
        document.body.classList.remove("mobile-nav-active");

        const navbarToggle = select(".mobile-nav-toggle");
        if (navbarToggle) {
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
      }

      scrollToSection(this.hash);
    },
    true
  );

  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollToSection(window.location.hash);
    }

    const preloader = select("#preloader");
    if (preloader) preloader.remove();

    const typed = select(".typed");

    if (typed && typeof Typed !== "undefined") {
      const typedItems = typed.getAttribute("data-typed-items");

      if (typedItems) {
        new Typed(".typed", {
          strings: typedItems.split(","),
          loop: true,
          typeSpeed: 75,
          backSpeed: 40,
          backDelay: 1500,
          startDelay: 500,
        });
      }
    }

    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  });
})();