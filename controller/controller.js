import Task from "../model/Task.js";
const createTask = async(req,res) =>{
    try{
      const  {title,description,deadline,priority }= req.body;
    if (!title||!description||!deadline||!priority){
    return res.status(400).json({
        message:"All fields are important!" });}
        const task = await Task.create({title,description,deadline,priority,iscompleted:false});
    res.status(201).json({
        message:"Task created successfully",task,
    })
    

    }catch(error){
        res.status(500).json({
            message:"Internal server Error",error:error.message
        })

    }
};
const getTask = async(req,res) =>{
try {
    const tasks = await Task.find().sort({ deadline: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
      error: error.message,
    });
  }
}
const getTaskById =async(req,res) =>{
 try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }}  
  const patch =async(req,res)=>
     {try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    } task.iscompleted = !task.iscompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: `Task marked as ${
        task.iscompleted ? "completed" : "incomplete"
      }`,
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
} 
const deleteTask=async(req,res)=>{
 try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.iscompleted) {
      return res.status(400).json({
        success: false,
        message: "Completed tasks cannot be deleted",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }}



export {
    createTask,getTask,getTaskById,patch,deleteTask
}