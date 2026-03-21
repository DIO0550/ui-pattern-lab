import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
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

type NavigationListItemProps = LinkCard;

/**
 * Renders a single navigation row inside an expanded category panel.
 */
function NavigationListItem({
  title,
  to,
  description,
  meta,
}: NavigationListItemProps): ReactNode {
  return (
    <Link className={styles.listLink} to={to}>
      <article className={styles.listLinkCard}>
        <div className={styles.listLinkHeaderRow}>
          <span className={styles.listLinkTitle}>{title}</span>
          {meta ? <span className={styles.listLinkMeta}>{meta}</span> : null}
        </div>
        <p className={styles.listLinkDescription}>{description}</p>
      </article>
    </Link>
  );
}

type CategoryLinksProps = {
  category: CategoryCard;
};

/**
 * Renders the expanded navigation content for one home category.
 */
function CategoryLinks({category}: CategoryLinksProps): ReactNode {
  if (!category.sections || category.sections.length === 0) {
    return (
      <div className={styles.linkStack}>
        {category.links.map((link) => (
          <NavigationListItem key={link.to} {...link} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.linkGroupStack}>
      <div className={styles.linkStack}>
        {category.links.map((link) => (
          <NavigationListItem key={link.to} {...link} />
        ))}
      </div>
      {category.sections.map((section) => (
        <section className={styles.linkSection} key={section.title}>
          <Heading as="h4" className={styles.linkSectionTitle}>
            {section.title}
          </Heading>
          <div className={styles.linkStack}>
            {section.links.map((link) => (
              <NavigationListItem key={link.to} {...link} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

type CategoryAccordionItemProps = {
  category: CategoryCard;
  isOpen: boolean;
  onToggle: (categoryId: CategoryId) => void;
};

/**
 * Renders one top-level category as a single-open accordion item.
 */
function CategoryAccordionItem({
  category,
  isOpen,
  onToggle,
}: CategoryAccordionItemProps): ReactNode {
  const buttonId = `${category.id}-category-trigger`;
  const panelId = `${category.id}-category-panel`;

  return (
    <section className={styles.accordionItem}>
      <Heading as="h3" className={styles.accordionHeading}>
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className={styles.accordionTrigger}
          id={buttonId}
          onClick={() => onToggle(category.id)}
          type="button">
          <span className={styles.accordionLabel}>カテゴリ</span>
          <span className={styles.accordionHeaderRow}>
            <span className={styles.accordionTitle}>{category.title}</span>
            <span className={styles.accordionStatus}>
              {isOpen ? '開いています' : '閉じています'}
            </span>
          </span>
          <span className={styles.accordionDescription}>{category.description}</span>
          <span className={styles.accordionMetaRow}>
            <span className={styles.accordionMetaText}>
              {isOpen ? category.expandedMeta : category.collapsedMeta}
            </span>
            <span
              aria-hidden="true"
              className={clsx(
                styles.accordionChevron,
                isOpen && styles.accordionChevronOpen,
              )}>
              ▾
            </span>
          </span>
        </button>
      </Heading>

      <div
        aria-hidden={!isOpen}
        aria-labelledby={buttonId}
        className={clsx(styles.accordionPanel, isOpen && styles.accordionPanelOpen)}
        id={panelId}
        role="region">
        <div className={styles.accordionPanelInner}>
          <div className={styles.accordionPanelContent}>
            <CategoryLinks category={category} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Renders the top-level home navigation for all pattern categories.
 */
export default function DocsHomeContent(): ReactNode {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | null>(null);

  function toggleCategory(categoryId: CategoryId): void {
    setActiveCategoryId((currentCategoryId) => {
      if (currentCategoryId === categoryId) {
        return null;
      }

      return categoryId;
    });
  }

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <p className={styles.lead}>
          UIパターンラボは、実装時に迷いやすい UI の見せ方を整理して比較するためのドキュメントです。
        </p>
        <p className={styles.muted}>
          まずは気になるカテゴリを開いて、見たいサブカテゴリや比較一覧へそのまま進んでください。
        </p>
      </div>

      <section className={styles.section}>
        <Heading as="h2">カテゴリ</Heading>
        <div className={styles.categoryGrid}>
          {categoryCards.map((category) => (
            <CategoryAccordionItem
              category={category}
              isOpen={activeCategoryId === category.id}
              key={category.id}
              onToggle={toggleCategory}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
