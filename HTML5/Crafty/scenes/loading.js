Crafty.sprite(32,"images/dungeon.png", {
  floor: [0,1],
  wall1: [9,0],
  stairs: [3,1]
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


function loadMap(file, callback) {
  $.get(file,function(data) {
    var level = [];
    // Split out each row
    $.each(data.split("\n"),function(y,row) { 
      var columns = row.split("\t");
      level.push(columns);
      // Then split out each column
      $.each(columns,function(x,column) {
        if(column) {
          Crafty.e("2D, Canvas, floor, Floor").attr({x:x * 32, y: y * 32});            
        } else {
          Crafty.e("2D, Canvas, wall1, Wall").attr({x:x * 32, y: y * 32});            
        }
      });

    });
    callback(level);
  });
}


  function populateLevel(chance,level) {
    $.each(level,function(y,row) {
      $.each(row,function(x,entry) {
        if(entry != "") {
          if((Math.random() < chance)) {
            Crafty.e("2D, Canvas, blob1, AI, Solid, Enemy").attr({x:x*32, y:y*32, z:1}).moveChance(Math.random()*0.5);
          }
        }
      });
    });
  }


