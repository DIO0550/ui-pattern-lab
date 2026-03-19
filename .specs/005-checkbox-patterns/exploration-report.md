# Codebase Exploration Report: Checkbox Patterns

**探索目的**: `ui-pattern-lab` に checkbox のデザインパターンを追加する前提で、既存カテゴリの追加方法、checkbox に近い既存実装、checkbox / radio button / switch(toggle) / select の選び分け解説をどこに置くのが自然か、ビルド・ルーティング・MDX の制約、変更影響範囲、未確定事項を整理する。

---

## 0. エグゼクティブサマリー

**重要な発見（Top 5）**:
1. 既存カテゴリ追加は完全に手作業で、`docs/*.mdx`、`src/data/*Pattern{Types,Entries,Snippets}.ts`、`src/components/*`、`src/pages/patterns/*-designs/index.tsx`、`sidebars.ts`、`src/components/DocsHomeContent/index.tsx` を同期更新する構成です。加えて `docusaurus.config.ts` の footer も実質的なナビゲーション面です。
2. checkbox に最も近い既存カテゴリは `button` です。`src/data/buttonPatternTypes.ts` のメタデータが最も豊富で、`toggle-and-selection` が状態切替・単一選択・アクセシビリティの説明をすでに持っています。
3. 他コントロールとの選び分け解説は、現行コードの前例では `src/components/*PatternPageContent/index.tsx` の overview / guide セクションに置くのが最も自然です。各 pattern entry の `whenToUse` で補足するハイブリッド構成が最も収まりがよいです。
4. ルーティングは docs (`slug: /...`) と custom page (`/patterns/*-designs`) に分かれています。`onBrokenLinks: 'throw'`、detail component の `throw new Error(...)`、`Record<EntryId, Snippets>` によって、リンク切れや一部の ID 不整合は build 時 / 描画時に顕在化します。
5. hearing-notes の「比較観点を各 entry に持たせたい」という仮説は部分的には既存構造に合いますが、cross-control な意思決定ガイドを first-class なデータとして持つ前例はまだありません。checkbox を独立カテゴリにし、category/overview 向けの比較データを別に持つ方が自然です。

**推奨される次のステップ**:
- checkbox を独立カテゴリ (`/checkbox`, `/patterns/checkbox-designs`) として追加するか、`button` の一部へ統合するかを先に決める。現状構造では独立カテゴリの方が無理が少ないです。
- decision guidance は「overview で共有する比較表・判断軸データ」と「entry 単位の `whenToUse` / comparison note」に分けて設計してから実装に入る。

---

## 1. アーキテクチャ概要

### 1.1 ディレクトリ構造

```text
/workspace/ui-pattern-lab/
├── docs/
│   ├── index.mdx
│   ├── table.mdx
│   ├── table/*.mdx
│   ├── ellipsis-display.mdx
│   ├── ellipsis-display/*.mdx
│   ├── button.mdx
│   └── button/*.mdx
├── src/
│   ├── data/
│   │   ├── tablePatternTypes.ts
│   │   ├── tablePatternEntries.ts
│   │   ├── tablePatternSnippets.ts
│   │   ├── ellipsisDisplayPatternTypes.ts
│   │   ├── ellipsisDisplayPatternEntries.ts
│   │   ├── ellipsisDisplayPatternSnippets.ts
│   │   ├── buttonPatternTypes.ts
│   │   ├── buttonPatternEntries.ts
│   │   └── buttonPatternSnippets.ts
│   ├── components/
│   │   ├── DocsHomeContent/
│   │   ├── Table*/
│   │   ├── EllipsisDisplay*/
│   │   └── Button*/
│   └── pages/
│       └── patterns/
│           ├── table-designs/index.tsx
│           ├── ellipsis-display-designs/index.tsx
│           └── button-designs/index.tsx
├── docusaurus.config.ts
├── sidebars.ts
├── tsconfig.json
└── package.json
```

