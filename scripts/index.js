

$(document).ready(() => {
    $("#registerBtn").click((event) => {
        let errors = 0
        // reset validation messages
        $(".feedbak").text('')
        $(".formItem").removeClass('is-invalid');
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
            email.addClass('is-invalid');
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
                    password: passwordHache
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


})

