import {buttonPatternSnippets} from '@site/src/data/buttonPatternSnippets';
import type {
  ButtonPatternEntry,
  ButtonPatternSnippets,
} from '@site/src/data/buttonPatternTypes';

function normalizeSnippets(
  snippets: ButtonPatternSnippets,
): ButtonPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

const baseButtonPatternEntries = [
  {
    id: 'hierarchy-and-emphasis',
    title: '強調度と優先順位',
    summary:
      'primary / secondary / tertiary / ghost を使い分け、画面内の主行動と補助行動を整理します。',
    problem:
      '見た目が似たボタンが並ぶと、どれが最優先の操作か瞬時に判断しにくくなります。',
    solution:
      '最重要アクションだけを最も強い視覚階層に置き、補助行動は段階的に強調を下げて配置します。',
    whenToUse:
      '主行動が 1 つに定まっており、保存・キャンセル・詳細など複数の補助行動を同時に並べたい場面に向いています。',
    layoutNotes:
      '同じ行に並べる場合は primary の位置を画面内でそろえ、グループ内の gap とボタン幅のルールも一定に保ちます。',
    stateNotes:
      'variant が違っても hover / focus-visible / disabled の挙動を共通化し、優先度と状態の意味が混ざらないようにします。',
    accessibilityNotes:
      '色だけに頼らず、ボタンラベル、位置、押下後の変化でも優先度を伝えて誤操作を防ぎます。',
    tags: ['primary', 'secondary', '優先順位'],
    demoKind: 'hierarchy-and-emphasis',
  },
  {
    id: 'interactive-states',
    title: 'インタラクティブ状態',
    summary:
      'default / hover / focus-visible / disabled / loading を並べ、状態遷移の約束をそろえます。',
    problem:
      '状態表現が場当たり的だと、押せるかどうかや処理中かどうかが一貫して伝わりません。',
    solution:
      '主要状態を先に定義し、見た目の差分と操作可否のルールを variant 横断で共通化します。',
    whenToUse:
      'フォーム送信、保存、非同期処理など、操作後のフィードバックと再実行防止が重要なボタン全般に向いています。',
    layoutNotes:
      'loading 中でも横幅が極端に跳ねないように min-width、spinner 領域、ラベル差し替えのルールを先に決めておきます。',
    stateNotes:
      'hover は補助的な反応、focus-visible はキーボード導線、disabled は操作不可、loading は処理中として明確に分けます。',
    accessibilityNotes:
      'focus-visible を消さず、disabled と loading では支援技術にも状態が伝わるラベルや補助文言を用意します。',
    tags: ['hover', 'focus-visible', 'loading'],
    demoKind: 'interactive-states',
  },
  {
    id: 'destructive-actions',
    title: '危険操作',
    summary:
      'destructive / warning / secondary cancel を分け、危険度と取り返しのつかなさを段階づけます。',
    problem:
      '削除や停止などの危険操作を通常ボタンと同列に置くと、誤操作や確認漏れが起こりやすくなります。',
    solution:
      '危険度に応じて destructive と warning を分け、取り消し可能な補助行動や説明文を近くに配置します。',
    whenToUse:
      '完全削除、公開停止、課金停止など、実行結果が大きく元に戻しにくい操作を扱う場面に向いています。',
    layoutNotes:
      'キャンセルや補助説明を危険操作の近くに置きつつ、dialog footer では destructive を一番強い見た目で固定します。',
    stateNotes:
      '確認前後でラベルや補助説明が変わる場合も、danger の意味と処理中の状態が混ざらないように別軸で表現します。',
    accessibilityNotes:
      '色覚差に依存しないようにラベルで危険性を明示し、必要に応じて undo や確認メッセージで文脈を補います。',
    tags: ['destructive', 'warning', 'confirm'],
    demoKind: 'destructive-actions',
  },
  {
    id: 'icon-and-compound-actions',
    title: 'アイコン・複合アクション',
    summary:
      'leading / trailing icon、icon-only、split button などの複合的な操作導線を整理します。',
    problem:
      'アイコン付きボタンは便利ですが、ラベル不足や操作領域の分離不足で意味が曖昧になりやすくなります。',
    solution:
      'アイコンの役割を補助に寄せ、icon-only には accessible name を必須にし、split button は主操作と補助操作を分離します。',
    whenToUse:
      '新規作成、共有、検索、追加メニューなど、操作の意味を短く補足したい場面や 2 段階の行動をまとめたい場面に向いています。',
    layoutNotes:
      'icon gap、icon-only の正方形サイズ、split button の境界線などをそろえると variant 間で密度がぶれにくくなります。',
    stateNotes:
      'icon だけが変化する loading 表現よりも、ラベルと組み合わせた状態変化を優先すると認知負荷が下がります。',
    accessibilityNotes:
      'icon-only は必ず `aria-label` で意味を補い、split button では各ボタンの役割を個別に読めるようにします。',
    tags: ['icon-only', 'split button', 'aria-label'],
    demoKind: 'icon-and-compound-actions',
  },
  {
    id: 'button-group',
    title: 'ボタングループ',
    summary:
      '関連する action group / toggle group / split button を 1 まとまりの操作導線として整理します。',
    problem:
      '関連するボタンがばらばらに置かれると、どこまでが 1 セットの操作か伝わりにくく、toggle と実行ボタンの違いも曖昧になります。',
    solution:
      '`role="group"` でまとまりを示し、connected / separated / split の境界と優先順位を先に決めて、グループ内の責務を明確にします。',
    whenToUse:
      'ツールバー、カードアクション、表示切替、主操作 + 補助メニューなど、複数ボタンを近接配置して 1 コンテキストとして扱いたい場面に向いています。',
    layoutNotes:
      '横並びを基本にしつつ、密度が高い場面は connected、余白が必要なら separated、主操作 + 補助操作は split button として境界を残します。',
    stateNotes:
      'Button Group は配置と役割分担を扱い、pressed の意味づけ自体は toggle-and-selection で深掘りします。action group では各ボタンを独立実行として保ちます。',
    accessibilityNotes:
      'グループ全体には `role="group"` と名前を与え、split button は主操作と補助メニューを別々に読めるようにし、toggle group では選択状態を属性でも伝えます。',
    tags: ['role=group', 'toggle group', 'split button'],
    demoKind: 'button-group',
  },
  {
    id: 'toggle-and-selection',
    title: 'トグル・選択',
    summary:
      '`aria-pressed` を使うトグルと、複数候補から選ぶセグメント UI のルールをそろえます。',
    problem:
      '選択状態と実行ボタンを同じ見た目で扱うと、押した結果が実行なのか状態切り替えなのか分かりにくくなります。',
    solution:
      'トグルは pressed/unpressed、選択群は selected/unselected として意味を分け、視覚差と属性値を一致させます。',
    whenToUse:
      '表示切替、フィルタ固定、セグメントコントロールなど、実行より状態選択が主目的の UI に向いています。',
    layoutNotes:
      '選択肢の数が多い場合でもグループ境界と押下状態が崩れないように、pill 形状や内側 gap を一定に保ちます。',
    stateNotes:
      '初期値は `aria-pressed={false}` から始め、単独トグルと複数候補の選択で state の意味を分けて扱います。',
    accessibilityNotes:
      'トグルの ON/OFF や選択可能数を文脈で説明し、pressed の意味が単なる強調ではないことを明確にします。',
    tags: ['aria-pressed', 'segmented', 'selection'],
    demoKind: 'toggle-and-selection',
  },
  {
    id: 'spacing-and-sizing',
    title: '余白とサイズ設計',
    summary:
      'compact / default / comfortable のサイズ差、padding、min-height、icon gap の基準を整理します。',
    problem:
      'ボタンサイズのルールが曖昧だと、同じ画面内で高さや余白が揺れ、操作対象としての一貫性が失われます。',
    solution:
      '密度ごとに min-height、padding、icon gap の基準を先に定め、variant が違っても物理サイズをそろえます。',
    whenToUse:
      'ツールバー、フォーム、モバイル CTA など、同じデザインシステムで異なる密度を横断して運用したい場面に向いています。',
    layoutNotes:
      'compact は高密度用途に限定し、標準は default、タッチ主体の画面では comfortable を基準にすると整合が取りやすくなります。',
    stateNotes:
      'サイズ違いでも focus-visible や loading の表現量を保てるように、outline と spinner の寸法も連動させます。',
    accessibilityNotes:
      'タッチターゲットを維持しつつ、icon-only や短いラベルでも押下可能領域が十分確保されるサイズを選びます。',
    tags: ['padding', 'min-height', 'touch target'],
    demoKind: 'spacing-and-sizing',
  },
] satisfies Array<Omit<ButtonPatternEntry, 'snippets'>>;

export const buttonPatternEntries: ButtonPatternEntry[] =
  baseButtonPatternEntries.map((entry) => ({
    ...entry,
    snippets: normalizeSnippets(buttonPatternSnippets[entry.id]),
  }));