**構造の特徴**:
- `docs/*.mdx` はほぼすべてが薄い wrapper で、frontmatter と component import のみを持ちます。実質的なコンテンツは `src/components` と `src/data` にあります。
- パターンカテゴリごとに `data + components + docs + pages/patterns` が並行して存在します。category 追加は code-first で、filesystem から自動生成される仕組みはありません。
- 一覧比較ページ (`/patterns/*-designs`) は docs plugin の配下ではなく `src/pages` の custom route です。docs sidebar と完全自動では連動しません。
- ナビゲーションは `sidebars.ts`、`DocsHomeContent`、`docusaurus.config.ts` footer に分散しており、1 箇所追加して終わる構成ではありません。

### 1.2 主要ファイル

| ファイルパス | 役割 | 重要度 |
|-------------|------|--------|
| `/workspace/ui-pattern-lab/docusaurus.config.ts` | `baseUrl`、`docs.routeBasePath`、`onBrokenLinks`、footer link を定義 | 高 |
| `/workspace/ui-pattern-lab/sidebars.ts` | docs sidebar のカテゴリ・並び順・doc ID を明示定義 | 高 |
| `/workspace/ui-pattern-lab/src/components/DocsHomeContent/index.tsx` | docs home のカテゴリカード、リンク一覧、開閉 state を手動管理 | 高 |
| `/workspace/ui-pattern-lab/src/data/buttonPatternTypes.ts` | checkbox に最も近い `button` の entry schema を定義 | 高 |
| `/workspace/ui-pattern-lab/src/data/buttonPatternEntries.ts` | `toggle-and-selection` を含む既存の選択系 guidance を格納 | 高 |
| `/workspace/ui-pattern-lab/src/data/buttonPatternSnippets.ts` | snippet を `Record<EntryId, Snippets>` で型安全に保持 | 高 |
| `/workspace/ui-pattern-lab/src/components/ButtonPatternPageContent/index.tsx` | overview 上の guide card と gallery の前例 | 高 |
| `/workspace/ui-pattern-lab/src/components/ButtonCategoryContent/index.tsx` | category page から overview / detail へ導く compare-first 導線の前例 | 高 |
| `/workspace/ui-pattern-lab/src/components/ButtonPatternDetailContent/index.tsx` | MDX detail page から entry を引いて runtime guard する前例 | 高 |
| `/workspace/ui-pattern-lab/src/components/EllipsisDisplayPatternPageContent/index.tsx` | generic guidance と別カテゴリへの補助リンクを共存させる前例 | 中 |
| `/workspace/.github/workflows/deploy.yml` | GitHub Pages build/deploy。CI は `pnpm build` のみ | 中 |

### 1.3 レイヤー構成

```text
docs/*.mdx                    src/pages/patterns/*/index.tsx
   |                                        |
   v                                        v
CategoryContent / PatternDetailContent   PatternPageContent
                 \                        /
                  \                      /
                   v                    v
                     PatternGallery
                    /      |       \
                   v       v        v
         SectionCard  MetadataPanel  SnippetPanel
                         |
                         v
                 src/data/*Pattern*.ts

sidebars.ts / DocsHomeContent / footer
           \         |          /
            \        |         /
             v       v        v
                手動ナビゲーション
```

**各層の責務**:
- `docs/*.mdx`: docs route の frontmatter と component mount を提供する。
- `src/pages/patterns/*`: hero 付きの比較一覧ページを提供する。docs sidebar 配下ではない。
- `src/components/*`: category page、overview page、detail page、gallery、panel など UI を構成する。
- `src/data/*`: pattern entry、snippet、entry id を型付きで保持する。
- `sidebars.ts` / `DocsHomeContent` / footer: docs 上の導線を明示的に管理する。

### 1.4 依存関係

