const { Router } = require('express');
const UserController = require('./src/app/controllers/UserController');
const NotesController = require('./src/app/controllers/NotesController');

const router = Router();

//User routes
router.get('/users', UserController.index);
router.get('/users/:id', UserController.find);
router.post('/users', UserController.store);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);

//Notes routes
router.get('/notes', NotesController.index);
router.get('/notes/:user_id', NotesController.findUserNotes);
router.post('/notes', NotesController.store);
router.put('/notes/:id', NotesController.update);
router.put('/note/:id', NotesController.updateState);
router.delete('/notes/:id', NotesController.delete);

module.exports = router;