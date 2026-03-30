import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import SelectorPatternMetadataPanel from '@site/src/components/SelectorPatternMetadataPanel';
import PatternReferenceContent from '@site/src/components/PatternReferenceContent';
import SelectorPatternSnippetPanel from '@site/src/components/SelectorPatternSnippetPanel';
import type {
  SelectorPatternEntry,
  SelectorPatternMetadataItem,
} from '@site/src/data/selectorPatternTypes';

import {demoRegistry} from './demoRegistry';
import {
  statesAndValidationGuides,
  statesAndValidationReferenceVariants,
} from './demos/StatesAndValidationDemo';
import styles from './styles.module.css';

type Props = {
  entries: SelectorPatternEntry[];
  density: 'list' | 'detail';
};

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">selector パターンはまだありません</Heading>
      <p>ギャラリーの受け皿はできていますが、比較対象のエントリはまだ登録されていません。</p>
    </div>
  );
}

/**
 * Keeps reference-style entries after control-specific entries in overview lists.
 */
function sortEntriesByType(entries: SelectorPatternEntry[]): SelectorPatternEntry[] {
  return [...entries].sort((left, right) => {
    if (left.entryType === right.entryType) {
      return 0;
    }

    return left.entryType === 'reference' ? 1 : -1;
  });
}

/**
 * Builds the metadata panel content shown alongside each selector preview.
 */
function buildMetadataItems(entry: SelectorPatternEntry): SelectorPatternMetadataItem[] {
  return [
    {label: '課題', tone: 'problem', value: entry.problem},
    {label: '解決方法', tone: 'solution', value: entry.solution},
    {label: '使いどころ', tone: 'usage', value: entry.whenToUse},
    {
      label: '他コントロールを選ぶ目安',
      tone: 'comparison',
      value: entry.comparisonTip,
    },
    {label: 'レイアウト', tone: 'layout', value: entry.layoutNotes},
    {label: '状態設計', tone: 'state', value: entry.stateNotes},
    {
      label: 'アクセシビリティ',
      tone: 'accessibility',
      value: entry.accessibilityNotes,
    },
  ];
}

export default function SelectorPatternGallery({entries, density}: Props): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  const sortedEntries = sortEntriesByType(entries);

  return (
    <section aria-label="セレクタデザインパターンギャラリー" className={styles.root}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {sortedEntries.map((entry) => {
          const Demo = demoRegistry[entry.demoKind];
          const metadataItems = buildMetadataItems(entry);
          const detailNotes = metadataItems.map((item) => ({
            id: `${entry.id}-${item.tone}`,
            label: item.label,
            value: item.value,
          }));
          const referenceBadge =
            entry.entryType === 'reference' ? (
              <span className={styles.referenceBadge}>共通品質リファレンス</span>
            ) : null;

          if (density === 'detail') {
            if (entry.id === 'states-and-validation') {
              return (
                <div className={styles.detailContent} id={entry.id} key={entry.id}>
                  <PatternReferenceContent
                    guides={statesAndValidationGuides}
                    notes={detailNotes}
                    variantNote={entry.snippets?.snippetSummary}
                    variants={statesAndValidationReferenceVariants}
                  />
                </div>
              );
            }

            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
                <PatternReferenceContent
                  id={entry.id}
                  notes={detailNotes}
                  preview={
                    <div className={clsx(styles.demoPanel, styles.detailPreviewPanel)}>
                      <Demo />
                    </div>
                  }
                  snippets={entry.snippets}
                  summary={entry.summary}
                  title={entry.title}
                />
              </div>
            );
          }

          return (
            <article className={styles.card} id={entry.id} key={entry.id}>
              <div className={styles.cardHeader}>
                <div className={styles.entryHeader}>
                  <Heading as="h3" className={styles.cardTitle}>
                    {entry.title}
                  </Heading>
                  {referenceBadge}
                </div>
                <p className={styles.cardSummary}>{entry.summary}</p>
                <ul aria-label={`${entry.title}のタグ`} className={styles.tagList}>
                  {entry.tags.map((tag) => (
                    <li className={styles.tag} key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.demoPanel}>
                <Demo />
              </div>

              <SelectorPatternSnippetPanel
                density={density}
                entryId={entry.id}
                entryTitle={entry.title}
                snippets={entry.snippets}
              />

              <SelectorPatternMetadataPanel
                density={density}
                entryTitle={entry.title}
                items={metadataItems}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
