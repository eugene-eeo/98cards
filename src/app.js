$ = nut;
var hand = $.el('#hand');

var drake = dragula([
    hand, 
    $.el('#a1'),
    $.el('#a2'),
    $.el('#d1'),
    $.el('#d2'),
], {
    moves: function(_, target) {
        return target === hand;
    },
    accepts: function(card, pile) {
        if (pile === hand) {
            return true;
        }
        return game.accepts(pile.id, +card.textContent);
    },
});

drake.on('drop', function(top, target) {
    if (target === hand) {
        return;
    }
    target.innerHTML = "";
    target.appendChild(top);
    top.classList.add('top');
    game.move(target.id, +top.textContent);
    updateNumbers();
});

drake.on('over', function(card, pile) {
    var top = $.el('.top', pile);
    if (top) top.style.display = 'none';
});

drake.on('out', function(card, pile) {
    var top = $.el('.top', pile);
    if (top) top.style.display = 'inline-block';
});

var lo = '#fde396';
var hi = '#4682b4';

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
    if (game.canUndo()) {
        $.el('#undo').classList.add('enabled');
    } else {
        $.el('#undo').classList.remove('enabled');
    }
}

var game = new Game({
    newCards: function(a, b) {
        hand.appendChild(drawCard(a));
        hand.appendChild(drawCard(b));
    },
    undo: function(prevTop, score, id, newTop) {
        var pile = $.el('#'+id);
        pile.innerHTML = '';
        if (newTop !== null) {
            var top = drawCard(newTop);
            top.classList.add('top');
            pile.appendChild(top);
        }
        hand.appendChild(drawCard(prevTop));
        updateNumbers();
    }
});
updateNumbers();

$.el('#undo').addEventListener('click', function() {
    game.undo();
});

$.el('#help').addEventListener('click', function() {
    $.el('#help-dialog').classList.remove('hidden');
});

$.el('#close-help').addEventListener('click', function() {
    $.el('#help-dialog').classList.add('hidden');
});
