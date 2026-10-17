
const $ = (id) => document.getElementById(id);

let score = 0;
let breathing = false;
let breathTimer = null;
let toastTimer = null;
let requestNumber = 0;

const jokes = [
  ["🤖", "Why was the computer cold? It left its Windows open!"],
  ["🐝", "What do bees use to brush their hair? A honeycomb!"],
  ["🍌", "Why did the banana go to the doctor? It wasn't peeling well!"],
  ["📚", "Why was the maths book sad? It had too many problems!"],
  ["🐸", "What happens when a frog parks illegally? It gets toad away!"],
  ["🐱", "What is a cat's favourite colour? Purr-ple!"],
  ["🧀", "What cheese is made backwards? Edam!"],
  ["🐻", "Why don't bears wear shoes? They have bear feet!"],
  ["🌽", "Why did the corn get promoted? It was outstanding in its field!"],
  ["👻", "Why did the ghost go to school? To learn boo-ology!"]
];

const compliments = [
  "You are a little bundle of brilliant ideas! 💡",
  "Your effort matters more than perfection. 🌱",
  "You bring something special to the world. 🌈",
  "Every expert was once a beginner. Keep going! 🚀",
  "Your curiosity is your superpower! 🦸",
  "You are allowed to learn at your own pace. 💖",
  "Small steps still move you forward. 👣",
  "Your smile could brighten someone's day! ☀️"
];

const challenges = [
  "Name 3 things that make you smile. 😊",
  "Stretch your arms like a giant for 10 seconds! 🦒",
  "Find 3 things around you that are blue. 💙",
  "Think of your favourite animal and make its sound! 🐒",
  "Take 3 gentle, comfortable breaths. 🌿",
  "Give yourself a silent high-five! 🙌",
  "Think of one kind thing you can do today. 💛",
  "Make the silliest face you can imagine! 🤪",
  "Look away from the screen and notice something beautiful. 🌻",
  "Wiggle your fingers like a tiny dancing octopus! 🐙"
];

const moodMessages = {
  Happy: "Yay! Let that happiness shine. ☀️",
  Sleepy: "Feeling sleepy is okay. A gentle stretch might help. 🌙",
  Confused: "It's okay not to know everything. Learning takes time. 🌱",
  Silly: "Silly mode activated! Keep that playful spark. 🤪",
  Calm: "Enjoy this peaceful moment. You deserve it. 🌿"
};

function shufflePick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showToast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2400);
}

// Mood mixer
document.querySelectorAll(".mood").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mood").forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");
    const mood = button.dataset.mood;
    $("moodMessage").textContent = moodMessages[mood];
    showToast(button.dataset.face + " Mood selected: " + mood);
  });
});

// Bubble pop game
function createBubble() {
  const area = $("bubbleArea");
  const bubble = document.createElement("button");
  const size = 34 + Math.random() * 24;

  bubble.className = "bubble";
  bubble.type = "button";
  bubble.textContent = shufflePick(["✨", "💖", "🌟", "🩵", "💜"]);
  bubble.setAttribute("aria-label", "Pop bubble");

  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = Math.random() * Math.max(0, area.clientWidth - size) + "px";
  bubble.style.top = Math.random() * Math.max(0, area.clientHeight - size) + "px";
  bubble.style.animationDelay = Math.random() * -2 + "s";

  bubble.addEventListener("click", () => {
    if (bubble.classList.contains("pop")) return;

    bubble.classList.add("pop");
    score++;
    $("score").textContent = score;

    if (score % 10 === 0) {
      showToast("Amazing! " + score + " bubbles popped! 🎉");
    }

    setTimeout(() => bubble.remove(), 250);
  });

  area.appendChild(bubble);
}

$("bubbleBtn").addEventListener("click", () => {
  const area = $("bubbleArea");
  const existing = area.querySelectorAll(".bubble").length;
  const count = Math.min(12, 30 - existing);

  if (count <= 0) {
    showToast("Pop some bubbles to make room! 🫧");
    return;
  }

  area.querySelector(".bubble-hint")?.remove();

  for (let i = 0; i < count; i++) createBubble();
});

