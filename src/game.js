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
    this.t = 0;                     // move counter (time)
    this.a1 = null; this.a2 = null; // top of asc. decks
    this.d1 = null; this.d2 = null; // top of dsc. deck 1
    this.hand = 0;                  // amount of cards at hand
    this.deck = shuffle(range(99));
    this.handlers = handlers;
    this.undoStack = [];
    for (var i = 0; i < 4; i++) {
        this.draw2();
    }
}

Game.prototype = {
    draw2: function() {
        this.handlers.newCards([
            this.deck.pop(),
            this.deck.pop(),
        ]);
        this.hand += 2;
    },

    remaining: function() {
        return this.deck.length + this.hand;
    },

    accepts: function(id, card) {
        var top = this[id];
        if (top === null) {
            return true;
        }
        return (id === 'a1' || id === 'a2')
            ? lessThan(top, card)
            : lessThan(card, top);
    },

    scoreOf: function(diff) {
        var d = Math.abs(diff);
        var s = Math.floor(1 + this.t / 25) * d;
        return (d === 10) ? 2*s : s;
    },

    move: function(id, card) {
        if (!this.accepts(id, card)) {
            return;
        }
        var top = this[id];
        this.undoStack.push({
            score: this.score,
            id:    id,
            top:   top,
            card:  card,
        });
        this.t++;
        this.hand--;
        this.score += this.scoreOf(card - (top || 0));
        this[id] = card;
        if (this.t % 2 === 0 && this.deck.length > 0) {
            this.undoStack = [];
            this.draw2();
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
        this.t--;
        this.hand++;
        this.score = s.score;
        this[s.id] = s.top;
        this.handlers.undo(
            s.card,
            s.score,
            s.id,
            s.top
        );
    }
};
