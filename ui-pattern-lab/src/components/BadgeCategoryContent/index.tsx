import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {badgePatternEntries} from '@site/src/data/badgePatternEntries';

import styles from './styles.module.css';

/** Renders the top-level badge category page. */
export default function BadgeCategoryContent(): ReactNode {
  const patternCount = badgePatternEntries.length;
  const compareItems = badgePatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/badge/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        バッジカテゴリでは、まず <Link to="/patterns/badge-designs">比較一覧</Link> で
        variant と色の役割を見比べ、そのあと件数表示や補足ラベルの detail へ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に比較軸を整理する</Heading>
        <p className={styles.sectionLead}>
          初回収録の {patternCount} 件では、バッジを「押せる UI」ではなく「補足情報ラベル」として扱います。
          Filled / Outlined / Soft / Surface の違いと、0 / 8 / 24 / 99+ のような件数表示の収まりを先に確認できます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
