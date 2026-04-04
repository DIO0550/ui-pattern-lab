import type {ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import InputPatternSectionCard from '@site/src/components/InputPatternSectionCard';
import type {
  InputPatternSnippetItem,
  InputPatternSnippets,
} from '@site/src/data/inputPatternTypes';

import styles from './styles.module.css';

type InputPatternSnippetPanelProps = {
  snippets?: InputPatternSnippets;
  density: 'list' | 'detail';
  entryTitle: string;
};

type SnippetItemContentProps = {
  item: InputPatternSnippetItem;
  showLabel: boolean;
};

type SnippetCollectionProps = {
  items: InputPatternSnippetItem[];
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

function SnippetCollection({items}: SnippetCollectionProps): ReactNode {
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

export default function InputPatternSnippetPanel({
  snippets,
  density,
  entryTitle,
}: InputPatternSnippetPanelProps): ReactNode {
  const items = snippets?.items ?? [];
  const hasCss = items.some((item) => item.language.toLowerCase() === 'css');
  const snippetLabel = hasCss ? 'TSX / CSS サンプルを見る' : 'TSX サンプルを見る';
  const snippetTitle = hasCss ? 'TSX / CSS サンプル' : 'TSX サンプル';

  if (density === 'list') {
    if (items.length === 0 || !snippets) {
      return null;
    }

    return (
      <section aria-label={`${entryTitle}のコードサンプル`} className={styles.root}>
        <details className={styles.details}>
          <summary className={styles.summary}>
            <span className={styles.summaryHeader}>
              <span className={styles.summaryLabel}>{snippetLabel}</span>
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
    <InputPatternSectionCard
      ariaLabel={`${entryTitle}のコードサンプル`}
      description={snippets?.snippetSummary}
      label="コード"
      title={snippetTitle}>
      {items.length > 0 ? (
        <div className={styles.content}>
          <SnippetCollection items={items} />
        </div>
      ) : (
        <p className={styles.emptyMessage}>実装例は準備中です。</p>
      )}
    </InputPatternSectionCard>
  );
}
