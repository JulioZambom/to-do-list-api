const db = require('../../database');

class UsersRepository{
    async create ({ name, email, password}) {
        await db.query(`
            INSERT INTO users
            VALUES (default, ?, ?, ?)
        `, [name, email, password]);
    }

    async findAll() {
        const users = await db.query(`
            SELECT * FROM users
        `);

        return users;
    }

    async findByEmail(email) {
        const [user] = await db.query(`
            SELECT * FROM users
            WHERE users.email = ?
        `, [email]);
        
        return user;
    }

    async findById(id) {
        const [user] = await db.query(`
            SELECT * FROM users
            WHERE users.id = ?
        `, [id]);

        return user;
    }

    async delete(id) {
        await db.query(`
            DELETE FROM notes
            WHERE user_id = ?
        `, [id]);

        const [userDeleted] = await db.query(`
            SELECT * FROM users
                WHERE id = ?
            `, [id]);

        await db.query(`
            DELETE FROM users
            WHERE id = ?
        `, [id]);
        
        return userDeleted;
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