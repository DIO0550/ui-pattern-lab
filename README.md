# UIパターンラボ

UI パターンや各種 UI デザインを preview / code / CSS 付きで紹介する Docusaurus ベースのリファレンスです。  
このプロジェクトの基本スタンスは **カスタムデザイン** で、既製 UI ライブラリの既定見た目をそのまま並べるのではなく、用途に合わせて設計した独自 UI を比較しながら整理します。

## 何を扱うか

- さまざまな UI / デザインパターン
- 日本語ラベル前提のカテゴリ導線
- detail / reference での preview と code の対応
- TSX だけでなく CSS まで含めた実装例

## ローカル開発

```bash
cd ui-pattern-lab
pnpm install
pnpm start
```

## 主な確認コマンド

```bash
cd ui-pattern-lab
pnpm typecheck
pnpm build
```

## 収録方針

- 基本はカスタムデザインとして UI を紹介する
- カテゴリ名・カテゴリ導線のラベルは日本語にする
- detail / reference では `1 variant block : 1 code panel` を守る
- preview だけでなく TSX / CSS を合わせて見られる構成にする

## 主なディレクトリ

- `ui-pattern-lab/docs/` - カテゴリページと詳細ページ
- `ui-pattern-lab/src/components/` - preview / layout / 各 UI コンポーネント
- `ui-pattern-lab/src/pages/patterns/` - 比較一覧ページ
