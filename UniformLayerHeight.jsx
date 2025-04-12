// 選択されたレイヤーの中で一番高さが大きいものにそろえる
(function () {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("コンポジションを開いてください。");
        return;
    }

    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length < 2) {
        alert("2つ以上のレイヤーを選択してください。");
        return;
    }

    app.beginUndoGroup("高さを最大に揃える");

    var maxHeight = 0;

    // 最大高さを探す
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        if (layer.source && layer.source.height) {
            var h = layer.source.height * layer.scale.value[1] / 100;
            if (h > maxHeight) {
                maxHeight = h;
            }
        }
    }

    // 各レイヤーのスケールを調整して高さを maxHeight に揃える
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        if (layer.source && layer.source.height) {
            var originalHeight = layer.source.height;
            var scaleY = (maxHeight / originalHeight) * 100;

            // 幅の比率を保つためにXも同じ比率にする（必要に応じて調整）
            var scaleX = (scaleY / layer.scale.value[1]) * layer.scale.value[0];

            layer.scale.setValue([scaleX, scaleY]);
        }
    }

    app.endUndoGroup();
})();
