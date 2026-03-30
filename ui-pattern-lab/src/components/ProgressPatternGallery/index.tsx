import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import type {
  ButtonReferenceGuide,
  ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import ProgressPatternMetadataPanel from '@site/src/components/ProgressPatternMetadataPanel';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
} from '@site/src/components/PatternReferenceContent';
import ProgressPatternSnippetPanel from '@site/src/components/ProgressPatternSnippetPanel';
import type {
  ProgressDemoKind,
  ProgressPatternEntry,
  ProgressPatternMetadataItem,
} from '@site/src/data/progressPatternTypes';

import styles from './styles.module.css';

type ProgressPatternGalleryProps = {
  entries: ProgressPatternEntry[];
  density: 'list' | 'detail';
};

type DemoProps = {
  density: 'list' | 'detail';
};

type DemoRenderer = (props: DemoProps) => ReactNode;

type PreviewCardProps = {
  label: string;
  description: string;
  children: ReactNode;
  className?: string;
};

type DeterminatePreview = {
  id: string;
  label: string;
  description: string;
  value: number;
  stateText: string;
};

type BusyPreview = {
  id: string;
  label: string;
  description: string;
  title: string;
  statusText: string;
  isReducedMotionPreview?: boolean;
};

type SpinnerPreview = {
  id: string;
  label: string;
  description: string;
  statuses: Array<{
    label: string;
    ariaLabel: string;
    isStatic?: boolean;
  }>;
};

type StepperPreview = {
  id: string;
  title: string;
  description: string;
  state: 'complete' | 'current' | 'upcoming' | 'error';
  isCurrent?: boolean;
};

type CircularProgressSize = 'default' | 'large' | 'hero';

type CircularPreview = {
  id: string;
  label: string;
  description: string;
  title: string;
  centerLabel: string;
  value: number;
  stateText: string;
  size: CircularProgressSize;
};

type SkeletonAnimationKind = 'static' | 'pulse' | 'shimmer';

type SkeletonPreview = {
  id: string;
  label: string;
  description: string;
  statusText: string;
  animation: SkeletonAnimationKind;
};

const CIRCULAR_VIEWBOX_SIZE = 120;
const CIRCULAR_RING_CENTER = CIRCULAR_VIEWBOX_SIZE / 2;
const CIRCULAR_RING_RADIUS = 50;
const CIRCULAR_RING_CIRCUMFERENCE = 2 * Math.PI * CIRCULAR_RING_RADIUS;

const determinatePreviews: readonly DeterminatePreview[] = [
  {
    id: 'empty',
    label: '0%',
    description: '空トラックとラベルだけで開始直後の意味を保ちます。',
    value: 0,
    stateText: 'まだ処理を開始していません',
  },
  {
    id: 'mid',
    label: '45%',
    description: '中間値は件数や次の処理も併記します。',
    value: 45,
    stateText: '残り 12 件 / 完了後に確認画面へ進みます',
  },
  {
    id: 'complete',
    label: '100%',
    description: '到達直後も完了ラベルを残して意味を閉じます。',
    value: 100,
    stateText: 'アップロード完了',
  },
] as const;

const circularPreviews: readonly CircularPreview[] = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'カード内で使う標準サイズです。',
    title: '変換キューの進捗',
    centerLabel: '変換済み',
    value: 32,
    stateText: '4 / 12 件を完了',
    size: 'default',
  },
  {
    id: 'large',
    label: 'Large',
    description: '割合そのものを主役にしたいカード向けです。',
    title: '顧客同期の進捗',
    centerLabel: '同期済み',
    value: 68,
    stateText: '残り 8 分の見込み',
    size: 'large',
  },
  {
    id: 'hero',
    label: 'Hero',
    description: 'ダイアログや専用状態面で 1 件の進捗を大きく見せるサイズです。',
    title: 'オンボーディング達成率',
    centerLabel: '達成済み',
    value: 92,
    stateText: '最後の 1 ステップを確認中',
    size: 'hero',
  },
] as const;

const skeletonPreviews: readonly SkeletonPreview[] = [
  {
    id: 'static',
    label: 'Static',
    description: 'reduced motion や dense な画面でも意味を保ちやすい baseline です。',
    statusText: '動きなしでも本文の高さを先に確保します',
    animation: 'static',
  },
  {
    id: 'pulse',
    label: 'Pulse',
    description: '穏やかな待機表現で、本文の読み込みを控えめに知らせます。',
    statusText: '穏やかな変化で待機中を補助します',
    animation: 'pulse',
  },
  {
    id: 'shimmer',
    label: 'Shimmer',
    description: '主要領域の読み込みを少し強めに見せたいときの variant です。',
    statusText: '主状態の読み込みを強めに示します',
    animation: 'shimmer',
  },
] as const;

