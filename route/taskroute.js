import {Router} from 'express';
import {createTask,getTask, getTaskById,patch,deleteTask} from '../controller/controller.js';
const router = Router();
router.route('/create').post(createTask);
router.route('/getTasks').get(getTask);
router.route('/getTasks/:id').get(getTaskById);
router.route('/patch/:id').patch(patch);
router.route('/delete/:id').delete(deleteTask);
export default router;