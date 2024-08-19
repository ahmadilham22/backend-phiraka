const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt');

class UserController {
  async get(req, res) {
    try {
      const users = await userModel.getAllUsers();

      res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async register(req, res) {
    try {
      const { nama, username, password } = req.body;
      let hashedPassword = await bcrypt.hash(password, 10);

      const result = await userModel.createUser(nama, username, hashedPassword);
      res.status(201).json({
        data: result,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userModel.getUserByUsername(username);

      const comparePassw = await bcrypt.compare(password, user.password);

      if (comparePassw) {
        const token = generateToken(user);
        res.json({ message: 'LOGIN SUKSES', token });
      } else {
        res.status(401).json({ message: 'LOGIN GAGAL' });
      }
    } catch (error) {
      console.error('Error logging in:', error.stack || error);
      res
        .status(500)
        .json({ message: 'Error logging in', error: error.message || error });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const users = await userModel.getById(id);

      res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nama, username, password } = req.body;

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const result = await userModel.updateUser(
        id,
        nama,
        username,
        hashedPassword
      );
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const users = await userModel.deleteUser(id);

      res.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();
