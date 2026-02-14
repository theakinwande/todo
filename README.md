## Modern React Todo Application

A professional, full-stack Todo Management system built with React, React Router, and Tailwind CSS. This application features advanced server-side communication, custom UI components, and robust error handling.

## Key Features

- **Full CRUD Integration**: Create, Read, Update, and Delete tasks directly with the api.oluwasetemi.dev backend.
- **Optimized Pagination**: A custom "sliding window" pagination that handles hundreds of pages by showing only 5 buttons at a time.
- **Live Search & Filter**: Real-time task filtering by name and status (All, Completed, Pending) without page reloads.
- **Responsive Task Details**: A dedicated dynamic route (/todo/:id) to view specific task metadata.
- **Fault Tolerance**: Implements a global ErrorBoundary and a custom 404 Not Found page for a seamless user experience.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Routing**: React Router DOM v7
- **API Service**: Fetch API with custom service wrappers
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the project

```bash
git clone <https://github.com/Oluwabukunmi07/todo-app.git>
cd todo-app
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## API Documentation

The application connects to the following endpoints:

- `GET /tasks?page=1&limit=10` - Fetch paginated tasks
- `POST /tasks` - Create a new task (requires `name` and `status`)
- `PUT /tasks/:id` - Update task status
- `DELETE /tasks/:id` - Remove a task

## Project
