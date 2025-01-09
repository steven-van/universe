# Universe Frontend

## Getting Started

### 1. Clone the Repository

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be accessible at `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be available in the `dist` directory.

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run lint`**: Run ESLint for code quality checks.
- **`npm run preview`**: Preview the production build.

## Project structure

```plaintext
front/
├── public/                 # Publicly accessible files (e.g., favicon, robots.txt)
├── src/                    # Main source code directory
│   ├── assets/             # Static assets like images, fonts, etc.
│   │   ├── fonts/          # Font files
│   │   └── images/         # Image files
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   └── styles/             # Global and shared styles
├── .gitignore              # Files and directories to ignore in Git
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration file
└── README.md               # Project documentation

```
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

