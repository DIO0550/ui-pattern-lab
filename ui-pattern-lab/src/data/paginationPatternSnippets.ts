import type {
  PaginationPatternId,
  PaginationPatternSnippets,
} from '@site/src/data/paginationPatternTypes';

export const paginationPatternSnippets = {
  'page-numbers': {
    snippetSummary:
      'classic pagination の骨格です。page size control はこの pattern にのみ含め、clamp と helper text を同じ controller 面で扱います。',
    items: [
      {
        id: 'page-numbers-css',
        label: 'CSS',
        language: 'css',
        code: `.paginationShell {
  display: grid;
  gap: 0.85rem;
}

.paginationToolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.summaryText {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.95rem;
}

.pageSizeField {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

.pageSizeSelect {
  min-inline-size: 6rem;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  background: white;
}

.paginationNav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.pageButton {
  min-inline-size: 2.5rem;
  min-block-size: 2.5rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  background: white;
  font: inherit;
}

.pageButton[aria-current='page'] {
  border-color: var(--ifm-color-primary);
  background: var(--ifm-color-primary);
  color: white;
}

.pageButton:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.helperText {
  min-block-size: 1.5rem;
  color: var(--ifm-color-emphasis-700);
  font-size: 0.9rem;
}`,
        note:
          'prev / next、ページ番号、件数要約、表示件数 selector を近接配置し、一覧の閲覧状態を control として認識しやすくします。',
      },
      {
        id: 'page-numbers-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `function clampPage(nextPage: number, maxPages: number): number {
  if (maxPages <= 1) {
    return 1;
  }

  return Math.min(Math.max(nextPage, 1), maxPages);
}

function getVisiblePageNumbers(currentPage: number, maxPages: number): number[] {
  if (maxPages <= 5) {
    return Array.from({length: maxPages}, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, maxPages];
  }

  if (currentPage >= maxPages - 2) {
    return [1, maxPages - 3, maxPages - 2, maxPages - 1, maxPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, maxPages];
}

const [currentPage, setCurrentPage] = useState(6);
const [pageSize, setPageSize] = useState(25);
const totalCount = 250;
const maxPages = Math.max(1, Math.ceil(totalCount / pageSize));
const safePage = clampPage(currentPage, maxPages);
const rangeStart = totalCount === 0 ? 0 : (safePage - 1) * pageSize + 1;
const rangeEnd = totalCount === 0 ? 0 : Math.min(safePage * pageSize, totalCount);

<section className={styles.paginationShell}>
  <div className={styles.paginationToolbar}>
    <p className={styles.summaryText}>{\`\${rangeStart}–\${rangeEnd} / \${totalCount} 件\`}</p>
    <label className={styles.pageSizeField}>
      <span>表示件数</span>
      <select
        className={styles.pageSizeSelect}
        onChange={(event) => {
          const nextPageSize = Number(event.target.value);
          const nextMaxPages = Math.max(1, Math.ceil(totalCount / nextPageSize));
          setPageSize(nextPageSize);
          setCurrentPage((currentValue) => clampPage(currentValue, nextMaxPages));
        }}
        value={pageSize}>
        <option value={10}>10件</option>
        <option value={25}>25件</option>
        <option value={50}>50件</option>
      </select>
    </label>
  </div>

  <nav aria-label="ページネーション" className={styles.paginationNav}>
    <button disabled={safePage === 1} type="button">
      前へ
    </button>
    {getVisiblePageNumbers(safePage, maxPages).map((pageNumber) => (
      <button
        aria-current={safePage === pageNumber ? 'page' : undefined}
        className={styles.pageButton}
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        type="button">
        {pageNumber}
      </button>
    ))}
    <button disabled={safePage === maxPages} type="button">
      次へ
    </button>
  </nav>

  <p aria-live="polite" className={styles.helperText}>
    {safePage !== currentPage
      ? '表示件数の変更にあわせて最終ページへ補正しました。'
      : 'page size control は page-numbers にのみ含めます。'}
  </p>
</section>`,
        note:
          '`aria-current="page"`、page size 変更後の clamp、helper text を揃えます。free-form のページ番号入力と URL 同期は v1 の対象外です。',
      },
    ],
  },
  'load-more': {
    snippetSummary:
      'append 型の追加読込を扱う骨格です。1 回で何件追加するかは実装メモに留め、page size selector は UI に出しません。',
    items: [
      {
        id: 'load-more-css',
        label: 'CSS',
        language: 'css',
        code: `.loadMoreShell {
  display: grid;
  gap: 0.85rem;
}

.resultList {
  display: grid;
  gap: 0.6rem;
}

.resultItem {
  padding: 0.85rem 1rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.85rem;
  background: var(--ifm-card-background-color, var(--ifm-background-surface-color));
}

.footerRow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.loadMoreButton {
  min-block-size: 2.5rem;
  padding: 0.55rem 1rem;
  border: 1px solid var(--ifm-color-primary);
  border-radius: 999px;
  background: white;
  color: var(--ifm-color-primary-dark);
  font: inherit;
  font-weight: 700;
}

.inlineError {
  padding: 0.75rem 0.9rem;
  border: 1px solid #fca5a5;
  border-radius: 0.85rem;
  background: #fff1f2;
  color: #9f1239;
}`,
        note:
          '結果リストは append し続けても、loading / error / end の状態が footer 近くで読み取れるようにします。',
      },
      {
        id: 'load-more-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `type AppendStatus = 'ready' | 'loading' | 'error' | 'end';

const CHUNK_SIZE = 20;
const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
const [status, setStatus] = useState<AppendStatus>('ready');
const totalCount = 60;
const canLoadMore = visibleCount < totalCount;

<section className={styles.loadMoreShell}>
  <ul className={styles.resultList}>
    {items.slice(0, visibleCount).map((item) => (
      <li className={styles.resultItem} key={item.id}>
        {item.title}
      </li>
    ))}
  </ul>

  {status === 'error' ? (
    <div className={styles.inlineError} role="alert">
      読み込みに失敗しました。再試行してください。
    </div>
  ) : null}

  <div className={styles.footerRow}>
    <p>{\`\${visibleCount} / \${totalCount} 件を表示中\`}</p>
    <button
      className={styles.loadMoreButton}
      disabled={status === 'loading' || !canLoadMore}
      onClick={() => {
        setStatus('loading');
      }}
      type="button">
      {status === 'loading' ? '読み込み中...' : canLoadMore ? 'さらに読み込む' : 'すべて表示しました'}
    </button>
  </div>
</section>`,
        note:
          'batch size は内部実装の都合として扱い、user-facing な page size control にはしません。',
      },
    ],
  },
  'infinite-scroll': {
    snippetSummary:
      'contained scroll area の末尾到達で自動追加読込する骨格です。footer 到達性や位置把握の難しさを補助文で明示します。',
    items: [
      {
        id: 'infinite-scroll-css',
        label: 'CSS',
        language: 'css',
        code: `.scrollFrame {
  display: grid;
  gap: 0.75rem;
}

.scrollViewport {
  max-block-size: 18rem;
  overflow: auto;
  padding: 0.75rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1rem;
  background: var(--ifm-card-background-color, var(--ifm-background-surface-color));
}

.sentinel {
  display: flex;
  justify-content: center;
  padding: 0.9rem 0.5rem 0.2rem;
  color: var(--ifm-color-emphasis-700);
  font-size: 0.9rem;
}

.fallbackButton {
  min-block-size: 2.25rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  background: white;
  font: inherit;
}`,
        note:
          '自動読込だけに頼らず、demo では contained scroll area と fallback action を併置して状態差分を確認しやすくします。',
      },
      {
        id: 'infinite-scroll-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `type AppendStatus = 'ready' | 'loading' | 'error' | 'end';

const [visibleCount, setVisibleCount] = useState(18);
const [status, setStatus] = useState<AppendStatus>('ready');
const totalCount = 54;

<section className={styles.scrollFrame}>
  <div className={styles.scrollViewport}>
    <ul className={styles.resultList}>
      {items.slice(0, visibleCount).map((item) => (
        <li className={styles.resultItem} key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>

    <div className={styles.sentinel}>
      {status === 'loading' && '次の結果を読み込み中...'}
      {status === 'error' && '読み込みに失敗しました'}
      {status === 'end' && 'これ以上の結果はありません'}
      {status === 'ready' && '末尾に到達したら次を読み込みます'}
    </div>
  </div>

  <button
    className={styles.fallbackButton}
    onClick={() => {
      setStatus('loading');
    }}
    type="button">
    スクロール終端を再現
  </button>
</section>`,
        note:
          'auto append は便利でも、現在位置の把握・再訪性・footer 到達性で不利になりやすい点を compare / detail の両方で補います。',
      },
    ],
  },
} satisfies Record<PaginationPatternId, PaginationPatternSnippets>;
