Food Delivery Admin Panel:
Overview

The Food Delivery Admin Panel is a full-stack web application designed for administrators to manage and monitor food delivery operations.
It provides an intuitive dashboard to track users, categories, products, and orders, along with a summary of overall performance and revenue.

This system is built to demonstrate CRUD operations across multiple collections with MongoDB Aggregation for insights and analytics.

Objective:
To develop a Food Delivery Admin Panel where the admin can:
Manage Users, Categories, Products, and Orders
View a Dashboard Summary with key metrics like total users, products, orders, and total revenue
Create new orders dynamically with real-time total calculation
Utilize MongoDB Aggregation Pipeline to generate statistical insights

About Dashboard

The Dashboard in the Food Delivery Admin Panel serves as the central control center for administrators.
It provides a real-time overview of all key metrics within the food delivery system — enabling quick decision-making and performance tracking at a glance.
Objective
To give the admin a data-driven summary of:
Total number of Users, Products, and Orders
The Total Revenue generated
Additional insights like daily order count, new user growth, and best-performing category

About Users Management Page

The Users Management Page is designed to allow administrators to efficiently manage all registered users within the food delivery platform.
It serves as the control panel for handling user information — from registration to deletion — ensuring smooth system operation and data accuracy.

About Products Management Page

The Products Management Page allows administrators to manage all the food items available on the platform.
This module connects directly with the backend and database to handle CRUD operations (Create, Read, Update, Delete) on products while maintaining their association with categories.

About Orders Management Page

The Orders Management Page is one of the most crucial modules in the Food Delivery Admin Panel.
It enables administrators to create, view, and manage customer orders by linking users with products, quantities, prices, and totals.
This page provides a clear snapshot of daily orders, total amounts, and customer purchase trends.


Technologies Used

The Food Delivery Admin Panel is developed using the MERN (MongoDB, Express, React, Node.js) stack to deliver a robust, scalable, and responsive web application. The frontend is built with React.js (using Vite) to provide a fast, interactive, and component-driven user interface for managing dashboard analytics, users, products, categories, and orders. Styling is implemented using CSS3 with modern UI techniques for a clean and responsive layout. The backend is powered by Node.js and Express.js, offering RESTful APIs for CRUD operations and seamless data communication between the frontend and the database. MongoDB serves as the primary database, with Mongoose managing schema definitions, data validation, and relationships. The project also utilizes dotenv for environment configuration, CORS for secure cross-origin requests, and Nodemon for efficient backend development. Additional tools like Postman, GitHub, and MongoDB Compass were used for testing, version control, and database management. Together, these technologies create a complete, efficient, and modern admin management system for food delivery operations.
