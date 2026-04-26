import type {ReactNode} from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import PaginationInfiniteScrollDemo from '@site/src/components/PaginationInfiniteScrollDemo';
import PaginationLoadMoreDemo from '@site/src/components/PaginationLoadMoreDemo';
import PaginationPageNumbersDemo from '@site/src/components/PaginationPageNumbersDemo';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import type {
  PaginationDemoKind,
  PaginationDemoProps,
  PaginationPatternEntry,
  PaginationPatternMetadataItem,
  PaginationPatternSnippets,
} from '@site/src/data/paginationPatternTypes';

import styles from './styles.module.css';

type Props = {
  entries: PaginationPatternEntry[];
  density: 'list' | 'detail';
};

type DemoRenderer = (props: PaginationDemoProps) => ReactNode;

type SnippetTabsProps = {
  snippets?: PaginationPatternSnippets;
};

const demoLabelByKind = {
  'page-numbers-search': {
    name: 'search result',
    description: '検索結果一覧で page numbers と page size control を並べる例です。',
  },
  'page-numbers-table': {
    name: 'table',
    description: '列見出しを持つ table の下で現在位置と件数要約を保つ例です。',
  },
  'page-numbers-admin-list': {
    name: 'admin list',
    description: 'status や owner を持つ管理一覧で page size control を含める例です。',
  },
  'load-more-demo': {
    name: 'append preview',
    description: '追加読込ボタン、loading、error、end を一覧末尾で扱う例です。',
  },
  'infinite-scroll-demo': {
    name: 'contained scroll',
    description: 'contained scroll area で自動追加読込の状態差分を確認する例です。',
  },
} as const satisfies Record<PaginationDemoKind, {name: string; description: string}>;

const listPreviewStateByKind = {
  'page-numbers-search': 'middle-page',
  'page-numbers-table': 'middle-page',
  'page-numbers-admin-list': 'middle-page',
  'load-more-demo': undefined,
  'infinite-scroll-demo': undefined,
} as const;

const demoByKind = {
  'page-numbers-search': (props) => (
    <PaginationPageNumbersDemo context="search" {...props} />
  ),
  'page-numbers-table': (props) => <PaginationPageNumbersDemo context="table" {...props} />,
  'page-numbers-admin-list': (props) => (
    <PaginationPageNumbersDemo context="admin-list" {...props} />
  ),
  'load-more-demo': (props) => <PaginationLoadMoreDemo {...props} />,
  'infinite-scroll-demo': (props) => <PaginationInfiniteScrollDemo {...props} />,
} satisfies Record<PaginationDemoKind, DemoRenderer>;

function buildMetadataItems(entry: PaginationPatternEntry): PaginationPatternMetadataItem[] {
  return [
    {
      label: '課題',
      value: entry.problem,
      tone: 'problem',
    },
    {
      label: '使いどころ',
      value: entry.whenToUse,
      tone: 'usage',
    },
    {
      label: 'page size control',
      value: entry.exposesPageSizeControl
        ? 'user-facing な page size control を含めるのはこの pattern のみです。'
        : 'page size selector は含めず、batch size は説明テキストに留めます。',
      tone: 'comparison',
    },
    {
      label: '比較メモ',
      value: entry.comparisonTip,
      tone: 'comparison',
    },
    {
      label: '解決方法',
      value: entry.solution,
      tone: 'solution',
    },
    {
      label: 'レイアウト',
      value: entry.layoutNotes,
      tone: 'layout',
    },
    {
      label: '状態設計',
      value: entry.stateNotes,
      tone: 'state',
    },
    {
      label: 'アクセシビリティ',
      value: entry.accessibilityNotes,
      tone: 'accessibility',
    },
  ];
}

function SnippetTabs({snippets}: SnippetTabsProps): ReactNode {
  const items = snippets?.items ?? [];

  if (items.length === 0) {
    return <p className={styles.emptyMessage}>実装例は準備中です。</p>;
  }

  if (items.length === 1) {
    return (
      <div className={styles.codeItem}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLabel}>{items[0].label}</span>
        </div>
        <div className={styles.codePanel}>
          <CodeBlock language={items[0].language}>{items[0].code}</CodeBlock>
        </div>
        {items[0].note ? <p className={styles.codeNote}>{items[0].note}</p> : null}
      </div>
    );
  }

  return (
    <Tabs className={styles.tabs} defaultValue={items[0].id}>
      {items.map((item) => (
        <TabItem key={item.id} label={item.label} value={item.id}>
          <div className={styles.codeItem}>
            <div className={styles.codePanel}>
              <CodeBlock language={item.language}>{item.code}</CodeBlock>
            </div>
            {item.note ? <p className={styles.codeNote}>{item.note}</p> : null}
          </div>
        </TabItem>
      ))}
    </Tabs>
  );
}

