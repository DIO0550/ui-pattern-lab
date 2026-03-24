# Quantity Stepper Control の仕様固定と現状実装監査

**関連Issue**: なし

`TODO/quantity-stepper-control.md` が要求している compare page の判断軸、detail metadata、increment / decrement demo、boundary note、CSS / TSX snippet は、探索した範囲ではすでに `ui-pattern-lab` の controller family に実装されている。今回の作業では新しい UI を追加するのではなく、既存実装が TODO をどこで満たしているかを `.specs/010-quantity-stepper-control` に固定し、必要なら follow-up を切り出せる状態にする。

初回スコープでは **product code の変更は原則行わない**。未充足事項が見つかった場合だけ追補タスクとして記録し、spec 監査と feature 拡張を混ぜない。

## ユーザーレビューが必要な点

> **NOTE**
> - 破壊的変更はありません。今回の主作業は spec artifact の追加と既存実装の検証です。
> - `announce` は専用 prop や明示 API ではなく、現状実装では `aria-live` と accessibility note で扱います。
> - disabled 理由や validation helper をより踏み込んで見せる案は将来の follow-up 候補とし、今回のスコープには含めません。
> - controller family と progress family の「stepper」命名衝突は、detail context note と compare copy で整理する前提です。

## システム図

### 状態マシン / フロー図

```text
                           初期表示
                              │
                              ▼
                      ┌────────────────┐
                      │    IN_RANGE    │
                      │ min < value < max
                      └───────┬───┬────┘
                  decrement   │   │ increment
                  to min      │   │ to max
                              │   │
                              ▼   ▼
                      ┌──────────┐ ┌──────────┐
                      │  AT_MIN  │ │  AT_MAX  │
                      │ dec無効   │ │ inc無効   │
                      └────┬─────┘ └────┬─────┘
                           │            │
                       increment    decrement
                           │            │
                           └──────┬─────┘
                                  ▼
                              IN_RANGE

共通ルール:
- 現在値は常に可視表示する
- 値変化は `aria-live` で補助可能とする
- 許容範囲が広すぎる場合は stepper ではなく slider / input を検討する
```

### 仕様トレーサビリティ

```text
TODO/quantity-stepper-control.md
    ↓
.specs/010-quantity-stepper-control/*
    ↓
監査対象ファイル
    ├─ controllerPatternEntries.ts
    ├─ controllerPatternSnippets.ts
    ├─ ControllerPatternPageContent/index.tsx
    ├─ ControllerPatternDetailContent/index.tsx
    ├─ ControllerPatternGallery/index.tsx
    ├─ docs/controller/quantity-stepper-control.mdx
    └─ sidebars.ts
    ↓
typecheck / build / 手動確認
```

### 実行時レンダリングフロー

```text
controllerPatternEntries + controllerPatternSnippets
    ↓
ControllerPatternPageContent / ControllerPatternDetailContent
    ↓
ControllerPatternGallery
    ├─ PreviewPanel   → QuantityStepperControlDemo (static mock)
    ├─ MetadataPanel  → problem / solution / comparison / interaction / a11y
    └─ SnippetPanel   → CSS / TSX snippet
    ↓
/patterns/controller-designs
/controller/quantity-stepper-control
```

## 変更案

### 1. Spec artifact の追加

#### [NEW] `.specs/010-quantity-stepper-control/hearing-notes.md`

要件整理を記録する。

- **目的**: `TODO/quantity-stepper-control.md` の要求を spec 作業の前提に落とし込む
- **内容**: 目的、スコープ、技術的前提、品質要件、ユーザー不在時の判断

#### [NEW] `.specs/010-quantity-stepper-control/exploration-report.md`

既存実装との対応関係を記録する。

- **目的**: compare page / detail page / snippet / demo / navigation のどこが TODO を満たしているかを明文化する
- **内容**: アーキテクチャ、関連ファイル、TODO 項目とのマッピング、リスク、追加調査項目

#### [NEW] `.specs/010-quantity-stepper-control/implementation-plan.md`

今回の spec 作業方針を固定する。

- **目的**: code change を広げず、現状監査と検証を主タスクにする
- **内容**: 状態図、データフロー、監査対象ファイル、検証計画、Definition of Done

#### [NEW] `.specs/010-quantity-stepper-control/tasks.md`

作業粒度と完了条件を管理する。