const indeterminatePreviews: readonly BusyPreview[] = [
  {
    id: 'section-busy',
    label: 'Section busy',
    description: '完了率不明の処理が続いていることを bar で示します。',
    title: '売上レポートを集計中',
    statusText: '完了時刻はまだ見積もれません',
  },
  {
    id: 'reduced-motion',
    label: 'Reduced motion',
    description: '静止バーとテキストで meaning を残す代替表現です。',
    title: '集計中',
    statusText: '動きを止めても処理中の意味を保ちます',
    isReducedMotionPreview: true,
  },
] as const;

const spinnerPreviews: readonly SpinnerPreview[] = [
  {
    id: 'inline-action',
    label: 'Local wait',
    description: 'ボタンやカード内の局所的な待機に限定します。',
    statuses: [
      {
        label: '保存中...',
        ariaLabel: 'プロフィール設定を保存中',
      },
    ],
  },
  {
    id: 'parallel-status',
    label: 'Unique labels',
    description: '複数 spinner は待機対象ごとに label を分けます。',
    statuses: [
      {
        label: '注文履歴を更新中',
        ariaLabel: '注文履歴を更新中',
      },
      {
        label: '請求情報を更新中',
        ariaLabel: '請求情報を更新中',
        isStatic: true,
      },
    ],
  },
] as const;

const stepperPreviews: readonly StepperPreview[] = [
  {
    id: 'cart',
    title: 'カート確認',
    description: '内容の確認が完了しました。',
    state: 'complete',
  },
  {
    id: 'shipping',
    title: '配送先入力',
    description: 'いま入力しているステップです。',
    state: 'current',
    isCurrent: true,
  },
  {
    id: 'payment',
    title: '支払い方法',
    description: '次に進むと開始されます。',
    state: 'upcoming',
  },
  {
    id: 'confirm',
    title: '確認と送信',
    description: '住所に不足があり、確認が必要です。',
    state: 'error',
  },
] as const;

function PreviewCard({
  label,
  description,
  children,
  className,
}: PreviewCardProps): ReactNode {
  return (
    <section className={clsx(styles.previewCard, className)}>
      <div className={styles.previewHeader}>
        <span className={styles.previewLabel}>{label}</span>
        <p className={styles.previewDescription}>{description}</p>
      </div>
      <div className={styles.previewContent}>{children}</div>
    </section>
  );
}

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">プログレスパターンはまだありません</Heading>
      <p>ギャラリーの受け皿はできていますが、比較対象のエントリはまだ登録されていません。</p>
    </div>
  );
}

/**
 * Converts a percentage value into the stroke offset for the circular ring.
 */
function calculateCircularProgressOffset(value: number): number {
  return CIRCULAR_RING_CIRCUMFERENCE * (1 - value / 100);
}

type CircularProgressMeterProps = {
  label: string;
  title: string;
  centerLabel: string;
  value: number;
  stateText: string;
  size: CircularProgressSize;
};

const circularSizeClassNames: Record<CircularProgressSize, string> = {
  default: styles.circularMeterDefault,
  large: styles.circularMeterLarge,
  hero: styles.circularMeterHero,
};

/**
 * Renders one determinate circular progress meter with a centered label.
 */
