import type {
  ControllerPatternEntryId,
  ControllerPatternSnippets,
} from '@site/src/data/controllerPatternTypes';

export const controllerPatternSnippets: Record<
  ControllerPatternEntryId,
  ControllerPatternSnippets
> = {
  'segmented-view-switcher': {
    snippetSummary:
      '少数の表示モードを常時見せたまま切り替え、現在モードと切り替え結果を近接表示する最小構成です。',
    items: [
      {
        id: 'segmented-view-switcher-css',
        label: 'CSS',
        language: 'css',
        code: `.segmentGroup {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 999px;
  background: var(--ifm-color-emphasis-100);
}

.segmentButton {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--ifm-color-emphasis-700);
  font: inherit;
  padding: 0.5rem 0.9rem;
}

.segmentButtonActive {
  background: var(--ifm-color-primary);
  color: white;
  font-weight: 700;
}

.segmentPanel {
  margin-top: 0.75rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.75rem;
  padding: 1rem;
}`,
        note:
          '候補数は 2〜4 個程度に絞り、現在モードと結果領域を近接させると「何を切り替えた control か」が伝わりやすくなります。',
      },
      {
        id: 'segmented-view-switcher-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const viewModes = [
  {id: 'list', label: 'List'},
  {id: 'grid', label: 'Grid'},
  {id: 'board', label: 'Board'},
] as const;

const [activeMode, setActiveMode] = useState<typeof viewModes[number]['id']>('grid');

<section aria-labelledby="inventory-view-title">
  <h2 id="inventory-view-title">表示モード</h2>
  <div aria-label="表示モード" className={styles.segmentGroup} role="group">
    {viewModes.map((mode) => (
      <button
        aria-pressed={activeMode === mode.id}
        className={clsx(
          styles.segmentButton,
          activeMode === mode.id && styles.segmentButtonActive,
        )}
        key={mode.id}
        onClick={() => setActiveMode(mode.id)}
        type="button">
        {mode.label}
      </button>
    ))}
  </div>

  <div className={styles.segmentPanel}>
    {activeMode === 'grid' ? 'カード型の preview を表示' : '対応する view を表示'}
  </div>
</section>`,
        note:
          'フォーム送信前提の単一選択なら radio group、同一画面の panel 切替なら tabs を優先し、常時見せる mode switch だけをこの pattern に寄せます。',
      },
    ],
  },
  'tabs-inline-panel-switcher': {
    snippetSummary:
      '同一ページ内で panel を切り替える tablist / tabpanel の骨格です。キーボード移動と active panel の結びつきを先に固定します。',
    items: [
      {
        id: 'tabs-inline-panel-switcher-css',
        label: 'CSS',
        language: 'css',
        code: `.tabList {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid var(--ifm-color-emphasis-300);
}

.tabButton {
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--ifm-color-emphasis-700);
  font: inherit;
  padding: 0.75rem 0.5rem;
}

.tabButtonActive {
  border-bottom-color: var(--ifm-color-primary);
  color: var(--ifm-color-primary-dark);
  font-weight: 700;
}

.tabPanel {
  padding-block: 1rem;
}`,
        note:
          '見出し直下に tablist を置き、panel のラベルと切り替え結果を離しすぎないことで、navigation ではなく inline panel switch であることが伝わります。',
      },
      {
        id: 'tabs-inline-panel-switcher-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const tabs = [
  {id: 'overview', label: '概要'},
  {id: 'activity', label: 'アクティビティ'},
  {id: 'settings', label: '設定'},
] as const;

const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('overview');

<section aria-labelledby="account-tabs-title">
  <h2 id="account-tabs-title">アカウント設定</h2>
  <div aria-label="アカウント設定のセクション" className={styles.tabList} role="tablist">
    {tabs.map((tab) => (
      <button
        aria-controls={\`\${tab.id}-panel\`}
        aria-selected={activeTab === tab.id}
        className={clsx(styles.tabButton, activeTab === tab.id && styles.tabButtonActive)}
        id={\`\${tab.id}-tab\`}
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        role="tab"
        type="button">
        {tab.label}
      </button>
    ))}
  </div>

  <div
    aria-labelledby={\`\${activeTab}-tab\`}
    className={styles.tabPanel}
    id={\`\${activeTab}-panel\`}
    role="tabpanel">
    現在の panel に対応する本文を表示
  </div>
</section>`,
        note:
          'arrow key を実装する場合は roving tabindex と `aria-selected` を整合させ、単なる anchor list に近い構造へ崩さないことが重要です。',
      },
    ],
  },
  'sort-filter-toolbar': {
    snippetSummary:
      '複数の control を toolbar としてまとめ、結果件数・active filter・並び替えを同じ操作面で管理する構成です。',
    items: [
      {
        id: 'sort-filter-toolbar-css',
        label: 'CSS',
        language: 'css',
        code: `.toolbar {
  display: grid;
  gap: 0.75rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.75rem;
  padding: 1rem;
}

.toolbarRow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
}

.toolbarChip {
  border-radius: 999px;
  background: var(--ifm-color-emphasis-100);
  padding: 0.3rem 0.75rem;
}

.toolbarChipActive {
  background: var(--ifm-color-primary-lightest);
  color: var(--ifm-color-primary-darkest);
}`,
        note:
          'filter input 自体よりも、active filter の見せ方・result count・sort の関係を一つの面で整理することがこの pattern の要点です。',
      },
      {
        id: 'sort-filter-toolbar-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const activeFilters = ['在庫あり', '送料無料'] as const;

<section aria-labelledby="catalog-toolbar-title" className={styles.toolbar}>
  <div className={styles.toolbarRow}>
    <h2 id="catalog-toolbar-title">商品一覧を絞り込む</h2>
    <p>128 件</p>
  </div>

  <div className={styles.toolbarRow}>
    <label>
      並び順
      <select defaultValue="popular">
        <option value="popular">人気順</option>
        <option value="price-asc">価格が低い順</option>
      </select>
    </label>

    <button type="button">絞り込み</button>
  </div>

  <div className={styles.toolbarRow}>
    {activeFilters.map((filter) => (
      <span className={clsx(styles.toolbarChip, styles.toolbarChipActive)} key={filter}>
        {filter}
      </span>
    ))}
  </div>
</section>`,
        note:
          'selector / checkbox は個別入力の責務に留め、toolbar 側で「何が適用済みか」「一覧全体へどう効いているか」を集約します。',
      },
    ],
  },
  'pagination-and-page-size-controller': {
    snippetSummary:
      '結果セットの閲覧位置を control として扱い、current page・page size・件数要約を一体で見せる例です。',
    items: [
      {
        id: 'pagination-and-page-size-controller-css',
        label: 'CSS',
        language: 'css',
        code: `.paginationShell {
  display: grid;
  gap: 0.75rem;
}

.paginationRow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
}

.pageButtons {
  display: inline-flex;
  gap: 0.25rem;
}

.pageButtonActive {
  background: var(--ifm-color-primary);
  color: white;
}`,
        note:
          '単なる link list にせず、件数要約と page size を近接させて「結果セットの閲覧状態を制御している」ことを伝えます。',
      },
      {
        id: 'pagination-and-page-size-controller-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const [currentPage, setCurrentPage] = useState(3);
const [pageSize, setPageSize] = useState(25);
const totalCount = 240;

<section className={styles.paginationShell}>
  <div className={styles.paginationRow}>
    <p>{\`51–75 / \${totalCount} 件を表示\`}</p>
    <label>
      表示件数
      <select
        onChange={(event) => setPageSize(Number(event.target.value))}
        value={pageSize}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </label>
  </div>

  <div aria-label="ページ切り替え" className={styles.pageButtons}>
    <button disabled={currentPage === 1} type="button">前へ</button>
    {[1, 2, 3, 4].map((page) => (
      <button
        aria-current={currentPage === page ? 'page' : undefined}
        className={currentPage === page ? styles.pageButtonActive : undefined}
        key={page}
        onClick={() => setCurrentPage(page)}
        type="button">
        {page}
      </button>
    ))}
    <button type="button">次へ</button>
  </div>
</section>`,
        note:
          'page size 変更時に current page を clamp する補助メッセージや、初回 / 最終ページの disabled state も detail page 側で補います。',
      },
    ],
  },
  'range-slider-filter': {
    snippetSummary:
      '連続値や狭い離散値をドラッグで即時調整し、現在値と反映対象を近接表示する slider filter の骨格です。',
    items: [
      {
        id: 'range-slider-filter-css',
        label: 'CSS',
        language: 'css',
        code: `.sliderField {
  display: grid;
  gap: 0.5rem;
}

.sliderLabels {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
}

.sliderHint {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.9rem;
}`,
        note:
          'exact value 入力は別フィールドへ任せ、slider では「いまどの範囲に絞ったか」が即時反映されることを重視します。',
      },
      {
        id: 'range-slider-filter-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const [price, setPrice] = useState(6000);

<section aria-labelledby="price-filter-title" className={styles.sliderField}>
  <h2 id="price-filter-title">価格帯で絞り込む</h2>
  <div className={styles.sliderLabels}>
    <span>0円</span>
    <strong>{\`〜 \${price.toLocaleString()}円\`}</strong>
    <span>10,000円</span>
  </div>
  <input
    aria-describedby="price-filter-hint"
    max={10000}
    min={0}
    onChange={(event) => setPrice(Number(event.target.value))}
    step={500}
    type="range"
    value={price}
  />
  <p id="price-filter-hint" className={styles.sliderHint}>
    スライダーを動かすと結果一覧を即時に更新します。
  </p>
</section>`,
        note:
          'dual-thumb の複雑な実装は初回スコープ外とし、まず single slider と現在値の関係を分かりやすく見せる方針に寄せます。',
      },
    ],
  },
  'quantity-stepper-control': {
    snippetSummary:
      'bounded numeric value を plus / minus で調整し、min / max と disabled state を明示する quantity stepper の骨格です。',
    items: [
      {
        id: 'quantity-stepper-control-css',
        label: 'CSS',
        language: 'css',
        code: `.stepper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.stepperButton {
  inline-size: 2.5rem;
  block-size: 2.5rem;
  border-radius: 999px;
}

.stepperValue {
  min-inline-size: 3ch;
  text-align: center;
  font-weight: 700;
}`,
        note:
          'stepper は number input の代替ではなく、狭い範囲を安全に増減したい場面に限定すると役割がぶれません。',
      },
      {
        id: 'quantity-stepper-control-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;
const [quantity, setQuantity] = useState(2);

<section aria-labelledby="guest-count-title">
  <h2 id="guest-count-title">人数を調整する</h2>
  <div className={styles.stepper}>
    <button
      aria-label="人数を1人減らす"
      disabled={quantity <= MIN_QUANTITY}
      onClick={() => setQuantity((current) => Math.max(MIN_QUANTITY, current - 1))}
      type="button">
      −
    </button>
    <output aria-live="polite" className={styles.stepperValue}>
      {quantity}
    </output>
    <button
      aria-label="人数を1人増やす"
      disabled={quantity >= MAX_QUANTITY}
      onClick={() => setQuantity((current) => Math.min(MAX_QUANTITY, current + 1))}
      type="button">
      +
    </button>
  </div>
</section>`,
        note:
          'min / max 到達時の disabled、値の読み上げ、長押しや連打時の安全策を設計メモで補い、progress の stepper と役割を混同しないようにします。',
      },
    ],
  },
};
