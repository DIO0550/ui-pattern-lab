import {controllerPatternSnippets} from '@site/src/data/controllerPatternSnippets';
import type {
  ControllerPatternEntry,
  ControllerPatternSnippets,
} from '@site/src/data/controllerPatternTypes';

function normalizeSnippets(
  snippets: ControllerPatternSnippets,
): ControllerPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

const baseControllerPatternEntries = [
  {
    id: 'segmented-view-switcher',
    title: 'segmented view switcher',
    summary:
      'list / grid / board のような 2〜4 個の固定 view mode を、同じ画面の local UI state として即時に切り替える controller パターンです。',
    problem:
      'view mode の切り替えがメニューの奥に入ると、現在どの見え方で、何を変えられる control なのかが伝わりにくくなります。',
    solution:
      '少数の mode を常時表示し、現在選択中の見え方と切り替え結果を近接させて「view state を変えている control」だと分かるようにします。',
    whenToUse:
      'list / grid、calendar の day / week / month、preview / code のように、同じ view の見え方を 2〜4 候補からその場で切り替えたい場面に向いています。',
    comparisonTip:
      'フォーム送信前提の単一選択なら radio group、単発 action なら button、panel semantics や arrow key が必要なら tabs を優先し、URL 同期や永続化を前提にしない mode switch だけを controller に寄せます。',
    interactionNotes:
      '候補は 2〜4 個程度に絞り、現在選択中の状態を押下後の panel や list layout と近接表示します。同じ mode の再押下は no-op に保ち、候補が多い場合は tabs や navigation に分割します。',
    accessibilityNotes:
      'button group として実装する場合は group label（`aria-label` または `aria-labelledby`）を持たせ、各ボタンに Tab で到達でき、Enter / Space で選択を切り替えられる状態を baseline にします。toggle button なら `aria-pressed` と focus-visible で現在モードを示し、arrow key と `role=\"tablist\"` / `role=\"tabpanel\"` を前提にする場合は tabs 系へ寄せます。',
    tags: ['view switch', 'local state', '2-4 options'],
    controllerFamily: 'view-switch',
    demoKind: 'segmented-view-switcher',
  },
  {
    id: 'tabs-inline-panel-switcher',
    title: 'tabs inline panel switcher',
    summary:
      '同一ページ内で panel / context を切り替え、選択中の内容だけを inline に見せる controller パターンです。',
    problem:
      'section 切り替えを通常リンクや accordion に寄せすぎると、同一 view 内の文脈切り替えなのか、ページ遷移なのかが曖昧になります。',
    solution:
      'tablist と tabpanel を明示し、現在 panel と切り替え対象の関係を一つの面で管理します。',
    whenToUse:
      'settings、dashboard、docs、detail panel など、同じ画面枠の中で context だけを切り替えたい場面に向いています。',
    comparisonTip:
      'ページ遷移が主体なら navigation、少数 mode を常時押し分けるだけなら segmented view switcher を使い、tab は panel 切り替えに限定します。',
    interactionNotes:
      'tab label は短く保ち、panel の主見出しや補助文と近接させます。候補が増えすぎる場合は IA を再分割し、横スクロール tab へ安易に逃げません。',
    accessibilityNotes:
      '`role=\"tablist\"` / `role=\"tab\"` / `role=\"tabpanel\"` の関連付けを保ち、arrow key での移動や `aria-selected` の更新を一貫させます。',
    tags: ['view switch', 'tabpanel', 'inline context'],
    controllerFamily: 'view-switch',
    demoKind: 'tabs-inline-panel-switcher',
  },
  {
    id: 'sort-filter-toolbar',
    title: 'sort / filter toolbar',
    summary:
      '並び替え、絞り込み、active filter、result count を一つの操作面で整理する controller パターンです。',
    problem:
      'sort や filter を個別 input だけで配置すると、何が適用中で一覧全体へどう効いているかが見失われやすくなります。',
    solution:
      'toolbar として result count、sort、active filter、filter entry point を一か所へ集約し、一覧の scope を制御していることを明確にします。',
    whenToUse:
      'catalog、table、admin list、search result など、一覧全体の見え方を複数 control で即時に変える場面に向いています。',
    comparisonTip:
      'checkbox や select 自体は既存カテゴリに留め、toolbar では複数 control の orchestration と適用済み状態の見せ方だけを扱います。',
    interactionNotes:
      'result count と active filter chip を近接させ、適用済み条件を即座に戻せる構成を優先します。dense 画面では filter drawer への導線を併用しても構いません。',
    accessibilityNotes:
      'toolbar 領域の見出しを明示し、active filter の解除ボタンや sort label を読み上げでも識別できるようにします。',
    tags: ['scope control', 'active filters', 'result count'],
    controllerFamily: 'scope-control',
    demoKind: 'sort-filter-toolbar',
  },
  {
    id: 'pagination-and-page-size-controller',
    title: 'pagination / page size controller',
    summary:
      '結果セットの閲覧位置、表示件数、現在ページを一体で制御し、dataset の見え方を調整する controller パターンです。',
    problem:
      'ページ移動と表示件数変更が離れていたり件数要約が弱かったりすると、結果集合のどこを見ているかが分かりにくくなります。',
    solution:
      'current page、prev / next、page size、件数サマリーを近接配置し、結果セットの閲覧状態を control として扱います。',
    whenToUse:
      '検索結果、table、admin list など、一覧の範囲と現在位置を継続的に把握しながら閲覧したい場面に向いています。',
    comparisonTip:
      '単なる pagination link list ではなく dataset の閲覧状態制御として扱い、table レイアウトや infinite scroll そのものとは責務を分けます。',
    interactionNotes:
      'first / last page の disabled、page size 変更時の current page clamp、件数要約の更新を一貫して扱います。大量結果では `...` を含む簡潔なページ列に留めます。',
    accessibilityNotes:
      '`aria-current=\"page\"`、prev / next の disabled state、page size select のラベルを整え、件数サマリーは visible text でも補います。',
    tags: ['scope control', 'dataset position', 'page size'],
    controllerFamily: 'scope-control',
    demoKind: 'pagination-and-page-size-controller',
  },
  {
    id: 'range-slider-filter',
    title: 'range slider filter',
    summary:
      '価格帯、音量、しきい値、密度のような連続値をドラッグで即時調整し、一覧や preview へ反映する controller パターンです。',
    problem:
      '価格帯や音量の上限を selector や text / number input だけに寄せると、どこまで動かせるか、いまどの範囲を指しているか、結果へどう効くかが伝わりにくくなります。',
    solution:
      'single slider と現在値表示、反映先の preview を近接させ、drag やキーボード操作の直後に結果が変わる構成で連続調整の感覚を保ちます。',
    whenToUse:
      'price range、volume、threshold、density、preview 比率のように、厳密な数値入力よりも相対的な調整と視覚的なフィードバックが主な場面に向いています。',
    comparisonTip:
      '厳密な数値入力が必要なら text / number input、離散的な候補選択なら selector、狭い範囲の段階的増減なら quantity stepper を優先します。range slider filter は直感的な調整と即時反映を優先するときに選びます。',
    interactionNotes:
      '初回は single slider を baseline とし、drag 中は一覧や preview を即時更新します。step を設ける場合は表示値と内部値を同じ刻み幅に揃え、min / max 到達時はそれ以上動かないことを視覚的にも示します。',
    accessibilityNotes:
      'slider には label または `aria-label` を付け、`aria-valuemin` / `aria-valuemax` / `aria-valuenow` を整えます。左右キーで step 単位に増減し、Home / End で min / max へ移動できること、現在値を drag しなくても把握できることを優先します。',
    futureExtensions:
      'dual-thumb による範囲指定、log scale、exact numeric input へのフォールバックは将来拡張として切り出します。',
    tags: ['continuous adjustment', 'price range', 'volume', 'threshold / density'],
    controllerFamily: 'continuous-adjustment',
    demoKind: 'range-slider-filter',
  },
  {
    id: 'quantity-stepper-control',
    title: 'quantity stepper control',
    summary:
      'bounded numeric value を plus / minus で安全に調整し、min / max と現在値を明示する controller パターンです。',
    problem:
      '数量や人数の増減を自由入力だけにすると、許容範囲や最小 / 最大に達した状態が分かりにくく、誤入力も起きやすくなります。',
    solution:
      'increment / decrement button、現在値、min / max に応じた disabled を組み合わせ、狭い範囲の numeric adjustment を安全にします。',
    whenToUse:
      'EC の数量、予約人数、表示件数、優先度レベルのように、bounded value を即時調整したい場面に向いています。',
    comparisonTip:
      'progress の stepper は multi-step status 表示、こちらは numeric adjustment です。単なる plus / minus button ではなく、値制約を含む control として扱います。',
    interactionNotes:
      'min / max 到達時の disabled、長押しや連打への配慮、値の反映先を近接表示します。大きな範囲を扱うなら slider や input への切り替えを検討します。',
    accessibilityNotes:
      '各ボタンに `aria-label` を付け、現在値は `aria-live` で補助できます。disabled 理由が分かるラベルや helper text を添えると混乱を減らせます。',
    tags: ['continuous adjustment', 'min/max', 'numeric value'],
    controllerFamily: 'continuous-adjustment',
    demoKind: 'quantity-stepper-control',
  },
] satisfies Array<Omit<ControllerPatternEntry, 'snippets'>>;

export const controllerPatternEntries: ControllerPatternEntry[] =
  baseControllerPatternEntries.map((entry) => ({
    ...entry,
    snippets: normalizeSnippets(controllerPatternSnippets[entry.id]),
  }));
