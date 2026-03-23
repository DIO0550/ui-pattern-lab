import type {
  ProgressPatternEntryId,
  ProgressPatternSnippets,
} from '@site/src/data/progressPatternTypes';

export const progressPatternSnippets: Record<
  ProgressPatternEntryId,
  ProgressPatternSnippets
> = {
  'progress-bar-determinate': {
    snippetSummary:
      '既知の進捗率を `role="progressbar"` と visible label でそろえ、0% / 中間 / 100% の境界を崩さず示す最小構成です。',
    items: [
      {
        id: 'progress-bar-determinate-css',
        label: 'CSS',
        language: 'css',
        code: `.progressRegion {
  display: grid;
  gap: 0.5rem;
}

.progressMeta {
  align-items: center;
  display: flex;
  font-weight: 600;
  gap: 0.75rem;
  justify-content: space-between;
}

.progressTrack {
  background: var(--ifm-color-emphasis-200);
  block-size: 0.75rem;
  border-radius: 999px;
  overflow: hidden;
}

.progressFill {
  background: var(--ifm-color-primary);
  block-size: 100%;
  border-radius: inherit;
}

.progressState {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.9rem;
}`,
        note:
          '0% は fill を無理に見せず、空トラックと `0%` ラベルで意味を伝えます。100% は完了ラベルを添えて、到達直後に消さない方が理解しやすくなります。',
      },
      {
        id: 'progress-bar-determinate-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<section aria-labelledby="upload-progress-title" className={styles.progressRegion}>
  <div className={styles.progressMeta}>
    <span id="upload-progress-title">画像をアップロード中</span>
    <span aria-live="polite">45%</span>
  </div>

  <div
    aria-label="画像をアップロード中"
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={45}
    className={styles.progressTrack}
    role="progressbar">
    <span className={styles.progressFill} style={{width: '45%'}} />
  </div>

  <p className={styles.progressState}>残り 12 枚 / 完了後に確認画面へ進みます。</p>
</section>`,
        note:
          '割合だけでなく件数や次の状態も補うと、待つべき理由が伝わりやすくなります。巻き戻しが起こる場合は例外扱いとして補足してください。',
      },
    ],
  },
  'circular-progress-determinate': {
    snippetSummary:
      '既知の進捗率を円形メーターで示し、標準・large・hero のサイズ差も同じ構造で扱う例です。',
    items: [
      {
        id: 'circular-progress-determinate-css',
        label: 'CSS',
        language: 'css',
        code: `.progressRingGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.progressRing {
  align-items: center;
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  text-align: center;
}

.progressRingDefault {
  --ring-size: 6.5rem;
}

.progressRingLarge {
  --ring-size: 8.5rem;
}

.progressRingHero {
  --ring-size: 11rem;
}

.progressRingVisual {
  block-size: var(--ring-size);
  display: grid;
  inline-size: var(--ring-size);
  place-items: center;
  position: relative;
}

.progressRingSvg {
  block-size: 100%;
  inline-size: 100%;
  transform: rotate(-90deg);
}

.progressTrack {
  fill: none;
  stroke: var(--ifm-color-emphasis-200);
  stroke-width: 10;
}

.progressFill {
  fill: none;
  stroke: var(--ifm-color-primary);
  stroke-linecap: round;
  stroke-width: 10;
}

.progressRingCenter {
  display: grid;
  gap: 0.2rem;
  place-items: center;
  position: absolute;
}

.progressRingValue {
  font-size: 1.25rem;
  font-weight: 800;
}

.progressRingHero .progressRingValue {
  font-size: 2rem;
}`,
        note:
          'large / hero size は「その進捗が画面の主役」であるときだけに使い、一覧で多数を比較するなら線形 bar の方が差分を追いやすいことがあります。',
      },
      {
        id: 'circular-progress-determinate-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const ringRadius = 50;
const ringCircumference = 2 * Math.PI * ringRadius;
const progressValue = 68;
const ringOffset = ringCircumference * (1 - progressValue / 100);

<section aria-labelledby="sync-progress-title">
  <h2 id="sync-progress-title">顧客データを同期中</h2>

  <div className={styles.progressRingGroup}>
    <article className={clsx(styles.progressRing, styles.progressRingDefault)}>
      <div
        aria-label="顧客データを同期中"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progressValue}
        className={styles.progressRingVisual}
        role="progressbar">
        <svg
          aria-hidden="true"
          className={styles.progressRingSvg}
          viewBox="0 0 120 120">
          <circle className={styles.progressTrack} cx="60" cy="60" r={ringRadius} />
          <circle
            className={styles.progressFill}
            cx="60"
            cy="60"
            r={ringRadius}
            strokeDasharray={ringCircumference}
            strokeDashoffset={ringOffset}
          />
        </svg>
        <div className={styles.progressRingCenter}>
          <span className={styles.progressRingValue}>{progressValue}%</span>
          <span>同期済み</span>
        </div>
      </div>
      <p>Large / hero size は主状態の強調に限定します。</p>
    </article>
  </div>
</section>`,
        note:
          '円形の indeterminate 待機は `loading-spinner` に寄せ、known total であることが保証できるときだけ circular progress を使います。',
      },
    ],
  },
  'progress-bar-indeterminate': {
    snippetSummary:
      '完了率が読めない処理を section 単位で知らせる、不確定型 progress bar の最小例です。',
    items: [
      {
        id: 'progress-bar-indeterminate-css',
        label: 'CSS',
        language: 'css',
        code: `.busyRegion {
  display: grid;
  gap: 0.5rem;
}

.busyHeader {
  display: grid;
  gap: 0.25rem;
}

.progressTrack {
  background: var(--ifm-color-emphasis-200);
  block-size: 0.75rem;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.progressIndicator {
  animation: slide 1.1s ease-in-out infinite;
  background: var(--ifm-color-primary);
  block-size: 100%;
  border-radius: inherit;
  inline-size: 35%;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(220%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .progressIndicator {
    animation: none;
    transform: none;
  }
}`,
        note:
          'reduced motion では静止バーと visible text を残し、「何が待機中か」が消えない構成にします。percent 値を持たせないため `aria-valuenow` は使いません。',
      },
      {
        id: 'progress-bar-indeterminate-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<section
  aria-busy="true"
  aria-labelledby="report-loading-title"
  className={styles.busyRegion}>
  <div className={styles.busyHeader}>
    <span id="report-loading-title">売上レポートを集計中</span>
    <span>完了時刻はまだ見積もれません</span>
  </div>

  <div
    aria-label="売上レポートを集計中"
    aria-valuetext="進捗率は未確定"
    className={styles.progressTrack}
    role="progressbar">
    <span aria-hidden="true" className={styles.progressIndicator} />
  </div>

  <p>Reduced motion 時は静止バーと「集計中」テキストで状態を補います。</p>
</section>`,
        note:
          'unknown total なのに determinate bar を出すと誤解を生みます。section 全体が処理中なら spinner より bar の方が範囲を示しやすくなります。',
      },
    ],
  },
  'loading-spinner': {
    snippetSummary:
      '局所的な待機を compact に示しつつ、複数表示時も label が衝突しない spinner の例です。',
    items: [
      {
        id: 'loading-spinner-css',
        label: 'CSS',
        language: 'css',
        code: `.inlineStatus {
  display: grid;
  gap: 0.75rem;
}

.spinnerRow {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
}

.spinnerGlyph {
  animation: spin 0.8s linear infinite;
  block-size: 0.9rem;
  border: 2px solid currentColor;
  border-inline-end-color: transparent;
  border-radius: 999px;
  inline-size: 0.9rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinnerGlyph {
    animation: none;
    border-inline-end-color: currentColor;
    opacity: 0.72;
  }
}`,
        note:
          '短すぎる待機に spinner を乱用せず、ボタンやカードの文脈に近い label を必ず添えます。複数並ぶ場合は `aria-label` を一意にしてください。',
      },
      {
        id: 'loading-spinner-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<div className={styles.inlineStatus}>
  <div aria-label="注文履歴を更新中" className={styles.spinnerRow} role="status">
    <span aria-hidden="true" className={styles.spinnerGlyph} />
    <span>注文履歴を更新中</span>
  </div>

  <div aria-label="請求情報を更新中" className={styles.spinnerRow} role="status">
    <span aria-hidden="true" className={styles.spinnerGlyph} />
    <span>請求情報を更新中</span>
  </div>
</div>`,
        note:
          'button 内の loading 表現は `button/interactive-states` に寄せ、spinner 単体では「どの領域が待機中か」が読めるラベルを残します。',
      },
    ],
  },
  'skeleton-placeholder': {
    snippetSummary:
      '最終レイアウトに近い高さを保ちながら、static / pulse / shimmer を切り替える skeleton placeholder の例です。',
    items: [
      {
        id: 'skeleton-placeholder-css',
        label: 'CSS',
        language: 'css',
        code: `.articlePlaceholder {
  display: grid;
  gap: 0.75rem;
}

.skeletonVariantGrid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.articleHeader {
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
}

.skeletonCard {
  display: grid;
  gap: 0.75rem;
  min-block-size: 12rem;
  padding: 1rem;
  width: min(100%, 18rem);
}

.skeletonBlock {
  background: color-mix(
    in srgb,
    var(--ifm-color-emphasis-300) 60%,
    var(--ifm-background-surface-color)
  );
  border-radius: 0.5rem;
}

.variantLabel {
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.skeletonHero {
  block-size: 5rem;
}

.skeletonTitle {
  block-size: 1rem;
  inline-size: 58%;
}

.skeletonLine {
  block-size: 0.85rem;
}

.skeletonLineShort {
  inline-size: 72%;
}

.skeletonShimmer .skeletonBlock {
  background-image: linear-gradient(
    90deg,
    color-mix(
      in srgb,
      var(--ifm-color-emphasis-300) 55%,
      var(--ifm-background-surface-color)
    ),
    color-mix(in srgb, var(--ifm-background-surface-color) 92%, transparent),
    color-mix(
      in srgb,
      var(--ifm-color-emphasis-300) 55%,
      var(--ifm-background-surface-color)
    )
  );
  background-size: 240% 100%;
}

@keyframes pulse {
  50% {
    opacity: 0.6;
  }
}

@keyframes shimmer {
  100% {
    background-position: -200% 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .skeletonPulse .skeletonBlock {
    animation: pulse 1.8s ease-in-out infinite;
  }

  .skeletonShimmer .skeletonBlock {
    animation: shimmer 1.4s linear infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeletonShimmer .skeletonBlock {
    background-image: none;
  }
}`,
        note:
          'static を baseline にし、pulse は穏やかな待機、shimmer は主要領域の読み込みを強めに示す用途に留めます。複数 animation を重ねず、reduced motion では static に戻します。',
      },
      {
        id: 'skeleton-placeholder-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<section
  aria-busy="true"
  aria-labelledby="article-loading-title"
  className={styles.articlePlaceholder}>
  <div className={styles.articleHeader}>
    <span id="article-loading-title">記事カードを読み込み中</span>
    <span>本文の高さを先に確保します</span>
  </div>

  <div className={styles.skeletonVariantGrid}>
    {[
      {id: 'static', label: 'Static', className: null},
      {id: 'pulse', label: 'Pulse', className: styles.skeletonPulse},
      {id: 'shimmer', label: 'Shimmer', className: styles.skeletonShimmer},
    ].map((variant) => (
      <article
        className={clsx(styles.skeletonCard, variant.className)}
        key={variant.id}>
        <span className={styles.variantLabel}>{variant.label}</span>
        <div aria-hidden="true" className={clsx(styles.skeletonBlock, styles.skeletonHero)} />
        <div aria-hidden="true" className={clsx(styles.skeletonBlock, styles.skeletonTitle)} />
        <div aria-hidden="true" className={styles.skeletonBlock} />
        <div
          aria-hidden="true"
          className={clsx(styles.skeletonBlock, styles.skeletonLineShort)}
        />
      </article>
    ))}
  </div>
</section>`,
        note:
          '`aria-busy` は実コンテンツへ切り替わる直前で false に戻し、animation は surface ごとに 1 種類へ絞ります。dense な画面や reduced motion では static を既定にしてください。',
      },
    ],
  },
  'stepper-status-tracker': {
    snippetSummary:
      '4 step 固定の wizard / checkout 文脈で、完了・現在地・未着手・要修正を見分ける stepper の例です。',
    items: [
      {
        id: 'stepper-status-tracker-css',
        label: 'CSS',
        language: 'css',
        code: `.stepper {
  display: grid;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.stepItem {
  align-items: start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
}

.stepMarker {
  align-items: center;
  background: var(--ifm-color-emphasis-200);
  block-size: 2rem;
  border-radius: 999px;
  display: inline-flex;
  font-weight: 700;
  inline-size: 2rem;
  justify-content: center;
}

.stepItem[data-state='complete'] .stepMarker {
  background: color-mix(in srgb, var(--ifm-color-success) 18%, white);
}

.stepItem[data-state='current'] .stepMarker {
  background: color-mix(in srgb, var(--ifm-color-primary) 18%, white);
}

.stepItem[data-state='error'] .stepMarker {
  background: color-mix(in srgb, var(--ifm-color-danger) 18%, white);
}`,
        note:
          'timeline の履歴表示ではなく、4 step 前後の順序が固定された wizard に向きます。クリック遷移が必要なら別途操作ルールを足してください。',
      },
      {
        id: 'stepper-status-tracker-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `<ol aria-label="購入手続きの進行状況" className={styles.stepper}>
  <li className={styles.stepItem} data-state="complete">
    <span className={styles.stepMarker}>1</span>
    <div>
      <strong>カート確認</strong>
      <p>内容の確認が完了しました。</p>
    </div>
  </li>

  <li aria-current="step" className={styles.stepItem} data-state="current">
    <span className={styles.stepMarker}>2</span>
    <div>
      <strong>配送先入力</strong>
      <p>いま入力しているステップです。</p>
    </div>
  </li>

  <li className={styles.stepItem} data-state="upcoming">
    <span className={styles.stepMarker}>3</span>
    <div>
      <strong>支払い方法</strong>
      <p>次に進むと開始されます。</p>
    </div>
  </li>

  <li className={styles.stepItem} data-state="error">
    <span className={styles.stepMarker}>4</span>
    <div>
      <strong>確認と送信</strong>
      <p>住所に不足があり、確認が必要です。</p>
    </div>
  </li>
</ol>`,
        note:
          'stepper を単純な読み込み待ちへ流用せず、current step と全体の順序が意味を持つ場面だけに限定します。',
      },
    ],
  },
};
