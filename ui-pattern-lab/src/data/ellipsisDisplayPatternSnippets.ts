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
      '1行の密度を保つため、幅制約と `text-overflow: ellipsis` をセットで使います。',
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

.metaRow {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
}`,
        note:
          '省略表示は幅制約がないと発火しないため、`max-width` などの境界条件を先に決めます。',
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
</article>`,
        note:
          '一覧では 1 行に揃え、全文を読む導線は別面に逃がすと密度と可読性の両方を保ちやすくなります。',
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
      '明示的な開閉ボタンで全文を見せ、`aria-expanded` と `aria-controls` を同期させます。',
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

.disclosurePanel {
  border-top: 1px solid var(--ifm-color-emphasis-300);
  overflow-wrap: anywhere;
  padding-top: 0.75rem;
}`,
        note:
          'tooltip や hover だけでは全文へ到達しにくいため、キーボードとタッチの両方で使える明示的なトリガーを用意します。',
      },
      {
        id: 'accessible-disclosure-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const panelId = 'accessible-disclosure-panel';

<button
  aria-controls={panelId}
  aria-expanded={isOpen}
  className={styles.toggleButton}
  onClick={() => setIsOpen((current) => !current)}
  type="button">
  {isOpen ? '全文を閉じる' : '全文を表示'}
</button>

<div hidden={!isOpen} id={panelId} className={styles.disclosurePanel}>
  レビュー条件や例外パスを含む完全な文面をここに表示します。
</div>`,
        note:
          '展開後もトリガーにフォーカスを残すと、状態変化を確認してから次の移動先を自分で選べます。',
      },
    ],
  },
};
