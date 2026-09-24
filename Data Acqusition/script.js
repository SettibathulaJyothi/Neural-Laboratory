/* =========================================
   DATA ACQUISITION AI LAB
========================================= */


/* =========================================
   METHOD SWITCHING
========================================= */

const methodButtons =
    document.querySelectorAll(".method");

const lessons =
    document.querySelectorAll(".lesson");


methodButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selected =
            button.dataset.method;


        /* Remove active state */

        methodButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Add active state */

        button.classList.add("active");


        /* Hide all lessons */

        lessons.forEach(lesson => {

            lesson.classList.add("hidden");

        });


        /* Show selected lesson */

        document
            .getElementById(selected)
            .classList.remove("hidden");

    });

});



/* =========================================
   DATA DISCOVERY
========================================= */

const discoverBtn =
    document.getElementById("discoverBtn");

const discoveryResults =
    document.getElementById("discoveryResults");


discoverBtn.addEventListener("click", () => {

    discoveryResults.innerHTML = "";


    const datasets = [

        {
            icon: "🚗",
            title: "Car Images",
            count: "12,500 images"
        },

        {
            icon: "🚦",
            title: "Traffic Signs",
            count: "8,200 images"
        },

        {
            icon: "🛣️",
            title: "Road Scenes",
            count: "15,700 images"
        },

        {
            icon: "🚙",
            title: "Vehicle Dataset",
            count: "21,400 images"
        }

    ];


    datasets.forEach((dataset, index) => {

        const card =
            document.createElement("div");

        card.className = "data-item";


        card.style.animationDelay =
            `${index * 0.1}s`;


        card.innerHTML = `

            <div class="data-icon">
                ${dataset.icon}
            </div>

            <b>${dataset.title}</b>

            <br>

            <small>
                ${dataset.count}
            </small>

        `;


        discoveryResults.appendChild(card);

    });


    discoverBtn.textContent =
        "✅ Dataset Found!";


    setTimeout(() => {

        discoverBtn.textContent =
            "🔎 Discover Data";

    }, 2000);

});



/* =========================================
   DATA AUGMENTATION
========================================= */

const variationGrid =
    document.getElementById("variationGrid");

const dataCount =
    document.getElementById("dataCount");


let totalImages = 1;


const augmentationButtons = {

    rotate:
        document.getElementById("rotateBtn"),

    flip:
        document.getElementById("flipBtn"),

    crop:
        document.getElementById("cropBtn"),

    bright:
        document.getElementById("brightBtn")

};



/* Create variation */

function createVariation(type) {

    totalImages++;


    const variation =
        document.createElement("div");

    variation.className =
        "variation created";


    let transform = "";

    let label = "";


    if (type === "rotate") {

        transform =
            "transform: rotate(12deg);";

        label =
            "↪️";

    }


    if (type === "flip") {

        transform =
            "transform: scaleX(-1);";

        label =
            "↔️";

    }


    if (type === "crop") {

        transform =
            "transform: scale(1.3);";

        label =
            "🔍";

    }


    if (type === "bright") {

        transform =
            "filter: brightness(1.5);";

        label =
            "☀️";

    }


    variation.innerHTML = `

        <span
            style="${transform}"
        >
            🚗
        </span>

    `;


    variation.title =
        label + " New variation";


    /* Replace empty box */

    const empty =
        variationGrid.querySelector(".empty");


    if (empty) {

        empty.replaceWith(variation);

    } else {

        variationGrid.appendChild(variation);

    }


    dataCount.textContent =
        totalImages;


    /* Keep the visual area manageable */

    if (variationGrid.children.length > 6) {

        variationGrid.removeChild(
            variationGrid.firstElementChild
        );

    }

}



/* Button events */

augmentationButtons.rotate.addEventListener(
    "click",
    () => createVariation("rotate")
);


augmentationButtons.flip.addEventListener(
    "click",
    () => createVariation("flip")
);


augmentationButtons.crop.addEventListener(
    "click",
    () => createVariation("crop")
);


augmentationButtons.bright.addEventListener(
    "click",
    () => createVariation("bright")
);



/* Reset */

document
    .getElementById("resetAugmentation")
    .addEventListener("click", () => {

        totalImages = 1;

        dataCount.textContent = "1";


        variationGrid.innerHTML = `

            <div class="variation empty">
                <span>?</span>
            </div>

            <div class="variation empty">
                <span>?</span>
            </div>

            <div class="variation empty">
                <span>?</span>
            </div>

        `;

    });



/* =========================================
   DATA GENERATION
========================================= */

const weather =
    document.getElementById("weather");

const lighting =
    document.getElementById("lighting");

const road =
    document.getElementById("road");

const traffic =
    document.getElementById("traffic");

