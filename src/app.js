$ = nut;
var hand = $.el('#hand');
var piles = $('.pile');
piles.push(hand);

var drake = dragula(piles, {
    moves: function(_, target) {
        return target === hand;
    },
    accepts: function(card, pile) {
        // always allow shuffling the hand
        // but check if card can be placed on top of one pile
        return (pile === hand) || game.accepts(pile.id, +card.textContent);
    },
});

drake.on('drop', function(card, target) {
    if (target === hand) {
        return;
    }
    target.innerHTML = "";
    target.appendChild(card);
    card.classList.add('top');
    game.move(target.id, +card.textContent);
    updateNumbers();
});

function changeTopCardStyle(style) {
    return function(card, pile) {
        var top = $.el('.top', pile);
        if (top) {
            top.style.display = style;
        }
    };
}

drake.on('over',   changeTopCardStyle('none'));
drake.on('shadow', changeTopCardStyle('none'));
drake.on('out',    changeTopCardStyle('inline-block'));

var LO = '#fde396';
var HI = '#4682b4';
//var LO = '#EFECDD';
//var HI = '#F0C859';


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
    var div = document.createElement('div');
    div.textContent = value;
    div.classList.add('card');
    div.style.backgroundColor = lerpColor(LO, HI, (value-2)/96);
    return div;
}

function updateNumbers() {
    $.el('#score').textContent = game.score;
    $.el('#remaining').textContent = game.remaining();
    $.el('#undo').classList.toggle('enabled', game.canUndo());
    var cards = [];
    for (var i = 0; i < hand.children.length; i++) {
        cards.push(+hand.children[i].textContent);
    }
    if (!game.hasMoves(cards)) {
        setTimeout(gameOver, 0);
    }
}

var game = new Game({
    newCards: function(cards) {
        for (var i = 0; i < cards.length; i++) {
            hand.appendChild(drawCard(cards[i]));
        }
    },
    undo: function(prevTop, id, newTop) {
        var pile = $.el('#' + id);
        pile.innerHTML = '';
        if (newTop !== null) {
            var card = drawCard(newTop);
            card.classList.add('top');
            pile.appendChild(card);
        }
        hand.appendChild(drawCard(prevTop));
        updateNumbers();
    }
});

updateNumbers();

function gameOver() {
    $.el('#main').classList.add('game-over');
    var dialog = $.el('#gameover');
    dialog.classList.remove('hidden');
    $.el('.score', dialog).textContent = game.score;
    $.el('.remaining', dialog).textContent = game.remaining();
}

$.el('#undo').addEventListener('click', function() {
    game.undo();
});

$.el('#help').addEventListener('click', function() {
    $.el('#help-dialog').classList.remove('hidden');
});

$.el('#close-help').addEventListener('click', function() {
    $.el('#help-dialog').classList.add('hidden');
});
