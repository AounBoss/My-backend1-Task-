import express from 'express';
import taskRouter from './route/taskroute.js';
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use((req,res,next) => {
    console.log("REQUEST","RECEIVED:",req.method,req.url);
    console.log("REQUEST BODY:", req.body);
    next();
});
app.use("/api/v1/tasks",taskRouter);
app.get("/", (req, res) => {
    res.json({
        message: "Server is working"
    });
});

export default app;