# 🛒 Products API

A modern, secure, and scalable RESTful API for e-commerce platforms, built with Node.js, Express, and MongoDB. This API supports user authentication, product management, and robust role-based access control, with beautiful auto-generated documentation via Swagger.

---

## 🚀 Features
- **User Authentication** (JWT-based)
- **Role-based Authorization** (Admin & Customer)
- **Product CRUD** (Create, Read, Update, Delete)
- **Pagination & Search** for products
- **Swagger API Docs**
- **CORS** for local and production
- **Environment-based config**

---

## 🏗️ Project Structure

```
products-api/
├── node_modules/
├── src/
│   ├── apps/
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.mjs
│   │   │   │   └── auth.controller.test.mjs
│   │   │   ├── models/
│   │   │   │   └── user.model.mjs
│   │   │   ├── repositories/
│   │   │   │   ├── auth.repository.mjs
│   │   │   │   └── auth.repository.test.mjs
│   │   │   ├── routers/
│   │   │   │   └── auth.route.mjs
│   │   │   └── usecases/
│   │   │       ├── auth.usecase.mjs
│   │   │       └── auth.usecase.test.mjs
│   │   ├── products/
│   │   │   ├── controllers/
│   │   │   │   ├── product.controller.mjs
│   │   │   │   └── product.controller.test.mjs
│   │   │   ├── models/
│   │   │   │   ├── cart.model.mjs
│   │   │   │   ├── order.model.mjs
│   │   │   │   └── product.model.mjs
│   │   │   ├── repositories/
│   │   │   │   ├── product.repository.mjs
│   │   │   │   └── product.repository.test.mjs
│   │   │   ├── routers/
│   │   │   │   └── prouduct.route.mjs
│   │   │   └── usecases/
│   │   │       ├── product.usecase.mjs
│   │   │       └── product.usecase.test.mjs
│
│   ├── infrasructure/
│   │   ├── config/
│   │   │   └── swaggerConfig.mjs
│   │   └── constants/
│   │       └── constants.mjs
│
│   ├── middlewares/
│   │   ├── auth.middleware.mjs
│   │   ├── error.middleware.mjs
│   │   └── role.middleware.mjs
│
│   ├── utils/
│   │   ├── pagination.utils.mjs
│   │   └── search.utils.mjs
│
│   └── index.mjs
│
├── .env
├── .gitignore
├── babel.config.json
├── jest.config.mjs
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
└── Ecommerce-API-with-register.postman_collection.json

```

---

## ⚙️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/NagulmeeraShaik7/products-api
cd products-api
npm install
```

### 2. Environment Variables
Create a `.env` file in the root:
```
MONGO_URI=mongodb+srv://shaiknagulmeera9:nagulmeera255@cluster0.kxpxa9g.mongodb.net/
PORT=3000 # or any port you prefer
JWT_SECRET=your_jwt_secret
```

### 3. Run the Server
```bash
npm run dev   # for development (nodemon)
npm start     # for production
```

---

## 🧪 Running Unit Tests

Run all unit tests using Jest:

```bash
npx jest
```

---

## 📚 API Documentation

### 🔑 Auth Endpoints
| Method | Endpoint         | Description           |
|--------|------------------|----------------------|
| POST   | `/api/register`  | Register new user    |
| POST   | `/api/login`     | Login, get JWT token |

#### Example: Register
```json
POST /api/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Example: Login
```json
POST /api/login
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

---

### 🛍️ Product Endpoints
| Method | Endpoint           | Description                | Auth      | Role    |
|--------|--------------------|----------------------------|-----------|---------|
| GET    | `/api/products`    | List products (paginated)  | Required  | Any     |
| POST   | `/api/products`    | Add new product            | Required  | Admin   |
| PUT    | `/api/products/:id`| Update product             | Required  | Admin   |
| DELETE | `/api/products/:id`| Delete product             | Required  | Admin   |

#### Example: Get Products
```http
GET /api/products?page=1&limit=10&search=laptop
Authorization: Bearer <token>
```

#### Example: Add Product (Admin only)
```json
POST /api/products
Authorization: Bearer <admin_token>
{
  "name": "Laptop",
  "category": "Electronics",
  "price": 1200,
  "description": "A high-performance laptop",
  "image": "http://example.com/laptop.jpg"
}
```

---

## 🔒 Authentication & Authorization
- **JWT** is required for all product endpoints.
- **Admin** role is required for creating, updating, and deleting products.
- **Customer** role can only view products.

---

## 🌐 Swagger API Docs
- Interactive API docs available at:
  - Local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
  - Production: [https://products-api-6psx.onrender.com/api-docs](https://products-api-6psx.onrender.com/api-docs)

---

## 🧪 Example API Scenarios

### 1. Register & Login
- Register a new user, then login to receive a JWT token.
- Use the token for all subsequent requests.

### 2. Admin Product Management
- Login as an admin, then:
  - Add a new product
  - Update a product
  - Delete a product

### 3. Customer Browsing
- Login as a customer, then:
  - List and search products (with pagination)

---

## 🛠️ Tech Stack
- Node.js, Express, MongoDB, Mongoose
- JWT, bcryptjs
- Swagger (OpenAPI)
- Babel, Jest (for testing)

---

## 👤 Author

Nagulmeera Shaik



