// Secure Login Dashboard — FRONTEND-ONLY DEMO.
// The "login" compares input against hard-coded demo credentials in the
// browser. There is no server, no database, and no real authentication.
// This is NOT production security and must never be used as such.
//
// "Remember me" only stores a demo flag in this browser's localStorage so
// the demo dashboard stays open across reloads. Logout clears that flag.
// The login / failed-attempt counters are demo counters stored locally;
// they are not real security data.
(function () {
  "use strict";

  var DEMO_USERNAME = "demo";
  var DEMO_PASSWORD = "demo123";
  var SESSION_KEY = "waj-demo-session";
  var LOGINS_KEY = "waj-demo-logins";
  var FAILED_KEY = "waj-demo-failed";

  var loginView = document.getElementById("loginView");
  var dashboardView = document.getElementById("dashboardView");
  var loginForm = document.getElementById("loginForm");
  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");
  var rememberMeInput = document.getElementById("rememberMe");
  var errorMessage = document.getElementById("errorMessage");
  var logoutButton = document.getElementById("logoutButton");
  var statLogins = document.getElementById("statLogins");
  var statFailed = document.getElementById("statFailed");

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function readCount(key) {
    try {
      var value = parseInt(localStorage.getItem(key), 10);
      return isNaN(value) ? 0 : value;
    } catch (e) {
      return 0;
    }
  }

  function writeCount(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch (e) {
      // Storage unavailable (e.g. private mode) — counters just won't persist.
    }
  }

  function updateStats() {
    statLogins.textContent = readCount(LOGINS_KEY);
    statFailed.textContent = readCount(FAILED_KEY);
  }

  function showDashboard() {
    loginView.hidden = true;
    dashboardView.hidden = false;
    updateStats();
  }

  function showLogin() {
    dashboardView.hidden = true;
    loginView.hidden = false;
    loginForm.reset();
    errorMessage.hidden = true;
    usernameInput.focus();
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var username = usernameInput.value.trim();
    var password = passwordInput.value;
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      errorMessage.hidden = true;
      writeCount(LOGINS_KEY, readCount(LOGINS_KEY) + 1);
      try {
        if (rememberMeInput.checked) {
          localStorage.setItem(SESSION_KEY, "1");
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch (e) {
        // Storage unavailable — the demo session just won't survive a reload.
      }
      showDashboard();
    } else {
      writeCount(FAILED_KEY, readCount(FAILED_KEY) + 1);
      errorMessage.hidden = false;
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  logoutButton.addEventListener("click", function () {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      // Nothing to clear.
    }
    showLogin();
  });

  // Restore the demo session across reloads only when "Remember me" was ticked.
  var remembered = false;
  try {
    remembered = localStorage.getItem(SESSION_KEY) === "1";
  } catch (e) {
    remembered = false;
  }
  if (remembered) {
    showDashboard();
  } else {
    updateStats();
  }
})();