function CircularProgressMeter({
  label,
  title,
  centerLabel,
  value,
  stateText,
  size,
}: CircularProgressMeterProps): ReactNode {
  const progressOffset = calculateCircularProgressOffset(value);

  return (
    <div className={clsx(styles.circularMeter, circularSizeClassNames[size])}>
      <div
        aria-label={title}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuetext={value === 100 ? `${value}% 完了` : `${value}%`}
        className={styles.circularMeterVisual}
        role="progressbar">
        <svg
          aria-hidden="true"
          className={styles.circularMeterSvg}
          viewBox={`0 0 ${CIRCULAR_VIEWBOX_SIZE} ${CIRCULAR_VIEWBOX_SIZE}`}>
          <circle
            className={styles.circularTrack}
            cx={CIRCULAR_RING_CENTER}
            cy={CIRCULAR_RING_CENTER}
            r={CIRCULAR_RING_RADIUS}
          />
          <circle
            className={styles.circularFill}
            cx={CIRCULAR_RING_CENTER}
            cy={CIRCULAR_RING_CENTER}
            r={CIRCULAR_RING_RADIUS}
            strokeDasharray={CIRCULAR_RING_CIRCUMFERENCE}
            strokeDashoffset={progressOffset}
          />
        </svg>
        <div className={styles.circularMeterCenter}>
          <span className={styles.circularValue}>{value}%</span>
          <span className={styles.circularLabel}>{centerLabel}</span>
        </div>
      </div>
      <div className={styles.circularMeta}>
        <span className={styles.progressValue}>{label}</span>
        <span className={styles.progressState}>
          {title} / {stateText}
        </span>
      </div>
    </div>
  );
}

function DeterminateDemo({density}: DemoProps): ReactNode {
  const visiblePreviews =
    density === 'detail' ? determinatePreviews : [determinatePreviews[1]];

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        {visiblePreviews.map((preview) => (
          <PreviewCard
            description={preview.description}
            key={preview.id}
            label={preview.label}>
            <div className={styles.metricStack}>
              <div
                aria-label={`${preview.label}の進捗率`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={preview.value}
                aria-valuetext={
                  preview.value === 100 ? `${preview.value}% 完了` : `${preview.value}%`
                }
                className={styles.progressRail}
                role="progressbar">
                <span
                  className={styles.progressFill}
                  style={{width: `${preview.value}%`}}
                />
              </div>
              <div className={styles.progressMeta}>
                <span className={styles.progressValue}>{preview.label}</span>
                <span className={styles.progressState}>{preview.stateText}</span>
              </div>
            </div>
          </PreviewCard>
        ))}
      </div>
      <p className={styles.demoNote}>
        known total の処理では、割合だけでなく件数や完了後の状態も併記すると、0% と 100%
        の境界が誤解されにくくなります。
      </p>
    </div>
  );
}

function CircularProgressDemo({density}: DemoProps): ReactNode {
  const visiblePreviews = density === 'detail' ? circularPreviews : [circularPreviews[1]];

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        {visiblePreviews.map((preview) => (
          <PreviewCard
            description={preview.description}
            key={preview.id}
            label={preview.label}>
            <CircularProgressMeter
              centerLabel={preview.centerLabel}
              label={preview.label}
              size={preview.size}
              stateText={preview.stateText}
              title={preview.title}
              value={preview.value}
            />
          </PreviewCard>
        ))}
      </div>
      <p className={styles.demoNote}>
        circular progress は known total を前提に、割合そのものを視線の中心へ置きたいときに使います。large /
        hero size は主状態の強調に限定し、一覧で多数を並べる比較には線形 bar の方が向きます。
      </p>
    </div>
  );
}

function getSkeletonAnimationClassName(
  animation: SkeletonAnimationKind,
): string | undefined {
  if (animation === 'pulse') {
    return styles.skeletonPulse;
  }

  if (animation === 'shimmer') {
    return styles.skeletonShimmer;
  }

  return undefined;
}

type SkeletonSurfaceProps = {
  label: string;
  statusText: string;
  animation: SkeletonAnimationKind;
};

/**
 * Renders one skeleton placeholder surface with a single motion treatment.
 */
function SkeletonSurface({
  label,
  statusText,
  animation,
}: SkeletonSurfaceProps): ReactNode {
  return (
    <section
      aria-busy="true"
      className={clsx(styles.skeletonSurface, getSkeletonAnimationClassName(animation))}>
      <div className={styles.skeletonHeader}>
        <span>記事カードを読み込み中</span>
        <span className={styles.busyText}>{statusText}</span>
      </div>
      <article className={styles.skeletonCard}>
        <span className={styles.variantLabel}>{label}</span>
        <div aria-hidden="true" className={clsx(styles.skeletonBlock, styles.skeletonHero)} />
        <div aria-hidden="true" className={clsx(styles.skeletonBlock, styles.skeletonTitle)} />
        <div aria-hidden="true" className={styles.skeletonBlock} />
        <div aria-hidden="true" className={clsx(styles.skeletonBlock, styles.skeletonLineShort)} />
      </article>
    </section>
  );
}

