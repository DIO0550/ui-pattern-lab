import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';

import styles from './styles.module.css';

export default function EllipsisDisplayCategoryContent(): ReactNode {
  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <p className={styles.lead}>
        省略表示カテゴリでは、まず比較一覧で全文到達性と密度のバランスを確認し、
        そのあと必要な個別パターンへ進めます。テーブル専用の `cell-truncation`
        は別ページに残し、ここでは generic な判断軸を扱います。
      </p>

      <section className={styles.section}>
        <Heading as="h2">まず比較一覧を見る</Heading>
        <Link className={styles.overviewLink} to="/patterns/ellipsis-display-designs">
          <article className={styles.overviewCard}>
            <span className={styles.cardEyebrow}>比較一覧</span>
            <Heading as="h3" className={styles.cardTitle}>
              省略表示パターン
            </Heading>
            <p className={styles.cardDescription}>
              1行省略、複数行 clamp、全文補足、アクセシブルな開閉を並べて比較できます。
            </p>
            <p className={styles.cardMeta}>
              overview から preview、設計メモ、CSS / TSX 例をまとめて確認
            </p>
          </article>
        </Link>
      </section>

      <section className={styles.section}>
        <Heading as="h2">個別のパターンへ進む</Heading>
        <div className={styles.grid}>
          {ellipsisDisplayPatternEntries.map((entry) => (
            <Link
              className={styles.cardLink}
              key={entry.id}
              to={`/ellipsis-display/${entry.id}`}>
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

      <section className={styles.section}>
        <Heading as="h2">テーブル専用の具体例</Heading>
        <Link className={styles.supportLink} to="/table/cell-truncation">
          <article className={styles.supportCard}>
            <span className={styles.cardEyebrow}>補助リンク</span>
            <Heading as="h3" className={styles.cardTitle}>
              cell-truncation
            </Heading>
            <p className={styles.cardDescription}>
              テーブルの行高と列密度を崩さない具体例は table カテゴリ側に残しています。
            </p>
            <p className={styles.cardMeta}>
              表の文脈で省略表示を使う場合はこちらを参照
            </p>
          </article>
        </Link>
      </section>
    </div>
  );
}
