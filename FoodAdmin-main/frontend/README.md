# Food Delivery Admin Panel (Machine Test)

## Requirements
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm

## Setup backend
cd backend
cp .env.example .env         # or create .env with MONGO_URI and PORT
npm install
npm run dev                  # starts backend at http://localhost:5000

## Setup frontend
cd frontend
npm install
npm run dev                  # starts frontend (vite) at http://localhost:5173 by default

## Usage
1. Start backend then frontend.
2. Open frontend in browser, use sidebar to access Dashboard, Users, Categories, Products, Orders.
3. Create some categories, add products, add users, then create orders.
4. Dashboard reads aggregation from /api/dashboard.

## Submission
- Commit both `backend` and `frontend` folders to GitHub.
- Record a screen video demonstrating:
  - Creating categories, products, users.
  - Creating an order.
  - Showing the Dashboard totals (Users, Products, Orders, Revenue).
- Share GitHub repo link and video.

