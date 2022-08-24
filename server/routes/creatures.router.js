const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "creatures"
        JOIN "speeds"
            ON "creatures"."id"="speeds"."creature_id"
        WHERE "user_id"=$1
        ORDER BY "creatures"."id";
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

router.get('/:index', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "creatures"
        JOIN "speeds"
            ON "creatures"."id"="speeds"."creature_id"
        JOIN "proficiencies"
            ON "creatures"."id"="proficiencies"."creature_id"
        JOIN "vulnerabilities"
            ON "creatures"."id"="vulnerabilities"."creature_id"
        JOIN "resistances"
            ON "creatures"."id"="resistances"."creature_id"
        JOIN "immunities"
            ON "creatures"."id"="immunities"."creature_id"
        JOIN "senses"
            ON "creatures"."id"="senses"."creature_id"
        JOIN "creature_abilities"
            ON "creatures"."id"="creature_abilities"."creature_id"
        JOIN "creature_actions"
            ON "creatures"."id"="creature_actions"."creature_id"
        JOIN "languages"
            ON "creatures"."id"="languages"."creature_id"
        JOIN "legendary_actions"
            ON "creatures"."id"="legendary_actions"."creature_id"
        WHERE "index"=$1
        ORDER BY "creatures"."id";
    `);
    const sqlValues = [
        req.params.index
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});


module.exports = router;