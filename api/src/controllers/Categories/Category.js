const { CategoryBills, CategoryIncome} = require('../../db');

const getCategoryBills = async( req, res) => {
    try {

        const bills = await CategoryBills.findAll();
        return res.status(200).json(bills)
        
    } catch (error) {
        return res.status(500).send(error.message);
    }   
}

const getCategoryIncomes = async( req, res) => {
    try {
        const incomes = await CategoryIncome.findAll();
        return res.status(200).json(incomes);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }   
}

const createCategoryBills = async(req, res) => {
    try {
        const { name } = req.body;
        const newCategoryBills = await CategoryBills.create({
            name
        });
        return res.status(201).json(newCategoryBills);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createCategoryIncomes = async(req, res) => {
    try {
        const { name } = req.body;
        const newCategoryIncomes = await CategoryIncome.create({
            name
        });
        return res.status(201).json(newCategoryIncomes);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteCategoryBills = async(req, res) => {
    try {
        const { id } = req.params;
        const categoryBill = await CategoryBills.findByPk(id);
        if(!categoryBill) {
            res.status(404).json({ error: 'Categoría de gastos no encontrada' });
        }
        res.status(200).json(categoryBill);
        await categoryBill.destroy();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría de gastos' });
    }
}

const deleteCategoryIncomes = async(req, res) => {
    try {
        const { id } = req.params;
        const categoryIncome = await CategoryIncome.findByPk(id);
        if(!categoryIncome) {
            res.status(404).json({ error: 'Categoría de ingresos no encontrada' });
        }
        res.status(200).json(categoryIncome);
        await categoryIncome.destroy();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría de ingresos' });
    }
}

module.exports = {
    getCategoryBills,
    getCategoryIncomes,
    createCategoryBills,
    createCategoryIncomes,
    deleteCategoryBills,
    deleteCategoryIncomes
}