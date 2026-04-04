import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {inputPatternEntries} from '@site/src/data/inputPatternEntries';

import styles from './styles.module.css';

export default function InputCategoryContent(): ReactNode {
  const patternCount = inputPatternEntries.length;
  const compareItems = inputPatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.description,
    tags: entry.tags,
    to: `/input/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        テキストフィールドカテゴリでは、よくある UI ライブラリの input を自前で持つイメージで、CSS 付きの自作デザインを整理します。
        それぞれのデザインで hover / focus / error / disabled まで含めた見え方を確認できます。
      </p>
      <p className={styles.contextNote}>
        helper / error / aria-invalid といったルール自体は{' '}
        <Link to="/selector/states-and-validation">selector / states と validation の共通参照</Link>{' '}
        に寄せつつ、ここでは見た目のデザインと state 表現を CSS でどう作るかに集中します。
      </p>

      <section className={styles.section}>
        <Heading as="h2">{patternCount} デザインを先に比較する</Heading>
        <p className={styles.sectionLead}>
          まずは アウトライン型 / フィルド型 / アンダーライン型 / ボーダーレス型 / ピル型 の違いを見比べ、必要な detail ページで主要状態の preview、TSX、CSS を個別に確認します。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連導線</Heading>
        <div className={styles.relatedGrid}>
          <PatternCatalogCard
            description={`${patternCount} デザインを preview / TSX / CSS つきで一覧し、差分を一度に確認できる一覧ページです。`}
            eyebrow="関連ページ"
            title="自作テキストフィールドデザイン"
            to="/patterns/input-designs"
            tone="muted"
            variant="default"
          />
          <PatternCatalogCard
            description="helper / error / disabled / aria-describedby など、state 設計の品質ルールをまとめた reference ページです。"
            eyebrow="cross-reference"
            title="states と validation の共通参照"
            to="/selector/states-and-validation"
            tone="muted"
            variant="default"
          />
        </div>
      </section>
    </div>
  );
}
