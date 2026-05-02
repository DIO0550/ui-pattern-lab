import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import TabsPatternGallery from '@site/src/components/TabsPatternGallery';
import {tabsPatternEntries} from '@site/src/data/tabsPatternEntries';
import type {TabsPatternId} from '@site/src/data/tabsPatternTypes';

import styles from './styles.module.css';

type Props = {
  entryId: TabsPatternId;
};

const relatedResources = [
  {
    title: '表示制御',
    description:
      'tabs を controller pattern として使う場合の責務境界は、表示制御カテゴリのタブ式インラインパネル切り替えで確認できます。',
    to: '/controller/tabs-inline-panel-switcher',
  },
  {
    title: 'ボタン / トグル・選択',
    description:
      'panel ではなく単一状態を押下で切り替える場合は、tabs ではなく toggle button 側を検討します。',
    to: '/button/toggle-and-selection',
  },
] as const;

function buildContextNote(entryId: TabsPatternId): ReactNode {
  if (entryId === 'vertical-tabs') {
    return (
      <>
        縦型タブは desktop / tablet の2カラムで有効です。狭い画面では上部 scrollable tabs や accordion
        へ切り替える判断も必要です。
      </>
    );
  }

  if (entryId === 'pill-tabs') {
    return (
      <>
        ピル型は active state が強いため、少数タブに向きます。多数の候補や値選択が主題なら selector
        へ責務を分けます。
      </>
    );
  }

  return (
    <>
      この detail では 1 variant block : 1 code panel を守り、preview と CSS / TSX
      の対応を個別に確認できるようにしています。
    </>
  );
}

export default function TabsPatternDetailContent({entryId}: Props): ReactNode {
  const entry = tabsPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown tabs pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/tabs">タブ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/tabs-designs">タブデザインパターン</Link>
      </div>

      <p className={styles.lead}>
        このページでは「{entry.title}」の preview demo に加えて、対応する CSS / TSX サンプルと設計メモをまとめて確認できます。
        比較一覧へ戻る場合は <Link to="/patterns/tabs-designs">タブデザインパターン</Link>
        、カテゴリ全体へ戻る場合は <Link to="/tabs">タブ</Link> を参照してください。
      </p>

      <p className={styles.contextNote}>{buildContextNote(entry.id)}</p>

      <TabsPatternGallery density="detail" entries={[entry]} />

      <section className={styles.relatedSection}>
        <Heading as="h2">関連ページ</Heading>
        <div className={styles.relatedGrid}>
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
