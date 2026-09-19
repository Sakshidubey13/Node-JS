# Node.js MongoDB CRUD Application

A full-featured, responsive CRUD (Create, Read, Update, Delete) web application built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **EJS template engine** following the **MVC Architecture**.

---

## 🚀 Features

1. **Complete CRUD Operations:**
   - **Create:** Add new records with Name, Email, Phone, Image upload, and Status (Active/Inactive).
   - **Read:** Display all records in a responsive data table.
   - **Update:** Edit existing user details and replace profile images.
   - **Delete (Soft Delete):** Soft delete records by toggling the `status` boolean field (`false` = deleted).
   - **Multiple Delete:** Select multiple records via checkboxes and delete them in bulk.
2. **Form Validation:** Robust server-side validation for all fields using `express-validator`.
3. **Advanced Searching:** Search records instantly by **Name**, **Email**, or **Phone number**.
4. **Pagination:** Seamless pagination with previous, next, and page number navigation.
5. **Dynamic Records Limit:** Choose how many records to display per page (**5, 10, or 15 records**).
6. **MVC Architecture:** Clean separation of concerns (Models, Views, Controllers, Routes, and Config).
7. **Modern Responsive UI:** Built with **Bootstrap 5**, **FontAwesome icons**, and vanilla JavaScript.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose ODM
- **Templating Engine:** EJS (Embedded JavaScript Templates)
- **Validation:** `express-validator`
- **File Upload:** `multer`
- **Frontend UI:** Bootstrap 5, HTML5, CSS3, JavaScript

---

## 📁 Project Structure

```text
Curd_operation/
├── config/
│   ├── db.js            # MongoDB connection configuration
│   └── multer.js        # Multer storage configuration for image uploads
├── controllers/
│   └── crudController.js# Business logic for CRUD, search, pagination, soft delete & bulk delete
├── models/
│   └── Record.js        # Mongoose Schema (name, email, phone, image, status, created_date, updated_date)
├── routes/
│   └── crudRoutes.js    # Express route definitions
├── views/
│   ├── partials/
│   │   ├── header.ejs   # HTML head, Bootstrap CSS, Navbar
│   │   └── footer.ejs   # Footer scripts & closing tags
│   ├── index.ejs        # Main listing table, search bar, limit selector, pagination, checkboxes
│   ├── create.ejs       # Add record form with validation errors display
│   └── edit.ejs         # Edit record form
├── public/
│   ├── uploads/         # Stored profile images
│   └── css/             # Custom CSS stylesheets
├── package.json         # Project dependencies and scripts
└── server.js            # Application entry point
```

---

## 📋 Step-by-Step Installation & Running Guide

### Step 1: Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **MongoDB** (running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### Step 2: Clone or Open Project Directory
Open your terminal and navigate to the project directory:
```bash
cd "D:\Node JS\Curd_operation"
```

### Step 3: Install Dependencies
Install all required npm packages:
```bash
npm install
```

### Step 4: Start MongoDB Service
Make sure your MongoDB server is running:
- On Windows, ensure the MongoDB service is running or execute `mongod`.

### Step 5: Run the Application
Start the Node.js server:
```bash
npm start
```
*You should see output similar to:*
```text
Server is running on http://localhost:3000
MongoDB Connected: 127.0.0.1
```

### Step 6: Access the Website
Open your web browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 💡 How to Use

- **Add Record:** Click on the green **"Add New Record"** button in the top navbar. Fill in Name, Email, Phone, Image, and Status, then click **Save Record**.
- **Search:** Use the search bar on the top-right of the table to search by Name, Email, or Phone.
- **Change Entries Limit:** Select **5**, **10**, or **15** from the "Show X entries" dropdown on the top-left.
- **Edit Record:** Click the green pencil icon in the Action column.
- **Soft Delete:** Click the red trash icon in the Action column to soft-delete an individual record (`status` set to `false`).
- **Multiple Delete:** Check the boxes next to multiple records in the table and click the red **"Delete Selected"** button at the top.
