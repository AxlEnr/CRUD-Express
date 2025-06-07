const UserService = require("../services/userService");
const userService = new UserService();

class UserController {
  async getUsers(req, res) {
    try {
      const data = await userService.getUsers();
      console.log("Data to send:", data);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los nombres de profesores' });
    }
  }
}

module.exports = UserController;