import { Sequelize, Op } from 'sequelize';
import express, { Express, Request, Response} from 'express';
import UserModel from '../models/User';

class UsersController
{

  index = async (req : Request, res : Response , next : any) => 
  {
    const params = req.query;
    const limit:number = params.page ? parseInt(params.limit as string) : 100;
    const page:number = params.page ? parseInt(params.page as string) : 1;
    const offset:number = (page - 1) * limit;
    const sort:string = params.sort ? params.sort as string : 'id';
    const order:string = params.order ? params.order as string : 'ASC';
    const where:any= {};

    if (params.name) 
    {
      where.name = 
      {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.email) 
    {
      where.email = 
      {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.min_age) 
    {
      where.age = 
      {
        [Op.gte]: params.min_age
      };
    }

    if (params.max_age) 
    {
      if (! where.age) 
      {
        where.age = {};
      }

      where.age[Op.lte] = params.max_age;
    }

    if (params.sex) 
    {
      where.sex = params.sex;
    }

    const users = await UserModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort, order] ]
    });
    res.json(users);
  }

  create = async (req : Request, res : Response , next : any) =>
  {
    try 
    {
      const data = await this._validateData(req.body);
      const user = await UserModel.create(data);
      res.json(user);
    } 
    catch (error : any)
    {
      res.status(400).json({ error: error.message+"" });
    }
  }

  show = async (req : Request, res : Response, next : any) => 
  {
    const user = await UserModel.findByPk(req.params.userId);
    res.json(user);
  }

  update = async (req : Request, res : Response, next : any) =>
  {
    try 
    {
      const id = parseInt(req.params.userId);
      const data = await this._validateData(req.body, id);
      await UserModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await UserModel.findByPk(id));
    } 
    catch (error:any) 
    {
      res.status(400).json({ error: error.message+"" });
    }
  }

  delete = async (req : Request, res : Response, next : any) => 
  {
    await UserModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    res.json({});
  }

  _validateData = async (data:any, id?:number) => 
  {
    const attributes = ['name', 'age', 'sex', 'email'];
    const user:any = {};

    for (const attribute of attributes) 
    {
      if (! data[attribute])
      {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      user[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(user.email, id)) 
    {
      throw new Error(`The user with mail address "${user.email}" already exists.`);
    }

    return user;
  }

  _checkIfEmailExists = async (email :string, id? :number) =>
  {
    const where :any = 
    {
      email: email
    };

    if (id)
    {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await UserModel.count({
      where: where
    });

    return count > 0;
  }

}

export default new UsersController();