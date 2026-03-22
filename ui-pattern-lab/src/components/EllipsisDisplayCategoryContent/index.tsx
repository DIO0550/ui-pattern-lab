import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
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
        <PatternCatalogCard
          badge={`${ellipsisDisplayPatternEntries.length}件`}
          description="1行省略、複数行 clamp、全文補足、アクセシブルな開閉の判断軸を横断で比較できます。"
          eyebrow="比較一覧"
          meta="overview から preview、設計メモ、CSS / TSX 例をまとめて確認"
          title="省略表示パターン"
          titleId="ellipsis-display-compare-title"
          to="/patterns/ellipsis-display-designs"
          variant="featured"
        />
      </section>

      <section className={styles.section}>
        <Heading as="h2">個別のパターンへ進む</Heading>
        <div className={styles.grid}>
          {ellipsisDisplayPatternEntries.map((entry) => (
            <PatternCatalogCard
              description={entry.summary}
              eyebrow="詳細ページ"
              key={entry.id}
              title={entry.title}
              to={`/ellipsis-display/${entry.id}`}
              variant="default"
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Heading as="h2">テーブル専用の具体例</Heading>
        <PatternCatalogCard
          className={styles.supportCard}
          description="テーブルの行高と列密度を崩さない具体例は table カテゴリ側に残しています。"
          eyebrow="補助リンク"
          meta="表の文脈で省略表示を使う場合はこちらを参照"
          title="cell-truncation"
          to="/table/cell-truncation"
          tone="muted"
          variant="default"
        />
      </section>
    </div>
  );
}
