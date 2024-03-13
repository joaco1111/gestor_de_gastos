const { Router } = require('express');
const { users } = require('../../users.json');

const router = Router();

router.get('/users', (req, res) => {
    return res.send(users)
})


module.exports = router