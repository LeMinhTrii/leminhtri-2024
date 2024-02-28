const User = require("../model/User");

const UserController = {
  async get(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async create(req, res) {
    try {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async update(req, res) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User không tồn tại." });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = UserController;
