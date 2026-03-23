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
        省略表示カテゴリでは、まず比較一覧で全文到達性と密度のバランスを確認し、
        そのあと必要な個別パターンへ進めます。テーブル専用の `cell-truncation`
        は別ページに残し、ここでは generic な判断軸を扱います。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に省略ルールを整理する</Heading>
        <p className={styles.sectionLead}>
          generic な判断軸は{' '}
          <Link to="/patterns/ellipsis-display-designs">省略表示パターン</Link> で確認しつつ、
          ここでは収録している {ellipsisDisplayPatternEntries.length} 件の要点だけを短く見比べます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">テーブル専用の具体例</Heading>
        <PatternCatalogCard
          className={styles.supportCard}
          description="テーブルの行高と列密度を崩さない具体例は table カテゴリ側に残しています。"
          eyebrow="補助リンク"
          meta="表の文脈で省略表示を使う場合はこちらを参照"
          title="cell-truncation"
          to="/table/cell-truncation"
          tone="muted"
          variant="default"
        />
      </section>
    </div>
  );
}