```text
/docs/button.mdx
  -> ButtonCategoryContent
     -> buttonPatternEntries

/docs/button/toggle-and-selection.mdx
  -> ButtonPatternDetailContent
     -> buttonPatternEntries
     -> ButtonPatternGallery
        -> ButtonPatternMetadataPanel / ButtonPatternSnippetPanel / demoByKind

/src/pages/patterns/button-designs/index.tsx
  -> ButtonPatternPageContent
     -> buttonPatternEntries
     -> ButtonPatternGallery

/sidebars.ts, /src/components/DocsHomeContent/index.tsx, /docusaurus.config.ts
  -> 各 docs slug / custom route 文字列を手動参照
```

**循環依存**: inspected files の範囲では見当たりません。`data` は component を import せず、component は同カテゴリの `data` と subcomponent を一方向に参照しています。  
**主要な外部依存**: `@docusaurus/core 3.9.2`、`@docusaurus/preset-classic 3.9.2`、`@mdx-js/react ^3.0.0`、`react/react-dom ^19.0.0`、`typescript ~5.6.2`、`clsx ^2.0.0`。

---

## 2. 関連コード分析

### 2.1 変更対象に関連する既存コード

| ファイルパス | 関連内容 | 関連度 |
|-------------|---------|--------|
| `/workspace/ui-pattern-lab/sidebars.ts` | 新カテゴリ追加時に doc ID と順序を必ず登録する場所 | 高 |
| `/workspace/ui-pattern-lab/src/components/DocsHomeContent/index.tsx` | home 上のカテゴリカード、`CategoryId` union、`openStates` を更新する必要がある | 高 |
| `/workspace/ui-pattern-lab/docusaurus.config.ts` | footer にカテゴリリンクを追加する場合の更新先。`onBrokenLinks: 'throw'` もここ | 高 |
| `/workspace/ui-pattern-lab/src/data/buttonPatternTypes.ts` | checkbox 向け schema を決めるときの最有力テンプレート | 高 |
| `/workspace/ui-pattern-lab/src/data/buttonPatternEntries.ts` | `whenToUse` / `layoutNotes` / `stateNotes` / `accessibilityNotes` の粒度が近い | 高 |
| `/workspace/ui-pattern-lab/src/data/buttonPatternSnippets.ts` | `Record<EntryId, Snippets>` による型安全な snippet 管理の前例 | 高 |
| `/workspace/ui-pattern-lab/src/components/ButtonPatternPageContent/index.tsx` | 選び分け guide を overview に置く最も近い前例 | 高 |
| `/workspace/ui-pattern-lab/src/components/ButtonPatternGallery/index.tsx` | metadata item の組み立て方、demo dispatch、detail/list 密度切替の前例 | 高 |
| `/workspace/ui-pattern-lab/src/components/ButtonPatternDetailContent/index.tsx` | `entryId` 不整合を `throw new Error` で検知する前例 | 高 |
| `/workspace/ui-pattern-lab/src/components/EllipsisDisplayPatternPageContent/index.tsx` | generic guidance と別カテゴリへの link を同一ページに置く前例 | 中 |
| `/workspace/ui-pattern-lab/src/components/TableCategoryContent/index.tsx` | 比較ページリンクのない、より単純な category page の前例 | 中 |
| `/workspace/ui-pattern-lab/docs/button.mdx` | category doc wrapper の最小形 | 中 |
| `/workspace/ui-pattern-lab/docs/button/toggle-and-selection.mdx` | detail doc wrapper の最小形 | 中 |

### 2.2 再利用可能なパターン

#### パターン: 型付き entry + snippet 正規化

**場所**: `/workspace/ui-pattern-lab/src/data/buttonPatternEntries.ts`  
**概要**: entry 本体と snippet map を分離し、空コードを除外しながら結合しています。  
**再利用方法**: checkbox でも `CheckboxPatternEntryId` と `Record<CheckboxPatternEntryId, CheckboxPatternSnippets>` を使えば、entry/snippet の key ずれを typecheck で検知できます。

