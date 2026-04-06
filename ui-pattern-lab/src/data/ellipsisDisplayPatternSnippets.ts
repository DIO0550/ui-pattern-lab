import type {
  EllipsisDisplayPatternEntryId,
  EllipsisDisplayPatternSnippets,
} from '@site/src/data/ellipsisDisplayPatternTypes';

type SnippetSetParams = {
  summary: string;
  cssId: string;
  cssCode: string;
  cssNote?: string;
  tsxId: string;
  tsxCode: string;
  tsxNote?: string;
};

function buildSnippetSet(params: SnippetSetParams): EllipsisDisplayPatternSnippets {
  return {
    snippetSummary: params.summary,
    items: [
      {
        id: params.cssId,
        label: 'CSS',
        language: 'css',
        code: params.cssCode,
        note: params.cssNote,
      },
      {
        id: params.tsxId,
        label: 'TSX',
        language: 'tsx',
        code: params.tsxCode,
        note: params.tsxNote,
      },
    ],
  };
}

export const ellipsisDisplayPatternSnippets: Record<
  EllipsisDisplayPatternEntryId,
  EllipsisDisplayPatternSnippets
> = {
  'single-line-ellipsis': buildSnippetSet({
    summary:
      '1 行系の表示制限では、幅制約の置き方だけを変えながら全文導線を別面へ逃がし、一覧密度を一定に保ちます。',
    cssId: 'single-line-ellipsis-css',
    cssCode: `.titleLine {
  max-width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.titleRow {
  align-items: baseline;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto minmax(0, 1fr);
}

.fluidTitleLine {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metaRow {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
}`,
    cssNote:
      '固定幅だけでなく、grid / flex 子要素では `min-width: 0` や `minmax(0, 1fr)` を入れないと ellipsis が効かないことがあります。',
    tsxId: 'single-line-ellipsis-tsx',
    tsxCode: `<article className={styles.card}>
  <span className={styles.label}>通知タイトル</span>
  <p className={styles.titleLine}>
    支払い条件の更新に伴う請求タイミング調整のご案内
  </p>
  <p className={styles.metaRow}>詳細画面で全文を確認</p>
</article>

<div className={styles.resizableFrame}>
  <article className={styles.card}>
    <span className={styles.label}>可変幅の行</span>
    <div className={styles.titleRow}>
      <span>件名</span>
      <p className={styles.fluidTitleLine}>
        横幅が変わる分割ビューでも、契約更新の案内文を 1 行のまま保ちながら省略位置を追従させます。
      </p>
    </div>
    <p className={styles.metaRow}>ドラッグで横幅を変えると省略位置も追従</p>
  </article>
</div>`,
    tsxNote:
      'compare card では行動の要点だけを見せ、detail では visual variation ごとの CSS / TSX を分けて確認します。',
  }),
  'multi-line-clamp': buildSnippetSet({
    summary:
      '複数行の表示制限では、2〜3 行の文脈を残しながら一覧比較しやすい高さへそろえることを優先します。',
    cssId: 'multi-line-clamp-css',
    cssCode: `.summaryClamp {
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.summaryFallback {
  overflow-wrap: anywhere;
}`,
    cssNote:
      '`-webkit-line-clamp` は vendor-prefixed な見せ方です。非対応環境でも読める fallback と全文導線を別に用意します。',
    tsxId: 'multi-line-clamp-tsx',
    tsxCode: `<article className={styles.card}>
  <h3>公開メモ</h3>
  <p className={styles.summaryClamp}>
    北陸エリア向けの公開準備は、承認フローと FAQ 更新を先に完了してから、
    INV-2026-Q1-SUPER-LONG-CUSTOMER-REFERENCE-AAAAAAAAAAAAAAAA を確認します。
  </p>
  <Link to="/ellipsis-display/multi-line-clamp">全文と注意点を見る</Link>
</article>`,
    tsxNote:
      '長大 token を含む card 一覧でも、詳細ページでは見た目 variation ごとの調整方法を切り分けて確認できます。',
  }),
  'full-text-supplement': buildSnippetSet({
    summary:
      '全文補足では、要約と全文の距離を近く保ちながら、hover 依存にしない情報到達性を確保します。',
    cssId: 'full-text-supplement-css',
    cssCode: `.summaryPreview {
  max-width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fullTextSupplement {
  border-inline-start: 3px solid var(--ifm-color-primary);
  overflow-wrap: anywhere;
  padding-inline-start: 0.75rem;
}`,
    cssNote:
      '一覧密度を保つ面と全文面を近接配置し、ツールチップのような一時表示に閉じ込めない構成にします。',
    tsxId: 'full-text-supplement-tsx',
    tsxCode: `<div className={styles.summaryRow}>
  <p className={styles.summaryPreview}>
    契約更新の案内文は要約だけ先に表示し、詳細はすぐ下で補足します。
  </p>
  <p className={styles.fullTextSupplement}>
    契約更新の案内文は要約だけ先に表示しつつ、例外条件や担当窓口を含む完全な文面も
    同じカード内で参照できるようにします。
  </p>
</div>`,
    tsxNote:
      '全文補足の detail では、要約下・横並び panel など視線移動の違いを variation ごとに確認できます。',
  }),
  'accessible-disclosure': buildSnippetSet({
    summary:
      'アクセシブルな開閉では、要約と全文を明示的なトリガーで切り替え、状態表示も同時に更新します。',
    cssId: 'accessible-disclosure-css',
    cssCode: `.toggleButton {
  align-items: center;
  border: 1px solid var(--ifm-color-primary);
  border-radius: 999px;
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
}

.statusText {
  color: var(--ifm-color-emphasis-700);
  margin: 0;
}

.disclosurePanel {
  border-top: 1px solid var(--ifm-color-emphasis-300);
  overflow-wrap: anywhere;
  padding-top: 0.75rem;
}`,
    cssNote:
      'tooltip や hover だけでは全文へ到達しにくいため、キーボードとタッチの両方で使える明示トリガーを用意します。',
    tsxId: 'accessible-disclosure-tsx',
    tsxCode: `const panelId = 'accessible-disclosure-panel';
const statusId = 'accessible-disclosure-status';

<button
  aria-controls={panelId}
  aria-describedby={statusId}
  aria-expanded={isOpen}
  className={styles.toggleButton}
  onClick={() => setIsOpen((current) => !current)}
  type="button">
  {isOpen ? '全文を閉じる' : '全文を表示'}
</button>

<p aria-live="polite" id={statusId} className={styles.statusText}>
  {isOpen ? '現在: 全文を表示中です。' : '現在: 要約のみを表示しています。'}
</p>

<div hidden={!isOpen} id={panelId} className={styles.disclosurePanel}>
  レビュー条件や例外パスを含む完全な文面をここに表示します。
</div>`,
    tsxNote:
      'detail では pill 型 trigger などの visual variation を追加しても、`aria-expanded` と補助テキストの同期は維持します。',
  }),
};

