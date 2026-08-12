# Nexora — E-Commerce

Nexora is a modern full-stack e-commerce platform built with React, Node.js, Express, and Supabase.

The application provides a complete shopping experience where users can discover products, search and filter products, manage wishlists, add products to a shopping cart, update quantities, and browse the store through a responsive modern interface.

The project is deployed using Vercel for the frontend and Render for the backend, with Supabase providing the cloud database.

---

## Live Demo

[View Nexora Live](https://nexora-ecommerce-gamma.vercel.app/)

---

## Preview

Nexora provides a modern shopping experience with:

- Modern landing page
- Product discovery
- Search and filtering
- Wishlist management
- Shopping cart
- Responsive navigation
- Responsive design
- Toast notifications

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/df0c9a38-9aa2-41ce-89d0-08ad8cc38f5b" />


---

# Features

## Home Page

- Modern hero section
- Featured product categories
- Product highlights
- Brand experience section
- Call-to-action sections
- Responsive design
- Modern UI

---

## Product Shopping

Users can:

- Browse available products
- Search for products
- Filter products
- Sort products by price
- View product information
- Add products to cart
- Add products to wishlist

### Available Filters

- Gender
- Product category
- Stock availability
- Price range

### Sorting

- Price: Low → High
- Price: High → Low

---

## Wishlist

Users can:

- Add products to wishlist
- Remove products from wishlist
- View saved products
- View wishlist item count
- Add wishlist products directly to cart

Wishlist data is persisted through the backend and Supabase database.

---

## Shopping Cart

Users can:

- Add products to cart
- Remove products from cart
- Update product quantities
- View product prices
- View total cart value
- View cart item count

Cart operations are handled through REST APIs provided by the Express backend.

---

## Search

The application provides product search functionality.

Users can search for products directly from the navigation bar and receive filtered product results.

---

## Notifications

Nexora uses toast notifications to provide feedback for important actions, including:

- Product added to cart
- Product added to wishlist
- Product removed from wishlist
- Product removed from cart
- API request failures
- Other user actions

---

## Responsive Design

Nexora is designed to work across different screen sizes.

### Supported Devices

- Desktop
- Laptop
- Tablet
- Mobile

The navigation, product grids, shopping cart, wishlist, and other sections adapt to smaller screen sizes.

---

# Tech Stack

## Frontend

- React.js
- React Router
- JavaScript
- CSS3
- React Icons
- React Toastify

## Backend

- Node.js
- Express.js
- REST APIs
- CORS

## Database

- Supabase
- PostgreSQL

## Development Tools

- Git
- GitHub
- VS Code
- npm

## Deployment

- Vercel — Frontend
- Render — Backend
- Supabase — Database

---

# Application Architecture

Nexora follows a frontend-backend architecture where the React frontend communicates with the Express backend through REST APIs.

```text
                         ┌──────────────────────┐
                         │        Nexora        │
                         │   E-Commerce App     │
                         └──────────┬───────────┘
                                    │
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
             ┌──────▼───────┐               ┌───────▼──────┐
             │   Frontend   │               │   Backend    │
             │    React     │◄─────────────►│   Express    │
             │ React Router │    REST API   │   Node.js    │
             └──────┬───────┘               └───────┬──────┘
                    │                               │
                    │                               │
                 Vercel                          Render
                                                    │
                                                    │
                                             ┌──────▼───────┐
                                             │   Supabase   │
                                             │  PostgreSQL  │
                                             └──────────────┘
````

---

# Project Structure

```text
Nexora-Full-Stack-E-Commerce-Platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   │
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# API Endpoints

## Products

### Get Products

```http
GET /api/products
```

Supports:

* Search
* Gender filtering
* Stock filtering
* Price filtering
* Category filtering
* Price sorting

### Get Single Product

```http
GET /api/products/:id
```

---

## Cart

### Add Product

```http
POST /api/cart/add
```

### Get Cart

```http
GET /api/cart/:userId
```

### Update Quantity

```http
PUT /api/cart/update
```

### Remove Product

```http
DELETE /api/cart/:productId/:userId
```

---

## Wishlist

### Add Product

```http
POST /api/wishlist/add
```

### Get Wishlist

```http
GET /api/wishlist/:userId
```

### Remove Product

```http
DELETE /api/wishlist/:productId/:userId
```

---

# Deployment

Nexora is deployed using a modern cloud architecture.

### Frontend

The React frontend is deployed on:

Vercel

### Backend

The Express backend is deployed on:

Render

### Database

The application uses:

Supabase

---

# Project Goals

The main goals of Nexora were to:

* Build a complete full-stack e-commerce application
* Practice React application architecture
* Build and consume REST APIs
* Work with a cloud-hosted database
* Implement shopping cart functionality
* Implement wishlist functionality
* Build responsive user interfaces
* Learn production deployment
* Connect frontend, backend, and database services

---

# Future Improvements

Potential future improvements include:

* User authentication
* Multi-user accounts
* Product reviews and ratings
* Payment gateway integration
* Order management
* Order history
* Admin dashboard
* Inventory management
* Product image uploads
* Advanced product recommendations
* Improved authentication and authorization
* Automated testing

---

# What I Learned

Through this project, I gained practical experience with:

* React component architecture
* React Router
* State management using Context API
* REST API development
* Express.js backend development
* Database integration
* Supabase
* CRUD operations
* Search and filtering
* Cart and wishlist logic
* Responsive UI development
* Git and GitHub
* Environment variables
* Vercel deployment
* Render deployment
* Connecting frontend and backend in production

---

# Author

## Sam Davis

Full-Stack Developer focused on building modern and production-ready web applications.

### Connect With Me

* Portfolio: [https://portfolio-omega-jade-30.vercel.app/](https://portfolio-omega-jade-30.vercel.app/)
* GitHub: [https://github.com/Sam-Davis07](https://github.com/Sam-Davis07)

---

## If you found this project interesting

Feel free to explore the project, check out the live demo, and follow my development journey.

````

That looks more professional and reinforces that your credentials are kept private.
