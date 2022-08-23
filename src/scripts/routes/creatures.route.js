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
            
            // Separate different parts of the response into arrays
            for (let stat of res.data) {
                proficiencies.push({name: stat.prof_name, value: stat.prof_value});
                vulnerabilities.push(stat.vul_name);
                resistances.push(stat.res_name);
                senses.push({name: stat.sense_name, value: stat.sense_value});
                abilities.push({name: stat.ability_name, desc: stat.ability_desc});
                actions.push({name: stat.action_name, desc: stat.action_desc});

                if (stat.immune_type === 'damage') {
                    damageImmunities.push(stat.immune_name);
                } else if (stat.immune_type === 'condition') {
                    conditionImmunities.push(stat.immune_name);
                }
            }

            RemoveExtraCustomData(proficiencies, 'name');
            RemoveExtraCustomData(vulnerabilities);
            RemoveExtraCustomData(resistances);
            RemoveExtraCustomData(damageImmunities);
            RemoveExtraCustomData(conditionImmunities);
            RemoveExtraCustomData(senses, 'name');
            RemoveExtraCustomData(abilities, 'name');
            RemoveExtraCustomData(actions, 'name');

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
                    {name: 'Hover', value: res.data[0].hover_speed},
                    {name: 'Climb', value: res.data[0].climb_speed}
                ],
                proficiencies: proficiencies,
                vulnerabilities: vulnerabilities,
                resistances: resistances,
                damageImmunities: damageImmunities,
                conditionImmunities: conditionImmunities,
                senses: senses,
                abilities: abilities,
                actions: actions
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
function RemoveExtraCustomData(array, name) {
    if (name) {
        // Loop through array with objects
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i].name === array[i + 1].name) {
                array.splice(array[i].indexOf, 1);
                i--;
            }
        }
    } else {
        // Loops through array normally
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] === array[i + 1]) {
                array.splice(array[i].indexOf, 1);
                i--;
            }
        }
    }
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