const generatedMessage =
    document.getElementById("generatedMessage");


const weatherOptions = [

    "☀️ Sunny",

    "🌧️ Rainy",

    "☁️ Cloudy",

    "🌫️ Foggy"

];


const lightingOptions = [

    "☀️ Day",

    "🌙 Night",

    "🌅 Sunset",

    "🌄 Dawn"

];


const roadOptions = [

    "Dry",

    "Wet",

    "Muddy",

    "Snowy"

];


const trafficOptions = [

    "Low",

    "Medium",

    "Heavy",

    "Very Heavy"

];



function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}



document
    .getElementById("generateBtn")
    .addEventListener("click", () => {

        weather.textContent =
            randomItem(weatherOptions);


        lighting.textContent =
            randomItem(lightingOptions);


        road.textContent =
            randomItem(roadOptions);


        traffic.textContent =
            randomItem(trafficOptions);


        generatedMessage.innerHTML = `

            🎉 <b>New Data Generated!</b>

            <br>

            The simulator created a new driving
            situation using different conditions.

        `;

    });



/* =========================================
   STUDENT CHALLENGE
========================================= */

const questions = [

    {

        question:
            "You search the Internet and find a dataset containing thousands of car images. What method is this?",

        options: [

            "🔎 Data Discovery",

            "🔄 Data Augmentation",

            "🎛️ Data Generation"

        ],

        answer: 0

    },


    {

        question:
            "You rotate an existing car image to create another training image. What method is this?",

        options: [

            "🔎 Data Discovery",

            "🔄 Data Augmentation",

            "🎛️ Data Generation"

        ],

        answer: 1

    },


    {

        question:
            "A computer simulator creates a completely new rainy-night driving scene. What method is this?",

        options: [

            "🔎 Data Discovery",

            "🔄 Data Augmentation",

            "🎛️ Data Generation"

        ],

        answer: 2

    },


    {

        question:
            "Which method means FINDING data that already exists?",

        options: [

            "🔎 Data Discovery",

            "🔄 Data Augmentation",

            "🎛️ Data Generation"

        ],

        answer: 0

    },


    {

        question:
            "Which method means creating variations from existing data?",

        options: [

            "🔎 Data Discovery",

            "🔄 Data Augmentation",

            "🎛️ Data Generation"

        ],

        answer: 1

    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const questionNumber =
    document.getElementById("questionNumber");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const challengeResult =
    document.getElementById("challengeResult");

const scoreDisplay =
    document.getElementById("score");

const nextQuestion =
    document.getElementById("nextQuestion");



/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    answered = false;


    const q =
        questions[currentQuestion];


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    question.textContent =
        q.question;


    answers.innerHTML = "";


    challengeResult.textContent = "";


    nextQuestion.classList.add("hidden");


    q.options.forEach((option, index) => {

        const button =
            document.createElement("button");


        button.className =
            "answer";


        button.textContent =
            option;


        button.addEventListener(
            "click",
            () => checkAnswer(button, index)
        );


        answers.appendChild(button);

    });

}



/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(button, selected) {

    if (answered) {

        return;

    }


    answered = true;


    const correct =
        questions[currentQuestion].answer;


    const allAnswers =
        document.querySelectorAll(".answer");


    if (selected === correct) {

        button.classList.add("correct");


        score++;


        scoreDisplay.textContent =
            score;


        challengeResult.innerHTML =
            "🎉 <b>Excellent!</b> You identified the correct method.";

    }

    else {

        button.classList.add("wrong");


        allAnswers[correct]
            .classList.add("correct");


        challengeResult.innerHTML =
            "💡 Not quite! The highlighted answer is correct.";

    }


    nextQuestion.classList.remove("hidden");

}



/* =========================================
   NEXT QUESTION
========================================= */

nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            showFinalScore();

            return;

        }


        loadQuestion();

    }
);



/* =========================================
   FINAL SCORE
========================================= */

function showFinalScore() {

    questionNumber.textContent =
        "🏆 Challenge Complete!";


    question.textContent =
        `You scored ${score} out of ${questions.length}!`;


    answers.innerHTML = "";


    challengeResult.innerHTML = `

        ${
            score === questions.length
            ? "🌟 Amazing! You mastered Data Acquisition!"
            : "👏 Good work! Try the challenge again and improve your score."
        }

    `;


    nextQuestion.textContent =
        "🔄 Play Again";


    nextQuestion.classList.remove(
        "hidden"
    );


    nextQuestion.onclick = () => {

        currentQuestion = 0;

        score = 0;

        scoreDisplay.textContent =
            "0";

        nextQuestion.textContent =
            "Next Question ➜";

        loadQuestion();

    };

}



/* =========================================
   START
========================================= */

loadQuestion();