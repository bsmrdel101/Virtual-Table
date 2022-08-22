const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "creatures"
        WHERE "user_id"=$1
        ORDER BY "id";
    `);
    const sqlValues = [
        req.user.id
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});


module.exports = router;