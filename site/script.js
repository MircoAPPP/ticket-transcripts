document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.endsWith('index.html') || path.endsWith('/')) {
        loadTicketList();
    }

    if (path.endsWith('ticket.html')) {
        loadTicketContent();
    }

    if (path.endsWith('login.html')) {
        setupLoginForm();
    }
});

async function loadTicketList() {
    try {
        const response = await fetch('tickets.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tickets = await response.json();
        const ticketList = document.getElementById('ticket-list');
        ticketList.innerHTML = ''; // Pulisce la lista

        // Controlla se l'utente è loggato come staff
        const isStaff = sessionStorage.getItem('staff_logged_in') === 'true';

        if (isStaff) {
            tickets.forEach(ticketFile => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `ticket.html?id=${ticketFile}`;
                link.textContent = ticketFile.replace('.html', '');
                listItem.appendChild(link);
                ticketList.appendChild(listItem);
            });
        } else {
             const listItem = document.createElement('li');
             listItem.textContent = 'Accedi come staff per vedere tutti i ticket.';
             ticketList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Errore nel caricamento della lista ticket:', error);
        const ticketList = document.getElementById('ticket-list');
        ticketList.innerHTML = '<li>Errore nel caricamento dei ticket.</li>';
    }
}

async function loadTicketContent() {
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('id');
    const token = params.get('token');
    const ticketContent = document.getElementById('ticket-content');

    // Logica di accesso al ticket
    // TODO: Implementare la verifica del token
    const isStaff = sessionStorage.getItem('staff_logged_in') === 'true';

    if (!ticketId) {
        ticketContent.innerHTML = '<p>ID del ticket non specificato.</p>';
        return;
    }

    // Se non è staff e non ha un token, accesso negato
    if (!isStaff && !token) {
        ticketContent.innerHTML = '<p>Accesso negato. Token non valido o mancante.</p>';
        return;
    }

    try {
        // TODO: Verificare il token con un elenco di token validi
        // Per ora, se c'è un token o è staff, carica il ticket
        const response = await fetch(`../tickets/${ticketId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        ticketContent.innerHTML = content;
    } catch (error) {
        console.error('Errore nel caricamento del ticket:', error);
        ticketContent.innerHTML = '<p>Impossibile caricare il ticket.</p>';
    }
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = document.getElementById('password').value;

        // Password per lo staff (da cambiare in un ambiente di produzione)
        const STAFF_PASSWORD = 'password_staff_segreta'; // TODO: Cambiare questa password

        if (password === STAFF_PASSWORD) {
            sessionStorage.setItem('staff_logged_in', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Password errata!');
        }
    });
}