import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {accordionPatternEntries} from '@site/src/data/accordionPatternEntries';
import {alertPatternEntries} from '@site/src/data/alertPatternEntries';
import {badgePatternEntries} from '@site/src/data/badgePatternEntries';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';
import {checkboxPatternEntries} from '@site/src/data/checkboxPatternEntries';
import {controllerPatternEntries} from '@site/src/data/controllerPatternEntries';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';
import {inputPatternEntries} from '@site/src/data/inputPatternEntries';
import {listPatternEntries} from '@site/src/data/listPatternEntries';
import {paginationPatternEntries} from '@site/src/data/paginationPatternEntries';
import {progressPatternEntries} from '@site/src/data/progressPatternEntries';
import {groupSelectorPatternEntries} from '@site/src/data/selectorPatternCategories';
import {selectorPatternEntries} from '@site/src/data/selectorPatternEntries';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';
import {tabsPatternEntries} from '@site/src/data/tabsPatternEntries';

import styles from './styles.module.css';

const tableLinks = tablePatternEntries.map((entry) => ({
  title: entry.title,
  to: `/table/${entry.id}`,
  description: entry.summary,
}));

const listDetailLinks = listPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/list/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const listLinks = [
  {
    title: 'リストカテゴリ',
    to: '/list',
    description:
      'カテゴリの入口ページです。list の比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'リストパターン比較',
    to: '/patterns/list-designs',
    description:
      'plain / divided / card list を style、item content、behavior の判断軸で比較できます。',
    meta: '比較一覧',
  },
  ...listDetailLinks,
];

const buttonDetailLinks = buttonPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/button/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const badgeDetailLinks = badgePatternEntries.map((entry) => ({
  title: entry.title,
  to: `/badge/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const alertDetailLinks = alertPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/alert/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const checkboxDetailLinks = checkboxPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/checkbox/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const progressDetailLinks = progressPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/progress/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const paginationDetailLinks = paginationPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/pagination/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const tabsDetailLinks = tabsPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/tabs/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const controllerDetailLinks = controllerPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/controller/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const ellipsisDisplayDetailLinks = ellipsisDisplayPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/ellipsis-display/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const accordionDetailLinks = accordionPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/accordion/${entry.id}`,
  description: entry.summary,
  meta: '詳細ページ',
}));

const ellipsisDisplayLinks = [
  {
    title: '表示制限カテゴリ',
    to: '/ellipsis-display',
    description:
      'list / card / summary / disclosure を横断する generic な表示制限カテゴリの入口です。compare と detail の導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: '表示制限パターン比較',
    to: '/patterns/ellipsis-display-designs',
    description:
      '1行省略、複数行 clamp、全文補足、アクセシブルな開閉を行動パターンとして比較できます。',
    meta: '比較一覧',
  },
  ...ellipsisDisplayDetailLinks,
];

const accordionLinks = [
  {
    title: 'アコーディオンカテゴリ',
    to: '/accordion',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'アコーディオンパターン比較',
    to: '/patterns/accordion-designs',
    description:
      '単一開閉 / 複数開閉 / カード型 / FAQ 型を比較し、情報を畳む範囲と見出し設計を整理できます。',
    meta: '比較一覧',
  },
  ...accordionDetailLinks,
];

const buttonLinks = [
  {
    title: 'ボタンカテゴリ',
    to: '/button',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'ボタンパターン比較',
    to: '/patterns/button-designs',
    description:
      '強調度、状態、ボタングループ、ツールバー、余白設計を横断して見比べられます。',
    meta: '比較一覧',
  },
  ...buttonDetailLinks,
];

const badgeLinks = [
  {
    title: 'バッジカテゴリ',
    to: '/badge',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'バッジパターン比較',
    to: '/patterns/badge-designs',
    description:
      'Filled / Outlined / Soft / Surface の違いと、色や件数表示の収まりを比較できます。',
    meta: '比較一覧',
  },
  ...badgeDetailLinks,
];

