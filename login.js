var CORRECT_USER = "vitStudent";
var CORRECT_PASS = "vit@2025";
var MAX_ATTEMPTS = 3;
var attemptsLeft = MAX_ATTEMPTS;

function clearErr(id) {
  var el = document.getElementById(id);
  if (el) el.textContent = "";
}

function showAlert(msg, type) {
  var box = document.getElementById("alertBox");
  box.textContent = msg;
  box.className = "alert-box " + type;
}

function updateDots() {
  var row = document.getElementById("attemptsRow");
  var used = MAX_ATTEMPTS - attemptsLeft;
  var html = '<span style="margin-right:6px;color:#777;font-size:0.82rem;">Attempts:</span>';
  for (var i = 0; i < MAX_ATTEMPTS; i++) {
    html += '<span class="dot' + (i < used ? " used" : "") + '"></span>';
  }
  row.innerHTML = html;
}

function attemptLogin() {
  var btn = document.getElementById("loginBtn");
  if (btn.disabled) return;

  clearErr("usernameErr");
  clearErr("passwordErr");

  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;

  var valid = true;

  if (username === "") {
    document.getElementById("usernameErr").textContent = "Username is required.";
    document.getElementById("username").focus();
    valid = false;
  }

  if (valid && password === "") {
    document.getElementById("passwordErr").textContent = "Password is required.";
    document.getElementById("password").focus();
    valid = false;
  }

  if (!valid) return;

  if (username === CORRECT_USER && password === CORRECT_PASS) {
    showAlert("Login successful! Redirecting…", "error");
    btn.disabled = true;
    setTimeout(function () {
      window.location.href = "about.html";
    }, 1000);
    return;
  }

  attemptsLeft--;
  updateDots();

  if (attemptsLeft <= 0) {
    btn.disabled = true;
    showAlert("Too many failed attempts. Your account has been temporarily locked. Please contact support.", "locked");
    document.getElementById("username").disabled = true;
    document.getElementById("password").disabled = true;
  } else {
    showAlert("Incorrect username or password. " + attemptsLeft + " attempt(s) remaining.", "error");
    document.getElementById("alertBox").classList.remove("hidden");
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
  }
}

function togglePassword() {
  var input = document.getElementById("password");
  var icon  = document.getElementById("eyeIcon");
  if (input.type === "password") {
    input.type = "text";
    icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    input.type = "password";
    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

window.onload = function () {
  updateDots();
};

function fillCredentials() {
  document.getElementById("username").value = CORRECT_USER;
  document.getElementById("password").value = CORRECT_PASS;
  document.getElementById("username").focus();
}