function PreviewByDemoKind({
  density,
  demoKind,
  previewState,
}: PaginationDemoProps & {demoKind: PaginationDemoKind}): ReactNode {
  const Renderer = demoByKind[demoKind];

  return <Renderer density={density} previewState={previewState} />;
}

function buildVariantNote(entry: PaginationPatternEntry): string {
  if (entry.id === 'page-numbers') {
    return 'search result / table / admin list を 1 variant block : 1 code panel で分離し、page size control は page numbers にのみ含めます。';
  }

  if (entry.id === 'load-more') {
    return 'loading / error / end を末尾の操作面でまとめて確認し、chunk size は説明のみ・selector なしで扱います。';
  }

  return 'contained scroll area と fallback action を同じ variant 内で見せ、auto append の弱点も補助文で明示します。';
}

function buildReferenceVariants(entry: PaginationPatternEntry): readonly PatternReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return entry.demoKinds.map((demoKind) => ({
    id: `${entry.id}-${demoKind}`,
    name: demoLabelByKind[demoKind].name,
    description: demoLabelByKind[demoKind].description,
    preview: (
      <div className={styles.referencePreview}>
        <PreviewByDemoKind demoKind={demoKind} density="detail" />
      </div>
    ),
    previewClassName: styles.referencePreviewWide,
    tabs,
  }));
}

export default function PaginationPatternGallery({entries, density}: Props): ReactNode {
  if (entries.length === 0) {
    return <p className={styles.emptyState}>表示できる pagination pattern がありません。</p>;
  }

  if (density === 'detail') {
    return (
      <div className={clsx(styles.root, styles.detailRoot)}>
        {entries.map((entry) => {
          const metadataItems = buildMetadataItems(entry);

          return (
            <div className={styles.detailContent} id={entry.id} key={entry.id}>
              <PatternReferenceContent
                notes={metadataItems.map((item) => ({
                  id: `${entry.id}-${item.label}`,
                  label: item.label,
                  value: item.value,
                }))}
                variantNote={buildVariantNote(entry)}
                variantSectionLabel={entry.demoKinds.length > 1 ? 'コンテキスト' : 'プレビュー'}
                variants={buildReferenceVariants(entry)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {entries.map((entry) => {
          const metadataItems = buildMetadataItems(entry).slice(0, 4);
          const featuredDemoKind = entry.demoKinds[0];

          if (!featuredDemoKind) {
            return null;
          }

          return (
            <article className={styles.card} key={entry.id}>
              <header className={styles.cardHeader}>
                <div>
                  <Heading as="h3" className={styles.cardTitle}>
                    {entry.title}
                  </Heading>
                  <p className={styles.cardSummary}>{entry.summary}</p>
                </div>
                <ul className={styles.tagList}>
                  {entry.tags.map((tag) => (
                    <li className={styles.tag} key={`${entry.id}-${tag}`}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </header>

              <div className={styles.cardBody}>
                <div className={styles.previewSurface}>
                  <PreviewByDemoKind
                    demoKind={featuredDemoKind}
                    density="list"
                    previewState={listPreviewStateByKind[featuredDemoKind]}
                  />
                </div>

                <section aria-label={`${entry.title}の設計メモ`} className={styles.metadataSection}>
                  <dl className={styles.metadataList}>
                    {metadataItems.map((item) => (
                      <div className={clsx(styles.metadataItem, styles[item.tone])} key={item.label}>
                        <dt className={styles.metadataLabel}>{item.label}</dt>
                        <dd className={styles.metadataValue}>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <div aria-label={`${entry.title}のCSS / TSXサンプル`} className={styles.snippetSection}>
                  <details className={styles.details}>
                    <summary className={styles.summary}>
                      <span className={styles.summaryHeader}>
                        <span className={styles.summaryLabel}>CSS / TSX サンプルを見る</span>
                        <span aria-hidden="true" className={styles.summaryIndicator}>
                          ▾
                        </span>
                      </span>
                      <span className={styles.summaryText}>{entry.snippets?.snippetSummary}</span>
                    </summary>
                    <div className={styles.snippetContent}>
                      <SnippetTabs snippets={entry.snippets} />
                    </div>
                  </details>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
