const button = document.getElementById("spinBtn");
const hobbyList = document.getElementById("hobbyList");
const categorySelect = document.getElementById("categorySelect");
const timeSelect = document.getElementById("timeSelect");
const budgetSelect = document.getElementById("budgetSelect");
let allHobbies = [];

function shuffleFisherYates(list) {
  const arr = [...list];            
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
  }
  return arr;
}

function pickThreeUnique(list) {
  const shuffled = shuffleFisherYates(list);
  return shuffled.slice(0, 3);
}


button.addEventListener("click", function () {
  const chosenCategory = categorySelect.value;
  const chosenTime = timeSelect.value;
  const chosenBudget = budgetSelect.value;
  console.log("Selected time:", chosenTime);
  const timeOptions = ["quick", "short", "medium", "long"];

  let pool = [];
  if (chosenCategory === "All") {
    pool = allHobbies;
  } else {
    pool = allHobbies.filter(hobby => {
      return hobby.categories.includes(chosenCategory.toLowerCase());
    });
  }

  if (chosenTime !== "any") {
    const maxTimeIndex = timeOptions.indexOf(chosenTime);

    pool = pool.filter((hobby) => {
      const hobbyTimeIndex = timeOptions.indexOf(hobby.time);

      return hobbyTimeIndex !== -1 && hobbyTimeIndex <= maxTimeIndex;
    });
  }

  if (chosenBudget !== "any") {
    const maxBudget = Number(chosenBudget);
    pool = pool.filter((hobby) => {
      return hobby.cost <= maxBudget;
    });
  }

  hobbyList.textContent = "";

  if (pool.length === 0) {
        hobbyList.innerHTML = "<li>No hobbies found.</li>";
    return;
}

  const picks = pickThreeUnique(pool);

  picks.forEach((hobby) => {
    const li = document.createElement("li");
    li.classList.add("hobby-card");

    const title = document.createElement("h3");
    title.textContent = hobby.name;

    const description = document.createElement("p");
    description.textContent = hobby.activity;

    const details = document.createElement("p");

    const timeLabels = {
      quick: "Under 5 minutes",
      short: "5–30 minutes",
      medium: "30–60 minutes",
      long: "Over an hour"
};

const displayTime = timeLabels[hobby.time];
const displayCost = hobby.cost === 0 ? "Free" : `$${hobby.cost}`;

details.textContent = `⏰ ${displayTime} | 💰 ${displayCost}`;

const supplies = document.createElement("p");
supplies.classList.add("hobby-supplies");
supplies.textContent = `What you'll need: ${hobby.supplies.join(", ")}`;




    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(details);
    li.appendChild(supplies);
    hobbyList.appendChild(li);
  });


});

async function loadHobbies() {
  try {
    const response = await fetch("./hobbies.json");
    if (!response.ok) {
      throw new Error("Could not load hobbies");
    }

    const hobbies = await response.json();
    allHobbies = hobbies;

    console.log("Loaded hobbies:", hobbies);

    return hobbies;
  } catch (error) {
    console.error("Error loading hobbies:", error);
    return [];
  }
}

loadHobbies();