React Single File Upload with Multer and Express.js

# React Single File Upload

A simple React application for uploading a single file to a backend server built with Express and Multer.

## Features
- Clean, responsive UI for selecting and uploading a file.
- Sends file data to the backend using Axios or Fetch.
- Displays preview of uploaded files.
- Simple structure for integrating with any Express backend.

## Technologies
- **React** – Frontend library for building the UI.
- **Tailwind** – For styling.
- **Axios or Fetch API** – For sending HTTP requests.

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rendznicoy/single-file-upload.git
   
2. Navigate to the project folder:
   ```bash
   cd single-file-upload

3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm start

5. Open your browser:
   ```arduino
   http://localhost:3000 or http://localhost:5000

## Usage
1. Choose a file using the upload form.

2. Click Upload to send the file to the backend server.

3. Check the newly created backend storage folder, filestorage, or response for the uploaded file.

## Project Structure
  ```pgsql
    single/
    ├── public/
    │   ├── favicon.ico
    │   └── folder.png
    │   └── index.html
    │   └── logo192.png
    │   └── logo512.png
    │   └── manifest.json
    │   └── robots.txt
    │   └── test.html
    ├── src/
    │   ├── App.css
    │   └── App.js
    │   └── App.test.js
    │   └── index.css
    │   └── index.js
    │   └── logo.svg
    │   └── reportWebVitals.js
    │   └── setupTests.js
    └── .gitignore
    └── package.json
    └── package-lock.json
    └── README.md
```

## Backend Integration
Pair this frontend with the [Express/Multer](https://github.com/rendznicoy/sfu-backend) backend server to handle uploads, deletions, and file viewing.
