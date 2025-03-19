# Hotel Explorer App

## Tech Stack

- **Expo**
- **Expo Router** (File-based navigation)
- **TypeScript** (Static typing)
- **Axios** (API requests)
- **React Native Maps** (Displaying location on a map)
- **i18n-js** (Internationalization)
- **ESLint & Prettier** (Code formatting and linting)
- **Jest & React Testing Library (RTL)** (Unit and integration testing)

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (latest LTS recommended)
- **Yarn package manager**
- **Expo CLI** (`yarn global add expo-cli`)
- **Xcode** (for iOS simulators)
- **Android Studio** (for Android emulators)
- You can also use a physical device with the Expo Go app installed instead of an iOS or Android simulator/emulator.

### Installation Steps

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Create a `.env` file in the root of the project and add:
   ```sh
   EXPO_PUBLIC_API_URL=https://technology.lastminute.com/api
   ```
4. Start the project:
   ```sh
   yarn start
   ```
5. Run the app on a simulator or device:
   - If the Expo server is already running, you can start the app by pressing `i` for iOS or `a` for Android in the terminal.

- If you haven’t started the Expo server yet, you can do it at the same time by installing the app on the given environment:
  - For iOS: `yarn ios`
  - For Android: `yarn android`

### Running Tests

To execute unit and integration tests:

```sh
yarn test
```

## Project Structure

- **app/** – Screens structured according to Expo Router
- **components/** – Reusable UI components
- **hooks/** – Custom hooks for handling logic
- **services/** – API service for hotel data, with separate modules for fetching, filtering, and sorting.
- **translations/** – Internationalization
- **types/** – TypeScript interfaces and types
- **constants/** – Application-related constants
- **design/** – UI-related constants (e.g., colors, typography, spacing)
- **assets/** – Images, icons, and other static assets
- **lib/** – Setup for third-party libraries
- **mocks/** – Mock data for testing and development

## Features

- **Hotel Listing**: Displays a list of hotels fetched from an API.
- **Hotel Details**: Shows more information about a selected hotel.
- **Filtering & Sorting**:
  - Filter hotels by star rating.
  - Sort hotels by price, rating, or number of stars (ascending & descending).
- **Map Integration**: Shows hotel location on a map using React Native Maps.
- **Deep Linking to Native Apps**:
  - Open map in the native app.
  - Call or email hotel contacts directly (works only on physical devices or Android emulators).
- **Error Handling for Images**: Placeholder image is displayed if the API returns a broken image URL.
- **Internationalization**: Translations are handled using JSON files and i18n-js.
- **Custom App Icon**: Default Expo icon has been replaced with a custom one.
- **Tests**: Basic tests for the hotel listing screen.
- **No Custom Splash Screen Added**
