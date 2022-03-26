const db = require('../../database');

class NotesRepository{
    async create({ title, text, is_checked, date, user_id }) {
        await db.query(`
            INSERT INTO notes
            VALUES (default, ?, ?, ?, ?, ?)
        `, [title, text, is_checked, date, user_id]);

        const [rowCreated] = await db.query(`
            SELECT * FROM notes
            WHERE user_id = ?
            ORDER BY id DESC
        `, [user_id]);
        
        return rowCreated;
    }

    async findAll() {
        const rows = await db.query(`
            SELECT * FROM notes;
        `);

        return rows;
    }

    async findById(id) {
        const [row] = await db.query(`
            SELECT * FROM notes
            WHERE id = ?
        `, [id]);

        return row;
    }

    async findByUserId(user_id) {
        const rows = await db.query(`
            SELECT * FROM notes
            WHERE user_id = ?
        `, [user_id]);

        return rows;
    }

    async update(id, { title, text }) {
        await db.query(`
            UPDATE notes SET
            title = ?,
            text = ?
            WHERE id = ?
        `, [title, text, id]);
    }

    async updateState(id) {
        await db.query(`
            UPDATE notes
            SET is_checked = if(is_checked=1, 0, 1)
            WHERE id = ?
        `, [id]);
    }

    async delete(id) {
        const [rowDeleted] = await db.query(`
            SELECT * FROM notes
            WHERE id = ?
        `, [id]);

        await db.query(`
            DELETE FROM notes
            WHERE id = ?
        `, [id]);

        return rowDeleted;
    }
}

module.exports = new NotesRepository;