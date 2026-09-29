/* =====================================================
   AI EVALUATION LAB
===================================================== */


/* =====================================================
   GET ELEMENTS
===================================================== */

const caseButtons = document.querySelectorAll(".case-button");

const caseLabel = document.getElementById("caseLabel");
const caseTitle = document.getElementById("caseTitle");

const predictionValue =
    document.getElementById("predictionValue");

const realityValue =
    document.getElementById("realityValue");

const resultBanner =
    document.getElementById("resultBanner");

const resultIcon =
    document.getElementById("resultIcon");

const resultTitle =
    document.getElementById("resultTitle");

const explanationText =
    document.getElementById("explanationText");

const needle =
    document.getElementById("needle");

const currentCase =
    document.getElementById("currentCase");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


/* =====================================================
   FOUR EVALUATION CASES
===================================================== */

const cases = {

    /* ================= CASE 1 ================= */

    1: {
        prediction: "YES",
        reality: "YES",

        result: "TRUE POSITIVE",
        icon: "😄",

        explanation:
            "The AI predicted that the student would get a Perfect Score, and the student actually got a Perfect Score. The prediction was correct.",

        /* RIGHT / CORRECT SIDE */
        angle: 55
    },


    /* ================= CASE 2 ================= */

    2: {
        prediction: "NO",
        reality: "NO",

        result: "TRUE NEGATIVE",
        icon: "🙂",

        explanation:
            "The AI predicted that the student would NOT get a Perfect Score, and the student actually did not get a Perfect Score. The prediction was correct.",

        /* RIGHT / CORRECT SIDE */
        angle: 55
    },


    /* ================= CASE 3 ================= */

    3: {
        prediction: "YES",
        reality: "NO",

        result: "FALSE POSITIVE",
        icon: "😟",

        explanation:
            "The reality is that there was no Perfect Score because the paper was difficult. However, the AI incorrectly predicted that the student would get a Perfect Score. This is a False Positive.",

        /* LEFT / INCORRECT SIDE */
        angle: -55
    },


    /* ================= CASE 4 ================= */

    4: {
        prediction: "NO",
        reality: "YES",

        result: "FALSE NEGATIVE",
        icon: "😣",

        explanation:
            "The reality is that the student got a Perfect Score. However, the AI incorrectly predicted that the student would NOT get a Perfect Score. This is a False Negative.",

        /* LEFT / INCORRECT SIDE */
        angle: -55
    }

};


/* =====================================================
   CURRENT CASE
===================================================== */

let selectedCase = 1;


/* =====================================================
   SHOW CASE
===================================================== */

function showCase(number) {

    selectedCase = number;

    const data = cases[number];


    /* ---------------------------------------------
       CASE HEADING
    --------------------------------------------- */

    caseLabel.textContent =
        "CASE " + number;

    caseTitle.textContent =
        "Is There a Perfect Score?";


    /* ---------------------------------------------
       PREDICTION
    --------------------------------------------- */

    predictionValue.textContent =
        data.prediction;


    /* ---------------------------------------------
       REALITY
    --------------------------------------------- */

    realityValue.textContent =
        data.reality;


    /* ---------------------------------------------
       RESULT
    --------------------------------------------- */

    resultIcon.textContent =
        data.icon;

    resultTitle.textContent =
        data.result;


    /* ---------------------------------------------
       EXPLANATION
    --------------------------------------------- */

    explanationText.textContent =
        data.explanation;


    /* ---------------------------------------------
       NEEDLE
    --------------------------------------------- */

    needle.style.transform =
        `translateX(-50%) rotate(${data.angle}deg)`;


    /* ---------------------------------------------
       FALSE / TRUE RESULT STYLE
    --------------------------------------------- */

    if (
        data.result === "FALSE POSITIVE" ||
        data.result === "FALSE NEGATIVE"
    ) {

        resultBanner.classList.add("false");

    } else {

        resultBanner.classList.remove("false");

    }


    /* ---------------------------------------------
       CASE COUNTER
    --------------------------------------------- */

    currentCase.textContent =
        number;


    /* ---------------------------------------------
       ACTIVE CASE BUTTON
    --------------------------------------------- */

    caseButtons.forEach(button => {

        button.classList.remove("active");

        if (
            Number(button.dataset.case) === number
        ) {

            button.classList.add("active");

        }

    });

}


/* =====================================================
   CASE BUTTONS
===================================================== */

caseButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number =
            Number(button.dataset.case);

        showCase(number);

    });

});


/* =====================================================
   NEXT CASE
===================================================== */

nextButton.addEventListener("click", () => {

    if (selectedCase < 4) {

        showCase(selectedCase + 1);

    } else {

        showCase(1);

    }

});


/* =====================================================
   PREVIOUS CASE
===================================================== */

previousButton.addEventListener("click", () => {

    if (selectedCase > 1) {

        showCase(selectedCase - 1);

    } else {

        showCase(4);

    }

});


/* =====================================================
   CHALLENGE
===================================================== */

const challengeButtons =
    document.querySelectorAll(
        ".challenge-buttons button"
    );

const challengeResult =
    document.getElementById(
        "challengeResult"
    );


challengeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const answer =
            button.dataset.answer;


        if (answer === "FP") {

            challengeResult.innerHTML =
                "🎉 Correct! YES prediction + NO reality = FALSE POSITIVE.";

            challengeResult.style.color =
                "#2e7d32";

        } else {

            challengeResult.innerHTML =
                "🤔 Try again! The AI said YES, but Reality said NO.";

            challengeResult.style.color =
                "#667085";

        }

    });

});


/* =====================================================
   START
===================================================== */

showCase(1);