# Task: Checkbox パターンカテゴリを ui-pattern-lab に追加する

## Research & Planning

- [x] 固定した 4 つの checkbox entry ID に対して、日本語タイトル・比較軸・カード説明を確定し、entry / docs / sidebar で同じ識別子を使う
- [x] Button category の data / gallery / metadata panel 構造を参照し、checkbox へそのまま流用できる責務分割を整理する
- [x] overview ページに置く比較マトリクスの文言を固め、checkbox vs radio / switch / select の判断基準を定義する

## Implementation

- [x] `src/data/checkboxPatternTypes.ts` と `src/data/checkboxPatternEntries.ts` を作成し、4 entry と必須の `comparisonTip` を含む型・メタデータを追加する
- [x] `src/data/checkboxPatternSnippets.ts` を作成し、各 entry に対応する CSS / TSX サンプルをそろえる
- [x] `CheckboxCategoryContent` / `CheckboxPatternPageContent` / `CheckboxPatternDetailContent` を作成し、カテゴリ landing・比較一覧・detail wrapper・`button/toggle-and-selection` への補助導線を実装する
- [x] `CheckboxPatternGallery` / `CheckboxPatternSectionCard` / `CheckboxPatternSnippetPanel` / `CheckboxPatternMetadataPanel` を作成し、preview・snippet・metadata の表示を実装する
- [x] `docs/checkbox.mdx`、4 つの `docs/checkbox/*.mdx`、`src/pages/patterns/checkbox-designs/index.tsx` を作成する
- [x] `sidebars.ts`、`src/components/DocsHomeContent/index.tsx`、`docusaurus.config.ts` を更新し、checkbox カテゴリの導線を追加する

## Verification

- [x] `cd /workspace/ui-pattern-lab && pnpm typecheck` を実行し、型エラーがないことを確認する
- [x] `cd /workspace/ui-pattern-lab && pnpm build` を実行し、Docusaurus build が通ることを確認する
- [x] `cd /workspace/ui-pattern-lab && pnpm start` で `/checkbox`、`/patterns/checkbox-designs`、4 つの detail page、sidebar、footer、ホームカード、`button/toggle-and-selection` への補助リンク、モバイル表示を手動確認する
