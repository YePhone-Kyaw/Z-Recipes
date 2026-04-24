# Z-Recipes 🍽️

A full-stack recipe sharing platform where users can discover, post, and save recipes. Built with the MERN stack and TypeScript, deployed on DigitalOcean.

**Live:** [yephonekyaw.com](https://yephonekyaw.com)

---

## Features

- **Authentication** — JWT-based sign up / sign in with secure HttpOnly cookies
- **Recipe Feed** — Browse all community recipes sorted by most recent
- **Create Recipes** — Post recipes with a photo, ingredients, and instructions
- **Profile Page** — View and manage only your own recipes with edit and delete
- **Favourites** — Heart any recipe from the feed and view your saved collection
- **Light / Dark Mode** — Theme toggle with localStorage persistence and no flash on load
- **Responsive Design** — Mobile-first layout with animated hamburger navigation
- **Email Notifications** — Queue-based email system via Nodemailer and Bull/Redis
- **SEO** — Open Graph, Twitter Card metadata and dynamic page titles per route

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router v7 | Client-side routing |
| Axios | HTTP client with request cancellation |
| React Toastify | Toast notifications |
| CSS Custom Properties | Light / dark theme system |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and data modelling |
| JWT + bcrypt | Authentication and password hashing |
| Multer | Image upload handling |
| Nodemailer + EJS | Email sending with HTML templates |
| Bull + Redis | Email job queue |
| express-validator | Request validation |
| node-cron | Scheduled tasks |

### Infrastructure
| Technology | Purpose |
|---|---|
| DigitalOcean | Cloud hosting (VPS) |
| Nginx | Reverse proxy |
| PM2 | Node.js process manager |
| Custom Domain + DNS | Domain routing |

---

## Project Structure

```
Z-Recipes/
├── backend/
│   ├── controllers/
│   │   ├── RecipeController.js
│   │   └── UserController.js
│   ├── helpers/
│   │   ├── createToken.js
│   │   ├── removeFile.js
│   │   ├── sendEmail.js
│   │   └── upload.js
│   ├── middlewares/
│   │   ├── AuthMiddleware.js
│   │   └── handleErrorMessage.js
│   ├── models/
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── queue/
│   │   └── emailQueue.js
│   ├── routes/
│   │   ├── recipes.js
│   │   └── users.js
│   ├── views/
│   │   └── email.ejs
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── logo.svg
    ├── src/
    │   ├── components/
    │   │   └── NavBar.tsx
    │   ├── contexts/
    │   │   └── AuthContext.tsx
    │   ├── hooks/
    │   │   ├── useAuth.ts
    │   │   └── useTheme.ts
    │   ├── pages/
    │   │   ├── Landing.tsx
    │   │   ├── LoginForm.tsx
    │   │   ├── SignUpForm.tsx
    │   │   ├── Home.tsx
    │   │   ├── RecipeForm.tsx
    │   │   ├── Profile.tsx
    │   │   ├── Favourites.tsx
    │   │   └── About.tsx
    │   ├── types/
    │   ├── helpers/
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    └── index.html
```

---

## Getting Started

### Prerequisites

- Node.js v20+
- MongoDB (local or Atlas)
- Redis (for email queue)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/z-recipes.git
cd z-recipes
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
REDIS_URL=redis://localhost:6379
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_BACKEND_ASSET_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Pages

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing page | No |
| `/login` | Sign in form | No |
| `/sign-up` | Sign up form | No |
| `/home` | Recipe feed (all recipes) | Yes |
| `/recipes/create` | Create a new recipe | Yes |
| `/recipes/:id/edit` | Edit a recipe | Yes |
| `/profile` | Your recipes with edit & delete | Yes |
| `/favourites` | Your hearted recipes | Yes |
| `/about` | About page | Yes |

---

## API Endpoints

### Users
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/users/register` | Create a new account | No |
| POST | `/api/users/login` | Sign in | No |
| POST | `/api/users/logout` | Sign out | Yes |
| GET | `/api/users/me` | Get current user | Yes |

### Recipes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/recipes` | Get all recipes | Yes |
| POST | `/api/recipes` | Create a recipe | Yes |
| PATCH | `/api/recipes/:id` | Update a recipe | Yes |
| DELETE | `/api/recipes/:id` | Delete a recipe | Yes |
| PATCH | `/api/recipes/favourites/:recipeId` | Toggle favourite | Yes |
| GET | `/api/recipes/favourites` | Get user favourites | Yes |
| GET | `/api/recipes/myRecipes` | Get user's own recipes | Yes |

---

## Deployment

The application is deployed on a DigitalOcean VPS with the following setup:

- **Nginx** acts as a reverse proxy, routing traffic to the Node.js backend and serving the frontend
- **PM2** manages both the backend Node.js process and frontend dev server, with auto-restart on crash
- **DNS** is configured to point the custom domain to the DigitalOcean droplet IP

### After pulling new changes on the server

```bash
git pull origin main

# If package.json changed
cd backend && npm install
cd ../frontend && npm install

# Restart all processes
pm2 restart all

# Verify
pm2 status
pm2 logs --lines 30
```

---

## Environment Variables Reference

### Backend `.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 3000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `EMAIL_USER` | SMTP email address |
| `EMAIL_PASS` | SMTP app password |
| `REDIS_URL` | Redis connection URL |
| `CLIENT_URL` | Frontend URL for CORS |

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Backend API base URL (e.g. `http://localhost:4000`) |
| `VITE_BACKEND_ASSET_URL` | Backend base URL for serving uploaded assets such as recipe images (e.g. `http://localhost:4000`) |
