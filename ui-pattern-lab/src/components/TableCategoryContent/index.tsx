import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternComparisonAxisGrid from '@site/src/components/PatternComparisonAxisGrid';
import PatternCompareCardGrid from '@site/src/components/PatternCompareCardGrid';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';

import styles from './styles.module.css';

const axisItems = [
  {
    title: 'responsive stack',
    description: '1件ずつ詳細を読む場面で、狭い画面でもラベルと値の対応を保ちます。',
  },
  {
    title: '横スクロール',
    description: '列比較の正確さを優先し、全列を保ったまま必要な範囲だけ横移動で見せます。',
  },
  {
    title: '固定ヘッダー',
    description: '行数が多い表でも、縦スクロール中に列の意味を見失いにくくします。',
  },
  {
    title: '省略表示',
    description: '長文セルで行高を暴れさせず、一覧密度を保ったまま別面で全文を補足します。',
  },
] as const;

export default function TableCategoryContent(): ReactNode {
  const patternCount = tablePatternEntries.length;
  const compareItems = tablePatternEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags,
    to: `/table/${entry.id}`,
  }));

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        table カテゴリでは、一覧密度を保ちながら見やすさを崩さない見せ方を整理します。
        まず比較一覧で responsive stack / 横スクロール / 固定ヘッダー / 省略表示の違いを見比べ、
        そのあと個別のパターンへ進みます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">先に見せ方の違いを整理する</Heading>
        <p className={styles.sectionLead}>
          一覧性、比較精度、モバイル適性、長文セル対応の違いを短く整理してから、
          収録している {patternCount} 件のパターンを比較します。
        </p>
        <PatternComparisonAxisGrid items={axisItems} layout="bullets" />
      </section>

      <section className={styles.section}>
        <Heading as="h2">パターンを比較する</Heading>
        <p className={styles.sectionLead}>
          まずは各パターンの要点だけを短く見比べ、必要なときだけ個別の詳細ページで preview と
          CSS / コード例まで掘り下げます。
        </p>
        <PatternCompareCardGrid items={compareItems} />
      </section>
    </div>
  );
}
