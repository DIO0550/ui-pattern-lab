import {checkboxPatternSnippets} from '@site/src/data/checkboxPatternSnippets';
import type {
  CheckboxPatternEntry,
  CheckboxPatternSnippets,
} from '@site/src/data/checkboxPatternTypes';

function normalizeSnippets(
  snippets: CheckboxPatternSnippets,
): CheckboxPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

const baseCheckboxPatternEntries = [
  {
    id: 'multiple-independent-selection',
    title: '複数の独立選択',
    summary:
      '複数の候補を自由に組み合わせる checkbox 群の基本パターンを整理します。',
    problem:
      '複数選択できる UI が radio button や select と同じ見え方だと、何件まで選べるかや未選択を許容するかが伝わりにくくなります。',
    solution:
      '各項目を独立した checkbox として並べ、複数選択・未選択・途中変更の自由度をそのまま見せます。',
    whenToUse:
      'タグ、通知設定、フィルタ条件など、0 件以上を自由に組み合わせて選ばせたい場面に向いています。',
    comparisonTip:
      '1 つだけ選ばせたいなら radio button、候補を大きく圧縮して一覧密度を優先したいなら select を優先します。checkbox は複数選択と未選択の両方を自然に許容したいときに使います。',
    layoutNotes:
      '関連する項目は近接配置し、長いラベルは 2 行以上に折り返せる余白を確保して、checkbox 本体とラベルの開始位置をそろえます。',
    stateNotes:
      '初期値がある項目だけ checked にし、全未選択でも成立するか、最低 1 件必要かを周辺文言で補足します。',
    accessibilityNotes:
      'label 全体を押下可能にし、グループ名が必要な場合は fieldset / legend か aria-labelledby で文脈を渡します。',
    tags: ['複数選択', 'フィルタ', 'グループ化'],
    demoKind: 'multiple-independent-selection',
  },
  {
    id: 'selectable-cards',
    title: 'カード型の複数選択',
    summary:
      'カード全体が選択状態になる selectable card として、情報量の多い複数選択を整理します。',
    problem:
      '説明量の多い候補を小さな checkbox だけで並べると、どこを押せるかや何が選ばれているかが一覧で把握しにくくなります。',
    solution:
      'input[type="checkbox"] の semantics を維持したままカード全体を label として扱い、selected 時は border / background / badge をまとめて変えて状態を示します。',
    whenToUse:
      '料金オプション、通知パック、属性タグなど、各候補にタイトル・説明・補足情報があり、複数選択をさせたい場面に向いています。',
    comparisonTip:
      '1 件だけ選ばせるなら radio button、押した瞬間に状態が切り替わる操作なら toggle button や switch を検討します。checkbox card は情報量の多い候補を複数選択させたいときに向いています。',
    layoutNotes:
      'カードの高さ、タイトル開始位置、補足情報の行間をそろえ、selected / unselected の差が一覧で比較しやすいグリッドにします。',
    stateNotes:
      'selected / hover / focus-visible / disabled を border、background、badge、outline で重ねて表現し、色だけに依存しません。',
    accessibilityNotes:
      '見た目をカードに変えても input[type="checkbox"] を残し、label 全体を押下可能にして、fieldset / legend でグループ文脈を渡します。',
    tags: ['カード型UI', '情報量の多い候補', '複数選択'],
    demoKind: 'selectable-cards',
  },
  {
    id: 'single-checkbox-and-indeterminate',
    title: '単独同意と indeterminate',
    summary:
      '単独の同意 checkbox と、親子選択の mixed state を同じルールで扱うパターンです。',
    problem:
      '同意確認、select-all、設定の ON/OFF を同じ UI で扱うと、確認入力なのか即時切り替えなのかが混ざって誤解を生みやすくなります。',
    solution:
      '単独 checkbox は yes / no の確認として扱い、親子構造では indeterminate で一部選択を明示して親子関係を保ちます。',
    whenToUse:
      '利用規約への同意、配下項目の一括選択、権限設定のように親子状態を持つ入力に向いています。',
    comparisonTip:
      '即時に設定を切り替える ON / OFF 表現なら switch や toggle button を選びます。checkbox は送信前の確認や複数項目の一括管理に向いています。',
    layoutNotes:
      '親項目と子項目のインデント差で関係性を示し、select-all はグループ先頭に置いて子項目の密度と余白をそろえます。',
    stateNotes:
      'indeterminate は HTML 属性ではなく DOM property で設定し、親の checked / mixed / unchecked を子項目の状態から導出します。',
    accessibilityNotes:
      'mixed state は aria-checked="mixed" と視覚差分を一致させ、単独同意では関連文脈や補助説明を近接配置して意味を補います。',
    tags: ['同意確認', 'indeterminate', 'select all'],
    demoKind: 'single-checkbox-and-indeterminate',
  },
  {
    id: 'states-and-accessibility',
    title: '状態設計とアクセシビリティ',
    summary:
      'unchecked / checked / focus / disabled / error / mixed の状態差分をまとめて確認します。',
    problem:
      'checkbox の状態差分が曖昧だと、押せるかどうか、一部選択かどうか、エラーを直す必要があるかが見た目だけで判断しにくくなります。',
    solution:
      '主要状態を先に定義し、focus-visible、helper text、error、mixed の見せ方を共通ルールとして固定します。',
    whenToUse:
      'デザインシステムで checkbox の state token と補助文言を整理し、フォーム全体で一貫した振る舞いを保ちたい場面に向いています。',
    comparisonTip:
      '値が即時反映される設定変更を前面に出したい場合は switch の方が文脈に合うことがあります。checkbox はフォーム入力としての semantics を維持したいときに適しています。',
    layoutNotes:
      'helper text や error message はコントロール直下にそろえ、複数 state を並べるときもラベル開始位置と行間を統一します。',
    stateNotes:
      'focus-visible、disabled、error、mixed を色だけに頼らず、border、outline、helper、checkmark の差分で重ねて表現します。',
    accessibilityNotes:
      'label / id / aria-describedby を関連付け、error では補足文が読み上げられる構成にして、mixed state の意味も周辺文脈で補います。',
    tags: ['focus-visible', 'error', 'aria-*'],
    demoKind: 'states-and-accessibility',
  },
  {
    id: 'mobile-and-touch-targets',
    title: 'モバイルとタップ領域',
    summary:
      '長いラベル、縦並び、48px 相当のタップ領域を前提にした checkbox 配置です。',
    problem:
      'モバイルで checkbox が小さすぎたり、長いラベルが詰まりすぎたりすると、誤タップや読みづらさが起こります。',
    solution:
      'タップ領域をラベル全体まで広げ、縦積みと十分な行間で、長い説明文を含む項目でも押しやすさを保ちます。',
    whenToUse:
      '設定画面、通知オプション、確認フローなど、スマホで複数項目を連続操作する画面に向いています。',
    comparisonTip:
      '候補数が多く、スクロール量を減らしたいなら select、即時切り替えを強調したいなら switch を検討します。checkbox は各項目の説明を見せながら複数選択させたいときに有効です。',
    layoutNotes:
      'checkbox 本体だけでなくラベル全体に 48px 相当の高さを確保し、長文は 2 行以上で自然に折り返しても押下しやすい余白を保ちます。',
    stateNotes:
      '縦積みでも checked と unchecked の差が離れて見えないよう、checkmark の位置、ラベル開始位置、helper text の行頭をそろえます。',
    accessibilityNotes:
      'タッチとキーボードの両方で操作できるよう label クリックを有効にし、折り返し後も読み上げ順が乱れない DOM 構造を維持します。',
    tags: ['モバイル', 'touch target', '長いラベル'],
    demoKind: 'mobile-and-touch-targets',
  },
] satisfies Array<Omit<CheckboxPatternEntry, 'snippets'>>;

export const checkboxPatternEntries: CheckboxPatternEntry[] =
  baseCheckboxPatternEntries.map((entry) => ({
    ...entry,
    snippets: normalizeSnippets(checkboxPatternSnippets[entry.id]),
  }));
