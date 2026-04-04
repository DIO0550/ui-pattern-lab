import {useId, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ControllerPatternMetadataPanel from '@site/src/components/ControllerPatternMetadataPanel';
import PatternReferenceContent from '@site/src/components/PatternReferenceContent';
import ControllerPatternSnippetPanel from '@site/src/components/ControllerPatternSnippetPanel';
import type {
  ControllerPatternEntry,
  ControllerPatternMetadataItem,
} from '@site/src/data/controllerPatternTypes';

import styles from './styles.module.css';

type ControllerPatternGalleryProps = {
  entries: ControllerPatternEntry[];
  density: 'list' | 'detail';
};

type DemoRenderer = () => ReactNode;

const segmentedViewModeOrder = ['list', 'grid', 'board'] as const;

type SegmentedViewMode = (typeof segmentedViewModeOrder)[number];

type SegmentedViewModeDefinition = {
  label: string;
  title: string;
  description: string;
  bodyLabel: string;
};

const DEFAULT_SEGMENTED_VIEW_MODE: SegmentedViewMode = 'grid';

const segmentedViewModeDefinitions: Readonly<
  Record<SegmentedViewMode, SegmentedViewModeDefinition>
> = {
  list: {
    label: 'List',
    title: 'List view',
    description: '1 行ずつ密度高く確認し、同じ view のまま比較対象を流し読みする構成です。',
    bodyLabel: '縦方向に一覧を確認する',
  },
  grid: {
    label: 'Grid',
    title: 'Grid view',
    description: 'カードを近接配置し、同じ view の local state を即時に切り替えて見比べます。',
    bodyLabel: 'カードを並べて比較する',
  },
  board: {
    label: 'Board',
    title: 'Board view',
    description: '状態や列ごとのまとまりを保ちながら、同じデータを board 形式で眺めます。',
    bodyLabel: '列ごとにまとまりを確認する',
  },
};

const segmentedViewPreviewItems = ['Orders', 'Returns', 'Scheduled', 'Drafts'] as const;

const tabsInlinePanelOrder = ['overview', 'activity', 'settings'] as const;

type TabsInlinePanelId = (typeof tabsInlinePanelOrder)[number];

type TabsInlinePanelDefinition = {
  label: string;
  title: string;
  description: string;
  body: string;
};

const DEFAULT_TABS_INLINE_PANEL_ID: TabsInlinePanelId = 'activity';

const tabsInlinePanelDefinitions: Readonly<
  Record<TabsInlinePanelId, TabsInlinePanelDefinition>
> = {
  overview: {
    label: '概要',
    title: '概要',
    description: 'アカウント全体の要点をひと目で確認する',
    body: 'プロフィール、公開状態、接続済みサービスの要約',
  },
  activity: {
    label: 'アクティビティ',
    title: 'アクティビティ',
    description: '最近の更新や通知の流れを追う',
    body: '更新履歴、コメント、レビュー待ち項目の要約',
  },
  settings: {
    label: '設定',
    title: '設定',
    description: '通知や公開範囲をこの場で調整する',
    body: '通知、権限、表示設定のグループ',
  },
};

const sortFilterToolbarFilterOrder = ['in-stock', 'free-shipping'] as const;

type SortFilterToolbarFilterId = (typeof sortFilterToolbarFilterOrder)[number];

type SortFilterToolbarFilterDefinition = {
  label: string;
};

const sortFilterToolbarFilterDefinitions: Readonly<
  Record<SortFilterToolbarFilterId, SortFilterToolbarFilterDefinition>
> = {
  'in-stock': {
    label: '在庫あり',
  },
  'free-shipping': {
    label: '送料無料',
  },
};

const DEFAULT_SORT_FILTER_TOOLBAR_ACTIVE_FILTER_IDS: SortFilterToolbarFilterId[] = [
  'in-stock',
  'free-shipping',
];

const sortFilterToolbarSortOrder = ['popular', 'newest', 'price-asc'] as const;

type SortFilterToolbarSortId = (typeof sortFilterToolbarSortOrder)[number];

type SortFilterToolbarSortDefinition = {
  label: string;
};

const DEFAULT_SORT_FILTER_TOOLBAR_SORT_ID: SortFilterToolbarSortId = 'popular';

const sortFilterToolbarSortDefinitions: Readonly<
  Record<SortFilterToolbarSortId, SortFilterToolbarSortDefinition>
> = {
  popular: {
    label: '人気順',
  },
  newest: {
    label: '新着順',
  },
  'price-asc': {
    label: '価格の安い順',
  },
};

type SortFilterToolbarResultCountKey =
  | ''
  | 'free-shipping'
  | 'in-stock'
  | 'in-stock|free-shipping';

const sortFilterToolbarResultCountByKey: Readonly<
  Record<SortFilterToolbarResultCountKey, number>
> = {
  '': 156,
  'free-shipping': 142,
  'in-stock': 142,
  'in-stock|free-shipping': 128,
};

/**
 * Returns the next tab id when keyboard navigation moves within the tablist.
 */
function getNextTabsInlinePanelId({
  currentTabId,
  key,
}: {
  currentTabId: TabsInlinePanelId;
  key: string;
}): TabsInlinePanelId | null {
  const currentIndex = tabsInlinePanelOrder.indexOf(currentTabId);

  if (currentIndex === -1) {
    return null;
  }

  if (key === 'ArrowRight') {
    return tabsInlinePanelOrder[(currentIndex + 1) % tabsInlinePanelOrder.length];
  }

  if (key === 'ArrowLeft') {
    return tabsInlinePanelOrder[
      (currentIndex - 1 + tabsInlinePanelOrder.length) % tabsInlinePanelOrder.length
    ];
  }

  if (key === 'Home') {
    return tabsInlinePanelOrder[0];
  }

  if (key === 'End') {
    return tabsInlinePanelOrder[tabsInlinePanelOrder.length - 1];
  }

  return null;
}

/**
 * Keeps the active filter ids in presentation order while toggling one filter.
 */
function toggleSortFilterToolbarFilter({
  currentFilterIds,
  filterId,
}: {
  currentFilterIds: readonly SortFilterToolbarFilterId[];
  filterId: SortFilterToolbarFilterId;
}): SortFilterToolbarFilterId[] {
  const nextFilterIds = currentFilterIds.includes(filterId)
    ? currentFilterIds.filter((currentFilterId) => currentFilterId !== filterId)
    : [...currentFilterIds, filterId];

  return sortFilterToolbarFilterOrder.filter((candidateId) =>
    nextFilterIds.includes(candidateId),
  );
}

/**
 * Builds a stable lookup key for the active filter combination.
 */
function buildSortFilterToolbarKey(
  filterIds: readonly SortFilterToolbarFilterId[],
): SortFilterToolbarResultCountKey {
  const hasInStock = filterIds.includes('in-stock');
  const hasFreeShipping = filterIds.includes('free-shipping');

  if (hasInStock && hasFreeShipping) {
    return 'in-stock|free-shipping';
  }

  if (hasInStock) {
    return 'in-stock';
  }

  if (hasFreeShipping) {
    return 'free-shipping';
  }

  return '';
}

/**
 * Narrows native select values to the known sort ids used in the demo.
 */
function isSortFilterToolbarSortId(
  value: string,
): value is SortFilterToolbarSortId {
  return (
    value === 'popular' || value === 'newest' || value === 'price-asc'
  );
}

/**
 * Returns the demo result count for the current filter combination.
 */
function getSortFilterToolbarResultCount(
  filterIds: readonly SortFilterToolbarFilterId[],
): number {
  const lookupKey = buildSortFilterToolbarKey(filterIds);

  return sortFilterToolbarResultCountByKey[lookupKey];
}

function EmptyState({message}: {message: string}): ReactNode {
  return <p className={styles.emptyState}>{message}</p>;
}

function buildMetadataItems(entry: ControllerPatternEntry): ControllerPatternMetadataItem[] {
  const items: ControllerPatternMetadataItem[] = [
    {label: '課題', tone: 'problem', value: entry.problem},
    {label: '解決方法', tone: 'solution', value: entry.solution},
    {label: '向いている場面', tone: 'usage', value: entry.whenToUse},
    {label: '比較メモ', tone: 'comparison', value: entry.comparisonTip},
    {label: '操作設計メモ', tone: 'interaction', value: entry.interactionNotes},
    {label: 'アクセシビリティ', tone: 'accessibility', value: entry.accessibilityNotes},
  ];

  if (entry.futureExtensions) {
    items.push({
      label: '将来拡張',
      tone: 'future',
      value: entry.futureExtensions,
    });
  }

  return items;
}

function PreviewPanel({
  entry,
}: {
  entry: ControllerPatternEntry;
}): ReactNode {
  const Demo = demoByKind[entry.demoKind];
  return <Demo />;
}

function SegmentedViewSwitcherDemo(): ReactNode {
  const groupLabelId = useId();
  const [activeMode, setActiveMode] =
    useState<SegmentedViewMode>(DEFAULT_SEGMENTED_VIEW_MODE);
  const activeView = segmentedViewModeDefinitions[activeMode];

  return (
    <div className={styles.demoPanel}>
      <div className={styles.segmentedDemoHeader}>
        <div className={styles.segmentedDemoHeading}>
          <span className={styles.mockEyebrow} id={groupLabelId}>
            表示モード
          </span>
          <strong>{activeView.title}</strong>
        </div>
        <span className={styles.segmentedDemoState}>Local UI state</span>
      </div>
      <div
        aria-labelledby={groupLabelId}
        className={styles.segmentedGroup}
        role="group">
        {segmentedViewModeOrder.map((modeId) => {
          const mode = segmentedViewModeDefinitions[modeId];
          const isActive = activeMode === modeId;

          return (
            <button
              aria-pressed={isActive}
              className={clsx(
                styles.segmentedButton,
                isActive && styles.segmentedButtonActive,
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
              {mode.label}
            </button>
          );
        })}
      </div>
      <div className={styles.segmentedResultPanel}>
        <div className={styles.segmentedResultHeader}>
          <span className={styles.mockEyebrow}>現在の結果</span>
          <strong>{activeView.bodyLabel}</strong>
        </div>
        <p aria-live="polite" className={styles.segmentedResultDescription}>
          {activeView.description}
        </p>
        <div className={styles.segmentedResultItems} data-view-mode={activeMode}>
          {segmentedViewPreviewItems.map((item) => (
            <span
              className={styles.segmentedResultCard}
              data-view-mode={activeMode}
              key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className={styles.demoNote}>
        少数の mode をその場で切り替え、active state・結果・accessible name を近接表示する軽量 demo です。
      </p>
    </div>
  );
}

function TabsInlinePanelSwitcherDemo(): ReactNode {
  const tabListLabelId = useId();
  const tabIdBase = useId();
  const [activeTabId, setActiveTabId] =
    useState<TabsInlinePanelId>(DEFAULT_TABS_INLINE_PANEL_ID);

  return (
    <div className={styles.demoPanel}>
      <div
        aria-labelledby={tabListLabelId}
        className={styles.mockTabList}
        role="tablist">
        <span className={clsx(styles.mockEyebrow, styles.tabListLabel)} id={tabListLabelId}>
          表示セクション
        </span>
        {tabsInlinePanelOrder.map((tabId) => {
          const tab = tabsInlinePanelDefinitions[tabId];
          const isActive = activeTabId === tabId;
          const tabButtonId = `${tabIdBase}-${tabId}-tab`;
          const tabPanelId = `${tabIdBase}-${tabId}-panel`;

          return (
            <button
              aria-controls={tabPanelId}
              aria-selected={isActive}
              className={clsx(
                styles.mockTab,
                styles.tabTriggerButton,
                isActive && styles.mockTabActive,
              )}
              id={tabButtonId}
              key={tabId}
              onClick={() => {
                setActiveTabId((currentTabId) => {
                  if (currentTabId === tabId) {
                    return currentTabId;
                  }

                  return tabId;
                });
              }}
              onKeyDown={(event) => {
                const nextTabId = getNextTabsInlinePanelId({
                  currentTabId: tabId,
                  key: event.key,
                });

                if (!nextTabId) {
                  return;
                }

                event.preventDefault();
                setActiveTabId(nextTabId);
                document.getElementById(`${tabIdBase}-${nextTabId}-tab`)?.focus();
              }}
              role="tab"
              type="button">
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabsInlinePanelOrder.map((tabId) => {
        const panel = tabsInlinePanelDefinitions[tabId];
        const isActive = activeTabId === tabId;

        return (
          <div
            aria-labelledby={`${tabIdBase}-${tabId}-tab`}
            className={clsx(styles.mockSurface, styles.tabPanelSurface)}
            hidden={!isActive}
            id={`${tabIdBase}-${tabId}-panel`}
            key={tabId}
            role="tabpanel">
            <div className={styles.tabPanelHeader}>
              <span className={styles.mockEyebrow}>表示中のパネル</span>
              <strong>{panel.title}</strong>
            </div>
            <p className={styles.tabPanelDescription}>{panel.description}</p>
            <div className={styles.tabPanelBody}>{panel.body}</div>
            <div className={styles.mockToolbarRow}>
              <span className={styles.mockChip}>同一 view 内</span>
              <span className={styles.mockChip}>panel switch</span>
            </div>
          </div>
        );
      })}
      <p className={styles.demoNote}>
        tablist と tabpanel の関係を保ちながら、同一ページ内の panel を切り替える interactive demo です。
      </p>
    </div>
  );
}

function SortFilterToolbarDemo(): ReactNode {
  const toolbarLabelId = useId();
  const [selectedSortId, setSelectedSortId] = useState<SortFilterToolbarSortId>(
    DEFAULT_SORT_FILTER_TOOLBAR_SORT_ID,
  );
  const [activeFilterIds, setActiveFilterIds] = useState<SortFilterToolbarFilterId[]>(
    DEFAULT_SORT_FILTER_TOOLBAR_ACTIVE_FILTER_IDS,
  );
  const resultCount = getSortFilterToolbarResultCount(activeFilterIds);
  const hasActiveFilters = activeFilterIds.length > 0;
  const activeFilterSummary = hasActiveFilters
    ? activeFilterIds
        .map((filterId) => sortFilterToolbarFilterDefinitions[filterId].label)
        .join('・')
    : '絞り込みなし';

  return (
    <div className={styles.demoPanel}>
      <div
        aria-labelledby={toolbarLabelId}
        className={styles.mockToolbar}
        role="toolbar">
        <div className={clsx(styles.mockToolbarRow, styles.toolbarHeaderRow)}>
          <div className={styles.toolbarCountBlock}>
            <span className={styles.mockEyebrow} id={toolbarLabelId}>
              一覧コントロール
            </span>
            <output aria-live="polite" className={styles.mockMetric}>
              {`${resultCount} 件`}
            </output>
          </div>
          <label className={styles.toolbarSelectField}>
            <span className={styles.mockEyebrow}>並び順</span>
            <select
              aria-label="並び順"
              className={styles.toolbarSelect}
              onChange={(event) => {
                if (isSortFilterToolbarSortId(event.target.value)) {
                  setSelectedSortId(event.target.value);
                }
              }}
              value={selectedSortId}>
              {sortFilterToolbarSortOrder.map((sortId) => (
                <option key={sortId} value={sortId}>
                  {sortFilterToolbarSortDefinitions[sortId].label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={clsx(styles.mockToolbarRow, styles.toolbarChipRow)}>
          {sortFilterToolbarFilterOrder.map((filterId) => {
            const filter = sortFilterToolbarFilterDefinitions[filterId];
            const isActive = activeFilterIds.includes(filterId);

            return (
              <button
                aria-pressed={isActive}
                className={clsx(
                  styles.mockChip,
                  styles.toolbarFilterButton,
                  isActive && styles.mockChipActive,
                )}
                key={filterId}
                onClick={() => {
                  setActiveFilterIds((currentFilterIds) =>
                    toggleSortFilterToolbarFilter({
                      currentFilterIds,
                      filterId,
                    }),
                  );
                }}
                type="button">
                {filter.label}
              </button>
            );
          })}
          <button
            className={clsx(styles.mockButton, styles.toolbarClearButton)}
            disabled={!hasActiveFilters}
            onClick={() => setActiveFilterIds([])}
            type="button">
            条件をクリア
          </button>
        </div>
        <p aria-live="polite" className={styles.toolbarStatusText}>
          {`${sortFilterToolbarSortDefinitions[selectedSortId].label}で表示中 ・ ${activeFilterSummary}`}
        </p>
      </div>
      <p className={styles.demoNote}>
        結果件数・並び順・active filter・clear action を同じ toolbar 面で扱う interactive demo です。
      </p>
    </div>
  );
}

function PaginationAndPageSizeControllerDemo(): ReactNode {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.mockToolbarRow}>
        <span className={styles.mockMetric}>51–75 / 240 件</span>
        <span className={styles.mockSelect}>25件表示</span>
      </div>
      <div className={styles.mockPager}>
        <span className={clsx(styles.mockButton, styles.mockButtonDisabled)}>前へ</span>
        <span className={styles.mockButton}>1</span>
        <span className={styles.mockButton}>2</span>
        <span className={clsx(styles.mockButton, styles.mockButtonActive)}>3</span>
        <span className={styles.mockButton}>4</span>
        <span className={styles.mockButton}>次へ</span>
      </div>
      <p className={styles.demoNote}>current page と page size を同時に扱い、閲覧位置を把握しやすくします。</p>
    </div>
  );
}

const RANGE_SLIDER_MIN = 0;
const RANGE_SLIDER_MAX = 10_000;
const RANGE_SLIDER_STEP = 500;
const RANGE_SLIDER_INITIAL_VALUE = 6_000;

const rangeSliderCurrencyFormatter = new Intl.NumberFormat('ja-JP');

/**
 * Formats range slider values for the demo labels and output.
 */
function formatRangeSliderCurrency(value: number): string {
  return `${rangeSliderCurrencyFormatter.format(value)}円`;
}

function RangeSliderFilterDemo(): ReactNode {
  const [value, setValue] = useState(RANGE_SLIDER_INITIAL_VALUE);
  const sliderProgress =
    ((value - RANGE_SLIDER_MIN) / (RANGE_SLIDER_MAX - RANGE_SLIDER_MIN)) * 100;

  return (
    <div className={clsx(styles.demoPanel, styles.sliderField)}>
      <span className={styles.sliderLabel}>価格帯の上限</span>
      <div className={styles.mockToolbarRow}>
        <span>{formatRangeSliderCurrency(RANGE_SLIDER_MIN)}</span>
        <strong>{`〜 ${formatRangeSliderCurrency(value)}`}</strong>
        <span>{formatRangeSliderCurrency(RANGE_SLIDER_MAX)}</span>
      </div>
      <div className={styles.sliderTrackShell}>
        <span aria-hidden="true" className={styles.sliderTrack} />
        <span
          aria-hidden="true"
          className={styles.sliderTrackActive}
          style={{width: `${sliderProgress}%`}}
        />
        <input
          aria-label="価格帯の上限"
          aria-valuemax={RANGE_SLIDER_MAX}
          aria-valuemin={RANGE_SLIDER_MIN}
          aria-valuenow={value}
          className={styles.sliderRange}
          max={RANGE_SLIDER_MAX}
          min={RANGE_SLIDER_MIN}
          onChange={(event) => setValue(Number(event.target.value))}
          step={RANGE_SLIDER_STEP}
          type="range"
          value={value}
        />
      </div>
      <p className={styles.sliderHint}>
        ドラッグ中の値変化を一覧や preview に即時反映する想定です。
      </p>
      <output aria-live="polite" className={styles.sliderCurrentValue}>
        {`現在値: ${formatRangeSliderCurrency(value)}`}
      </output>
      <p className={styles.demoNote}>
        ドラッグや左右キーで step 単位に調整し、現在値と一覧への反映条件を同時に確認できる single slider の demo
        です。
      </p>
    </div>
  );
}

function QuantityStepperControlDemo(): ReactNode {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.mockStepper}>
        <span className={clsx(styles.mockButton, styles.mockButtonDisabled)}>−</span>
        <span className={styles.mockValue}>2</span>
        <span className={clsx(styles.mockButton, styles.mockButtonActive)}>＋</span>
      </div>
      <p className={styles.demoNote}>狭い範囲の numeric adjustment に絞り、min / max と disabled を示します。</p>
    </div>
  );
}

const demoByKind: Record<ControllerPatternEntry['demoKind'], DemoRenderer> = {
  'segmented-view-switcher': SegmentedViewSwitcherDemo,
  'tabs-inline-panel-switcher': TabsInlinePanelSwitcherDemo,
  'sort-filter-toolbar': SortFilterToolbarDemo,
  'pagination-and-page-size-controller': PaginationAndPageSizeControllerDemo,
  'range-slider-filter': RangeSliderFilterDemo,
  'quantity-stepper-control': QuantityStepperControlDemo,
};

export default function ControllerPatternGallery({
  entries,
  density,
}: ControllerPatternGalleryProps): ReactNode {
  if (entries.length === 0) {
    return <EmptyState message="表示できる controller pattern がありません。" />;
  }

  return (
    <div className={clsx(styles.root, density === 'detail' && styles.detailRoot)}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => {
          const metadataItems = buildMetadataItems(entry);

          if (density === 'detail') {
            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
                <PatternReferenceContent
                  id={entry.id}
                  notes={metadataItems.map((item) => ({
                    id: `${entry.id}-${item.tone}`,
                    label: item.label,
                    value: item.value,
                  }))}
                  preview={
                    <div className={clsx(styles.demoPanel, styles.detailPreviewPanel)}>
                      <PreviewPanel entry={entry} />
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
                <PreviewPanel entry={entry} />
                <ControllerPatternSnippetPanel
                  density={density}
                  entryTitle={entry.title}
                  snippets={entry.snippets}
                />
                <ControllerPatternMetadataPanel
                  density={density}
                  entryTitle={entry.title}
                  items={metadataItems}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
