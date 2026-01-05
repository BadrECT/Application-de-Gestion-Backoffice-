
/* ================== CATEGORIES ================== */
let categoriesBtn = document.getElementById('categories');
categoriesBtn.addEventListener('click', () => {

    document.querySelectorAll('.section-pane').forEach(s => s.classList.remove('active'));
    document.getElementById('categoriess').classList.add('active');

    document.getElementById('page-title').textContent = 'Gestion des Catégories';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    categoriesBtn.classList.add('active');
});


/* ================== AUTEURS ================== */
let auteursBtn = document.getElementById('auteurs');
auteursBtn.addEventListener('click', () => {

    document.querySelectorAll('.section-pane').forEach(s => s.classList.remove('active'));
    document.getElementById('auteurss').classList.add('active');

    document.getElementById('page-title').textContent = 'Gestion des Auteurs';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    auteursBtn.classList.add('active');
});


/* ================== ADHERENTS ================== */
let adherentsBtn = document.getElementById('adherents');
adherentsBtn.addEventListener('click', () => {

    document.querySelectorAll('.section-pane').forEach(s => s.classList.remove('active'));
    document.getElementById('adherentss').classList.add('active');

    document.getElementById('page-title').textContent = 'Gestion des Adhérents';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    adherentsBtn.classList.add('active');
});


/* ================== LIVRES ================== */
let livresBtn = document.getElementById('livres');
livresBtn.addEventListener('click', () => {

    document.querySelectorAll('.section-pane').forEach(s => s.classList.remove('active'));
    document.getElementById('livress').classList.add('active');

    document.getElementById('page-title').textContent = 'Gestion des Livres';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    livresBtn.classList.add('active');
});


let empruntsBtn = document.getElementById('emprunts');
empruntsBtn.addEventListener('click', () => {

    document.querySelectorAll('.section-pane').forEach(s => s.classList.remove('active'));
    document.getElementById('empruntss').classList.add('active');

    document.getElementById('page-title').textContent = 'Gestion des Emprunts';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    empruntsBtn.classList.add('active');
});

/* ================== STATS ================== */
let statsBtn = document.getElementById('stats');
if (statsBtn) {
    statsBtn.addEventListener('click', () => {

        document.querySelectorAll('.section-pane').forEach(s => s.classList.remove('active'));
        document.getElementById('statss').classList.add('active');

        document.getElementById('page-title').textContent = 'Statistiques de la Bibliothèque';

        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        statsBtn.classList.add('active');

        // Initialize/Refresh charts
        if (window.initCharts) {
            window.initCharts();
        }
    });
}

