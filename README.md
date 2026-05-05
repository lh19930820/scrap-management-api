# ♻️ Scrap API

Backend API for the Scrap Management System.

---

## 🚀 Overview

This API handles all business logic for a scrap collection system, including:

* Product management
* Transaction processing (import/export)
* Inventory tracking
* Profit and analytics
* Role-based authentication

---

## 🧩 Features

### 🔐 Authentication

* JWT-based login
* Role-based access:

  * Admin
  * Staff

---

### 📦 Products

* Create / update / delete products
* Support multiple units:

  * `kg`
  * `item`
* Default price per product

---

### 💰 Transactions

* Multi-item transactions
* Supports:

  * `import` (buy)
  * `export` (sell)
* Automatic total calculation

---

### 📊 Analytics & Reporting (NEW 🔥)

The system provides real-time business insights:

#### 📈 Overview

* Total import cost
* Total export revenue
* Profit calculation

#### 📦 Product Statistics

* Total quantity per product
* Total revenue per product

#### 📅 Daily Statistics

* Revenue by date
* Import vs export trends

---

## 🧠 Core Logic

```text
Total = Quantity × Price
Grand Total = Sum(Item Totals)
Profit = Total Export - Total Import
```

---

## 🏗️ Project Structure

```bash
scrap-management-api
├── src/
│   ├── config/ # Database connection
│   ├── controllers/ # Request handlers
│   ├── middleware/ # Auth & error handling
│   ├── models/ # Mongoose schemas
│   └── validators/ # Zod validation schemas
│
├── index.js # Entry point
├── README.md        
├── .prettierrc 
└── package.json
```

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Zod (Validation)
* JWT Authentication

---

## 📡 API Endpoints

### Auth

* POST `/api/login`
* POST `/api/register`

---

### Products (Admin)

* GET `/api/products`
* POST `/api/products`
* PUT `/api/products/:id`
* DELETE `/api/products/:id`

---

### Transactions (Admin & Staff)

* POST `/api/transactions`
* GET `/api/transactions`

---

### 📊 Stats (Admin)

#### Overview

* GET `/api/stats/overview`

#### Product Statistics

* GET `/api/stats/products`

#### Daily Statistics

* GET `/api/stats/daily`

---

## 🚀 Future Improvements

* Customer management
* Export reports (Excel)
* Offline support
* Real-time updates

---

## 👨‍💻 Author

Hien Le  
Frontend Developer transitioning to Fullstack  
8+ years experience building production web applications
