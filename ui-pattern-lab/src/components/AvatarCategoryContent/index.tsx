import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {avatarPatternEntries} from '@site/src/data/avatarPatternEntries';

import styles from './styles.module.css';

/** Renders the top-level avatar category page. */
export default function AvatarCategoryContent(): ReactNode {
  const patternCount = avatarPatternEntries.length;
  const compareItems = avatarPatternEntries.map((entry) => ({
    id: entry.id,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
    to: `/avatar/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        アバターカテゴリでは、まず <Link to="/patterns/avatar-designs">比較一覧</Link> で
        size / shape / fallback / indicator の判断軸を整理し、detail page で単体、グループ、ラベル付きの
        preview とコードを確認できます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">主体表示の責務を分ける</Heading>
        <p className={styles.sectionLead}>
          初回収録の {patternCount} 件では、avatar 本体を主体の識別、status dot や badge
          を付随要素、avatar group を composition として切り分けます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
