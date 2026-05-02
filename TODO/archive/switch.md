# Switch

## Summary

即時反映される on / off 設定を切り替える form input。

## Scope

- settings toggle
- feature flag
- notification preference

## Notes

- checkbox は複数選択やフォーム値、switch は即時反映の二択として責務を分ける
- label left / label right / description 付きのレイアウトを分けて見せる
- loading state は非同期保存を伴う設定で扱う

## TODO

- [x] compare page で state / size / icon / layout の判断軸を定義する
- [x] detail page 用の metadata を作る
- [x] default / with icons / with labels / settings list の demo を作る
- [x] keyboard / accessibility note を追加する
- [x] CSS / TSX snippet を用意する