const alertLinks = [
  {
    title: 'アラートカテゴリ',
    to: '/alert',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'アラートパターン比較',
    to: '/patterns/alert-designs',
    description:
      'severity、visual style、behavior を分けて、ページ内に残る feedback を比較できます。',
    meta: '比較一覧',
  },
  ...alertDetailLinks,
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

const progressLinks = [
  {
    title: 'プログレスカテゴリ',
    to: '/progress',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'プログレスパターン比較',
    to: '/patterns/progress-designs',
    description:
      'linear / circular determinate、indeterminate、spinner、skeleton、stepper を 5 軸で比較できます。',
    meta: '比較一覧',
  },
  ...progressDetailLinks,
];

const paginationLinks = [
  {
    title: 'ページネーションカテゴリ',
    to: '/pagination',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'ページネーションパターン比較',
    to: '/patterns/pagination-designs',
    description:
      'page numbers / load more / infinite scroll を比較し、page size control の適用範囲も整理できます。',
    meta: '比較一覧',
  },
  ...paginationDetailLinks,
];

const tabsLinks = [
  {
    title: 'タブカテゴリ',
    to: '/tabs',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: 'タブパターン比較',
    to: '/patterns/tabs-designs',
    description:
      '下線型 / ピル型 / ボックス型 / 縦型を比較し、panel 切り替えとしての適材適所を整理できます。',
    meta: '比較一覧',
  },
  ...tabsDetailLinks,
];

const controllerLinks = [
  {
    title: '表示制御カテゴリ',
    to: '/controller',
    description:
      'カテゴリの入口ページです。比較一覧と個別の詳細ページへの導線をまとめて確認できます。',
    meta: 'カテゴリページ',
  },
  {
    title: '表示制御パターン比較',
    to: '/patterns/controller-designs',
    description:
      'view switch、scope control、continuous adjustment の観点から、6 つの controller pattern を比較できます。',
    meta: '比較一覧',
  },
  ...controllerDetailLinks,
];

const inputDetailLinks = inputPatternEntries.map((entry) => ({
  title: entry.title,
  to: `/input/${entry.id}`,
  description: entry.description,
  meta: '詳細ページ',
}));

const inputLinks = [
  {
    title: 'テキストフィールドカテゴリ',
    to: '/input',
    description:
      `カテゴリの入口ページです。UI ライブラリ風の自作テキストフィールドデザイン ${inputPatternEntries.length} 件と関連導線をまとめて確認できます。`,
    meta: 'カテゴリページ',
  },
  {
    title: '自作テキストフィールドデザイン',
    to: '/patterns/input-designs',
    description:
      'アウトライン型 / フィルド型 / アンダーライン型 / ボーダーレス型 / ピル型 を preview / TSX / CSS つきで一覧できます。',
    meta: '一覧ページ',
  },
  ...inputDetailLinks,
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

type QuickStartCard = LinkCard & {
  eyebrow: string;
};

type CategoryId =
  | 'table'
  | 'list'
  | 'ellipsis-display'
  | 'accordion'
  | 'button'
  | 'badge'
  | 'alert'
  | 'checkbox'
  | 'selector'
  | 'progress'
  | 'controller'
  | 'pagination'
  | 'tabs'
  | 'input';

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
    id: 'list',
    title: 'リスト',
    description:
      'plain / divided / card の見せ方を比較し、message list、settings list、notification list の使い分けを確認できるカテゴリです。',
    links: listLinks,
    expandedMeta: 'クリックしてリスト関連の導線を閉じる',
    collapsedMeta: 'クリックしてリスト関連の導線を表示',
  },
  {
    id: 'ellipsis-display',
    title: '表示制限',
    description:
      'list / card / summary / disclosure を横断する generic な表示制限カテゴリです。compare では行動パターン、detail では visual variation を扱います。',
    links: ellipsisDisplayLinks,
    expandedMeta: 'クリックして表示制限関連の導線を閉じる',
    collapsedMeta: 'クリックして表示制限関連の導線を表示',
  },
  {
    id: 'accordion',
    title: 'アコーディオン',
    description:
      '見出し単位で本文を開閉し、FAQ、設定、仕様詳細などを段階的に読ませるカテゴリです。',
    links: accordionLinks,
    expandedMeta: 'クリックしてアコーディオン関連の導線を閉じる',
    collapsedMeta: 'クリックしてアコーディオン関連の導線を表示',
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
    id: 'badge',
    title: 'バッジ',
    description:
      '補足ラベルとしての badge を扱い、variant、色、件数表示の収まりを比較できるカテゴリです。',
    links: badgeLinks,
    expandedMeta: 'クリックしてバッジ関連の導線を閉じる',
    collapsedMeta: 'クリックしてバッジ関連の導線を表示',
  },
  {
    id: 'alert',
    title: 'アラート',
    description:
      'ページ内に残る feedback を扱い、severity、visual style、behavior の責務を分けて確認できるカテゴリです。',
    links: alertLinks,
    expandedMeta: 'クリックしてアラート関連の導線を閉じる',
    collapsedMeta: 'クリックしてアラート関連の導線を表示',
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
  {
    id: 'progress',
    title: 'プログレス',
    description:
      'linear / circular determinate、indeterminate、spinner、skeleton、stepper を比較し、known total・layout 保持・適用スコープの違いを確認できるカテゴリです。',
    links: progressLinks,
    expandedMeta: 'クリックしてプログレス関連の導線を閉じる',
    collapsedMeta: 'クリックしてプログレス関連の導線を表示',
  },
  {
    id: 'controller',
    title: '表示制御',
    description:
      '画面上の内容や view state をその場で切り替える UI を比較し、button / selector / table / progress との責務境界を確認できるカテゴリです。',
    links: controllerLinks,
    expandedMeta: 'クリックして表示制御関連の導線を閉じる',
    collapsedMeta: 'クリックして表示制御関連の導線を表示',
  },
  {
    id: 'pagination',
    title: 'ページネーション',
    description:
      'page numbers / load more / infinite scroll を比較し、位置把握・追加読込・footer 到達性・page size control の違いを確認できるカテゴリです。',
    links: paginationLinks,
    expandedMeta: 'クリックしてページネーション関連の導線を閉じる',
    collapsedMeta: 'クリックしてページネーション関連の導線を表示',
  },
  {
    id: 'tabs',
    title: 'タブ',
    description:
      '下線型、ピル型、ボックス型、縦型を比較し、同一ページ内の panel 切り替えとしての tabs を確認できるカテゴリです。',
    links: tabsLinks,
    expandedMeta: 'クリックしてタブ関連の導線を閉じる',
    collapsedMeta: 'クリックしてタブ関連の導線を表示',
  },
  {
    id: 'input',
    title: 'テキストフィールド',
    description:
      'CSS module まで含めた自作テキストフィールドデザインを集約し、hover / focus / error / disabled を含む state 表現を比較するカテゴリです。',
    links: inputLinks,
    expandedMeta: 'クリックしてテキストフィールド関連の導線を閉じる',
    collapsedMeta: 'クリックしてテキストフィールド関連の導線を表示',
  },
];

const quickStartCards: readonly QuickStartCard[] = [
  {
    eyebrow: '比較の入口',
    title: 'ボタンの判断軸から入る',
    to: '/patterns/button-designs',
    description: '強調度、状態、グルーピング、ツールバー構成、余白設計をまとめて見比べる代表的な比較ページです。',
    meta: '主要カテゴリ',
  },
  {
    eyebrow: 'フォーム選択',
    title: 'セレクタの選び方を整理する',
    to: '/patterns/selector-designs',
    description:
      'radio / native select / custom select / combobox を比較軸から選び分けられます。',
    meta: '比較ハブ',
  },
  {
    eyebrow: 'view state',
    title: '表示制御パターンを見る',
    to: '/patterns/controller-designs',
    description:
      'segmented control、tabs、pagination、range slider の責務境界を整理できます。',
    meta: '導線を把握',
  },
  {
    eyebrow: '閲覧状態',
    title: 'ページネーションを比較する',
    to: '/patterns/pagination-designs',
    description:
      'page numbers / load more / infinite scroll を見比べ、page size control をどこへ置くか整理できます。',
    meta: '新規カテゴリ',
  },
] as const;

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
    <section className={clsx(styles.accordionItem, isOpen && styles.accordionItemOpen)}>
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
            <span className={clsx(styles.accordionStatus, isOpen && styles.accordionStatusOpen)}>
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
  const totalRouteCount = categoryCards.reduce((count, category) => {
    const sectionRouteCount =
      category.sections?.reduce((sectionCount, section) => sectionCount + section.links.length, 0) ?? 0;

    return count + category.links.length + sectionRouteCount;
  }, 0);
  const introHighlights = [
    {
      label: '収録カテゴリ',
      value: `${categoryCards.length} categories`,
      description: 'ページネーション、テキストフィールド、表示制御、table、ellipsis まで横断して確認できます。',
    },
    {
      label: '導線の深さ',
      value: `${totalRouteCount} routes`,
      description: '比較ページと詳細ページを行き来しながら、必要な深さまで掘り下げられます。',
    },
    {
      label: '確認観点',
      value: 'Light / Dark / Responsive',
      description: 'コード例、長い日本語、カード一覧を含む docs として読みやすさを保ちます。',
    },
  ] as const;

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
        <div className={styles.introBody}>
          <span className={styles.introEyebrow}>比較から入る UI リファレンス</span>
          <Heading as="h1" className={styles.introTitle}>
            UIパターン比較ガイド
          </Heading>
          <p className={styles.lead}>
            UIパターンラボは、実装時に迷いやすい UI の見せ方を比較しながら選ぶためのドキュメントです。
            まずは比較ページで判断軸を整理し、必要になったところだけ詳細ページで preview とコードを確認できます。
          </p>
          <p className={styles.muted}>
            気になるカテゴリを開くか、よく使う入口から見始めてください。比較、詳細、関連カテゴリを往復しながら、
            light / dark や長い日本語テキストまで含めて確認しやすい構成にしています。
          </p>
        </div>

        <div className={styles.introMetaGrid}>
          {introHighlights.map((highlight) => (
            <article className={styles.introMetaCard} key={highlight.label}>
              <span className={styles.introMetaLabel}>{highlight.label}</span>
              <strong className={styles.introMetaValue}>{highlight.value}</strong>
              <p className={styles.introMetaDescription}>{highlight.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.introCardGrid}>
          {quickStartCards.map((card) => (
            <Link className={styles.cardLink} key={card.to} to={card.to}>
              <article className={styles.card}>
                <span className={styles.cardEyebrow}>{card.eyebrow}</span>
                <Heading as="h2" className={styles.cardTitle}>
                  {card.title}
                </Heading>
                <p className={styles.cardDescription}>{card.description}</p>
                {card.meta ? <p className={styles.cardMeta}>{card.meta}</p> : null}
              </article>
            </Link>
          ))}
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Heading as="h2">カテゴリから探す</Heading>
          <p className={styles.sectionLead}>
            カテゴリごとの入口、比較ページ、詳細ページを single-open accordion でまとめています。
            閉じた状態でも内容の輪郭が分かるようにしつつ、開いたらそのまま次の導線へ進めます。
          </p>
        </div>
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
