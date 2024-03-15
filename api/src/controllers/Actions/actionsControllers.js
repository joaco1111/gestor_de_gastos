const { Action, Category_bills, Category_income, User } = require('../../db.js');

const createActions = async (req, res) => {
  try {
    const { id_user, type, quantity, date, id_category } = req.body;
    
    //en caso de no tener datos completos 
    if (!type || !date || !quantity || !id_category  || !id_user) {
      return res.status(400).send('Completar los campos obligatorios')
    }

    //en caso de ser diferente el tipo de ingreso y gasto, se envia un mensaje de error
    if (type !== 'ingresos' && type !== 'gastos') {
      return res.status(400).json({ error: 'Tipo de acción no válido' })
    }

    if(type === "ingresos"){
      const category_income = await Category_income.findOne({where: {id: id_category}});
      
      //en caso de no encontrar dicha categoria
      if(!category_income) return res.status(400).send("No coinciden los datos");

      const new_action = await Action.create({
        type, 
        date, 
        quantity, 
        id_categoria_income: id_category,
        id_usuario: id_user
      })

      return res.status(200).json(new_action);
    }

    else{
      const category_bills = await Category_bills.findOne({where: {id: id_category}});
      
      //en caso de no encontrar dicha categoria
      if(!category_bills) return res.status(400).send("No coinciden los datos");

      const new_action = await Action.create({
        type, 
        date, 
        quantity, 
        id_categoria_bills: id_category,
        id_usuario: id_user
      })

      return res.status(200).json(new_action);
    }


    //LUEGO LO REFACTORIZAMOS BIEN :)


    // let categories = await Category.findOne({ where: { name: category } })
    
    // if (!categories) {
    //   categories = await Category.create({ name: category })
    // }

    // const newAction = await Action.create({
    //   type,
    //   date,
    //   quantity
    // });

    
    // res.status(201).json({ mensaje: 'Acción creada exitosamente', newAction })

  } catch (error) {
    console.error('Error al crear la acción:', error)
    res.status(500).json({ error: 'Error al crear la acción' })
  }
};


const getActions = async (req, res) => {
    try {
      const actions = await Action.findAll({
        attributes: ["id","type", "date", "quantity"], 

        include:[
        {
          model: Category_bills,
          attributes: ["name"]
        },{
          model: Category_income,
          attributes: ["name"]
        }]});

      //en caso de no tener actions creadas 
      if(!actions) return res.status(200).send("Todavía no tienes acciones creadas")

      res.status(200).json(actions)

    } catch (error) {

      console.error('Error al obtener las acciones:', error)
      res.status(500).json({ error: 'Error al obtener las acciones' })
    }
  };


const updateAction = async (req, res) => {
    try {
      //id de actions a modificar
      const { id } = req.params;

      const action = await Action.findByPk(id)
  
      if (!action) {
        return res.status(404).json({ error: 'Acción no encontrada' })
      }

      const type = action.dataValues.type;
      //condiciones para saber en que caso modificar un ingreso o un gasto cuando haya un id_category
      if(type === "ingresos"){
        if(req.body?.id_category ){
          const id_category = req.body.id_category;
          const data = { id_categoria_income: id_category , ...req.body}

          //buscamos en la categoria que exista el id que nos mandaron
          const category = await Category_income.findOne({where: {id: id_category}})
          
          //en caso que no error
          if(!category) return res.status(400).send("No coinciden los datos")

          const update_actions = await action.update(data)

          return res.status(200).json(update_actions);
        }
      }
      else{
        if(req.body?.id_category ){
          const id_category = req.body.id_category;
          const data = { id_categoria_bills: id_category , ...req.body}

          //buscamos en la categoria que exista el id que nos mandaron
          const category = await Category_bills.findOne({where: {id: id_category}})
          
          //en caso que no error
          if(!category) return res.status(400).send("No coinciden los datos")

          const update_actions = await action.update(data)

          return res.status(200).json(update_actions);
        }
      }
      
      action.set(req.body);
      await action.save();
  
      return res.status(200).json({ mensaje: 'Acción actualizada exitosamente', action })
    } catch (error) {
      console.error('Error al actualizar la acción:', error);
      res.status(500).json({ error: 'Error al actualizar la acción' })
    }
  }

  
  const deleteAction = async (req, res) => {
    try {
      const { id } = req.params;
  
      const action = await Action.findByPk(id)
  
      if (!action) {
        return res.status(404).json({ error: 'Acción no encontrada' })
      }
  
      await action.destroy()
  
      res.status(200).json({ mensaje: 'Acción eliminada exitosamente' })
    } catch (error) {
      console.error('Error al eliminar la acción:', error);
      res.status(500).json({ error: 'Error al eliminar la acción' })
    }
  };
  
  
  

  

module.exports = { 
    createActions, 
    getActions,
    updateAction,
    deleteAction
  };
