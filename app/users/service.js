class UsersService {

    constructor({ User }) {
        this.User = User;
    }

    async createUser(userData) {

        const _user = await this.User.findOne({
            email: userData.email
        });

        if (_user) {
            return {
                message: 'A user with this email already exists!',
            };
        } else {
            await this.User.create(userData);

            return {
                message: 'User created successfully!',
                user: userData,
            };
        }
    }

    async updateUser(userId, userData) {
        const _user = await this.User.findByIdAndUpdate(userId, userData, { new: true });
        if (_user) {
            return {
                message: 'User updated successfully',
                user: _user
            };
        }
        return {
            message: 'User not found',
        };
    }

    async deleteUser(userId) {
        const _user = await this.User.findByIdAndDelete(userId);

        if (_user) {
            return {
                message: 'User deleted successfully',
            };
        }

        return {
            message: 'User not found!',
        }
    }

    async listAllUsers() {
        const _users = await this.User.find();

        return {
            message: 'list of all users',
            users: _users,
        };
    }

}

module.exports = UsersService;