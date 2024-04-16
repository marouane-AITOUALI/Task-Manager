class TasksService{
    constructor( {Task, User}){
        this.Task = Task;
        this.User = User;
    }

    async createTask(taskData){
        const {userId} = taskData;
        const _user= await this.User.findById(userId);
        if (!_user){
            return {
                error: 'User not found !',
            };
        }

        const _task = await this.Task.create(taskData);

        _user.tasks.push(_task);
        await _user.save();


        return {
            message: 'Task created successfully',
            task: _task,
        };

    }
}

module.exports = TasksService;