# Codebase Exploration Report: Quantity Stepper Control

**探索目的**: `TODO/quantity-stepper-control.md` と既存 `ui-pattern-lab` 実装を照合し、`quantity-stepper-control` が compare page / detail page / snippet / demo / navigation のどの層で実現されているかを特定する。あわせて、TODO に対して未充足の gap が残っているか、今回の作業が code change ではなく spec 整理で完結できるかを判断する。

---

## 0. エグゼクティブサマリー

**重要な発見（Top 5）**:
1. `quantity-stepper-control` は controller family の正式 entry としてすでに登録されており、summary / problem / solution / whenToUse / comparisonTip / interactionNotes / accessibilityNotes が揃っている。
2. compare page 側では 5 つの比較軸と decision flow に quantity stepper が明示され、`progress` の stepper との境界も整理済みである。
3. detail page route は `docs/controller/quantity-stepper-control.mdx` と `sidebars.ts` で配線済みで、`ControllerPatternDetailContent` が該当 entry を 1 件表示する構造になっている。
4. lightweight demo、CSS snippet、TSX snippet は `ControllerPatternGallery` と `controllerPatternSnippets.ts` にすでに実装されており、demo は static mock として increment / decrement、min / max、disabled、`aria-live` の要点を見せる。
5. source TODO にある `announce` は専用 API ではなく、現状では `aria-live` と accessibility notes で表現されている。v1 としては妥当だが、将来 disabled 理由や validation reference を強化する余地はある。

**推奨される次のステップ**:
- `.specs/010-quantity-stepper-control` に hearing / exploration / plan / tasks を作り、現状実装が TODO を満たすことを仕様として固定する。
- 実装変更は原則不要とし、必要なら follow-up で「disabled 理由の例」や「validation reference への cross-link」を別タスク化する。

---

## 1. アーキテクチャ概要

### 1.1 ディレクトリ構造

```text
ui-pattern-lab/
├── docs/
│   └── controller/
│       └── quantity-stepper-control.mdx
├── src/
│   ├── data/
│   │   ├── controllerPatternTypes.ts
│   │   ├── controllerPatternEntries.ts
│   │   └── controllerPatternSnippets.ts
│   ├── components/
│   │   ├── ControllerCategoryContent/
│   │   ├── ControllerPatternPageContent/
│   │   ├── ControllerPatternDetailContent/
│   │   └── ControllerPatternGallery/
│   └── pages/
│       └── patterns/
│           └── controller-designs/
│               └── index.tsx
└── sidebars.ts
```

**構造の特徴**:
- `docs/controller/quantity-stepper-control.mdx` は薄い wrapper で、実質的な本文は React component と data layer から組み立てられる。
- compare page は `src/pages/patterns/controller-designs/index.tsx` 配下にあり、通常の docs wrapper とは別ルートとして手動で維持されている。
- quantity stepper 固有の metadata と snippet は controller family の data layer に寄せられ、UI component は `entryId` をもとに list / detail を描き分ける。

### 1.2 主要ファイル

| ファイルパス | 役割 | 重要度 |
|-------------|------|--------|
| `ui-pattern-lab/src/data/controllerPatternTypes.ts` | `quantity-stepper-control` を含む controller family の ID / entry / snippet 型を定義する。 | 高 |
| `ui-pattern-lab/src/data/controllerPatternEntries.ts` | compare page / detail page の summary、problem、interaction、accessibility を保持する source of truth。 | 高 |
| `ui-pattern-lab/src/data/controllerPatternSnippets.ts` | CSS / TSX snippet と補足 note を保持する。 | 高 |
| `ui-pattern-lab/src/components/ControllerPatternPageContent/index.tsx` | compare page の判断軸と decision flow を描く。 | 高 |
| `ui-pattern-lab/src/components/ControllerPatternDetailContent/index.tsx` | detail page で 1 entry を読み出し、文脈メモと gallery を表示する。 | 高 |
| `ui-pattern-lab/src/components/ControllerPatternGallery/index.tsx` | lightweight demo、design notes、snippet panel を束ねる。 | 高 |
| `ui-pattern-lab/docs/controller/quantity-stepper-control.mdx` | detail route を張る薄い MDX wrapper。 | 中 |
| `ui-pattern-lab/sidebars.ts` | docs sidebar の detail link を手動で配線する。 | 中 |

