/* ==========================================
   DATA INITIALIZATION
   ========================================== */
let categories = [
    { id: 1, nom: "Roman" },
    { id: 2, nom: "Science Fiction" }
];
let counterCategories = 3;

let auteurs = [
    { id: 1, nom: "Victor Hugo", email: "victor@email.com" },
    { id: 2, nom: "J.K. Rowling", email: "jk@email.com" }
];
let counterAuteurs = 3;

let adherents = [
    { id: 1, nom: "Ahmed", email: "ahmed@gmail.com", telephone: "0600000000" },
    { id: 2, nom: "Sara", email: "sara@gmail.com", telephone: "0700000000" }
];
let counterAdherents = 3;

let livres = [
    { id: 1, titre: "Les Misérables", auteurId: 1, categorieId: 1, etat: "emprunte" },
    { id: 2, titre: "Harry Potter", auteurId: 2, categorieId: 2, etat: "disponible" }
];
let counterLivres = 3;

let emprunts = [
    { id: 1, livreId: 1, adherentId: 1, date: "2023-10-01" }
];
let counterEmprunts = 2;


/* ==========================================
   HELPER: POPULATE SELECTS
   ========================================== */
function populateSelects() {
    let autSelect = document.getElementById("livreAuteurId");
    let catSelect = document.getElementById("livreCategorieId");
    let livSelect = document.getElementById("empruntLivreId");
    let adhSelect = document.getElementById("empruntAdherentId");



    autSelect.innerHTML = "<option value=''>-- Selectionner Auteur --</option>";
    catSelect.innerHTML = "<option value=''>-- Selectionner Catégorie --</option>";
    livSelect.innerHTML = "<option value=''>-- Selectionner Livre --</option>";
    adhSelect.innerHTML = "<option value=''>-- Selectionner Adhérent --</option>";

    auteurs.forEach(a => {
        autSelect.innerHTML += `<option value="${a.id}">${a.nom}</option>`;
    });

    categories.forEach(c => {
        catSelect.innerHTML += `<option value="${c.id}">${c.nom}</option>`;
    });

    livres.filter(l => l.etat === "disponible").forEach(l => {
        livSelect.innerHTML += `<option value="${l.id}">${l.titre}</option>`;
    });

    adherents.forEach(a => {
        adhSelect.innerHTML += `<option value="${a.id}">${a.nom}</option>`;
    });


}


/* ==========================================
   REFRESH ALL
   ========================================== */
function refreshAll() {
    displayCategories();
    displayAuteurs();
    displayAdherents();
    displayLivres();
    displayEmprunts();
    populateSelects();
}


/* ==========================================
   CATEGORIES CRUD
   ========================================== */
