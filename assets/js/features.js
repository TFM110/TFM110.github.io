/**
 * Auto Location and Display time
 */
function display_datetime() {
  var x = new Date();
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayDisplay = week[x.getDay()];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthDisplay = month[x.getMonth()];
  let day = x.getDate();
  let year = x.getFullYear();
  let time = x.toLocaleTimeString();
  var zone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
  datetimeDisplay = dayDisplay + ", " + monthDisplay + " " + day + ", " + year + "<br>" + time + " " + zone;
  document.getElementById("datetime").innerHTML = datetimeDisplay;
  display_dt();
}
  
function display_dt() {
  var refresh = 1000; // Refresh rate in milliseconds
  mytime = setTimeout(display_datetime, refresh);
}
  
display_dt();
  
function hideElementsBasedOnDate() {
  currentMonth = new Date().getMonth();
  currentDay = new Date().getDate();

  var home = document.getElementsByClassName("home");
  var school = document.getElementsByClassName("school");
  if (currentMonth > 3 && currentMonth < 8) {
    for (var i = 0; i < school.length; i++) {
      school[i].style.display = "none";
    }
  } else {
    for (var i = 0; i < home.length; i++) {
      home[i].style.display = "none";
    }
  }

  var dob = new Date("2/28/2003");
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
  if (currentMonth === 1 && currentDay === 28) {
    document.getElementById("dob").innerHTML = "Happy Birthday Tauseef! " + "<br>" + "You are now " + age + " years old!";
  } else {
    document.getElementById("dob").innerHTML = age;
  }
}
  
hideElementsBasedOnDate();
  
/**
 * Contact Form
 */
const url = 'https://script.google.com/macros/s/AKfycbyAQDr_PwlWDI_6sGqiTNkdc0T4BX8AWeLmCOtf3Iv-f9WlYh4m2XodInEuF42yutvcBQ/exec';
const contactForm = document.getElementById('contact-form');
const loadingMessage = document.querySelector('.loading');
const errorMessage = document.querySelector('.error-message');
const sentMessage = document.querySelector('.sent-message');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const recaptchaResponse = document.getElementById('g-recaptcha-response').value;

  if (!recaptchaResponse) {
    errorMessage.style.display = 'block';
    loadingMessage.style.display = 'none'; // Hide loading message
    sentMessage.style.display = 'none'; // Hide success message
    return;
  }

  loadingMessage.style.display = 'block'; // Show loading message

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  data.gCaptchaResponse = recaptchaResponse;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log('Successful', data);
    contactForm.reset();
    loadingMessage.style.display = 'none'; // Hide loading message
    sentMessage.style.display = 'block'; // Show success message
    errorMessage.style.display = 'none'; // Hide error message
    setTimeout(function () {
      sentMessage.style.display = 'none'; // Hide success message after a few seconds
    }, 5000);
  })
  .catch((err) => {
    console.log('err', err);
    loadingMessage.style.display = 'none'; // Hide loading message
    errorMessage.style.display = 'block'; // Show error message
    sentMessage.style.display = 'none'; // Hide success message
  });
});

async function fetchLastUpdated() {
  const apiUrl = "https://api.github.com/repos/TFM110/TFM110.github.io/commits";
  try {
    const response = await fetch(apiUrl);
    const commits = await response.json();
    if (commits && commits.length > 0) {
      // Get the latest commit date
      const lastCommitDate = new Date(commits[0].commit.committer.date);
      document.getElementById("updated-date").textContent = lastCommitDate.toLocaleString();
    } else {
      document.getElementById("updated-date").textContent = "No commits found.";
    }
  } catch (error) {
    console.error("Error fetching last updated date:", error);
    document.getElementById("updated-date").textContent = "Error fetching data.";
  }
}

// Call the function on page load
fetchLastUpdated();