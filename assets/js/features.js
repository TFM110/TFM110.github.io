/**
* Live Date and Time
*/
function displayDateTime() {
  const now = new Date();
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const datetime = document.getElementById("datetime");

  if (!datetime) return;

  const dayDisplay = week[now.getDay()];
  const monthDisplay = month[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const time = now.toLocaleTimeString();
  const zone = now.toLocaleTimeString("en-US", { timeZoneName: "short" }).split(" ").pop();

  datetime.innerHTML = `${dayDisplay}, ${monthDisplay} ${day}, ${year}<br>${time} ${zone}`;
}

displayDateTime();
setInterval(displayDateTime, 1000);

/**
* Age and Birthday
*/
function displayAge() {
  const dobElement = document.getElementById("dob");
  if (!dobElement) return;

  const today = new Date();
  const birthDate = new Date(2003, 1, 28);
  let age = today.getFullYear() - birthDate.getFullYear();

  const birthdayPassed =
  today.getMonth() > birthDate.getMonth() ||
  (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!birthdayPassed) age--;

  if (today.getMonth() === 1 && today.getDate() === 28) {
    dobElement.innerHTML = `Happy Birthday Tauseef!<br>You are now ${age} years old!`;
    } else {
      dobElement.textContent = age;
    }
}

displayAge();

/**
* Contact Form
*/
const url = "https://script.google.com/macros/s/AKfycbyAQDr_PwlWDI_6sGqiTNkdc0T4BX8AWeLmCOtf3Iv-f9WlYh4m2XodInEuF42yutvcBQ/exec";
const contactForm = document.getElementById("contact-form");
const loadingMessage = document.querySelector(".loading");
const errorMessage = document.querySelector(".error-message");
const sentMessage = document.querySelector(".sent-message");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const recaptcha = document.getElementById("g-recaptcha-response");
    const recaptchaResponse = recaptcha ? recaptcha.value : "";

    if (!recaptchaResponse) {
      if (errorMessage) errorMessage.style.display = "block";
      if (loadingMessage) loadingMessage.style.display = "none";
      if (sentMessage) sentMessage.style.display = "none";
      return;
    }

    if (loadingMessage) loadingMessage.style.display = "block";
    if (errorMessage) errorMessage.style.display = "none";
    if (sentMessage) sentMessage.style.display = "none";

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    data.gCaptchaResponse = recaptchaResponse;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error(`Form request failed with status ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("Successful", data);
      contactForm.reset();

      if (typeof grecaptcha !== "undefined") grecaptcha.reset();

      if (loadingMessage) loadingMessage.style.display = "none";
      if (errorMessage) errorMessage.style.display = "none";
      if (sentMessage) sentMessage.style.display = "block";

      setTimeout(() => {
        if (sentMessage) sentMessage.style.display = "none";
      }, 5000);
    })
    .catch(error => {
      console.error("Contact form error:", error);

      if (loadingMessage) loadingMessage.style.display = "none";
      if (errorMessage) errorMessage.style.display = "block";
      if (sentMessage) sentMessage.style.display = "none";
    });
  });
}

/**
* Last Updated
*/
async function fetchLastUpdated() {
  const updatedDate = document.getElementById("updated-date");
  if (!updatedDate) return;

  const apiUrl = "https://api.github.com/repos/TFM110/TFM110.github.io/commits?per_page=1";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

    const commits = await response.json();

    if (commits.length > 0) {
      const lastCommitDate = new Date(commits[0].commit.committer.date);

      updatedDate.textContent = lastCommitDate.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } else {
      updatedDate.textContent = "No commits found.";
    }
  } catch (error) {
    console.error("Error fetching last updated date:", error);
    updatedDate.textContent = "Unable to retrieve update date.";
  }
}

fetchLastUpdated();