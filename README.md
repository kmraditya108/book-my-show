# book-my-show
Scalable, secure movie ticket booking backend featuring JWT RBAC, concurrent seat locking, MongoDB transactions, and RESTful API architecture built with Node.js &amp; Express, MongoDB, Mongoose, and JWT authentication.


# BookMyShow Backend API 🎬🍿

A production-ready RESTful backend service for a movie ticket booking system built with **Node.js, Express, MongoDB, and Mongoose**. Designed with security, data integrity, and scalability in mind to handle concurrent seat reservations and user access control.

---

## ⚡ Core Technical Highlights

- **Secure Authentication & RBAC:** Implemented JWT-based stateless authentication with password hashing via `bcrypt` and custom middleware for Role-Based Access Control (`User` vs. `Admin`).
- **Data Integrity & Concurrency:** Managed relational-like data structures in MongoDB using `Mongoose` schema references, populations, and transactional patterns to prevent double-booking of seats.
- **RESTful API Design:** Structured around clean MVC architecture, centralized error-handling middleware, and HTTP status code standardization.
- **Input Validation & Security:** Sanitized user requests and secured sensitive endpoints against unauthorized access and privilege escalation.

---

## 🛠️ Tech Stack & Concepts

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MongoDB (Atlas / Local)
- **ODM:** Mongoose
- **Security & Auth:** JSON Web Tokens (JWT), Bcrypt.js, CORS, Dotenv

---

## 🏗️ Architecture & Database Design

The application uses an interconnected schema design to handle complex booking flows:

- **User Model:** Stores credentials, roles (`Admin`, `User`), and booking history.
- **Movie Model:** Stores metadata, genres, duration, release dates, and active status.
- **Show Model:** Maps a `Movie` to specific time slots, pricing, and seat layouts.
- **Booking Model:** Atomically links a `User` to a specific `Show` and selected seats.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas Cluster URI

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/kmraditya108/book-my-show.git](https://github.com/kmraditya108/book-my-show.git)
   cd book-my-show
