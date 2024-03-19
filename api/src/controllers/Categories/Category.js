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
module.exports = {
    getCategoryBills,
    getCategoryIncomes
}