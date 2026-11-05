# 物理基礎クエスト

物理基礎のテキストの穴埋めを、4択と○×で練習する Web アプリです。今は「熱とエネルギー」が入っています。
公開先：https://szs-physics.github.io/physics-quest/

- 登録なしで、すべてのモードを遊べます（ドリル・チャレンジ・RUSH・弱点特訓）。
- ログインが必要なのは、全国ランキングに記録を載せるときだけです。
- ログイン・ランキングは化学クエストと共通です（https://sense-of-wonder-lab.github.io/games/shared/leaderboard.js を読み込んでいます）。

## 中身

| ファイル | 役割 |
|---|---|
| `index.html` | 画面とゲームの動き（化学クエストの画面・化学RUSH！を流用） |
| `data.js` | 問題データ（自動で作るので直接は直さない） |
| `assets/` | 問題で使う図 |
| `tools/fill_raw_heat.txt` | テキスト（R8 高1物理基礎テキスト ver.熱）の「Ⅲ 穴埋め問題」を抜き出したもの |
| `tools/build_data.py` | 上の文章と、穴ごとの正解・誤答・解説から `data.js` を作る |
| `tools/devserver.py` | 手元で動作確認するためのサーバー |

## 問題を直すとき

1. 誤答や解説は `tools/build_data.py` の `A` を直す。文章は `tools/fill_raw_heat.txt` を直す。
2. `python tools/build_data.py tools/fill_raw_heat.txt data.js` で `data.js` を作り直す。

## 手元で確認するとき

となりに `Sense-of-Wonder-Lab.github.io` を置いた状態で

```
python tools/devserver.py
```

を実行し、http://localhost:8765/physics-quest/ を開く。
