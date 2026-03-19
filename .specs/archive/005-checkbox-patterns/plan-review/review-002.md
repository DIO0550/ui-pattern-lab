既存コードと前回のレビュー（review-001.md）を踏まえて確認しました。前回のレビューで `docusaurus.config.ts` の footer を `[KEEP]` → `[MODIFY]` にすべきという指摘がありましたが、**現在の implementation-plan では既に `[MODIFY]` に修正されています**。これは対応済みです。

以下、5つの観点でレビューします。

---

## 実装計画レビュー

### 1. 仕様の曖昧さ・抜け漏れ

**指摘 2件**

- **DocsHomeContent の導線パターンが未確定のまま**。前回レビュー（review-001）でも指摘されていたが、implementation-plan の変更案では「`ellipsisDisplayLinks` と同じ粒度にそろえ」と記載されている（L248）。一方、現行コードを見ると `table` は detail links のみ、`button` は category + detail、`ellipsis-display` は category + overview + detail と3パターンが混在している。「ellipsis-display と同じ粒度」は具体的には **category page + overview page + detail pages の3層リンク** を意味するはずだが、明示的に列挙されていないため実装者が迷う可能性がある。`checkboxLinks` の具体的な構成（何件のリンクが並ぶか）を書き下すべき。

- **`comparisonTip` の文量・粒度の指針がない**。型定義に `comparisonTip?: string` を追加する方針は明記されているが、各 entry でどの程度の分量を書くのか（1文か、2-3段落か、箇条書きか）の指針がない。4 entry すべてに書くのか optional にするのかも曖昧。実装時にコンテンツの質がバラつくリスクがある。

### 2. 実装可能性

**問題なし**。前回レビューと同意見。既存パターンの踏襲であり、新規依存なし、技術的に未知の要素もない。

### 3. エッジケースの考慮

**指摘 2件**

- **`indeterminate` の DOM property 設定が implementation-plan に反映済み**。前回レビューで指摘された点は、`CheckboxPatternGallery` セクション（L171）に「React 側では `ref` callback か effect で反映する」と明記されており、**対応済み**。

- **比較マトリクスが component 内の typed constant で、i18n や将来の外部データ化の考慮がない**。v1 では問題ないが、マトリクスの行数が増えた場合（radio/switch/select が独立カテゴリ化した際）に component が肥大化する。これは v1 スコープ外として許容可能だが、TODO コメントとして残しておく価値がある。

- **entry 数 4 件での gallery パフォーマンスは問題ないが、demo で stateful な checkbox group を描画する場合の初期状態が未定義**。特に `multiple-independent-selection` で何項目のチェックボックスを demo に並べるか、初期状態は全 unchecked か一部 checked かの指定がない。demo の見映えとユーザー理解に直結するため、entry metadata か demo 仕様として定義しておくべき。

### 4. ファイル構成の妥当性

**妥当**。既存パターン（Button 系 7 component + styles）と完全に一致する命名・構成で一貫性がある。

**軽微な指摘 1件**：前回レビューでも触れられているが、カテゴリ追加のたびに 7 component × 2 files = 14 ファイルをコピーする構成は、共通化の余地がある。ただし v1 では既存踏襲が正しい判断。共通化は別チケットで検討する方が安全。

### 5. 全体アーキテクチャとの整合性

**概ね整合、指摘 2件**

- **sidebar の配置順序が未指定**。`sidebars.ts` を見ると現在 テーブル → 省略表示 → ボタン の順。checkbox をどの位置に挿入するかが implementation-plan に書かれていない。最後尾（ボタンの下）に追加するのが自然だが、明示しておくべき。

- **`button/toggle-and-selection` との責務境界の記述がない**。exploration-report のセクション5で「独立カテゴリ vs button 統合の最終判断」が未確定事項として挙がっており、implementation-plan は「独立カテゴリ」を選択した。しかし、`toggle-and-selection` が既にカバーしている「状態切替・単一選択」と checkbox の `single-checkbox-and-indeterminate` の間で内容が重複する可能性がある。相互リンクの方針（checkbox detail から `button/toggle-and-selection` への cross-reference を張るか）が明記されていない。exploration-report の 2.2「generic guidance + 別カテゴリへの補助導線」パターンを使うなら、どの entry からどこへリンクするかを決めておくべき。

---

## 総合評価

前回レビュー（review-001）での**高重要度の指摘（footer の `[MODIFY]` 化）は対応済み**。`indeterminate` の DOM property についても明記済み。

計画の品質は**高い**。以下の対応を推奨します。

| # | 対応事項 | 重要度 |
|---|---------|--------|
| 1 | `checkboxLinks` の具体構成（category + overview + 4 detail = 計6リンク）を明示する | **中** |
| 2 | `comparisonTip` の文量・粒度ガイドラインを追記する | **低** |
| 3 | demo の初期状態（チェックボックスの数・初期 checked 状態）を entry ごとに定義する | **中** |
| 4 | sidebar 内の checkbox カテゴリの挿入位置を明記する | **低** |
| 5 | `button/toggle-and-selection` との相互リンク方針を決定する | **中** |

高重要度の指摘はありません。上記を補足すれば実装着手可能な状態です。