```ts
function normalizeSnippets(
  snippets: ButtonPatternSnippets,
): ButtonPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

export const buttonPatternEntries: ButtonPatternEntry[] =
  baseButtonPatternEntries.map((entry) => ({
    ...entry,
    snippets: normalizeSnippets(buttonPatternSnippets[entry.id]),
  }));
```

#### パターン: overview ページに比較ガイドを置く

**場所**: `/workspace/ui-pattern-lab/src/components/ButtonPatternPageContent/index.tsx`  
**概要**: hero 的イントロの下に guide card を並べ、pattern gallery へ続けています。  
**再利用方法**: checkbox / radio / switch / select の判断軸を card や matrix としてここに置くと、現行構造との整合性が高いです。category page や detail page よりも「横断比較」に向きます。

```tsx
<section className={`container margin-bottom--xl ${styles.guideSection}`}>
  <Heading as="h2">ボタン横断ガイド</Heading>
  <div className={styles.guideGrid}>
    <article className={styles.guideCard}>
      <Heading as="h3">優先順位</Heading>
      <p>primary を 1 つに絞り...</p>
    </article>
    <article className={styles.guideCard}>
      <Heading as="h3">状態設計</Heading>
      <p>focus-visible を消さず...</p>
    </article>
  </div>
</section>
```

#### パターン: detail page の runtime guard

**場所**: `/workspace/ui-pattern-lab/src/components/ButtonPatternDetailContent/index.tsx`  
**概要**: MDX から渡された `entryId` を lookup し、不正値なら即座に error を投げます。  
**再利用方法**: checkbox detail page でも同様に guard すれば、MDX frontmatter / import は正しくても `entryId` 文字列がズレたときに build 時点で検出しやすくなります。

```tsx
const entry = buttonPatternEntries.find((item) => item.id === entryId);

if (!entry) {
  throw new Error(`Unknown button pattern entry: ${entryId}`);
}
```

#### パターン: generic guidance + 別カテゴリへの補助導線

**場所**: `/workspace/ui-pattern-lab/src/components/EllipsisDisplayPatternPageContent/index.tsx`  
**概要**: generic な省略表示の比較ページに、`/table/cell-truncation` への補助リンクを同居させています。  
**再利用方法**: checkbox overview から `button/toggle-and-selection` など関連 control への補足リンクを置く場合の参考になります。

```tsx
<p className={styles.compareLead}>
  このページでは generic な意思決定ガイドに絞っています。
</p>
<Link to="/table/cell-truncation">/table/cell-truncation</Link>
```

### 2.3 類似実装の参考例

#### 参考: Button / トグル・選択

**実装ファイル**:
- `/workspace/ui-pattern-lab/docs/button/toggle-and-selection.mdx`
- `/workspace/ui-pattern-lab/src/data/buttonPatternEntries.ts`
- `/workspace/ui-pattern-lab/src/components/ButtonPatternGallery/index.tsx`

**類似点**: checkbox と同じく「実行ボタン」ではなく「状態選択」を扱います。`aria-pressed`、単独トグル、単一選択グループといった判断軸が近いです。  
**参考になる点**: `whenToUse` / `stateNotes` / `accessibilityNotes` の 3 層で説明しており、checkbox に必要な「複数選択」「即時反映」「選択可能数」の guidance を同じ粒度で持てます。

#### 参考: Ellipsis Display / generic な選び分けガイド

**実装ファイル**: `/workspace/ui-pattern-lab/src/components/EllipsisDisplayPatternPageContent/index.tsx`  
**類似点**: 1 つの control ではなく、複数の見せ方を「どれを選ぶか」という観点で比較しています。  
**参考になる点**: category 固有の gallery に加え、guide card を overview の冒頭に置いています。checkbox の場合も「checkbox / radio / switch / select をどう切り分けるか」を同様の guide セクションで表現するのが自然です。

#### 参考: Table / シンプルな category page

