const jwt = require('jsonwebtoken');
const { Collaborations, User } = require('../../db');
const { Op } = require('sequelize');

const getCollaborations = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", orderBy, orderDirection } = req.query;
        const offset = (page - 1) * limit;

        const order = [];
        if (orderBy && orderDirection) {
            let selectedOrderBy = '';
            let selectedOrderDirection = '';

            if (orderBy === 'date' || orderBy === 'amount' || orderBy === 'name') {
                selectedOrderBy = orderBy;
            }

            if (orderDirection === 'ASC' || orderDirection === 'DESC') {
                selectedOrderDirection = orderDirection;
            }

            if (selectedOrderBy && selectedOrderDirection) {
                order.push([selectedOrderBy, selectedOrderDirection.toUpperCase()]);
            }
        }

        let queryOptions = {
            attributes: ["name", 'date', 'amount', "transactionId"],
            limit,
            offset,
        };

        if (order.length > 0) {
            queryOptions.order = order;
        }

        if (search === "") {
            const { count, rows: collaborations } = await Collaborations.findAndCountAll(queryOptions);
            if (count === 0) return res.status(404).send("No existen colaboraciones.");
            return res.status(200).json({ count, collaborations });
        }

        const { count, rows: collaborations } = await Collaborations.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            ...queryOptions
        });

        if (count === 0) return res.status(404).send("No se encontraron resultados");
        return res.status(200).json({ count, collaborations });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recibir información de donaciones');
    }
}

module.exports = {
    getCollaborations,
}