- **目的**: 監査・文書化・検証の順序を明確にする
- **内容**: TODO マッピング、spec artifact 作成、plan review、typecheck/build、手動確認

### 2. 現状実装監査（コード変更なし）

#### `ui-pattern-lab/src/components/ControllerPatternPageContent/index.tsx`

compare page の判断軸と decision flow を担当する既存ファイル。

- `quantity-stepper-control` が decision flow に含まれていることを確認する
- 5 軸の比較説明が「何を切り替えるか」「候補数と粒度」「即時反映」「カテゴリ境界」「主要セマンティクス」を含むことを確認する

#### `ui-pattern-lab/src/data/controllerPatternEntries.ts`

detail metadata の source of truth。

- `summary` が bounded numeric adjustment を説明していること
- `comparisonTip` が progress stepper との違いを明示していること
- `interactionNotes` / `accessibilityNotes` が min / max、disabled、`aria-label`、`aria-live`、long press への配慮を含むこと

#### `ui-pattern-lab/src/components/ControllerPatternDetailContent/index.tsx`

detail page の文脈メモと gallery 接続を担当する。

- `entryId === 'quantity-stepper-control'` の context note が存在すること
- detail page で compare page と controller category への戻り導線があること

#### `ui-pattern-lab/src/components/ControllerPatternGallery/index.tsx`

lightweight demo、design notes、snippet panel を束ねる。

- `QuantityStepperControlDemo` が static mock として increment / decrement の見え方を伝えていること
- `MetadataPanel` が entry data を detail/list の両方で再利用していること
- `SnippetPanel` が CSS / TSX snippet と note を detail page で展開できること

#### `ui-pattern-lab/src/data/controllerPatternSnippets.ts`

quantity stepper の CSS / TSX sample を保持する。

- CSS snippet に stepper / button / value の最小スタイルがあること
- TSX snippet に `MIN_QUANTITY` / `MAX_QUANTITY`、increment / decrement、disabled、`aria-live` が含まれること
- note が「number input の代替ではない」「狭い範囲に限定する」といった役割境界を補っていること

#### `ui-pattern-lab/docs/controller/quantity-stepper-control.mdx` と `ui-pattern-lab/sidebars.ts`

detail route と docs navigation を担う。

- doc wrapper が `ControllerPatternDetailContent entryId="quantity-stepper-control"` を使っていること
- sidebar に detail doc が配線されていること

### 3. 明確にスコープ外とする事項

- quantity stepper の実 UI やコンポーネント API を新設すること
- disabled 理由や validation helper の新しい reference page を追加すること
- long press / key repeat / pointer hold の詳細インタラクションを demo で再現すること
- number input / slider fallback の詳細比較を controller family に追加すること

## 検証計画

### 自動テスト

```bash
cd /workspace/ui-pattern-lab
pnpm typecheck
pnpm build
```

- `typecheck`
  - existing controller family の型整合が崩れていない
  - spec 追加だけで product code に影響がないことを確認する
- `build`
  - docs route と compare page の導線が壊れていない
  - broken links がない

### 手動検証

1. `/patterns/controller-designs`
   - compare page の flow に `quantity-stepper-control` が含まれている
   - quantity stepper が「狭い範囲の数値を安全に増減したい」ケースとして説明されている
2. `/controller/quantity-stepper-control`
   - lightweight demo が表示される
   - design notes に problem / solution / usage / comparison / interaction / accessibility が揃っている
   - CSS / TSX snippet が表示される
3. detail copy
   - progress stepper との違いが明示されている
   - min / max、disabled、`aria-live` が少なくとも metadata または snippet のどちらかで確認できる

## Definition of Done

以下をすべて満たした時点で本作業の完了とする。

- [x] すべてのタスク（`tasks.md`）が完了状態（`- [x]`）になっている
- [x] `.specs/010-quantity-stepper-control/` に hearing / exploration / implementation-plan / tasks が存在する
- [x] `plan-review/` にレビュー記録が存在する
- [x] source TODO の各要求が既存実装のどこで満たされているか説明できる
- [x] `pnpm typecheck` が成功する
- [x] `pnpm build` が成功する
- [x] `/patterns/controller-designs` と `/controller/quantity-stepper-control` の導線が壊れていない
- [x] 今回のスコープでは product code の追加変更が不要であること、または必要な follow-up 判断が `exploration-report.md` などに明示されている