**実装ファイル**: `/workspace/ui-pattern-lab/src/components/TableCategoryContent/index.tsx`  
**類似点**: category doc から detail page へリンクする最小構成です。  
**参考になる点**: 逆に checkbox にはこの構成だけでは不十分です。checkbox は cross-control の比較解説が本体に近いため、Table 方式より Button / EllipsisDisplay 方式を採るべきです。

### 2.4 命名規則・コーディングスタイル

- **ファイル命名**: docs route と entry ID は kebab-case (`button/toggle-and-selection.mdx`, `button-designs`)。component directory は PascalCase (`ButtonPatternPageContent`)。data file は lowerCamel + suffix (`buttonPatternEntries.ts`)。
- **変数命名**: 変数・関数は camelCase、type は PascalCase、entry ID は kebab-case の string literal union。
- **インデント**: 2 spaces。
- **書式**: single quote、セミコロンあり、`import type` を積極利用、`@site/...` alias を利用。
- **MDX の使い方**: MDX は長文本文を書く場所というより、frontmatter + component mount の wrapper として使われています。checkbox でも本文の主戦場は `src/components` / `src/data` 側になりそうです。

---

## 3. 技術的制約・リスク

### 3.1 既存の制約

**型システム・リンター**:
- `/workspace/ui-pattern-lab/tsconfig.json` は `@docusaurus/tsconfig` を extend しており、local では `baseUrl` のみを追加しています。
- 継承元 (`/workspace/ui-pattern-lab/node_modules/@docusaurus/tsconfig/tsconfig.json`) では `jsx: 'preserve'`, `moduleResolution: 'bundler'`, `target: 'ES2022'`, `noEmit: true`, `skipLibCheck: true` が有効です。
- lint script / ESLint config / Prettier config は見つかりませんでした。`package.json` の script は `pnpm typecheck` と `pnpm build` が中心です。
- test file (`**/*.{test,spec}.*`, `__tests__`) も見つかりませんでした。現状の品質ゲートは typecheck と build が主です。

**ビルド設定**:
- ビルドツール: Docusaurus 3.9.2 (`pnpm build` -> `docusaurus build`)
- 対象環境: 静的サイト (browser)
- docs は `routeBasePath: '/'` のため `/button`, `/table` のように root 配下へ出ます。
- custom route は `src/pages/patterns/*` から生成され、例として `/patterns/button-designs` があります。
- `onBrokenLinks: 'throw'` のため、slug や link 文字列のズレは build failure になり得ます。
- 実測でも `cd /workspace/ui-pattern-lab && pnpm typecheck && pnpm build` は成功しました。

**routing / MDX 制約**:
- category / detail docs は sidebar に載る一方、`/patterns/*-designs` は docs sidebar の外側です。比較ガイドを custom page のみに置くと、sidebar 上の discoverability は下がります。
- MDX は wrapper なので、比較ガイドの主たる実装先を MDX に寄せると既存パターンから外れます。
- `entryId` は MDX から string で渡されるため、TypeScript だけで完全には守れません。実運用上は detail component の `throw new Error(...)` が最後の防波堤です。

### 3.2 互換性の問題

| ライブラリ / 要素 | バージョン / 状態 | リスク |
|-----------|----------|--------|
| `@docusaurus/core`, `@docusaurus/preset-classic` | `3.9.2` | docs route と custom route が別管理なので、slug / sidebars / home card / footer の同期漏れで broken link が出やすい |
| `react`, `react-dom` | `^19.0.0` | checkbox の `indeterminate` は属性ではなく DOM property で扱う必要があり、既存デモより 1 段複雑になる可能性が高い |
| `typescript` | `~5.6.2` | union type / `Record` により data の整合性は保ちやすいが、MDX 側の文字列ミスは runtime guard 依存 |
| Node / GitHub Actions | local `>=20`, CI `24` | build 自体は通るが、Node 24 上で Docusaurus 由来の `url.parse()` deprecation warning が出る |
| MDX 3 | `^3.0.0` | 長い比較解説を MDX 本文へ寄せること自体は可能だが、現行の code-first データ構造から外れる |

