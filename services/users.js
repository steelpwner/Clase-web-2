const { usersModel, sequelize } = require("../models");

class UserService {
  async getUser(id) {
    return usersModel.findOne({
      where: {
        id,
        estado: 1,
      },
    });
  }

  async getUsers(where) {
    return usersModel.findAll({
      where: {
        ...where,
        estado: 1,
      },
    });
  }

  async createUser(data) {
    const t = await sequelize.transaction();
    try {
        const newUser = await usersModel.create(data, {
            transaction:t
        });
        await t.commit()

        return {
            newUser,
            message:"Creado correctamente"
        }

    } catch (e) {
        console.log(e)
        await t.rollback();
        return {
            message:"No se pudo crear al usuario"
        }
    }
  }

  async updateUser(id, data) {
    const t = await sequelize.transaction();
    try {
      await usersModel.update(
        data,
        {
          where: { id },
          transaction: t,
        }
      );

      await t.commit();

      return {
        id,
        message:"Actualizado correctamente"
      }
    } catch (e) {
      await t.rollback();
      return {
        message:"Hubo un error actualizando"
      }
    }
  }

  async deleteUser(id) {
    const t = await sequelize.transaction();
    try {
      await usersModel.update(
        {
          estado: -1,
        },
        {
          where: { id },
          transaction: t,
        }
      );

      await t.commit();

      return {
        id,
        message:"Eliminado correctamente"
      }
    } catch (e) {
      await t.rollback();
      return {
        message:"Hubo un error eliminando"
      }
    }
  }
}

module.exports = UserService;
