# Task Management System

## Overview
A full-stack Task Management System developed to streamline task assignment, user management, team collaboration, and real-time communication.  
The application includes role-based authorization, user management, an interactive dashboard, and real-time notifications and messaging.

---

## Technologies

### Frontend
- Angular
- RxJS
- Angular Material
- Angular Signals
- Reactive Forms
- Custom Directives
- Custom Pipes

### Backend
- Node.js
- Express.js
- REST API

### Database
- SQL Server
- Stored Procedures
- Triggers

### Real-Time Communication
- WebSocket

---

## Features

### User Management
- Create, update, and manage users
- Role-based permissions
- Secure authentication and authorization

### Task Management
- Create, edit, and delete tasks
- Task status tracking
- Task assignment and management

### Dashboard
- Centralized view of tasks and system activity
- User-specific information and statistics

### Real-Time Chat & Notifications
- Instant messaging between users
- Live notifications for task updates
- WebSocket-based communication

---

## Architecture
The project follows a layered architecture with a clear separation of concerns:
- Angular Services for business logic and API communication
- State management using RxJS and Signals
- RESTful API built with Node.js and Express
- SQL Server database with Stored Procedures and Triggers
- Secure route protection and permission-based access control

---

## Key Skills Demonstrated
- Full Stack Development
- Angular Advanced Features
- REST API Design
- Real-Time Applications with WebSockets
- SQL Server Database Design
- State Management
- Authentication & Authorization
- Clean Architecture Principles

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
