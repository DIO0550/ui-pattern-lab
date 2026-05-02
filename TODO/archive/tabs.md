# Tabs

## Summary

同一文脈内の複数ビューを並列に提示し、選択中の panel を切り替える navigation。

## Scope

- product detail sections
- dashboard views
- settings panels

## Notes

- 既存の `/controller/tabs-inline-panel-switcher` は controller pattern としての部分実装
- ここでは tabs component 自体の variant / orientation / scrollable / badge を扱う
- `tablist` / `tab` / `tabpanel` の semantics を崩さない

## TODO

- [x] compare page で variant / orientation / layout / behavior の判断軸を定義する
- [x] detail page 用の metadata を作る
- [x] underline / pills / boxed / vertical の demo を作る
- [x] keyboard / accessibility note を追加する
- [x] CSS / TSX snippet を用意する
