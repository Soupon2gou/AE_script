var frameStep = 1; // 表示フレーム数
var comp = app.project.activeItem;

if (comp && comp instanceof CompItem) {
  app.beginUndoGroup("Sequential Layer Display");

  var layers = comp.selectedLayers;
  if (layers.length === 0) {
    alert("レイヤーが選択されていません。");
    app.endUndoGroup();
  }

  var frameDuration = 1 / comp.frameRate;

  // レイヤーをインデックス順に並び替え
  layers.sort(function(a, b) {
    return a.index - b.index;
  });


  var displayDuration = frameStep * frameDuration;
  var currentTime = comp.time - frameDuration; // ここを起点に開始
  

  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];

    layer.startTime = 0;
    layer.inPoint = currentTime;
    layer.outPoint = currentTime + displayDuration;

    currentTime += displayDuration;
  }

  app.endUndoGroup();
}
