// elements
const form = document.querySelector(".auth-form");
const title = document.getElementById("form-title");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const link = document.getElementById("auth-form-link");
const message = document.getElementById("auth-message");
const button = document.querySelector("button");

let isLogin = true;

link.addEventListener("click", handleAuthToggle);
form.addEventListener("submit", handleAuthSubmit);

function handleAuthToggle(e) {
    e.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
        switchToLogin()
    } else {
        title.textContent = "Sign Up";
        username.style.display = "block";
        username.setAttribute("required", true);
        confirmPassword.style.display = "block";
        confirmPassword.setAttribute("required", true);
        button.textContent = "Register";
        message.firstChild.textContent = "Already have an account? ";
        link.textContent = "Sign In";
    }
}

function handleAuthSubmit(e) {
    e.preventDefault();
    if (isLogin) {
        signIn();
    } else {
        signUp();
    }
}
function switchToLogin() {
    isLogin = true
    title.textContent = "Sign In";
    username.style.display = "none";
    username.removeAttribute("required");
    confirmPassword.style.display = "none";
    confirmPassword.removeAttribute("required");
    button.textContent = "Login";
    message.firstChild.textContent = "Don't have an account? ";
    link.textContent = "Sign Up";
}
function signIn() {
    const emailValue = email.value;
    const passwordValue = password.value;

    let allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = allUsers.find((u) => u.email === emailValue && u.password === passwordValue);

    if (!existingUser) {
        alert("Invalid email or password.");
        return
    }
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    alert("Login successful!");
    window.location.href = "../index.html";

}

function signUp() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (!usernameValue) {
        alert("Username is required.");
        return;
    }

    if (passwordValue !== confirmPasswordValue) {
        alert("Passwords do not match.");
        return;
    }

    const newUser = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue
    };

    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = allUsers.find((u) => u.email === emailValue);
    if (existingUser) {
        alert("user already exist")
        return
    }
    allUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(allUsers));
    alert("Sign up successful! Please log in.");

    
    switchToLogin();
    form.reset()
}