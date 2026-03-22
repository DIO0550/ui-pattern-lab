import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import {checkboxPatternEntries} from '@site/src/data/checkboxPatternEntries';

import styles from './styles.module.css';

export default function CheckboxCategoryContent(): ReactNode {
  const patternCount = checkboxPatternEntries.length;

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        checkbox カテゴリでは、まず比較一覧で radio button / switch / select
        との使い分けを確認し、そのあと通常の checkbox、カード型、mixed state
        などの個別パターンへ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較一覧を見る</Heading>
        <PatternCatalogCard
          badge={`${patternCount}件`}
          description="選択モデル、送信タイミング、カード型 UI、タップ領域の違いを先に比較してから、個別パターンへ進めます。"
          eyebrow="比較一覧"
          meta="比較マトリクスから preview と CSS / TSX サンプルへ進む"
          title="チェックボックスデザインパターン"
          titleId="checkbox-compare-title"
          to="/patterns/checkbox-designs"
          variant="featured"
        />
      </section>

      <section className={styles.section}>
        <Heading as="h2">個別のパターンへ進む</Heading>
        <div className={styles.grid}>
          {checkboxPatternEntries.map((entry) => (
            <PatternCatalogCard
              description={entry.summary}
              eyebrow="詳細ページ"
              key={entry.id}
              title={entry.title}
              to={`/checkbox/${entry.id}`}
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
