# ui-pattern-lab にチェックボックスパターンカテゴリを追加する

**関連Issue**: なし

`ui-pattern-lab` にチェックボックスのデザインパターンを独立カテゴリとして追加する。見た目の実装例だけでなく、checkbox を radio button / switch(toggle) / select とどう使い分けるべきかを、カテゴリ overview と各パターン解説の両方で伝えられる構成にする。

## ユーザーレビューが必要な点

> **NOTE**
> - v1 では checkbox を `/checkbox` の独立カテゴリとして追加し、radio / switch / select は比較対象として文章と比較マトリクスで扱う。
> - 使い分け解説は `/patterns/checkbox-designs` に比較マトリクスとして置き、個別パターンには `whenToUse` と `comparisonTip` で補足する。
> - v1 の対象パターンは 4 件に絞る。radio / switch / select 自体のカテゴリ追加はスコープ外とする。
> - v1 の canonical entry ID はこの計画書に記載した 4 つで固定し、exploration 段階の候補名は採用しない。

## システム図

### 状態マシン / フロー図

```text
PLANNING
   |
   v
+---------------------------+
| Checkbox files authored   |
| - types / entries         |
| - snippets / components   |
| - docs / nav updates      |
+---------------------------+
   |
   v
+---------------------------+
| pnpm typecheck            |
+---------------------------+
   | pass                               | fail
   v                                    v
+---------------------------+    +----------------------------+
| pnpm build                |    | Fix type/import mismatch   |
+---------------------------+    | - entry ID union           |
   | pass                               | - missing imports          |
   v                                    | - component prop mismatch  |
+---------------------------+           +----------------------------+
| Manual route verification |
| /checkbox                 |
| /patterns/checkbox-designs|
| /checkbox/{pattern-id}    |
+---------------------------+
   | pass                                  | fail
   v                                       v
+---------------------------+     +----------------------------+
| Ready for merge           |     | Fix docs/data sync issues  |
| - nav visible             |     | - missing MDX route        |
| - matrix visible          |     | - broken sidebar/home link |
| - snippets render         |     | - missing snippet panel    |
+---------------------------+     +----------------------------+
```

### データフロー

```text
Author edits
  ├─ src/data/checkboxPatternTypes.ts
  ├─ src/data/checkboxPatternEntries.ts
  ├─ src/data/checkboxPatternSnippets.ts
  ├─ src/components/Checkbox*
  ├─ docs/checkbox*.mdx
  ├─ src/pages/patterns/checkbox-designs/index.tsx
  ├─ sidebars.ts
  └─ src/components/DocsHomeContent/index.tsx
            |
            v
   CheckboxCategoryContent --------------------------+
            |                                        |
            v                                        |
   links to /patterns/checkbox-designs               |
   and /checkbox/{pattern-id}                        |
            |                                        |
            v                                        |
   CheckboxPatternPageContent                        |
   - static comparison matrix                        |
   - CheckboxPatternGallery(entries=all)             |
            |                                        |
            v                                        |
   CheckboxPatternDetailContent(entryId)             |
   - entry lookup in checkboxPatternEntries          |
   - snippets lookup in checkboxPatternSnippets      |
            |                                        |
            +----> Metadata panel / snippet panel ---+
            |
            v
   Docusaurus routes render:
   - /checkbox
   - /patterns/checkbox-designs
   - /checkbox/{pattern-id}
```

## 変更案

### データモデルとコンテンツ定義

#### [NEW] `ui-pattern-lab/src/data/checkboxPatternTypes.ts`

Checkbox カテゴリ専用の型定義を追加する。

- **ロジック**: `CheckboxPatternEntryId` を 4 つの entry ID の literal union で定義する
- **型**: `CheckboxDemoKind`, `CheckboxPatternEntry`, `CheckboxPatternSnippetItem`, `CheckboxPatternSnippets` を定義する
- **追加フィールド**: `comparisonTip: string` を必須で持たせ、`whenToUse` では書き切れない「radio / switch / select を選ぶべき場面」を補足できるようにする
- **記述ガイド**: v1 の全 4 entry で `comparisonTip` を必ず埋める。分量は 1-2 文とし、「checkbox を選ぶ理由」と「代わりに radio / switch / select を選ぶべき条件」を同じ粒度で書く

v1 で固定する entry ID:

- `multiple-independent-selection`
- `single-checkbox-and-indeterminate`
- `states-and-accessibility`
- `mobile-and-touch-targets`

#### [NEW] `ui-pattern-lab/src/data/checkboxPatternEntries.ts`

Checkbox パターン本体のメタデータを定義する。