$("clearBtn").addEventListener("click", () => {
  $("bubbleArea").querySelectorAll(".bubble").forEach(b => b.remove());
  const hint = document.createElement("span");
  hint.className = "bubble-hint";
  hint.textContent = "Tap the bubbles!";
  $("bubbleArea").appendChild(hint);
  showToast("Fresh start! Make more bubbles. 🫧");
});

// Breathing activity
function stopBreathing() {
  breathing = false;
  clearTimeout(breathTimer);
  breathTimer = null;
  $("breathCircle").classList.remove("active");
  $("breathText").textContent = "Ready?";
  $("breathHint").textContent = "Take a break whenever you need one.";
  $("breathBtn").textContent = "Start Breathing 🌿";
}

function runBreathPhase(phase, seconds, next) {
  if (!breathing) return;

  $("breathText").textContent = phase;
  $("breathHint").textContent = phase === "Breathe in"
    ? "Gently breathe in, if comfortable."
    : phase === "Breathe out"
      ? "Slowly breathe out, without forcing it."
      : "Relax your shoulders and jaw.";

  breathTimer = setTimeout(() => {
    if (!breathing) return;
    next();
  }, seconds * 1000);
}

function breathCycle() {
  runBreathPhase("Breathe in", 3, () => {
    runBreathPhase("Breathe out", 4, () => {
      runBreathPhase("Relax", 1, breathCycle);
    });
  });
}

$("breathBtn").addEventListener("click", () => {
  if (breathing) {
    stopBreathing();
    showToast("Nice work taking a little pause! 🌸");
    return;
  }

  breathing = true;
  $("breathCircle").classList.add("active");
  $("breathBtn").textContent = "Finish Session ✨";
  breathCycle();
});

// Joke generator: use Python when available, otherwise use local jokes.
async function getCheer(kind) {
  const number = ++requestNumber;

  try {
    const response = await fetch("/api/cheer?kind=" + encodeURIComponent(kind));

    if (!response.ok) throw new Error("Backend unavailable");

    const data = await response.json();
    if (number !== requestNumber) return null;
    return data;
  } catch {
    if (kind === "joke") {
      const [emoji, text] = shufflePick(jokes);
      return { emoji, text, source: "Happy Brain Lab" };
    }

    return {
      text: shufflePick(compliments),
      source: "Happy Brain Lab"
    };
  }
}

$("jokeBtn").addEventListener("click", async () => {
  $("jokeBtn").disabled = true;
  $("jokeText").textContent = "Finding a super-silly joke... 🤔";

  const data = await getCheer("joke");

  if (data) {
    $("jokeEmoji").textContent = data.emoji || "😂";
    $("jokeText").textContent = data.text;
    $("jokeSource").textContent = data.source || "Happy Brain Lab";
  }

  $("jokeBtn").disabled = false;
});

$("complimentBtn").addEventListener("click", async () => {
  $("compliment").textContent = "Loading good vibes... ✨";

  const data = await getCheer("compliment");
  if (data) $("compliment").textContent = data.text;
});

// Surprise button
$("surpriseBtn").addEventListener("click", () => {
  const actions = [
    () => {
      $("bubbleBtn").click();
      $("bubbleArea").scrollIntoView({ behavior: "smooth", block: "center" });
    },
    () => $("jokeBtn").click(),
    () => $("complimentBtn").click(),
    () => {
      $("challengeText").textContent = shufflePick(challenges);
      $("challengeText").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  ];

  shufflePick(actions)();
  showToast("Surprise! Your happy moment is here! 🎁");
});

// Mini challenge
$("challengeBtn").addEventListener("click", () => {
  $("challengeText").textContent = shufflePick(challenges);
});

// Keyboard and reduced-motion friendly interaction.
// Clean up the repeating timer when the page is hidden.
document.addEventListener("visibilitychange", () => {
  if (document.hidden && breathing) stopBreathing();
});
    