// aliases
const createEl = document.createElement.bind(document);
const getEl = document.getElementById.bind(document);
const qsA = document.querySelectorAll.bind(document);


// constants
const CORNER_RADIUS_DEFAULT = 50;
const CORNER_RADIUS_RANDOM_MIN = 20;
const CORNER_RADIUS_RANDOM_MAX = 50;
const LETTERBOX_DEFAULT = false;
const RANDOM_DELAY_MIN = 5;
const RANDOM_DELAY_MAX = 10;
const RANDOM_PIC_URL = 'https://picsum.photos/1920/1080';


// globals
let cornerRadius = CORNER_RADIUS_DEFAULT;
let letterbox = LETTERBOX_DEFAULT; // sets viewport perspective to 16:9


// Check query string for variable values
const params = new URLSearchParams(window.location.search)

if (params.has('cornerRadius')) {
    cornerRadius = parseInt(params.get('cornerRadius'));
}

if (params.has('letterbox')) {
    letterbox = !!params.get('letterbox');
}


// elements
const $corner1 = getEl('corner1');
const $corner2 = getEl('corner2');
const $corner3 = getEl('corner3');
const $corner4 = getEl('corner4');
const $iframe = getEl('random-website');
const $viewport = getEl('viewport');


// initial setup
// create corner visual indicator 
const svgCorner = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#ff00a7"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="white" stroke-width="3"/>
    <circle cx="50" cy="50" r="40" fill="none" stroke="#ffcae5" stroke-width="3"/>
</svg>`;

$corner1.innerHTML = svgCorner;
$corner2.innerHTML = svgCorner;
$corner3.innerHTML = svgCorner;
$corner4.innerHTML = svgCorner;

if (letterbox) $viewport.classList.add('letterbox');


// general functions
function getRandomSite(tMin, tMax) {
    $iframe.style.display = 'block';

    setTimeout(() => {
        $iframe.src = 'https://www.ph4.org/r.php'
        getRandomSite(tMin, tMax)
    }, getRandomDuration(tMin, tMax))
}

function getRandomBgImg(tMin, tMax) {
    $iframe.style.display = 'none';

    getURL(RANDOM_PIC_URL)
        .then(response => {
            changeElementBackground($viewport, response)
        })
        .then(() => {
            setTimeout(() => {
                getRandomBgImg(tMin, tMax)
            }, getRandomDuration(tMin, tMax))
        });
}

function getRandomDuration(min, max) {
    return 1000 * getRandomNum(min, max)
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

async function getURL(url) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();

        req.onload = () => {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(new Error('Image load failed; error code:' + req.statusText));
            }
        }

        req.responseType = 'blob';
        req.open("GET", url);
        req.send();
    })
}

function changeElementBackground($el, blob) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        $el.style.background = `url(${this.result})`
        changeCornerSizeRandomly();
    }, false);

    reader.readAsDataURL(blob);
}

function changeCornerSizeRandomly() {
    const newRadius = getRandomNum(CORNER_RADIUS_RANDOM_MIN, CORNER_RADIUS_RANDOM_MAX);

    qsA('.corner').forEach($el => {
        $el.style.width = newRadius + 'px';
        $el.style.height = newRadius + 'px';
    });
}


// start program
if (params.has('start')) getRandomBgImg(RANDOM_DELAY_MIN, RANDOM_DELAY_MAX);