const { removeExtraCustomData } = require('../src/scripts/routes/creatures.route');
let test1 = [{name: 'hello'}, {name: 'hello'}, {name: 'hi'}];
let test2 = [{name: 'action', desc: 'action description'}];

describe ('Creatures route', () => {
    it ('Removes duplicate items from an array', () => {
        console.log(removeExtraCustomData(test2, true));
        expect(removeExtraCustomData(test2, true)).toEqual([{name: 'action', desc: 'action description'}]);

        expect(removeExtraCustomData(test1, true)).toBe([{name: 'hello'}, {name: 'hi'}]);
    });
});``