### 1.3 レイヤー構成

```text
docs/controller/quantity-stepper-control.mdx
src/pages/patterns/controller-designs/index.tsx
                │
                ▼
ControllerPatternDetailContent / ControllerPatternPageContent
                │
                ▼
        ControllerPatternGallery
                │
     ┌──────────┼──────────┐
     ▼          ▼          ▼
 Preview     Metadata    Snippets
     │          │          │
     └──────────┴──────────┘
                │
                ▼
 controllerPatternEntries + controllerPatternSnippets
```

**各層の責務**:
- **Route layer**: compare page と detail page の URL を提供する。
- **Presentation layer**: gallery / context note / compare axis を描画する。
- **Data layer**: pattern の説明、boundary note、code sample を管理する。
- **Navigation layer**: sidebar とカテゴリ導線を手動で維持する。

### 1.4 依存関係

```text
controllerPatternTypes.ts
        │
        ▼
controllerPatternEntries.ts ----┐
controllerPatternSnippets.ts ---┤
                                ▼
                 ControllerPatternDetailContent
                 ControllerPatternPageContent
                                ▼
                    ControllerPatternGallery
                                ▼
                     docs / compare route / sidebar
```

**循環依存**: 調査した範囲では明確な循環依存は見当たらない。  
**主要な外部依存**: `@docusaurus/core@3.9.2`, `@docusaurus/preset-classic@3.9.2`, `react@^19.0.0`, `typescript@~5.6.2`, `clsx@^2.0.0`。

---

## 2. 関連コード分析

### 2.1 TODO 要件と既存コードの対応

| TODO 項目 | 既存の受け皿 | 関連度 |
|----------|-------------|--------|
| compare page での判断軸を定義する | `ControllerPatternPageContent/index.tsx` の `axisItems` と `decisionFlowItems` | 高 |
| detail page 用の metadata を作る | `controllerPatternEntries.ts` の `quantity-stepper-control` entry と `ControllerPatternGallery` の metadata panel | 高 |
| increment / decrement demo を作る | `ControllerPatternGallery/index.tsx` の `QuantityStepperControlDemo`（static mock） | 高 |
| boundary state と validation note を整理する | `interactionNotes`、`accessibilityNotes`、snippet note、detail context note | 高 |
| CSS / TSX snippet を用意する | `controllerPatternSnippets.ts` の CSS / TSX item | 高 |

### 2.2 再利用可能なパターン

#### パターン: controller entry の metadata schema

**場所**: `ui-pattern-lab/src/data/controllerPatternEntries.ts`  
**概要**: `summary`、`problem`、`solution`、`whenToUse`、`comparisonTip`、`interactionNotes`、`accessibilityNotes` を 1 entry にまとめる。  
**再利用方法**: quantity stepper の boundary note や progress stepper との違いを compare page と detail page の両方で一貫して説明できる。

```ts
{
  id: 'quantity-stepper-control',
  title: 'quantity stepper control',
  summary:
    'bounded numeric value を plus / minus で安全に調整し、min / max と現在値を明示する controller パターンです。',
  comparisonTip:
    'progress の stepper は multi-step status 表示、こちらは numeric adjustment です。',
}
```

#### パターン: list / detail を兼ねる gallery

**場所**: `ui-pattern-lab/src/components/ControllerPatternGallery/index.tsx`  
**概要**: `density='list' | 'detail'` で preview、metadata、snippet の見せ方を変える。  
**再利用方法**: compare page では compact に、detail page では full expand に見せる既存流儀を保てる。

