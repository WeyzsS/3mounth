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
const photoInput = document.querySelector("#photoInput");
const photoButtons = document.querySelectorAll("[data-slot]");
let currentCompliment = 0;
let activePhotoButton = null;

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

function burstHearts(origin) {
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
    document.body.append(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

function openSurprise() {
  burstHearts(magicButton);
  showNextCompliment();
  if (typeof surpriseDialog.showModal === "function") {
    surpriseDialog.showModal();
    return;
  }
  surpriseDialog.setAttribute("open", "");
}

photoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activePhotoButton = button;
    photoInput.click();
  });
});

photoInput.addEventListener("change", () => {
  const [file] = photoInput.files;
  if (!file || !activePhotoButton) return;

  const image = activePhotoButton.querySelector("img");
  image.src = URL.createObjectURL(file);
  image.alt = "Добавленная фотография";
  activePhotoButton.classList.add("has-photo");
  activePhotoButton = null;
  photoInput.value = "";
});

nextCompliment.addEventListener("click", showNextCompliment);
magicButton.addEventListener("click", openSurprise);
moreHearts.addEventListener("click", () => burstHearts(moreHearts));
closeDialog.addEventListener("click", () => surpriseDialog.close());

document.querySelector("#tinyNote").addEventListener("click", (event) => {
  burstHearts(event.currentTarget);
});
