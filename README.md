# WEB103 Project 1 - *Discover Local Music*

Submitted by: **Bledar Ndoni**

Setup steps:
# 1. Navigate to the project directory
cd Discover-Local-Music

# 2. Install dependencies (Express.js)
npm install

# 3. Start the server
npm start



About this web app: **This web app allows students to discover local music events, concerts, open mic nights, and music festivals happening near their college or university.**

Time spent: **4 hours** implementing all required and optional features

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
  - Event Name, Artists, Venue, Date & Time, Genre, Ticket Price, and Image
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view has a unique endpoint:**
    - `localhost:3000/indie-sunset-fest`
    - `localhost:3000/hip-hop-night-live`
    - `localhost:3000/edm-electric-night`
    - `localhost:3000/acoustic-coffee-open-mic`
    - `localhost:3000/blues-legend-night`
    - `localhost:3000/rock-explosion-concert`
  - [x] *Unique URLs display in the browser address bar for each event*
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

## Optional Features

The following **optional** features are implemented:

- [x] **The web app displays items in a unique format** - Event cards with images, badges, and hover animations

## Additional Features Implemented

- [x] **Filter Functionality** - Users can filter events by genre and ticket price
- [x] **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices
- [x] **Event Images** - Visual cards for each event with aesthetic imagery
- [x] **Smooth Animations** - Card hover effects with elevation and smooth transitions
- [x] **Backend API** - Express.js server with JSON API endpoints for events
- [x] **Database Structure** - 6 unique events with all required attributes

## Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Server:**
   ```bash
   npm start
   ```

3. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`

## GitHub Pages Deployment

This app uses a **separate `gh-pages` branch** for GitHub Pages deployment, keeping your `main` branch with the Express server version untouched.

**Note:** On the `gh-pages` branch, all website files are in the root directory (not in a `public/` folder), and server-related files (server.js, package.json, node_modules) are removed.

### Setup Deployment Branch

The `gh-pages` branch has already been created and configured. When you push to it, GitHub Actions automatically deploys your site.

### Enable GitHub Pages (One-time setup)

1. Go to your repository on GitHub → Settings → Pages
2. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
3. Done! The site will deploy automatically on push

### Your Live Site

Once deployed, your site will be available at:
```
https://BlediN.github.io/Discover-Local-Music/
```

### Workflow

- **main branch**: Express.js development version with server
- **gh-pages branch**: Static-only version for GitHub Pages (files in root)

When you want to deploy updates:
```bash
# Switch to gh-pages branch
git checkout gh-pages

# Make changes to HTML, CSS, or JS files
# (Files are in the root: index.html, styles.css, etc.)

# Commit and push
git add .
git commit -m "Update site content"
git push origin gh-pages

# Switch back to main if needed
git checkout main
```

### Live Demo

Once deployed, your app will be accessible at:
```
https://BlediN.github.io/Discover-Local-Music/
```

**Note:** The app now uses static JSON data and hash-based routing for event details, making it fully compatible with GitHub Pages static hosting.

## Project Structure

### Main Branch (Development with Express)
```
Discover-Local-Music/
├── server.js                 # Express server with routing logic
├── package.json              # Project dependencies
├── package-lock.json
├── node_modules/             # Dependencies
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment workflow
├── public/                   # Static files served by Express
│   ├── index.html            # Home page with event listings
│   ├── event.html            # Event detail page template
│   ├── 404.html              # 404 error page
│   ├── app.js                # Home page JavaScript
│   ├── event-detail.js       # Event detail page JavaScript
│   ├── styles.css            # Custom styles with Picocss
│   ├── data/
│   │   └── events.json       # Event data (static JSON)
│   ├── pico-main/            # Local Picocss framework
│   └── .nojekyll             # Tells GitHub Pages to serve all files
├── .gitignore
└── README.md
```

### gh-pages Branch (Static Deployment)
```
Discover-Local-Music/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment workflow
├── index.html                # Home page with event listings
├── event.html                # Event detail page template
├── 404.html                  # 404 error page
├── app.js                    # Home page JavaScript
├── event-detail.js           # Event detail page JavaScript
├── styles.css                # Custom styles with Picocss
├── data/
│   └── events.json           # Event data (static JSON)
├── pico-main/                # Local Picocss framework
├── .nojekyll                 # Tells GitHub Pages to serve all files
├── .gitignore
└── README.md
```

## How to Use

### Viewing Events
1. The home page displays 6 music events in a card grid
2. Each card shows:
   - Event image
   - Genre badge
   - Event name
   - Artists performing
   - Venue location
   - Date and time
   - Ticket price (or FREE)

### Filtering Events
- Use the **Genre Filter** to view events by music style
- Use the **Ticket Price Filter** to find events within your budget

### Viewing Event Details
- Click on any event card to view full details
- Each event has a unique URL shown in the address bar
- See all database fields including event description

### Handling Invalid URLs
- Navigate to any invalid URL (e.g., `/invalid-event-name`)
- A friendly 404 page displays
- Use the link to return to the main event list

## Events Database

| Event | Genre | Venue | Price |
|-------|-------|-------|-------|
| Indie Sunset Festival | Indie | Central Park Amphitheater | $35 |
| Hip-Hop Night Live | Hip-Hop | Downtown Music Club | $45 |
| Electric Night EDM Festival | EDM | Riverside Event Space | $50 |
| Acoustic Coffee Open Mic | Acoustic | The Coffee Roastery | FREE |
| Blues Legend Tribute Night | Blues | Vintage Theater | $40 |
| Rock Explosion Concert | Rock | The Grand Arena | $55 |

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend** (Optional): Node.js, Express.js (for local development)
- **Data**: Static JSON file
- **Styling**: Picocss Framework + Custom CSS
- **Images**: Unsplash API
- **Deployment**: GitHub Pages with static hosting
- **Architecture**: Client-side routing with hash-based navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

This application demonstrates modern web development practices using vanilla JavaScript and Express.js. The server handles routing with unique endpoints for each event, proper 404 error handling, and serves a RESTful API for event data. The frontend features a responsive card-based UI with filtering capabilities and smooth animations using only CSS and vanilla JavaScript.

All events are server-side rendered, ensuring that each event has its own unique URL that can be shared and bookmarked.

## License

ISC License - Open source project for educational purposes.

Copyright [2026] [Bledar Ndoni]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.