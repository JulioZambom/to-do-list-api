const { findById } = require('../repositories/NotesRepository');
const NotesRepository = require('../repositories/NotesRepository');

class NotesController{
    async store(req, res) {
        const { title, text, is_checked, date, user_id } = req.body;
        const noteCreated = await NotesRepository.create({ title, text, is_checked, date, user_id });
        
        res.json({ noteCreated: noteCreated});
    }

    async index(req, res) {
        const notes = await NotesRepository.findAll();
        res.json(notes);
    }

    async findUserNotes(req, res) {
        const { user_id } = req.params;
        const userNotes = await NotesRepository.findByUserId(user_id);
        res.json(userNotes);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, text } = req.body;

        await NotesRepository.update(id, { title, text});
        const noteUpdated = await findById(id);

        res.json({ noteUpdated: noteUpdated});
    }

    async updateState(req, res) {
        const { id } = req.params;
        await NotesRepository.updateState(id);

        res.json({ message: 'Note state updated'});
    }

    async delete(req, res) {
        const { id } = req.params;
        const noteDeleted = await NotesRepository.delete(id);

        res.json({ noteDeleted: noteDeleted })
    }
}

module.exports = new NotesController;