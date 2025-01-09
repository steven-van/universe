# Universe Backend

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=8000
DB_URL=mysql://localhost:27017/yourdbname # Replace with your database URL
```

Modify the variables as needed for your setup.

### 4. Start the Application

```bash
npm start
```

The app will run on `http://localhost:8000` by default.

## Scripts

- **`npm start`**: Starts the application in production mode.
- **`npm run dev`**: Starts the application in development mode with hot-reloading using Nodemon.

## Project Structure

```plaintext
back/
├── src/
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic and utilities
│   ├── index.js              # Main Express application
├── .env                    # Environment variables
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.