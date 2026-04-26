import type {ReactNode} from 'react';
import clsx from 'clsx';
import type {
  PaginationAppendStatus,
  PaginationPreviewState,
} from '@site/src/data/paginationPatternTypes';

import styles from './styles.module.css';

type Props = {
  density: 'list' | 'detail';
  previewState?: PaginationPreviewState;
};

type DemoState = {
  id: PaginationAppendStatus;
  label: string;
  visibleCount: number;
  message: string;
};

const TOTAL_COUNT = 60;

const states: readonly DemoState[] = [
  {
    id: 'ready',
    label: 'ready',
    visibleCount: 20,
    message: '1 回で 20 件ずつ追加します。',
  },
  {
    id: 'loading',
    label: 'loading',
    visibleCount: 20,
    message: '次の 20 件を取得しています。',
  },
  {
    id: 'error',
    label: 'error',
    visibleCount: 20,
    message: '読み込みに失敗しました。再試行してください。',
  },
  {
    id: 'end',
    label: 'end',
    visibleCount: 60,
    message: 'すべての結果を表示しました。',
  },
] as const;

function resolveState(previewState?: PaginationPreviewState): DemoState {
  if (previewState === 'loading') {
    return states[1];
  }

  if (previewState === 'error') {
    return states[2];
  }

  if (previewState === 'end') {
    return states[3];
  }

  return states[0];
}

function renderItems(visibleCount: number): ReactNode {
  return (
    <div className={styles.resultList}>
      {Array.from({length: Math.min(4, visibleCount)}, (_, index) => (
        <article className={styles.resultItem} key={index}>
          <strong>{`コレクション ${index + 1}`}</strong>
          <span>append で追加される要素の例</span>
        </article>
      ))}
    </div>
  );
}

function StateCard({state}: {state: DemoState}): ReactNode {
  const isLoading = state.id === 'loading';
  const isError = state.id === 'error';
  const isEnd = state.id === 'end';

  return (
    <section className={styles.stateCard}>
      <header className={styles.stateHeader}>
        <span className={styles.stateLabel}>{state.label}</span>
        <span className={styles.stateMeta}>{`${state.visibleCount} / ${TOTAL_COUNT} 件`}</span>
      </header>

      {renderItems(state.visibleCount)}

      {isError ? (
        <div className={styles.errorBanner} role="alert">
          <span>{state.message}</span>
          <button className={styles.secondaryButton} type="button">
            再試行
          </button>
        </div>
      ) : null}

      <div className={styles.footerRow}>
        <p className={styles.footerText}>{state.message}</p>
        <button
          className={clsx(styles.loadMoreButton, isLoading && styles.loadingButton)}
          disabled={isLoading || isEnd}
          type="button">
          {isLoading ? '読み込み中...' : isEnd ? 'すべて表示しました' : 'さらに読み込む'}
        </button>
      </div>
    </section>
  );
}

export default function PaginationLoadMoreDemo({
  density,
  previewState,
}: Props): ReactNode {
  if (density === 'list') {
    return (
      <div className={styles.root}>
        <StateCard state={resolveState(previewState)} />
        <p className={styles.demoNote}>
          `load more` は page size selector を出さず、append と retry を同じ末尾操作面で扱います。
        </p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.stateGrid}>
        {states.map((state) => (
          <StateCard key={state.id} state={state} />
        ))}
      </div>
      <p className={styles.demoNote}>
        loading / error / end を明示し、batch size は説明文のみに留めています。
      </p>
    </div>
  );
}
