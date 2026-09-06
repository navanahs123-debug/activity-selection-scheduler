let activities = [];
let selectedActivities = [];

// 🎲 GENERATE RANDOM ACTIVITIES
function generateRound() {

    document.getElementById("output").innerHTML = "";

    let names = [
        "Sleep",
        "Wake Up",
        "Exercise",
        "Study",
        "Coding",
        "Movie",
        "Travel",
        "Music",
        "Gaming",
        "Workout"
    ];

    // add new activities
    for (let i = 0; i < 8; i++) {

        let start = Math.floor(Math.random() * 10);

        let end = start + Math.floor(Math.random() * 4 + 1);

        activities.push({

            id: activities.length,

            name: names[Math.floor(Math.random() * names.length)],

            start: start,

            end: end,

            selected: false
        });
    }

    // sort by start time
    activities.sort((a, b) => a.start - b.start);

    showCards();
}

// 📋 SHOW CARDS
function showCards() {

    let div = document.getElementById("cards");

    div.innerHTML = "";

    activities.forEach((a, i) => {

        div.innerHTML += `
            <div 
                class="card ${a.selected ? "selected" : ""}" 
                onclick="selectActivity(${i})">

                <h3>${a.name}</h3>

                <p>⏰ ${a.start} - ${a.end}</p>

            </div>
        `;
    });
}

// ✅ SELECT ACTIVITY
function selectActivity(i) {

    // avoid duplicate selection
    if (activities[i].selected) return;

    activities[i].selected = true;

    selectedActivities.push(activities[i]);

    showCards();
}

// ➕ ADD CUSTOM ACTIVITY
function addActivity() {

    let name = document.getElementById("name").value;

    let start = parseInt(document.getElementById("start").value);

    let end = parseInt(document.getElementById("end").value);

    // validation
    if (!name || isNaN(start) || isNaN(end)) {

        alert("⚠ Fill all fields!");

        return;
    }

    if (start >= end) {

        alert("⚠ End time must be greater than start time!");

        return;
    }

    // add activity
    activities.push({

        id: activities.length,

        name: name,

        start: start,

        end: end,

        selected: false
    });

    // sort automatically
    activities.sort((a, b) => a.start - b.start);

    showCards();

    // clear inputs
    document.getElementById("name").value = "";

    document.getElementById("start").value = "";

    document.getElementById("end").value = "";
}

// 🏆 GREEDY ALGORITHM
function solveSchedule() {

    if (selectedActivities.length === 0) {

        alert("⚠ Please select activities first!");

        return;
    }

    // sort selected activities by end time
    let sorted = [...selectedActivities].sort((a, b) => a.end - b.end);

    let best = [];

    let lastEnd = 0;

    for (let a of sorted) {

        if (a.start >= lastEnd) {

            best.push(a);

            lastEnd = a.end;
        }
    }

    // show result
    let output = document.getElementById("output");

    output.innerHTML = "";

    best.forEach(a => {

        output.innerHTML += `
            <p>
                ✔ ${a.name} (${a.start} - ${a.end})
            </p>
        `;
    });

    // no valid schedule
    if (best.length === 0) {

        output.innerHTML = "<p>❌ No valid schedule found.</p>";

    } else {

        // 🎉 redirect to ending page after 3 sec
        setTimeout(() => {

            window.location.href = "ending.html";

        }, 3000);
    }
}

// 🏠 GO TO DASHBOARD
function goDashboard() {

    window.location.href = "dashboard.html";
}