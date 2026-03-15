import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';
import styles from '@site/src/components/DocsHomeContent/styles.module.css';

export default function TableCategoryContent(): ReactNode {
  return (
    <div className="container margin-vert--lg">
      <p>
        テーブルカテゴリでは、見せ方ごとのサブカテゴリから個別のパターンへ
        移動できます。
      </p>

      <section className={styles.section}>
        <Heading as="h2">サブカテゴリ</Heading>
        <div className={styles.grid}>
          {tablePatternEntries.map((entry) => (
            <Link className={styles.cardLink} key={entry.id} to={`/table/${entry.id}`}>
              <article className={styles.card}>
                <span className={styles.cardEyebrow}>リンク</span>
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
