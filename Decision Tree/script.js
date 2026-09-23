/* =====================================================
   DECISION TREE - RULE BASED AI LAB
===================================================== */


/* =========================
   TAB NAVIGATION
========================= */

const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.page;

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        pages.forEach(page => {
            page.classList.remove("active-page");
        });

        document
            .getElementById(target)
            .classList.add("active-page");

    });

});


/* =========================
   TREE NODE EXPLANATION
========================= */

const treeNodes = document.querySelectorAll(".tree-node");
const nodeExplanation =
    document.getElementById("nodeExplanation");

treeNodes.forEach(node => {

    node.addEventListener("click", () => {

        const type = node.dataset.type;

        if (type === "root") {

            nodeExplanation.innerHTML = `
                <strong>🌱 Root Node</strong><br>
                This is the first question in the tree.
                Every prediction starts here.
                <br><br>
                <b>Rule:</b> Is the person's height greater than 5.9 ft?
            `;

        }

        else if (type === "decision") {

            nodeExplanation.innerHTML = `
                <strong>❓ Decision Node</strong><br>
                This node contains another question.
                The AI has not reached its final answer yet.
                <br><br>
                It must look at another feature and continue.
            `;

        }

        else if (type === "leaf") {

            nodeExplanation.innerHTML = `
                <strong>🍃 Leaf Node</strong><br>
                Congratulations! The AI has reached
                the final prediction.
                <br><br>
                No more questions are required.
            `;

        }

    });

});


/* =====================================================
   FOLLOW THE TREE
===================================================== */

const followQuestion =
    document.getElementById("followQuestion");

const questionNumber =
    document.getElementById("questionNumber");

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const followFeedback =
    document.getElementById("followFeedback");

const resetFollow =
    document.getElementById("resetFollow");


let followStep = 1;


/* -------------------------
   YES
------------------------- */

yesButton.addEventListener("click", () => {

    if (followStep === 1) {

        followStep = 2;

        questionNumber.textContent = "2";

        followQuestion.textContent =
            "Is weight ≤ 150 lb?";

        followFeedback.className =
            "feedback correct";

        followFeedback.innerHTML = `
            🎉 <strong>Correct!</strong><br><br>

            Person A is 6.2 ft tall.

            <br><br>

            6.2 > 5.9

            <br><br>

            Therefore, the AI follows the
            <strong>YES branch</strong>.
        `;

    }

    else if (followStep === 2) {

        followStep = 3;

        questionNumber.textContent = "✓";

        followQuestion.textContent =
            "🎉 Prediction: MALE";

        followFeedback.className =
            "feedback correct";

        followFeedback.innerHTML = `
            🎯 <strong>Excellent!</strong><br><br>

            Person A weighs 140 lb.

            <br><br>

            140 ≤ 150

            <br><br>

            So the AI follows YES and reaches
            the <strong>MALE</strong> leaf node.
        `;

        yesButton.style.display = "none";
        noButton.style.display = "none";

    }

});


/* -------------------------
   NO
------------------------- */

noButton.addEventListener("click", () => {

    if (followStep === 1) {

        followFeedback.className =
            "feedback wrong";

        followFeedback.innerHTML = `
            ❌ <strong>Not quite!</strong><br><br>

            Person A is 6.2 ft tall.

            <br><br>

            6.2 is greater than 5.9.

            <br><br>

            Therefore, the correct branch is
            <strong>YES</strong>.
        `;

    }

    else if (followStep === 2) {

        followFeedback.className =
            "feedback wrong";

        followFeedback.innerHTML = `
            ❌ <strong>Not quite!</strong><br><br>

            Person A weighs 140 lb.

            <br><br>

            140 ≤ 150 is TRUE.

            <br><br>

            Therefore, the correct branch is
            <strong>YES</strong>.
        `;

    }

});


/* -------------------------
   RESET FOLLOW
------------------------- */

resetFollow.addEventListener("click", () => {

    followStep = 1;

    questionNumber.textContent = "1";

    followQuestion.textContent =
        "Is height greater than 5.9 ft?";

    followFeedback.className =
        "feedback";

    followFeedback.innerHTML = "";

    yesButton.style.display = "inline-block";

    noButton.style.display = "inline-block";

});


/* =====================================================
   CHALLENGE QUESTIONS
===================================================== */

