const { removeExtraCustomData, getCreatureProficiencies, getCreatureConditionImmunities, getCreatureSenses, getCreatureAbilities, getCreatureActions, getCreatureLegendaryActions } = require('../src/scripts/routes/creatures.route');
const { getActionDesc, separateDmgRoll } = require('../src/scripts/creature-stats');

const legendaryActions = [
    {name: 'Detect', desc: 'Make a perception check.'},
    {name: 'Detect', desc: 'Make a perception check.'},
    {name: 'Yeast cannon', desc: 'Make another yeast cannon attack.'},
    {name: 'Yeast cannon', desc: 'Make another yeast cannon attack.'}
];
const vulnerabilities = [
    'Oven damage',
    'Oven damage',
    'Oven damage',
    'Oven damage'
];

const normalAction = 'Melee Attack: {{+9}} to hit. Shoot a beam of yeast at a target, dealing [[1d6 bludgeoning damage]].';
const noHitAction = 'Melee Attack: +9 to hit. Shoot a beam of yeast at a target, dealing [[1d6 bludgeoning damage]].';
const noDmgAction = 'Melee Attack: {{+9}} to hit. Shoot a beam of yeast at a target, dealing 1d6 bludgeoning damage.';

const actionWithoutOptions = {
    actions: [],
    attack_bonus: 2,
    damage: [{
        damage_dice: "1d4",
        damage_type: {index: 'bludgeoning', name: "Bludgeoning", url: "/api/damage-types/bludgeoning"}
    }],
    desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
    name: "Club"
};
const actionWithOptions = {
    actions: [],
    attack_bonus: 6,
    damage: [{
        choose: 1,
        from: {
            option_set_type: 'options_array', options: [{
                damage_dice: "1d8+3",
                damage_type: {index: 'slashing', name: 'Slashing', url: '/api/damage-types/slashing'},
                notes: "One handed",
                option_type: "damage"
            },
            {
                damage_dice: "1d10+3",
                damage_type: {index: 'slashing', name: 'Slashing', url: '/api/damage-types/slashing'},
                notes: "Two handed",
                option_type: "damage"
            }
        ]},
        type: "damage"
    }],
    desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.",
    name: "Longsword"
};


describe ('Creature route', () => {
    it ('Removes duplicate items from an array of objects', () => {
        expect(removeExtraCustomData(legendaryActions, true)).toEqual([
            {name: 'Detect', desc: 'Make a perception check.'},
            {name: 'Yeast cannon', desc: 'Make another yeast cannon attack.'}
        ]);
    });

    it ('Removes duplicate items from an array of strings', () => {
        expect(removeExtraCustomData(vulnerabilities)).toEqual(['Oven damage']);
    });
});

describe ('Custom creature data', () => {
    // getActionDesc //

    it ('Returns a string that separates the content within curly and square brackets.', () => {
        expect(getActionDesc(normalAction)).toEqual({
            desc: 'Melee Attack: +9 to hit. Shoot a beam of yeast at a target, dealing 1d6 bludgeoning damage.',
            rolls: ['1d6 bludgeoning damage'],
            toHit: '9'
        });
    });

    it ('toHit should be an empty string if there are no curly braces.', () => {
        expect(getActionDesc(noHitAction)).toEqual({
            desc: 'Melee Attack: +9 to hit. Shoot a beam of yeast at a target, dealing 1d6 bludgeoning damage.',
            rolls: ['1d6 bludgeoning damage'],
            toHit: ''
        });
    });

    it ('rolls should be an empty array if there are no square braces.', () => {
        expect(getActionDesc(noDmgAction)).toEqual({
            desc: 'Melee Attack: +9 to hit. Shoot a beam of yeast at a target, dealing 1d6 bludgeoning damage.',
            rolls: [],
            toHit: '9'
        });
    });

    // separateDmgRoll //
    
    it ('Should split a string into it\'s damage dice and damage type.', () => {
        expect(separateDmgRoll('1d6 bludgeoning damage')).toEqual({
            damageDice: "1d6",
            damageType: "bludgeoning"
        });
    });
});

describe ('Creature actions data', () => {
    it ('Separate the attack bonus and damage dice.', () => {
        expect(getCreatureActions([actionWithoutOptions])).toEqual([{
            attack_bonus: 2,
            damage: [{
                damageDice: "1d4",
                damageType: 'bludgeoning'
            }],
            desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
            name: "Club"
        }]);
    });

    it ('Separate the attack bonus and damage dice, with attack options', () => {
        expect(getCreatureActions([actionWithOptions])).toEqual([{
            attack_bonus: 6,
            damage: [
                {
                    damageDice: "1d8+3",
                    damageType: 'slashing'
                },
                {
                    damageDice: "1d10+3",
                    damageType: 'slashing'
                }
            ],
            desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.",
            name: "Longsword"
        }]);
    });
});