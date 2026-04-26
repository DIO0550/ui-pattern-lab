import type {ReactNode} from 'react';
import clsx from 'clsx';
import type {PaginationPreviewState} from '@site/src/data/paginationPatternTypes';

import styles from './styles.module.css';

type ContextId = 'search' | 'table' | 'admin-list';

type Props = {
  density: 'list' | 'detail';
  context: ContextId;
  previewState?: PaginationPreviewState;
};

type ContextConfig = {
  title: string;
  summary: string;
  totalCount: number;
  pageSizeOptions: readonly number[];
  defaultPageSize: number;
};

type DemoState = {
  id: PaginationPreviewState;
  label: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  helperText?: string;
};

const contextById = {
  search: {
    title: 'search result',
    summary: '検索結果一覧の下に page numbers と page size control を置く例です。',
    totalCount: 250,
    pageSizeOptions: [10, 25, 50],
    defaultPageSize: 25,
  },
  table: {
    title: 'table',
    summary: 'table footer に現在位置と件数要約を近接配置する例です。',
    totalCount: 300,
    pageSizeOptions: [20, 50, 100],
    defaultPageSize: 50,
  },
  'admin-list': {
    title: 'admin list',
    summary: '管理一覧で status 列と page size control を並べる例です。',
    totalCount: 180,
    pageSizeOptions: [10, 25],
    defaultPageSize: 25,
  },
} as const satisfies Record<ContextId, ContextConfig>;

function clampPage(nextPage: number, maxPages: number): number {
  if (maxPages <= 1) {
    return 1;
  }

  return Math.min(Math.max(nextPage, 1), maxPages);
}

function getMaxPages(totalCount: number, pageSize: number): number {
  if (totalCount <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(totalCount / pageSize));
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

function getRangeSummary({
  currentPage,
  pageSize,
  totalCount,
}: {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}): string {
  if (totalCount === 0) {
    return '0 / 0 件';
  }

  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalCount);

  return `${rangeStart}–${rangeEnd} / ${totalCount} 件`;
}

function buildStates(config: ContextConfig): DemoState[] {
  const defaultPageSize = config.defaultPageSize;
  const maxPages = getMaxPages(config.totalCount, defaultPageSize);
  const nextPageSize = config.pageSizeOptions[config.pageSizeOptions.length - 1] ?? defaultPageSize;
  const nextMaxPages = getMaxPages(config.totalCount, nextPageSize);
  const previousPageBeforeClamp = maxPages;
  const clampedPage = clampPage(previousPageBeforeClamp, nextMaxPages);

  return [
    {
      id: 'first-page',
      label: 'first',
      totalCount: config.totalCount,
      currentPage: 1,
      pageSize: defaultPageSize,
    },
    {
      id: 'middle-page',
      label: 'middle',
      totalCount: config.totalCount,
      currentPage: Math.min(3, maxPages),
      pageSize: defaultPageSize,
    },
    {
      id: 'last-page',
      label: 'last',
      totalCount: config.totalCount,
      currentPage: maxPages,
      pageSize: defaultPageSize,
    },
    {
      id: 'after-size-change',
      label: 'after size change',
      totalCount: config.totalCount,
      currentPage: clampedPage,
      pageSize: nextPageSize,
      helperText: `表示件数を ${nextPageSize} 件に変更したため、最終ページへ補正しました。`,
    },
    {
      id: 'empty',
      label: 'empty',
      totalCount: 0,
      currentPage: 1,
      pageSize: defaultPageSize,
      helperText: '該当する結果がありません。',
    },
    {
      id: 'single-page',
      label: 'single page',
      totalCount: Math.max(1, defaultPageSize - 4),
      currentPage: 1,
      pageSize: defaultPageSize,
      helperText: '1 ページに収まるため、ページ送りは不要です。',
    },
  ];
}

