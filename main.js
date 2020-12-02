// aliases
const createEl = document.createElement.bind(document);
const getEl = document.getElementById.bind(document);
const qsA = document.querySelectorAll.bind(document);

const $svgCorner = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50"/>
</svg>`;

const $corner1 = getEl('corner1');
$corner1.innerHTML = $svgCorner;

$corner1.addEventListener('mousemove', (e)=> {
    console.log('m', e.x, e.y);
})
