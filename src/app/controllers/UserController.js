const UsersRepository = require('../repositories/UsersRepository');

class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;

        const hasUser = await UsersRepository.findByEmail(email);

        if(hasUser){
            return res.status(400).json({ error: 'This user already exists' });
        }

        await UsersRepository.create({ name, email, password })

        const userCreated = await UsersRepository.findByEmail(email);
        res.json({ userCreated: userCreated });
    }

    async index(req, res) {
        const users = await UsersRepository.findAll();
        res.json(users);
    }

    async find(req, res) {
        const { id } = req.params;
        const user = await UsersRepository.findById(id);

        if(!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json({ user : user })
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        await UsersRepository.update(id, { name, email, password });
        const userUpdated = await UsersRepository.findById(id);

        res.json({ userUpdated: userUpdated });
    }

    async delete(req, res) {
        const { id } = req.params;

        const userDeleted = await UsersRepository.delete(id);
        res.json({ userDeleted: userDeleted });
    }
}

module.exports = new UserController;