function IndeterminateDemo({density}: DemoProps): ReactNode {
  const visiblePreviews =
    density === 'detail' ? indeterminatePreviews : [indeterminatePreviews[0]];

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        {visiblePreviews.map((preview) => (
          <PreviewCard
            className={preview.isReducedMotionPreview ? styles.reducedMotionPreview : undefined}
            description={preview.description}
            key={preview.id}
            label={preview.label}>
            <div aria-busy="true" className={styles.busyStack}>
              <div className={styles.busyHeader}>
                <span className={styles.busyTitle}>{preview.title}</span>
                <span className={styles.busyText}>{preview.statusText}</span>
              </div>
              <div
                aria-label={preview.title}
                aria-valuetext="進捗率は未確定"
                className={styles.indeterminateRail}
                role="progressbar">
                <span aria-hidden="true" className={styles.indeterminateBar} />
              </div>
            </div>
          </PreviewCard>
        ))}
      </div>
      <p className={styles.demoNote}>
        section 全体の処理中を示したいなら spinner より bar が範囲を伝えやすく、reduced
        motion 時も静止バーとテキストで meaning を保てます。
      </p>
    </div>
  );
}

function LoadingSpinnerDemo({density}: DemoProps): ReactNode {
  const visiblePreviews =
    density === 'detail' ? spinnerPreviews : [spinnerPreviews[0]];

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        {visiblePreviews.map((preview) => (
          <PreviewCard
            description={preview.description}
            key={preview.id}
            label={preview.label}>
            <div className={styles.statusColumn}>
              {preview.statuses.map((status) => (
                <div
                  aria-label={status.ariaLabel}
                  className={styles.spinnerRow}
                  key={status.ariaLabel}
                  role="status">
                  <span
                    aria-hidden="true"
                    className={clsx(
                      styles.spinnerGlyph,
                      status.isStatic && styles.spinnerGlyphStatic,
                    )}
                  />
                  <span>{status.label}</span>
                </div>
              ))}
            </div>
          </PreviewCard>
        ))}
      </div>
      <p className={styles.demoNote}>
        spinner は局所的な待機に限定し、複数並ぶ場面では `aria-label`
        を一意にして、どの領域が待機中かを読み上げでも区別できるようにします。
      </p>
    </div>
  );
}

function SkeletonPlaceholderDemo(_: DemoProps): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        {skeletonPreviews.map((preview) => (
          <PreviewCard
            description={preview.description}
            key={preview.id}
            label={preview.label}>
            <SkeletonSurface
              animation={preview.animation}
              label={preview.label}
              statusText={preview.statusText}
            />
          </PreviewCard>
        ))}
      </div>
      <p className={styles.demoNote}>
        generic な灰箱ではなく、最終レイアウトに近い骨組みを保ったうえで static / pulse / shimmer を使い分けます。
        reduced motion や情報量の高い画面では static を既定にし、pulse と shimmer は 1 surface
        につきどちらか片方だけを選びます。
      </p>
    </div>
  );
}

function StepperStatusTrackerDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="4 step 固定の wizard / checkout に限定し、履歴 timeline とは混同しません。"
          label="4-step wizard">
          <ol aria-label="購入手続きの進行状況" className={styles.stepper}>
            {stepperPreviews.map((step, index) => (
              <li
                aria-current={step.isCurrent ? 'step' : undefined}
                className={styles.stepItem}
                data-state={step.state}
                key={step.id}>
                <span className={styles.stepMarker}>{index + 1}</span>
                <div className={styles.stepBody}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        current / complete / upcoming / error を 1 画面で読み分けられるようにし、クリック遷移や timeline
        型の履歴表示は初回スコープに含めません。
      </p>
    </div>
  );
}

function buildDeterminateReferenceVariants(
  entry: ProgressPatternEntry,
): readonly ButtonReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return determinatePreviews.map((preview) => ({
    id: preview.id,
    name: preview.label,
    description: preview.description,
    preview: (
      <div className={styles.metricStack}>
        <div
          aria-label={`${preview.label}の進捗率`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={preview.value}
          aria-valuetext={preview.value === 100 ? `${preview.value}% 完了` : `${preview.value}%`}
          className={styles.progressRail}
          role="progressbar">
          <span className={styles.progressFill} style={{width: `${preview.value}%`}} />
        </div>
        <div className={styles.progressMeta}>
          <span className={styles.progressValue}>{preview.label}</span>
          <span className={styles.progressState}>{preview.stateText}</span>
        </div>
      </div>
    ),
    tabs,
  }));
}

function buildCircularReferenceVariants(
  entry: ProgressPatternEntry,
): readonly ButtonReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return circularPreviews.map((preview) => ({
    id: preview.id,
    name: preview.label,
    description: preview.description,
    preview: (
      <CircularProgressMeter
        centerLabel={preview.centerLabel}
        label={preview.label}
        size={preview.size}
        stateText={preview.stateText}
        title={preview.title}
        value={preview.value}
      />
    ),
    tabs,
  }));
}

