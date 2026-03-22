import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';

import styles from './styles.module.css';

export default function ButtonCategoryContent(): ReactNode {
  const patternCount = buttonPatternEntries.length;

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        ボタンカテゴリでは、まず比較一覧で横断ルールを確認し、そのあと必要な個別パターンへ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較一覧を見る</Heading>
        <PatternCatalogCard
          badge={`${patternCount}件`}
          description="強調度、状態、危険操作、余白設計の判断軸を先に見比べてから、個別パターンへ進めます。"
          eyebrow="比較一覧"
          meta="compare page で preview と CSS / TSX サンプルを確認"
          title="ボタンデザインパターン"
          titleId="button-compare-title"
          to="/patterns/button-designs"
          variant="featured"
        />
      </section>

      <section className={styles.section}>
        <Heading as="h2">個別のパターンへ進む</Heading>
        <div className={styles.grid}>
          {buttonPatternEntries.map((entry) => (
            <PatternCatalogCard
              description={entry.summary}
              eyebrow="詳細ページ"
              key={entry.id}
              title={entry.title}
              to={`/button/${entry.id}`}
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
