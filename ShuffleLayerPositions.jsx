var comp = app.project.activeItem;

if (comp && comp instanceof CompItem) {
    app.beginUndoGroup("Shuffle Layer Positions");

    var layers = comp.selectedLayers;
    var numLayers = layers.length;

    if (numLayers < 2) {
        alert("少なくとも2つ以上のレイヤーを選択してください。");
    } else {
        // 元の位置情報を取得
        var positions = [];
        for (var i = 0; i < numLayers; i++) {
            positions.push(layers[i].property("Position").value);
        }

        // 位置情報をシャッフル (Fisher-Yates法)
        var shuffledPositions = positions.slice(); // コピーを作成
        for (var i = shuffledPositions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffledPositions[i];
            shuffledPositions[i] = shuffledPositions[j];
            shuffledPositions[j] = temp;
        }

        // ランダム化した位置をレイヤーに適用
        for (var i = 0; i < numLayers; i++) {
            layers[i].property("Position").setValue(shuffledPositions[i]);
        }
    }

    app.endUndoGroup();
} else {
    alert("コンポジションを開いてレイヤーを選択してください。");
}
