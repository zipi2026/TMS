# Task Management System

## Technology Stack

- Frontend: Angular + TypeScript
- Backend: Node.js + Express
- Database: SQL Server

## TL;DR
Task Management System is a web application for managing tasks and assignments. It combines an Angular + TypeScript frontend with a Node.js + Express backend, backed by SQL Server for persistent data storage.

## Overview
Task Management System provides a task management interface where users can create, view, update, and organize tasks. The frontend is built with Angular for a responsive user experience, while the backend API handles all business logic, user authentication, and database operations through SQL Server.

## Installation

```bash
git clone <repository-url>
cd Task-Management-System

cd client
npm install

cd ../server
npm install
```

> Note: Ensure SQL Server is properly configured and accessible before running the backend.

## Running the project

### Backend
From the `server` folder:
```bash
npm start
```
The Express server runs on port `3000` (or the configured port in your environment).

### Frontend
From the `client` folder:
```bash
npm start
```
This starts the Angular development server on port `4200`.

### Production / Build
The frontend can be built with:
```bash
cd client
npm run build
```
This generates optimized production files in the `dist/` directory.

## Environment variables

### Server
Create a `.env` file in the `server` directory:
```env
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=TaskManagementDB
DB_DRIVER=ODBC Driver 17 for SQL Server
```

### Client
Before running the frontend, ensure that `client/public/config/ipConfig.json` contains the correct backend API address.

## Project structure overview

- `client/` — Angular + TypeScript frontend with components and services
- `server/` — Node.js Express backend with database services and API routes
- `server/SQL/` — SQL database schema and scripts

## Main features

- Angular frontend with responsive UI components
- Task creation, viewing, and management
- User authentication and login system
- Real-time data synchronization between client and server
- SQL Server database persistence
- RESTful API for backend services

## Key directories

- `client/src/app/` — Angular components, services, and models
- `server/services/` — Backend business logic and database operations

## Notes

- Make sure Node.js and SQL Server are installed before running the project.
- Recommended Node.js version: 18+
