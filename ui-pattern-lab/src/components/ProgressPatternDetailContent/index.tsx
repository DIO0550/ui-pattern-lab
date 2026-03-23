import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import ProgressPatternGallery from '@site/src/components/ProgressPatternGallery';
import {progressPatternEntries} from '@site/src/data/progressPatternEntries';
import type {ProgressPatternEntryId} from '@site/src/data/progressPatternTypes';

import styles from './styles.module.css';

type ProgressPatternDetailContentProps = {
  entryId: ProgressPatternEntryId;
};

type RelatedResource = {
  title: string;
  description: string;
  to: string;
};

const relatedResources: readonly RelatedResource[] = [
  {
    title: 'ボタン / interactive states',
    description:
      'button 内 loading、focus-visible、disabled など、局所的なフィードバックの設計はこのページを参照してください。',
    to: '/button/interactive-states',
  },
  {
    title: 'セレクタ / combobox empty and loading states',
    description:
      '候補待ち・検索中・empty state の切り分けはこのページを参照してください。progress 側では待機の見せ方そのものを扱います。',
    to: '/selector/combobox-empty-and-loading-states',
  },
] as const;

function buildContextNote(entryId: ProgressPatternEntryId): ReactNode | null {
  if (entryId === 'progress-bar-determinate') {
    return (
      <>
        total が不明な処理に determinate bar を当てないことが最優先です。値の巻き戻しが起こる場面は例外扱いとして note で補足し、
        通常は単調増加を前提に設計します。
      </>
    );
  }

  if (entryId === 'progress-bar-indeterminate') {
    return (
      <>
        候補リストや検索結果の loading / empty の境界を扱う場合は{' '}
        <Link to="/selector/combobox-empty-and-loading-states">
          セレクタ / combobox empty and loading states
        </Link>{' '}
        を参照してください。ここでは section 全体が busy だと伝える表現に集中します。
      </>
    );
  }

  if (entryId === 'circular-progress-determinate') {
    return (
      <>
        circular progress は known total を前提に、割合そのものを focal に見せたい場面へ限定します。large / hero
        size は主状態の強調に向きますが、一覧で複数件を横比較するなら linear な{' '}
        <Link to="/progress/progress-bar-determinate">決定型 progress bar</Link>{' '}
        の方が差分を追いやすいことがあります。
      </>
    );
  }

  if (entryId === 'loading-spinner') {
    return (
      <>
        button 内の loading は{' '}
        <Link to="/button/interactive-states">ボタン / interactive states</Link>{' '}
        に寄せ、spinner 単体では「どの領域が待機中か」を label で区別してください。
      </>
    );
  }

  if (entryId === 'skeleton-placeholder') {
    return (
      <>
        skeleton は `aria-busy` の切り替えと最終レイアウトに近い高さ維持が要点です。animation は static / pulse /
        shimmer から 1 つを選び、reduced motion や dense な画面では static を既定にしてください。候補待ちや結果なしのメッセージ設計は{' '}
        <Link to="/selector/combobox-empty-and-loading-states">
          セレクタ / combobox empty and loading states
        </Link>{' '}
        を参照してください。
      </>
    );
  }

  if (entryId === 'stepper-status-tracker') {
    return (
      <>
        `stepper-status-tracker` は 4 step 固定の wizard / checkout 文脈に限定し、timeline
        型の履歴表示やクリック遷移は初回スコープ外です。
      </>
    );
  }

  return null;
}

export default function ProgressPatternDetailContent({
  entryId,
}: ProgressPatternDetailContentProps): ReactNode {
  const entry = progressPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown progress pattern entry: ${entryId}`);
  }

  const contextNote = buildContextNote(entry.id);

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/progress">プログレス</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/progress-designs">プログレスデザインパターン</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview に加えて、対応する CSS / TSX サンプルと設計メモをまとめて確認できます。
        比較一覧へ戻る場合は{' '}
        <Link to="/patterns/progress-designs">プログレスデザインパターン</Link>
        、カテゴリ全体へ戻る場合は <Link to="/progress">プログレス</Link> を参照してください。
      </p>
      {contextNote ? <p className={styles.contextNote}>{contextNote}</p> : null}
      <ProgressPatternGallery density="detail" entries={[entry]} />
      <section className={styles.relatedSection}>
        <Heading as="h2">関連ページ</Heading>
        <div className={styles.relatedGrid}>
          {relatedResources.map((resource) => (
            <PatternCatalogCard
              description={resource.description}
              eyebrow="関連ページ"
              key={resource.to}
              title={resource.title}
              to={resource.to}
              tone="muted"
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
