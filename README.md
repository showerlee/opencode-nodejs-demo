# Product Management System - Node.js + React

A modern full-stack product management application with glassmorphism UI, built with React (frontend) and Node.js/Express (backend).

## ✨ Features

- **Product CRUD**: Create, Read, Update, Delete products with validation
- **Glassmorphism UI**: Modern glass-like interface with smooth animations
- **Real-time Server Monitoring**: Live health checks with status indicators
- **Responsive Design**: Fully responsive across all devices
- **REST API**: Matches Java Spring Boot interface for compatibility

## 🛠️ Tech Stack

**Frontend**: React 19, Vite, CSS3 animations
**Backend**: Node.js, Express, CORS

## 📁 Project Structure

```
opencode-nodejs-demo/
├── src/
│   ├── components/
│   │   ├── AddTodo.jsx
│   │   ├── ServerStatus.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── server.js
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Running

```bash
# Install dependencies
npm install

# Terminal 1: Start backend server
npm run server
# Backend: http://localhost:3000

# Terminal 2: Start frontend development server
npm run dev
# Frontend: http://localhost:5173
```

### Available Scripts
- `npm run dev` - Start frontend (port 5173)
- `npm run server` - Start backend (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔌 API Endpoints

**Product Management**
- `GET /api/todos` - Get all products
- `POST /api/todos` - Create new product
- `PUT /api/todos/:id` - Update product
- `DELETE /api/todos/:id` - Delete product

**Health & Status**
- `GET /.well-known/health` - Server health check

## 📦 Product Model

```json
{
  "id": 1,
  "text": "Product name",
  "completed": false
}
```

## 🔗 Compatibility

Fully compatible with opencode-java-demo project:
- Same API endpoints and data structure
- Consistent error handling
- Interchangeable endpoints

## 📄 License

ISC