- **エントリ数**: 4
- **内容**: `title`, `summary`, `problem`, `solution`, `whenToUse`, `comparisonTip`, `layoutNotes`, `stateNotes`, `accessibilityNotes`, `tags`, `demoKind`
- **解説方針**:
  - `multiple-independent-selection`: 複数の独立選択肢を自由に組み合わせる場面。radio / select との差分を明記
  - `single-checkbox-and-indeterminate`: 単独同意や select-all / parent-child の mixed state を扱う。switch との差分を明記
  - `states-and-accessibility`: default / focus / disabled / error / mixed と `aria-*` を整理
  - `mobile-and-touch-targets`: 長いラベル、タップ領域、縦並び・折り返し時の扱いを整理
- **demo 初期状態**:
  - `multiple-independent-selection`: 3 項目のチェックボックスを並べ、1 項目だけ checked にして「複数独立選択」を即座に見せる
  - `single-checkbox-and-indeterminate`: 3 つの子項目のうち 2 つを checked にし、親 checkbox を mixed state で表示する
  - `states-and-accessibility`: unchecked / checked / disabled / error-with-helper の 4 状態を固定表示する
  - `mobile-and-touch-targets`: 長いラベルを持つ 2 項目を縦積みにし、48px 相当の tap target を示す

#### [NEW] `ui-pattern-lab/src/data/checkboxPatternSnippets.ts`

各パターンの CSS / TSX サンプルを定義する。

- **構成**: `Record<CheckboxPatternEntryId, CheckboxPatternSnippets>`
- **内容**: 各 entry に対して CSS と TSX の 2 種類以上の snippet を揃える
- **再利用**: button 系 data file の normalize パターンを踏襲し、 entry と snippets の同期を保つ

### UI コンポーネント

#### [NEW] `ui-pattern-lab/src/components/CheckboxCategoryContent/index.tsx`

`/checkbox` のカテゴリ landing を担当する。

- **ロジック**: 既存 category landing と同じく「まず比較一覧を見る」と「個別パターンへ進む」の 2 段導線にする
- **導線**: `/patterns/checkbox-designs` への比較一覧リンクと、4 パターンの詳細リンクカードを並べる

#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternPageContent/index.tsx`

`/patterns/checkbox-designs` の overview ページを担当する。

- **ロジック**: ページ上部に checkbox / radio / switch / select の比較マトリクスを置き、その下に `CheckboxPatternGallery` で全 entry を list density で並べる
- **比較軸**:
  - selection model
  - immediate effect / submit timing
  - mobile/touch fit
  - accessibility semantics
  - discoverability / cognitive load
- **データ配置**: 比較マトリクスはまずこの component 内の typed constant として持ち、 v1 では共有データレイヤー追加を避ける

#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternDetailContent/index.tsx`

個別 detail route の wrapper を追加する。

- **ロジック**: `entryId` で `checkboxPatternEntries` を引き、見つからなければ既存 detail content と同様に明示的に error を投げる
- **表示**: breadcrumb 的な戻りリンクと `CheckboxPatternGallery(entries=[entry], density='detail')` を使う

#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternGallery/index.tsx`

Checkbox パターンの main renderer を追加する。

- **Props**: `entries`, `density`
- **ロジック**: entry ごとに簡易 demo renderer を切り替え、 preview / snippets / metadata を section card で構成する
- **実装方針**: ButtonPatternGallery の構造を踏襲しつつ、checkbox 向け demo renderer を 4 種類だけ持つ
- **edge case**: `single-checkbox-and-indeterminate` の demo では HTML attribute ではなく DOM property として `input.indeterminate = true` を設定する。React 側では `ref` callback か effect で反映する
- **cross-reference**: `single-checkbox-and-indeterminate` と overview 比較マトリクスには `/button/toggle-and-selection` への補助リンクを置き、「押下状態のトグル UI を見せたい場合は button pattern を参照」と案内する

#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternSectionCard/index.tsx`

preview / snippets / metadata 用の折りたたみ card wrapper を追加する。

- **ロジック**: list と detail の density で初期展開状態を切り替える

#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternSnippetPanel/index.tsx`

コードサンプル表示 panel を追加する。

- **ロジック**: CSS / TSX snippet を表示し、 entry に紐づく note も見せる

#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternMetadataPanel/index.tsx`

problem / solution / whenToUse / comparisonTip / layout/state/accessibility notes を表示する panel を追加する。

- **ロジック**: Button metadata panel と同じ tone-based section 表示を踏襲する
- **表示**: `comparisonTip` は「他コントロールを選ぶべき場合」の明示セクションとして扱う

#### [NEW] `ui-pattern-lab/src/components/CheckboxCategoryContent/styles.module.css`
#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternPageContent/styles.module.css`
#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternDetailContent/styles.module.css`
#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternGallery/styles.module.css`
#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternSectionCard/styles.module.css`
#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternSnippetPanel/styles.module.css`
#### [NEW] `ui-pattern-lab/src/components/CheckboxPatternMetadataPanel/styles.module.css`

Checkbox 専用の見た目を定義する。