function renderPreviewItems(context: ContextId, startIndex: number, visibleCount: number): ReactNode {
  if (visibleCount === 0) {
    return <p className={styles.emptyLabel}>結果を表示できません。</p>;
  }

  const previewCount = Math.min(4, visibleCount);

  if (context === 'search') {
    return (
      <div className={styles.searchGrid}>
        {Array.from({length: previewCount}, (_, index) => startIndex + index).map((itemNumber) => (
          <article className={styles.searchCard} key={itemNumber}>
            <strong>{`検索結果 ${itemNumber}`}</strong>
            <span>配送設定と課金条件の更新フロー</span>
          </article>
        ))}
      </div>
    );
  }

  if (context === 'table') {
    return (
      <div className={styles.tableShell}>
        <div className={styles.tableHead}>
          <span>ID</span>
          <span>ステータス</span>
          <span>担当</span>
        </div>
        {Array.from({length: previewCount}, (_, index) => startIndex + index).map((itemNumber, index) => (
          <div className={styles.tableRow} key={itemNumber}>
            <span>{`#INV-${itemNumber.toString().padStart(3, '0')}`}</span>
            <span>確認待ち</span>
            <span>{`担当 ${index + 1}`}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.adminList}>
      {Array.from({length: previewCount}, (_, index) => startIndex + index).map((itemNumber, index) => (
        <article className={styles.adminRow} key={itemNumber}>
          <div className={styles.adminBody}>
            <strong>{`アカウント ${itemNumber}`}</strong>
            <span>{`owner-${index + 1}@example.com`}</span>
          </div>
          <span className={styles.statusPill}>{index % 2 === 0 ? '有効' : '確認待ち'}</span>
        </article>
      ))}
    </div>
  );
}

function StateCard({
  context,
  state,
}: {
  context: ContextId;
  state: DemoState;
}): ReactNode {
  const maxPages = getMaxPages(state.totalCount, state.pageSize);
  const safePage = clampPage(state.currentPage, maxPages);
  const visibleCount =
    state.totalCount === 0 ? 0 : Math.min(state.pageSize, state.totalCount - (safePage - 1) * state.pageSize);
  const rangeStart = state.totalCount === 0 ? 0 : (safePage - 1) * state.pageSize + 1;
  const pageNumbers = getVisiblePageNumbers(safePage, maxPages);

  return (
    <section className={styles.stateCard}>
      <header className={styles.stateHeader}>
        <span className={styles.stateLabel}>{state.label}</span>
        <span className={styles.stateText}>{getRangeSummary(state)}</span>
      </header>

      <div className={styles.controllerShell}>
        <div className={styles.toolbarRow}>
          <p className={styles.summaryText}>{getRangeSummary(state)}</p>
          <label className={styles.pageSizeField}>
            <span>表示件数</span>
            <select className={styles.pageSizeSelect} defaultValue={state.pageSize}>
              {contextById[context].pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {`${option}件`}
                </option>
              ))}
            </select>
          </label>
        </div>

        <nav aria-label="ページネーション" className={styles.pageNav}>
          <button
            className={clsx(styles.pageButton, safePage === 1 && styles.pageButtonDisabled)}
            disabled={safePage === 1 || state.totalCount === 0}
            type="button">
            前へ
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              aria-current={safePage === pageNumber && state.totalCount > 0 ? 'page' : undefined}
              className={clsx(
                styles.pageButton,
                safePage === pageNumber && state.totalCount > 0 && styles.pageButtonCurrent,
              )}
              key={pageNumber}
              type="button">
              {pageNumber}
            </button>
          ))}
          <button
            className={clsx(styles.pageButton, safePage === maxPages && styles.pageButtonDisabled)}
            disabled={safePage === maxPages || state.totalCount === 0}
            type="button">
            次へ
          </button>
        </nav>

        <p aria-live="polite" className={styles.helperText}>
          {state.helperText ?? 'page size control は page-numbers にのみ含めます。'}
        </p>
      </div>

      <div className={styles.resultSurface}>{renderPreviewItems(context, rangeStart, visibleCount)}</div>
    </section>
  );
}

export default function PaginationPageNumbersDemo({
  density,
  context,
  previewState,
}: Props): ReactNode {
  const config = contextById[context];
  const states = buildStates(config);

  if (density === 'list') {
    const state = states.find((item) => item.id === (previewState ?? 'middle-page')) ?? states[1] ?? states[0];

    if (!state) {
      return null;
    }

    return (
      <div className={styles.root}>
        <StateCard context={context} state={state} />
        <p className={styles.demoNote}>{config.summary}</p>
      </div>
    );
  }

  return (
    <div className={clsx(styles.root, styles.detailRoot)}>
      <div className={styles.stateGrid}>
        {states.map((state) => (
          <StateCard context={context} key={`${context}-${state.id}`} state={state} />
        ))}
      </div>
      <p className={styles.demoNote}>
        search result / table / admin list の 3 context を同じ骨格で見比べ、empty・single-page・after-size-change を detail で明示します。
      </p>
    </div>
  );
}
