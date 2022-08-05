// Clamp number between two values
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Will find and return a cell with the parameters given
function findCell(x, y) {
    for (const cell of cells) {
        if (cell.getAttribute('x') === x.toString() && cell.getAttribute('y') === y.toString()) {
            return cell;
        }
    }
}