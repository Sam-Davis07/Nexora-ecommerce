# 🛍️ Nexora — Full-Stack E-Commerce Platform

Nexora is a modern full-stack e-commerce platform built to provide a clean, responsive, and seamless online shopping experience.

The platform allows users to browse products, search and filter products, manage their wishlist, add products to their shopping cart, update quantities, and manage their shopping experience through a modern responsive interface.

---

## 🌐 Live Demo

🚀 **[View Nexora Live](YOUR_VERCEL_URL)**

> Replace `YOUR_VERCEL_URL` with the deployed Vercel URL.

Example:

https://nexora-ecommerce.vercel.app

---

## 📸 Preview

Nexora provides a modern shopping experience with:

- Modern landing page
- Product discovery
- Search and filtering
- Wishlist management
- Shopping cart
- Responsive navigation
- Responsive design
- Toast notifications

---

# ✨ Features

## 🏠 Home Page

- Modern hero section
- Featured categories
- Product highlights
- Brand experience section
- Responsive layout
- Call-to-action sections

---

## 🛍️ Product Shopping

Users can:

- Browse available products
- Search products
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

## ❤️ Wishlist

Users can:

- Add products to wishlist
- Remove products from wishlist
- View saved products
- See wishlist item count
- Add wishlist products directly to cart

The wishlist is connected to the backend and persists through the database.

---

## 🛒 Shopping Cart

Users can:

- Add products to cart
- Remove products from cart
- Update product quantities
- View product prices
- View total cart value
- See cart item count

The cart communicates with the backend through REST APIs.

---

## 🔔 Notifications

The application uses toast notifications to provide feedback for actions such as:

- Product added to cart
- Product added to wishlist
- Product removed from wishlist
- Product removed from cart
- Failed API requests

---

## 📱 Responsive Design

Nexora is designed to work across different screen sizes.

### Supported Devices

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

The navigation, product grids, shopping cart, wishlist, and other sections adapt to smaller screens.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router
- Vite
- CSS3
- React Icons
- React Toastify

## Backend

- Node.js
- Express.js
- REST APIs

## Database

- MySQL

## Development & Deployment

- Git
- GitHub
- VS Code
- npm
- Vercel

---

# 🏗️ Application Architecture

Nexora follows a frontend-backend architecture:

```text
                    ┌────────────────────┐
                    │      Nexora        │
                    │   E-Commerce App   │
                    └─────────┬──────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐        ┌────────▼────────┐
        │    Frontend    │        │     Backend     │
        │   React + Vite │◄──────►│ Node + Express  │
        └────────────────┘  API   └────────┬────────┘
                                           │
                                           │
                                   ┌───────▼────────┐
                                   │      MySQL     │
                                   │    Database    │
                                   └────────────────┘