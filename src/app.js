$ = nut;
var hand = $.el('#hand');

var drake = dragula([
    hand, 
    $.el('#a1'),
    $.el('#a2'),
    $.el('#d1'),
    $.el('#d2'),
], {
    moves: (_, target) => target === hand,
    accepts: (card, pile) => {
        if (pile === hand) {
            return true;
        }
        return game.accepts(pile.id, +card.textContent);
    },
});

drake.on('drop', (top, target) => {
    if (target === hand) {
        return;
    }
    target.innerHTML = "";
    target.appendChild(top);
    top.classList.add('top');
    game.move(target.id, +top.textContent);
    updateNumbers();
});

drake.on('over', (card, pile) => {
    var top = $.el('.top', pile);
    if (top) top.style.display = 'none';
});

drake.on('out', (card, pile) => {
    var top = $.el('.top', pile);
    if (top) top.style.display = 'inline-block';
});

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
    return kr.div({
        'class': 'card',
        'style': 'background-color: '+ lerpColor(lo, hi, (value-2)/96),
        }, value);
}

function updateNumbers() {
    $.el('#score').textContent = game.score;
    $.el('#remaining').textContent = game.remaining();
    $.el('#undocount').textContent = game.undoStack.length;
}

var game = new Game({
    newCards: (a, b) => {
        hand.appendChild(drawCard(a));
        hand.appendChild(drawCard(b));
    },
    undo: (removed, score, id, pile) => {
        var el = $.el('#'+id);
        el.innerHTML = '';
        if (pile.length > 0) {
            var top = drawCard(pile[pile.length - 1]);
            top.classList.add('top');
            el.appendChild(top);
        }
        hand.appendChild(drawCard(removed));
        updateNumbers();
    }
});
game.hand.forEach(card => hand.appendChild(drawCard(card)));
updateNumbers();

$.el('#undo').addEventListener('click', function() {
    game.undo();
});
