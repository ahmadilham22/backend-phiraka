const db = require('../config/db');

class UserModel {
  async getAllUsers() {
    const result = await db.query(`SELECT * FROM tbl_user`);
    return result.rows;
  }

  async createUser(nama, username, password) {
    const registrationDate = new Date();

    const result = await db.query(
      'INSERT INTO tbl_user (nama, username, password, create_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [nama, username, password, registrationDate]
    );
    return result.rows;
  }

  async getUserByUsername(username) {
    const result = await db.query(
      'SELECT * FROM tbl_user WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }

  async getById(id) {
    const result = await db.query('SELECT * FROM tbl_user WHERE id = $1', [id]);
    return result.rows;
  }

  async updateUser(id, nama, username, password) {
    let query = 'UPDATE tbl_user SET nama = $1, username = $2';
    const params = [nama, username];

    if (password) {
      query += ', password = $3';
      params.push(password);
    }

    query += ' WHERE id = $' + (params.length + 1) + ' RETURNING *';
    params.push(id);

    const result = await db.query(query, params);
    return result.rows;
  }

  async deleteUser(id) {
    const result = await db.query(
      'DELETE FROM tbl_user WHERE id = $1 RETURNING *',
      [id]
    );

    return result.rows;
  }
}

module.exports = new UserModel();
