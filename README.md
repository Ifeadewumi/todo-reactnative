# Todo App

This is a React Native Todo application built with Expo. It uses Convex for real-time backend and features theme switching, drag-and-drop sorting, and due dates.

## Features

- Create, Read, Update, and Delete Todos
- Real-time data synchronization with Convex
- Light and Dark theme support
- Drag-and-drop to reorder todos
- Set due dates for todos

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Convex:**
   - Install the Convex CLI: `npm install -g convex`
   - Login to Convex: `npx convex login`
   - Create a new project: `npx convex dev` (follow the prompts)
   - Deploy the backend: `npx convex deploy`

4. **Configure Environment Variables:**
   - Create a `.env` file in the root of the project.
   - Add your Convex deployment URL to the `.env` file:
     ```
     EXPO_PUBLIC_CONVEX_URL=https://<your-project-name>.convex.cloud
     ```

## Build and Run

- **To run the app in development mode:**
  ```bash
  expo start
  ```

- **To create a production build:**
  - **Android:** `eas build -p android --profile preview`
  - **iOS:** `eas build -p ios --profile preview`
  - **Web:** `expo export:web`