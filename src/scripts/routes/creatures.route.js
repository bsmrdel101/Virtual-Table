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
            let vulnerabilities = [];
            let resistances = [];
            let damageImmunities = [];
            let conditionImmunities = [];
            
            for (let stat of res.data) {
                vulnerabilities.push(stat.vul_name);
                resistances.push(stat.res_name);
                if (stat.immune_type === 'damage') {
                    damageImmunities.push(stat.immune_name);
                } else if (stat.immune_type === 'condition') {
                    conditionImmunities.push(stat.immune_name);
                }
            }

            for (let i = 0; i < vulnerabilities.length - 1; i++) {
                if (vulnerabilities[i] === vulnerabilities[i + 1]) {
                    vulnerabilities.splice(vulnerabilities[i].indexOf, 1);
                    i--;
                }
            }
            for (let i = 0; i < resistances.length - 1; i++) {
                if (resistances[i] === resistances[i + 1]) {
                    resistances.splice(resistances[i].indexOf, 1);
                    i--;
                }
            }
            for (let i = 0; i < damageImmunities.length - 1; i++) {
                if (damageImmunities[i] === damageImmunities[i + 1]) {
                    damageImmunities.splice(damageImmunities[i].indexOf, 1);
                    i--;
                }
            }
            for (let i = 0; i < conditionImmunities.length - 1; i++) {
                if (conditionImmunities[i] === conditionImmunities[i + 1]) {
                    conditionImmunities.splice(conditionImmunities[i].indexOf, 1);
                    i--;
                }
            }

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
                speeds: [
                    {name: 'Walk', value: res.data[0].walk_speed},
                    {name: 'Swim', value: res.data[0].swim_speed},
                    {name: 'Burrow', value: res.data[0].burrow_speed},
                    {name: 'Fly', value: res.data[0].fly_speed},
                    {name: 'Hover', value: res.data[0].hover_speed},
                    {name: 'Climb', value: res.data[0].climb_speed},
                ],
                proficiencies: [
                    {name: res.data[0].prof_name, value: res.data[0].prof_value}
                ],
                vulnerabilities: vulnerabilities,
                resistances: resistances,
                damageImmunities: damageImmunities,
                conditionImmunities: conditionImmunities
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

async function getCustomCreatures() {
    try {
        const res = await axios.get('/api/creatures');
        customCreatures = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //


