import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
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
        <Link className={styles.overviewLink} to="/patterns/checkbox-designs">
          <article className={styles.overviewCard}>
            <span className={styles.cardEyebrow}>比較一覧</span>
            <Heading as="h3" className={styles.cardTitle}>
              チェックボックスデザインパターン
            </Heading>
            <p className={styles.cardDescription}>
              {patternCount} 種類の checkbox パターンを、選択モデル、送信タイミング、カード型 UI、タップ領域、アクセシビリティの観点で比較できます。
            </p>
            <p className={styles.cardMeta}>
              比較マトリクスから preview と CSS / TSX サンプルへ進む
            </p>
          </article>
        </Link>
      </section>

      <section className={styles.section}>
        <Heading as="h2">個別のパターンへ進む</Heading>
        <div className={styles.grid}>
          {checkboxPatternEntries.map((entry) => (
            <Link className={styles.cardLink} key={entry.id} to={`/checkbox/${entry.id}`}>
              <article className={styles.card}>
                <span className={styles.cardEyebrow}>詳細ページ</span>
                <Heading as="h3" className={styles.cardTitle}>
                  {entry.title}
                </Heading>
                <p className={styles.cardDescription}>{entry.summary}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
