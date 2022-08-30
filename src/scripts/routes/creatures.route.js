// === GET routes === //

async function getCreatures() {
    try {
        const res = await axios.get('https://www.dnd5eapi.co/api/monsters');
        creatures = res.data.results;
    } catch (err) {
        console.log(err);
    }
}

async function getSpecificCreature(index, custom) {
    try {
        if (custom) {
            const res = await axios.get(`/api/creatures/${index}`);
            let proficiencies = [];
            let vulnerabilities = [];
            let resistances = [];
            let damageImmunities = [];
            let conditionImmunities = [];
            let senses = [];
            let abilities = [];
            let actions = [];
            let legActions = [];
            
            // Separate different parts of the response into arrays
            for (let stat of res.data) {
                proficiencies.push({name: stat.prof_name, value: stat.prof_value});
                vulnerabilities.push(stat.vul_name);
                resistances.push(stat.res_name);
                senses.push({name: stat.sense_name, value: stat.sense_value});
                abilities.push({name: stat.ability_name, desc: stat.ability_desc});
                actions.push({name: stat.action_name, desc: stat.action_desc});
                legActions.push({name: stat.leg_action_name, desc: stat.leg_action_desc});

                if (stat.immune_type === 'damage') {
                    damageImmunities.push(stat.immune_name);
                } else if (stat.immune_type === 'condition') {
                    conditionImmunities.push(stat.immune_name);
                }
            }

            proficiencies = removeExtraCustomData(proficiencies, true);
            vulnerabilities = removeExtraCustomData(vulnerabilities);
            resistances = removeExtraCustomData(resistances);
            damageImmunities = removeExtraCustomData(damageImmunities);
            conditionImmunities = removeExtraCustomData(conditionImmunities);
            senses = removeExtraCustomData(senses, true);
            abilities = removeExtraCustomData(abilities, true);
            actions = removeExtraCustomData(actions, true);
            legActions = removeExtraCustomData(legActions, true);

            const modifiedRes = {
                id: res.data[0].id,
                user_id: res.data[0].user_id,
                index: res.data[0].index,
                name: res.data[0].name,
                size: res.data[0].size,
                type: res.data[0].type,
                alignment: res.data[0].alignment,
                ac: res.data[0].ac,
                hit_points: res.data[0].hit_points,
                hit_dice: res.data[0].hit_dice,
                str: res.data[0].str,
                dex: res.data[0].dex,
                con: res.data[0].con,
                int: res.data[0].int,
                wis: res.data[0].wis,
                char: res.data[0].char,
                cr: res.data[0].cr,
                xp: res.data[0].xp,
                languages: res.data[0].list,
                speeds: [
                    {name: 'Walk', value: res.data[0].walk_speed},
                    {name: 'Swim', value: res.data[0].swim_speed},
                    {name: 'Burrow', value: res.data[0].burrow_speed},
                    {name: 'Fly', value: res.data[0].fly_speed},
                    {name: 'Climb', value: res.data[0].climb_speed}
                ],
                proficiencies: proficiencies,
                vulnerabilities: vulnerabilities,
                resistances: resistances,
                damageImmunities: damageImmunities,
                conditionImmunities: conditionImmunities,
                senses: senses,
                abilities: abilities,
                actions: actions,
                legActions: legActions
            };
            console.log(modifiedRes);
            return modifiedRes;
        } else {
            const res = await axios.get(`https://www.dnd5eapi.co/api/monsters/${index}`);
            return res.data;
        }
    } catch (err) {
        console.log(err);
    }
}

// Remove duplicate data from the database
function removeExtraCustomData(array, name) {
    let result = [];
    if (name) {
        // Loop through array with objects
        for (let i = 0; i < array.length - 1; i++) {
            if (!result.some((item) => array[i].name === item.name)) {
                result.push(array[i]);
            }
        }
    } else {
        // Loops through array normally
        for (let i = 0; i < array.length - 1; i++) {
            if (result.includes(array[i])) {
                result.push(array[i]);
            }
        }
    }
    return result;
}

async function getCustomCreatures() {
    try {
        const res = await axios.get('/api/creatures');
        customCreatures = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

async function addCreature(payload) {
    console.log(payload);
    try {
        await axios.post('/api/creatures', payload);
    } catch (err) {
        console.log(err);
    }
}

if (typeof module !== 'undefined') module.exports = {
    removeExtraCustomData
};