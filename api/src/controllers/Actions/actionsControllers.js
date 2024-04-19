const { Action, CategoryBills, CategoryIncome, CreditCard} = require('../../db.js');

const createActions = async (req, res) => {
  try {
    const { type, quantity, date, description = "", idCategory, cuotas, creditCardName, paymentMethod, creditCardId, pending } = req.body;
    const idUser = req.userID;

    const typeCategory = {}

    
    //en caso de no tener datos completos 
    if (!type || !date || !quantity || !idCategory || !idUser) {
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

      typeCategory['idCategoryIncome'] = idCategory;
      
    }

    else{
      
      const categoryBills = await CategoryBills.findOne({where: {id: idCategory}});
      
      //en caso de no encontrar dicha categoria
      if(!categoryBills) return res.status(400).send("No coinciden los datos");

      typeCategory['idCategoryBills'] = idCategory;
    }
  
    let creditcardFound = await CreditCard.findOne({ where: { name: creditCardName } })

    if (!creditcardFound) {
      creditcardFound = await CreditCard.create({ name: creditCardName })
    }

    const newAction = await Action.create({
      type,
      date,
      quantity,
      description,
      cuotas,
      creditCardName,
      paymentMethod,
      creditCardId: creditcardFound.id,
      pending,
      ...typeCategory,
      idUser: idUser
    })
    return res.status(200).json(newAction);


  } catch (error) {
    console.error('Error al crear la acción:', error)
    res.status(500).json({ error: 'Error al crear la acción' })
  }
};


const getActions = async (req, res) => {
  try {
    const { page = 1, limit = 5, date, type, category, orderBy, orderDirection, pending } = req.query;
    const idUser = req.userID;
    console.log(idUser);
    const offset = (page - 1) * limit;

    // Creamos el objeto condicional que debe tener el id del usuario para buscar solo las actions con ese id
    const where = {
      "idUser": idUser,
    };

    if (pending !== undefined) {
      where.pending = pending === 'true';
    }

    if (date) {
      where.date = date;
    }
    
    if (type) {
      where.type = type;
    }
    
    if (category) {
      if (type === "ingresos") {
        where.idCategoryIncome = category;
      } else {
        where.idCategoryBills = category;
      }
    }

    const order = [];
    if (orderBy && orderDirection) {
      let selectedOrderBy = '';
      let selectedOrderDirection = '';
      
      if (orderBy === 'date' || orderBy === 'quantity') {
        selectedOrderBy = orderBy;
      }
    
      if (orderDirection === 'ASC' || orderDirection === 'DESC') {
        selectedOrderDirection = orderDirection;
      }
      
      if (selectedOrderBy && selectedOrderDirection) {
        order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()]);
      }
    }
    
    const resultFilter = await Action.findAndCountAll({
      where: { ...where },
      limit,
      offset,
      include: [{ model: CategoryBills }, { model: CategoryIncome }, {model: CreditCard}],
      order: order.length > 0 ? order : undefined, // Si no hay orden, se pasa undefined
      attributes: { include: ['description'] },
    });

    if (resultFilter.rows.length === 0) {
      return res.status(400).send("No se encontraron acciones con los filtros proporcionados");
    }

    return res.status(200).json(resultFilter);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}






  const getActionById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const action = await Action.findOne({
        where: { id },
        attributes: ["id", "type", "date", "quantity", "description", "cuotas", "paymentMethod"],
        include: [
          {
            model: CategoryBills,
            attributes: ["name"]
          },
          {
            model: CategoryIncome,
            attributes: ["name"]
          },
          {
            model: CreditCard,
            attributes: ["name"]
          }
        ]
      });
  
      // En caso de no encontrar la acción
      if (!action) return res.status(404).send("Acción no encontrada");
  
      res.status(200).json(action);
  
    } catch (error) {
  
      console.error('Error al obtener la acción:', error)
      res.status(500).json({ error: 'Error al obtener la acción' })
    }
  };
  


  const updateAction = async (req, res) => {
    try {
      const { id } = req.params;
      const { pending } = req.body;
      const action = await Action.findByPk(id);
  
      if (!action) {
        return res.status(404).json({ error: 'Acción no encontrada' });
      }
  
      const type = action.dataValues.type;
      let data = {};
  
      if (type === "ingresos" && req.body.idCategory) {
        const idCategory = req.body.idCategory;
        const category = await CategoryIncome.findOne({ where: { id: idCategory } });
  
        if (!category) {
          return res.status(400).send("No coinciden los datos de la categoría de ingresos");
        }
  
        data = { idCategoryIncome: idCategory, ...req.body };
      } else if (type !== "ingresos" && req.body.idCategory) {
        const idCategory = req.body.idCategory;
        const category = await CategoryBills.findOne({ where: { id: idCategory } });
  
        if (!category) {
          return res.status(400).send("No coinciden los datos de la categoría de gastos");
        }
  
        data = { idCategoryBills: idCategory, ...req.body };
      }
  
      if (req.body.creditCardId) {
        const creditCardId = req.body.creditCardId;
        const creditCard = await CreditCard.findOne({ where: { id: creditCardId } });
  
        if (!creditCard) {
          return res.status(400).send("No coinciden los datos de la tarjeta de crédito");
        }
  
        data = { creditCardId, ...data };
      }

      if (pending !== undefined) {
        data.pending = pending;
      }
  
      const updateAction = await action.update(data);
  
      return res.status(200).json(updateAction);
    } catch (error) {
      console.error('Error al actualizar la acción:', error);
      res.status(500).json({ error: 'Error al actualizar la acción' });
    }
  };
  
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
    getActionById,
    updateAction,
    deleteAction
  };