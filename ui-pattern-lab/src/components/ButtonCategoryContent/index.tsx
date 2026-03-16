import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';

import styles from './styles.module.css';

export default function ButtonCategoryContent(): ReactNode {
  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        ボタンカテゴリでは、まず比較一覧で横断ルールを確認し、そのあと必要な個別パターンへ進めます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較一覧を見る</Heading>
        <Link className={styles.overviewLink} to="/patterns/button-designs">
          <article className={styles.overviewCard}>
            <span className={styles.cardEyebrow}>比較一覧</span>
            <Heading as="h3" className={styles.cardTitle}>
              ボタンデザインパターン
            </Heading>
            <p className={styles.cardDescription}>
              6種類のボタンパターンを、強調度、状態、余白、アクセシビリティの観点で比較できます。
            </p>
            <p className={styles.cardMeta}>
              overview から preview と CSS / TSX サンプルをまとめて確認
            </p>
          </article>
        </Link>
      </section>

      <section className={styles.section}>
        <Heading as="h2">個別のパターンへ進む</Heading>
        <div className={styles.grid}>
          {buttonPatternEntries.map((entry) => (
            <Link className={styles.cardLink} key={entry.id} to={`/button/${entry.id}`}>
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
