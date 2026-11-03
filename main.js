const RATIO = 8;
const SEARCH_RADIUS = 100;

const byId = id => document.getElementById(id);

const getCoords = world => {
    const values = ['x1', 'z1', 'x2', 'z2'].map(axis => {
        const { value } = byId(`${world}_${axis}`);
        return value.trim() === '' ? NaN : Number(value);
    });
    return values.every(Number.isFinite) ? values : null;
};

const linkOffsets = (first, second) =>
    first === second ? [0, 0]
    : first >= second ? [-SEARCH_RADIUS, SEARCH_RADIUS]
    : [SEARCH_RADIUS, -SEARCH_RADIUS];

const toNether = (x1, z1, x2, z2) => {
    const [x1Offset, x2Offset] = linkOffsets(x1, x2);
    const [z1Offset, z2Offset] = linkOffsets(z1, z2);

    return [
        Math.floor((x1 + x1Offset) / RATIO),
        Math.floor((z1 + z1Offset) / RATIO),
        Math.floor((x2 + x2Offset) / RATIO),
        Math.floor((z2 + z2Offset) / RATIO),
    ];
};

const calculate = () => {
    const coords = getCoords('ow');

    if (!coords) {
        alert('Please enter all four overworld coordinates!');
        return;
    }

    const [x1, z1, x2, z2] = toNether(...coords);

    byId('n_x1').value = x1;
    byId('n_z1').value = z1;
    byId('n_x2').value = x2;
    byId('n_z2').value = z2;
};

byId('calculate').addEventListener('click', calculate);

document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.target instanceof HTMLButtonElement) {
        return;
    }
    event.preventDefault();
    calculate();
});
