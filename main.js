let token = "";
let accountId = "";
let timer;
let timeLeft = 600; // 10 minutes
let canReset = false;

async function createEmail() {
  const random = Math.random().toString(36).substring(2, 10);
  const domain = "developermail.com"; // Mail.tm domain
  const email = `${random}@${domain}`;
  const password = "pass" + random;

  // Create account
  await fetch("https://api.mail.tm/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password })
  });

  // Get token
  const res = await fetch("https://api.mail.tm/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password })
  });
  const data = await res.json();
  token = data.token;

  document.getElementById("email").value = email;

  startTimer();
  fetchMessages();
  setInterval(fetchMessages, 10000); // every 10s
}

function startTimer() {
  timeLeft = 600;
  canReset = false;
  document.getElementById("resetBtn").disabled = true;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    document.getElementById("time").innerText =
      `${min}:${sec < 10 ? "0" + sec : sec}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      canReset = true;
      document.getElementById("resetBtn").disabled = false;
    }
  }, 1000);
}

function resetEmail() {
  if (canReset) {
    createEmail();
  } else {
    alert("You can reset only after 10 minutes!");
  }
}

function copyEmail() {
  const emailField = document.getElementById("email");
  emailField.select();
  document.execCommand("copy");
  alert("Copied: " + emailField.value);
}

async function fetchMessages() {
  if (!token) return;

  const res = await fetch("https://api.mail.tm/messages", {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await res.json();

  const messages = document.getElementById("messages");
  messages.innerHTML = "";

  data["hydra:member"].forEach(msg => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${msg.from.address}</b> - ${msg.subject}`;
    li.onclick = () => openMessage(msg.id);
    messages.appendChild(li);
  });
}

async function openMessage(id) {
  const res = await fetch("https://api.mail.tm/messages/" + id, {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await res.json();
  alert("From: " + data.from.address + "\n\n" + data.intro);
}

createEmail();
