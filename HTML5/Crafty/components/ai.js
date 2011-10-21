Crafty.c("AI",{
  _directions:  [[0,-1], [0,1], [1,0], [-1,0]],
  init: function() {
    this._moveChance = 0.5;
    this.requires('Slide');

    this.bind("Turn",function() {
      if(Math.random() < this._moveChance) {
        this.trigger("Slide", this._randomDirection());
      }
    });
  },

  moveChance: function(val) {
    this._moveChance = val;

  },
  _randomDirection: function() {
    return this._directions[Math.floor(Math.random()*4)];
  }

});

