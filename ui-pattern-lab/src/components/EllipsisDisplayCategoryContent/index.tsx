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
        省略表示カテゴリでは、まず比較ページで「どこまで省略し、どう全文へ到達させるか」を整理し、
        そのあと各詳細ページで preview / CSS / TSX 例を確認します。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に省略ルールを整理する</Heading>
        <p className={styles.sectionLead}>
          まずは <Link to="/patterns/ellipsis-display-designs">省略表示パターン</Link>{' '}
          で判断軸を確認しながら、収録している {ellipsisDisplayPatternEntries.length}
          件のパターンを見比べます。preview / CSS / TSX 例は各詳細ページで確認できます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">テーブル専用の具体例</Heading>
        <PatternCatalogCard
          className={styles.supportCard}
          description="テーブルの行高と列密度を崩さない省略表示は、このカテゴリではなく table カテゴリで扱っています。"
          eyebrow="補助リンク"
          meta="ここで扱う generic な省略パターンとは別に、表セル専用の省略例を確認できます"
          title="cell-truncation"
          to="/table/cell-truncation"
          tone="muted"
          variant="default"
        />
      </section>
    </div>
  );
}
