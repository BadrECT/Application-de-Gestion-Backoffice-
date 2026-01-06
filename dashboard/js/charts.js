
// Wait for DOMContentLoaded to ensure elements and global data exist
document.addEventListener("DOMContentLoaded", () => {
    // We assume 'categories', 'auteurs', 'adherents', 'livres', 'emprunts' are available globally from script.js

    // Function to initialize all charts
    function initCharts() {
        renderBooksPerCategory();
        renderBooksPerAuthor();
        renderLoansPerAdherent();
        renderBookStatusDistribution();
        renderLoansOverTime();
    }

    // Expose initCharts globally if we want to call it on tab switch
    window.initCharts = initCharts;

    // Listen for tab switch to 'stats' to trigger render (optional animation fix)
    let statsBtn = document.getElementById('stats');
    if (statsBtn) {
        statsBtn.addEventListener('click', () => {
            // slight delay to ensure container is visible for size calculation
            setTimeout(initCharts, 100);
        });
    }

    // Auto-init charts on load since it is now the default page
    setTimeout(initCharts, 100);
});

// 1. Books per Category
function renderBooksPerCategory() {
    const ctx = document.getElementById('booksPerCategoryChart');
    if (!ctx) return;

    // Destroy existing chart if any
    let existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    // Data Processing
    const labels = categories.map(c => c.nom);
    const data = categories.map(c => {
        return livres.filter(l => l.categorieId === c.id).length;
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Livres par Catégorie',
                data: data,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// 2. Books per Author
function renderBooksPerAuthor() {
    const ctx = document.getElementById('booksPerAuthorChart');
    if (!ctx) return;

    let existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    const labels = auteurs.map(a => a.nom);
    const data = auteurs.map(a => {
        return livres.filter(l => l.auteurId === a.id).length;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre de Livres',
                data: data,
                backgroundColor: '#36A2EB',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}

// 3. Loans per Adherent (Top 5 Active)
function renderLoansPerAdherent() {
    const ctx = document.getElementById('loansPerAdherentChart');
    if (!ctx) return;

    let existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    // Calculate loans count per adherent
    let adherentCounts = adherents.map(ad => {
        const count = emprunts.filter(e => e.adherentId === ad.id).length;
        return { name: ad.nom, count: count };
    });

    // Sort by count desc and take top 5
    adherentCounts.sort((a, b) => b.count - a.count);
    const topAdherents = adherentCounts.slice(0, 5);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topAdherents.map(a => a.name),
            datasets: [{
                label: 'Emprunts Actifs',
                data: topAdherents.map(a => a.count),
                backgroundColor: '#4BC0C0',
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: 'y', // Horizontal bar
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}

// 4. Book Status Distribution
function renderBookStatusDistribution() {
    const ctx = document.getElementById('bookStatusChart');
    if (!ctx) return;

    let existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    const available = livres.filter(l => l.etat === 'disponible').length;
    const borrowed = livres.filter(l => l.etat === 'emprunte').length;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Disponible', 'Emprunté'],
            datasets: [{
                data: [available, borrowed],
                backgroundColor: ['#10b981', '#ef4444'], // Green, Red
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// 5. Loans Over Time (Simple Group by Month/Year or just individual dates)
function renderLoansOverTime() {
    const ctx = document.getElementById('loansOverTimeChart');
    if (!ctx) return;

    let existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    // Group dates (YYYY-MM-DD)
    const dateCounts = {};
    emprunts.forEach(e => {
        const date = e.date; // "2023-10-01"
        dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    // Sort dates
    const sortedDates = Object.keys(dateCounts).sort();
    const data = sortedDates.map(d => dateCounts[d]);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedDates,
            datasets: [{
                label: 'Emprunts par Date',
                data: data,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}
