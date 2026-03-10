require('dotenv').config();

const fs = require('fs/promises');
const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initializeDatabase() {
  const schemaPath = path.join(__dirname, 'db', 'schema.sql');
  const schemaSql = await fs.readFile(schemaPath, 'utf-8');
  await pool.query(schemaSql);
  console.log('Database schema initialized.');
}

function mapEventRow(row) {
  return {
    id: row.id,
    name: row.name,
    artists: row.artists,
    date: row.event_date,
    time: row.event_time,
    venue: row.venue,
    genre: row.genre,
    ticketPrice: Number(row.ticket_price),
    description: row.description,
    image: row.image
  };
}

function buildPriceFilter(priceFilter, values) {
  if (!priceFilter) {
    return '';
  }

  if (priceFilter === '0') {
    return 'ticket_price = 0';
  }

  if (priceFilter === '1-40') {
    return 'ticket_price > 0 AND ticket_price <= 40';
  }

  if (priceFilter === '40-50') {
    return 'ticket_price > 40 AND ticket_price <= 50';
  }

  if (priceFilter === '50+') {
    return 'ticket_price > 50';
  }

  if (priceFilter.includes('-')) {
    const [minRaw, maxRaw] = priceFilter.split('-');
    const min = Number(minRaw);
    const max = Number(maxRaw);

    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      const minIndex = values.push(min);
      const maxIndex = values.push(max);
      return `ticket_price BETWEEN $${minIndex} AND $${maxIndex}`;
    }
  }

  return '';
}

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for events data
app.get('/api/events', async (req, res) => {
  try {
    const values = [];
    const filters = [];

    if (req.query.genre) {
      const index = values.push(req.query.genre);
      filters.push(`genre = $${index}`);
    }

    if (req.query.venue) {
      const index = values.push(`%${req.query.venue}%`);
      filters.push(`venue ILIKE $${index}`);
    }

    const priceFilter = buildPriceFilter(req.query.price, values);
    if (priceFilter) {
      filters.push(priceFilter);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const query = `
      SELECT id, name, artists, event_date, event_time, venue, genre, ticket_price, description, image
      FROM events
      ${whereClause}
      ORDER BY event_date ASC, event_time ASC;
    `;

    const result = await pool.query(query, values);
    res.json(result.rows.map(mapEventRow));
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to load events' });
  }
});

app.get('/api/events/:eventId', async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT id, name, artists, event_date, event_time, venue, genre, ticket_price, description, image
        FROM events
        WHERE id = $1;
      `,
      [req.params.eventId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.json(mapEventRow(result.rows[0]));
  } catch (error) {
    console.error('Error fetching event detail:', error);
    res.status(500).json({ error: 'Failed to load event details' });
  }
});

// Event detail page
app.get('/:eventId', async (req, res) => {
  try {
    const result = await pool.query('SELECT id FROM events WHERE id = $1;', [req.params.eventId]);
    if (result.rows.length > 0) {
      res.sendFile(path.join(__dirname, 'public', 'event.html'));
    } else {
      res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
  } catch (error) {
    console.error('Error checking event route:', error);
    res.status(500).sendFile(path.join(__dirname, 'public', '404.html'));
  }
});

// 404 for any other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    process.exit(1);
  }
}

startServer();
