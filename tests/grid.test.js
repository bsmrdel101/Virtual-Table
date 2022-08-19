test('Generating grid', () => {
    setupGrid(60, 20, true);
    expect(cells.length).toBe(1200);
});
