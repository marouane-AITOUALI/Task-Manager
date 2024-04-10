class UsersService {

    createUser(userData) {
        return ({
            message: "Function create User !!",
            user: userData
        });
    }

}

module.exports = UsersService;