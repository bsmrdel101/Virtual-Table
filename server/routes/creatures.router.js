const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT *, "creatures"."id" AS "ID" FROM "creatures"
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

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const sqlText =`
        INSERT INTO "creatures" ("user_id", "index", "image", "name", "size", "type", "alignment", "ac", "hit_points", "hit_dice", "str", "dex", "con", "int", "wis", "char", "cr", "xp")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);
    `;
    const sqlValues = [
        req.user.id,
        req.body.index,
        req.body.image,
        req.body.name,
        req.body.size,
        req.body.type,
        req.body.alignment,
        req.body.ac,
        req.body.hp,
        req.body.hitDice,
        req.body.str,
        req.body.dex,
        req.body.con,
        req.body.int,
        req.body.wis,
        req.body.char,
        req.body.cr,
        req.body.xp
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

router.post('/speeds', rejectUnauthenticated, (req, res) => {
    console.log(req.body.id, req.body.creature.speeds);
    const sqlText =`
        INSERT INTO "speeds" ("creature_id", "walk_speed", "swim_speed", "burrow_speed", "fly_speed", "hover__speed", "climb_speed")
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    const sqlValues = [
        req.body.id,
        req.body.creature.speeds[0],
        req.body.creature.speeds[0],
        req.body.creature.speeds[0],
        req.body.creature.speeds[0],
        req.body.creature.speeds[0],
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
})

module.exports = router;