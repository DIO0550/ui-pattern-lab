import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';

import styles from './styles.module.css';

const tableLinks = tablePatternEntries.map((entry) => ({
  title: entry.title,
  to: `/table/${entry.id}`,
  description: entry.summary,
}));

type LinkCard = {
  title: string;
  to: string;
  description: string;
  meta?: string;
};

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
  const [isTableOpen, setIsTableOpen] = useState(false);

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
        <button
          aria-controls="table-subcategory-links"
          aria-expanded={isTableOpen}
          className={styles.cardButton}
          onClick={() => setIsTableOpen((current) => !current)}
          type="button">
          <article className={styles.card}>
            <span className={styles.cardEyebrow}>カテゴリ</span>
            <div className={styles.cardHeaderRow}>
              <Heading as="h3" className={styles.cardTitle}>
                テーブル
              </Heading>
              <span className={styles.toggleBadge}>
                {isTableOpen ? '開いています' : '閉じています'}
              </span>
            </div>
            <p className={styles.cardDescription}>
              レスポンシブ、横スクロール、固定ヘッダー、省略表示の設計パターン
              をまとめたカテゴリです。
            </p>
            <p className={styles.cardMeta}>
              {isTableOpen
                ? 'クリックしてサブカテゴリを閉じる'
                : 'クリックしてサブカテゴリを表示'}
            </p>
          </article>
        </button>

        {isTableOpen ? (
          <div className={styles.grid} id="table-subcategory-links">
            {tableLinks.map((link) => (
              <NavigationCard key={link.to} {...link} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
