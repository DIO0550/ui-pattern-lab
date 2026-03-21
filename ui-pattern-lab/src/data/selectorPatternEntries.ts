import {selectorPatternSnippets} from '@site/src/data/selectorPatternSnippets';
import type {
  SelectorPatternEntry,
  SelectorPatternSnippets,
} from '@site/src/data/selectorPatternTypes';

/**
 * Filters empty snippet items so pages can treat absent examples consistently.
 */
function normalizeSnippets(
  snippets: SelectorPatternSnippets,
): SelectorPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

const comboboxAccessibilityNote =
  'combobox は keyboard 操作と読み上げ文脈の設計負荷が高いため、このラボでは single-select / local state / non-async の簡易構造に限定します。IME、async 検索、popover 位置計算は production 要件として別途設計してください。';

const baseSelectorPatternEntries = [
  {
    id: 'radio-group-single-selection',
    entryType: 'pattern',
    category: 'radio',
    title: '少数候補の radio group',
    summary:
      '候補数が少ない単一選択を、全候補を見せたまま比較できる radio group の基本パターンです。',
    problem:
      '1 つだけ選ぶ入力なのに checkbox card や toggle に寄せると、排他選択や必須入力の意味が伝わりにくくなります。',
    solution:
      '同一 group の radio として並べ、未選択 / 既定値 / helper / error を form field として一貫して扱います。',
    whenToUse:
      '候補数が少なく、ラベルや補足文を見比べながら 1 つの値を選ばせたいフォームに向いています。',
    comparisonTip:
      '候補を圧縮したいなら native select、検索が必要なら combobox、複数選択なら checkbox、押した瞬間に状態が変わる UI なら toggle を選びます。',
    layoutNotes:
      'legend と option の開始位置をそろえ、長いラベルは 2 行以上に折り返せる余白を確保します。',
    stateNotes:
      'required で初期未選択を許す場合は submit / blur 後に error を補足し、既定値がある場合は default selection の意図を helper で示します。',
    accessibilityNotes:
      'fieldset / legend で group 文脈を渡し、label 全体を押下可能にして、helper / error は aria-describedby で関連付けます。',
    tags: ['単一選択', '候補少', 'フォーム入力'],
    demoKind: 'radio-group-single-selection',
    contextNoteKey: 'button-toggle',
  },
  {
    id: 'selectable-radio-cards',
    entryType: 'pattern',
    category: 'radio',
    title: 'カード型の radio selection',
    summary:
      '情報量の多い候補を card UI で見せつつ、radio semantics で 1 つの value に絞るパターンです。',
    problem:
      'カード見た目だけで radio と checkbox を使い分けると、複数選択か排他選択か、required や default selection をどう扱うかが曖昧になります。',
    solution:
      'input[type=\"radio\"] を残したままカード全体を label とし、selected / unselected を border、badge、supporting text で示します。',
    whenToUse:
      '料金プラン、配送方法、プラン選択など、各候補にタイトル・説明・補足がありつつ、最終的には 1 つの field value を選ばせたい場面に向いています。',
    comparisonTip:
      '見た目が card でも複数選択や未選択許容が主題なら checkbox の selectable cards へ、押した瞬間に UI モードを切り替えるなら toggle / segmented button へ逃がします。',
    layoutNotes:
      'カードの高さ、見出し位置、badge の位置をそろえ、selected / unselected の差が一覧で比較しやすいグリッドにします。',
    stateNotes:
      'default selection の有無、required validation、disabled option の理由を card 単位で補足し、radio の排他性を崩しません。',
    accessibilityNotes:
      '見た目を card に変えても radio input を残し、同一 name による排他選択と label クリックを維持します。',
    tags: ['radio card', '情報量の多い候補', '単一選択'],
    demoKind: 'selectable-radio-cards',
    contextNoteKey: 'button-toggle',
  },
  {
    id: 'native-select-compact-options',
    entryType: 'pattern',
    category: 'native-select',
    title: '候補圧縮の native select',
    summary:
      '候補を圧縮してフォーム密度とモバイル native picker を優先する、native select の baseline ページです。',
    problem:
      '候補数が増えたときも radio のまま並べると一覧が長くなり、フォーム全体の密度とスクロール量が悪化します。',
    solution:
      'native select を使い、placeholder 相当 option・helper text・optgroup で未選択と候補構造を補足します。',
    whenToUse:
      '候補数が中程度で、一覧密度や mobile picker との相性を優先しつつ、freeform search までは不要な単一選択に向いています。',
    comparisonTip:
      '候補を常時見せて比較したいなら radio、見た目や option row を自前で作り込みたいときだけ custom select、検索が必要なら combobox を選びます。',
    layoutNotes:
      'label、select、helper、error を縦に近接配置し、placeholder 相当 option だけに未選択の意味を寄せすぎない構成にします。',
    stateNotes:
      '未選択、選択済み、disabled、error の差を周辺文言でも補い、ブラウザ差のある placeholder 風 option に依存しすぎません。',
    accessibilityNotes:
      'native select の既存 semantics を活かしつつ、label、aria-describedby、required 文言で現在状態を補足します。',
    tags: ['候補圧縮', 'mobile picker', '単一選択'],
    demoKind: 'native-select-compact-options',
    contextNoteKey: 'checkbox',
  },
  {
    id: 'custom-select-outline-listbox',
    entryType: 'pattern',
    category: 'custom-select',
    title: 'アウトライン型 custom select',
    summary:
      '最小の trigger と listbox で、自前描画 selector の構造を確認する baseline パターンです。',
    problem:
      'native select では option row の見た目や metadata の載せ方を十分に制御できず、導線や装飾要件を満たせないことがあります。',
    solution:
      'button trigger、grouped listbox、roving focus、outside click close を最小構造として定義し、見た目を増やす前の土台を固定します。',
    whenToUse:
      'native select を優先できないが、custom select の visual richness も最小限にとどめたい単一選択に向いています。',
    comparisonTip:
      'native select で足りるなら native select に戻し、検索が必要なら combobox へ、カード比較を常時見せたいなら radio card を検討します。',
    layoutNotes:
      'trigger と listbox の幅を揃え、group label と option の階層が一目でわかる余白を保ちます。',
    stateNotes:
      '開閉、active option、selected option、focus return を分離し、Esc と outside click の close ルールを固定します。',
    accessibilityNotes:
      'button + listbox 構造にし、aria-expanded、aria-haspopup、role=\"group\"、roving tabindex を揃えて keyboard 文脈を保ちます。',
    tags: ['custom select', 'listbox', 'single-select'],
    demoKind: 'custom-select-outline-listbox',
    contextNoteKey: 'checkbox',
  },
  {
    id: 'custom-select-soft-options',
    entryType: 'pattern',
    category: 'custom-select',
    title: '補足文つき custom select',
    summary:
      'supporting text を伴う option row を soft surface で見せる custom select の variation です。',
    problem:
      '候補タイトルだけでは違いが伝わらず、description や group 文脈を option row に載せたいことがあります。',
    solution:
      'selected / active state を soft surface で示しつつ、group token、title、supporting text を option row に載せます。',
    whenToUse:
      '候補の説明文を見せたいが、radio card ほど常時一覧比較する必要はない単一選択に向いています。',
    comparisonTip:
      '一覧比較が主題なら radio card、native で足りるなら native select、検索補助が必要なら combobox に切り替えます。',
    layoutNotes:
      'trigger 内の token、title、description の並びを option row と対応させ、opened / closed の情報密度差を小さく保ちます。',
    stateNotes:
      'helper text で custom select にした理由を補足し、selected state と active state の差を色以外でも伝えます。',
    accessibilityNotes:
      'option row の supporting text は label の補足として読み順を保ち、focus が listbox 内を移動しても group 文脈が失われないようにします。',
    tags: ['custom select', 'supporting text', 'single-select'],
    demoKind: 'custom-select-soft-options',
    contextNoteKey: 'checkbox',
  },
  {
    id: 'custom-select-card-options',
    entryType: 'pattern',
    category: 'custom-select',
    title: 'カード型 custom select',
    summary:
      'card 風 option row で情報量を増やしつつ、開閉可能な custom select の責務にとどめる variation です。',
    problem:
      '候補の補足情報が多いと outline や soft variation では差分が見えづらく、選択中の意味も弱くなります。',
    solution:
      'card surface、badge、supporting text を option row に載せ、開いている間だけ高密度な比較を許容します。',
    whenToUse:
      'radio card ほど常時一覧表示は不要だが、候補ごとの差分は強く見せたい単一選択に向いています。',
    comparisonTip:
      '常時比較が価値なら radio card へ、フォーム密度と mobile picker を優先するなら native select へ戻します。',
    layoutNotes:
      'trigger は compact に保ち、listbox 側だけカード密度を上げて開閉前後のレイアウト差を制御します。',
    stateNotes:
      'selected badge、active focus、close 後の focus return をセットで扱い、radio card の常時比較と混同しないようにします。',
    accessibilityNotes:
      '見た目が card でも listbox / option semantics を維持し、Enter、Space、Escape、Home、End の keyboard 操作を一貫させます。',
    tags: ['custom select', 'card option', 'single-select'],
    demoKind: 'custom-select-card-options',
    contextNoteKey: 'checkbox',
  },
  {
    id: 'combobox-search-and-filter',
    entryType: 'pattern',
    category: 'combobox',
    title: '検索付き single-select combobox',
    summary:
      '候補数が多い単一選択を、検索と候補絞り込みで支える baseline combobox パターンです。',
    problem:
      '候補数が多い単一選択を radio や select だけで処理すると、目的の項目に到達しにくく、表記揺れにも弱くなります。',
    solution:
      'input[role=\"combobox\"]、listbox、option、status text の関係を定義し、検索付き single-select の最小構造を先に固定します。',
    whenToUse:
      '候補数が多い、表記揺れがある、候補検索が必要だが最終的には 1 つの既存候補に確定する入力に向いています。',
    comparisonTip:
      '検索できるからといって freeform text 入力とは限りません。freeform 作成や token 化が必要なら別設計、一覧比較だけで足りるなら radio / native select を使います。',
    layoutNotes:
      '閉じた状態、候補表示中、no results を同一幅の frame で並べ、候補領域と status text の関係を崩しません。',
    stateNotes:
      'aria-expanded、aria-controls、aria-activedescendant、結果件数の status text をセットで扱い、baseline でも no results を無音にしません。',
    accessibilityNotes: comboboxAccessibilityNote,
    tags: ['検索', 'single-select', 'ARIA combobox'],
    demoKind: 'combobox-search-and-filter',
    contextNoteKey: 'checkbox',
  },
  {
    id: 'combobox-grouped-results',
    entryType: 'pattern',
    category: 'combobox',
    title: 'grouped results combobox',
    summary:
      'group label を伴う listbox で、候補のまとまりを示す combobox variation です。',
    problem:
      '候補数が多いと検索結果のまとまりが見えにくく、部署やカテゴリごとの文脈が失われがちです。',
    solution:
      'role=\"group\" と group label を使って listbox を区切り、候補探索の文脈を保ちながら single-select を維持します。',
    whenToUse:
      '部署、カテゴリ、用途など複数のクラスタがあり、検索後も候補の所属を見せたい単一選択に向いています。',
    comparisonTip:
      'group が不要なら baseline combobox、結果が少ないなら native select、一覧比較が必要なら radio / custom select を検討します。',
    layoutNotes:
      'group label と option row の距離を詰め、active option が group 境界をまたいでも視線が迷わない listbox 構造にします。',
    stateNotes:
      'group をまたぐ Arrow key 移動と selected state を整え、query が空でも group の文脈が崩れないようにします。',
    accessibilityNotes: comboboxAccessibilityNote,
    tags: ['combobox', 'group label', 'single-select'],
    demoKind: 'combobox-grouped-results',
    contextNoteKey: 'checkbox',
  },
  {
    id: 'combobox-empty-and-loading-states',
    entryType: 'pattern',
    category: 'combobox',
    title: 'empty / loading states combobox',
    summary:
      'loading、no results、selected の切り替えを status text とともに扱う combobox variation です。',
    problem:
      'combobox は候補が 0 件のときや読み込み中のときに、視覚と読み上げの両方で状態が欠落しやすくなります。',
    solution:
      'listbox の空状態、loading 表示、selected 値、aria-live の status text を一緒に設計し、状態遷移を明示します。',
    whenToUse:
      '結果件数の変動や空状態の説明が重要で、baseline combobox から一段深い状態設計を確認したい場面に向いています。',
    comparisonTip:
      '状態設計の負荷が高すぎるなら native select や radio に戻し、production で async が必要なら別実装方針を切り分けます。',
    layoutNotes:
      'input、status、empty / loading panel、selected summary の順序を固定し、状態が変わっても読み順が崩れないようにします。',
    stateNotes:
      'loading、no results、selected を同時に出さず、aria-live で現在の状態を 1 文に集約して読み上げの重複を防ぎます。',
    accessibilityNotes: comboboxAccessibilityNote,
    tags: ['combobox', 'empty state', 'loading state'],
    demoKind: 'combobox-empty-and-loading-states',
    contextNoteKey: 'checkbox',
  },
  {
    id: 'states-and-validation',
    entryType: 'reference',
    category: 'reference',
    title: 'states と validation の共通参照',
    summary:
      'radio / select / custom select / combobox に共通する helper、error、disabled、長いラベル、キーボード / screen reader guidance を集約する reference entry です。',
    problem:
      'selector 系 control ごとに helper / error / disabled の扱いがばらつくと、未選択や validation の意味がページごとに変わって見えてしまいます。',
    solution:
      'helper、error、disabled、long label、focus-visible、screen reader 向け関連付けを cross-cutting ルールとして 1 箇所に集約します。',
    whenToUse:
      'selector 系コンポーネントを実装するときに、control 固有の見た目ではなく品質ルールを確認したい場面に向いています。',
    comparisonTip:
      '複数選択や mixed state は checkbox、押下直後に状態が切り替わる UI は button / toggle に逃がし、selector では「1 つのフォーム値を選ぶ」文脈に集中します。',
    layoutNotes:
      'helper / error / disabled 理由を control 直下にそろえ、長いラベルやモバイル幅でも読み順が崩れない縦積みを基本にします。',
    stateNotes:
      '未選択、error、disabled、focus-visible、no results guidance を control ごとに欠かさず確認できるよう、一覧より reference として整理します。',
    accessibilityNotes:
      'label、legend、aria-describedby、aria-invalid、status text の関連付けを control 間で統一し、screen reader 文脈をばらけさせません。',
    tags: ['reference', 'validation', 'accessibility'],
    demoKind: 'states-and-validation',
    contextNoteKey: 'selector-reference',
  },
] satisfies Array<Omit<SelectorPatternEntry, 'snippets'>>;

export const selectorPatternEntries: SelectorPatternEntry[] =
  baseSelectorPatternEntries.map((entry) => ({
    ...entry,
    snippets: normalizeSnippets(selectorPatternSnippets[entry.id]),
  }));
