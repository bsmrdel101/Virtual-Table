const { indexConverter, findRelativeCell } = require('../src/scripts/utils');

describe ('Utils', () => {
    it ('Converts string with spaces into lowercase, with no spaces', () => {
        expect(indexConverter('Test Word')).toBe('test-word');
    });

    describe ('#findRelativeCell', () => {
        it ('Finds a cell given a specific x and y offset.', () => {
            findRelativeCell();
        });
    });
});