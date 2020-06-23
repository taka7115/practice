# Global X Japan


## 環境構築

- v10.15.3（安定版）推奨

npmパッケージをインストール

```
npm i
```


## ファイル構成

- /README.md
    - このファイル
- /gulpfile.js
    - gulp設定ファイル
- /package.json
    - 依存するnpmパッケージに関する設定ファイル
- /public/
    - Web公開されるファイル (gulp 実行までは空の状態です)
- /src/
    - ビルドに必要な各種ソースコード




## 開発手順

- 開発時に必要なタスクはgulpfile.jsで管理。
- 以下のコマンドを実行することで、各種ビルド・タスク実行が可能。

- `gulp`
    - 開発用ブラウザを立ち上げ、その後ソースコードに修正があれば自動ビルド・自動ブラウザ更新します。

- `gulp bjs`
    - jsファイルの圧縮

- `gulp page`
  - ファンドページファイルの量産

## 使用言語

ejs -> HTML
scss -> CSS


## GXJ内容

### ファイル構成


* 画像pathなど
src\json\config.json

* ★ファンドページ量産用の設定ファイル（後述）
src\json\pages.json


* 更新用データ
public\assets\json

* ダミーデータ
public\assets\json\fund_data


* ★ファンド量産用ベーステンプレート
src\_template_fund\template.ejs
src\_template_fund\en\template.ejs


### ディスクレーマー



### ページの追加

翻訳の対になるページURLを下記に記述すること

src\assets\js\vue\data\menuTop.json

