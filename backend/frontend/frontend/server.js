const express = require("express");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// sample API route
app.get("/api/message", (req, res) => {
    res.json({
        message: "🎮 Activity Scheduler Server Running Successfully!"
    });
});

// server start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});