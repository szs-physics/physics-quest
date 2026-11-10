# 物理基礎クエスト

物理基礎のテキストの穴埋めを、4択と○×で練習する Web アプリです。今は「熱とエネルギー」が入っています。
公開先：https://szs-physics.github.io/physics-quest/

- 登録なしで、ドリル・チャレンジ・RUSH・弱点特訓を遊べます。オンライン対戦だけはログインが必要です。
- ログインが必要なのは、全国ランキングに記録を載せるときだけです。
- ログイン・ランキングは化学クエストと共通です（https://sense-of-wonder-lab.github.io/games/shared/leaderboard.js を読み込んでいます）。

## 中身

| ファイル | 役割 |
|---|---|
| `index.html` | 画面とゲームの動き（化学クエストの画面・化学RUSH！を流用） |
| `admin.html` | 管理画面（https://szs-physics.github.io/physics-quest/admin.html）。管理者アカウントでログインすると、物理を遊んだ生徒の記録・問題ごとの正答率・ランキングが見られる |
| `battle.html` / `battle.js` | オンライン対戦（ログインが必要）。化学の対戦ページ（Sense-of-Wonder-Lab.github.io の games/battle）を写して物理用にしたもの。ルームのデータは化学と共通の場所（mpRooms）に入るが、物理のルーム（genre が `F:phy`）だけを表示する |
| `fields.js` | `data.js` から4択の問題データ（RUSH_FIELDS）を作る。RUSH とオンライン対戦で共通 |
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
