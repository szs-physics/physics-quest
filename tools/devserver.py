# 手元で動作確認するためのサーバー。公開時と同じURLの形にする
#   /physics-quest/...  → このリポジトリ
#   それ以外(/games/shared/leaderboard.js など) → となりの Sense-of-Wonder-Lab.github.io
# 使い方: python tools/devserver.py [ポート]  → http://localhost:8765/physics-quest/
import os, sys, http.server, functools

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(os.path.dirname(HERE), "Sense-of-Wonder-Lab.github.io")
PREFIX = "/physics-quest"


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = path.split("?", 1)[0].split("#", 1)[0]
        if p == PREFIX or p.startswith(PREFIX + "/"):
            root, rel = HERE, p[len(PREFIX):]
        else:
            root, rel = SITE, p
        return os.path.join(root, *[x for x in rel.split("/") if x and x != ".."])

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
