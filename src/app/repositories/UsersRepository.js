const db = require('../../database');

class UsersRepository{
    async create ({ name, email, password}) {
        await db.query(`
            INSERT INTO users
            VALUES (default, ?, ?, ?)
        `, [name, email, password]);
    }

    async findAll() {
        const rows = await db.query(`
            SELECT * FROM users
        `);

        return rows;
    }

    async findByEmail(email) {
        const [row] = await db.query(`
            SELECT * FROM users
            WHERE users.email = ?
        `, [email]);
        
        return row;
    }

    async findById(id) {
        const [row] = await db.query(`
            SELECT * FROM users
            WHERE users.id = ?
        `, [id]);

        return row;
    }

    async delete(id) {
        await db.query(`
            DELETE FROM notes
            WHERE user_id = ?
        `, [id]);

        const [rowDeleted] = await db.query(`
            SELECT * FROM users
                WHERE id = ?
            `, [id]);

        await db.query(`
            DELETE FROM users
            WHERE id = ?
        `, [id]);
        
        return rowDeleted;
    }

    async update(id, { name, email, password}){
       await db.query(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?
            WHERE id = ?
        `, [name, email, password, id]);
    }
}

module.exports = new UsersRepository;