const { generateToken } = require('../helpers/jwt.helper');
const { Exceptions } = require('../helpers');
let _userService = null;

class AuthService {

    constructor({ UserService }) {
        _userService = UserService;
    }

    async signUp(user) {
        const { username } = user;
        const userExist = await _userService.getUserByUsername(username);

        if (userExist) {
            Exceptions.exceptions({ status: 401, message: 'User already exist' });
        }

        return await _userService.create(user);
    }

    async signIn(user) {
        const { username, password } = user;
        const userExist = await _userService.getUserByUsername(username);

        if (!userExist) {
            Exceptions.exceptions({ status: 404, message: 'User does not exists' });
        }

        const validPassword = userExist.comparePasswords(password);

        if (!validPassword) {
            Exceptions.exceptions({ status: 400, message: 'Invalid Password' });
        }

        const userToEncode = {
            username: userExist.username,
            id: userExist._id
        };

        const token = generateToken(userToEncode);
        return { token, user: userExist };
    }

}

module.exports = AuthService;