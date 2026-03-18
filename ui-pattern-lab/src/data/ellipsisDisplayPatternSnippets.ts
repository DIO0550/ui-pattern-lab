import type {
  EllipsisDisplayPatternEntryId,
  EllipsisDisplayPatternSnippets,
} from '@site/src/data/ellipsisDisplayPatternTypes';

export const ellipsisDisplayPatternSnippets: Record<
  EllipsisDisplayPatternEntryId,
  EllipsisDisplayPatternSnippets
> = {
  'single-line-ellipsis': {
    snippetSummary:
      '固定幅では `max-width: 16rem`、可変幅では `minmax(0, 1fr)` と `min-width: 0` を使って1行省略を保ちます。',
    items: [
      {
        id: 'single-line-ellipsis-css',
        label: 'CSS',
        language: 'css',
        code: `.titleLine {
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
        note:
          '固定幅だけでなく、flex / grid 子要素では `min-width: 0` や `minmax(0, 1fr)` を入れないと可変幅で ellipsis が効かないことがあります。',
      },
      {
        id: 'single-line-ellipsis-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<article className={styles.card}>
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
        横幅が変わる分割ビューでも、契約更新の案内文を1行のまま保ちながら省略位置を追従させます。
      </p>
    </div>
    <p className={styles.metaRow}>ドラッグで横幅を変えると省略位置も追従</p>
  </article>
</div>`,
        note:
          '一覧では 1 行に揃えつつ、固定幅だけでなくリサイズするレイアウトでも省略位置を追従させると実運用に近いパターンになります。',
      },
    ],
  },
  'multi-line-clamp': {
    snippetSummary:
      '複数行要約では `-webkit-line-clamp: 3` を基準にし、長大 token には `overflow-wrap: anywhere` を加えます。',
    items: [
      {
        id: 'multi-line-clamp-css',
        label: 'CSS',
        language: 'css',
        code: `.summaryClamp {
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.summaryFallback {
  overflow-wrap: anywhere;
}`,
        note:
          '`-webkit-line-clamp` は vendor-prefixed な見せ方です。非対応環境でも読める fallback と全文導線を別に用意します。',
      },
      {
        id: 'multi-line-clamp-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<article className={styles.card}>
  <h3>公開メモ</h3>
  <p className={styles.summaryClamp}>
    北陸エリア向けの公開準備は、承認フローとFAQ更新を先に完了してから、
    INV-2026-Q1-SUPER-LONG-CUSTOMER-REFERENCE-AAAAAAAAAAAAAAAA を確認します。
  </p>
  <Link to="/ellipsis-display/multi-line-clamp">全文と注意点を見る</Link>
</article>`,
        note:
          '長大 token は clamp 面でもレイアウトを押し広げるため、`overflow-wrap: anywhere` を併用します。',
      },
    ],
  },
  'full-text-supplement': {
    snippetSummary:
      '要約の近くに全文補足を置き、一覧密度を保ったまま完全な文面を参照できるようにします。',
    items: [
      {
        id: 'full-text-supplement-css',
        label: 'CSS',
        language: 'css',
        code: `.summaryPreview {
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
        note:
          'hover 依存ではなく、近接した補足面を常時表示するとキーボードとタッチでも全文へ到達できます。',
      },
      {
        id: 'full-text-supplement-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div className={styles.summaryRow}>
  <p className={styles.summaryPreview}>
    契約更新の案内文は要約だけ先に表示し、詳細はすぐ下で補足します。
  </p>
  <p className={styles.fullTextSupplement}>
    契約更新の案内文は要約だけ先に表示しつつ、例外条件や担当窓口を含む完全な文面も
    同じカード内で参照できるようにします。
  </p>
</div>`,
        note:
          '省略側と全文側を近くに置くと、一覧密度を崩さずに「重要な全文」も見失いにくくなります。',
      },
    ],
  },
  'accessible-disclosure': {
    snippetSummary:
      '明示的な開閉ボタンで全文を見せ、`aria-expanded` / `aria-controls` / 補助テキストを同期させます。',
    items: [
      {
        id: 'accessible-disclosure-css',
        label: 'CSS',
        language: 'css',
        code: `.toggleButton {
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
        note:
          'tooltip や hover だけでは全文へ到達しにくいため、キーボードとタッチの両方で使えるトリガーに加えて、状態が見える補助テキストも置きます。',
      },
      {
        id: 'accessible-disclosure-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const panelId = 'accessible-disclosure-panel';
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
        note:
          '展開後もトリガーにフォーカスを残しつつ、ラベル・補助テキスト・パネル表示を同時に変えると状態変化が視覚的にも伝わりやすくなります。',
      },
    ],
  },
};
