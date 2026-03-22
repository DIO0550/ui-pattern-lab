import type {ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import SelectorPatternSectionCard from '@site/src/components/SelectorPatternSectionCard';
import type {
  SelectorPatternEntryId,
  SelectorPatternSnippetItem,
  SelectorPatternSnippets,
} from '@site/src/data/selectorPatternTypes';

import styles from './styles.module.css';

type SelectorPatternSnippetPanelProps = {
  snippets?: SelectorPatternSnippets;
  density: 'list' | 'detail';
  entryId: SelectorPatternEntryId;
  entryTitle: string;
};

type SnippetItemContentProps = {
  item: SelectorPatternSnippetItem;
  showLabel: boolean;
};

type SnippetCollectionProps = {
  items: SelectorPatternSnippetItem[];
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

export default function SelectorPatternSnippetPanel({
  snippets,
  density,
  entryId,
  entryTitle,
}: SelectorPatternSnippetPanelProps): ReactNode {
  const items = snippets?.items ?? [];
  const showComboboxWarning = entryId.startsWith('combobox-');
  const comboboxWarning = showComboboxWarning ? (
    <p className={styles.warning}>
      combobox の snippet は構造理解のための参考例です。production-ready な async 検索、IME
      対応、popover 制御までは含めていません。
    </p>
  ) : null;

  if (density === 'list') {
    if (items.length === 0 || !snippets) {
      return null;
    }

    return (
      <section aria-label={`${entryTitle}のCSS / TSXサンプル`} className={styles.root}>
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
            {comboboxWarning}
            <SnippetCollection items={items} />
          </div>
        </details>
      </section>
    );
  }

  return (
    <SelectorPatternSectionCard
      ariaLabel={`${entryTitle}のCSS / TSXサンプル`}
      description={snippets?.snippetSummary}
      label="コード"
      title="CSS / TSX サンプル">
      {comboboxWarning}
      {items.length > 0 ? (
        <div className={styles.content}>
          <SnippetCollection items={items} />
        </div>
      ) : (
        <p className={styles.emptyMessage}>実装例は準備中です。</p>
      )}
    </SelectorPatternSectionCard>
  );
}
