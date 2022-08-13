const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "characters"
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

router.post('/', (req, res) => {
    const sqlText =`
        INSERT INTO "characters" ("user_id", "name", "class", "race", "background", "level", "ac", "max_health", "current_health", "temp_health", "prof_bonus", "movement", "initiative", "inspiration", "hit_dice", "str", "dex", "con", "int", "wis", "char")
        VALUES ($1, $2);
    `;
    const sqlValues = [
        req.user.id,
        req.body.name,
        req.body.class,
        req.body.race,
        req.body.background,
        req.body.level,
        req.body.ac,
        req.body.maxHealth,
        req.body.maxHealth,
        0,
        req.body.profBonus,
        req.body.movement,
        req.body.initiative,
        req.body.hitDice,
        req.body.str,
        req.body.dex,
        req.body.con,
        req.body.int,
        req.body.wis,
        req.body.char
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});


module.exports = router;