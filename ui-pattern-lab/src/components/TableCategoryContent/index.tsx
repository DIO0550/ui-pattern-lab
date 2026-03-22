import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';

import styles from './styles.module.css';

export default function TableCategoryContent(): ReactNode {
  const patternCount = tablePatternEntries.length;

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        table カテゴリでは、一覧密度を保ちながら見やすさを崩さない見せ方を整理します。
        まず比較一覧で responsive stack / 横スクロール / 固定ヘッダー / 省略表示の違いを見比べ、
        そのあと個別のパターンへ進みます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較一覧を見る</Heading>
        <PatternCatalogCard
          badge={`${patternCount}件`}
          description="一覧性、比較精度、モバイルでの読みやすさ、長文セル対応の違いを先に整理してから、個別パターンへ進めます。"
          eyebrow="比較一覧"
          meta="compare page で preview と CSS / TSX サンプルを確認"
          title="テーブルデザインパターン"
          titleId="table-compare-title"
          to="/patterns/table-designs"
          variant="featured"
        />
      </section>

      <section className={styles.section}>
        <Heading as="h2">個別のパターンへ進む</Heading>
        <div className={styles.grid}>
          {tablePatternEntries.map((entry) => (
            <PatternCatalogCard
              description={entry.summary}
              eyebrow="詳細ページ"
              key={entry.id}
              title={entry.title}
              to={`/table/${entry.id}`}
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
