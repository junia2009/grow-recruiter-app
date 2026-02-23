GROW 強み検討（リクルーター向け）

概要
- 単一ファイルの静的Webアプリ（フォーム中心）
- 候補者ごとにGROW（Goal / Reality / Options / Will）を保存
- 保存はブラウザのローカル保存（localStorage）
- JSONエクスポート／インポート対応
- CSVエクスポート対応（候補者選択で絞り込み可）
- 印刷（PDF出力はブラウザの印刷ダイアログを使用）

使い方
1. ワークスペースで `index.html` をブラウザで開く（ダブルクリックでOK）
2. 候補者を追加 → G/R/O/W を入力 → 「セッションを保存」
3. 必要に応じて「エクスポート」でJSONをダウンロード

ローカルで簡易サーバを立てる（推奨、ファイル読み込み時のセキュリティ回避）

Windows / PowerShell:
```powershell
python -m http.server 8000
```

その後ブラウザで `http://localhost:8000/` を開いてください。

自動テスト（Node.js + jsdom の簡易スモークテスト）
- Node.js（LTS）をインストールしてください: https://nodejs.org/
- ルートで依存をインストールし、テストを実行します:

```powershell
npm install
npm test
```

テストは `test/smoke.test.js` を使い、DOM 要素と主要関数が存在するかをチェックします。

公開（GitHub Pages）
- GitHub Pages を使うと簡単にスマホからアクセスできるようになります。
- 推奨フロー（ターミナルで実行）:

1) ローカルで git 初期化・コミット

```powershell
Set-Location 'C:\Users\uriry\OneDrive\Desktop\chat-app'
git init
git add .
git commit -m "Initial commit: GROW recruiter app"
```

2) リポジトリ作成して push

- gh CLI が使える場合（推奨）:

```powershell
gh repo create your-username/grow-recruiter-app --public --source=. --remote=origin --push
```

- gh CLI が無い場合（手動）:
	- GitHub 上で新しいリポジトリ `grow-recruiter-app` を作成
	- 表示される `git remote add origin ...` と `git push -u origin main` を実行

3) GitHub 側で Pages を有効化
 - リポジトリの Settings → Pages → Branch を `main` / `/ (root)` にして保存
 - 数分で https://<your-username>.github.io/grow-recruiter-app/ で公開されます

注: 公開後はスマホで URL を開くだけでアクセスできます。カスタムドメインや HTTPS は GitHub Pages が自動で設定します。

次のステップ案
- UIの微調整（フォームの必須チェック、入力補助）
- セッション一覧で詳細表示・編集対応
- CSV/PDF エクスポート
- サーバ保存対応（共有・同期）
