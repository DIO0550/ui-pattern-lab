import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {progressPatternEntries} from '@site/src/data/progressPatternEntries';

import styles from './styles.module.css';

const relatedResources = [
  {
    title: 'ボタン / interactive states',
    description:
      'button 内 loading、focus-visible、disabled の設計はこのページを参照してください。',
    to: '/button/interactive-states',
  },
  {
    title: 'セレクタ / combobox empty and loading states',
    description:
      '候補待ちと empty state の境界はこのページを参照してください。progress では待機の見せ方を比較します。',
    to: '/selector/combobox-empty-and-loading-states',
  },
] as const;

export default function ProgressCategoryContent(): ReactNode {
  const patternCount = progressPatternEntries.length;
  const compareItems = progressPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/progress/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        プログレスカテゴリでは、まず比較一覧で `known total` / `unknown total`、linear / circular、layout 保持、
        local / section / multi-step の違いを整理し、そのあと必要な個別パターンへ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較ページで判断する</Heading>
        <p className={styles.sectionLead}>
          linear determinate / circular determinate / indeterminate / spinner / skeleton / stepper
          の選定フローは、まず比較一覧で横断的に確認するのがおすすめです。
        </p>
        <div className={styles.grid}>
          <PatternCatalogCard
            description={`${patternCount} つの progress pattern を、進捗の確実性・レイアウト保持・適用スコープ・motion 依存度・主要セマンティクスで比較できます。`}
            eyebrow="比較一覧"
            title="プログレスデザインパターン"
            to="/patterns/progress-designs"
            variant="featured"
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">収録している {patternCount} パターン</Heading>
        <p className={styles.sectionLead}>
          一覧では各パターンの判断メモを短く見比べ、詳細ページで preview と CSS / TSX
          サンプル、アクセシビリティ注記を掘り下げます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連ページ</Heading>
        <p className={styles.sectionLead}>
          reciprocal link は初回スコープ外としつつ、loading state と empty/loading boundary
          の参照先だけを progress 側から案内します。
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