```tsx
<PreviewPanel density={density} entry={entry} />
<SnippetPanel density={density} entry={entry} />
<MetadataPanel density={density} entry={entry} />
```

#### パターン: snippet map + note

**場所**: `ui-pattern-lab/src/data/controllerPatternSnippets.ts`  
**概要**: CSS と TSX の最小サンプルに加えて note を添え、適用条件や誤用を補足する。  
**再利用方法**: quantity stepper を「number input の代替ではなく、狭い範囲の numeric adjustment に限定する」という役割説明をコードと一緒に残せる。

```tsx
<output aria-live="polite" className={styles.stepperValue}>
  {quantity}
</output>
```

### 2.3 類似実装の参考例

#### 参考: `progress/stepper-status-tracker`

**実装ファイル**:
- `ui-pattern-lab/docs/progress/stepper-status-tracker.mdx`
- `ui-pattern-lab/src/data/progressPatternEntries.ts`
- `ui-pattern-lab/src/components/ProgressPatternDetailContent/index.tsx`

**類似点**: 同じ「stepper」という語を含むが、こちらは multi-step status 表示であり quantity adjustment ではない。  
**参考になる点**: 命名が近い分、context note と comparison copy で混同を防ぐ必要がある。

#### 参考: `pagination-and-page-size-controller`

**実装ファイル**:
- `ui-pattern-lab/src/data/controllerPatternEntries.ts`
- `ui-pattern-lab/src/data/controllerPatternSnippets.ts`

**類似点**: disabled、boundary、current state の扱いが quantity stepper に近い。  
**参考になる点**: `currentPage` clamp や disabled state の説明を metadata / snippet note に分散させる existing pattern。

### 2.4 命名規則・コーディングスタイル

- **ファイル命名**: docs route と entry ID は `kebab-case`、component directory は `PascalCase`
- **変数命名**: `camelCase`
- **インデント**: 2 spaces
- **型の扱い**: `ControllerPatternEntryId` の union と data entry の整合で型安全を担保する
- **表示規約**: compare page と detail page は別 route だが、どちらも同じ entry data を source of truth として使う

---

## 3. 技術的制約・リスク

### 3.1 既存の制約

**型システム・リンター**:
- `package.json` の検証コマンドは `pnpm typecheck` と `pnpm build` が中心で、専用 test suite は存在しない。
- detail component は未知の `entryId` に対して `throw new Error(...)` するため、doc ID・data ID・demo registry のずれは build / runtime failure になりやすい。

**ビルド設定**:
- ビルドツールは Docusaurus。
- docs route と `src/pages/patterns/*` route が混在しており、導線は手動で保守される。
- `onBrokenLinks: 'throw'` のため、sidebar や link の不整合は build failure になる。

### 3.2 互換性の問題

| ライブラリ | バージョン | リスク |
|-----------|----------|--------|
| `@docusaurus/core` / `@docusaurus/preset-classic` | `3.9.2` | docs と compare page の二重ルートをまたぐ link が壊れやすい。 |
| `react` / `react-dom` | `^19.0.0` | demo は client-side state を持てるが、重い実装に寄せると docs page が冗長になる。 |
| `typescript` | `~5.6.2` | entry ID のずれは型エラーか runtime error を起こしやすい。 |

### 3.3 パフォーマンスボトルネック

- 現状の quantity stepper demo は lightweight mock で、既知の大きなボトルネックはない。
- 今後 number input fallback や long-press behavior を本格再現すると、docs ページに対して過剰なインタラクションになりうる。

### 3.4 セキュリティ考慮点

- 静的 docs サイトのため、主要な関心はセキュリティより a11y と情報設計にある。
- quantity stepper では `aria-label`、`aria-live`、disabled 理由の伝え方が品質の中心になる。

---

## 4. 変更影響範囲

### 4.1 波及ファイル

