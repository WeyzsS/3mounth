const compliments = [
  "Ты прекрасна даже в обычные дни.",
  "В твоей улыбке есть что-то, от чего становится теплее.",
  "Ты умеешь быть нежной и сильной одновременно.",
  "С тобой самые простые моменты становятся любимыми.",
  "Ты красивая не только внешне, но и всем своим светом.",
  "Рядом с тобой хочется чаще радоваться мелочам.",
  "Ты именно та причина, по которой сердце улыбается."
];

const colors = ["#e84a73", "#ff7b63", "#9b2f66", "#97d7c3"];
const complimentText = document.querySelector("#complimentText");
const nextCompliment = document.querySelector("#nextCompliment");
const magicButton = document.querySelector("#magicButton");
const surpriseDialog = document.querySelector("#surpriseDialog");
const closeDialog = document.querySelector("#closeDialog");
const moreHearts = document.querySelector("#moreHearts");
const modalHeartLayer = document.createElement("div");
let currentCompliment = 0;

modalHeartLayer.className = "modal-heart-layer";
modalHeartLayer.setAttribute("aria-hidden", "true");
surpriseDialog.prepend(modalHeartLayer);

function prepareFixedPhotos() {
  document.querySelectorAll(".photo-slot img, .memory-card img").forEach((image) => {
    const card = image.closest(".photo-slot, .memory-card");

    function markLoaded() {
      card.classList.add("has-photo");
    }

    function markMissing() {
      card.classList.remove("has-photo");
    }

    if (image.complete && image.naturalWidth > 0) {
      markLoaded();
    }

    image.addEventListener("load", markLoaded);
    image.addEventListener("error", markMissing);
  });
}

function showNextCompliment() {
  currentCompliment = (currentCompliment + 1) % compliments.length;
  complimentText.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 360, easing: "ease-out" }
  );
  complimentText.textContent = compliments[currentCompliment];
}

function burstHearts(origin, container = document.body) {
  const rect = origin.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  for (let i = 0; i < 26; i += 1) {
    const heart = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 26;
    const distance = 80 + Math.random() * 150;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    heart.className = "burst-heart";
    heart.style.setProperty("--left", `${startX}px`);
    heart.style.setProperty("--top", `${startY}px`);
    heart.style.setProperty("--dx", `${dx}px`);
    heart.style.setProperty("--dy", `${dy}px`);
    heart.style.background = colors[i % colors.length];
    heart.style.animationDelay = `${Math.random() * 110}ms`;
    container.append(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

function openSurprise() {
  showNextCompliment();
  if (typeof surpriseDialog.showModal === "function") {
    surpriseDialog.showModal();
  } else {
    surpriseDialog.setAttribute("open", "");
  }
  setTimeout(() => burstHearts(surpriseDialog, modalHeartLayer), 80);
}

prepareFixedPhotos();
nextCompliment.addEventListener("click", showNextCompliment);
magicButton.addEventListener("click", openSurprise);
moreHearts.addEventListener("click", () => burstHearts(moreHearts, modalHeartLayer));
closeDialog.addEventListener("click", () => surpriseDialog.close());

document.querySelector("#tinyNote").addEventListener("click", (event) => {
  burstHearts(event.currentTarget);
});

