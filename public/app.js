// Discover Local Music - Main App

// Fetch events from API on page load
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    loadEvents();
});

async function loadEvents() {
    const genre = document.getElementById('genre-filter').value;
    const price = document.getElementById('price-filter').value;
    const venue = document.getElementById('venue-search').value.trim();

    const query = new URLSearchParams();
    if (genre) query.set('genre', genre);
    if (price) query.set('price', price);
    if (venue) query.set('venue', venue);

    const url = query.toString() ? `/api/events?${query.toString()}` : '/api/events';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const events = await response.json();
        displayEvents(events);
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
        <a href="/${event.id}" class="event-card">
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
    const venueSearch = document.getElementById('venue-search');

    genreFilter.addEventListener('change', loadEvents);
    priceFilter.addEventListener('change', loadEvents);
    venueSearch.addEventListener('input', loadEvents);
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
