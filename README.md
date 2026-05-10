# AI Disaster Management System

A comprehensive full-stack application designed to predict, manage, and respond to environmental disasters across the Indian Subcontinent using advanced Artificial Intelligence and real-time database management.

---

## 🧠 Logical Overview

The system is logically divided into three core pillars:
1. **AI-Powered Prediction Engine**: Connects to the Groq AI API (`llama3-8b-8192` model) to simulate and generate highly realistic, region-specific disaster predictions (Floods, Cyclones, Droughts) across India based on seasonal and geographical contexts.
2. **Citizen Feedback & Reporting**: Allows citizens to submit real-time geo-tagged emergency reports. These reports are stored persistently in a PostgreSQL database via Supabase.
3. **Intelligent Emergency Assistant**: An integrated chat interface that acts as an AI Disaster Management Assistant. It is programmed to provide actionable safety advice strictly adhering to **National Disaster Management Authority (NDMA)** and **National Disaster Response Force (NDRF)** guidelines, and defaults to Indian National Emergency numbers (112, 1078, 108).

---

## ⚙️ Technical Architecture

This project is structured as a **Monorepo**, cleanly separating the frontend user interface from the backend API services.

### Frontend (`/frontend`)
- **Framework**: React 18 built with Vite for hyper-fast compilation.
- **Styling**: Tailwind CSS combined with Radix UI components for a modern, accessible, and responsive dark-mode aesthetic.
- **Animations**: `framer-motion` for fluid, dynamic page transitions and interactive micro-animations (e.g., rotating progress bars on AI predictions).
- **Routing & Proxy**: The Vite development server is configured to proxy all `/api/*` requests to the local Express backend, preventing CORS issues during development.

### Backend (`/backend`)
- **Server**: Node.js with Express.
- **AI Integration**: Uses the `groq-sdk` to securely communicate with large language models. The backend enforces strict `json_object` parsing to ensure the AI always returns highly structured data tables to the frontend.
- **Database (BaaS)**: Supabase (PostgreSQL) is used to persist citizen reports. The backend handles data insertion and retrieval securely.

### Workspace Management
- **Concurrently**: The root `package.json` utilizes the `concurrently` package to seamlessly boot up both the Vite frontend (`localhost:3000`) and the Node.js backend (`localhost:5000`) with a single command.

---

## 📂 Project Structure

```
AI Disaster Management Dashboard/
├── frontend/                  # React Application
│   ├── src/
│   │   ├── components/        # Core UI Components (Prediction, Chat, Dashboard)
│   │   ├── main.tsx           # React Entry Point
│   │   └── App.tsx            # Main Application Layout & Navigation
│   ├── vite.config.ts         # Vite & Proxy Configuration
│   └── package.json           # Frontend Dependencies
│
├── backend/                   # Express API Server
│   ├── index.js               # Main Server Logic & API Routes
│   ├── .env                   # Secret Keys (Groq, Supabase)
│   └── package.json           # Backend Dependencies
│
├── package.json               # Root Monorepo Manager
└── .gitignore                 # Version Control Ignore Rules
```

---

## 🚀 How to Make the Web App Work Perfectly

To get the full functionality of the dashboard (AI Predictions, AI Chatbot, and Database Storage), you need to configure two external services: **Groq** and **Supabase**.

### Step 1: Get Your Groq AI Key
1. Go to the [Groq Console](https://console.groq.com/).
2. Create an account or log in.
3. Navigate to **API Keys** and generate a new key.
4. Copy the key.

### Step 2: Setup Supabase Database
1. Go to [Supabase](https://supabase.com/) and create a free account.
2. Click **New Project**, name it (e.g., `ai-disaster-db`), and create a secure database password.
3. Once your project is ready, go to **Project Settings** -> **API** to find your `Project URL` and `anon public` key. Copy both of these.
4. Navigate to the **SQL Editor** in your Supabase dashboard and run the following code to create the necessary table:
   ```sql
   CREATE TABLE reports (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     user_name TEXT,
     type TEXT NOT NULL,
     description TEXT,
     location TEXT,
     priority TEXT DEFAULT 'medium',
     status TEXT DEFAULT 'pending',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
   );
   ```

### Step 3: Configure Environment Variables
1. Open the `backend/.env` file in your code editor.
2. Paste the keys you copied from Groq and Supabase so it looks exactly like this:
   ```env
   PORT=5000
   GROQ_API_KEY=gsk_your_actual_groq_api_key_here
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_actual_supabase_anon_key_here
   ```

### Step 4: Install Dependencies
From your terminal, at the **root** folder of your project, run:
```bash
npm install
```

### Step 5: Start the Full-Stack Application
From the root directory, boot up both the frontend and backend simultaneously by running:
```bash
npm run dev
```

- 🖥️ **Frontend UI** will be available at: `http://localhost:3000`
- ⚙️ **Backend API** will be running at: `http://localhost:5000`

> **Note:** If you don't configure Supabase, the AI prediction and chatbot will still work flawlessly, but the Community Reports section will not load or save data.