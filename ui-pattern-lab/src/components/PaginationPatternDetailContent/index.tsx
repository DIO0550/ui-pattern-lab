import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import PaginationPatternGallery from '@site/src/components/PaginationPatternGallery';
import {paginationPatternEntries} from '@site/src/data/paginationPatternEntries';
import type {PaginationPatternId} from '@site/src/data/paginationPatternTypes';

import styles from './styles.module.css';

type Props = {
  entryId: PaginationPatternId;
};

const relatedResources = [
  {
    title: 'テーブル',
    description:
      'page numbers が適用されやすい table layout や sticky header との組み合わせは table カテゴリで確認できます。',
    to: '/table',
  },
  {
    title: '表示制御',
    description:
      'sort / filter toolbar など、一覧の scope を変える controller は表示制御カテゴリが担当します。',
    to: '/controller',
  },
] as const;

function buildContextNote(entryId: PaginationPatternId): ReactNode | null {
  if (entryId === 'page-numbers') {
    return (
      <>
        user-facing な page size control を detail demo に含めるのは{' '}
        <strong>page numbers のみ</strong>です。`load more` / `infinite scroll`
        では件数バッチを説明文に留め、selector を置きません。
      </>
    );
  }

  if (entryId === 'load-more') {
    return (
      <>
        `load more` は append の主導権をユーザーへ残すパターンです。page size selector は出さず、loading /
        error / end を footer 近くで理解できるようにします。
      </>
    );
  }

  if (entryId === 'infinite-scroll') {
    return (
      <>
        `infinite scroll` は文脈維持に強い一方、位置把握と footer 到達性が弱くなりやすい pattern です。
        contained scroll area と fallback action で状態差分を明示します。
      </>
    );
  }

  return null;
}

export default function PaginationPatternDetailContent({entryId}: Props): ReactNode {
  const entry = paginationPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown pagination pattern entry: ${entryId}`);
  }

  const contextNote = buildContextNote(entry.id);

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/pagination">ページネーション</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/pagination-designs">ページネーションデザインパターン</Link>
      </div>

      <p className={styles.lead}>
        このページでは「{entry.title}」の preview demo に加えて、対応する CSS / TSX サンプルと設計メモをまとめて確認できます。
        比較一覧へ戻る場合は <Link to="/patterns/pagination-designs">ページネーションデザインパターン</Link>
        、カテゴリ全体へ戻る場合は <Link to="/pagination">ページネーション</Link> を参照してください。
      </p>

      {contextNote ? <p className={styles.contextNote}>{contextNote}</p> : null}

      <PaginationPatternGallery density="detail" entries={[entry]} />

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
