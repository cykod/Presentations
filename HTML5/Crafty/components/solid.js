  Crafty.c("Solid",{
    init: function() {
      this.requires("Collision").onHit("Wall",function(obj) {
        this.cancelSlide();
      });
    }
  });
