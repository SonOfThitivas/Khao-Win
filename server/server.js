import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
// const express = require("express");
// const app = express();
// const cors = require("cors");

app.use(cors());

app.get("/api/fetchData", (req, res) =>{
    res.json(data);
});

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});
