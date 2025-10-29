const registerForm = document.getElementById("registerForm");
if(registerForm){
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("regUsername").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();


        if(!username || !email || !password){
            alert("Bitte alle Felder ausfüllen !");
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if(users.find(u => u.username === username)){
            alert("Benutzer bereits vergeben !");
            return;
        } else if(users.find(u => u.email === email)){
            alert("Email bereits vergeben !");
            return;
        };

        users.push({username, email, password});
        localStorage.setItem("users", JSON.stringify(users));


        alert("Erfolgreich registriert !");
        window.location.href = "login.html";
    });
};          



const loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();                                             

        const username = document.getElementById("logUsername").value.trim();
        const password = document.getElementById("logPassword").value.trim();
        
        if(!username || !password){
            alert("Bitte alle Felder ausfüllen ! ");
            return;
        };


        const users = JSON.parse(localStorage.getItem("users")) || [];

        const validUsers = users.find(u => u.username === username && u.password === password);


        if(validUsers){
            localStorage.setItem("loggedUser", validUsers.username);
            window.location.href = "welcome.html";
        } else{
            alert("Falsche Zugangsdaten !");
        };
    });
};