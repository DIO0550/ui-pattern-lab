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
        入力カテゴリでは、単一行のテキスト入力を、基本、補助文、バリデーション、アドオン、非編集状態、
        自作デザインまで整理します。textarea / file input / date picker / OTP は今回のスコープ外です。
      </p>
      <p className={styles.contextNote}>
        helper / error / disabled の横断ルールは{' '}
        <Link to="/selector/states-and-validation">selector / states と validation の共通参照</Link>{' '}
        も合わせて確認してください。入力カテゴリでは text-like な field の見せ方に集中します。
      </p>

      <section className={styles.section}>
        <Heading as="h2">{patternCount} パターンを先に比較する</Heading>
        <p className={styles.sectionLead}>
          まずは 基本 / 補助文 / バリデーション / アドオン / 非編集状態 / 自作デザイン の違いを見比べ、必要な detail ページへ進みます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>

      <section className={styles.section}>
        <Heading as="h2">関連導線</Heading>
        <div className={styles.relatedGrid}>
          <PatternCatalogCard
            description={`${patternCount} パターンを preview とコードつきで一覧し、差分を一度に確認できる一覧ページです。`}
            eyebrow="関連ページ"
            title="入力デザインパターン"
            to="/patterns/input-designs"
            tone="muted"
            variant="default"
          />
          <PatternCatalogCard
            description="helper / error / disabled / aria-describedby など、control 横断の品質ルールをまとめた reference ページです。"
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
