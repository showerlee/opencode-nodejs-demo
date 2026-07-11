# React + Node.js Demo Project

A full-stack todo application built with React (frontend) and Node.js/Express (backend).

## Features

- **Full-stack architecture**: React frontend + Node.js/Express backend
- **RESTful API**: CRUD operations for todos
- **Real-time server status**: Monitor backend server health
- **Responsive design**: Works on desktop and mobile
- **Modern tooling**: Vite for fast development

## Tech Stack

- **Frontend**: React 19, Vite
- **Backend**: Node.js, Express, CORS
- **Styling**: CSS with modern gradients and animations

## Project Structure

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
├── index.html
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode

1. Start the backend server (in one terminal):
   ```bash
   npm run server
   ```

2. Start the frontend development server (in another terminal):
   ```bash
   npm run dev
   ```

3. Open your browser to:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

#### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `GET /api/health` - Server health check

## Features in Detail

### Todo Management
- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- View todo statistics

### Server Monitoring
- Real-time server status checks
- Automatic refresh every 30 seconds
- Manual refresh option

### Error Handling
- Graceful error handling for API failures
- User-friendly error messages
- Retry functionality

## Development Notes

- The frontend proxies API requests to the backend via Vite configuration
- CORS is configured on the backend for development
- The application uses modern React hooks and functional components
- Styling uses CSS custom properties and modern layout techniques

## License

ISC