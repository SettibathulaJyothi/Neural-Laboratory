/* =====================================================
   AI EVALUATION LAB
===================================================== */


/* =====================================================
   GET ELEMENTS
===================================================== */

const caseButtons =
    document.querySelectorAll(".case-button");

const caseLabel =
    document.getElementById("caseLabel");

const caseTitle =
    document.getElementById("caseTitle");

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
   FOUR CASES
===================================================== */

const cases = {

    1: {

        prediction: "YES",

        reality: "YES",

        result: "TRUE POSITIVE",

        icon: "😄",

        explanation:
            "The AI predicted YES and reality was also YES. The prediction was correct.",

        angle: 65

    },


    2: {

        prediction: "NO",

        reality: "NO",

        result: "TRUE NEGATIVE",

        icon: "🙂",

        explanation:
            "The AI predicted NO and reality was also NO. The prediction was correct.",

        angle: -65

    },


    3: {

        prediction: "YES",

        reality: "NO",

        result: "FALSE POSITIVE",

        icon: "😟",

        explanation:
            "The AI predicted YES, but reality was NO. The AI predicted something that did not happen.",

        angle: -35

    },


    4: {

        prediction: "NO",

        reality: "YES",

        result: "FALSE NEGATIVE",

        icon: "😣",

        explanation:
            "The AI predicted NO, but reality was YES. The AI missed something that actually happened.",

        angle: 35

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


    const data =
        cases[number];


    /* Case heading */

    caseLabel.textContent =
        "CASE " + number;


    caseTitle.textContent =
        "Is There a Perfect Score?";


    /* Prediction */

    predictionValue.textContent =
        data.prediction;


    /* Reality */

    realityValue.textContent =
        data.reality;


    /* Result */

    resultIcon.textContent =
        data.icon;


    resultTitle.textContent =
        data.result;


    explanationText.textContent =
        data.explanation;


    /* Move needle */

    needle.style.transform =
        "translateX(-50%) rotate(" +
        data.angle +
        "deg)";


    /* False result */

    if (
        data.result === "FALSE POSITIVE" ||
        data.result === "FALSE NEGATIVE"
    ) {

        resultBanner.classList.add("false");

    } else {

        resultBanner.classList.remove("false");

    }


    /* Case counter */

    currentCase.textContent =
        number;


    /* Active case */

    caseButtons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

            if (
                Number(
                    button.dataset.case
                ) === number
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
   CASE BUTTONS
===================================================== */

caseButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                const number =
                    Number(
                        this.dataset.case
                    );

                showCase(number);

            }
        );

    }
);


/* =====================================================
   NEXT CASE
===================================================== */

nextButton.addEventListener(
    "click",
    function () {

        if (selectedCase < 4) {

            showCase(
                selectedCase + 1
            );

        } else {

            showCase(1);

        }

    }
);


/* =====================================================
   PREVIOUS CASE
===================================================== */

previousButton.addEventListener(
    "click",
    function () {

        if (selectedCase > 1) {

            showCase(
                selectedCase - 1
            );

        } else {

            showCase(4);

        }

    }
);


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


challengeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                const answer =
                    this.dataset.answer;


                if (answer === "FP") {

                    challengeResult.innerHTML =
                        "🎉 Correct! YES prediction + NO reality = FALSE POSITIVE.";

                    challengeResult.style.color =
                        "#a72e2e";

                } else {

                    challengeResult.innerHTML =
                        "🤔 Try again! AI said YES, but Reality said NO.";

                    challengeResult.style.color =
                        "#667085";

                }

            }
        );

    }
);


/* =====================================================
   START WITH CASE 1
===================================================== */

showCase(1);