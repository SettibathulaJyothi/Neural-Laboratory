/* =========================================
   FLOWER PATTERN EXPLORER
   Unsupervised Learning Demo
========================================= */


/* FLOWER DATA */

const flowers = [

    { emoji: "🌹", color: "red", shape: "round" },
    { emoji: "🌷", color: "pink", shape: "small" },
    { emoji: "🌻", color: "yellow", shape: "round" },
    { emoji: "🌼", color: "yellow", shape: "round" },
    { emoji: "💠", color: "blue", shape: "star" },

    { emoji: "🌺", color: "pink", shape: "round" },
    { emoji: "🌸", color: "pink", shape: "small" },
    { emoji: "🌹", color: "red", shape: "round" },
    { emoji: "🌷", color: "pink", shape: "small" },
    { emoji: "🌻", color: "yellow", shape: "round" },

    { emoji: "💠", color: "blue", shape: "star" },
    { emoji: "🌹", color: "red", shape: "round" },
    { emoji: "🌼", color: "yellow", shape: "round" },
    { emoji: "🌺", color: "pink", shape: "round" },
    { emoji: "💠", color: "blue", shape: "star" },

    { emoji: "🌸", color: "pink", shape: "small" },
    { emoji: "🌹", color: "red", shape: "round" },
    { emoji: "🌻", color: "yellow", shape: "round" },
    { emoji: "💠", color: "blue", shape: "star" },
    { emoji: "🌷", color: "pink", shape: "small" }

];


/* ELEMENTS */

const dataset = document.getElementById("flowerDataset");

const trainBtn = document.getElementById("trainBtn");

const trainingArea = document.getElementById("trainingArea");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

const trainingText = document.getElementById("trainingText");

const patternSection = document.getElementById("patternSection");

const clustersSection = document.getElementById("clustersSection");

const predictionSection = document.getElementById("predictionSection");

const clusters = document.getElementById("clusters");

const clusterExplanation =
    document.getElementById("clusterExplanation");

const flowerColor =
    document.getElementById("flowerColor");

const flowerShape =
    document.getElementById("flowerShape");

const newFlower =
    document.getElementById("newFlower");

const newFlowerInfo =
    document.getElementById("newFlowerInfo");

const predictBtn =
    document.getElementById("predictBtn");

const predictionResult =
    document.getElementById("predictionResult");

const predictionTitle =
    document.getElementById("predictionTitle");

const predictionMessage =
    document.getElementById("predictionMessage");

const confidenceFill =
    document.getElementById("confidenceFill");

const confidenceText =
    document.getElementById("confidenceText");


/* CREATE DATASET */

flowers.forEach((flower, index) => {

    const element = document.createElement("div");

    element.className = "flower";

    element.textContent = flower.emoji;

    element.title = "Flower " + (index + 1);

    dataset.appendChild(element);

});


/* =========================================
   TRAIN AI
========================================= */

trainBtn.addEventListener("click", () => {

    trainBtn.disabled = true;

    trainingArea.classList.remove("hidden");

    const flowerElements =
        document.querySelectorAll(".flower");

    let index = 0;

    let progress = 0;


    const animation = setInterval(() => {

        if (index < flowerElements.length) {

            flowerElements[index]
                .classList.add("analyzing");

            if (index > 0) {

                flowerElements[index - 1]
                    .classList.remove("analyzing");

            }

            index++;

        }


        progress += 5;

        progressBar.style.width = progress + "%";

        progressText.textContent =
            Math.min(progress, 100) + "%";


        if (progress < 40) {

            trainingText.textContent =
                "👀 AI is looking at the flowers...";

        }

        else if (progress < 70) {

            trainingText.textContent =
                "🔍 AI is comparing their features...";

        }

        else {

            trainingText.textContent =
                "🧠 AI is discovering patterns...";

        }


        if (progress >= 100) {

            clearInterval(animation);

            flowerElements.forEach(f =>
                f.classList.remove("analyzing")
            );

            setTimeout(() => {

                trainingArea.classList.add("hidden");

                patternSection.classList.remove("hidden");

                patternSection.scrollIntoView({
                    behavior: "smooth"
                });

            }, 700);

        }

    }, 150);

});


/* =========================================
   PATTERN SELECTION
========================================= */

let selectedPattern = "color";


const patternButtons =
    document.querySelectorAll(".pattern-btn");


patternButtons.forEach(button => {

    button.addEventListener("click", () => {

        patternButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedPattern =
            button.dataset.pattern;

    });

});


/* =========================================
   DISCOVER CLUSTERS
========================================= */

