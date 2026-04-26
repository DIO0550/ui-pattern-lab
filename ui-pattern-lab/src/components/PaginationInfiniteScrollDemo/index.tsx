import type {ReactNode} from 'react';
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
  statusText: string;
};

const TOTAL_COUNT = 54;

const states: readonly DemoState[] = [
  {
    id: 'ready',
    label: 'ready',
    visibleCount: 18,
    statusText: '末尾に到達したら次を読み込みます。',
  },
  {
    id: 'loading',
    label: 'loading',
    visibleCount: 18,
    statusText: '次の結果を読み込み中です。',
  },
  {
    id: 'error',
    label: 'error',
    visibleCount: 18,
    statusText: '読み込みに失敗しました。再試行してください。',
  },
  {
    id: 'end',
    label: 'end',
    visibleCount: 54,
    statusText: 'これ以上の結果はありません。',
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
      {Array.from({length: Math.min(6, visibleCount)}, (_, index) => (
        <article className={styles.resultItem} key={index}>
          <strong>{`Feed item ${index + 1}`}</strong>
          <span>自動追加読込で連続表示される要素の例</span>
        </article>
      ))}
    </div>
  );
}

function StateCard({state}: {state: DemoState}): ReactNode {
  const isError = state.id === 'error';

  return (
    <section className={styles.stateCard}>
      <header className={styles.stateHeader}>
        <span className={styles.stateLabel}>{state.label}</span>
        <span className={styles.stateMeta}>{`${state.visibleCount} / ${TOTAL_COUNT} 件`}</span>
      </header>

      <div aria-label="自動追加読込のプレビュー" className={styles.scrollViewport}>
        {renderItems(state.visibleCount)}
        <div className={styles.sentinelArea}>
          <span className={styles.sentinelLabel}>
            {state.id === 'loading'
              ? '読み込み中...'
              : state.id === 'end'
                ? '終端に到達しました'
                : state.id === 'error'
                  ? '読み込みに失敗しました'
                  : 'sentinel が次の読込を待っています'}
          </span>
        </div>
      </div>

      {isError ? (
        <div className={styles.errorBanner} role="alert">
          <span>{state.statusText}</span>
          <button className={styles.secondaryButton} type="button">
            再試行
          </button>
        </div>
      ) : null}

      <div className={styles.footerRow}>
        <p className={styles.footerText}>{state.statusText}</p>
        <button className={styles.secondaryButton} type="button">
          スクロール終端を再現
        </button>
      </div>
    </section>
  );
}

export default function PaginationInfiniteScrollDemo({
  density,
  previewState,
}: Props): ReactNode {
  if (density === 'list') {
    return (
      <div className={styles.root}>
        <StateCard state={resolveState(previewState)} />
        <p className={styles.demoNote}>
          `infinite scroll` は page size selector を持たず、位置把握と footer 到達性の弱さを補助文で補います。
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
        contained scroll area で `ready / loading / error / end` を deterministic に比較し、fallback action も併置します。
      </p>
    </div>
  );
}