export const ellipsisDisplayVisualVariantSnippets: Record<
  EllipsisDisplayPatternEntryId,
  Record<string, EllipsisDisplayPatternSnippets>
> = {
  'single-line-ellipsis': {
    'single-line-notification-title': buildSnippetSet({
      summary: '通知一覧で最も基本的な 1 行省略です。',
      cssId: 'single-line-notification-title-css',
      cssCode: `.titleValue {
  margin: 0;
  max-width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
      tsxId: 'single-line-notification-title-tsx',
      tsxCode: `<article className={styles.singleLineCard}>
  <span className={styles.singleLineLabel}>通知タイトル</span>
  <p className={styles.titleValue}>
    支払い条件の更新に伴う請求タイミング調整のご案内
  </p>
  <p className={styles.singleLineMeta}>詳細画面で全文を確認</p>
</article>`,
    }),
    'single-line-project-name': buildSnippetSet({
      summary: 'カード見出しを 1 行へそろえる project 名の例です。',
      cssId: 'single-line-project-name-css',
      cssCode: `.projectValue {
  margin: 0;
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
      tsxId: 'single-line-project-name-tsx',
      tsxCode: `<article className={styles.singleLineCard}>
  <span className={styles.singleLineLabel}>プロジェクト名</span>
  <p className={styles.projectValue}>
    北陸エリア向けオンボーディング手順と FAQ 再編のドラフト
  </p>
  <p className={styles.singleLineMeta}>一覧では 1 行に統一</p>
</article>`,
    }),
    'single-line-shared-link': buildSnippetSet({
      summary: '長い英数字を含む共有リンクでも折り返さずに扱う例です。',
      cssId: 'single-line-shared-link-css',
      cssCode: `.linkValue {
  font-family: var(--ifm-font-family-monospace);
  margin: 0;
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
      tsxId: 'single-line-shared-link-tsx',
      tsxCode: `<article className={styles.singleLineCard}>
  <span className={styles.singleLineLabel}>共有リンク</span>
  <p className={styles.linkValue}>
    release-note-approval-and-customer-handoff-plan-v2026-final
  </p>
  <p className={styles.singleLineMeta}>長い英数字も折り返さず省略</p>
</article>`,
    }),
    'single-line-fixed-label-row': buildSnippetSet({
      summary: 'ラベル列と値列を 2 カラムで固定する基本形です。',
      cssId: 'single-line-fixed-label-row-css',
      cssCode: `.titleRow {
  align-items: baseline;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto minmax(0, 1fr);
}

.titleRowValue {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
      tsxId: 'single-line-fixed-label-row-tsx',
      tsxCode: `<article className={styles.singleLineCard}>
  <span className={styles.singleLineLabel}>固定幅ラベル列</span>
  <div className={styles.titleRow}>
    <span className={styles.responsiveLinePrefix}>件名</span>
    <p className={styles.titleRowValue}>
      共有前の確認事項を含む案内文を 1 行にそろえて表示します。
    </p>
  </div>
  <p className={styles.singleLineMeta}>ラベル幅を固定して情報密度を保つ</p>
</article>`,
    }),
    'single-line-responsive-panel': buildSnippetSet({
      summary: 'リサイズする panel でも 1 行省略を保つ可変幅対応です。',
      cssId: 'single-line-responsive-panel-css',
      cssCode: `.resizableFrame {
  max-width: 30rem;
  min-width: 14rem;
  overflow: auto;
  resize: horizontal;
}

.responsiveLineValue {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
      tsxId: 'single-line-responsive-panel-tsx',
      tsxCode: `<div className={styles.resizableFrame}>
  <article className={styles.singleLineCard}>
    <span className={styles.singleLineLabel}>可変幅の行</span>
    <div className={styles.responsiveLineRow}>
      <span className={styles.responsiveLinePrefix}>件名</span>
      <p className={styles.responsiveLineValue}>
        横幅が変わる分割ビューでも、契約更新の案内文を 1 行のまま保ちながら省略位置を追従させます。
      </p>
    </div>
    <p className={styles.singleLineMeta}>ドラッグで横幅を変えると省略位置も追従</p>
  </article>
</div>`,
    }),
    'gradient-fade-label-row': buildSnippetSet({
      summary: 'フェードマスクで切れ感を柔らかく見せる 1 行ラベル列です。',
      cssId: 'gradient-fade-label-row-css',
      cssCode: `.fadeRow {
  align-items: center;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto minmax(0, 1fr) auto;
}

.fadeValue {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  -webkit-mask-image: linear-gradient(to right, #000 82%, transparent);
  mask-image: linear-gradient(to right, #000 82%, transparent);
}`,
      cssNote: '省略記号を主張しすぎず、ラベル列や補助メタを残したまま柔らかく切れ感を出せます。',
      tsxId: 'gradient-fade-label-row-tsx',
      tsxCode: `<article className={styles.singleLineCard}>
  <div className={styles.fadeRow}>
    <span className={styles.singleLineLabel}>依頼内容</span>
    <p className={styles.fadeValue}>
      監査ログの公開範囲と通知文面の確定版を一覧内で確認するための調整メモ
    </p>
    <span className={styles.gradientMeta}>確認待ち</span>
  </div>
  <p className={styles.singleLineMeta}>フェードで視線を止めすぎずに切れ感を見せる</p>
</article>`,
    }),
    'meta-chip-truncation': buildSnippetSet({
      summary: '右端の chip を固定し、中央テキストだけを 1 行省略する例です。',
      cssId: 'meta-chip-truncation-css',
      cssCode: `.chipRow {
  align-items: center;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: minmax(0, 1fr) auto;
}

.chipValue {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chip {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
}`,
      tsxId: 'meta-chip-truncation-tsx',
      tsxCode: `<article className={styles.singleLineCard}>
  <span className={styles.singleLineLabel}>レビュー対象</span>
  <div className={styles.chipRow}>
    <p className={styles.chipValue}>
      契約更新の例外条件と窓口一覧をまとめた社内共有文面
    </p>
    <span className={styles.chip}>要確認</span>
  </div>
  <p className={styles.singleLineMeta}>補助 chip を固定しても一覧の行高は変えない</p>
</article>`,
    }),
  },
  'multi-line-clamp': {
    'multi-line-short-summary': buildSnippetSet({
      summary: '短文要約を 3 行基準にそろえる基本形です。',
      cssId: 'multi-line-short-summary-css',
      cssCode: `.summaryClamp {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}`,
      tsxId: 'multi-line-short-summary-tsx',
      tsxCode: `<article className={styles.clampCard}>
  <h4 className={styles.clampTitle}>短文の要約</h4>
  <p className={styles.clampSummary}>
    公開準備の前に承認と FAQ 更新を済ませ、短い要約だけ先に比較したいケースです。
  </p>
</article>`,
    }),
    'multi-line-long-token': buildSnippetSet({
      summary: '長大 token を含む要約でも clamp と wrap を併用する例です。',
      cssId: 'multi-line-long-token-css',
      cssCode: `.summaryClamp {
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}`,
      tsxId: 'multi-line-long-token-tsx',
      tsxCode: `<article className={styles.clampCard}>
  <h4 className={styles.clampTitle}>長大 token</h4>
  <p className={styles.clampSummary}>
    公開メモでは INV-2026-Q1-SUPER-LONG-CUSTOMER-REFERENCE-AAAAAAAAAAAAAAAA を含む補足も読みたいものの、
    一覧では 3 行に抑えて比較したいケースです。
  </p>
</article>`,
    }),
    'multi-line-multilingual': buildSnippetSet({
      summary: '多言語混在でも 3 行クランプで高さ差を抑える例です。',
      cssId: 'multi-line-multilingual-css',
      cssCode: `.summaryClamp {
  display: -webkit-box;
  line-height: 1.6;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}`,
      tsxId: 'multi-line-multilingual-tsx',
      tsxCode: `<article className={styles.clampCard}>
  <h4 className={styles.clampTitle}>多言語混在</h4>
  <p className={styles.clampSummary}>
    日本語の説明を中心にしつつ English release note と API status memo を同じ card で扱い、密度を保ったまま比較したいケースです。
  </p>
</article>`,
    }),
    'soft-card-clamp': buildSnippetSet({
      summary: '淡い surface の card 上で 3 行 clamp を見せる variation です。',
      cssId: 'soft-card-clamp-css',
      cssCode: `.softClampCard {
  background: color-mix(in srgb, var(--ifm-color-primary) 5%, var(--ifm-background-surface-color));
  border-radius: 1rem;
  padding: 1rem;
}

.softClampSummary {
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}`,
      tsxId: 'soft-card-clamp-tsx',
      tsxCode: `<article className={styles.softClampCard}>
  <span className={styles.gradientMeta}>公開予定</span>
  <h4 className={styles.clampTitle}>soft card clamp</h4>
  <p className={styles.softClampSummary}>
    リリースノートの補足文を柔らかい面の中にまとめ、一覧の高さ差を抑えながら 3 行分の文脈を残します。
  </p>
</article>`,
    }),
    'dense-list-clamp': buildSnippetSet({
      summary: '高密度 list row で 2〜3 行の文脈だけを残す variation です。',
      cssId: 'dense-list-clamp-css',
      cssCode: `.denseList {
  display: grid;
  gap: 0.5rem;
}

.denseRowSummary {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}`,
      tsxId: 'dense-list-clamp-tsx',
      tsxCode: `<div className={styles.denseList}>
  <article className={styles.denseRow}>
    <strong>運用メモ</strong>
    <p className={styles.denseRowSummary}>
      FAQ 更新前に対象顧客と例外連絡先だけ先に把握したいので、本文は 2 行だけ残して比較します。
    </p>
  </article>
</div>`,
    }),
  },
  'full-text-supplement': {
    'full-text-contract-guide': buildSnippetSet({
      summary: '要約の下に全文補足を近接配置する基本形です。',
      cssId: 'full-text-contract-guide-css',
      cssCode: `.summaryPreview {
  margin: 0;
  max-width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fullTextSupplement {
  border-top: 1px solid var(--ifm-color-emphasis-300);
  padding-top: 0.75rem;
}`,
      tsxId: 'full-text-contract-guide-tsx',
      tsxCode: `<article className={styles.supplementCard}>
  <h4 className={styles.supplementTitle}>契約更新案内</h4>
  <p className={styles.summaryPreview}>
    契約更新の案内文は要約だけ先に表示し、完全な文面は同じ card 内で補足します。
  </p>
  <div className={styles.fullTextSupplement}>
    <span className={styles.supplementLabel}>全文補足</span>
    <p className={styles.supplementText}>
      例外条件、担当窓口、切り戻しの連絡先を含む完全な文面も同じ card 内で参照できます。
    </p>
  </div>
</article>`,
    }),
    'full-text-review-memo': buildSnippetSet({
      summary: 'レビュー待ちメモを要約と補足面へ分ける例です。',
      cssId: 'full-text-review-memo-css',
      cssCode: `.supplementCard {
  display: grid;
  gap: 0.75rem;
}

.supplementText {
  margin: 0;
  overflow-wrap: anywhere;
}`,
      tsxId: 'full-text-review-memo-tsx',
      tsxCode: `<article className={styles.supplementCard}>
  <h4 className={styles.supplementTitle}>審査メモ</h4>
  <p className={styles.summaryPreview}>
    レビュー待ちのメモは短い要約で一覧比較し、必要な詳細だけ近接した補足面で読みます。
  </p>
  <div className={styles.fullTextSupplement}>
    <span className={styles.supplementLabel}>全文補足</span>
    <p className={styles.supplementText}>
      判定理由や例外手順のように省略できない情報だけを、同じ card の下部へ展開します。
    </p>
  </div>
</article>`,
    }),
    'inline-note-panel': buildSnippetSet({
      summary: '要約面と全文面を横並び panel にして視線移動を短くする variation です。',
      cssId: 'inline-note-panel-css',
      cssCode: `.notePanels {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.notePanel {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.85rem;
  padding: 0.85rem;
}`,
      tsxId: 'inline-note-panel-tsx',
      tsxCode: `<div className={styles.notePanels}>
  <article className={styles.notePanel}>
    <span className={styles.supplementLabel}>要約</span>
    <p className={styles.supplementText}>
      承認フローの要点だけを先に見せ、全文は隣の note panel に分けて表示します。
    </p>
  </article>
  <article className={styles.notePanel}>
    <span className={styles.supplementLabel}>全文補足</span>
    <p className={styles.supplementText}>
      例外条件、担当者、切り戻し手順、連絡先まで含む全文を近接 panel で確認できます。
    </p>
  </article>
</div>`,
    }),
  },
  'accessible-disclosure': {
    'pill-toggle-disclosure': buildSnippetSet({
      summary: 'pill 状トリガーと状態表示を合わせた開閉 variation です。',
      cssId: 'pill-toggle-disclosure-css',
      cssCode: `.pillToggle {
  align-items: center;
  border: 1px solid var(--ifm-color-primary);
  border-radius: 999px;
  display: inline-flex;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
}

.pillStatus {
  border-radius: 999px;
  font-size: 0.75rem;
  padding: 0.2rem 0.55rem;
}`,
      tsxId: 'pill-toggle-disclosure-tsx',
      tsxCode: `const panelId = 'pill-toggle-panel';
const statusId = 'pill-toggle-status';

<button
  aria-controls={panelId}
  aria-describedby={statusId}
  aria-expanded={isOpen}
  className={styles.pillToggle}
  onClick={() => setIsOpen((current) => !current)}
  type="button">
  <span>{isOpen ? '全文を閉じる' : '全文を表示'}</span>
  <span aria-hidden="true">▾</span>
</button>

<p aria-live="polite" id={statusId} className={styles.statusText}>
  {isOpen ? '現在: 全文を表示中です。' : '現在: 要約のみを表示しています。'}
</p>

<div hidden={!isOpen} id={panelId} className={styles.disclosurePanel}>
  レビュー条件や例外パスを含む完全な文面をここに表示します。
</div>`,
    }),
  },
};

export function getEllipsisDisplayVisualVariantSnippets(
  entryId: EllipsisDisplayPatternEntryId,
  variantId: string,
): EllipsisDisplayPatternSnippets {
  const snippets = ellipsisDisplayVisualVariantSnippets[entryId][variantId];

  if (!snippets) {
    throw new Error(`Unknown visual variant snippets: ${entryId}/${variantId}`);
  }

  return snippets;
}