document
    .getElementById("discoverBtn")
    .addEventListener("click", discoverClusters);


function discoverClusters() {

    clusters.innerHTML = "";

    clustersSection.classList.remove("hidden");

    predictionSection.classList.remove("hidden");


    let groups = {};


    /* GROUP BY COLOR */

    if (selectedPattern === "color") {

        flowers.forEach(flower => {

            if (!groups[flower.color]) {
                groups[flower.color] = [];
            }

            groups[flower.color].push(flower);

        });

        clusterExplanation.textContent =
            "The AI noticed that some flowers have similar colours, so it grouped flowers with similar colours together.";

    }


    /* GROUP BY SHAPE */

    else {

        flowers.forEach(flower => {

            if (!groups[flower.shape]) {
                groups[flower.shape] = [];
            }

            groups[flower.shape].push(flower);

        });

        clusterExplanation.textContent =
            "The AI ignored the flower names and looked at their shapes, grouping flowers that looked similar.";

    }


    Object.keys(groups).forEach((group, index) => {

        const cluster =
            document.createElement("div");

        cluster.className = "cluster";


        const title =
            document.createElement("h3");

        title.textContent =
            getGroupName(group);


        const description =
            document.createElement("p");

        description.textContent =
            selectedPattern === "color"
                ? "Similar colour pattern"
                : "Similar shape pattern";


        const flowerContainer =
            document.createElement("div");

        flowerContainer.className =
            "cluster-flowers";


        groups[group].forEach(flower => {

            const item =
                document.createElement("span");

            item.textContent =
                flower.emoji;

            flowerContainer.appendChild(item);

        });


        cluster.appendChild(title);

        cluster.appendChild(description);

        cluster.appendChild(flowerContainer);

        clusters.appendChild(cluster);

    });


    clustersSection.scrollIntoView({
        behavior: "smooth"
    });

}


function getGroupName(group) {

    const names = {

        red: "🔴 Red Flower Group",

        yellow: "🟡 Yellow Flower Group",

        blue: "🔵 Blue Flower Group",

        pink: "🌸 Pink Flower Group",

        round: "⭕ Round Shape Group",

        star: "⭐ Star Shape Group",

        small: "🌷 Small Shape Group"

    };

    return names[group] || group;

}


/* =========================================
   NEW FLOWER
========================================= */

function updateNewFlower() {

    const color =
        flowerColor.value;

    const shape =
        flowerShape.value;


    const emojiMap = {

        red: {
            round: "🌹",
            star: "🌺",
            small: "🌷"
        },

        yellow: {
            round: "🌻",
            star: "🌼",
            small: "🌷"
        },

        blue: {
            round: "💠",
            star: "💠",
            small: "🪻"
        },

        pink: {
            round: "🌺",
            star: "🌸",
            small: "🌷"
        }

    };


    newFlower.textContent =
        emojiMap[color][shape];


    newFlowerInfo.textContent =
        capitalize(color)
        + " • "
        + capitalize(shape);


    predictionResult.classList.add("hidden");

}


flowerColor.addEventListener(
    "change",
    updateNewFlower
);

flowerShape.addEventListener(
    "change",
    updateNewFlower
);


/* =========================================
   PREDICT NEW FLOWER
========================================= */

predictBtn.addEventListener("click", () => {

    const color =
        flowerColor.value;

    const shape =
        flowerShape.value;


    let prediction;

    let confidence;


    if (selectedPattern === "color") {

        prediction =
            getGroupName(color);

        confidence =
            88 + Math.floor(Math.random() * 9);

        predictionMessage.textContent =
            "🤖 I found flowers with a similar colour pattern. " +
            "So I placed this new flower in the " +
            getGroupName(color) +
            ".";

    }

    else {

        prediction =
            getGroupName(shape);

        confidence =
            84 + Math.floor(Math.random() * 12);

        predictionMessage.textContent =
            "🤖 I compared the shape of this flower " +
            "with the flowers I discovered earlier. " +
            "It looks most similar to the " +
            getGroupName(shape) +
            ".";

    }


    predictionResult.classList.remove("hidden");


    predictionTitle.textContent =
        prediction;


    confidenceFill.style.width = "0%";


    setTimeout(() => {

        confidenceFill.style.width =
            confidence + "%";

    }, 100);


    confidenceText.textContent =
        confidence + "%";


    predictionResult.scrollIntoView({
        behavior: "smooth"
    });

});


/* CAPITALIZE */

function capitalize(word) {

    return word.charAt(0).toUpperCase()
        + word.slice(1);

}