function buildIndeterminateReferenceVariants(
  entry: ProgressPatternEntry,
): readonly ButtonReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return indeterminatePreviews.map((preview) => ({
    id: preview.id,
    name: preview.label,
    description: preview.description,
    preview: (
      <div className={styles.busyStack}>
        <div className={styles.busyHeader}>
          <span className={styles.busyTitle}>{preview.title}</span>
          <span className={styles.busyText}>{preview.statusText}</span>
        </div>
        <div
          aria-label={preview.title}
          aria-valuetext="進捗率は未確定"
          className={styles.indeterminateRail}
          role="progressbar">
          <span aria-hidden="true" className={styles.indeterminateBar} />
        </div>
      </div>
    ),
    tabs,
  }));
}

function buildLoadingSpinnerReferenceVariants(
  entry: ProgressPatternEntry,
): readonly ButtonReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return spinnerPreviews.map((preview) => ({
    id: preview.id,
    name: preview.label,
    description: preview.description,
    preview: (
      <div className={styles.statusColumn}>
        {preview.statuses.map((status) => (
          <div
            aria-label={status.ariaLabel}
            className={styles.spinnerRow}
            key={status.ariaLabel}
            role="status">
            <span
              aria-hidden="true"
              className={clsx(styles.spinnerGlyph, status.isStatic && styles.spinnerGlyphStatic)}
            />
            <span>{status.label}</span>
          </div>
        ))}
      </div>
    ),
    tabs,
  }));
}

function buildSkeletonReferenceVariants(
  entry: ProgressPatternEntry,
): readonly ButtonReferenceVariant[] {
  const tabs = buildReferenceCodeTabs(entry.snippets?.items);

  return skeletonPreviews.map((preview) => ({
    id: preview.id,
    name: preview.label,
    description: preview.description,
    preview: (
      <SkeletonSurface
        animation={preview.animation}
        label={preview.label}
        statusText={preview.statusText}
      />
    ),
    tabs,
  }));
}

function buildProgressReferenceVariants(
  entry: ProgressPatternEntry,
): readonly ButtonReferenceVariant[] | null {
  if (entry.id === 'progress-bar-determinate') {
    return buildDeterminateReferenceVariants(entry);
  }

  if (entry.id === 'circular-progress-determinate') {
    return buildCircularReferenceVariants(entry);
  }

  if (entry.id === 'progress-bar-indeterminate') {
    return buildIndeterminateReferenceVariants(entry);
  }

  if (entry.id === 'loading-spinner') {
    return buildLoadingSpinnerReferenceVariants(entry);
  }

  if (entry.id === 'skeleton-placeholder') {
    return buildSkeletonReferenceVariants(entry);
  }

  return null;
}