function displayCategories() {
    let tbody = document.getElementById("categorieTable");
    tbody.innerHTML = "";
    categories.forEach(c => {
        tbody.innerHTML += `    
        <tr>
            <td>${c.id}</td>
            <td>${c.nom}</td>
            <td>
                <button onclick="editCategorie(${c.id})">Edit</button>
                <button onclick="deleteCategorie(${c.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addCategorie() {
    let nom = document.getElementById("categorieNom").value;
    if (!nom) return alert("Remplir le nom");

    categories.push({ id: counterCategories++, nom });
    clearCategorieForm();
    refreshAll();
}

function editCategorie(id) {
    let obj = categories.find(c => c.id === id);
    if (!obj) return;

    document.getElementById("categorieId").value = obj.id;
    document.getElementById("categorieNom").value = obj.nom;
}

function updateCategorie() {
    let id = Number(document.getElementById("categorieId").value);
    let nom = document.getElementById("categorieNom").value;
    if (!id) return alert("Selectionner une catégorie");

    let obj = categories.find(c => c.id === id);
    if (obj) obj.nom = nom;

    clearCategorieForm();
    refreshAll();
}

function deleteCategorie(id) {
    categories = categories.filter(c => c.id !== id);
    refreshAll();
}

function clearCategorieForm() {
    document.getElementById("categorieId").value = "";
    document.getElementById("categorieNom").value = "";
}


/* ==========================================
   AUTEURS CRUD
   ========================================== */
function displayAuteurs() {
    let tbody = document.getElementById("auteurTable");
    tbody.innerHTML = "";
    auteurs.forEach(a => {
        tbody.innerHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.nom}</td>
            <td>${a.email}</td>
            <td>
                <button onclick="editAuteur(${a.id})">Edit</button>
                <button onclick="deleteAuteur(${a.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addAuteur() {
    let nom = document.getElementById("auteurNom").value;
    let email = document.getElementById("auteurEmail").value;
    if (!nom || !email) return alert("Remplir tous les champs");

    auteurs.push({ id: counterAuteurs++, nom, email });
    clearAuteurForm();
    refreshAll();
}

function editAuteur(id) {
    let obj = auteurs.find(a => a.id === id);
    if (!obj) return;

    document.getElementById("auteurId").value = obj.id;
    document.getElementById("auteurNom").value = obj.nom;
    document.getElementById("auteurEmail").value = obj.email;
}

function updateAuteur() {
    let id = Number(document.getElementById("auteurId").value);
    let nom = document.getElementById("auteurNom").value;
    let email = document.getElementById("auteurEmail").value;
    if (!id) return alert("Selectionner un auteur");

    let obj = auteurs.find(a => a.id === id);
    if (obj) {
        obj.nom = nom;
        obj.email = email;
    }

    clearAuteurForm();
    refreshAll();
}

function deleteAuteur(id) {
    auteurs = auteurs.filter(a => a.id !== id);
    refreshAll();
}

function clearAuteurForm() {
    document.getElementById("auteurId").value = "";
    document.getElementById("auteurNom").value = "";
    document.getElementById("auteurEmail").value = "";
}


/* ==========================================
   ADHERENTS CRUD
   ========================================== */
function displayAdherents() {
    let tbody = document.getElementById("adherentTable");
    tbody.innerHTML = "";
    adherents.forEach(a => {
        tbody.innerHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.nom}</td>
            <td>${a.email}</td>
            <td>${a.telephone}</td>
            <td>
                <button onclick="editAdherent(${a.id})">Edit</button>
                <button onclick="deleteAdherent(${a.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addAdherent() {
    let nom = document.getElementById("adherentNom").value;
    let email = document.getElementById("adherentEmail").value;
    let telephone = document.getElementById("adherentTele").value;
    if (!nom || !email || !telephone) return alert("Remplir tous les champs");

    adherents.push({ id: counterAdherents++, nom, email, telephone });
    clearAdherentForm();
    refreshAll();
}

function editAdherent(id) {
    let obj = adherents.find(a => a.id === id);
    if (!obj) return;

    document.getElementById("adherentId").value = obj.id;
    document.getElementById("adherentNom").value = obj.nom;
    document.getElementById("adherentEmail").value = obj.email;
    document.getElementById("adherentTele").value = obj.telephone;
}

function updateAdherent() {
    let id = Number(document.getElementById("adherentId").value);
    if (!id) return alert("Selectionner un adhérent");

    let obj = adherents.find(a => a.id === id);
    if (obj) {
        obj.nom = document.getElementById("adherentNom").value;
        obj.email = document.getElementById("adherentEmail").value;
        obj.telephone = document.getElementById("adherentTele").value;
    }

    clearAdherentForm();
    refreshAll();
}

function deleteAdherent(id) {
    adherents = adherents.filter(a => a.id !== id);
    refreshAll();
}

function clearAdherentForm() {
    document.getElementById("adherentId").value = "";
    document.getElementById("adherentNom").value = "";
    document.getElementById("adherentEmail").value = "";
    document.getElementById("adherentTele").value = "";
}


/* ==========================================
   LIVRES CRUD
   ========================================== */
function displayLivres() {
    let tbody = document.getElementById("livreTable");
    tbody.innerHTML = "";
    livres.forEach(l => {
        let auteur = auteurs.find(a => a.id === l.auteurId);
        let categorie = categories.find(c => c.id === l.categorieId);
        tbody.innerHTML += `
        <tr>
            <td>${l.id}</td>
            <td>${l.titre}</td>
            <td>${auteur ? auteur.nom : ""}</td>
            <td>${categorie ? categorie.nom : ""}</td>
            <td><span class="status ${l.etat}">${l.etat}</span></td>
            <td>
                <button onclick="editLivre(${l.id})">Edit</button>
                <button onclick="deleteLivre(${l.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addLivre() {
    let titre = document.getElementById("livreTitre").value;
    let auteurId = Number(document.getElementById("livreAuteurId").value);
    let categorieId = Number(document.getElementById("livreCategorieId").value);
    // Etat initial par défaut
    let etat = "disponible";

    if (!titre || !auteurId || !categorieId) return alert("Remplir tous les champs");

    livres.push({ id: counterLivres++, titre, auteurId, categorieId, etat });
    clearLivreForm();
    refreshAll();
}

function editLivre(id) {
    let obj = livres.find(l => l.id === id);
    if (!obj) return;

    document.getElementById("livreId").value = obj.id;
    document.getElementById("livreTitre").value = obj.titre;
    document.getElementById("livreAuteurId").value = obj.auteurId;
    document.getElementById("livreCategorieId").value = obj.categorieId;
}

function updateLivre() {
    let id = Number(document.getElementById("livreId").value);
    if (!id) return alert("Selectionner un livre");

    let obj = livres.find(l => l.id === id);
    if (obj) {
        obj.titre = document.getElementById("livreTitre").value;
        obj.auteurId = Number(document.getElementById("livreAuteurId").value);
        obj.categorieId = Number(document.getElementById("livreCategorieId").value);
    }

    clearLivreForm();
    refreshAll();
}

function deleteLivre(id) {
    livres = livres.filter(l => l.id !== id);
    refreshAll();
}

function clearLivreForm() {
    document.getElementById("livreId").value = "";
    document.getElementById("livreTitre").value = "";
    document.getElementById("livreAuteurId").value = "";
    document.getElementById("livreCategorieId").value = "";
}


/* ==========================================
   EMPRUNTS CRUD
   ========================================== */
function displayEmprunts() {
    let tbody = document.getElementById("empruntTable");
    tbody.innerHTML = "";
    emprunts.forEach(e => {
        let livre = livres.find(l => l.id === e.livreId);
        let adherent = adherents.find(a => a.id === e.adherentId);
        tbody.innerHTML += `
        <tr>
            <td>${e.id}</td>
            <td>${livre ? livre.titre : ""}</td>
            <td>${adherent ? adherent.nom : ""}</td>
            <td>${e.date}</td>
            <td>
                <button onclick="editEmprunt(${e.id})">Edit</button>
                <button onclick="deleteEmprunt(${e.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function addEmprunt() {
    let livreId = Number(document.getElementById("empruntLivreId").value);
    let adherentId = Number(document.getElementById("empruntAdherentId").value);
    let date = document.getElementById("empruntDate").value;
    if (!livreId || !adherentId || !date) return alert("Remplir tous les champs");

    emprunts.push({ id: counterEmprunts++, livreId, adherentId, date });

    // Mettre à jour l'état du livre
    let livre = livres.find(l => l.id === livreId);
    if (livre) {
        livre.etat = "emprunte";    
    }

    clearEmpruntForm();
    refreshAll();
}

function editEmprunt(id) {
    let obj = emprunts.find(e => e.id === id);
    if (!obj) return;

    document.getElementById("empruntId").value = obj.id;
    document.getElementById("empruntLivreId").value = obj.livreId;
    document.getElementById("empruntAdherentId").value = obj.adherentId;
    document.getElementById("empruntDate").value = obj.date;
}

function updateEmprunt() {
    let id = Number(document.getElementById("empruntId").value);
    if (!id) return alert("Selectionner un emprunt");

    let obj = emprunts.find(e => e.id === id);
    if (obj) {
        obj.livreId = Number(document.getElementById("empruntLivreId").value);
        obj.adherentId = Number(document.getElementById("empruntAdherentId").value);
        obj.date = document.getElementById("empruntDate").value;
    }

    clearEmpruntForm();
    refreshAll();
}

function deleteEmprunt(id) {
    let emprunt = emprunts.find(e => e.id === id);
    if (emprunt) {
        // Restaurer l'état du livre
        let livre = livres.find(l => l.id === emprunt.livreId);
        if (livre) {
            livre.etat = "disponible";
        }
    }

    emprunts = emprunts.filter(e => e.id !== id);
    refreshAll();
}

function clearEmpruntForm() {
    document.getElementById("empruntId").value = "";
    document.getElementById("empruntLivreId").value = "";
    document.getElementById("empruntAdherentId").value = "";
    document.getElementById("empruntDate").value = "";
}


/* ==========================================
   INIT
   ========================================== */
refreshAll();

// Toggle Sidebar Logic
document.addEventListener("DOMContentLoaded", function () {
    let toggle = document.querySelector(".toggle");
    let sidebar = document.querySelector(".sidebar");
    let overlay = document.querySelector(".overlay");
    let navItems = document.querySelectorAll(".nav-item");

    if (toggle) {
        toggle.addEventListener("click", function () {
            sidebar.classList.toggle("active");
            overlay.classList.toggle("active");
        });
    }

    if (overlay) {
        overlay.addEventListener("click", function () {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // Close sidebar when clicking a nav item on mobile
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 900) {
                sidebar.classList.remove("active");
                overlay.classList.remove("active");
            }
        });
    });
});
