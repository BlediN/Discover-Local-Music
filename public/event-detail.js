// Event Detail Page Script

document.addEventListener('DOMContentLoaded', () => {
    loadEventDetail();
});

async function loadEventDetail() {
    const eventId = extractEventIdFromUrl();
    
    if (!eventId) {
        displayNotFound();
        return;
    }

    try {
        const response = await fetch('data/events.json');
        const eventsData = await response.json();
        const event = eventsData[eventId];
        
        if (!event) {
            displayNotFound();
            return;
        }

        displayEventDetail(event);
    } catch (error) {
        console.error('Error loading event:', error);
        displayNotFound();
    }
}

function extractEventIdFromUrl() {
    // Support both hash-based routing (#event-id) and path-based (for local server)
    const hash = window.location.hash.substring(1); // Remove #
    if (hash) {
        return hash;
    }
    
    const path = window.location.pathname;
    const pathPart = path.substring(path.lastIndexOf('/') + 1);
    // Remove .html extension if present
    return pathPart.replace('.html', '');
}

function displayEventDetail(event) {
    const container = document.getElementById('event-detail');
    
    container.innerHTML = `
        <img src="${event.image}" alt="${event.name}" class="event-detail-image">
        
        <h2>${event.name}</h2>
        
        <span class="event-detail-genre">${event.genre}</span>

        <div class="detail-section">
            <div class="detail-label">Event Name</div>
            <div class="detail-value">${event.name}</div>
        </div>

        <div class="detail-section">
            <div class="detail-label">Artists</div>
            <div class="detail-value">${event.artists.join(', ')}</div>
        </div>

        <div class="detail-section">
            <div class="detail-label">Genre</div>
            <div class="detail-value">${event.genre}</div>
        </div>

        <div class="detail-section">
            <div class="detail-label">Date</div>
            <div class="detail-value">${formatDate(event.date)}</div>
        </div>

        <div class="detail-section">
            <div class="detail-label">Time</div>
            <div class="detail-value">${event.time}</div>
        </div>

        <div class="detail-section">
            <div class="detail-label">Venue</div>
            <div class="detail-value">${event.venue}</div>
        </div>

        <div class="detail-section">
            <div class="detail-label">Ticket Price</div>
            <div class="detail-value">${event.ticketPrice === 0 ? 'FREE' : '$' + event.ticketPrice}</div>
        </div>

        <div class="detail-section">
            <div class="detail-label">Description</div>
            <div class="detail-value">${event.description}</div>
        </div>
    `;
}

function displayNotFound() {
    // The 404 page is served by Express, but if we need to handle it here
    window.location.href = '/not-found';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}
