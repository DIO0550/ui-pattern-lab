import type {TabsPatternId, TabsPatternSnippets} from '@site/src/data/tabsPatternTypes';

export const tabsPatternSnippets: Record<TabsPatternId, TabsPatternSnippets> = {
  'underline-tabs': {
    snippetSummary:
      '見出しに近い軽量な tabs です。active indicator は下線へ寄せ、panel は同じ文脈の続きとして扱います。',
    items: [
      {
        id: 'underline-tabs-css',
        label: 'CSS',
        language: 'css',
        code: `.tabsRoot {
  display: grid;
  gap: 1rem;
}

.tabList {
  display: flex;
  gap: 1.25rem;
  border-block-end: 1px solid var(--ifm-color-emphasis-200);
}

.tabButton {
  padding: 0.75rem 0 0.7rem;
  border: 0;
  border-block-end: 3px solid transparent;
  background: transparent;
  color: var(--ifm-color-emphasis-700);
  font: inherit;
  font-weight: 700;
}

.tabButton[aria-selected='true'] {
  border-color: var(--ifm-color-primary);
  color: var(--ifm-color-primary-dark);
}

.tabButton:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 35%, transparent);
  outline-offset: 4px;
}

.tabPanel {
  padding: 1rem;
  border-radius: 1rem;
  background: var(--ifm-card-background-color);
}`,
        note:
          '下線型は軽い見た目が利点です。active だけに線を置き、hover と focus-visible は別の状態として定義します。',
      },
      {
        id: 'underline-tabs-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const tabs = [
  {id: 'overview', label: '概要', panel: '主要指標と変更点を確認します。'},
  {id: 'activity', label: 'アクティビティ', panel: '最近の更新履歴を確認します。'},
  {id: 'notes', label: 'メモ', panel: '補足情報を確認します。'},
] as const;

const [activeTabId, setActiveTabId] = useState(tabs[0].id);
const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

<section className={styles.tabsRoot}>
  <div aria-label="プロジェクト詳細" className={styles.tabList} role="tablist">
    {tabs.map((tab) => (
      <button
        aria-controls={\`\${tab.id}-panel\`}
        aria-selected={activeTab.id === tab.id}
        className={styles.tabButton}
        id={\`\${tab.id}-tab\`}
        key={tab.id}
        onClick={() => setActiveTabId(tab.id)}
        role="tab"
        type="button">
        {tab.label}
      </button>
    ))}
  </div>
  <div
    aria-labelledby={\`\${activeTab.id}-tab\`}
    className={styles.tabPanel}
    id={\`\${activeTab.id}-panel\`}
    role="tabpanel">
    {activeTab.panel}
  </div>
</section>`,
        note:
          '`tablist` / `tab` / `tabpanel` の関係を固定し、表示する panel は active tab と 1 対 1 にします。',
      },
    ],
  },
  'pill-tabs': {
    snippetSummary:
      '選択中の面を強く出す tabs です。ダッシュボードや小さな view mode の切り替えで、現在選択を即座に読ませます。',
    items: [
      {
        id: 'pill-tabs-css',
        label: 'CSS',
        language: 'css',
        code: `.pillTabs {
  display: inline-flex;
  gap: 0.35rem;
  padding: 0.35rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 999px;
  background: color-mix(in srgb, var(--ifm-color-primary) 8%, white);
}

.pillTab {
  min-block-size: 2.35rem;
  padding: 0.4rem 0.9rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--ifm-color-emphasis-700);
  font: inherit;
  font-weight: 800;
}

.pillTab[aria-selected='true'] {
  background: var(--ifm-color-primary);
  color: white;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--ifm-color-primary) 28%, transparent);
}

.badge {
  margin-inline-start: 0.4rem;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.22);
}`,
        note:
          'pill 型は選択面が強いため、少数タブに向きます。大量タブでは幅を取りやすく、scrollable 設計を検討します。',
      },
      {
        id: 'pill-tabs-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div aria-label="売上ビュー" className={styles.pillTabs} role="tablist">
  {tabs.map((tab) => (
    <button
      aria-controls={\`\${tab.id}-panel\`}
      aria-selected={activeTabId === tab.id}
      className={styles.pillTab}
      id={\`\${tab.id}-tab\`}
      key={tab.id}
      onClick={() => setActiveTabId(tab.id)}
      role="tab"
      type="button">
      {tab.label}
      {tab.count ? <span className={styles.badge}>{tab.count}</span> : null}
    </button>
  ))}
</div>`,
        note:
          '件数バッジは tab label の補足として扱います。通知数が主役になる場合は badge component と責務を分けます。',
      },
    ],
  },
  'boxed-tabs': {
    snippetSummary:
      'tab と panel の境界を明確にする tabs です。設定画面やフォーム断面のように、区画を分けたい場面へ向きます。',
    items: [
      {
        id: 'boxed-tabs-css',
        label: 'CSS',
        language: 'css',
        code: `.boxedTabs {
  display: grid;
  gap: 0;
}

.boxedTabList {
  display: flex;
  gap: 0.25rem;
  align-items: flex-end;
}

.boxedTab {
  padding: 0.7rem 1rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-end-start-radius: 0;
  border-end-end-radius: 0;
  border-start-start-radius: 0.8rem;
  border-start-end-radius: 0.8rem;
  background: var(--ifm-color-emphasis-100);
  font: inherit;
}

.boxedTab[aria-selected='true'] {
  border-block-end-color: var(--ifm-card-background-color);
  background: var(--ifm-card-background-color);
  font-weight: 800;
}

.boxedPanel {
  padding: 1.1rem;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0 1rem 1rem;
  background: var(--ifm-card-background-color);
}`,
        note:
          'boxed 型は panel と一体化させるため、active tab の下線ではなく panel 境界との接続を見せます。',
      },
      {
        id: 'boxed-tabs-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<section className={styles.boxedTabs}>
  <div aria-label="設定カテゴリ" className={styles.boxedTabList} role="tablist">
    {tabs.map((tab) => (
      <button
        aria-controls={\`\${tab.id}-panel\`}
        aria-selected={activeTabId === tab.id}
        className={styles.boxedTab}
        id={\`\${tab.id}-tab\`}
        key={tab.id}
        onClick={() => setActiveTabId(tab.id)}
        role="tab"
        type="button">
        {tab.label}
      </button>
    ))}
  </div>
  <div className={styles.boxedPanel} role="tabpanel">
    {activeTab.panel}
  </div>
</section>`,
        note:
          'settings のようなフォーム群では、panel の境界を明確にして「いま編集している区画」を読ませます。',
      },
    ],
  },
  'vertical-tabs': {
    snippetSummary:
      '左側の tablist と右側の panel を並べる tabs です。項目名が長い場合や、セクション数が中程度ある場合に向きます。',
    items: [
      {
        id: 'vertical-tabs-css',
        label: 'CSS',
        language: 'css',
        code: `.verticalTabs {
  display: grid;
  grid-template-columns: minmax(10rem, 14rem) 1fr;
  gap: 1rem;
}

.verticalTabList {
  display: grid;
  gap: 0.45rem;
  align-content: start;
}

.verticalTab {
  padding: 0.75rem 0.85rem;
  border: 1px solid transparent;
  border-radius: 0.85rem;
  background: transparent;
  color: var(--ifm-color-emphasis-700);
  font: inherit;
  text-align: start;
}

.verticalTab[aria-selected='true'] {
  border-color: color-mix(in srgb, var(--ifm-color-primary) 28%, transparent);
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, white);
  color: var(--ifm-color-primary-dark);
  font-weight: 800;
}

.verticalPanel {
  min-block-size: 14rem;
  padding: 1.1rem;
  border-radius: 1rem;
  background: var(--ifm-card-background-color);
}`,
        note:
          '縦型は横幅が必要です。狭い画面では上部 scrollable tabs や accordion への切り替えを検討します。',
      },
      {
        id: 'vertical-tabs-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<section className={styles.verticalTabs}>
  <div
    aria-label="ドキュメントセクション"
    aria-orientation="vertical"
    className={styles.verticalTabList}
    role="tablist">
    {tabs.map((tab) => (
      <button
        aria-controls={\`\${tab.id}-panel\`}
        aria-selected={activeTabId === tab.id}
        className={styles.verticalTab}
        id={\`\${tab.id}-tab\`}
        key={tab.id}
        onClick={() => setActiveTabId(tab.id)}
        role="tab"
        type="button">
        {tab.label}
      </button>
    ))}
  </div>
  <div className={styles.verticalPanel} role="tabpanel">
    {activeTab.panel}
  </div>
</section>`,
        note:
          '縦方向の tablist では `aria-orientation="vertical"` を付け、arrow key 実装時の方向も合わせます。',
      },
    ],
  },
};
