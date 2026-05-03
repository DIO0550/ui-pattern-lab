import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {alertPatternEntries} from '@site/src/data/alertPatternEntries';

import styles from './styles.module.css';

/** Renders the top-level alert category page. */
export default function AlertCategoryContent(): ReactNode {
  const patternCount = alertPatternEntries.length;
  const compareItems = alertPatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/alert/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        アラートカテゴリでは、まず <Link to="/patterns/alert-designs">比較一覧</Link> で
        severity / style / behavior の判断軸を整理し、そのあとページ内に残る feedback の detail
        へ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">toast ではなく文脈内 feedback として扱う</Heading>
        <p className={styles.sectionLead}>
          初回収録の {patternCount} 件では、Alert を一時通知ではなく「ユーザーが後から見返せる常駐メッセージ」として扱います。
          info / success / warning / error / neutral の severity と、見た目の強さや操作有無を分けて確認できます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
