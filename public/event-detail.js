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
        const response = await fetch(`/api/events/${eventId}`);
        
        if (!response.ok) {
            displayNotFound();
            return;
        }

        const event = await response.json();
        displayEventDetail(event);
    } catch (error) {
        console.error('Error loading event:', error);
        displayNotFound();
    }
}

function extractEventIdFromUrl() {
    const path = window.location.pathname;
    // Remove leading slash and return the event ID
    return path.substring(1);
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
    window.location.href = '/404.html';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}
