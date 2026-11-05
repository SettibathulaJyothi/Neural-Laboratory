
const dataInfo = {
  data: {
    icon: "📊",
    title: "DATA",
    description:
      "Data is a collection of facts, observations or information. It can be represented using words or numbers.",
    examples: "Student names, ages, marks, heights and colours.",
    key: "Data is mainly classified into Textual Data and Numeric Data."
  },

  textual: {
    icon: "📝",
    title: "TEXTUAL DATA",
    description:
      "Textual data represents information using words, labels or categories instead of numerical measurements.",
    examples: "Names, colours, cities, grades and product categories.",
    key: "Textual data is divided into Nominal and Ordinal data."
  },

  nominal: {
    icon: "🔤",
    title: "NOMINAL DATA",
    description:
      "Nominal data is used to name or label different groups. These categories do not have any natural order or ranking.",
    examples: "Eye colour: Brown, Blue, Green. Blood group: A, B, AB, O.",
    key: "Remember: Nominal = Names without order."
  },

  ordinal: {
    icon: "📶",
    title: "ORDINAL DATA",
    description:
      "Ordinal data represents categories that have a meaningful order or ranking. However, the difference between ranks may not be equal.",
    examples: "Performance: Poor, Average, Good, Excellent. Satisfaction: Low, Medium, High.",
    key: "Remember: Ordinal = Ordered categories."
  },

  numeric: {
    icon: "🔢",
    title: "NUMERIC DATA",
    description:
      "Numeric data represents information in the form of numbers. It can be counted or measured.",
    examples: "Age, height, temperature, number of students and marks.",
    key: "Numeric data is divided into Continuous and Discrete data."
  },

  continuous: {
    icon: "📏",
    title: "CONTINUOUS DATA",
    description:
      "Continuous data can take any value within a range. It is generally obtained through measurement and can include decimal values.",
    examples: "Height: 165.5 cm. Temperature: 36.7°C. Weight: 52.8 kg.",
    key: "Remember: Continuous = Measured values."
  },

  discrete: {
    icon: "🔢",
    title: "DISCRETE DATA",
    description:
      "Discrete data consists of separate, countable values. It is generally represented using whole numbers.",
    examples: "Number of students: 40. Number of books: 5. Number of cars: 3.",
    key: "Remember: Discrete = Countable values."
  }
};

const buttons = document.querySelectorAll("[data-id]");

const infoIcon = document.getElementById("infoIcon");
const infoTitle = document.getElementById("infoTitle");
const infoDescription = document.getElementById("infoDescription");
const infoExamples = document.getElementById("infoExamples");
const keyPoint = document.getElementById("keyPoint");

const textualChildren = document.getElementById("textualChildren");
const numericChildren = document.getElementById("numericChildren");

function showInfo(id) {
  const item = dataInfo[id];

  if (!item) return;

  infoIcon.textContent = item.icon;
  infoTitle.textContent = item.title;
  infoDescription.textContent = item.description;
  infoExamples.textContent = item.examples;
  keyPoint.textContent = item.key;

  document.querySelectorAll("[data-id]").forEach(button => {
    button.classList.toggle("active", button.dataset.id === id);
  });
}

function toggleBranch(branch) {
  const isTextual = branch === "textual";
  const selected = isTextual ? textualChildren : numericChildren;
  const other = isTextual ? numericChildren : textualChildren;

  // Open selected branch and close the other branch.
  const shouldOpen = !selected.classList.contains("show");

  selected.classList.toggle("show", shouldOpen);
  other.classList.remove("show");

  showInfo(branch);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;

    if (id === "data") {
      resetFlowchart();
      return;
    }

    if (id === "textual" || id === "numeric") {
      toggleBranch(id);
      return;
    }

    showInfo(id);
  });
});

function resetFlowchart() {
  textualChildren.classList.remove("show");
  numericChildren.classList.remove("show");

  document.querySelectorAll("[data-id]").forEach(button => {
    button.classList.remove("active");
  });

  showInfo("data");
}

document.getElementById("resetBtn").addEventListener(
  "click",
  resetFlowchart
);

// Initial screen
showInfo("data");
