
  Crafty.c("Slide", {
    init: function() {
      this._stepFrames = 5;
      this._tileSize = 32;
      this._moving = false;
      this._vx = 0;
      this._destX = 0;
      this._vy = 0;
      this._destY = 0;
      this._frames = 0;

      this.bind("Slide", function(direction) {
        if(this._moving) return false;
        this._moving = true;

        this._destX = this.x + direction[0] * 32;
        this._destY = this.y + direction[1] * 32;

        this._vx = direction[0] * this._tileSize / this._stepFrames;
        this._vy = direction[1] * this._tileSize / this._stepFrames;

        this._frames = this._stepFrames;
      }).bind("EnterFrame",function(e) {
        if(!this._moving) return false;
        this.x += this._vx;
        this.y += this._vy;
        this._frames--;

        if(this._frames <= 0) {
          this._moving = false;
          this.x = this._destX;
          this.y = this._destY;
        }
        this.trigger('Moved', {x: this.x, y: this.y});
      });

    }, 
    slideFrames: function(frames) { 
       this._stepFrames = frames;
    }
  });

