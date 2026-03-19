レビュー結果をまとめます。

---

## Task 4 レビュー: Gallery / Panel ロジックと責務分割

### 1. 実装計画との整合性

- **demo renderer の切り替え**: `demoByKind` Record で entry ごとに切り替え → 計画通り
- **`indeterminate` の DOM property 設定**: `DemoCheckbox` 内で `useEffect` + `ref` → 計画通り
- **補助リンク**: `SingleCheckboxAndIndeterminateDemo` 内と `crossReference` 変数の2箇所に `/button/toggle-and-selection` リンク → 計画通り
- **`comparisonTip` の metadata 表示**: `buildMetadataItems` で `tone: 'comparison'` として含まれる → 計画通り
- **SectionCard / SnippetPanel / MetadataPanel の作成**: 全て実装済み → 計画通り

### 2. コード品質と責務分割

**良い点:**
- Gallery が「デモの選択・配置」、SectionCard が「汎用ラッパー」、SnippetPanel が「コード表示」、MetadataPanel が「設計メモ表示」と責務が明確
- `DemoCheckbox` / `CheckboxField` / `PreviewCard` をファイル内部に閉じた helper として定義しており、外部公開を避けている
- `buildMetadataItems` が entry → metadata item 変換を純粋関数として切り出されている

**指摘事項:**

**(A) Gallery ファイルの肥大化 — 中程度**

`CheckboxPatternGallery/index.tsx` に4つのデモコンポーネント + 3つのヘルパーコンポーネント + 型定義 + 定数データが全て入っている。現時点で約350行あり、デモが増えるとさらに膨らむ。

各デモコンポーネント (`MultipleIndependentSelectionDemo` 等) は独立しているので、`CheckboxPatternGallery/demos/` 配下に分割すると見通しが良くなる。`DemoCheckbox` と `CheckboxField` は複数デモで共有されているので `CheckboxPatternGallery/parts/` として切り出すのが自然。

ただし現在4つで収まっており、過度な分割も不要なので、**今すぐ必須ではない**。

**(B) `crossReference` のハードコード — 軽微**

```tsx
const crossReference =
  entry.id === 'single-checkbox-and-indeterminate' ? (
    <p className={styles.crossReference}>...</p>
  ) : null;
```

特定の entry ID に対するハードコード分岐が Gallery 内にある。entry データ側に `crossReferenceLink?: {to: string; text: string}` を持たせれば、Gallery は分岐を持たずに済む。overview にも補助リンクを置く計画があるなら、データ駆動にした方が拡張しやすい。

**(C) `density` による分岐の重複 — 軽微**

Gallery の `entries.map` 内で `density === 'detail'` と `density === 'list'` の2パスがあり、cardHeader / demoPanel / crossReference / SnippetPanel / MetadataPanel がほぼ同じ構成で繰り返されている。差分は:
- detail: `<div className={styles.detailContent}>` + SectionCard でラップ
- list: `<article className={styles.card}>` + demoPanel 直置き

共通部分を抽出するか、SectionCard のラップ有無だけを density で切り替えるようにすると DRY にできる。

**(D) デモ内の定数データ — 問題なし**

`multiSelectOptions` / `notificationChildOptions` / `mobileOptions` がコンポーネントファイル内に定義されているが、デモ専用のフィクスチャであり外部から参照されないため、現在の配置で適切。

### 3. エッジケース

**(E) `indeterminate` の同期タイミング — 問題なし**

```tsx
useEffect(() => {
  if (!inputRef.current) return;
  inputRef.current.indeterminate = indeterminate;
}, [indeterminate]);
```

DOM property を `useEffect` で設定するのは React の `indeterminate` 非対応を正しく補っている。`ref` の null チェックもあり、Strict Mode の二重実行でも問題ない。

**(F) `readOnly` チェックボックスの警告リスク — 軽微**

`StatesAndAccessibilityDemo` で `checked` + `readOnly` のチェックボックスが多数ある。React は `checked` に `onChange` がない場合に警告を出すが、`readOnly` を付けることで抑制されるので問題ない。ただし `<DemoCheckbox readOnly />` (unchecked + readOnly) は `defaultChecked` と混同されやすいので、意図が明確であることを確認。→ デモ目的なので許容範囲。

**(G) `SnippetPanel` の `snippets` undefined 時の挙動**

```tsx
const items = snippets?.items ?? [];
```

`snippets` が undefined の場合:
- list density: `items.length === 0 || !snippets` で `null` を返す → 正しい
- detail density: `items.length > 0` の分岐で "実装例は準備中です" を表示 → 正しい

ただし detail 時に `snippets?.snippetSummary` が `undefined` になり、SectionCard の `description` が `undefined` → 条件レンダリングで非表示 → 問題なし。

### 4. セキュリティ

- ユーザー入力の受け取りなし（全てハードコードされたデモデータ）
- `Link to=` は静的文字列のみ
- `dangerouslySetInnerHTML` 未使用
- **セキュリティ上の問題なし**

### 5. パフォーマンス

**(H) デモコンポーネントの毎回再生成 — 軽微**

```tsx
const Demo = demoByKind[entry.demoKind];
```

`demoByKind` はモジュールスコープの静的 Record なので、コンポーネント参照の取得は O(1)。問題なし。

**(I) `buildMetadataItems` の毎レンダリング呼び出し — 問題なし**

純粋関数で7要素の配列生成のみ。メモ化不要。

**(J) entries が多数になった場合の仮想化 — 現時点で不要**

4エントリなので DOM ノード数は問題ない。将来的に数十に増えるなら検討。

---

## まとめ

| 項目 | 評価 |
|------|------|
| 計画との整合性 | 全項目を満たしている |
| 責務分割 | 明確で適切。Gallery の肥大化は将来の課題 |
| エッジケース | indeterminate / density 切り替え / snippets undefined 全て適切に処理 |
| セキュリティ | 問題なし |
| パフォーマンス | 問題なし |

**対応推奨:**
1. **(B) crossReference のデータ駆動化** — overview にもリンクを置く計画があるなら、entry データに `crossReferenceLink` を追加して Gallery のハードコードを除去
2. **(C) density 分岐の共通化** — 重複が気になるなら、共通部分を抽出するリファクタ

いずれも機能的には問題なく、改善提案レベルです。
