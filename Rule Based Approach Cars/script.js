const trainBtn = document.getElementById("trainBtn");
const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");

const trainingStatus =
    document.getElementById("trainingStatus");

const newObject =
    document.getElementById("newObject");

const objectName =
    document.getElementById("objectName");

const wheelFeature =
    document.getElementById("wheelFeature");

const bodyFeature =
    document.getElementById("bodyFeature");

const frameFeature =
    document.getElementById("frameFeature");

const reasoning =
    document.getElementById("reasoning");

const prediction =
    document.getElementById("prediction");

const predictionText =
    document.getElementById("predictionText");

const confidenceText =
    document.getElementById("confidenceText");

const predictionMessage =
    document.getElementById("predictionMessage");

const progressBar =
    document.getElementById("progressBar");

const carRule =
    document.getElementById("carRule");

const bikeRule =
    document.getElementById("bikeRule");

const choices =
    document.querySelectorAll(".choice");


let modelTrained = false;
let selectedObject = "car";


/* -----------------------------
   OBJECT DATA
----------------------------- */

const objects = {

    car: {
        emoji: "🚗",
        name: "New Car",
        wheels: "4",
        body: "Car-like",
        frame: "Car frame"
    },

    bike: {
        emoji: "🚲",
        name: "New Bicycle",
        wheels: "2",
        body: "Bicycle-like",
        frame: "Bicycle frame"
    },

    carSimilar: {
        emoji: "🚙",
        name: "Similar Car",
        wheels: "4",
        body: "Car-like",
        frame: "Car frame"
    },

    bikeSimilar: {
        emoji: "🚴",
        name: "Similar Bicycle",
        wheels: "2",
        body: "Bicycle-like",
        frame: "Bicycle frame"
    },

    unknown: {
        emoji: "❓",
        name: "Unknown Object",
        wheels: "3",
        body: "Unknown",
        frame: "Unknown"
    }

};


/* -----------------------------
   SELECT NEW DATA
----------------------------- */

choices.forEach(button => {

    button.addEventListener("click", () => {

        choices.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedObject =
            button.dataset.object;

        updateObject();

        resetPrediction();

    });

});


function updateObject() {

    const object =
        objects[selectedObject];

    newObject.textContent =
        object.emoji;

    objectName.textContent =
        object.name;

    wheelFeature.textContent =
        object.wheels;

    bodyFeature.textContent =
        object.body;

    frameFeature.textContent =
        object.frame;

}


/* -----------------------------
   TRAIN MODEL
----------------------------- */

trainBtn.addEventListener("click", () => {

    trainBtn.disabled = true;

    trainingStatus.textContent =
        "📚 Reading labeled training data...";


    setTimeout(() => {

        trainingStatus.textContent =
            "⚙️ Creating rules from training examples...";

    }, 900);


    setTimeout(() => {

        trainingStatus.textContent =
            "🧠 Checking rule patterns...";

    }, 1700);


    setTimeout(() => {

        trainingStatus.textContent =
            "✓ Model trained successfully!";

        trainingStatus.style.background =
            "#dcfce7";

        trainingStatus.style.color =
            "#166534";

        modelTrained = true;

        predictBtn.disabled = false;

    }, 2500);

});


/* -----------------------------
   PREDICTION
----------------------------- */

predictBtn.addEventListener("click", () => {

    carRule.classList.remove("active");
    bikeRule.classList.remove("active");

    const object =
        objects[selectedObject];

    let result;


    /*
       Rule matching
    */

    if (
        selectedObject === "car" ||
        selectedObject === "carSimilar"
    ) {

        result = {
            label: "CAR",
            confidence:
                selectedObject === "car"
                    ? 96
                    : 92,
            rule: "CAR RULE"
        };

        carRule.classList.add("active");

    }

    else if (
        selectedObject === "bike" ||
        selectedObject === "bikeSimilar"
    ) {

        result = {
            label: "BICYCLE",
            confidence:
                selectedObject === "bike"
                    ? 97
                    : 91,
            rule: "BICYCLE RULE"
        };

        bikeRule.classList.add("active");

    }

    else {

        result = {
            label: "UNKNOWN",
            confidence: 34,
            rule: "No matching rule"
        };

    }


    showReasoning(object, result);

    showPrediction(result);

});


/* -----------------------------
   MACHINE REASONING
----------------------------- */

function showReasoning(object, result) {

    let html = "";

    html += `
        <div>
            🔍 New data received:
            <strong>${object.emoji} ${object.name}</strong>
        </div>
    `;


    if (result.label === "CAR") {

        html += `
            <div>✓ Number of wheels = ${object.wheels}</div>

            <div>✓ Body type = ${object.body}</div>

            <div>✓ Frame type = ${object.frame}</div>

            <div>✓ CAR RULE matched.</div>

            <div>🤖 Machine predicts: <strong>CAR</strong></div>
        `;

    }

    else if (result.label === "BICYCLE") {

        html += `
            <div>✓ Number of wheels = ${object.wheels}</div>

            <div>✓ Body type = ${object.body}</div>

            <div>✓ Frame type = ${object.frame}</div>

            <div>✓ BICYCLE RULE matched.</div>

            <div>🤖 Machine predicts: <strong>BICYCLE</strong></div>
        `;

    }

    else {

        html += `
            <div>✗ Car rule does not match.</div>

            <div>✗ Bicycle rule does not match.</div>

            <div>⚠️ No predefined rule matches this object.</div>

            <div>🤖 Machine predicts: <strong>UNKNOWN</strong></div>
        `;

    }


    reasoning.innerHTML = html;

}


/* -----------------------------
   SHOW PREDICTION
----------------------------- */

function showPrediction(result) {

    prediction.className =
        "prediction";

    if (result.label === "UNKNOWN") {

        prediction.classList.add("warning");

    } else {

        prediction.classList.add("success");

    }


    predictionText.textContent =
        result.label;


    confidenceText.textContent =
        result.confidence + "%";


    progressBar.style.width =
        result.confidence + "%";


    if (result.label === "CAR") {

        predictionMessage.textContent =
            "The new object matches the predefined CAR rules.";

    }

    else if (result.label === "BICYCLE") {

        predictionMessage.textContent =
            "The new object matches the predefined BICYCLE rules.";

    }

    else {

        predictionMessage.textContent =
            "The object does not strongly match any predefined rule.";

    }

}


/* -----------------------------
   RESET PREDICTION
----------------------------- */

function resetPrediction() {

    carRule.classList.remove("active");
    bikeRule.classList.remove("active");

    prediction.className =
        "prediction";

    predictionText.textContent =
        "Waiting...";

    confidenceText.textContent =
        "0%";

    progressBar.style.width =
        "0%";

    predictionMessage.textContent =
        "Train the model and provide new data.";

    reasoning.textContent =
        "Train the model first, then give it new data.";

}


/* -----------------------------
   RESET EVERYTHING
----------------------------- */

resetBtn.addEventListener("click", () => {

    modelTrained = false;

    trainBtn.disabled = false;

    predictBtn.disabled = true;

    trainingStatus.textContent =
        "Model has not been trained yet.";

    trainingStatus.style.background =
        "#f1f5f9";

    trainingStatus.style.color =
        "#64748b";


    choices.forEach(btn =>
        btn.classList.remove("active")
    );

    choices[0].classList.add("active");

    selectedObject = "car";

    updateObject();

    resetPrediction();

});