**直接影響**（今回追加する spec artifact）:
| ファイルパス | 理由 | 影響の種類 |
|-------------|------|-----------|
| `.specs/010-quantity-stepper-control/hearing-notes.md` | 要件整理を固定する | 追加 |
| `.specs/010-quantity-stepper-control/exploration-report.md` | 既存実装との対応関係を記録する | 追加 |
| `.specs/010-quantity-stepper-control/implementation-plan.md` | 実施方針と検証基準を固定する | 追加 |
| `.specs/010-quantity-stepper-control/tasks.md` | 作業粒度と完了条件を管理する | 追加 |

**間接影響**（現状実装の監査対象。今回コード変更は想定しない）:
| ファイルパス | 理由 | 確認内容 |
|-------------|------|---------|
| `ui-pattern-lab/src/components/ControllerPatternPageContent/index.tsx` | compare page の判断軸を担う | quantity stepper が decision flow に含まれるか |
| `ui-pattern-lab/src/data/controllerPatternEntries.ts` | detail metadata の source of truth | min / max、boundary、progress stepper との区別が書かれているか |
| `ui-pattern-lab/src/components/ControllerPatternDetailContent/index.tsx` | detail page の context note を担う | quantity stepper 固有の文脈メモがあるか |
| `ui-pattern-lab/src/components/ControllerPatternGallery/index.tsx` | demo / metadata / snippet 表示を担う | quantity stepper demo と panel が表示されるか |
| `ui-pattern-lab/src/data/controllerPatternSnippets.ts` | CSS / TSX snippet を保持する | increment / decrement、disabled、`aria-live` が含まれるか |
| `ui-pattern-lab/docs/controller/quantity-stepper-control.mdx` | detail route を定義する | entry ID が正しいか |
| `ui-pattern-lab/sidebars.ts` | docs sidebar を配線する | detail doc が sidebar に含まれるか |

### 4.2 テスト範囲

**既存テストファイル**:
| テストファイルパス | テスト対象 | 修正の必要性 |
|------------------|----------|------------|
| 該当なし | リポジトリ内に `*.test.*` / `*.spec.*` は見当たらない | 低 |

**新規テストの必要性**:
- [ ] ユニットテスト: 現時点では不要。ロジックは docs 用 mock state に留まる。
- [ ] 統合テスト: `pnpm typecheck` と `pnpm build` が実質的な検証手段になる。
- [ ] E2Eテスト: 既存基盤はないため、compare page / detail page の手動確認で代替する。

### 4.3 破壊的変更の可能性

| API / 関数 | 変更内容 | 影響範囲 |
|-----------|---------|---------|
| `ControllerPatternEntryId` | entry ID を変更すると doc / demo / detail lookup が壊れる | controller family 全体 |
| `controllerPatternEntries` | metadata の欠落や key 変更で compare / detail copy が崩れる | compare page / detail page |
| `controllerPatternSnippets` | snippet map の欠落で detail page の code sample が空になる | detail page |

**全体評価**: 現在の TODO スコープはすでに満たされているため、今回の spec 作業自体に破壊的変更リスクはほぼない。将来 code change を入れる場合も、影響範囲は controller family のローカルに収まる。

### 4.4 移行計画の必要性

- 段階的リリース: 不要
- ロールバック計画: 今回は spec artifact 追加のみなので、`.specs/010-quantity-stepper-control/` を戻せばよい
- 実装順の推奨: **hearing notes → exploration report → implementation plan → tasks → plan review → typecheck/build**

---

## 5. フォローアップ判断

- [x] disabled 理由や validation helper は、今回の scope では detail page へ追記せず、必要になった時点で別 follow-up として扱う。現状の `accessibilityNotes` と snippet note で v1 の説明粒度は満たせている。
- [x] `quantity-stepper-control` から broader validation guidance への cross-link は、現時点では追加しない。cross-cutting reference の置き場が固まってから検討する方が情報設計として一貫する。
- [x] 値の範囲が広い numeric control は quantity stepper とは別文脈として扱い、将来必要になれば number input / slider 系の別ドキュメントまたは follow-up で整理する。
