import {progressPatternSnippets} from '@site/src/data/progressPatternSnippets';
import type {
  ProgressPatternEntry,
  ProgressPatternSnippets,
} from '@site/src/data/progressPatternTypes';

/**
 * Removes empty snippet bodies so detail pages can show a consistent fallback.
 */
function normalizeSnippets(
  snippets: ProgressPatternSnippets,
): ProgressPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

const baseProgressPatternEntries = [
  {
    id: 'progress-bar-determinate',
    title: '決定型 progress bar',
    summary:
      '完了率や件数が既知の処理に進捗率を結びつけ、残り見通しを共有するパターンです。',
    problem:
      '処理がどこまで進んだか分からないと、待つべきか再実行すべきかを利用者が判断しにくくなります。',
    solution:
      'known total の処理では progress bar に割合や件数を載せ、0% / 中間 / 100% それぞれの意味を visible text でも補います。',
    whenToUse:
      'アップロード、インポート、バッチ変換のように total が分かっており、button の loading state より広い進行状況を伝えたい場面に向いています。',
    layoutNotes:
      '主要領域の見出し近くに配置し、0% は空トラックのままラベルを残します。100% に達した直後も完了ラベルを一瞬保持すると理解しやすくなります。',
    stateNotes:
      '通常は単調増加を前提とし、値の巻き戻しが起こる場合だけ例外として補足します。進捗率が不明な処理へは使いません。',
    accessibilityNotes:
      '`role=\"progressbar\"` と `aria-valuenow` / `aria-valuemin` / `aria-valuemax` をそろえ、数値だけに頼らず文脈ラベルも併記します。',
    tags: ['known total', '進捗率', '0% / 100%'],
    demoKind: 'progress-bar-determinate',
  },
  {
    id: 'circular-progress-determinate',
    title: 'circular progress',
    summary:
      '既知の進捗率を円形メーターで示し、割合そのものを視線の中心に置きたい場面に向くパターンです。',
    problem:
      '既知の進捗率でも、横幅を大きく使う bar だとカードやダッシュボードの中で主役にしたい割合が埋もれることがあります。',
    solution:
      'known total の処理では、中心ラベル付きの circular progress を使い、標準・large・hero のサイズ差で情報の重みを調整します。',
    whenToUse:
      '変換進捗、同期率、オンボーディングの達成率、ダッシュボードの KPI 的な進捗など、progress bar より compact かつ focal に割合を見せたい場面に向いています。',
    layoutNotes:
      'small inline indicator には寄せすぎず、標準はカード内、large / hero は 1 つの状態表示を主役にしたい面で使います。多数の比較を横並びにする一覧では線形 bar の方が比較しやすいことがあります。',
    stateNotes:
      '既知の進捗率に限定し、通常は単調増加を前提にします。unknown total の円形待機は `loading-spinner` に寄せ、radial motion だけで進捗があるように見せません。',
    accessibilityNotes:
      '`role=\"progressbar\"` と `aria-valuenow` / `aria-valuemin` / `aria-valuemax` を付け、中心の `%` 表記だけでなく文脈ラベルも併記します。大きいサイズでも装飾化せず、読み上げで意味が完結するようにします。',
    tags: ['known total', 'circular', 'large / hero'],
    demoKind: 'circular-progress-determinate',
  },
  {
    id: 'progress-bar-indeterminate',
    title: '不確定型 progress bar',
    summary:
      '完了率は未確定だが section 全体が処理中だと示したいときに使う、indeterminate bar のパターンです。',
    problem:
      '処理が続いている事実は伝えたいものの、残り時間や進捗率を正確に示せない場面では数値付きバーが誤解を生みます。',
    solution:
      'percent 値を持たない progress bar と visible status text を組み合わせ、reduced motion 時も意味が消えない構成にします。',
    whenToUse:
      '集計、検索、同期など unknown total の処理で、spinner より広い領域が busy だと示したい場面に向いています。',
    layoutNotes:
      'セクションのヘッダー直下など、影響範囲が伝わる位置に置きます。小さなボタン内部の待機なら spinner へ寄せます。',
    stateNotes:
      'known total に変わったら determinate bar へ切り替え、percent を捏造しません。animation は控えめにし、停止時も状態文言を残します。',
    accessibilityNotes:
      '`aria-busy` と status text で処理中の対象を明示し、indeterminate では `aria-valuenow` を使わず `aria-valuetext` で未確定を補えます。',
    tags: ['unknown total', 'section busy', 'reduced motion'],
    demoKind: 'progress-bar-indeterminate',
  },
  {
    id: 'loading-spinner',
    title: 'loading spinner',
    summary:
      'ボタン内やカード内など局所的な待機を compact に示し、ラベルで待機対象を補うパターンです。',
    problem:
      '小さな領域の読み込みに大きな進捗 UI を置くと過剰で、逆に spinner だけでは何が待機中かが分からなくなります。',
    solution:
      'spinner は局所的な待機に限定し、近接ラベルや `aria-label` で対象を特定します。複数並ぶ場合は label を一意にします。',
    whenToUse:
      '保存ボタン、カード更新、局所的な inline refresh など、selector の empty/loading states より狭い範囲の待機を示したい場面に向いています。',
    layoutNotes:
      'ラベルと gap を保って配置し、短い待機へ乱用しません。領域全体が busy なら indeterminate bar や skeleton を検討します。',
    stateNotes:
      '処理完了後はすぐ元のラベルへ戻せるように構成し、loading 中でもボタン幅が極端に跳ねないよう min-width を先に決めます。',
    accessibilityNotes:
      'icon-only にせず、`role=\"status\"` や近接テキストで意味を補います。複数 spinner の `aria-label` は必ず一意にします。',
    tags: ['local wait', 'compact', 'aria-label'],
    demoKind: 'loading-spinner',
  },
  {
    id: 'skeleton-placeholder',
    title: 'skeleton placeholder',
    summary:
      '最終レイアウトに近い骨組みを先に見せ、static / pulse / shimmer を使い分けながら layout shift を抑えて読み込み中を伝えるパターンです。',
    problem:
      'コンテンツ読み込み中に空白や spinner だけを置くと、最終レイアウトとの落差が大きくなり、視線が跳ねやすくなります。',
    solution:
      '記事カードや詳細面の代表レイアウトを模した placeholder を置き、`aria-busy` と文脈ラベルで読み込み中の意味を補います。animation は static / pulse / shimmer から 1 つを選び、強すぎる motion を避けます。',
    whenToUse:
      '一覧カード、詳細面、検索結果など、最終レイアウトの高さや構造を先に確保したい場面に向いています。',
    layoutNotes:
      '汎用灰箱ではなく実レイアウトに近い高さと比率を保ちます。コンテンツ差し替え時に大きく縮んだり伸びたりしない構成を優先し、animation 差分があっても骨組みの寸法は揃えます。',
    stateNotes:
      'static は既定 fallback、pulse は穏やかな待機表現、shimmer は主要領域の読み込みを強めに示す選択肢です。複数 animation を重ねず、reduced motion では static に戻します。',
    accessibilityNotes:
      '`aria-busy` の解除タイミングを実コンテンツ表示と合わせ、骨組み自体は `aria-hidden` にしてノイズを増やしすぎないようにします。動きは補助情報に留め、animation が止まっても意味が残る構成にします。',
    tags: ['preserve layout', 'aria-busy', 'static / pulse / shimmer'],
    demoKind: 'skeleton-placeholder',
  },
  {
    id: 'stepper-status-tracker',
    title: 'stepper / status tracker',
    summary:
      '4 step 固定の wizard / checkout で、現在地・完了・未着手・要修正を並べて示すパターンです。',
    problem:
      '複数ステップの進行で現在地が分からないと、どこまで終わったか、次に何が必要かが伝わりにくくなります。',
    solution:
      '順序が固定された 4 step 前後の flow に限定し、completed / current / upcoming / error を明確なラベルと状態差で示します。',
    whenToUse:
      '購入手続き、申請フォーム、初期設定 wizard のように順序が固定され、現在地の共有が重要な multi-step UI に向いています。',
    layoutNotes:
      '横並びでも縦並びでも 4 step 固定を基本とし、timeline 型の履歴表示には拡張しません。クリック遷移は初回スコープ外です。',
    stateNotes:
      '単なる読み込み待ちへ流用せず、current step が意味を持つ場面に限定します。error は current と同じ扱いにせず、修正が必要だと分かる文言を添えます。',
    accessibilityNotes:
      '`aria-current=\"step\"` を現在地に付け、各 step のタイトルと補足文で完了・未着手・要修正の違いを読み上げでも追えるようにします。',
    tags: ['multi-step', '4 steps', 'wizard'],
    demoKind: 'stepper-status-tracker',
  },
] satisfies Array<Omit<ProgressPatternEntry, 'snippets'>>;

export const progressPatternEntries: ProgressPatternEntry[] =
  baseProgressPatternEntries.map((entry) => ({
    ...entry,
    snippets: normalizeSnippets(progressPatternSnippets[entry.id]),
  }));
