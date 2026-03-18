import type {ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import EllipsisDisplayPatternSectionCard from '@site/src/components/EllipsisDisplayPatternSectionCard';
import type {
  EllipsisDisplayPatternSnippetItem,
  EllipsisDisplayPatternSnippets,
} from '@site/src/data/ellipsisDisplayPatternTypes';

import styles from './styles.module.css';

type EllipsisDisplayPatternSnippetPanelProps = {
  snippets?: EllipsisDisplayPatternSnippets;
  density: 'list' | 'detail';
  entryTitle: string;
};

type SnippetItemContentProps = {
  item: EllipsisDisplayPatternSnippetItem;
  showLabel: boolean;
};

type SnippetCollectionProps = {
  items: EllipsisDisplayPatternSnippetItem[];
};

function SnippetItemContent({
  item,
  showLabel,
}: SnippetItemContentProps): ReactNode {
  return (
    <div className={styles.codeItem}>
      {showLabel ? (
        <div className={styles.codeHeader}>
          <span className={styles.codeLabel}>{item.label}</span>
        </div>
      ) : null}
      <div className={styles.codePanel}>
        <CodeBlock language={item.language}>{item.code}</CodeBlock>
      </div>
      {item.note ? <p className={styles.note}>{item.note}</p> : null}
    </div>
  );
}

function SnippetCollection({
  items,
}: SnippetCollectionProps): ReactNode {
  if (items.length === 1) {
    return <SnippetItemContent item={items[0]} showLabel />;
  }

  return (
    <Tabs className={styles.tabs} defaultValue={items[0].id}>
      {items.map((item) => (
        <TabItem key={item.id} label={item.label} value={item.id}>
          <SnippetItemContent item={item} showLabel={false} />
        </TabItem>
      ))}
    </Tabs>
  );
}

export default function EllipsisDisplayPatternSnippetPanel({
  snippets,
  density,
  entryTitle,
}: EllipsisDisplayPatternSnippetPanelProps): ReactNode {
  const items = snippets?.items ?? [];

  if (density === 'list') {
    if (!snippets || items.length === 0) {
      return null;
    }

    return (
      <section
        aria-label={`${entryTitle}の CSS / TSX 例`}
        className={styles.root}>
        <details className={styles.details}>
          <summary className={styles.summary}>
            <span className={styles.summaryHeader}>
              <span className={styles.summaryLabel}>CSS / TSX 例を見る</span>
              <span aria-hidden="true" className={styles.summaryIndicator}>
                ▾
              </span>
            </span>
            <span className={styles.summaryText}>{snippets.snippetSummary}</span>
          </summary>
          <div className={styles.content}>
            <SnippetCollection items={items} />
          </div>
        </details>
      </section>
    );
  }

  return (
    <EllipsisDisplayPatternSectionCard
      ariaLabel={`${entryTitle}の CSS / TSX 例`}
      description={snippets?.snippetSummary}
      label="コード"
      title="CSS / TSX 例">
      {items.length > 0 ? (
        <div className={styles.content}>
          <SnippetCollection items={items} />
        </div>
      ) : (
        <p className={styles.emptyMessage}>実装例は準備中です。</p>
      )}
    </EllipsisDisplayPatternSectionCard>
  );
}