const challenges = [

    {
        person: "🧑 Person B",
        facts: "Height: 6.0 ft · Weight: 170 lb · Foot Size: 10.5",

        question:
            "Is height greater than 5.9 ft?",

        options: ["YES", "NO"],

        answer: "YES",

        explanation:
            "6.0 is greater than 5.9, so the AI follows the YES branch."
    },


    {
        person: "👩 Person C",
        facts: "Height: 5.5 ft · Weight: 130 lb · Foot Size: 8.5",

        question:
            "Is height greater than 5.9 ft?",

        options: ["YES", "NO"],

        answer: "NO",

        explanation:
            "5.5 is not greater than 5.9, so the AI follows the NO branch."
    },


    {
        person: "🧑 Person D",
        facts: "Height: 5.7 ft · Weight: 145 lb · Foot Size: 10.2",

        question:
            "Is weight ≤ 150 lb?",

        options: ["YES", "NO"],

        answer: "YES",

        explanation:
            "145 is less than or equal to 150, so YES is correct."
    },


    {
        person: "👩 Person E",
        facts: "Height: 5.6 ft · Weight: 175 lb · Foot Size: 9.5",

        question:
            "Is weight ≤ 150 lb?",

        options: ["YES", "NO"],

        answer: "NO",

        explanation:
            "175 is greater than 150, so the correct branch is NO."
    },


    {
        person: "🌡️ Final Challenge",
        facts: "Temperature = 34°C",

        question:
            "The rule is: IF temperature > 30°C. Which branch?",

        options: ["YES", "NO"],

        answer: "YES",

        explanation:
            "34 is greater than 30, so the AI follows the YES branch."
    }

];


let challengeIndex = 0;
let score = 0;

const challengeContent =
    document.getElementById("challengeContent");

const challengeFeedback =
    document.getElementById("challengeFeedback");

const challengeNumber =
    document.getElementById("challengeNumber");

const scoreDisplay =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const nextButton =
    document.getElementById("nextButton");

const restartButton =
    document.getElementById("restartButton");


/* =========================
   LOAD CHALLENGE
========================= */

function loadChallenge() {

    const challenge =
        challenges[challengeIndex];

    challengeNumber.textContent =
        challengeIndex + 1;

    progressBar.style.width =
        ((challengeIndex + 1) /
            challenges.length * 100) + "%";


    challengeFeedback.className =
        "feedback";

    challengeFeedback.innerHTML = "";

    nextButton.hidden = true;

    restartButton.hidden = true;


    challengeContent.innerHTML = `

        <div class="challenge-person">

            ${challenge.person}

        </div>


        <p>
            <strong>Student Data:</strong>
        </p>

        <p>
            ${challenge.facts}
        </p>


        <p class="challenge-question">

            ${challenge.question}

        </p>


        <div class="choice-grid">

            ${challenge.options.map(option => `

                <button
                    class="choice-button"
                    data-answer="${option}"
                >

                    ${option === "YES"
                        ? "✅ YES"
                        : "❌ NO"}

                </button>

            `).join("")}

        </div>

    `;

}


/* =========================
   CHECK ANSWER
========================= */

challengeContent.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".choice-button");

        if (!button) {
            return;
        }


        const selected =
            button.dataset.answer;

        const current =
            challenges[challengeIndex];


        const buttons =
            challengeContent.querySelectorAll(
                ".choice-button"
            );


        buttons.forEach(btn => {
            btn.disabled = true;
        });


        if (selected === current.answer) {

            score++;

            scoreDisplay.textContent =
                score;


            challengeFeedback.className =
                "feedback correct";

            challengeFeedback.innerHTML = `
                🎉 <strong>Correct!</strong><br><br>

                ${current.explanation}
            `;

        }

        else {

            challengeFeedback.className =
                "feedback wrong";

            challengeFeedback.innerHTML = `
                💡 <strong>Not quite.</strong><br><br>

                ${current.explanation}
            `;

        }


        if (
            challengeIndex <
            challenges.length - 1
        ) {

            nextButton.hidden = false;

        }

        else {

            restartButton.hidden = false;

            challengeFeedback.innerHTML += `

                <br><br>

                🏆 <strong>Challenge Complete!</strong>

                <br><br>

                Your final score:
                <strong>
                    ${score} / ${challenges.length}
                </strong>

            `;

        }

    }
);


/* =========================
   NEXT
========================= */

nextButton.addEventListener(
    "click",
    () => {

        challengeIndex++;

        loadChallenge();

    }
);


/* =========================
   RESTART
========================= */

restartButton.addEventListener(
    "click",
    () => {

        challengeIndex = 0;

        score = 0;

        scoreDisplay.textContent = "0";

        loadChallenge();

    }
);


/* =========================
   START
========================= */

loadChallenge();