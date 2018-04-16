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

function lessThan(a, b) {
    return (a < b) || (a - b === 10);
}

function Game(handlers) {
    this.score = 0;
    this.t = 0;
    this.a1 = [];
    this.a2 = [];
    this.d1 = [];
    this.d2 = [];
    this.deck = shuffle(range(99));
    this.hand = [];
    for (var i = 0; i < 8; i++) {
        this.hand.push(this.deck.pop());
    }
    this.undoStack = [];
    this.handlers = handlers;
}

Game.prototype = {
    remaining: function() {
        return this.deck.length + this.hand.length;
    },

    accepts: function(id, card) {
        var pile = this[id];
        if (pile.length === 0) {
            return true;
        }
        var top = pile[pile.length-1];
        switch (id) {
            case 'a1':
            case 'a2':
                return lessThan(top, card);
            case 'd1':
            case 'd2':
            default:
                return lessThan(card, top);
        }
    },

    scoreOf: function(diff) {
        return Math.abs(diff);
    },

    move: function(id, card) {
        var pile = this[id];
        this.hand.splice(this.hand.indexOf(card), 1);
        if (!this.accepts(id, card)) {
            return;
        }
        this.undoStack.push({
            t:     this.t,
            score: this.score,
            hand:  this.hand.slice(),
            id:    id,
            pile:  pile.slice(),
            card:  card,
        });
        this.t++;
        this.score += this.scoreOf(card - (pile[pile.length - 1] || 0));
        pile.push(card);
        if (this.t % 2 === 0 && this.deck.length > 0) {
            this.undoStack = [];
            var a = this.deck.pop();
            var b = this.deck.pop();
            this.hand.push(a);
            this.hand.push(b);
            this.handlers.newCards(a, b);
        }
    },

    canUndo: function() {
        return this.undoStack.length > 0;
    },

    undo: function() {
        if (!this.canUndo()) {
            return;
        }
        var s = this.undoStack.pop();
        this.t = s.t;
        this.score = s.score;
        this.hand = s.hand;
        this[s.id] = s.pile;
        this.handlers.undo(s.card, s.score, s.id, s.pile);
    }
};