function buildProgressReferenceGuides(
  entry: ProgressPatternEntry,
): readonly ButtonReferenceGuide[] | undefined {
  if (entry.id === 'progress-bar-determinate') {
    return [
      {
        id: 'determinate-context-do',
        tone: 'do',
        description:
          '割合だけでなく件数や完了後の状態も近くに置き、0% / 100% の意味を読み違えにくくします。',
        preview: (
          <div className={styles.metricStack}>
            <div
              aria-label="45% の進捗率"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={45}
              className={styles.progressRail}
              role="progressbar">
              <span className={styles.progressFill} style={{width: '45%'}} />
            </div>
            <div className={styles.progressMeta}>
              <span className={styles.progressValue}>45%</span>
              <span className={styles.progressState}>
                残り 12 件 / 完了後に確認画面へ進みます
              </span>
            </div>
          </div>
        ),
      },
      {
        id: 'determinate-context-dont',
        tone: 'dont',
        description:
          '色付きバーだけにすると、何の処理がどこまで進んだのかや完了条件が UI から読み取りにくくなります。',
        preview: (
          <div className={styles.metricStack}>
            <div className={styles.progressRail}>
              <span className={styles.progressFill} style={{width: '45%'}} />
            </div>
            <span className={styles.busyText}>45%</span>
          </div>
        ),
      },
    ] as const;
  }

  if (entry.id === 'circular-progress-determinate') {
    return [
      {
        id: 'circular-context-do',
        tone: 'do',
        description:
          '円形 progress は known total を前提にし、割合の近くへ task 名や残り時間も併記します。',
        preview: (
          <CircularProgressMeter
            centerLabel="同期済み"
            label="Large"
            size="large"
            stateText="残り 8 分の見込み"
            title="顧客同期の進捗"
            value={68}
          />
        ),
      },
      {
        id: 'circular-context-dont',
        tone: 'dont',
        description:
          '割合だけを単独で置くと、何が 68% なのかや次にどうなるかが分からず、意味の弱い装飾になりがちです。',
        preview: (
          <div className={clsx(styles.circularMeter, styles.circularMeterDefault)}>
            <div className={styles.circularMeterVisual}>
              <svg
                aria-hidden="true"
                className={styles.circularMeterSvg}
                viewBox={`0 0 ${CIRCULAR_VIEWBOX_SIZE} ${CIRCULAR_VIEWBOX_SIZE}`}>
                <circle
                  className={styles.circularTrack}
                  cx={CIRCULAR_RING_CENTER}
                  cy={CIRCULAR_RING_CENTER}
                  r={CIRCULAR_RING_RADIUS}
                />
                <circle
                  className={styles.circularFill}
                  cx={CIRCULAR_RING_CENTER}
                  cy={CIRCULAR_RING_CENTER}
                  r={CIRCULAR_RING_RADIUS}
                  strokeDasharray={CIRCULAR_RING_CIRCUMFERENCE}
                  strokeDashoffset={calculateCircularProgressOffset(68)}
                />
              </svg>
              <div className={styles.circularMeterCenter}>
                <span className={styles.circularValue}>68%</span>
              </div>
            </div>
          </div>
        ),
      },
    ] as const;
  }

  if (entry.id === 'progress-bar-indeterminate') {
    return [
      {
        id: 'indeterminate-scope-do',
        tone: 'do',
        description:
          '完了率が未確定でも、どの領域が処理中かと reduced motion 時の意味をテキストで補います。',
        preview: (
          <div aria-busy="true" className={styles.busyStack}>
            <div className={styles.busyHeader}>
              <span className={styles.busyTitle}>売上レポートを集計中</span>
              <span className={styles.busyText}>完了時刻はまだ見積もれません</span>
            </div>
            <div className={styles.indeterminateRail} role="progressbar">
              <span aria-hidden="true" className={styles.indeterminateBar} />
            </div>
          </div>
        ),
      },
      {
        id: 'indeterminate-scope-dont',
        tone: 'dont',
        description:
          'section 全体の待機を spinner だけで示すと、どこが処理中なのかやいつ終わる想定なのかが伝わりません。',
        preview: (
          <div className={styles.statusColumn}>
            <div className={styles.spinnerRow}>
              <span aria-hidden="true" className={styles.spinnerGlyph} />
              <span>読み込み中...</span>
            </div>
          </div>
        ),
      },
    ] as const;
  }

  if (entry.id === 'loading-spinner') {
    return [
      {
        id: 'spinner-label-do',
        tone: 'do',
        description:
          'spinner は局所的な待機に限定し、複数ある場合は対象ごとに label を分けて読み上げも区別します。',
        preview: (
          <div className={styles.statusColumn}>
            <div className={styles.spinnerRow}>
              <span aria-hidden="true" className={styles.spinnerGlyph} />
              <span>注文履歴を更新中</span>
            </div>
            <div className={styles.spinnerRow}>
              <span
                aria-hidden="true"
                className={clsx(styles.spinnerGlyph, styles.spinnerGlyphStatic)}
              />
              <span>請求情報を更新中</span>
            </div>
          </div>
        ),
      },
      {
        id: 'spinner-label-dont',
        tone: 'dont',
        description:
          '同じ「読み込み中」を複数並べたり、対象を示さず回転だけを見せると待機箇所を判断しにくくなります。',
        preview: (
          <div className={styles.statusColumn}>
            <div className={styles.spinnerRow}>
              <span aria-hidden="true" className={styles.spinnerGlyph} />
              <span>読み込み中...</span>
            </div>
            <div className={styles.spinnerRow}>
              <span aria-hidden="true" className={styles.spinnerGlyph} />
              <span>読み込み中...</span>
            </div>
          </div>
        ),
      },
    ] as const;
  }

  if (entry.id === 'skeleton-placeholder') {
    return [
      {
        id: 'skeleton-layout-do',
        tone: 'do',
        description:
          'skeleton は最終レイアウトに近い骨組みを先に見せ、static / pulse / shimmer は 1 surface ごとに整理します。',
        preview: (
          <SkeletonSurface
            animation="static"
            label="Static"
            statusText="本文の高さを先に確保します"
          />
        ),
      },
      {
        id: 'skeleton-layout-dont',
        tone: 'dont',
        description:
          'カード全体を spinner 1 個へ置き換えると、読み込み後の密度や配置が想像できず、待機中のレイアウトも不安定になります。',
        preview: (
          <div className={styles.statusColumn}>
            <div className={styles.spinnerRow}>
              <span aria-hidden="true" className={styles.spinnerGlyph} />
              <span>記事カードを読み込み中</span>
            </div>
          </div>
        ),
      },
    ] as const;
  }

  return undefined;
}

