const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

const prayerButton = document.getElementById("prayerButton");
const prayerText = document.getElementById("prayerText");

const loveButton = document.getElementById("loveButton");
const loveResponse = document.getElementById("loveResponse");

// BACKGROUND MUSIC
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "♫ MUSIC: ON";
    } catch (error) {
      musicToggle.textContent = "♫ CHECK music.mp3";
      console.error("Music could not be played:", error);
    }
  } else {
    music.pause();
    musicToggle.textContent = "♫ MUSIC: OFF";
  }
});

// PRAYER BUTTON
prayerButton.addEventListener("click", () => {
  prayerText.classList.toggle("hidden");

  prayerButton.textContent = prayerText.classList.contains("hidden")
    ? "A LITTLE PRAYER FOR YOU ♡"
    : "CLOSE MY PRAYER ♡";
});

// LOVE SURPRISE BUTTON
loveButton.addEventListener("click", () => {
  loveResponse.classList.toggle("hidden");

  loveButton.textContent = loveResponse.classList.contains("hidden")
    ? "CLICK IF YOU KNOW I LOVE YOU"
    : "CLICK TO HIDE ♡";

  if (!loveResponse.classList.contains("hidden")) {
    loveResponse.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});

// PHOTO GALLERY
const photoCards = Array.from(document.querySelectorAll(".memory-card"));
const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeLightbox = document.getElementById("closeLightbox");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");

let currentPhotoIndex = 0;

function showPhoto(index) {
  currentPhotoIndex = (index + photoCards.length) % photoCards.length;

  const card = photoCards[currentPhotoIndex];
  const image = card.querySelector("img");

  lightboxImage.src = card.dataset.photo;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = card.dataset.caption;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeLightbox.focus();
}

function hidePhoto() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

photoCards.forEach((card, index) => {
  card.addEventListener("click", () => showPhoto(index));
});

closeLightbox.addEventListener("click", hidePhoto);

prevPhoto.addEventListener("click", () => {
  showPhoto(currentPhotoIndex - 1);
});

nextPhoto.addEventListener("click", () => {
  showPhoto(currentPhotoIndex + 1);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    hidePhoto();
  }
});

// KEYBOARD CONTROLS
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") hidePhoto();
  if (event.key === "ArrowLeft") showPhoto(currentPhotoIndex - 1);
  if (event.key === "ArrowRight") showPhoto(currentPhotoIndex + 1);
});

// GENTLE SCROLL ANIMATIONS
const animatedElements = document.querySelectorAll(
  ".letter-card, .memory-card, .faith-box",
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  animatedElements.forEach((element) => observer.observe(element));
}
