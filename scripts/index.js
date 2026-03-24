

$(document).ready(() => {

    $("#registerBtn").click((event) => {
        let errors = 0
        // reset validation messages
        $(".feedbak").text('')
        $(".formItem").removeClass('is-invalid');
        console.log("Après removeClass:", $(".formItem.is-invalid").length); // doit afficher 0
        // Validation Nom
        let nom = $("#r-nom")
        let regexNom = /^[a-zA-Z\s]+$/;
        if (nom.val() === '') {
            $("#invalid-nom-feedbak").text('Veuillez entrer un nom');
            nom.addClass('is-invalid');
            errors++
        }
        // regex to validate nom (only letters and spaces)
        else if (!regexNom.test(nom.val())) {
            $("#invalid-nom-feedbak").text('Le nom ne doit contenir que des lettres et des espaces');
            nom.addClass('is-invalid');
            errors++
        }

        // Validation grade
        let grade = $("#r-grade")
        if (grade.val() === '') {
            $("#invalid-grade-feedbak").text('Veuillez entrer un grade');
            grade.addClass('is-invalid');
            errors++
        }

        //validation email
        let email = $("#r-email")
        let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.val() === '') {
            $("#invalid-email-feedbak").text('Veuillez entrer une adresse email');
            email.addClass('is-invalid');
            errors++
        } else if (!regexEmail.test(email.val())) {
            $("#invalid-email-feedbak").text('Veuillez entrer une adresse email valide');
            email.addClass('is-invalid');
            errors++
        } else if (emailExist(email.val())) {
            $("#invalid-email-feedbak").text('Cette adresse email est déjà utilisée');
            email.addClass('is-invalid');
            errors++
        }

        // validation password
        let password = $("#r-password")
        let passwordConfirm = $("#r-password-confirm")
        if (password.val() === '') {
            $("#invalid-password-feedbak").text('Veuillez entrer un mot de passe');
            password.addClass('is-invalid');
            errors++
        }
        if (passwordConfirm.val() === '') {
            $("#invalid-password-confirm-feedbak").text('Veuillez confirmer votre mot de passe');
            passwordConfirm.addClass('is-invalid');
            errors++
        }
        if (password.val() !== passwordConfirm.val()) {
            $("#invalid-password-confirm-feedbak").text('Les mots de passe ne correspondent pas');
            passwordConfirm.addClass('is-invalid');
            errors++
        }
        if (errors === 0) {
            hashPassword(password.val()).then(passwordHache => {
                let user = {
                    name: nom.val(),
                    grade: grade.val(),
                    email: email.val(),
                    password: passwordHache,
                    is_admin: false
                };
                registerUser(user)
                console.log("Utilisateur créé avec succès :", user);
            });

        }

        event.preventDefault();
    })

    var registerUser = (user) => {
        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'POST',
            data: JSON.stringify(user),
            success: (data) => {
                alert('User registered successfully');
                switchTab("login")
            },
            error: (err) => {
                console.error('Error registering user:', err);
            }
        })
    }


    var loginUser = (user) => {
        $.ajax({
            url: 'http://localhost:3000/users?email=' + user.email + '&password=' + user.password,
            method: 'GET',
            success: (data) => {
                if (data.length > 0) {
                    let user = data[0];
                    console.log("Utilisateur connecté avec succès :", user);
                    localStorage.setItem("username", user.name);
                    localStorage.setItem("userId", user.id);
                    localStorage.setItem("is_admin", user.is_admin);

                    let uri = window.location.pathname

                    base_url = uri.split("Gestion_cabinet")
                    home_page = base_url[0] + "Gestion_cabinet/pages/dashbord.html"
                    window.location.href = home_page

                }
            },
            error: (err) => {
                console.error('Error registering user:', err);
            }
        })
    }


    async function hashPassword(string) {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    var emailExist = (email) => {
        let resultat;

        $.ajax({
            url: 'http://localhost:3000/users?email=' + email,
            method: 'GET',
            async: false,
            success: (data) => {
                resultat = data.length > 0;
            }
        });

        return resultat;
    }

    $("#loginBtn").click((event) => {
        event.preventDefault();
        let email = $("#l-email")
        let password = $("#l-password")
        let errors = 0
        // reset validation messages
        $(".feedbak").text('')
        $(".formItem").removeClass('is-invalid');

        if (email.val() === '' || password.val() === '') {
            //validation email
            let email = $("#l-email")
            let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.val() === '') {
                $("#invalid-login-email-feedbak").text('Veuillez entrer une adresse email');
                email.addClass('is-invalid');
                errors++
            } else if (!regexEmail.test(email.val())) {
                $("#invalid-login-email-feedbak").text('Veuillez entrer une adresse email valide');
                email.addClass('is-invalid');
                errors++
            }
            // validation password
            let password = $("#l-password")
            if (password.val() === '') {
                $("#invalid-login-password-feedbak").text('Veuillez entrer un mot de passe');
                password.addClass('is-invalid');
                errors++
            }
        } else {
            if ($("#remember").get(0).checked) {
                localStorage.setItem("email", $("#l-email").val());
                localStorage.setItem("password", $("#l-password").val());
            }
        }

        if (errors === 0) {
            hashPassword(password.val()).then(passwordHache => {
                let user = {
                    email: email.val(),
                    password: passwordHache
                };
                loginUser(user)
            });
        }


    })

    getIdentifiant = () => {
        if (localStorage.getItem("email") != undefined && localStorage.getItem("password") != undefined) {
            $("#l-email").val(localStorage.getItem("email"));
            $("#l-password").val(localStorage.getItem("password"));
        }
    }

    resetForms = () => {
        document.getElementById("registerForm").reset();
        document.getElementById("loginForm").reset();
        $(".feedbak").text('');
        $(".formItem").removeClass('is-invalid');
    }
})