const demoByKind: Record<ProgressDemoKind, DemoRenderer> = {
  'progress-bar-determinate': DeterminateDemo,
  'circular-progress-determinate': CircularProgressDemo,
  'progress-bar-indeterminate': IndeterminateDemo,
  'loading-spinner': LoadingSpinnerDemo,
  'skeleton-placeholder': SkeletonPlaceholderDemo,
  'stepper-status-tracker': StepperStatusTrackerDemo,
};

/**
 * Converts one entry into the fixed metadata presentation order used in the detail view.
 */
function buildMetadataItems(entry: ProgressPatternEntry): ProgressPatternMetadataItem[] {
  return [
    {label: '課題', tone: 'problem', value: entry.problem},
    {label: '解決方法', tone: 'solution', value: entry.solution},
    {label: '使いどころ', tone: 'usage', value: entry.whenToUse},
    {label: 'レイアウト保持', tone: 'layout', value: entry.layoutNotes},
    {label: '状態設計', tone: 'state', value: entry.stateNotes},
    {
      label: 'アクセシビリティ',
      tone: 'accessibility',
      value: entry.accessibilityNotes,
    },
  ];
}

export default function ProgressPatternGallery({
  entries,
  density,
}: ProgressPatternGalleryProps): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      aria-label="プログレスデザインパターンギャラリー"
      className={clsx(styles.root, density === 'detail' && styles.detailRoot)}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => {
          const Demo = demoByKind[entry.demoKind];
          const metadataItems = buildMetadataItems(entry);
          const detailNotes = metadataItems.map((item) => ({
            id: `${entry.id}-${item.tone}`,
            label: item.label,
            value: item.value,
          }));
          const detailVariants = buildProgressReferenceVariants(entry);
          const detailGuides = buildProgressReferenceGuides(entry);

          if (density === 'detail') {
            if (detailVariants) {
              return (
                <div className={styles.detailContent} id={entry.id} key={entry.id}>
                  <PatternReferenceContent
                    guides={detailGuides}
                    notes={detailNotes}
                    variantNote={entry.snippets?.snippetSummary}
                    variants={detailVariants}
                  />
                </div>
              );
            }

            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
                <PatternReferenceContent
                  id={entry.id}
                  notes={detailNotes}
                  preview={
                    <div className={clsx(styles.demoPanel, styles.detailPreviewPanel)}>
                      <Demo density={density} />
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
            <article className={styles.card} id={entry.id} key={entry.id}>
              <div className={styles.cardHeader}>
                <Heading as="h3" className={styles.cardTitle}>
                  {entry.title}
                </Heading>
                <p className={styles.cardSummary}>{entry.summary}</p>
                <ul aria-label={`${entry.title}のタグ`} className={styles.tagList}>
                  {entry.tags.map((tag) => (
                    <li className={styles.tag} key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.demoPanel}>
                <Demo density={density} />
              </div>

              <ProgressPatternMetadataPanel
                density={density}
                entryTitle={entry.title}
                items={metadataItems}
              />

              <ProgressPatternSnippetPanel
                density={density}
                entryTitle={entry.title}
                snippets={entry.snippets}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
