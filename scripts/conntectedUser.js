$(document).ready(() => {
    // Si le user est déjà connecté
    // rendre le bouton connexionBtn invisibile
    if (localStorage.getItem("username") != undefined) {
        $("#connexionBtn").hide()
        $("#navbarDarkDropdownMenuLink").text(`Bonjour ${localStorage.getItem("username")}`)
        $("#navbarNavDarkDropdown").show()
    } else {
        $("#navbarNavDarkDropdown").hide()
        $("#navbarDarkDropdownMenuLink").text()
        $("#connexionBtn").show()

    }
});