const express = require("express");
const app = express();
const cors = require("cors");
<<<<<<< HEAD
=======

>>>>>>> b5f3903 (first commit)
const PORT = 5000;

app.use(cors());

<<<<<<< HEAD
app.get("/api/home", (req, res) =>{
    res.json({message:"Hello, World!"});
});

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});
=======
app.get("/api/fetch", (req, res)=>{
    res.json("Hello, World");
});

app.listen(PORT, ()=>console.log(`Server runs on port ${PORT}`));
>>>>>>> b5f3903 (first commit)
