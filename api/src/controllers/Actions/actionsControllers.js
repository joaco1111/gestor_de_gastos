const { Action, CategoryBills, CategoryIncome} = require('../../db.js');

const createActions = async (req, res) => {
  try {
    const { idUser, type, quantity, date, idCategory } = req.body;
    
    //en caso de no tener datos completos 
    if (!type || !date || !quantity || !idCategory  || !idUser) {
      return res.status(400).send('Completar los campos obligatorios')
    }

    //en caso de ser diferente el tipo de ingreso y gasto, se envia un mensaje de error
    if (type !== 'ingresos' && type !== 'gastos') {
      return res.status(400).json({ error: 'Tipo de acción no válido' })
    }

    if(type === "ingresos"){
      const categoryIncome = await CategoryIncome.findOne({where: {id: idCategory}});
      
      //en caso de no encontrar dicha categoria
      if(!categoryIncome) return res.status(400).send("No coinciden los datos");

      const newAction = await Action.create({
        type, 
        date, 
        quantity, 
        idCategoryIncome: idCategory,
        idUser: idUser
      })

      return res.status(200).json(newAction);
    }

    else{
      
      const categoryBills = await CategoryBills.findOne({where: {id: idCategory}});
      
      //en caso de no encontrar dicha categoria
      if(!categoryBills) return res.status(400).send("No coinciden los datos");

      const newAction = await Action.create({
        type, 
        date, 
        quantity, 
        idCategoryBills: idCategory,
        idUser: idUser
      })

      return res.status(200).json(newAction);
    }


    //LUEGO LO REFACTORIZAMOS BIEN :)


  } catch (error) {
    console.error('Error al crear la acción:', error)
    res.status(500).json({ error: 'Error al crear la acción' })
  }
};


const getActions = async (req, res) => {
    try {
      const {page = 1, limit = 10} = req.query;
      const offset = (page - 1) * limit; 

      const actions = await Action.findAndCountAll({
        attributes: ["id","type", "date", "quantity"], 
        offset,
        limit,
        include:[
        {
          model: CategoryBills,
          attributes: ["name"]
        },{
          model: CategoryIncome,
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
        if(req.body?.idCategory ){
          const idCategory = req.body.idCategory;
          const data = { idCategoryIncome: idCategory , ...req.body}

          //buscamos en la categoria que exista el id que nos mandaron
          const category = await CategoryIncome.findOne({where: {id: idCategory}})
          
          //en caso que no error
          if(!category) return res.status(400).send("No coinciden los datos")

          const updateActions = await action.update(data)

          return res.status(200).json(updateActions);
        }
      }
      else{
        if(req.body?.idCategory ){
          const idCategory = req.body.idCategory;
          const data = { idCategoryBills: idCategory , ...req.body}

          //buscamos en la categoria que exista el id que nos mandaron
          const category = await CategoryBills.findOne({where: {id: idCategory}})
          
          //en caso que no error
          if(!category) return res.status(400).send("No coinciden los datos")

          const updateActions = await action.update(data)

          return res.status(200).json(updateActions);
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
