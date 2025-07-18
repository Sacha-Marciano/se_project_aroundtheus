# Around The U.S.

[Live Demo](https://sacha-marciano.github.io/se_project_aroundtheus/)

[![Video Website](https://img.youtube.com/vi/rsA7WrYDE7s/0.jpg)](https://www.youtube.com/watch?v=rsA7WrYDE7s)

[Explanatory Video](https://www.youtube.com/watch?v=rsA7WrYDE7s)

---

## Overview

**Around The U.S.** is a responsive, interactive web application inspired by the adventures of Jacques Cousteau. Users can view, add, like, and delete beautiful landscape cards, as well as edit their profile and avatar. The project demonstrates modern front-end development practices, including modular JavaScript (OOP), Webpack bundling, and API integration.

---

## Features

- Responsive design for desktop, tablet, and mobile
- User profile editing (name, description, avatar)
- Add new cards with title and image URL
- Like/unlike cards (with server sync)
- Delete cards (with confirmation)
- View images in a modal popup
- Form validation with real-time feedback
- Persistent data via REST API
- Accessible and semantic HTML

---

## Technologies Used

- **JavaScript (ES6+)**: Modular, OOP architecture
- **HTML5 & CSS3**: BEM methodology, Flexbox, Grid, custom modals
- **Webpack**: Bundling, asset management, dev server
- **Babel**: ES6+ transpilation
- **PostCSS**: Autoprefixer, cssnano for optimization
- **REST API**: CRUD operations for user and cards
- **Figma**: [Design brief](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)

---

## Project Structure

```
se_project_aroundtheus(mine)/
├── src/
│   ├── blocks/         # BEM CSS blocks (body, card, modal, etc.)
│   ├── components/     # JS classes (Card, Popup, Section, etc.)
│   ├── images/         # SVGs, PNGs, favicon, etc.
│   ├── pages/          # Entry JS and CSS
│   ├── utils/          # API and constants
│   ├── vendor/         # Fonts and normalize.css
│   └── index.html      # Main HTML file
├── package.json        # Scripts and dependencies
├── webpack.config.js   # Webpack configuration
├── postcss.config.js   # PostCSS plugins
├── babel.config.js     # Babel presets
└── README.md           # Project documentation
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sacha-marciano/se_project_aroundtheus.git
   cd se_project_aroundtheus
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development
- **Start the dev server:**
  ```bash
  npm run dev
  ```
  The app will open at [http://localhost:8080](http://localhost:8080).

### Build for Production
- **Build the app:**
  ```bash
  npm run build
  ```
  Output will be in the `dist/` folder.

### Deployment
- **Deploy to GitHub Pages:**
  ```bash
  npm run deploy
  ```

---

## API
This project uses a REST API for all user and card operations. The API base URL is:
```
https://around-api.en.tripleten-services.com/v1
```

Endpoints include:
- `GET /users/me` — fetch user info
- `PATCH /users/me` — update user info
- `PATCH /users/me/avatar` — update avatar
- `GET /cards` — fetch all cards
- `POST /cards` — add a new card
- `DELETE /cards/:id` — delete a card
- `PUT /cards/:id/likes` — like a card
- `DELETE /cards/:id/likes` — unlike a card

---

## Styling & Assets
- **Fonts:** Inter (Regular, Medium, Black)
- **CSS:** BEM, responsive, modular, normalized
- **Assets:** SVG icons for UI, sample images for cards

---

## Credits
- Developed by Sacha M. Marciano
- Design: [Figma brief](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)
- API: TripleTen demo API

---

## Future Improvements
- Add user authentication
- Enable comments on cards
- Improve accessibility (a11y)
- Add backend for persistent user data

---

## License
This project is licensed under the ISC License.