- **スタイリング**: Button 系 style をベースにしつつ、 checkmark / label / helper text / touch target を見せやすいレイアウトに調整する
- **アクセシビリティ**: focus-visible, disabled, error, mixed を視認しやすい token にそろえる

### ルーティングとドキュメント

#### [NEW] `ui-pattern-lab/docs/checkbox.mdx`

カテゴリ doc wrapper を追加する。

- **ロジック**: `CheckboxCategoryContent` を import して render する

#### [NEW] `ui-pattern-lab/docs/checkbox/multiple-independent-selection.mdx`
#### [NEW] `ui-pattern-lab/docs/checkbox/single-checkbox-and-indeterminate.mdx`
#### [NEW] `ui-pattern-lab/docs/checkbox/states-and-accessibility.mdx`
#### [NEW] `ui-pattern-lab/docs/checkbox/mobile-and-touch-targets.mdx`

個別 detail doc wrapper を追加する。

- **ロジック**: 各ファイルは `CheckboxPatternDetailContent` を import し、対応する `entryId` を渡す
- **注意**: slug / file path / entry ID / sidebar item を完全同期させる

#### [NEW] `ui-pattern-lab/src/pages/patterns/checkbox-designs/index.tsx`

比較一覧 route を追加する。

- **ロジック**: Docusaurus `Layout` の中で `CheckboxPatternPageContent` を render する

### ナビゲーションと発見性

#### [MODIFY] `ui-pattern-lab/sidebars.ts`

sidebar に checkbox カテゴリを追加する。

- **変更点**:
  - `checkbox` category block を追加
  - 4 つの detail doc ID を items に追加
  - 既存カテゴリの順序や記法に合わせ、現在の `button` の後ろに checkbox を最後尾追加する

#### [MODIFY] `ui-pattern-lab/src/components/DocsHomeContent/index.tsx`

Docs home の hardcoded category state に checkbox を追加する。

- **変更点**:
  - `CategoryId` union に `checkbox` を追加
  - `openStates` の初期 state に `checkbox` を追加
  - `checkboxDetailLinks` を `checkboxPatternEntries` から生成
  - `checkboxLinks` は `ellipsisDisplayLinks` と同じ粒度にそろえ、合計 6 件のリンクを持つ
    - `/checkbox` のカテゴリページ
    - `/patterns/checkbox-designs` の比較一覧
    - 4 つの detail page
  - `categoryCards` に checkbox card を追加し、比較マトリクスへ直接入れる導線を明示する

#### [MODIFY] `ui-pattern-lab/docusaurus.config.ts`

footer のドキュメントリンクに checkbox を追加する。

- **変更点**:
  - `footer.links[0].items` に `/checkbox` へのリンクを追加する
  - 既存の table / ellipsis-display / button と同じ粒度で footer から辿れるようにする

### 変更しないもの

#### [KEEP] `ui-pattern-lab/package.json`

- 新規依存関係は追加しない

## 検証計画

### 自動テスト

```bash
cd /workspace/ui-pattern-lab && pnpm typecheck && pnpm build
```

- `CheckboxPatternEntryId` / docs slug / sidebar items の不整合がないこと
- 追加した components と data files が型安全に import できること
- Docusaurus build で `/checkbox` と `/patterns/checkbox-designs` が生成できること

### 手動検証

1. `cd /workspace/ui-pattern-lab && pnpm start` を実行し、ホームで checkbox カテゴリカードが表示されることを確認する
2. `/checkbox` を開き、「比較一覧」と「個別パターン」への導線が正しく表示されることを確認する
3. `/patterns/checkbox-designs` を開き、checkbox / radio / switch / select の比較マトリクスが先頭に表示されることを確認する
4. 4 つの detail page を順に開き、preview / snippets / metadata / comparisonTip が崩れず表示されることを確認する
5. sidebar の checkbox セクションから全 detail page に遷移できることを確認する
6. footer のドキュメントリンクから `/checkbox` へ遷移できることを確認する
7. モバイル幅で表示し、long label と tap target のレイアウトが破綻しないことを確認する

## Definition of Done

以下をすべて満たした時点で本機能の実装完了とする。

- [ ] すべてのタスク（tasks.md）が ■ になっている
- [ ] `/checkbox` が独立カテゴリとして追加され、カテゴリ overview が表示される
- [ ] `/patterns/checkbox-designs` に checkbox vs radio / switch / select の比較マトリクスが表示される
- [ ] 4 つの checkbox pattern detail page が作成され、`whenToUse` と `comparisonTip` で使い分けを説明できる
- [ ] `sidebars.ts`、`DocsHomeContent`、`docusaurus.config.ts` の導線更新がそろっている
- [ ] `pnpm typecheck` と `pnpm build` が成功する
- [ ] 手動検証で detail link・footer・snippet 表示・モバイル表示に問題がない
- [ ] 既存の button / table / ellipsis-display カテゴリにリグレッションがない
