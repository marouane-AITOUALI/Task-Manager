const models = require('./../../models/');
const TasksService = require('./service');
const { body, isISO8601, query, param, validationResult } = require('express-validator');

const Task = models.Task;
const User = models.User;
const tasksService = new TasksService({ Task, User});

function createTask(req, res){
    const paramsValidation = [
        body('userId').notEmpty().withMessage('userId is required !'),
        body('dueDate').notEmpty().withMessage('dueDate is required !').
        isISO8601().withMessage('dueDate must be a valid date'),
    ];

    Promise.all(paramsValidation.map((validation) =>validation.run(req)))
        .then(async () =>{
            const validationErr = validationResult(req);

            if(!validationErr.isEmpty()){
                return res.status(400).send({
                    errors: validationErr.array(),
                });
            }

            const response = await tasksService.createTask(req.body);
            return res.send(response);

        })
        .catch((_err)=>{
            return res.status(500).send({
                message: 'Something went wrong !',
            });
        })
}

function updateTask(req, res){
    const paramsValidation = [
        param('_id').notEmpty().withMessage('Id is required !'),
        body('userId').notEmpty().withMessage('userId is required !'),
        body('dueDate').optional().withMessage('dueDate is required !').
        isISO8601().withMessage('dueDate must be a valid date'),
    ];

    Promise.all(paramsValidation.map((validation) =>validation.run(req)))
        .then(async () =>{
            const validationErr = validationResult(req);

            if(!validationErr.isEmpty()){
                return res.status(400).send({
                    errors: validationErr.array(),
                });
            }

            const response = await tasksService.updateTask(req.params._id, req.body);
            return res.send(response);

        })
        .catch((_err)=>{
            return res.status(500).send({
                message: 'Something went wrong !',
            });
        })
}

function deleteTask(req, res) {
    const paramsValidation = [
        param('_id').notEmpty().withMessage('User ID is required'),
    ];

    Promise.all(paramsValidation.map(validation => validation.run(req)))
        .then(async () => {
            const validationErr = validationResult(req);

            if (!validationErr.isEmpty()) {
                return res.status(400).send({
                    errors: validationErr.array(),
                });
            }

            const response = await tasksService.deleteUser(req.params._id);
            return res.send(response);
        })
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
}