### 3.3 パフォーマンスボトルネック

- 現状は静的コンテンツ中心で、既知の大きなボトルネックは見当たりません。
- ただし overview gallery は entry 数ぶん demo component を同時描画します。checkbox で状態付き demo を増やしすぎると初回表示の密度が上がるため、初回収録は 4〜5 entry 程度に留める方が安全です。
- `indeterminate` や bulk selection など stateful demo を入れる場合も、既存の Button gallery と同様に component local state に閉じ込めるのが無難です。

### 3.4 セキュリティ考慮点

- 認証・認可・外部入力を扱うアプリではないため、セキュリティ上の大きな論点はありません。
- 実質的なリスクは broken link / invalid route / a11y 退行です。特に checkbox は semantic HTML (`input type="checkbox"`) と label の結びつきを崩さないことの方が重要です。
- `onBrokenLinks: 'throw'` と detail component の runtime guard により、リンクや ID の不整合は比較的早く表面化します。

### 3.5 hearing-notes の仮説とのズレ

- **ズレ 1: 比較解説のデータ構造**  
  hearing-notes では各 pattern entry に比較観点を持たせる想定でしたが、現行コードには cross-control guidance を first-class に表す型がありません。既存は `whenToUse` と static な guide card の組み合わせです。
- **ズレ 2: 比較対象の既存カテゴリ**  
  hearing-notes では checkbox / radio / switch / select を比較対象に挙げていますが、リポジトリ内に radio / switch / select の独立カテゴリはまだありません。既存で最も近いのは button の `toggle-and-selection` のみです。
- **ズレ 3: 品質ゲート**  
  hearing-notes は `pnpm typecheck` と `pnpm build` を必須としていますが、GitHub Actions (`/workspace/.github/workflows/deploy.yml`) は現状 `pnpm build` しか実行していません。typecheck は local/手動運用寄りです。
- **ズレ 4: カテゴリ追加の一貫性**  
  hearing-notes は「既存パターンのように追加」と読めますが、現実には Table と Button / EllipsisDisplay で category page の導線設計が少し異なります。checkbox はどの流儀を継ぐかを決める必要があります。

---

## 4. 変更影響範囲

### 4.1 波及ファイル

**直接影響**（修正が必須、checkbox を独立カテゴリとして追加する推奨案）:

