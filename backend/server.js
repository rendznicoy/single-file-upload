const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  next();
});

// CORS headers for React development server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin for development
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Filestorage directory
const uploadDir = path.join(__dirname, "filestorage");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Public directory path
const publicDir = path.join(__dirname, "..", "public");

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from public folder
app.use(express.static(publicDir));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "filestorage/");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Uploaded files
app.use("/uploads", express.static(path.join(__dirname, "filestorage")));

// Simple test route to verify server is working
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString(),
  });
});

// Upload route
app.post(
  "/upload",
  (req, res, next) => {
    next();
  },
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    res.redirect("/");
  }
);

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("File too large");
    }
    return res.status(400).send(error.message);
  }
  res.status(500).send(error.message);
});

app.delete("/delete/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "filestorage", fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.send(`File "${fileName}" has been deleted.`);
  } else {
    res.status(404).send(`File "${fileName}" not found.`);
  }
});

app.get("/view", (req, res) => {
  const uploadDirectory = path.join(__dirname, "filestorage");

  // Check if directory exists
  if (!fs.existsSync(uploadDirectory)) {
    return res
      .status(500)
      .json({ error: "Upload directory does not exist", files: [] });
  }

  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error reading the upload directory.", files: [] });
    } else {
      // Filter out any system files or directories
      const validFiles = files.filter((file) => {
        const filePath = path.join(uploadDirectory, file);
        return fs.statSync(filePath).isFile();
      });
      res.json({ files: validFiles });
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
