# React + Vite

WTWR (What to Wear?): Front End

The WTWR (What to Wear) front-end application is a full-stack React app designed to help users manage and display clothing items based on current weather conditions. The app was built using React and Vite, and allows users to create profiles, upload clothing items, and like and delete posts. WTWR integrates with a weather API to match content according to local temperature and is designed to work seamlessly with the WTWR Backend.

Features

User Authentication: Users can register, log in, and create profiles with a profile picture. Authentication is managed with JWT tokens and stored in context.

Weather-Based Clothing Management: The app uses the user's location (latitude and longitude) to fetch current temperature data via an API. Clothing items are categorized as "cold," "warm," or "hot" and are displayed based on the user's local temperature.

Main Page

Header: Displays the current date and local location, a toggle switch for changing weather display between Celsius and Fahrenheit, and a button for adding clothing items. It also includes the user's name and profile image, as well as the wtwr logo, which serves as a link to the main page. For users who are not logged in, the header provides buttons to log in or register.

Main Section: Displays clothing items from various users, filtered by temperature. Each item is labeled and contains a heart icon where users can like their favorite items.

Profile Page

Displays user-specific information, including their own uploaded clothing items.
Contains a sidebar where users can update their information or logout.

Modals

Register Modal: for creating new accounts with name, email, password, and an avatar field where users can link a profile image.

Login Modal: for logging in using email and password

Add Item Modal: for adding new clothing items. Users can upload clothing items and assign them a temperature category (cold, warm, hot). These items are visible to all users but are filtered based on the user's current local temperature.

Item Preview Modal: displays a preview of a clothing item with an option to delete the item. If a user chooses to delete the clothing item, a confirmation modal warns the user that the action is irreversible to prevented unintended changes.

Technologies Used

At its core, the application uses React, and is bundled with Vite.
It is a single-page application (SPA) with client-side navigation powered by React Router.Global states, such as user authentication and temperature data, are managed using React's Context API, so state can be shared across components.
Styling is implemented using custom CSS.
Authentication is secured with JSON Web Tokens (JWT), which integrates with the backend's security protocols.

Link to backend code:
https://github.com/andywickoren/se_project_express
