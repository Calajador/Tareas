const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/file')

const list = require('../controllers/list.controller');
const user = require('../controllers/user.contollers');
const task = require('../controllers/task.controller');

//User
router.post('/user', user.postUser);
router.post('/login', user.login);
router.get('/profile', verifyToken.auth, user.profile);

//Listas
router.get('/lists', verifyToken.auth, list.getlists);
router.post('/lists', verifyToken.auth, list.createlist);
router.patch('/lists/:id', verifyToken.auth, list.updateList);
router.delete('/lists/:id', verifyToken.auth, list.deleteList);

//Tareas
router.post('/lists/:listId/tasks', task.postTask);
router.get('/lists/:listId/tasks', task.gestTasks);
router.patch('/lists/:listId/tasks/:taskId', task.putTask);
router.delete('/lists/:listId/tasks/:taskId', task.deleteTask);
router.post('/lists/:listId/tasks/upload', upload.single('image'), task.upload);

module.exports = router;