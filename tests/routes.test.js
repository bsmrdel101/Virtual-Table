
// let arrObj1 = [{name: 'name', desc: 'desc'}, {name: 'name', desc: 'desc'}];
// let arrObj2 = [{name: 'name', desc: 'desc'}, {name: 'not name', desc: 'desc'}];
// let arrStr1 = ['name', 'name', 'name'];
// let arrStr2 = ['name', 'na-me'];


// // {name: stat.action_name, desc: stat.action_desc}
// describe ('Creatures route', () => {
//     it ('Should remove duplicate items with objects', () => {
//         expect(removeExtraCustomData(arrObj1, 'name')).toBe([{name: 'name', desc: 'desc'}]);
//     });

//     it ('It should remove any objects', () => {
//         expect(removeExtraCustomData(arrObj2, 'name')).toBe([{name: 'name', desc: 'desc'}, {name: 'not name', desc: 'desc'}]);
//     });

//     it ('Should remove duplicate item with strings', () => {
//         expect(removeExtraCustomData(arrStr1)).toBe(['name']);
//     });

//     it ('It should remove any strings', () => {
//         expect(removeExtraCustomData(arrStr2)).toBe(['name', 'na-me']);
//     });
// });