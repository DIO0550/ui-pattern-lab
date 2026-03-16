import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';

import styles from './styles.module.css';

const tableLinks = tablePatternEntries.map((entry) => ({
  title: entry.title,
  to: `/table/${entry.id}`,
  description: entry.summary,
}));

const buttonDetailLinks = buttonPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/button/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const buttonLinks = [
  {
    title: 'ボタンカテゴリ',
    to: '/button',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  ...buttonDetailLinks,
];

type LinkCard = {
  title: string;
  to: string;
  description: string;
  meta?: string;
};

type CategoryId = 'table' | 'button';

type CategoryCard = {
  id: CategoryId;
  title: string;
  description: string;
  links: LinkCard[];
  expandedMeta: string;
  collapsedMeta: string;
};

const categoryCards: CategoryCard[] = [
  {
    id: 'table',
    title: 'テーブル',
    description:
      'レスポンシブ、横スクロール、固定ヘッダー、省略表示の設計パターンをまとめたカテゴリです。',
    links: tableLinks,
    expandedMeta: 'クリックしてサブカテゴリを閉じる',
    collapsedMeta: 'クリックしてサブカテゴリを表示',
  },
  {
    id: 'button',
    title: 'ボタン',
    description:
      '強調度、状態、危険操作、icon-only、トグル、余白設計を比較できるカテゴリです。',
    links: buttonLinks,
    expandedMeta: 'クリックしてボタン関連の導線を閉じる',
    collapsedMeta: 'クリックしてボタン関連の導線を表示',
  },
];

function NavigationCard({
  title,
  to,
  description,
  meta,
}: LinkCard): ReactNode {
  return (
    <Link className={styles.cardLink} to={to}>
      <article className={styles.card}>
        <span className={styles.cardEyebrow}>リンク</span>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
        {meta ? <p className={styles.cardMeta}>{meta}</p> : null}
      </article>
    </Link>
  );
}

export default function DocsHomeContent(): ReactNode {
  const [openStates, setOpenStates] = useState<Record<CategoryId, boolean>>({
    table: false,
    button: false,
  });

  function toggleCategory(categoryId: CategoryId): void {
    setOpenStates((current) => ({
      ...current,
      [categoryId]: !current[categoryId],
    }));
  }

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <p className={styles.lead}>
          UIパターンラボは、実装時に迷いやすい UI の見せ方を整理して
          比較するためのドキュメントです。
        </p>
        <p className={styles.muted}>
          まずはカテゴリカードを開いて、見たいサブカテゴリへそのまま移動して
          ください。
        </p>
      </div>

      <section className={styles.section}>
        <Heading as="h2">カテゴリ</Heading>
        <div className={styles.categoryGrid}>
          {categoryCards.map((category) => {
            const isOpen = openStates[category.id];
            const controlId = `${category.id}-subcategory-links`;

            return (
              <div className={styles.categoryBlock} key={category.id}>
                <button
                  aria-controls={controlId}
                  aria-expanded={isOpen}
                  className={styles.cardButton}
                  onClick={() => toggleCategory(category.id)}
                  type="button">
                  <article className={styles.card}>
                    <span className={styles.cardEyebrow}>カテゴリ</span>
                    <div className={styles.cardHeaderRow}>
                      <Heading as="h3" className={styles.cardTitle}>
                        {category.title}
                      </Heading>
                      <span className={styles.toggleBadge}>
                        {isOpen ? '開いています' : '閉じています'}
                      </span>
                    </div>
                    <p className={styles.cardDescription}>{category.description}</p>
                    <p className={styles.cardMeta}>
                      {isOpen ? category.expandedMeta : category.collapsedMeta}
                    </p>
                  </article>
                </button>

                <div
                  className={styles.subcategoryGrid}
                  hidden={!isOpen}
                  id={controlId}>
                  {category.links.map((link) => (
                    <NavigationCard key={link.to} {...link} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
