import type {
  TablePatternEntryId,
  TablePatternSnippets,
} from '@site/src/data/tablePatternTypes';

export const tablePatternSnippets: Record<
  TablePatternEntryId,
  TablePatternSnippets
> = {
  'responsive-stack': {
    snippetSummary: '広い表とモバイルの積み上げカードを同じデータで見せ分けます。',
    items: [
      {
        id: 'responsive-stack-css',
        label: 'CSS',
        language: 'css',
        code: `.previewSplit {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
}

.mobileCardList {
  display: grid;
  gap: 0.5rem;
}

.mobileCardMeta div {
  display: grid;
  gap: 0.35rem;
  grid-template-columns: 5rem 1fr;
}`,
        note: 'カード側でも項目ラベルを残すと、列見出しを失っても文脈を保ちやすくなります。',
      },
      {
        id: 'responsive-stack-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div className={styles.previewSplit}>
  <section className={styles.previewPanel}>
    <table className={styles.demoTable}>
      <tbody>{rows.map((row) => <DesktopRow key={row.plan} row={row} />)}</tbody>
    </table>
  </section>

  <section className={styles.previewPanel}>
    <div className={styles.mobileCardList}>
      {rows.map((row) => (
        <article key={row.plan} className={styles.mobileCard}>
          <strong className={styles.mobileCardTitle}>{row.plan}</strong>
          <dl className={styles.mobileCardMeta}>
            <div><dt>担当</dt><dd>{row.owner}</dd></div>
            <div><dt>進捗</dt><dd>{row.status}</dd></div>
            <div><dt>更新</dt><dd>{row.updated}</dd></div>
          </dl>
        </article>
      ))}
    </div>
  </section>
</div>`,
        note: '一覧比較より 1 件ずつの理解を優先したい場面では、同じデータをカードへ積み替える構造が中心になります。',
      },
    ],
  },
  'horizontal-scroll': {
    snippetSummary: '列を削らずに比較性を保つため、表全体を横スクロール領域へ収めます。',
    items: [
      {
        id: 'horizontal-scroll-css',
        label: 'CSS',
        language: 'css',
        code: `.horizontalScrollViewport {
  max-width: 22.5rem;
  overflow-x: auto;
  overscroll-behavior: contain;
  touch-action: pan-x;
}

.wideDemoTable {
  min-width: 34rem;
}`,
        note: '重要なのはコンテナ側の横スクロール許可と、表側の最小幅確保です。',
      },
      {
        id: 'horizontal-scroll-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div className={styles.scrollHintRow}>
  <span className={styles.previewLabel}>横スクロール</span>
  <span className={styles.scrollHintText}>横にスクロールして列を表示</span>
</div>

<div
  aria-label="横スクロール可能な表"
  className={styles.horizontalScrollViewport}
  tabIndex={0}>
  <table className={clsx(styles.demoTable, styles.wideDemoTable)}>
    <thead>
      <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
    </thead>
    <tbody>{rows.map((row) => <HorizontalRow key={row.id} row={row} />)}</tbody>
  </table>
</div>`,
        note: 'スクロール領域はキーボードで到達できるようにし、比較対象の列は減らさない構成を保ちます。',
      },
    ],
  },
  'sticky-header': {
    snippetSummary: '長い一覧の中でも列の意味を追えるよう、ヘッダーを領域内で固定します。',
    items: [
      {
        id: 'sticky-header-css',
        label: 'CSS',
        language: 'css',
        code: `.stickyScrollArea {
  max-height: 15rem;
  overflow: auto;
  overscroll-behavior: contain;
}

.stickyHead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--gallery-surface);
}`,
        note: 'ページ全体ではなくローカルなスクロール領域に sticky を閉じ込めると扱いやすくなります。',
      },
      {
        id: 'sticky-header-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div
  aria-label="固定ヘッダーの表"
  className={styles.stickyScrollArea}
  tabIndex={0}>
  <table className={styles.demoTable}>
    <thead className={styles.stickyHead}>
      <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
    </thead>
    <tbody>{rows.map((row) => <StickyRow key={row.id} row={row} />)}</tbody>
  </table>
</div>`,
        note: 'ヘッダー行に専用 class を分けると、背景色や z-index を局所的に調整しやすくなります。',
      },
    ],
  },
  'cell-truncation': {
    snippetSummary: 'セルは 1 行でそろえつつ、全文は近接した別領域で補足します。',
    items: [
      {
        id: 'cell-truncation-css',
        label: 'CSS',
        language: 'css',
        code: `.truncatedCell {
  max-width: 14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fullValueList {
  display: grid;
  gap: 0.4rem;
}`,
        note: '省略表示だけで終わらせず、完全な値を読める場所を近くに置くのがポイントです。',
      },
      {
        id: 'cell-truncation-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<table className={styles.demoTable}>
  <tbody>
    {rows.map((row) => (
      <tr key={row.field}>
        <td>{row.field}</td>
        <td>{row.priority}</td>
        <td>{row.owner}</td>
        <td className={styles.truncatedCell}>{row.note}</td>
      </tr>
    ))}
  </tbody>
</table>

<div className={styles.fullValueList}>
  {rows.map((row) => (
    <p key={row.field}>
      <strong>{row.field}:</strong> {row.note}
    </p>
  ))}
</div>`,
        note: '一覧の高さは一定に保ち、補足エリアで全文を確認できるようにします。',
      },
    ],
  },
};
