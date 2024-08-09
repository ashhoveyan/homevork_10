import models from '../models/tasks.js';


export default {
    async createTask(req, res) {
        try {
            const {
                title,
                description,
                taskDate,
                userId } = req.body;



            const result = await models.createTask({
                title,
                description,
                taskDate,
                userId
            });

            if (result) {
                res.status(200).json({
                    message: 'Task created',
                    task: title
                });
                return
            }
            res.status(401).json({
                message: result
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async getTasksList(req, res) {
        try {
            const result = await models.getTasksList()
            if (!result) {
                res.status(422).json({
                    result: {},
                });
                return;
            }
            res.status(200).json({
                message: 'Tasks retrieved successfully',
                tasks: result
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async updateTask(req, res) {
        try {
            const {
                title,
                description,
                taskDate,
                userId
            } = req.body;



            const result = await models.updateTask({
                title,
                description,
                taskDate,
                userId
            })

            if (!result.success) {
                res.status(401).json({
                    message: result.message
                });
                return;
            }
            res.status(200).json({
                message: 'Update successfully!',
                userId
            });
        } catch (error) {
            console.error('Internal Server Error:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async deleteTask(req, res) {
        try {
            const { userId } = req.params;

            if (!userId) {
                res.status(422).json({
                    message: 'Missing parameters!',
                })
                return;
            }

            const result = await models.deleteTask({ userId });
            if (!result.success) {
                res.status(401).json({
                    message: result.message
                });
                return;
            }
            res.status(200).json({
                message: 'Task successfully deleted!',
                userId
            });

        } catch (error) {
            console.error('Internal Server Error:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
}