| ファイルパス | 理由 | 影響の種類 |
|-------------|------|-----------|
| `/workspace/ui-pattern-lab/sidebars.ts` | `patternsSidebar` に checkbox category と doc item 群を追加する必要がある | 修正 |
| `/workspace/ui-pattern-lab/src/components/DocsHomeContent/index.tsx` | `CategoryId` union、`categoryCards`、`openStates` に checkbox を追加する必要がある | 修正 |
| `/workspace/ui-pattern-lab/docusaurus.config.ts` | footer のカテゴリリンクを既存 3 件から 4 件へ増やすなら更新が必要 | 修正 |
| `/workspace/ui-pattern-lab/docs/checkbox.mdx` | category doc wrapper を新設する必要がある | 追加 |
| `/workspace/ui-pattern-lab/docs/checkbox/multi-select-options.mdx` | detail doc wrapper 候補: 複数の独立選択 | 追加 |
| `/workspace/ui-pattern-lab/docs/checkbox/single-checkbox-and-consent.mdx` | detail doc wrapper 候補: 単独 checkbox と同意/設定 | 追加 |
| `/workspace/ui-pattern-lab/docs/checkbox/indeterminate-and-bulk-selection.mdx` | detail doc wrapper 候補: mixed state / 全選択 | 追加 |
| `/workspace/ui-pattern-lab/docs/checkbox/states-and-touch-targets.mdx` | detail doc wrapper 候補: disabled/error/mobile/a11y | 追加 |
| `/workspace/ui-pattern-lab/src/data/checkboxPatternTypes.ts` | `CheckboxPatternEntryId`、entry schema、metadata tone を定義する必要がある | 追加 |
| `/workspace/ui-pattern-lab/src/data/checkboxPatternEntries.ts` | 各 pattern の summary / problem / solution / whenToUse 等を持つ | 追加 |
| `/workspace/ui-pattern-lab/src/data/checkboxPatternSnippets.ts` | CSS / TSX snippet を typed record で保持する | 追加 |
| `/workspace/ui-pattern-lab/src/components/CheckboxCategoryContent/{index.tsx,styles.module.css}` | category page の compare-first 導線を実装する | 追加 |
| `/workspace/ui-pattern-lab/src/components/CheckboxPatternPageContent/{index.tsx,styles.module.css}` | overview page と cross-control guide の中心になる | 追加 |
| `/workspace/ui-pattern-lab/src/components/CheckboxPatternDetailContent/{index.tsx,styles.module.css}` | detail route で entry lookup と breadcrumb を担う | 追加 |
| `/workspace/ui-pattern-lab/src/components/CheckboxPatternGallery/{index.tsx,styles.module.css}` | demo dispatch、metadata/snippet panel 表示を担う | 追加 |
| `/workspace/ui-pattern-lab/src/components/CheckboxPatternSectionCard/{index.tsx,styles.module.css}` | preview / code / metadata の section wrapper | 追加 |
| `/workspace/ui-pattern-lab/src/components/CheckboxPatternMetadataPanel/{index.tsx,styles.module.css}` | 課題・解決方法・使いどころ・比較メモなどを表示する | 追加 |
| `/workspace/ui-pattern-lab/src/components/CheckboxPatternSnippetPanel/{index.tsx,styles.module.css}` | CSS / TSX snippet を tabs/details で表示する | 追加 |
| `/workspace/ui-pattern-lab/src/pages/patterns/checkbox-designs/index.tsx` | `/patterns/checkbox-designs` route を新設する | 追加 |

**間接影響**（確認が必要、または button へ統合する代替案で影響する箇所）:

| ファイルパス | 理由 | 確認内容 |
|-------------|------|---------|
| `/workspace/ui-pattern-lab/src/components/DocsHomeContent/styles.module.css` | category が 4 つ以上になると grid 崩れの可能性がある | 1 行 / 2 行折返し時のカード密度確認 |
| `/workspace/ui-pattern-lab/src/components/ButtonPatternPageContent/index.tsx` | checkbox を button に統合するなら guide と intro の再設計が必要 | `toggle-and-selection` との責務分離 |
| `/workspace/ui-pattern-lab/src/data/buttonPatternTypes.ts` | checkbox を button に統合するなら schema 拡張が必要 | `comparisonNotes` 等を追加するか |
| `/workspace/ui-pattern-lab/src/data/buttonPatternEntries.ts` | 既存 button entry 群へ checkbox 系 entry を混ぜる場合 | title / tags / `whenToUse` の意味が button 全体で破綻しないか |
| `/workspace/ui-pattern-lab/src/components/ButtonPatternGallery/index.tsx` | 新 demo kind や metadata tone を追加する可能性 | 既存 button page の表示崩れ確認 |
| `/workspace/ui-pattern-lab/src/components/ButtonCategoryContent/index.tsx` | 統合案では category card の説明更新が必要 | 「button category」の範囲拡張が自然か |
| `/workspace/.github/workflows/deploy.yml` | 変更は不要だが build failure の最終ゲート | checkbox 追加後も Pages build が通るか |

### 4.2 テスト範囲

**既存テストファイル**:

| テストファイルパス | テスト対象 | 修正の必要性 |
|------------------|----------|------------|
| 該当なし | repository 内に自動テストファイルは見当たらない | 低 |

