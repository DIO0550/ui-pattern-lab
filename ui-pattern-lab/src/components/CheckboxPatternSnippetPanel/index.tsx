import type {ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import CheckboxPatternSectionCard from '@site/src/components/CheckboxPatternSectionCard';
import type {
  CheckboxPatternSnippetItem,
  CheckboxPatternSnippets,
} from '@site/src/data/checkboxPatternTypes';

import styles from './styles.module.css';

type CheckboxPatternSnippetPanelProps = {
  snippets?: CheckboxPatternSnippets;
  density: 'list' | 'detail';
  entryTitle: string;
};

type SnippetItemContentProps = {
  item: CheckboxPatternSnippetItem;
  showLabel: boolean;
};

type SnippetCollectionProps = {
  items: CheckboxPatternSnippetItem[];
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

export default function CheckboxPatternSnippetPanel({
  snippets,
  density,
  entryTitle,
}: CheckboxPatternSnippetPanelProps): ReactNode {
  const items = snippets?.items ?? [];

  if (density === 'list') {
    if (items.length === 0 || !snippets) {
      return null;
    }

      return (
        <div
          aria-label={`${entryTitle}のCSS / TSXサンプル`}
          className={styles.root}>
        <details className={styles.details}>
          <summary className={styles.summary}>
            <span className={styles.summaryHeader}>
              <span className={styles.summaryLabel}>CSS / TSX サンプルを見る</span>
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
      </div>
    );
  }

  return (
    <CheckboxPatternSectionCard
      ariaLabel={`${entryTitle}のCSS / TSXサンプル`}
      description={snippets?.snippetSummary}
      label="コード"
      title="CSS / TSX サンプル">
      {items.length > 0 ? (
        <div className={styles.content}>
          <SnippetCollection items={items} />
        </div>
      ) : (
        <p className={styles.emptyMessage}>実装例は準備中です。</p>
      )}
    </CheckboxPatternSectionCard>
  );
}
