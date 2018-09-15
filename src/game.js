function range(n) {
    var arr = [];
    for (var i = 2; i <= n; i++) {
        arr.push(i);
    }
    return arr;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function lessThan(a, b) {
    if (a === null || b === null) return true;
    return (a < b) || (a - b === 10);
}

function Game(handlers) {
    this.score = 0;
    this.t = 0;                     // move counter (time)
    this.a1 = null; this.a2 = null; // top of asc. decks
    this.d1 = null; this.d2 = null; // top of dsc. deck 1
    this.hand = [];                 // cards at hand
    this.deck = shuffle(range(99));
    this.handlers = handlers;
    this.undoStack = [];
    for (var i = 0; i < 4; i++) {
        this.draw2();
    }
}

Game.prototype = {
    draw2: function() {
        var a = this.deck.pop();
        var b = this.deck.pop();
        this.hand.push(a);
        this.hand.push(b);
        this.handlers.newCards([a, b]);
    },

    remaining: function() {
        return this.deck.length + this.hand.length;
    },

    accepts: function(id, card) {
        var top = this[id];
        return (id === 'a1' || id === 'a2')
            ? lessThan(top, card)
            : lessThan(card, top);
    },

    scoreOf: function(diff) {
        var d = Math.abs(diff);
        var s = this.t * d;
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
        this.hand.splice(this.hand.indexOf(card), 1);
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
        this.hand.push(s.card);
        this.score = s.score;
        this[s.id] = s.top;
        this.handlers.undo(s.card, s.id, s.top);
        this.handlers.newCards([s.card]);
    },

    hasMoves: function() {
        var self = this;
        return this.canUndo() || this.hand.find(function(x) {
            return lessThan(self.a1, x)
                || lessThan(self.a2, x)
                || lessThan(x, self.d1)
                || lessThan(x, self.d2);
        });
    }
};
