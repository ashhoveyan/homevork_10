import db from '../clients/db.mysql.js';
import md5 from 'md5';


export default {
    async registration(body) {
        const hashedPassword = md5(md5(body.password) + process.env.SECRET);

        const values = [body.firstName, body.lastName, body.email.toLowerCase(), body.md5(body.password)+ process.env.SECRET];

        const [rows] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [body.name, body.email.toLowerCase(), md5(md5(body.password) + process.env.SECRET)]
        );
        return rows;

    },
    async login(body) {

        const values = [body.email.toLowerCase()];
        const [rows] = await db.query(`
            SELECT * FROM users WHERE email = ? AND password = ?`,
            values);

        const user = rows[0];

        if (user === undefined) {
            return { success: false, message: 'User not found' }
        }


        if (user.password !== md5(md5(body.password) + process.env.SECRET)) {
            return { success: false, user: 'Invalid password' };
        }

        return { success: true, user: user }

    },

    async getProfile(body) {
        const values = [body.id];
        const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, values);

        if (rows.length === 0) {
            return { success: false, message: 'Invalid ID user not found' };
        }
        return { success: true, rows }
    },
    async getUsersList() {
        const [rows] = await db.query(`SELECT * FROM users`);
        return rows;
    },
    async updateProfile(body) {
        const values = [body.firstName, body.lastName, body.email.toLowerCase(), body.md5(md5(body.password)+ process.env.SECRET), body.id];

        const [rows] = await db.query(`
            UPDATE users
            SET first_name = ?, last_name = ?, email = ?, password = ?
            WHERE id = ?
            `, values);

        if (rows.affectedRows === 0) {
            return { success: false, message: 'User not found' }
        }

        return { success: true, rows }
    },
    async deleteProfile(body) {
        const values = [body.id];
        const [rows] = await db.query(`DELETE FROM users WHERE id = ?`, values);
        if (rows.affectedRows === 0) {
            return { success: false, message: 'Task not found' }
        }
        return { success: true, rows }
    }
}