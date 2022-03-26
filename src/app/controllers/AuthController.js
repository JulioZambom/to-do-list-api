const UsersRepository = require('../repositories/UsersRepository');
const { createToken } = require('../utils/createToken');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const user = await UsersRepository.findByEmail(email);

        if(!user) {
            return res.status(401).json({ message: "user doesn't exists", token: null});
        }

        if(password != user.password){
            return res.status(401).json({ message: 'incorrect password', token: null});
        }

        const token = await createToken({ id: user.id });
        return res.status(200).json({ message: 'user logged-in', token});
    }

    async auth(req, res) {
        const { token, auth } = req;
        const user = await UsersRepository.findById(token.id);

        const newUser = {
            id: user.id,
            name: user.name
        }

        res.json({ message: 'authenticated', auth, user: newUser});
    }
}

module.exports = new AuthController;