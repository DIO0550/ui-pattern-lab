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
  flex-wrap: wrap;
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

.segmentButton:focus-visible {
  outline: 3px solid var(--ifm-color-primary);
  outline-offset: 2px;
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
}

.segmentSummary {
  margin: 0 0 0.75rem;
  color: var(--ifm-color-emphasis-700);
}

.segmentResults {
  display: grid;
  gap: 0.5rem;
}

.segmentResults[data-view-mode='list'] {
  grid-template-columns: 1fr;
}

.segmentResults[data-view-mode='grid'] {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.segmentResults[data-view-mode='board'] {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.segmentResultCard {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4rem;
  padding: 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  font-weight: 700;
  text-align: center;
}

.segmentResultCard[data-view-mode='list'] {
  justify-content: flex-start;
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

.segmentResultCard[data-view-mode='grid'] {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1d4ed8;
}

.segmentResultCard[data-view-mode='board'] {
  background: #ecfccb;
  border-color: #bef264;
  color: #3f6212;
}`,
        note:
          '候補数は 2〜4 個程度に絞り、現在モードと結果領域を近接させます。focus-visible を含めて keyboard 操作時の active state が分かる見た目にすると、local UI state の切り替えだと伝わりやすくなります。',
      },
      {
        id: 'segmented-view-switcher-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const viewModeOrder = ['list', 'grid', 'board'] as const;
type ViewMode = (typeof viewModeOrder)[number];

const viewModes = {
  list: {
    label: 'List',
    summary: '1 行ずつ密度高く確認する',
  },
  grid: {
    label: 'Grid',
    summary: 'カードを並べて比較する',
  },
  board: {
    label: 'Board',
    summary: '列ごとにまとまりを確認する',
  },
} as const;

const [activeMode, setActiveMode] = useState<ViewMode>('grid');

<section aria-labelledby="inventory-view-title">
  <h2 id="inventory-view-title">表示モード</h2>
  <div
    aria-labelledby="inventory-view-title"
    className={styles.segmentGroup}
    role="group">
    {viewModeOrder.map((modeId) => (
      <button
        aria-pressed={activeMode === modeId}
        className={clsx(
          styles.segmentButton,
          activeMode === modeId && styles.segmentButtonActive,
        )}
        key={modeId}
        onClick={() => {
          setActiveMode((currentMode) => {
            if (currentMode === modeId) {
              return currentMode;
            }

            return modeId;
          });
        }}
        type="button">
        {viewModes[modeId].label}
      </button>
    ))}
  </div>

  <div className={styles.segmentPanel}>
    <p aria-live="polite" className={styles.segmentSummary}>
      {viewModes[activeMode].summary}
    </p>
    <div className={styles.segmentResults} data-view-mode={activeMode}>
      <span className={styles.segmentResultCard} data-view-mode={activeMode}>
        Orders
      </span>
      <span className={styles.segmentResultCard} data-view-mode={activeMode}>
        Returns
      </span>
      <span className={styles.segmentResultCard} data-view-mode={activeMode}>
        Scheduled
      </span>
      <span className={styles.segmentResultCard} data-view-mode={activeMode}>
        Drafts
      </span>
    </div>
  </div>
</section>`,
        note:
          'フォーム送信前提の単一選択なら radio group、同一画面の panel 切替や arrow key を前提にするなら tabs を優先します。group label、`aria-pressed`、`aria-live` で状態を伝え、URL 同期・永続化・外部 API 連携は持ち込みません。',
      },
    ],
  },
  switch: {
    snippetSummary:
      'on / off 設定を即時反映する switch の variant です。default、icon 付き、label 配置、settings list を 1 variant ずつ分けています。',
    items: [
      {
        id: 'switch-default-css',
        label: '標準 CSS',
        language: 'css',
        code: `.switchRow {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.switch {
  position: relative;
  inline-size: 3rem;
  block-size: 1.65rem;
  border: 0;
  border-radius: 999px;
  background: var(--ifm-color-emphasis-300);
  cursor: pointer;
}

.switchThumb {
  position: absolute;
  inset-block-start: 0.2rem;
  inset-inline-start: 0.2rem;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border-radius: 999px;
  background: white;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.18);
  transition: transform 140ms ease;
}

.switch[aria-checked='true'] {
  background: var(--ifm-color-primary);
}

.switch[aria-checked='true'] .switchThumb {
  transform: translateX(1.35rem);
}

.switch:focus-visible {
  outline: 3px solid var(--ifm-color-primary);
  outline-offset: 3px;
}`,
        note:
          'default は最小の binary setting として扱います。label と switch を近接させ、`aria-checked` と見た目の on/off を同期します。',
      },
      {
        id: 'switch-default-tsx',
        label: '標準 TSX',
        language: 'tsx',
        code: `const [enabled, setEnabled] = useState(true);

<div className={styles.switchRow}>
  <button
    aria-checked={enabled}
    aria-label="自動保存を切り替える"
    className={styles.switch}
    onClick={() => setEnabled((current) => !current)}
    role="switch"
    type="button">
    <span aria-hidden="true" className={styles.switchThumb} />
  </button>
  <span>自動保存</span>
</div>`,
        note:
          'button + `role="switch"` で実装する場合は `aria-checked` を必ず更新します。native checkbox を使う場合も label と checked state を同期します。',
      },
      {
        id: 'switch-with-icons-css',
        label: 'With Icons CSS',
        language: 'css',
        code: `.iconSwitch {
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  inline-size: 3.75rem;
  block-size: 1.85rem;
  border: 0;
  border-radius: 999px;
  background: #d1d5db;
  color: #475569;
  cursor: pointer;
}

.iconSwitch[data-state='on'] {
  background: #0f766e;
  color: white;
}

.iconSwitchIcon {
  z-index: 1;
  display: inline-flex;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 800;
}

.iconSwitchThumb {
  position: absolute;
  inset-block-start: 0.2rem;
  inset-inline-start: 0.22rem;
  inline-size: 1.45rem;
  block-size: 1.45rem;
  border-radius: 999px;
  background: white;
  transition: transform 140ms ease;
}

.iconSwitch[data-state='on'] .iconSwitchThumb {
  transform: translateX(1.86rem);
}`,
        note:
          'icon は補助表現に留め、accessible name は text label 側で担保します。on/off を icon だけに依存しないことが重要です。',
      },
      {
        id: 'switch-with-icons-tsx',
        label: 'With Icons TSX',
        language: 'tsx',
        code: `const [quietHours, setQuietHours] = useState(false);

<button
  aria-checked={quietHours}
  aria-label="集中モードを切り替える"
  className={styles.iconSwitch}
  data-state={quietHours ? 'on' : 'off'}
  onClick={() => setQuietHours((current) => !current)}
  role="switch"
  type="button">
  <span aria-hidden="true" className={styles.iconSwitchIcon}>月</span>
  <span aria-hidden="true" className={styles.iconSwitchIcon}>太陽</span>
  <span aria-hidden="true" className={styles.iconSwitchThumb} />
</button>`,
        note:
          '状態の意味が曖昧な icon は避け、必要なら隣接する label / helper text で「何を切り替えるか」を明示します。',
      },
      {
        id: 'switch-with-labels-css',
        label: 'With Labels CSS',
        language: 'css',
        code: `.labeledSwitchRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.labeledSwitchText {
  display: grid;
  gap: 0.2rem;
}

.labeledSwitchText strong {
  color: var(--ifm-color-emphasis-900);
}

.labeledSwitchText span {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.9rem;
}`,
        note:
          'label left / label right は情報密度で使い分けます。説明が必要な設定は label block と switch を左右に分けると scanning しやすくなります。',
      },
      {
        id: 'switch-with-labels-tsx',
        label: 'With Labels TSX',
        language: 'tsx',
        code: `const [digestEnabled, setDigestEnabled] = useState(true);

<div className={styles.labeledSwitchRow}>
  <span className={styles.labeledSwitchText} id="digest-label">
    <strong>週次ダイジェスト</strong>
    <span>毎週月曜に更新内容をまとめて受け取る</span>
  </span>
  <button
    aria-checked={digestEnabled}
    aria-labelledby="digest-label"
    className={styles.switch}
    onClick={() => setDigestEnabled((current) => !current)}
    role="switch"
    type="button">
    <span aria-hidden="true" className={styles.switchThumb} />
  </button>
</div>`,
        note:
          '説明付き layout では `aria-labelledby` で label block と switch を結び、クリック可能領域と読み上げ名を一致させます。',
      },
      {
        id: 'switch-settings-list-css',
        label: 'Settings List CSS',
        language: 'css',
        code: `.settingsList {
  display: grid;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.75rem;
  overflow: hidden;
}

.settingsItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
}

.settingsItem + .settingsItem {
  border-top: 1px solid var(--ifm-color-emphasis-200);
}

.switchLoading {
  cursor: wait;
  opacity: 0.72;
}`,
        note:
          'settings list では row ごとに label、description、loading state、switch をまとめます。非同期保存中は同じ row 内で状態を返します。',
      },
      {
        id: 'switch-settings-list-tsx',
        label: 'Settings List TSX',
        language: 'tsx',
        code: `const [settings, setSettings] = useState({
  releaseNotes: true,
  betaFeatures: false,
});
const [savingKey, setSavingKey] = useState<keyof typeof settings | null>(null);

function toggleSetting(key: keyof typeof settings): void {
  setSavingKey(key);
  setSettings((current) => ({...current, [key]: !current[key]}));
  window.setTimeout(() => setSavingKey(null), 600);
}

<div className={styles.settingsList}>
  {[
    ['releaseNotes', 'リリース通知', '重要な更新を公開時に受け取る'],
    ['betaFeatures', 'ベータ機能', '検証中の機能をこの workspace で有効にする'],
  ].map(([key, label, description]) => {
    const settingKey = key as keyof typeof settings;
    const isSaving = savingKey === settingKey;

    return (
      <div className={styles.settingsItem} key={settingKey}>
        <span id={\`\${settingKey}-label\`}>
          <strong>{label}</strong>
          <span>{description}</span>
        </span>
        <button
          aria-busy={isSaving}
          aria-checked={settings[settingKey]}
          aria-labelledby={\`\${settingKey}-label\`}
          className={clsx(styles.switch, isSaving && styles.switchLoading)}
          disabled={isSaving}
          onClick={() => toggleSetting(settingKey)}
          role="switch"
          type="button">
          <span aria-hidden="true" className={styles.switchThumb} />
        </button>
      </div>
    );
  })}
</div>`,
        note:
          'loading state は保存完了前の二重操作を防ぐために使います。実 API では optimistic update / rollback / error 表示の方針を別途決めます。',
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
      'React state で値と active track を同期し、ドラッグとキーボード操作の両方で即時反映する single slider 実装例です。',
    items: [
      {
        id: 'range-slider-filter-css',
        label: 'CSS',
        language: 'css',
        code: `.sliderField {
  display: grid;
  gap: 0.75rem;
}

.sliderLabel {
  font-weight: 600;
}

.sliderLabels {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
}

.sliderTrackShell {
  position: relative;
  display: grid;
  align-items: center;
  min-block-size: 2rem;
}

.sliderTrack,
.sliderTrackActive {
  position: absolute;
  inset-inline-start: 0;
  block-size: 0.4rem;
  border-radius: 999px;
  pointer-events: none;
}

.sliderTrack {
  inline-size: 100%;
  background: var(--ifm-color-emphasis-200);
}

.sliderTrackActive {
  inline-size: 0;
  background: var(--ifm-color-primary);
}

.sliderRange {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 100%;
  block-size: 2rem;
  margin: 0;
  background: transparent;
}

.sliderRange::-webkit-slider-runnable-track {
  block-size: 0.4rem;
  background: transparent;
}

.sliderRange::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 1.2rem;
  block-size: 1.2rem;
  margin-top: -0.4rem;
  border: 2px solid var(--ifm-color-primary);
  border-radius: 999px;
  background: white;
}

.sliderRange::-moz-range-track {
  block-size: 0.4rem;
  background: transparent;
}

.sliderRange::-moz-range-thumb {
  inline-size: 1.2rem;
  block-size: 1.2rem;
  border: 2px solid var(--ifm-color-primary);
  border-radius: 999px;
  background: white;
}

/* focus-visible でアウトラインを残し、キーボード操作でも位置を見失わないようにする */
.sliderRange:focus-visible {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 0.2rem;
}

.sliderRange:hover::-webkit-slider-thumb,
.sliderRange:hover::-moz-range-thumb {
  transform: scale(1.04);
}

.sliderRange:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.sliderHint {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.9rem;
}

.sliderCurrentValue {
  font-weight: 700;
}`,
        note:
          'track / thumb / active range を分けておくと、現在の位置と有効範囲が伝わりやすくなります。exact value 入力は別フィールドへ任せ、slider では即時反映と操作感を優先します。',
      },
      {
        id: 'range-slider-filter-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `import {useState, type ReactNode} from 'react';

const MIN_PRICE = 0;
const MAX_PRICE = 10_000;
const PRICE_STEP = 500;

export function PriceRangeFilter(): ReactNode {
  const [price, setPrice] = useState(6_000);
  const sliderProgress = ((price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <section aria-labelledby="price-filter-title" className={styles.sliderField}>
      <h2 id="price-filter-title">価格帯で絞り込む</h2>
      <label className={styles.sliderLabel} htmlFor="price-range">
        上限価格
      </label>

      <div className={styles.sliderLabels}>
        <span>{MIN_PRICE.toLocaleString()}円</span>
        <strong>{\`〜 \${price.toLocaleString()}円\`}</strong>
        <span>{MAX_PRICE.toLocaleString()}円</span>
      </div>

      <div className={styles.sliderTrackShell}>
        <span aria-hidden="true" className={styles.sliderTrack} />
        <span
          aria-hidden="true"
          className={styles.sliderTrackActive}
          style={{width: \`\${sliderProgress}%\`}}
        />
        {/* 左右矢印キーで step 単位に増減し、Home / End キーで min / max に移動できます。 */}
        {/* aria-valuemin / aria-valuemax / aria-valuenow を揃え、aria-label または label で目的を明示します。 */}
        <input
          aria-describedby="price-filter-hint"
          aria-label="表示する価格帯の上限"
          aria-valuemax={MAX_PRICE}
          aria-valuemin={MIN_PRICE}
          aria-valuenow={price}
          className={styles.sliderRange}
          id="price-range"
          max={MAX_PRICE}
          min={MIN_PRICE}
          onChange={(event) => setPrice(Number(event.target.value))}
          step={PRICE_STEP}
          type="range"
          value={price}
        />
      </div>

      <p id="price-filter-hint" className={styles.sliderHint}>
        ドラッグやキーボード操作の直後に結果一覧を即時更新します。
      </p>
      <output aria-live="polite" className={styles.sliderCurrentValue}>
        {\`現在値: \${price.toLocaleString()}円\`}
      </output>
    </section>
  );
}`,
        note:
          'dual-thumb の複雑な実装は初回スコープ外とし、まず single slider / onChange / aria 属性 / 現在値表示の関係を分かりやすく揃える方針に寄せます。',
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
