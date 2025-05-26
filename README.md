# College Finder

Welcome to **College Finder** – a platform designed to help students research and explore colleges, exams, and scholarships with ease. Our goal is to provide accurate and up-to-date information to assist students in making informed decisions about their education.

🌍 **Live Website:** [College Finder](https://collegefinder.site)

## 🚀 Features
- 🔍 **Search & Explore** – Find colleges based on location, courses, and ranking.
- 🎓 **Exams Section** – Get details about entrance exams and eligibility criteria.
- 💰 **Scholarships** – Explore available scholarships for students.
- ❤️ **Like & Save** – Users can like and save colleges, exams, and scholarships to their profiles.
- 📝 **Student Registration & Dashboard** – Users can create profiles, manage preferences, and track saved items.
- 📩 **Email & SMS Notifications** – Receive updates and alerts for important changes.
- 🛠 **Admin Panel** – Manage colleges, exams, scholarships, and user interactions securely.
- 🔎 **SEO Optimized** – Built with Next.js for fast performance and better search engine visibility.

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind
- **Backend:** Express.js, Node.js, MongoDB
- **Authentication:** JWT-based authentication
- **Email System:** Nodemailer (SMTP for emails)
- **Hosting:** Vercel

## 🔧 Installation & Setup
To run this project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nileshkumaryadav1/collegefinder.git
   cd collegefinder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root directory of your project and add the following environment variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

MONGODB_URI=mongodb://localhost:27017/collegefinder
JWT_SECRET=YOUR_JWT_SECRET

SENDER_EMAIL=YOUR_EMAIL
SENDER_EMAIL_APP_PASSWORD=YOUR_EMAIL_APP_PASSWORD

EMAIL_USER=YOUR_EMAIL
EMAIL_PASS=YOUR_EMAIL_APP_PASSWORD

SESSION_SECRET=YOUR_SESSION_SECRET

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The project will be available at **http://localhost:3000**

5. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```
   Or deploy directly to **Vercel**.

## 🤝 Contributing
We welcome contributions! If you’d like to contribute:
1. **Fork the repository**
2. **Create a new branch** (`feature-branch`)
3. **Commit your changes**
4. **Push to your fork**
5. **Submit a Pull Request**

Check out our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📬 Contact
For any questions or support, reach out to us:
- Email: collegefindermail@gmail.com
- GitHub Issues: [Report an Issue](https://github.com/nileshkumaryadav1/collegefinder/issues)

Happy coding! 🎓🚀
