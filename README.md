# 説明
Angularチュートリアルアプリケーションのin-memory-web-apiで実装していたRESTAPIを
node.js上で動作するアプリケーションとして実装した。

# 起動方法
## 通常起動
node app.js

## プログラムの変更と検知する起動（メッセージ領域に通知しない）
node-dev app.js

## プログラムの変更と検知する起動（メッセージ領域に通知しない）
node-dev --no-notify app.js


# curlコマンドでの呼び出し方

## 一覧取得
curl http://localhost:3000/api/heroes/

## 一件取得
curl http://localhost:3000/api/heroes/13

## 削除
curl -X DELETE http://localhost:3000/api/heroes/13


## 追加
curl -D - -X POST http://localhost:3000/api/heroes/  -H "Accept: application/json" -H "Content-type: application/json" -d '{"id":21,"name":"Tanaka"}'

## 更新
curl -D - -X PUT http://localhost:3000/api/heroes/   -H "Accept: application/json" -H "Content-type: application/json" -d '{"id":11,"name":"xxxx"}'

