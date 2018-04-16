$ = nut;

function lessThan(card1, card2) {
    if (!card1 || !card2) return true;
    var a = +card1.textContent;
    var b = +card2.textContent;
    return (a < b || a - b === 10);
}

function scoreOf(diff, t) {
    return Math.floor(Math.pow(Math.abs(diff), 1 + t / 20)) * (t + 1)
}

var drake = dragula([
    $.el('#hand'), 
    $.el('#asc-1'),
    $.el('#asc-2'),
    $.el('#dsc-1'),
    $.el('#dsc-2'),
], {
    moves: (_, target) => target === $.el('#hand'),
    accepts: (card, pile) => {
        if (pile === $.el('#hand') || pile.innerHTML === "") {
            return true;
        }
        var top = $.el('.placed', pile);
        return pile.id.startsWith('asc-')
            ? lessThan(top, card)
            : lessThan(card, top);
    },
});

drake.on('drop', (el, target, source, sibling) => {
    if (target === $.el('#hand')) return;
    var top = $.el('.placed', target);
    var val = 0;
    if (top !== null) {
        val = +top.textContent;
    }
    score += scoreOf(+el.textContent - val, times);
    $.el('#score').textContent = score;
    target.innerHTML = "";
    target.appendChild(el);
    el.classList.add('placed');
    done();
});

drake.on('over', (card, pile) => {
    if (pile.id === 'hand') return;
    var top = $.el('.placed', pile);
    if (top) top.style.display = 'none';
});

drake.on('out', (card, pile) => {
    if (pile.id === 'hand') return;
    var top = $.el('.placed', pile);
    if (top) top.style.display = 'inline-block';
});

function range(n) {
    var arr = [];
    for (var i = 2; i <= n; i++) {
        arr.push(i);
    }
    return arr;
}

function shuffle(xs) {
    for (var i = 0; i < xs.length; i++) {
        var j = Math.floor(xs.length * Math.random());
        var tmp = xs[i];
        xs[i] = xs[j];
        xs[j] = tmp;
    }
    return xs;
}

var BLUE = '#4682b4';
var YELLOW = '#FFEF00';
var RED = '#DA2C43';

var palette = shuffle([[YELLOW, RED], [YELLOW, BLUE], [BLUE, RED]])[0];
var hi = palette[1];
var lo = palette[0];

function lerpColor(a, b, amount) { 
    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

function drawCard(value) {
    return kr.div({'class': 'card', 'style': 'background-color: '+ lerpColor(lo, hi, (value-2)/96) +';' }, value);
}

var score = 0;
var xs = shuffle(range(99));
var times = 0;
function done() {
    times++;
    $.el('#remaining').textContent = $.el('#hand').children.length + xs.length;
    if (times % 2 === 0 && xs.length !== 0) {
        hand.appendChild(drawCard(xs.pop()));
        hand.appendChild(drawCard(xs.pop()));
    }
}

for (var t = 0; t < 8; t++) {
    hand.appendChild(drawCard(xs.pop()));
}
$.el('#remaining').textContent = '98';
