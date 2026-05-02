import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {tabsPatternEntries} from '@site/src/data/tabsPatternEntries';

import styles from './styles.module.css';

const relatedResources = [
  {
    title: '表示制御',
    description:
      'tabs を view controller として扱う場合や segmented control との責務境界は、表示制御カテゴリで確認できます。',
    to: '/controller',
  },
  {
    title: 'ボタン',
    description:
      '押した瞬間に状態を切り替える toggle button や button group は、tabs ではなくボタンカテゴリで扱います。',
    to: '/button',
  },
] as const;

export default function TabsCategoryContent(): ReactNode {
  const patternCount = tabsPatternEntries.length;
  const compareItems = tabsPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/tabs/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        タブカテゴリでは、同一ページ内の panel を切り替える UI としての tabs を扱います。
        `underline`、`pills`、`boxed`、`vertical` を見た目だけでなく、配置、情報密度、keyboard semantics から比較します。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較ページで判断する</Heading>
        <p className={styles.sectionLead}>
          タブはページ遷移リンクでも form value selector でもありません。どの見た目を選ぶかは、panel との距離、ラベル量、active state の強さで決めます。
        </p>
        <div className={styles.grid}>
          <PatternCatalogCard
            description={`${patternCount} つの tabs pattern を、見た目の強さ・レイアウト適性・情報密度・操作モデル・アクセシビリティで比較できます。`}
            eyebrow="比較一覧"
            title="タブデザインパターン"
            to="/patterns/tabs-designs"
            variant="featured"
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">収録している {patternCount} パターン</Heading>
        <p className={styles.sectionLead}>
          一覧では tabs variant ごとの要点を短く見比べ、detail page で preview、CSS / TSX サンプル、
          `tablist` / `tabpanel` の設計メモを確認できます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連ページ</Heading>
        <p className={styles.sectionLead}>
          tabs 自体と、似た役割を持つ view controller / button 系 UI の責務を分けて確認できます。
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
