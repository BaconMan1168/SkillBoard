# 📚 SkillBoard: Academic Support Platform

**LIVE APPLICATION LINK:** [https://skillboard-client.onrender.com/](https://skillboard-client.onrender.com/)

---

## The Problem

Students frequently face a gap in academic support: the lack of accessible and immediate help outside of a teacher's working hours. When a student gets stuck on a concept or homework problem during evening study sessions, students face long delays that stall learning momentum and motivation. Current solutions are inadequate: a teacher might only respond in a timely manner just a few hours after school ends. Generic online forums fail to provide the context and class-specific assistance, especially for less standardized courses like 'AT Multivariable Calculus'.

## The Solution

SkillBoard is a web platform designed for faster peer-to-peer tutoring and help. It creates a structured, course-specific community where help comes much faster and with more specificity to our schools courses. Students seeking help can post questions directly tied to a specific course, and other students can quickly offer assistance through commenting on said post.

## Connection to ‘Learning, Skills & Opportunity’

This web app enhances learning for both the student seeking help and the one offering assistance. For the one receiving help, the immediate peer support provided by Skillboard preserves learning momentum and motivation without having to wait for the next day, especially if the work is urgent. With multiple students being able to comment on the same posted question, several alternative perspectives and explanations can help students better understand the concept as a whole. For the ones giving assistance, the ability to help fellow classmates in a variety of topics gives them an opportunity to solidify their own knowledge through teaching. Additionally, students develop both communication and mentorship skills by being able to communicate complex concepts clearly, and strengthen their collaborative skills by working together to solve problems. Finally, by offering a free platform that provides high quality and timely assistance, students have an opportunity to learn more and to improve their teaching in a less formal manner.

## ⚙️ Technical Stack & Development

### Technologies Used

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [React] | User interface and client-side logic. |
| **Styling** | [CSS Modules] | Design and visual aesthetics. |
| **Backend/API** | [Node.js (Express)] | Handling user authentication and post management. |
| **Database** | [PostgreSQL, Prisma ORM] | Storing users, courses/topics, posts, and comments. |

## 🏗️ Application Architecture

Skillboard uses a **Monorepo** structure since it contains both the frontend and backend code, but each operate as two separate codebases.

---

### Frontend Architecture (Client)

The frontend is a **Single Page Application (SPA)** built with **React** and **React-Router-DOM** 

* **Role:** Handles all presentation logic, user interaction, and client-side routing.  
* **Location:** Resides in the `client/skillboard-client` directory.

#### Libraries and Code Structure
---
**Key Libraries Used**
- **React** — building component-based user interfaces  
- **React Router DOM** — managing client-side navigation and routing  
- **Axios** — performing HTTP requests to the backend API  
- **CSS Modules** — providing scoped, modular styling per component  

**Code Structure**
- `components/` – Reusable UI components  
- Main routing handled in `App.jsx` using `<BrowserRouter>`  

---

### Backend Architecture (Server)

The backend is built with **Node.js/Express** and follows a structure that aligns loosely with the **Model-View-Controller** pattern.

* **Role:** Handles user authentication, data persistence, and business logic.  
* **Location:** Resides in the `server` directory.

#### Libraries and Code Structure
---
**Key Libraries Used**
- **Express** — routing and handling HTTP requests  
- **Prisma ORM** — interacting with the PostgreSQL database   
- **jsonwebtoken (JWT)** — generating and verifying auth tokens for authentication  
- **bcryptjs** — hashing and comparing passwords for authentication 
- **cors** — enabling cross-origin requests from the frontend  
- **dotenv** — loading environment variables from `.env` files  

**Code Structure**
- `routes/` – Endpoint definitions for auth, posts, comments, topics  
- `controllers/` – Core business logic for each feature  
- `middleware/` – JWT authentication 
- `prisma/` – Prisma schema and seed scripts  
- `app.js` – Initializes middleware, routes, and server startup  

## Installation & Local Setup

To run Skillboard locally for development or reproduction

1.  **Prerequisites:** Ensure you have Node.js (v22+) and PostgreSQL installed.
2.  **Clone the Repository:**
    ```bash
    git clone [(https://github.com/BaconMan1168/SkillBoard)]
    ```
3.  **Setup Backend (Server):**
    * Navigate to the server directory: `cd SkillBoard/server`
    * Install dependencies: `npm install`
    * Create a file named `.env` and add your database connection string and secrets:
      ```
      DATABASE_URL="postgresql://user:password@host:port/database"
      SECRET_KEY=yoursecretkey
      ```
    * Apply the schema and seed the database: `npx prisma db push && npx prisma db seed`
    * Start the backend: `npm start` (Runs on port 3000)

4.  **Setup Frontend (Client):**
    * Navigate to the client directory: `cd ../client/skillboard-client`
    * Install dependencies: `npm install`
    * Create a file named `.env` and set the backend URL:
      ```
      VITE_API_URL=http://localhost:3000
      ```
    * Start the frontend: `npm run dev` (Runs on port 5173)

The application will be accessible at the frontend local URL.

## How to use Skillboard:

### Creating an Account:
1. Register for an account using your name, email, and password
2. Login to your newly created account using your email and password

### Logging out:
1. Use the navigation bar to logout by clicking on 'Logout'

### Joining a Topic Page
1. Use the navigation bar to visit the 'Set Topics' Page.
2. You can either add a topic/class which doesn't exist by filling out the text input field, or join an existing topic by clicking on its checkbox and 'Save Topics'

### Viewing and Creating Posts
1. To view posts, use the navigation bar to visit your desired topic page by clicking on the topic name
2. To create a post, fill out the title and body input fields at the top of the page and click on 'Create Post'

### Updating or Deleting Posts
1. To see your posts, use the navigation bar to visit the 'Your Posts' page
2. To update a post, click on the 'Edit' button, make changes to the input fields, and click save.
3. To delete a post, click on the 'Delete' button

### Commenting on a post
1. Use the navigation bar to visit your desired topic page by clicking on the topic name
2. Find your desired post and click on the 'Show Comments' button
3. Fill out the 'Write a Comment' input field and click 'Submit'

### Team & Contributions

* **[Daniel]:** Full-Stack Development (React, Node.js, API design, Database integration).
