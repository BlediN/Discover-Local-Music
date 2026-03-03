const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample event data
const events = {
  'indie-sunset-fest': {
    id: 'indie-sunset-fest',
    name: 'Indie Sunset Festival',
    artists: ['The Midnight Hour', 'Echo Valley', 'Neon Dreams'],
    date: '2026-03-15',
    time: '18:00',
    venue: 'Central Park Amphitheater',
    genre: 'Indie',
    ticketPrice: 35,
    description: 'Join us for an amazing evening of indie music with some of the best local artists.',
    image: 'https://images.unsplash.com/photo-1516575334481-f410b4b38f16?w=500&h=300&fit=crop'
  },
  'hip-hop-night-live': {
    id: 'hip-hop-night-live',
    name: 'Hip-Hop Night Live',
    artists: ['DJ Fresh Beats', 'Lyrical Elite', 'Street Vibes'],
    date: '2026-03-18',
    time: '20:00',
    venue: 'Downtown Music Club',
    genre: 'Hip-Hop',
    ticketPrice: 45,
    description: 'Experience the hottest hip-hop acts performing live. Great atmosphere and amazing beats.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=300&fit=crop'
  },
  'edm-electric-night': {
    id: 'edm-electric-night',
    name: 'Electric Night EDM Festival',
    artists: ['DJ Pulse', 'Neon Nights Collective', 'Bass Infinity'],
    date: '2026-03-22',
    time: '21:00',
    venue: 'Riverside Event Space',
    genre: 'EDM',
    ticketPrice: 50,
    description: 'High-energy electronic dance music featuring world-class DJs.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=300&fit=crop'
  },
  'acoustic-coffee-open-mic': {
    id: 'acoustic-coffee-open-mic',
    name: 'Acoustic Coffee Open Mic',
    artists: ['Various Local Artists'],
    date: '2026-03-20',
    time: '19:00',
    venue: 'The Coffee Roastery',
    genre: 'Acoustic',
    ticketPrice: 0,
    description: 'An intimate open mic night featuring local acoustic musicians.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=300&fit=crop'
  },
  'blues-legend-night': {
    id: 'blues-legend-night',
    name: 'Blues Legend Tribute Night',
    artists: ['The Delta Blues Band', 'Soulful Strings', 'B.B. Echo'],
    date: '2026-03-25',
    time: '20:30',
    venue: 'Vintage Theater',
    genre: 'Blues',
    ticketPrice: 40,
    description: 'Celebrate the greatest blues legends with live performances and tributes.',
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop'
  },
  'rock-explosion-concert': {
    id: 'rock-explosion-concert',
    name: 'Rock Explosion Concert',
    artists: ['Storm Riders', 'Electric Thunder', 'Molten Core'],
    date: '2026-03-28',
    time: '19:30',
    venue: 'The Grand Arena',
    genre: 'Rock',
    ticketPrice: 55,
    description: 'The ultimate rock concert experience with powerful performances and amazing production.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop'
  }
};

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Event detail page
app.get('/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  
  if (events[eventId]) {
    res.sendFile(path.join(__dirname, 'public', 'event.html'));
  } else {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
});

// API endpoint for events data
app.get('/api/events', (req, res) => {
  res.json(Object.values(events));
});

app.get('/api/events/:eventId', (req, res) => {
  const event = events[req.params.eventId];
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

// 404 for any other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
