CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    artists TEXT[] NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    venue TEXT NOT NULL,
    genre TEXT NOT NULL,
    ticket_price NUMERIC(8, 2) NOT NULL DEFAULT 0,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO events (
    id,
    name,
    artists,
    event_date,
    event_time,
    venue,
    genre,
    ticket_price,
    description,
    image
)
VALUES
    (
        'indie-sunset-fest',
        'Indie Sunset Festival',
        ARRAY['The Midnight Hour', 'Echo Valley', 'Neon Dreams'],
        '2026-03-15',
        '18:00',
        'Central Park Amphitheater',
        'Indie',
        35,
        'Join us for an amazing evening of indie music with some of the best local artists.',
        'https://images.unsplash.com/photo-1516575334481-f410b4b38f16?w=500&h=300&fit=crop'
    ),
    (
        'hip-hop-night-live',
        'Hip-Hop Night Live',
        ARRAY['DJ Fresh Beats', 'Lyrical Elite', 'Street Vibes'],
        '2026-03-18',
        '20:00',
        'Downtown Music Club',
        'Hip-Hop',
        45,
        'Experience the hottest hip-hop acts performing live. Great atmosphere and amazing beats.',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=300&fit=crop'
    ),
    (
        'edm-electric-night',
        'Electric Night EDM Festival',
        ARRAY['DJ Pulse', 'Neon Nights Collective', 'Bass Infinity'],
        '2026-03-22',
        '21:00',
        'Riverside Event Space',
        'EDM',
        50,
        'High-energy electronic dance music featuring world-class DJs.',
        'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=300&fit=crop'
    ),
    (
        'acoustic-coffee-open-mic',
        'Acoustic Coffee Open Mic',
        ARRAY['Various Local Artists'],
        '2026-03-20',
        '19:00',
        'The Coffee Roastery',
        'Acoustic',
        0,
        'An intimate open mic night featuring local acoustic musicians.',
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=300&fit=crop'
    ),
    (
        'blues-legend-night',
        'Blues Legend Tribute Night',
        ARRAY['The Delta Blues Band', 'Soulful Strings', 'B.B. Echo'],
        '2026-03-25',
        '20:30',
        'Vintage Theater',
        'Blues',
        40,
        'Celebrate the greatest blues legends with live performances and tributes.',
        'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop'
    ),
    (
        'rock-explosion-concert',
        'Rock Explosion Concert',
        ARRAY['Storm Riders', 'Electric Thunder', 'Molten Core'],
        '2026-03-28',
        '19:30',
        'The Grand Arena',
        'Rock',
        55,
        'The ultimate rock concert experience with powerful performances and amazing production.',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop'
    )
ON CONFLICT (id) DO NOTHING;
