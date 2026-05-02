import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import TabItem from '@theme/TabItem';
import DocusaurusTabs from '@theme/Tabs';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import type {
  TabsDemoKind,
  TabsDemoProps,
  TabsPatternEntry,
  TabsPatternMetadataItem,
  TabsPatternSnippets,
} from '@site/src/data/tabsPatternTypes';

import styles from './styles.module.css';

type Props = {
  entries: TabsPatternEntry[];
  density: 'list' | 'detail';
};

type DemoTab = {
  id: string;
  label: string;
  badge?: string;
  eyebrow: string;
  title: string;
  body: string;
};

type SnippetTabsProps = {
  snippets?: TabsPatternSnippets;
};

const demoLabelByKind = {
  'underline-overview': {
    name: '下線型',
    description: '本文に近い軽さで、概要 / アクティビティ / メモを切り替える例です。',
  },
  'pill-dashboard': {
    name: 'ピル型',
    description: '選択中の dashboard view を強く示し、件数バッジも併記する例です。',
  },
  'boxed-settings': {
    name: 'ボックス型',
    description: '設定カテゴリと panel の境界を接続し、編集区画を明確にする例です。',
  },
  'vertical-sections': {
    name: '縦型',
    description: '左の tablist と右の panel で長いラベルを扱う例です。',
  },
} as const satisfies Record<TabsDemoKind, {name: string; description: string}>;

const demoTabsByKind = {
  'underline-overview': [
    {
      id: 'overview',
      label: '概要',
      eyebrow: 'Overview',
      title: 'ローンチ後の要点',
      body: '主要指標、更新内容、次に確認するポイントを同じ文脈のまま切り替えます。',
    },
    {
      id: 'activity',
      label: 'アクティビティ',
      eyebrow: 'Activity',
      title: '最近の更新',
      body: 'ユーザー招待、権限変更、公開設定の変更履歴を軽い panel として表示します。',
    },
    {
      id: 'notes',
      label: 'メモ',
      eyebrow: 'Notes',
      title: '補足メモ',
      body: '下線型は本文の流れを優先し、tab の見た目を必要以上に重くしません。',
    },
  ],
  'pill-dashboard': [
    {
      id: 'revenue',
      label: '売上',
      badge: '24',
      eyebrow: 'Revenue',
      title: '売上ビュー',
      body: '選択中の view を pill surface で強く示し、現在の集計軸を一目で読ませます。',
    },
    {
      id: 'retention',
      label: '継続',
      badge: '8',
      eyebrow: 'Retention',
      title: '継続率ビュー',
      body: '少数の dashboard view では、active 面を強くして状態の読み間違いを減らします。',
    },
    {
      id: 'alerts',
      label: '注意',
      badge: '3',
      eyebrow: 'Alerts',
      title: '注意が必要な項目',
      body: 'badge は補足情報です。通知そのものが主役なら badge や alert の文脈へ分けます。',
    },
  ],
  'boxed-settings': [
    {
      id: 'account',
      label: 'アカウント',
      eyebrow: 'Account',
      title: 'プロフィール設定',
      body: 'panel と tab を接続し、いま編集している設定カテゴリを箱として認識させます。',
    },
    {
      id: 'security',
      label: 'セキュリティ',
      eyebrow: 'Security',
      title: 'ログイン保護',
      body: 'フォーム送信と tab change を混ぜず、切り替えは表示だけ、保存は panel 内の action として扱います。',
    },
    {
      id: 'billing',
      label: '請求',
      eyebrow: 'Billing',
      title: '支払い設定',
      body: '設定画面では境界を強めることで、編集対象のまとまりを読みやすくできます。',
    },
  ],
  'vertical-sections': [
    {
      id: 'guidelines',
      label: 'ブランドガイドライン',
      eyebrow: 'Guidelines',
      title: '長いラベルを扱う',
      body: '縦型はラベル幅を確保しやすく、横並びで潰れる項目名を読みやすく保てます。',
    },
    {
      id: 'tokens',
      label: 'デザイントークン',
      eyebrow: 'Tokens',
      title: 'セクションを安定表示',
      body: 'panel の位置を右側で固定し、左の tablist で現在セクションを移動します。',
    },
    {
      id: 'migration',
      label: '移行メモと注意点',
      eyebrow: 'Migration',
      title: 'mobile では代替を検討',
      body: '狭い画面では上部 scrollable tabs や accordion への切り替えを検討します。',
    },
  ],
} as const satisfies Record<TabsDemoKind, readonly DemoTab[]>;

function buildMetadataItems(entry: TabsPatternEntry): TabsPatternMetadataItem[] {
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
    <DocusaurusTabs className={styles.codeTabs} defaultValue={items[0].id}>
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
    </DocusaurusTabs>
  );
}

function TabsDemo({density, demoKind}: TabsDemoProps): ReactNode {
  const tabs = demoTabsByKind[demoKind];
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const isVertical = demoKind === 'vertical-sections';

  return (
    <section className={clsx(styles.demo, styles[demoKind], density === 'detail' && styles.demoDetail)}>
      <div
        aria-label={demoLabelByKind[demoKind].description}
        aria-orientation={isVertical ? 'vertical' : undefined}
        className={styles.tabList}
        role="tablist">
        {tabs.map((tab) => (
          <button
            aria-controls={`${tab.id}-${demoKind}-panel`}
            aria-selected={activeTab.id === tab.id}
            className={styles.tabButton}
            id={`${tab.id}-${demoKind}-tab`}
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            role="tab"
            type="button">
            <span>{tab.label}</span>
            {tab.badge ? <span className={styles.tabBadge}>{tab.badge}</span> : null}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`${activeTab.id}-${demoKind}-tab`}
        className={styles.tabPanel}
        id={`${activeTab.id}-${demoKind}-panel`}
        role="tabpanel">
        <span className={styles.panelEyebrow}>{activeTab.eyebrow}</span>
        <Heading as="h4" className={styles.panelTitle}>
          {activeTab.title}
        </Heading>
        <p className={styles.panelBody}>{activeTab.body}</p>
      </div>
    </section>
  );
}

function buildVariantNote(entry: TabsPatternEntry): string {
  return `${entry.title} は 1 variant block : 1 code panel として表示します。複数variantを1つのpreview/codeにまとめず、見た目とsemanticsの対応を個別に確認します。`;
}

function buildReferenceVariants(entry: TabsPatternEntry): readonly PatternReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return entry.demoKinds.map((demoKind) => ({
    id: `${entry.id}-${demoKind}`,
    name: demoLabelByKind[demoKind].name,
    description: demoLabelByKind[demoKind].description,
    preview: (
      <div className={styles.referencePreview}>
        <TabsDemo demoKind={demoKind} density="detail" />
      </div>
    ),
    previewClassName: styles.referencePreviewWide,
    tabs,
  }));
}

export default function TabsPatternGallery({entries, density}: Props): ReactNode {
  if (entries.length === 0) {
    return <p className={styles.emptyState}>表示できる tabs pattern がありません。</p>;
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
                variantSectionLabel="バリアント"
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
                  <TabsDemo demoKind={featuredDemoKind} density="list" />
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
