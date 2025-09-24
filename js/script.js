// Contact form script and validation

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // always stop the default submit first
    let valid = true;

    // Name validation
    const name = document.getElementById("name");
    if (name.value.trim() === "") {
      showError(name, "Name is required");
      valid = false;
    } else {
      clearError(name);
    }

    // Email validation
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError(email, "Please enter a valid email");
      valid = false;
    } else {
      clearError(email);
    }

    // Message validation
    const message = document.getElementById("message");
    if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters");
      valid = false;
    } else {
      clearError(message);
    }

    if (valid) {
      alert("✅ Thank you! Your message has been sent.");
      form.reset();
    }
  });

  function showError(input, message) {
    const errorMsg = input.parentElement.querySelector(".error-message");
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    input.style.borderColor = "#d9534f";
  }

  function clearError(input) {
    const errorMsg = input.parentElement.querySelector(".error-message");
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    input.style.borderColor = "#ccc";
  }
});

// Mobile menu script

document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded!");

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Insta gallery script

  const instaGallery = document.getElementById("insta-gallery");
  if (instaGallery) {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=6")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const img = document.createElement("img");
          img.src = item.thumbnailUrl;
          img.alt = "Instagram photo";
          instaGallery.appendChild(img);
        });
      })
      .catch((err) => console.error("Instagram fetch error:", err));
  }
});

// Hero slideshow

const slides = document.querySelectorAll(".slideshow img");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 5000);

function setHeroHeight() {
  const headerHeight = document.querySelector(".site-header").offsetHeight;
  document.querySelector(".hero").style.height = `${
    window.innerHeight - headerHeight
  }px`;
}

window.addEventListener("resize", setHeroHeight);
window.addEventListener("load", setHeroHeight);

// JS API For News slider

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("newsSlider");
  const apiKey = "7a332a6cce5e48e19dc3f95885ced652";
  const apiUrl = `https://newsapi.org/v2/everything?q=photography&language=en&pageSize=5&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      slider.innerHTML = "";

      if (!data.articles || data.articles.length === 0) {
        slider.innerHTML = "<p>No recent news available.</p>";
        return;
      }

      data.articles.forEach((article, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (index === 0) slide.classList.add("active");

        const img = document.createElement("img");
        img.src =
          article.urlToImage ||
          "https://via.placeholder.com/800x300?text=No+Image";
        img.alt = article.title;

        const title = document.createElement("h4");
        title.textContent = article.title;

        const link = document.createElement("a");
        link.href = article.url;
        link.target = "_blank";
        link.textContent = "Read more";

        slide.appendChild(img);
        slide.appendChild(title);
        slide.appendChild(link);

        slider.appendChild(slide);
      });

      // Автоперемикання
      let currentIndex = 0;
      const slides = slider.querySelectorAll(".slide");

      setInterval(() => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
      }, 9000); //
    })
    .catch((err) => {
      console.error("News API error:", err);
      slider.innerHTML = "<p>Unable to load news at the moment.</p>";
    });
});

// Jquery library usage (button back to top)

$(document).ready(function () {
  // показуємо кнопку при скролі вниз
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#backToTop").fadeIn();
    } else {
      $("#backToTop").fadeOut();
    }
  });

  // плавне прокручування нагору
  $("#backToTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});

// Date and time using JS (Golden Hour for photosession)
document.addEventListener("DOMContentLoaded", () => {
  // === Update current date & time ===
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    document.getElementById("currentDateTime").textContent =
      "📅 " + now.toLocaleDateString("en-UK", options);
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // === Fetch Golden Hour using sunrise-sunset API ===
  const lat = 56.462; // Dundee
  const lng = -2.9707;
  const apiUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);

      // Golden Hour = +1 год після сходу, -1 год перед заходом
      const goldenMorningStart = sunrise;
      const goldenMorningEnd = new Date(sunrise.getTime() + 60 * 60000);
      const goldenEveningStart = new Date(sunset.getTime() - 60 * 60000);
      const goldenEveningEnd = sunset;

      const options = { hour: "2-digit", minute: "2-digit" };
      const morning = `${goldenMorningStart.toLocaleTimeString(
        [],
        options
      )} – ${goldenMorningEnd.toLocaleTimeString([], options)}`;
      const evening = `${goldenEveningStart.toLocaleTimeString(
        [],
        options
      )} – ${goldenEveningEnd.toLocaleTimeString([], options)}`;

      document.getElementById(
        "goldenHour"
      ).textContent = `🌅 Golden Hour in Dundee: ${morning} & ${evening}`;
    })
    .catch((err) => {
      console.error("Golden Hour API error:", err);
      document.getElementById("goldenHour").textContent =
        "Unable to load golden hour times.";
    });
});

// Gallery JS scripts

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("caption");
  const close = document.querySelector(".close");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[index].src;
    caption.textContent = images[index].alt;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });
  close.addEventListener("click", closeLightbox);
  next.addEventListener("click", showNext);
  prev.addEventListener("click", showPrev);

  // Закриття по кліку поза зображенням
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[index].src;
    caption.textContent = images[index].alt;
    document.body.style.overflow = "hidden"; // ❌ блокуємо скрол
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto"; // ✅ повертаємо скрол
  }
});

// Sorting buttons for gallery

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-buttons button");
  const photos = document.querySelectorAll(".gallery-grid a");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // remove active class from all
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      photos.forEach((photo) => {
        if (filter === "all" || photo.getAttribute("data-theme") === filter) {
          photo.style.display = "block";
        } else {
          photo.style.display = "none";
        }
      });
    });
  });
});
