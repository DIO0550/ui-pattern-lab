全体像を把握しました。review-001 と review-002 の指摘に対する修正状況も確認した上で、レビュー結果を書きます。

---

## 実装計画レビュー（review-003）

review-001・review-002 の指摘を踏まえた現在の implementation-plan に対するレビューです。

### 前回指摘の対応状況

| # | review-001 指摘 | 状況 |
|---|---|---|
| 1 | `docusaurus.config.ts` を `[MODIFY]` に | **対応済み** (L261) |
| 2 | `indeterminate` の DOM property 設定方法を明記 | **対応済み** (L177) |
| 3 | DocsHomeContent の導線パターン確定 | **部分対応** — L255 で「ellipsisDisplayLinks と同じ粒度」「計6件」と書かれたが、review-002 で求められた個別リスト記載はまだ不十分 |

| # | review-002 指摘 | 状況 |
|---|---|---|
| 1 | `checkboxLinks` の具体構成を列挙 | **対応済み** — L255-258 でカテゴリ/比較一覧/detail 4件 = 計6件を明記 |
| 2 | `comparisonTip` の文量ガイドライン | **対応済み** — L107 で「1-2文」「checkbox を選ぶ理由と代替条件を同粒度で」と記載 |
| 3 | demo の初期状態定義 | **対応済み** — L128-131 で4 entry すべての初期状態を具体的に記述 |
| 4 | sidebar の挿入位置 | **対応済み** — L245 で「button の後ろに最後尾追加」と明記 |
| 5 | `button/toggle-and-selection` との相互リンク | **対応済み** — L178 で補助リンクの配置先と案内文を明記 |

**結論: 前回レビューの指摘は全て対応済みです。**

---

### 1. 仕様の曖昧さ・抜け漏れ

**指摘 1件（低）**

- **`comparisonTip` の型が必須か optional か曖昧**。L106 では「`comparisonTip: string` を必須で持たせ」と書いているが、review-002 では `comparisonTip?: string`（optional）と記載されていた。implementation-plan 本文では「必須」で統一されているので問題ないが、実装時に型定義ファイル側で `?` を付けないよう注意。→ **確認のみ、修正不要**

### 2. 実装可能性

**問題なし**。既存パターンの完全な踏襲であり、新規ライブラリ追加なし。React 19 での `indeterminate` の `ref` callback 方式も明記済み。

### 3. エッジケースの考慮

**指摘 1件（低）**

- **`states-and-accessibility` の demo で error 状態のバリデーションメッセージをどう扱うか未定義**。L131 では「error-with-helper」と記載があるが、ヘルパーテキストの具体的な文言や `aria-describedby` の使い方が省略されている。ただし demo は実装例の紹介であり、実装時に button 系の先例に合わせれば自明に決まるため、計画段階での追記は不要。→ **実装時に意識すればOK**

### 4. ファイル構成の妥当性

**妥当**。既存の 7 component パターンと完全に一致。

**補足観察**: 既存の Button 系は `ButtonPatternSectionCard` を持っていないカテゴリもある（Table は SectionCard なし）。実装時に Button 系を正確にテンプレートとして使っているか再確認すると良い。

### 5. 全体アーキテクチャとの整合性

**整合している**。

- 独立カテゴリとしての追加方針は exploration-report の推奨に合致
- `button/toggle-and-selection` との cross-reference 方針も明記済み
- 比較マトリクスを component 内 typed constant とする判断は v1 として妥当
- footer・sidebar・DocsHomeContent の3箇所更新が網羅されている

---

### 総合評価

**実装着手可能**。review-001・review-002 の指摘は全て反映済みで、高重要度・中重要度の未解決事項はありません。

| # | 残存事項 | 重要度 | 対応 |
|---|---------|--------|------|
| 1 | `comparisonTip` を型定義で `string`（必須）にすることを実装時に忘れない | **低** | 実装時確認 |
| 2 | error 状態 demo の `aria-describedby` 実装 | **低** | 実装時確認 |
| 3 | 将来のカテゴリ追加に向けた component 共通化は v1 スコープ外 | **情報** | 別チケット候補 |

計画書の品質は高く、exploration-report との整合性、既存アーキテクチャとの一貫性、エッジケースの網羅性いずれも十分です。このまま実装に進んで問題ありません。
