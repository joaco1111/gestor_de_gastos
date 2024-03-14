const { Action, Category } = require('../../db.js');
const allowedCategories = require('../../../categories.json');

const createActions = async (req, res) => {
  try {
    const { type, quantity, date, category } = req.body
    
    //en caso de no tener datos completos 
    if (!type || !date || !quantity || !category) {
      return res.status(400).send('Completar los campos obligatorios')
    }

    //en caso de ser diferente el tipo de ingreso y gasto, se envia un mensaje de error
    if (type !== 'ingresos' && type !== 'gastos') {
      return res.status(400).json({ error: 'Tipo de acción no válido' })
    }

    //en caso de incluir otro tipo de categoria---- mensaje de error
    if (!allowedCategories[type].includes(category)) {
      return res.status(400).json({ error: 'Categoría no válida para el tipo de acción' })
    }


    let categories = await Category.findOne({ where: { name: category } })
    
    if (!categories) {
      categories = await Category.create({ name: category })
    }

    const newAction = await Action.create({
      type,
      date,
      quantity
    });

    await newAction.setCategory(categories)
    res.status(201).json({ mensaje: 'Acción creada exitosamente', newAction })
  } catch (error) {
    console.error('Error al crear la acción:', error)
    res.status(500).json({ error: 'Error al crear la acción' })
  }
};

const getActions = async (req, res) => {
    try {
      const actions = await Action.findAll({ include: Category })
      res.status(200).json(actions)
    } catch (error) {
      console.error('Error al obtener las acciones:', error)
      res.status(500).json({ error: 'Error al obtener las acciones' })
    }
  };


  const updateAction = async (req, res) => {
    try {
      const { id } = req.params
      const { type, quantity, date, category } = req.body
  
      const action = await Action.findByPk(id)
  
      if (!action) {
        return res.status(404).json({ error: 'Acción no encontrada' })
      }
  
      if (type) action.type = type
      if (quantity) action.quantity = quantity
      if (date) action.date = date
  
      if (category) {
        let categoryInstance = await Category.findOne({ where: { name: category } })
        if (!categoryInstance) {
          categoryInstance = await Category.create({ name: category })
        }
        await action.setCategory(categoryInstance)
      }
  
      await action.save()
  
      res.status(200).json({ mensaje: 'Acción actualizada exitosamente', action })
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
    updateAction };
