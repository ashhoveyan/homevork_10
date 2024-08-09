import db from '../clients/db.mysql.js'
import md5 from "md5";


export default {
    async createTask(body) {
        const values = [body.title, body.description, body.taskDate, body.userId];

        const [rows] = await db.query(`
        INSERT INTO tasks (title, description, task_date, user_id)
        VALUES (?, ?, ?, ?)
        `, values);
        return rows;
    },
    async getTask(body) {
        const values = [body.userId];
        const [rows] = await db.query(`SELECT * FROM tasks WHERE user_id = ?`, values);

        if (rows.length === 0) {
            return { success: false, message: 'Invalid ID task not found' };
        }
        return { success: true, rows }
    },
    async getTasksList() {
        const [rows] = await db.query(`SELECT * FROM tasks`);
        return rows;
    },
    async updateTask(body) {
        const values = [body.title, body.description, body.userId,body.id];

        const [rows] = await db.query(`
            UPDATE tasks
            SET title = ?, description = ?, task_date = ?, completed = 1
            WHERE user_id = ? AND id = ? limit 1
            `, values);

        if (rows.affectedRows === 0) {
            return { success: false, message: 'Task not found' }
        }

        return { success: true, rows }
    },
    async deleteTask(body) {
        const values = [body.userId, body.id];
        const [rows] = await db.query(`DELETE FROM tasks WHERE user_id = ? AND id = ? limit 1`, values);

        if (rows.affectedRows === 0) {
            return { success: false, message: 'Task not found' }
        }
        return { success: true, rows }
    }
}