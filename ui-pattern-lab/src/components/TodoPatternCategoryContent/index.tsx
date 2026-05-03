import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';
import {
  type TodoPatternCategoryId,
  todoPatternCategoryMap,
} from '@site/src/data/todoPatternData';

import styles from './styles.module.css';

type Props = {
  categoryId: TodoPatternCategoryId;
};

/** Renders a compact category landing page for newly promoted TODO patterns. */
export default function TodoPatternCategoryContent({categoryId}: Props): ReactNode {
  const category = todoPatternCategoryMap[categoryId];

  return (
    <main className={styles.root}>
      <section className={`container margin-vert--xl ${styles.hero}`}>
        <div>
          <p className={styles.eyebrow}>UI パターン</p>
          <Heading as="h1" className={styles.title}>
            {category.label}
          </Heading>
          <p className={styles.summary}>{category.summary}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryLink} to={category.comparePath}>
              比較ページを見る
            </Link>
          </div>
        </div>
        <aside className={styles.scopePanel} aria-label="対象スコープ">
          <p className={styles.panelLabel}>対象スコープ</p>
          <ul className={styles.scopeList}>
            {category.scope.map((scope) => (
              <li key={scope}>{scope}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={`container margin-bottom--xl ${styles.cardSection}`}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>詳細ページ</p>
          <Heading as="h2">バリアントとコード</Heading>
        </div>
        <div className={styles.grid}>
          {category.entries.map((entry) => (
            <PatternCatalogCard
              badge={entry.tags[0]}
              description={entry.summary}
              eyebrow="リファレンス"
              key={entry.id}
              meta={entry.tags.slice(1).join(' / ')}
              title={entry.title}
              to={`/${category.slug}/${entry.id}`}
              variant="default"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