**新規テストの必要性**:
- [ ] ユニットテスト: 現状テスト基盤がなく、純粋関数を追加しない限り優先度は低い
- [ ] 統合テスト: 既存基盤なし。代替として `pnpm typecheck` / `pnpm build` と手動 route 確認が現実的
- [ ] E2Eテスト: 既存基盤なし

**実装時の最低確認項目**:
- `cd /workspace/ui-pattern-lab && pnpm typecheck`
- `cd /workspace/ui-pattern-lab && pnpm build`
- `/checkbox`
- `/patterns/checkbox-designs`
- 各 detail page (`/checkbox/<entry-id>`)
- docs home と sidebar と footer の導線

### 4.3 破壊的変更の可能性

| API / 関数 / 設定 | 変更内容 | 影響範囲 |
|-----------|---------|---------|
| `patternsSidebar` in `/workspace/ui-pattern-lab/sidebars.ts` | 新カテゴリ・item ID を追加 | sidebar 全体。ID typo は broken link / build failure の原因 |
| `CategoryId` in `/workspace/ui-pattern-lab/src/components/DocsHomeContent/index.tsx` | union に `checkbox` を追加 | docs home の state 管理と link card 表示 |
| `CheckboxPatternDetailContent`（新規） | unknown `entryId` で error を投げる想定 | checkbox detail route の build/render |
| `ButtonPattern*` 系（統合案の場合） | schema / gallery / guide の責務を拡張 | `/button` と `/patterns/button-designs` 全体 |

### 4.4 移行計画の必要性

- 段階的リリース: **不要**。静的コンテンツ追加が中心で、データ移行はありません。
- ロールバック計画: **追加ファイル削除 + `sidebars.ts` / `DocsHomeContent` / footer の差し戻し** で十分です。
- ただし button 統合案を選ぶ場合は既存 category を巻き込むため、独立カテゴリ案よりロールバックの手間が増えます。

---

## 5. 追加調査が必要な項目

- [ ] **独立カテゴリ vs button 統合の最終判断**  
      現状コードでは独立カテゴリが自然だが、`toggle-and-selection` との責務境界をどこで引くかはまだ設計判断が必要。
- [ ] **decision guidance のデータ構造**  
      候補は 2 つ: (a) `CheckboxPatternEntry` に `comparisonNotes` / `chooseInsteadWhen` を足す、(b) `CheckboxDecisionGuideRow[]` のような overview 専用データを別 file で持つ。現行構造との相性は (b) + `whenToUse` 補強が最もよい。
- [ ] **初回 entry セットと ID 命名**  
      `multi-select-options`, `single-checkbox-and-consent`, `indeterminate-and-bulk-selection`, `states-and-touch-targets` は妥当な候補だが、最終的な pattern 分割は未確定。
- [ ] **比較解説の配置の最終粒度**  
      自然な第一候補は `CheckboxPatternPageContent` の guide section だが、sidebar からの discoverability を高めるため `CheckboxCategoryContent` に要約を重ねるかは決める必要がある。
- [ ] **home / footer の露出方針**  
      既存カテゴリでも docs home の link 設計が揃っていない (`table` は category/overview link なし、`button` は overview link なし、`ellipsis-display` は category + overview あり)。checkbox をどの流儀に寄せるか要決定。
- [ ] **比較論点の表現方法**  
      overview には少なくとも以下を明示する必要がある: 複数選択 / 排他選択 / 単独の ON-OFF、即時反映か submit 前提か、設定変更か一時的フィルタか、`indeterminate` の必要性、モバイルの tap target、アクセシビリティ (`label`, `aria-checked`, keyboard, screen reader)。
- [ ] **関連 control へのリンク戦略**  
      repo 内に radio / switch / select の独立カテゴリはないため、checkbox guide からどこへリンクするかは未確定。現状で参照可能なのは `button/toggle-and-selection` 程度。
