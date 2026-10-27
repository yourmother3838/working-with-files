import User from "../models/User.js";

class UserController {
  // получение всех пользовталей
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json("Ошибка при получении пользователей: " + err);
    }
  }

  async getUserOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json("Такого пользователя не существует!");
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json("Ошибка при выполнении запроса: " + err);
    }
  }

async registration(req, res) {
  console.log(req.files);
  
  try {

    let fileName = null;

    if (req.files && req.files.avatar) {
        fileName = await fileService.saveFile(req.files.avatar);
    }
    
    // Выводим в консоль текстовые поля и файл для проверки
    console.log("Данные формы:", req.body);
    console.log("Загруженный файл:", req.file);

    const { name, lastName, age } = req.body;

    // Проверяем, пришли ли обязательные данные
    if (!name || !lastName) {
      return res.status(400).json({ message: "Имя и фамилия обязательны для заполнения" });
    }

    // Создаем пользователя в базе данных (он сохраняется автоматически)
    const newUser = await User.create({ 
      name, 
      lastName, 
      age 
    });

    // Отправляем успешный ответ клиенту
    return res.status(200).json(newUser);

  } catch (err) {
    console.log("Ошибка при регистрации!", err);
    return res.status(500).json({ message: "Ошибка при регистрации на сервере", error: err.message });
  }
}


  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, lastName, age } = req.body;
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          name,
          lastName,
          age,
        },
        { new: true },
      );
      if (!updateUser) {
        res.status(404).json("Такого пользователя не существует!");
      }
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json("Ошибка при обновлении: " + err);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json("Такого пользователя не существует!");
      }
      res.status(200).json("Пользователь успешно удален!");
    } catch (err) {
      res.status(500).json("Ошибка при выполнении запроса: " + err)
    }
  }
}

export default new UserController();
