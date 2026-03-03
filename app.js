// Discover Local Music - Main App

let allEvents = [];

// Fetch events from API on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    setupFilters();
});

async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const eventsData = await response.json();
        allEvents = Object.values(eventsData);
        displayEvents(allEvents);
    } catch (error) {
        console.error('Error loading events:', error);
        displayError('Failed to load events');
    }
}

function displayEvents(events) {
    const container = document.getElementById('events-container');
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h2>🎵 No events found</h2>
                <p>Try adjusting your filters to find more events</p>
            </div>
        `;
        return;
    }

    container.innerHTML = events.map(event => `
        <a href="event.html#${event.id}" class="event-card">
            <img src="${event.image}" alt="${event.name}" class="event-image">
            <div class="event-content">
                <span class="event-genre">${event.genre}</span>
                <h3>${event.name}</h3>
                <p class="event-artists">👨‍🎤 ${event.artists.join(', ')}</p>
                <p class="event-venue">📍 ${event.venue}</p>
                <p class="event-date">📅 ${formatDate(event.date)} at ${event.time}</p>
                <div class="event-footer">
                    <span class="event-price ${event.ticketPrice === 0 ? 'free' : ''}">
                        ${event.ticketPrice === 0 ? 'FREE' : '$' + event.ticketPrice}
                    </span>
                    <span class="event-link">View Details</span>
                </div>
            </div>
        </a>
    `).join('');
}

function setupFilters() {
    const genreFilter = document.getElementById('genre-filter');
    const priceFilter = document.getElementById('price-filter');

    genreFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    const genreFilter = document.getElementById('genre-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filtered = allEvents;

    // Filter by genre
    if (genreFilter) {
        filtered = filtered.filter(event => event.genre === genreFilter);
    }

    // Filter by price
    if (priceFilter) {
        switch (priceFilter) {
            case '0':
                filtered = filtered.filter(event => event.ticketPrice === 0);
                break;
            case '1-40':
                filtered = filtered.filter(event => event.ticketPrice > 0 && event.ticketPrice <= 40);
                break;
            case '40-50':
                filtered = filtered.filter(event => event.ticketPrice > 40 && event.ticketPrice <= 50);
                break;
            case '50+':
                filtered = filtered.filter(event => event.ticketPrice > 50);
                break;
        }
    }

    displayEvents(filtered);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}

function displayError(message) {
    const container = document.getElementById('events-container');
    container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <h2>Error</h2>
            <p>${message}</p>
        </div>
    `;
}
