import type {ReactNode} from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import type {
  ControllerPatternEntry,
  ControllerPatternMetadataItem,
} from '@site/src/data/controllerPatternTypes';

import styles from './styles.module.css';

type ControllerPatternGalleryProps = {
  entries: ControllerPatternEntry[];
  density: 'list' | 'detail';
};

type SectionCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

type DemoRenderer = () => ReactNode;

const metadataToneClassName: Record<
  ControllerPatternMetadataItem['tone'],
  string
> = {
  problem: styles.toneProblem,
  solution: styles.toneSolution,
  usage: styles.toneUsage,
  comparison: styles.toneComparison,
  interaction: styles.toneInteraction,
  accessibility: styles.toneAccessibility,
};

function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: SectionCardProps): ReactNode {
  return (
    <section className={styles.sectionCard}>
      <header className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>{eyebrow}</span>
        <Heading as="h4" className={styles.sectionTitle}>
          {title}
        </Heading>
        <p className={styles.sectionDescription}>{description}</p>
      </header>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function EmptyState({message}: {message: string}): ReactNode {
  return <p className={styles.emptyState}>{message}</p>;
}

function buildMetadataItems(entry: ControllerPatternEntry): ControllerPatternMetadataItem[] {
  return [
    {label: '課題', tone: 'problem', value: entry.problem},
    {label: '解決方針', tone: 'solution', value: entry.solution},
    {label: '向いている場面', tone: 'usage', value: entry.whenToUse},
    {label: '比較メモ', tone: 'comparison', value: entry.comparisonTip},
    {label: '操作設計メモ', tone: 'interaction', value: entry.interactionNotes},
    {label: 'アクセシビリティ', tone: 'accessibility', value: entry.accessibilityNotes},
  ];
}

function MetadataPanel({
  entry,
  density,
}: {
  entry: ControllerPatternEntry;
  density: 'list' | 'detail';
}): ReactNode {
  const metadataItems = buildMetadataItems(entry);

  const content = (
    <dl className={styles.metadataList}>
      {metadataItems.map((item) => (
        <div
          className={clsx(styles.metadataItem, metadataToneClassName[item.tone])}
          key={`${entry.id}-${item.label}`}>
          <dt className={styles.metadataLabel}>{item.label}</dt>
          <dd className={styles.metadataValue}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );

  if (density === 'detail') {
    return (
      <SectionCard
        description="課題、解決方針、既存カテゴリとの境界、interaction / accessibility の注意点をまとめています。"
        eyebrow="Design notes"
        title="設計メモ">
        {content}
      </SectionCard>
    );
  }

  return content;
}

function SnippetPanel({
  entry,
  density,
}: {
  entry: ControllerPatternEntry;
  density: 'list' | 'detail';
}): ReactNode {
  const snippets = entry.snippets;

  if (!snippets) {
    const empty = (
      <EmptyState message="このパターンのコードサンプルはまだ追加されていません。" />
    );

    if (density === 'detail') {
      return (
        <SectionCard
          description="CSS / TSX の最小サンプルを載せる領域です。"
          eyebrow="Code"
          title="コードサンプル">
          {empty}
        </SectionCard>
      );
    }

    return empty;
  }

  const content =
    density === 'detail' ? (
      <div className={styles.codeSurface}>
        <p className={styles.codeSummary}>{snippets.snippetSummary}</p>
        <Tabs defaultValue={snippets.items[0]?.id}>
          {snippets.items.map((item) => (
            <TabItem key={item.id} label={item.label} value={item.id}>
              <CodeBlock language={item.language}>{item.code}</CodeBlock>
              {item.note ? <p className={styles.codeNote}>{item.note}</p> : null}
            </TabItem>
          ))}
        </Tabs>
      </div>
    ) : (
      <details className={styles.details}>
        <summary className={styles.detailsSummary}>
          <span className={styles.detailsLabel}>CSS / TSX サンプル</span>
          <span className={styles.detailsText}>{snippets.snippetSummary}</span>
        </summary>
        <div className={styles.detailsBody}>
          {snippets.items.map((item) => (
            <section className={styles.codeItem} key={item.id}>
              <Heading as="h4" className={styles.codeItemTitle}>
                {item.label}
              </Heading>
              <CodeBlock language={item.language}>{item.code}</CodeBlock>
              {item.note ? <p className={styles.codeNote}>{item.note}</p> : null}
            </section>
          ))}
        </div>
      </details>
    );

  if (density === 'detail') {
    return (
      <SectionCard
        description="初期実装の最小構成を CSS / TSX で確認できます。"
        eyebrow="Code"
        title="コードサンプル">
        {content}
      </SectionCard>
    );
  }

  return content;
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
      <SectionCard
        description="本番コードそのものではなく、pattern の要点だけを把握するための lightweight demo です。"
        eyebrow="Preview"
        title="lightweight demo">
        {content}
      </SectionCard>
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

function RangeSliderFilterDemo(): ReactNode {
  return (
    <div className={styles.demoPanel}>
      <div className={styles.mockToolbarRow}>
        <span>0円</span>
        <strong>〜 6,000円</strong>
        <span>10,000円</span>
      </div>
      <div className={styles.mockRange}>
        <span className={styles.mockRangeTrack} />
        <span className={styles.mockRangeActive} style={{width: '60%'}} />
        <span className={styles.mockRangeThumb} style={{left: '60%'}} />
      </div>
      <p className={styles.demoNote}>drag の直後に一覧や preview へ反映する continuous control を想定しています。</p>
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
        {entries.map((entry) => (
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

            <div className={clsx(styles.cardBody, density === 'detail' && styles.cardBodyDetail)}>
              <PreviewPanel density={density} entry={entry} />
              <SnippetPanel density={density} entry={entry} />
              <MetadataPanel density={density} entry={entry} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
