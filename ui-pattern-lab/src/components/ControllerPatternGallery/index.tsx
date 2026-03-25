import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import ControllerPatternMetadataPanel from '@site/src/components/ControllerPatternMetadataPanel';
import ControllerPatternSectionCard from '@site/src/components/ControllerPatternSectionCard';
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
  density,
}: {
  entry: ControllerPatternEntry;
  density: 'list' | 'detail';
}): ReactNode {
  const Demo = demoByKind[entry.demoKind];
  const content = <Demo />;

  if (density === 'detail') {
    return (
      <ControllerPatternSectionCard
        ariaLabel={`${entry.title}のプレビュー`}
        description="本番コードそのものではなく、pattern の要点と操作感を把握するための preview demo です。"
        label="見た目"
        title="プレビュー">
        {content}
      </ControllerPatternSectionCard>
    );
  }

  return content;
}

function SegmentedViewSwitcherDemo(): ReactNode {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.mockRow}>
        <span className={styles.mockButton}>List</span>
        <span className={clsx(styles.mockButton, styles.mockButtonActive)}>Grid</span>
        <span className={styles.mockButton}>Board</span>
      </div>
      <div className={styles.mockSurface}>
        <div className={styles.mockHeader}>
          <span className={styles.mockEyebrow}>Active view</span>
          <strong>Grid preview</strong>
        </div>
        <div className={styles.mockTileGrid}>
          <span className={styles.mockTile}>Card 1</span>
          <span className={styles.mockTile}>Card 2</span>
          <span className={styles.mockTile}>Card 3</span>
          <span className={styles.mockTile}>Card 4</span>
        </div>
      </div>
      <p className={styles.demoNote}>現在モードと結果を近接表示し、mode switch だと伝える構成です。</p>
    </div>
  );
}

function TabsInlinePanelSwitcherDemo(): ReactNode {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.mockTabList}>
        <span className={styles.mockTab}>概要</span>
        <span className={clsx(styles.mockTab, styles.mockTabActive)}>アクティビティ</span>
        <span className={styles.mockTab}>設定</span>
      </div>
      <div className={styles.mockSurface}>
        <div className={styles.mockHeader}>
          <span className={styles.mockEyebrow}>Current panel</span>
          <strong>アクティビティ</strong>
        </div>
        <div className={styles.mockParagraphGroup}>
          <span className={styles.mockParagraph} />
          <span className={styles.mockParagraph} />
          <span className={styles.mockParagraphShort} />
        </div>
      </div>
      <p className={styles.demoNote}>navigation ではなく inline panel switch であることを保つデモです。</p>
    </div>
  );
}

function SortFilterToolbarDemo(): ReactNode {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.mockToolbar}>
        <div className={styles.mockToolbarRow}>
          <span className={styles.mockMetric}>128 件</span>
          <span className={styles.mockSelect}>人気順</span>
        </div>
        <div className={styles.mockToolbarRow}>
          <span className={clsx(styles.mockChip, styles.mockChipActive)}>在庫あり</span>
          <span className={clsx(styles.mockChip, styles.mockChipActive)}>送料無料</span>
          <span className={styles.mockChip}>価格帯</span>
          <span className={styles.mockChip}>絞り込みを開く</span>
        </div>
      </div>
      <p className={styles.demoNote}>結果件数・sort・active filter を 1 つの操作面で束ねます。</p>
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
          if (density === 'detail') {
            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
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

                <PreviewPanel density={density} entry={entry} />
                <ControllerPatternSnippetPanel
                  density={density}
                  entryTitle={entry.title}
                  snippets={entry.snippets}
                />
                <ControllerPatternMetadataPanel
                  density={density}
                  entryTitle={entry.title}
                  items={buildMetadataItems(entry)}
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
                <PreviewPanel density={density} entry={entry} />
                <ControllerPatternSnippetPanel
                  density={density}
                  entryTitle={entry.title}
                  snippets={entry.snippets}
                />
                <ControllerPatternMetadataPanel
                  density={density}
                  entryTitle={entry.title}
                  items={buildMetadataItems(entry)}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
