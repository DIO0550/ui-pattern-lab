import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {paginationPatternEntries} from '@site/src/data/paginationPatternEntries';

import styles from './styles.module.css';

const relatedResources = [
  {
    title: 'テーブル',
    description:
      'page numbers の適用先になりやすい table layout や column 設計は、table カテゴリ側で確認できます。',
    to: '/table',
  },
  {
    title: '表示制御',
    description:
      'sort / filter toolbar や range slider など、一覧の scope を変える別系統の controller は表示制御カテゴリを参照してください。',
    to: '/controller',
  },
] as const;

export default function PaginationCategoryContent(): ReactNode {
  const patternCount = paginationPatternEntries.length;
  const compareItems = paginationPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/pagination/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        ページネーションカテゴリでは、単なるリンク列ではなく「結果セットの閲覧状態をどう制御するか」を比較します。
        `page numbers`、`load more`、`infinite scroll` の違いを先に整理し、page size control をどこへ置くかまで判断しやすくします。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較ページで判断する</Heading>
        <p className={styles.sectionLead}>
          位置を直接指定したいのか、追加読込を明示トリガーで進めたいのか、自動で続けたいのかを compare page で横断確認するのがおすすめです。
        </p>
        <div className={styles.grid}>
          <PatternCatalogCard
            description={`${patternCount} つの pagination pattern を、操作モデル・読込単位・向いている UX・アクセシビリティ・パフォーマンスで比較できます。page size control は page numbers のみであることも明示します。`}
            eyebrow="比較一覧"
            title="ページネーションデザインパターン"
            to="/patterns/pagination-designs"
            variant="featured"
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">収録している {patternCount} パターン</Heading>
        <p className={styles.sectionLead}>
          一覧では pattern ごとの要点を短く見比べ、detail page で search result / table / admin list を含む preview、
          CSS / TSX サンプル、状態設計の注記を深掘りできます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連ページ</Heading>
        <p className={styles.sectionLead}>
          pagination 自体と、その適用先や周辺 controller の責務を分けて確認できるようにしています。
        </p>
        <div className={styles.grid}>
          {relatedResources.map((resource) => (
            <PatternCatalogCard
              description={resource.description}
              eyebrow="関連ページ"
              key={resource.to}
              title={resource.title}
              to={resource.to}
              tone="muted"
              variant="default"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
