/* =====================================================
   PIXEL IT - LEARNING BASED APPROACH
   ===================================================== */

const SIZE = 6;

let trainingExamples = [];
let trained = false;


/* =====================================================
   CREATE PIXEL GRIDS
   ===================================================== */

function createGrid(containerId) {

    const container = document.getElementById(containerId);

    container.innerHTML = "";

    for (let i = 0; i < SIZE * SIZE; i++) {

        const pixel = document.createElement("div");

        pixel.className = "pixel";

        pixel.dataset.index = i;

        pixel.addEventListener("click", () => {

            pixel.classList.toggle("active");

            updateBinaryOutput();

        });

        container.appendChild(pixel);
    }
}


/* Create both grids */

createGrid("trainingGrid");
createGrid("testGrid");


/* =====================================================
   GET PIXEL DATA
   ===================================================== */

function getPixels(containerId) {

    const pixels =
        document.querySelectorAll(`#${containerId} .pixel`);

    return Array.from(pixels).map(pixel =>
        pixel.classList.contains("active") ? 1 : 0
    );
}


/* =====================================================
   CLEAR GRID
   ===================================================== */

function clearGrid(containerId) {

    const pixels =
        document.querySelectorAll(`#${containerId} .pixel`);

    pixels.forEach(pixel => {
        pixel.classList.remove("active");
    });

    updateBinaryOutput();
}


/* =====================================================
   BINARY OUTPUT
   ===================================================== */

function updateBinaryOutput() {

    const data = getPixels("testGrid");

    let rows = [];

    for (let i = 0; i < SIZE; i++) {

        rows.push(
            data.slice(i * SIZE, i * SIZE + SIZE).join(" ")
        );

    }

    document.getElementById("binaryOutput").innerHTML =
        rows.join("<br>");
}


/* =====================================================
   PIXEL SIMILARITY
   ===================================================== */

function calculateSimilarity(a, b) {

    let matching = 0;

    for (let i = 0; i < a.length; i++) {

        if (a[i] === b[i]) {
            matching++;
        }

    }

    return matching / a.length;
}


/* =====================================================
   ADD TRAINING EXAMPLE
   ===================================================== */

document
    .getElementById("addExample")
    .addEventListener("click", () => {

        const input =
            document.getElementById("letterInput");

        const letter =
            input.value.trim().toUpperCase();

        const pixels =
            getPixels("trainingGrid");


        if (!letter) {

            alert("Please enter the letter you drew.");

            return;
        }


        const filled =
            pixels.filter(x => x === 1).length;


        if (filled < 3) {

            alert("Please draw a clearer letter first!");

            return;
        }


        trainingExamples.push({

            letter: letter,

            pixels: pixels

        });


        displayTrainingData();


        document.getElementById("trainingStatus").textContent =
            `Example ${trainingExamples.length} added. Add more examples or train the AI.`;


        input.value = "";

        clearGrid("trainingGrid");

    });


/* =====================================================
   DISPLAY TRAINING DATA
   ===================================================== */

function displayTrainingData() {

    const container =
        document.getElementById("trainingData");

    container.innerHTML = "";


    trainingExamples.forEach((example, index) => {

        const item =
            document.createElement("div");

        item.className = "training-item";


        const letter =
            document.createElement("div");

        letter.className = "training-letter";

        letter.textContent =
            `${index + 1}. ${example.letter}`;


        const pixelCount =
            example.pixels.filter(x => x === 1).length;


        const data =
            document.createElement("div");

        data.className = "training-pixels";

        data.textContent =
            `${pixelCount} filled pixels`;


        item.appendChild(letter);

        item.appendChild(data);

        container.appendChild(item);

    });

}


/* =====================================================
   TRAIN AI
   ===================================================== */

document
    .getElementById("trainAI")
    .addEventListener("click", () => {

        if (trainingExamples.length < 2) {

            alert(
                "Add at least 2 training examples before training the AI."
            );

            return;
        }


        const status =
            document.getElementById("trainingStatus");


        status.textContent =
            "🧠 AI is studying the pixel patterns...";


        setTimeout(() => {

            trained = true;

            status.textContent =
                `✅ AI trained successfully using ${trainingExamples.length} examples!`;

        }, 1200);

    });


/* =====================================================
   PREDICT
   ===================================================== */

document
    .getElementById("predictButton")
    .addEventListener("click", () => {

        if (!trained) {

            alert(
                "Train the AI first! Add examples and click Train AI."
            );

            return;
        }


        const testPixels =
            getPixels("testGrid");


        const filled =
            testPixels.filter(x => x === 1).length;


        if (filled < 3) {

            alert(
                "Draw a letter in the test grid first."
            );

            return;
        }


        /*
          Compare the test pattern against
          every training example.
        */

        let results =
            trainingExamples.map(example => {

                return {

                    letter: example.letter,

                    similarity:
                        calculateSimilarity(
                            testPixels,
                            example.pixels
                        )

                };

            });


        /*
          Sort from most similar to least similar
        */

        results.sort(
            (a, b) =>
                b.similarity - a.similarity
        );


        const best =
            results[0];


        /*
          Calculate a friendly confidence value.
          We keep it above 50% so the result is
          easier for students to understand.
        */

        let confidence =
            Math.round(best.similarity * 100);


        confidence =
            Math.max(50, confidence);


        showPrediction(
            best.letter,
            confidence
        );

    });


/* =====================================================
   SHOW PREDICTION
   ===================================================== */

function showPrediction(letter, confidence) {

    document.getElementById("prediction")
        .textContent = letter;


    document.getElementById("confidence")
        .textContent =
        `Confidence: ${confidence}%`;


    document.getElementById("confidenceFill")
        .style.width =
        `${confidence}%`;


    document.getElementById("explanation")
        .textContent =
        `I compared your pixels with the patterns I learned. The closest pattern looks like "${letter}".`;

}


/* =====================================================
   CLEAR BUTTONS
   ===================================================== */

document
    .getElementById("clearTraining")
    .addEventListener("click", () => {

        clearGrid("trainingGrid");

        document.getElementById("letterInput")
            .value = "";

    });


document
    .getElementById("clearTest")
    .addEventListener("click", () => {

        clearGrid("testGrid");

        document.getElementById("prediction")
            .textContent = "?";

        document.getElementById("confidence")
            .textContent =
            "Draw something and test it!";

        document.getElementById("confidenceFill")
            .style.width = "0%";

        document.getElementById("explanation")
            .textContent =
            "The AI will compare the pixel pattern with the examples it learned.";

    });


/* =====================================================
   INITIAL BINARY DISPLAY
   ===================================================== */

updateBinaryOutput();