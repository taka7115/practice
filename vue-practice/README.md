# starter-kit-v2.0
html5 starter-kit

### 環境構築

Node v8.11.1 で動作確認

npmパッケージをインストール
```
npm install
```


### ファイル構成

- README.md
 - このファイル
- gulpfile.js
 - gulp設定ファイル
- package.json
 - 依存するnpmパッケージに関する設定ファイル
- public
 - Web公開されるファイル (gulp 実行までは空の状態です)
- src
 - ビルドに必要な各種ソースコード
- aigis
 - スタイルガイド用ファイル


### 開発手順

 開発時に必要なタスクはgulpfile.jsで管理。
 以下のコマンドを実行することで、各種ビルド・タスク実行が可能。

- `gulp`
 - 開発用ブラウザを立ち上げ、その後ソースコードに修正があれば自動ビルド・自動ブラウザ更新します。
 - 基本的には、このコマンドを実行しておくだけで開発が可能なはず...

- `gulp build`
 -  ファイルをビルド。ファイルとして出力するには`npm run build / yarn build `が必要になります。


### 使用言語
 - ejs　→　HTML
 - Sass　→　CSS
 - javaScript（ES6)


### 更新内容

---

##### v1.2 (T.Kobayashi)
 - imageminを gulp build のみで実行する仕様に変更

##### v2.0 (KANZAKI)
 - Bitbucket へgit管理を移行
 - バージョン2作成


