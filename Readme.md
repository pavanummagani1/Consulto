# 🩺 Consulto – Teleconsultation Platform

Consulto is a full-stack teleconsultation web application that allows patients to book appointments, doctors to manage consultations, and admins to oversee the entire ecosystem including doctor management and appointments. It includes user authentication, doctor-patient appointment handling, and Stripe payment integration.

---
## 🛠️ Technologies Used

- **Frontend:** React.js, Vite
- **Styling & UI:** CSS3, Material UI (MUI), Ant Design (AntD)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT, Google OAuth, Firebase Authentication
- **File Uploads:** Multer + Cloudinary
- **Payments:** Stripe API


---
## 🚀 Features

- 👩‍⚕️ Admin panel to manage doctors, appointments, and categories.
- 🧑‍💻 User (client) registration, login (including Google OAuth), and appointment booking.
- 👨‍⚕️ Doctor login and access to their appointments.
- 💳 Secure Stripe payments with webhook handling.
- 🔐 JWT-based authentication.

---
## 🧪 How to Experience the Application

### 👤 Client Dashboard
- Use **Guest Sign In** or **Google Login** to access the application as a patient.
- You can browse doctors, book appointments, view appointment history, and update your profile.

### 👨‍⚕️ Doctor Dashboard
To experience the doctor dashboard:
Username: 
Password: 123456

---

## 📁 Project Structure

/routes
/admin → Admin-related APIs
/doctor → Doctor login and appointments
/ → Client routes: register, login, appointments, etc.
/api/payments → Payment processing routes


---

## 🔗 API Endpoints

### 📌 Admin Routes (`/admin`)

| Method | Endpoint             | Description                         |
|--------|----------------------|-------------------------------------|
| POST   | `/adddoctor`         | Add a new doctor with image upload |
| GET    | `/doctors`           | Get list of all doctors            |
| GET    | `/categories`        | Get all medical categories         |
| POST   | `/login`             | Admin login                        |
| DELETE | `/deletedoctor`      | Delete a doctor                    |
| GET    | `/appointments`      | Get all appointments               |

---

### 👨‍💻 Client Routes (`/`)

| Method | Endpoint                              | Description                           |
|--------|---------------------------------------|---------------------------------------|
| GET    | `/categories`                         | Get categories                        |
| GET    | `/doctors`                            | Get list of doctors                   |
| GET    | `/doctors/:id`                        | Get single doctor by ID              |
| POST   | `/register`                           | Register a new user                  |
| POST   | `/login`                              | Login existing user                  |
| POST   | `/appointments`                       | Book a new appointment               |
| GET    | `/appointments/:userid`               | Get user appointments                |
| GET    | `/userdetails/:userid`                | Get user details                     |
| GET    | `/reviews`                            | Get reviews                          |
| POST   | `/auth/google`                        | Google login                         |
| POST   | `/forgotpassword`                     | Send reset password link             |
| PATCH  | `/updatepassword`                     | Update new password                  |
| PATCH  | `/userdetails/:userid`                | Update user profile (with image)     |
| PATCH  | `/updatestatus`                       | Update appointment status            |

---

### 👨‍⚕️ Doctor Routes (`/doctor`)

| Method | Endpoint                        | Description                          |
|--------|---------------------------------|--------------------------------------|
| GET    | `/doctor/:id`                  | Get doctor-specific appointments     |
| POST   | `/login`                        | Doctor login                         |
| GET    | `/appointments/:doctorId`       | Get appointments for doctor          |

---

### 💳 Payment Routes (`/api/payments`)

| Method | Endpoint                    | Description                         |
|--------|-----------------------------|-------------------------------------|
| POST   | `/create-payment-intent`    | Create Stripe payment intent        |
| POST   | `/webhook`                  | Handle Stripe webhook events        |

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (or your DB of choice)
- **Authentication:** JWT, Google OAuth
- **Payments:** Stripe API
- **File Upload:** Multer
- **Frontend:** React (or any frontend you used)

---

## ⚙️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/consulto.git
   cd consulto


2. Install dependencies:
npm install


3. SetUp .env
Frontend:
VITE_BASE_URL=

Backend: 
PORT=
MONGODB_URI=

Cloudinary
CLOUNDINARY_NAME=
CLOUNDINARY_API_KEY=
CLOUNDINARY_SECRET_KEY=

Auth & Email
LOGIN_SECRET_KEY=
EMAIL=
EMAIL_PASS=

Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=

shell
Copy
Edit


4. Start the Server
Frontend: npm run dev
Backend: node index.js


Created by Pavan Kalyan Ummagani
📍 Hyderabad, India
📧 pavanummagani1@gmail.com
🌐 Linkedin: https://www.linkedin.com/in/pavan-kalyan07/