Crafty.sprite(32,"images/dungeon.png", {
  floor: [0,0],
  wall1: [2,1],
  stairs: [1,3]
});

Crafty.sprite(32,"images/characters.png", {
  hero1: [5,3],
  blob1: [4,7]
});

//the loading screen that will display while our assets load
Crafty.scene("loading", function() {
  Crafty.load(["images/dungeon.png","images/characters.png"], function() {
    Crafty.scene("main"); //when everything is loaded, run the main scene
  });
});


