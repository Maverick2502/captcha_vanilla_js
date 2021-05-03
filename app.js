const loginForm = document.querySelector("#login-form");
const passwordField = document.querySelector("#password-field");
const usernameField = document.querySelector("#username-field");
const loginButton = document.querySelector("#login-form-submit");
const msg = document.querySelector(".msgResponse");
const image = document.createElement("img");
const logOut = document.querySelector(".hidden");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const Login = loginForm.username.value;
  const Password = loginForm.password.value;
  const Captcha = loginForm.captcha;

  msg.innerHTML = "";

  const res = await fetch("http://192.168.43.54:4747/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Login, Password, CaptchaStr: Captcha.value }),
  });

  // Captcha
  if (res.headers.get("Content-Type") === "image/png") {
    const blob = await res.blob();
    const imageURL = window.URL.createObjectURL(blob);
    image.src = imageURL;
    document.querySelector(".captchaBlock").append(image);
    Captcha.style.display = "block";

    return;
  }

  if (res.ok) {
    let ans = await res.json();

    //Successful Login Message
    if (ans.Message) {
      loginForm.style.display = "none";
      logOut.classList.remove("hidden");
      document.querySelector("#login-header").innerHTML = ans.Message;
      return;
    }

    // Failed Password or Login
    if (ans.ErrorPwd) {
      msg.innerHTML = ans.ErrorPwd;
      return;
    }

    // Failed Captcha
    if (ans.ErrorCaptcha) {
      msg.innerHTML += ans.ErrorCaptcha;
      return;
    }
  }
});

async function isLoggedIn() {
  const token = store.get("token");
  if (!token) return false;
}
async function isLoggedIn() {
  // Saves token into localStorage again
  const { token } = response.body;
  localStorage.setItem("token", "tokenValue");

  return true;
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
