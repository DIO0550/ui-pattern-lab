import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';

import styles from './styles.module.css';

export default function ButtonCategoryContent(): ReactNode {
  const patternCount = buttonPatternEntries.length;
  const compareItems = buttonPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/button/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        ボタンカテゴリでは、まず比較一覧で横断ルールを確認し、そのあと group / toolbar / toggle など必要な個別パターンへ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に比較軸を整理する</Heading>
        <p className={styles.sectionLead}>
          横断ルールの全体像は <Link to="/patterns/button-designs">ボタンデザインパターン</Link>{' '}
          で確認しつつ、ここでは収録している {patternCount} 件の要点だけを短く見比べます。ボタングループと
          ツールバーの違いもここからたどれます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
