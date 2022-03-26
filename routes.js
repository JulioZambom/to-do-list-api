const { Router } = require('express');
const AuthMiddleware = require('./src/app/middlewares/AuthMiddleware');
const AuthController = require('./src/app/controllers/AuthController')
const UsersController = require('./src/app/controllers/UsersController');
const NotesController = require('./src/app/controllers/NotesController');

const router = Router();

//Auth routes
router.get('/auth', AuthMiddleware, AuthController.auth);
router.post('/auth/login', AuthController.login);

//User routes
router.get('/users', UsersController.index);
router.get('/users/:id', UsersController.find);
router.post('/users', UsersController.store);
router.delete('/users/:id', UsersController.delete);
router.put('/users/:id', UsersController.update);

//Notes routes
router.get('/notes', NotesController.index);
router.get('/notes/:user_id', NotesController.findUserNotes);
router.post('/notes', NotesController.store);
router.put('/notes/:id', NotesController.update);
router.put('/note/:id', NotesController.updateState);
router.delete('/notes/:id', NotesController.delete);

module.exports = router;