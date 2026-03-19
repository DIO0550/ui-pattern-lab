これで全体像が把握できました。以下、3 コンポーネントの TSX ロジックと導線を中心にレビューします。

---

## レビュー結果

### 1. 実装計画との整合性

**問題: ルーティング側のファイルが未作成**

既存の button パターンに倣うと、以下が必要ですがまだ存在しません:

| 必要ファイル | 役割 |
|---|---|
| `docs/checkbox.mdx` (`slug: /checkbox`) | カテゴリ landing → `<CheckboxCategoryContent />` |
| `src/pages/patterns/checkbox-designs/index.tsx` | 比較一覧ページ → `<CheckboxPatternPageContent />` |
| `docs/checkbox/*.mdx` (4 ファイル) | 各 detail → `<CheckboxPatternDetailContent entryId="..." />` |

コンポーネント自体は完成していますが、これらがないとルーティングが繋がりません。

**問題なし:** 仕様の 4 要件（2 段導線、比較マトリクス+gallery、entryId で引いて throw、toggle 補助導線）はすべてロジックに反映されています。

---

### 2. コード品質と責務分割

**良い点:**
- 3 コンポーネントの責務分割が明確（landing / 比較一覧 / detail wrapper）
- button パターンと同じアーキテクチャを踏襲しており一貫性がある
- 型定義が `checkboxPatternTypes.ts` に集約されている

**指摘 1: `CheckboxPatternPageContent` の `matrixColumns` / `matrixRows` がコンポーネントと同一ファイルに 100 行以上のリテラルとして存在**

データ量が多く、コンポーネントのロジックを見通しにくくなっています。`checkboxPatternEntries.ts` のようにデータファイルに分離するか、少なくともファイル末尾の別 const にまとめる方が読みやすいです。ただし button パターンも同様の構成であれば、プロジェクト慣習として許容できます。

**指摘 2: `matrixColumns` と `matrixRows` に `as const satisfies` を使っているのは良い**が、型 `MatrixColumn` / `MatrixRow` はこのファイルでしか使われないローカル型なので問題なし。

---

### 3. 導線・エッジケース

**指摘 3 (重要): `CheckboxPatternDetailContent` の error throw が React レンダリング中に発生する**

```tsx
if (!entry) {
  throw new Error(`Unknown checkbox pattern entry: ${entryId}`);
}
```

これ自体は仕様通りですが、**Error Boundary がないとアプリ全体がクラッシュします**。既存の button パターン (`ButtonPatternDetailContent`) が同じ手法を採っているなら問題ありませんが、Docusaurus がデフォルトで Error Boundary を提供していない場合、ユーザーに白画面が表示されます。

→ 確認ポイント: `ButtonPatternDetailContent` も同じ throw パターンか？ Docusaurus の ErrorBoundary 設定はあるか？

**指摘 4: `entryId` の型が `CheckboxPatternEntryId` (union literal) なので、MDX 側で typo すると TypeScript コンパイルエラーになる**

これは良い設計です。ランタイムの throw は TypeScript の型チェックをすり抜けた場合のフォールバックとして適切です。

**指摘 5: `showToggleReference` の条件が `entry.id === 'single-checkbox-and-indeterminate'` のハードコード**

現時点では 1 パターンのみなので問題ありませんが、将来他のパターンにも補助導線が必要になった場合、entry データに `relatedLinks` フィールドを持たせる方が拡張しやすいです。ただし現時点では YAGNI なのでそのままで可。

**導線の整合性は問題なし:**
- `/checkbox` → `/patterns/checkbox-designs` (比較一覧) と `/checkbox/{id}` (個別) の 2 段導線
- detail から `/checkbox` と `/patterns/checkbox-designs` へのパンくずリスト
- `single-checkbox-and-indeterminate` のみ `/button/toggle-and-selection` への補助導線
- 比較一覧のマトリクス下部にも `/button/toggle-and-selection` への導線あり

---

### 4. セキュリティ

**問題なし。** データはすべてスタティックリテラルで、ユーザー入力は介在しません。`Link` コンポーネント経由のルーティングのみで XSS リスクなし。

---

### 5. パフォーマンス

**指摘 6: `checkboxPatternEntries.find()` は配列サイズ 4 なので問題なし。** Map に変える必要はありません。

**指摘 7: `CheckboxPatternPageContent` でマトリクスと gallery を同一ページにレンダリングする**が、gallery のデモコンポーネントが重い場合、初期表示に影響する可能性があります。ただし `density="list"` で snippet が折りたたまれているため、実質的な負荷は低いと判断します。

---

## まとめ

| 観点 | 判定 |
|---|---|
| 仕様整合 | TSX ロジックは全要件を満たしている。ルーティングファイル未作成が残タスク |
| 責務分割 | 明確。button パターンと一貫性あり |
| 導線 | 2 段導線、パンくず、補助導線すべて正しく実装 |
| エッジケース | throw は仕様通りだが Error Boundary の確認を推奨 |
| セキュリティ | 問題なし |
| パフォーマンス | 問題なし |

**必須対応:** ルーティングファイル (docs/checkbox.mdx, src/pages/patterns/checkbox-designs/index.tsx, docs/checkbox/*.mdx) の作成

**推奨確認:** Error Boundary の存在確認（throw 時の UX 保証）
