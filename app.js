import express from 'express';
import taskRouter from './route/taskroute.js';
const app = express();

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