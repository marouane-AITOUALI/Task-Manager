const UsersService = require('./service');
const models = require('./../../models');
const { body, validationResult } = require('express-validator');

const usersService = new UsersService();

const User = models.User;

function createUser(req, res) {
    const paramsValidation = [
        body('fullName').notEmpty().withMessage('Full Name is required'),
        body('job').notEmpty().withMessage('Job is required'),
        body('role').notEmpty().withMessage('Role is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ];

    Promise.all(paramsValidation.map(validation => validation.run(req)))
        .then(() => {
            const validationErr = validationResult(req);

            if (!validationErr.isEmpty()) {
                return res.status(400).send({
                    errors: validationErr.array()
                });
            }
            const response = usersService.createUser(req.body);
            return res.send(response);
        });

}

module.exports = {
    createUser,
};