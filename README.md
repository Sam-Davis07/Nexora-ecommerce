# Nexora — Full-Stack E-Commerce Platform

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

> Screenshots can be added to this section as the project evolves.

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
