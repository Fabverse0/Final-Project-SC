import express from "express";
import router from "./route/bookRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.use(router);
console.log("Server Started") 