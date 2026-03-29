# 🏏 Cricket Pitch Booking System

A full-stack cricket pitch booking system built with:

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Sequelize ORM)
- **Caching & Locking:** Redis
- **Real-time Updates:** Socket.IO

---

# 🚀 Features

- 🔐 User Authentication (Login/Register)
- 🏏 View available cricket pitches
- 📅 Select date and view available time slots
- ⏳ Temporary slot reservation (2 minutes via Redis)
- ⚡ Real-time slot updates using WebSockets
- ✅ Confirm booking
- 📖 View user bookings

---

# 📡 API Endpoints

### Auth

- `POST /api/v1/auth/register` → Register user
- `POST /api/v1/auth/login` → Login user
- `GET /api/v1/auth/current-user` → Get logged-in user

### Pitches

- `GET /api/v1/pitch` → Get all pitches

### Slots

- `GET /api/v1/slot?pitchId=&bookingDate=` → Get slots for a pitch

### Booking

- `POST /api/v1/booking/reserve-slot` → Temporarily reserve slot (Redis - 2 min)
- `POST /api/v1/booking/confirm-booking` → Confirm booking
- `GET /api/v1/booking/my-bookings` → Get user bookings

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd cricket-pitch-booking
```

## 2️⃣ Setup Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000

# Database
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

# JWT
JWT_SECRET=your_secret

# Redis
REDIS_URL=redis://:password@127.0.0.1:6379
```

## 3️⃣ Create Database

Create a PostgreSQL database manually:

```
CREATE DATABASE your_db_name;
```

## 4️⃣ Run Database Sync

This will create all tables:

```
node sync.js
```

## 5️⃣ Start Redis Server

Local Redis:

```
redis-server redis.windows.conf
```

Test Redis:

```
redis-cli ping
```

## 6️⃣ Start Backend Server

```
npm install
npm start
```

## 7️⃣ Start Frontend

```
cd frontend
npm install
npm start
```

Frontend runs on:

http://localhost:3000

## 🔄 Booking Flow

1. User logs in / registers
2. Selects a pitch and date
3. Views available slots
4. Clicks a slot →
5. Slot is temporarily reserved (Redis - 2 mins)
   WebSocket emits event → all users see it as unavailable
6. User confirms booking →
   Slot stored in PostgreSQL
