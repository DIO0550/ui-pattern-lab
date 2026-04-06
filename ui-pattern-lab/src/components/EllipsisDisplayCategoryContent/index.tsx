import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';

import styles from './styles.module.css';

export default function EllipsisDisplayCategoryContent(): ReactNode {
  const compareItems = ellipsisDisplayPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/ellipsis-display/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        表示制限カテゴリでは、まず比較ページで「どこまで見せるか」と「全文へどう到達させるか」を整理し、
        そのあと各詳細ページで visual variation ごとの preview / CSS / TSX 例を確認します。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に表示ルールを整理する</Heading>
        <p className={styles.sectionLead}>
          まずは <Link to="/patterns/ellipsis-display-designs">表示制限パターン</Link>{' '}
          で判断軸を確認しながら、収録している {ellipsisDisplayPatternEntries.length}
          件の行動パターンを見比べます。見た目の variation は各詳細ページで 1 block ごとに確認できます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">テーブル専用の具体例</Heading>
        <PatternCatalogCard
          className={styles.supportCard}
          description="テーブルの行高と列密度を崩さない具体例は、このカテゴリではなく table カテゴリで扱っています。"
          eyebrow="補助リンク"
          meta="generic な表示制限とは別に、表セル専用の省略例を確認できます"
          title="table の cell-truncation"
          to="/table/cell-truncation"
          tone="muted"
          variant="default"
        />
      </section>
    </div>
  );
}
