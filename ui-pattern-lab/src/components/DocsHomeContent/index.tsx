import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';
import {checkboxPatternEntries} from '@site/src/data/checkboxPatternEntries';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';
import {groupSelectorPatternEntries} from '@site/src/data/selectorPatternCategories';
import {selectorPatternEntries} from '@site/src/data/selectorPatternEntries';
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

const checkboxDetailLinks = checkboxPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/checkbox/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const ellipsisDisplayDetailLinks = ellipsisDisplayPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/ellipsis-display/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const ellipsisDisplayLinks = [
  {
    title: '省略表示カテゴリ',
    to: '/ellipsis-display',
    description:
      'generic な省略表示カテゴリの入口です。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: '省略表示パターン比較',
    to: '/patterns/ellipsis-display-designs',
    description:
      '1行省略、複数行 clamp、全文補足、アクセシブルな開閉を横断して比較できます。',
    meta: '比較一覧',
  },
  ...ellipsisDisplayDetailLinks,
];

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

const checkboxLinks = [
  {
    title: 'チェックボックスカテゴリ',
    to: '/checkbox',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'チェックボックスパターン比較',
    to: '/patterns/checkbox-designs',
    description:
      'checkbox を radio button / switch / select と比較しながら、使い分けの判断軸を確認できます。',
    meta: '比較一覧',
  },
  ...checkboxDetailLinks,
];

type LinkCard = {
  title: string;
  to: string;
  description: string;
  meta?: string;
};

type LinkSection = {
  title: string;
  links: LinkCard[];
};

type CategoryId = 'table' | 'ellipsis-display' | 'button' | 'checkbox' | 'selector';

type CategoryCard = {
  id: CategoryId;
  title: string;
  description: string;
  links: LinkCard[];
  sections?: LinkSection[];
  expandedMeta: string;
  collapsedMeta: string;
};

const selectorOverviewLinks: LinkCard[] = [
  {
    title: 'セレクタカテゴリ',
    to: '/selector',
    description:
      'カテゴリの入口ページです。family ごとの compare page と detail page への導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'セレクタパターン比較',
    to: '/patterns/selector-designs',
    description:
      'selector 全体の判断ハブです。radio / native select / custom select / combobox / reference family の役割を整理できます。',
    meta: '比較一覧',
  },
  {
    title: 'Custom select 比較',
    to: '/patterns/selector-custom-select-designs',
    description:
      'outline / soft / card の custom select variation を比較できます。',
    meta: 'family 比較',
  },
  {
    title: 'Combobox 比較',
    to: '/patterns/selector-combobox-designs',
    description:
      'baseline / grouped results / empty and loading states を比較できます。',
    meta: 'family 比較',
  },
];

const selectorSections: LinkSection[] = groupSelectorPatternEntries(selectorPatternEntries).map(
  (group) => ({
    title: group.label,
    links: group.entries.map((entry) => ({
      title: entry.title,
      to: `/selector/${entry.id}`,
      description: entry.summary,
      meta:
        entry.id === 'native-select-compact-options' || entry.id === 'combobox-search-and-filter'
          ? 'baseline'
          : entry.entryType === 'reference'
            ? 'reference'
            : '詳細ページ',
    })),
  }),
);

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
    id: 'ellipsis-display',
    title: '省略表示',
    description:
      'list / card / summary / disclosure を横断する generic な省略表示カテゴリです。table 専用の `cell-truncation` は別ページに残しています。',
    links: ellipsisDisplayLinks,
    expandedMeta: 'クリックして省略表示関連の導線を閉じる',
    collapsedMeta: 'クリックして省略表示関連の導線を表示',
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
  {
    id: 'checkbox',
    title: 'チェックボックス',
    description:
      'checkbox を radio button / switch / select と比較しながら、複数選択、カード型 UI、mixed state、モバイルでの押しやすさを確認できるカテゴリです。',
    links: checkboxLinks,
    expandedMeta: 'クリックしてチェックボックス関連の導線を閉じる',
    collapsedMeta: 'クリックしてチェックボックス関連の導線を表示',
  },
  {
    id: 'selector',
    title: 'セレクタ',
    description:
      'フォーム入力として 1 つの値を選ぶ radio / native select / custom select / combobox を family ごとに整理し、states / validation reference へ繋ぐカテゴリです。',
    links: selectorOverviewLinks,
    sections: selectorSections,
    expandedMeta: 'クリックしてセレクタ関連の導線を閉じる',
    collapsedMeta: 'クリックしてセレクタ関連の導線を表示',
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

function CategoryLinks({category}: {category: CategoryCard}): ReactNode {
  if (!category.sections || category.sections.length === 0) {
    return (
      <div className={styles.subcategoryGrid}>
        {category.links.map((link) => (
          <NavigationCard key={link.to} {...link} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.subcategoryStack}>
      <div className={styles.subcategoryGrid}>
        {category.links.map((link) => (
          <NavigationCard key={link.to} {...link} />
        ))}
      </div>
      {category.sections.map((section) => (
        <section className={styles.subcategorySection} key={section.title}>
          <Heading as="h3" className={styles.subcategoryTitle}>
            {section.title}
          </Heading>
          <div className={styles.subcategoryGrid}>
            {section.links.map((link) => (
              <NavigationCard key={link.to} {...link} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function DocsHomeContent(): ReactNode {
  const [openStates, setOpenStates] = useState<Record<CategoryId, boolean>>({
    table: false,
    'ellipsis-display': false,
    button: false,
    checkbox: false,
    selector: false,
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
          UIパターンラボは、実装時に迷いやすい UI の見せ方を整理して比較するためのドキュメントです。
        </p>
        <p className={styles.muted}>
          まずはカテゴリカードを開いて、見たいサブカテゴリへそのまま移動してください。
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

                <div className={styles.subcategoryWrap} hidden={!isOpen} id={controlId}>
                  <CategoryLinks category={category} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
