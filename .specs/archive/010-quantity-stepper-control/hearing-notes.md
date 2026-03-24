# Hearing Notes: Quantity Stepper Control

## 目的

`TODO/quantity-stepper-control.md` をもとに、`ui-pattern-lab` の `quantity-stepper-control` パターンを仕様として整理する。今回の主眼は新規実装ではなく、既存の compare page / detail page / snippet / lightweight demo が TODO の要求をどこで満たしているかを明文化し、今後の追加改善の境界をはっきりさせることにある。

ユーザーへ追加確認を試みたが応答不能だったため、今回は「現状実装を基準にした仕様整理」を前提に進める。

## スコープ

- **種別**: 既存機能の改善
- **影響範囲**: 既存修正
- **優先度**: 中

## 技術的詳細

- **技術スタック**: TypeScript
- **フレームワーク**: React 19 / Docusaurus 3 / MDX
- **依存関係**: `controllerPatternEntries.ts`、`controllerPatternSnippets.ts`、`ControllerPatternPageContent`、`ControllerPatternDetailContent`、`ControllerPatternGallery`、`sidebars.ts`
- **データ構造**: `ControllerPatternEntryId = 'quantity-stepper-control'` を entry のキーにし、compare page・detail page・lightweight demo・CSS / TSX snippets が同じ ID を source of truth として参照する

## 品質要件

- **エッジケース**: min / max 到達時の disabled、境界値の clamp、狭い範囲で使う前提、guest count / quantity / visible item count のような bounded value 文脈、progress stepper との混同防止、連打や長押しの安全策、値の読み上げ
- **エラーハンドリング**: 不正な `entryId` は detail component で明示的に例外化し、欠落 entry を silent fallback しない
- **テスト要件**: `pnpm typecheck` と `pnpm build` を通し、`/patterns/controller-designs` と `/controller/quantity-stepper-control` の導線・表示内容を手動で確認する
- **パフォーマンス**: heavy な state や外部 API は持ち込まず、lightweight demo と静的 snippet の構成を維持する

## 追加コンテキスト

- source TODO の要求は以下の 5 点に集約される
  - compare page での判断軸
  - detail page 用 metadata
  - increment / decrement demo
  - boundary state と validation note
  - CSS / TSX snippet
- 探索時点で、上記 5 点はすでに `controller` family 内の compare page・detail page・data entry・snippet・demo に分散実装されている可能性が高い
- 今回の spec では「新しい UI を増やす」よりも「現状実装が TODO をどこで満たしているか」を整理し、未対応事項があれば follow-up として切り出す
