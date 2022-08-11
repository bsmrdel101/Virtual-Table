const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT "id", "image", "size" FROM "tokens"
        WHERE "user_id"=$1;
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

router.post('/', (req, res) => {
    const sqlText =`
        INSERT INTO "tokens" ("user_id", "image", "size")
        VALUES ($1, $2, $3);
    `;
    const sqlValues = [
        req.user.id,
        req.body.image,
        req.body.size
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

module.exports = router;