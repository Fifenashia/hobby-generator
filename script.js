const button = document.getElementById("spinBtn");
const hobbyList = document.getElementById("hobbyList");
const categorySelect = document.getElementById("categorySelect");
const timeSelect = document.getElementById("timeSelect");
let allHobbies = [];

const hobbiesByCategory = {
  Creative: [
    "Try watercolor painting",
    "Sketch something for 10 minutes",
    "Start a junk journal (stickers + scraps + chaos)",
    "Learn hand lettering",
    "Make a collage from magazines",
    "Try digital drawing (free app)",
    "Write a short poem (bad on purpose)",
    "Origami: learn 3 basic folds",
    "Make a playlist with a theme (rainy day, villain arc, etc.)",
    "Take 10 photos of one color around your house",
    "Do a simple DIY craft (bracelet, beads, keychain)",
    "Learn basic photo editing on your phone",
    "Paint your nails with a new style",
    "Make a vision board (digital or paper)",
    "Try simple calligraphy drills"
  ],

  Outdoors: [
    "Go birdwatching",
    "Start a small herb garden",
    "Take a walk with a scavenger hunt list",
    "Try geocaching",
    "Visit a local park you’ve never been to",
    "Take a “tree ID” walk (learn 3 trees)",
    "Try stargazing (learn 3 constellations)",
    "Go on a photo walk outside",
    "Do a beginner hike",
    "Try biking a short route",
    "Pick up litter for 15 minutes (chaotic good hobby)",
    "Start a small container garden (tomatoes, basil, peppers)",
    "Try nature journaling outdoors",
    "Look for cool rocks (aka adult treasure hunting)",
    "Practice outdoor stretching"
  ],

  Brainy: [
    "Learn a new language",
    "Do a daily coding challenge",
    "Learn chess basics",
    "Try a logic puzzle",
    "Learn basic sign language (ASL)",
    "Do a Sudoku or crossword",
    "Watch a documentary and take notes",
    "Learn a new keyboard shortcut per day",
    "Try Duolingo for 10 minutes",
    "Learn basic astronomy facts",
    "Read one Wikipedia rabbit hole on purpose",
    "Try a memory game exercise",
    "Learn a new recipe and the science behind it",
    "Study a topic you missed in school (for revenge)",
    "Try a beginner math puzzle"
  ],

  Cozy: [
    "Bake bread",
    "Make tea and read 20 pages",
    "Journal for 10 minutes",
    "Do a 10-minute stretch routine",
    "Try a simple knitting or crochet starter",
    "Make a ‘cozy night’ playlist",
    "Try a guided meditation",
    "Do a puzzle (jigsaw or app)",
    "Start a comfort show rewatch ritual",
    "Make cookies or brownies",
    "Learn one new soup recipe",
    "Try hand cream + manicure night",
    "Write letters/postcards to friends",
    "Do a calm cleaning sprint (10 minutes)",
    "Make a hot drink “flight” (tea / cocoa / chai)"
  ],

  Social: [
    "Join a book club (online counts)",
    "Host a game night",
    "Try a beginner group class (yoga, dance, etc.)",
    "Start a ‘walk and talk’ weekly meetup",
    "Try a local library event",
    "Volunteer once (one-time events count)",
    "Join a community Facebook group for events",
    "Try a trivia night",
    "Start a small crafting circle with a friend",
    "Do a ‘swap’ night (books, plants, clothes)",
    "Take a friend on a coffee date",
    "Join a Discord for an interest you like",
    "Try a community garden meetup",
    "Attend a free workshop locally",
    "Try a cooking night with friends"
  ]
};
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
  console.log("Selected time:", chosenTime);
  const timeOptions = ["quick", "short", "medium", "long"];

  let pool = [];
  if (chosenCategory === "All") {
    pool = allHobbies;
  } else {
    pool = allHobbies.filter(hobby => {
      return hobby.type === chosenCategory.toLowerCase();
    });
  }

  if (chosenTime !== "any") {
    const maxTimeIndex = timeOptions.indexOf(chosenTime);

    pool = pool.filter((hobby) => {
      const hobbyTimeIndex = timeOptions.indexOf(hobby.time);

      return hobbyTimeIndex !== -1 && hobbyTimeIndex <= maxTimeIndex;
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
    li.textContent = hobby.name;
    hobbyList.appendChild(li);
  });


console.log("Filtered pool:", pool);
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