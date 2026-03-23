import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {checkboxPatternEntries} from '@site/src/data/checkboxPatternEntries';

import styles from './styles.module.css';

export default function CheckboxCategoryContent(): ReactNode {
  const patternCount = checkboxPatternEntries.length;
  const compareItems = checkboxPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/checkbox/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        checkbox カテゴリでは、まず比較一覧で radio button / switch / select
        との使い分けを確認し、そのあと通常の checkbox、カード型、mixed state
        などの個別パターンへ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に選択モデルの違いを整理する</Heading>
        <p className={styles.sectionLead}>
          checkbox / radio / switch / select の matrix は{' '}
          <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link>{' '}
          で確認しつつ、ここでは収録している {patternCount} 件の要点だけを短く見比べます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
