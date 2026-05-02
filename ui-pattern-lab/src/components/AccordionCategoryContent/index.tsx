import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {accordionPatternEntries} from '@site/src/data/accordionPatternEntries';

import styles from './styles.module.css';

/** Renders the top-level accordion category page. */
export default function AccordionCategoryContent(): ReactNode {
  const compareItems = accordionPatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/accordion/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        アコーディオンカテゴリでは、まず <Link to="/patterns/accordion-designs">比較一覧</Link>{' '}
        で開閉モデルと見た目の密度を整理し、そのあと detail で variant ごとの実装例を確認できます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">開閉する情報量を整理する</Heading>
        <p className={styles.sectionLead}>
          Accordion は長い情報を隠すためだけの UI ではありません。見出しを常に見せ、必要な本文だけを開ける
          disclosure として扱うと、FAQ、設定、仕様詳細を自然に読ませられます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
