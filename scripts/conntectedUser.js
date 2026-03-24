$(document).ready(() => {
    if (localStorage.getItem("username") != undefined) {
        $("#connexionBtn").hide()
        $("#navbarDarkDropdownMenuLink").text(`Bonjour ${localStorage.getItem("username")}`)
        $("#navbarNavDarkDropdown")[0].style.setProperty("display", "block", "important")
    } else {
        $("#navbarNavDarkDropdown")[0].style.setProperty("display", "none", "important")
        $("#connexionBtn").show()
        let uri = window.location.pathname
        if (!uri.endsWith("index.html")) {
            base_url = uri.split("Gestion_cabinet")
            home_page = base_url[0] + "Gestion_cabinet/index.html"
            window.location.href = home_page
        }
    }
});

function deconnexion() {
    localStorage.removeItem("username")
    $("#navbarNavDarkDropdown")[0].style.setProperty("display", "none", "important")
    $("#connexionBtn").show()
    let uri = window.location.pathname
    if (!uri.endsWith("index.html")) {
        base_url = uri.split("Gestion_cabinet")
        home_page = base_url[0] + "Gestion_cabinet/index.html"
        window.location.href = home_page
    }
}