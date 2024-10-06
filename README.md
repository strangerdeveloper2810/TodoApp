# Todo List Application

A simple Todo List application that allows users to add, delete, and filter tasks based on their completion status. Built with React and Redux for state management.

## Table of Contents

- [Introduction](#introduction)
- [Clone and Install](#clone-and-install)
- [Project Structure](#project-structure)
- [Usage](#usage)

## Introduction

This project is a Todo List application that enables users to manage their tasks efficiently. Users can add new tasks, mark them as completed, and filter tasks based on their status (All, Completed, Incomplete).

## Clone and Install

1. **Clone the repository**:

   ```bash
   git clone https://github.com/strangerdeveloper/TodoApp.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd TodoApp
   ```

3. **Install the required packages**:

   ```bash
   yarn install
   ```

## Project Structure

Here is the structure of the project:

```
repo-name/
├── node_modules/          # Directory for installed packages
├── public/                # Directory for static files
│   └── index.html         # Main HTML file
├── src/                   # Source code directory
│   ├── components/        # React components
│   │   └── Loading/       # Loading component
│   │       ├── index.ts
│   │       ├── Loading.module.css
│   │       └── Loading.tsx
│   ├── pages/             # Application pages
│   │   ├── HomePage.css   # Styles for HomePage
│   │   └── index.tsx      # Main entry point for HomePage
│   ├── redux/             # Redux-related files
│   │   ├── reducers/      # Redux reducers
│   │   ├── sagas/         # Redux sagas
│   │   ├── types/         # TypeScript types for Redux
│   │   └── store.ts       # Redux store configuration
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── App.test.tsx       # Tests for App component
│   ├── App.tsx            # Main App component
│   ├── index.css          # Global styles
│   ├── index.tsx          # Main entry point of the application
│   ├── logo.svg           # Application logo
│   ├── react-app-env.d.ts # Type definitions for React app
│   ├── reportWebVitals.ts  # Web vitals reporting
│   └── setupTests.ts      # Setup for testing
├── .gitignore             # Files and directories to ignore in Git
├── .prettierignore        # Files and directories to ignore in Prettier
├── .prettierrc            # Prettier configuration
├── eslint.config.mjs      # ESLint configuration
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
├── tsconfig.json          # TypeScript configuration
└── yarn.lock              # Yarn lock file
```

## Usage

1. **Run the application**:

   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

2. **Format the code**:

   To format the code using Prettier, run:

   ```bash
   yarn format
   ```

3. **Lint the code**:

   To check the code using ESLint, run:

   ```bash
   yarn lint
   ```
