import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {listPatternEntries} from '@site/src/data/listPatternEntries';

import styles from './styles.module.css';

export default function ListCategoryContent(): ReactNode {
  const patternCount = listPatternEntries.length;
  const compareItems = listPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/list/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        リストカテゴリでは、同種の項目を縦方向に並べる data display を扱います。
        table のような列比較ではなく、項目単位の読み取り、状態確認、末尾情報の扱いを整理します。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に比較軸を整理する</Heading>
        <p className={styles.sectionLead}>
          style / item content / behavior の判断軸は{' '}
          <Link to="/patterns/list-designs">リストデザインパターン</Link>{' '}
          で確認できます。ここでは収録している {patternCount} 件の要点を短く見比べ、必要な detail
          ページで preview と CSS / TSX サンプルを確認します。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
