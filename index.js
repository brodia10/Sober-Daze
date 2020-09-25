const Store = require("./store");

// First instantiate the class
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "persistent-data",
  defaults: {}
});

//set start date and convert to ms

let storedStartTime = store.get("startTime");
let startDate;

if (storedStartTime) {
  startDate = new Date(storedStartTime);
} else {
  startDate = new Date();
  store.set("startTime", startDate.toISOString());
}

function reset() {
  startDate = new Date(storedStartTime);
  store.set("startTime", startDate.toISOString());
}

const startDateMs = startDate.getTime();

//get current date and convert to ms
const currentDate = new Date();
const currentDateMs = currentDate.getTime();

//set time measurements in ms
const seconds = 1000 * 1;
const minutes = 1000 * 60;
const hours = minutes * 60;
const days = hours * 24;
const years = days * 365;

//time difference between current and start date
const diff = currentDateMs - startDateMs;

// Initial Values
let soberValues = {
  seconds: Math.round(diff / seconds),
  minutes: Math.round(diff / minutes),
  hours: Math.round(diff / hours),
  days: Math.round(diff / days),
  years: Math.round(diff / years)
};

//display onload
function initializeView() {
  window.addEventListener("load", event => {
    for (const [docId, initialTimerValue] of Object.entries(soberValues)) {
      document.getElementById(
        docId
      ).innerHTML += initialTimerValue.toLocaleString();
    }
  });
}

// timer update method
function updateTimer(timerElementId, displayName) {
  timerValue = soberValues[timerElementId]++;
  document.getElementById(
    timerElementId
  ).innerHTML = `<span class="text">${displayName}</span>${timerValue.toLocaleString()}`;
}

//set electron notification options
const hourNotification = {
  title: "You're killing it!",
  body: "Another hour of treating your body like a temple in the books!"
};

const dayNotification = {
  title: "Bet! It's another 24 hours!",
  body: "You live to fight another day!"
};

//send electron notification
function sendHourlyNotification() {
  new window.Notification(hourNotification.title, hourNotification);
}

function sendDailyNotification() {
  new window.Notification(dayNotification.title, dayNotification);
}

//Toggle start date form
function toggleStartDateForm() {
  console.log("Working");
  const startDateInputForm = document.getElementById("startDateInputForm");
  if (startDateInputForm.style.display === "none") {
    startDateInputForm.style.display === "block";
  } else {
    startDateInputForm.style.display === "none";
  }
}


// Start the updates
initializeView();

setInterval(updateTimer, seconds, "seconds", "SECONDS");
setInterval(updateTimer, minutes, "minutes", "MINUTES");
setInterval(updateTimer, hours, "hours", "HOURS");
setInterval(updateTimer, days, "days", "DAYS");
setInterval(updateTimer, years, "years", "YEARS");

setInterval(sendHourlyNotification, hours);
setInterval(sendDailyNotification, days);

/*
function timer(timeInterval, idName) {
  timeInterval++;
  document.getElementById(idName).innerHTML = timeInterval.toLocaleString();
}

setInterval(timer(secondsSober, "seconds"), seconds);
*/