import {tabsPatternSnippets} from '@site/src/data/tabsPatternSnippets';
import type {
  TabsComparisonAxis,
  TabsPatternEntry,
  TabsPatternId,
  TabsPatternSnippets,
} from '@site/src/data/tabsPatternTypes';

function normalizeSnippets(snippets: TabsPatternSnippets): TabsPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

export const tabsComparisonAxes = [
  {
    id: 'visual-emphasis',
    title: '見た目の強さ',
    description:
      '下線だけで軽く見せるのか、pill や boxed で選択面を強く出すのかを比較します。',
  },
  {
    id: 'layout-fit',
    title: 'レイアウト適性',
    description:
      '横並び、scrollable、panel と一体化した箱、左ナビ型など、置き場所に合う形を選びます。',
  },
  {
    id: 'content-density',
    title: '情報密度',
    description:
      '短いラベルだけで済むか、badge や長いラベル、セクション説明を含むかで適した形が変わります。',
  },
  {
    id: 'interaction-model',
    title: '操作モデル',
    description:
      '同一ページ内の panel 切り替えであり、ページ遷移や form value 選択とは責務を分けます。',
  },
  {
    id: 'accessibility',
    title: 'アクセシビリティ',
    description:
      '`tablist` / `tab` / `tabpanel`、`aria-selected`、focus-visible、keyboard の期待値を確認します。',
  },
] as const satisfies readonly TabsComparisonAxis[];

export const tabsPatternOrder = [
  'underline-tabs',
  'pill-tabs',
  'boxed-tabs',
  'vertical-tabs',
] as const satisfies readonly TabsPatternId[];

const baseTabsPatternEntries = {
  'underline-tabs': {
    id: 'underline-tabs',
    title: '下線型タブ',
    summary:
      'active tab を下線で示す軽量な tabs。見出しに近い密度で、文脈を壊さず panel を切り替えます。',
    problem:
      'タブ自体が主張しすぎると、本文よりもナビゲーション面が目立ち、軽い情報切り替えに対して重く見えます。',
    solution:
      'active indicator を下線へ限定し、tab label と panel の関係だけを明確にして、本文の読みやすさを優先します。',
    whenToUse:
      '商品詳細、ドキュメント、プロフィールなど、同じ対象の複数セクションを軽く切り替える場面に向いています。',
    layoutNotes:
      '短いラベルを横並びにし、panel との間に余白を取りすぎないことで、本文の続きとして読ませます。',
    stateNotes:
      'hover / focus-visible / selected / disabled を独立させ、selected だけに下線を出します。',
    comparisonTip:
      '迷ったら最初に検討する baseline です。強い選択面が必要なら pill、panel 境界を強めたいなら boxed を選びます。',
    accessibilityNotes:
      '`role="tablist"` と `aria-selected` を揃え、keyboard focus でも active 候補が分かるようにします。',
    comparisonSummary: {
      'visual-emphasis': '最も軽い。active の下線だけで現在位置を示し、本文の邪魔をしにくい。',
      'layout-fit': '横幅が足りる標準レイアウトに向く。多すぎる場合は scrollable を検討する。',
      'content-density': '短いテキストラベル向き。badge や長い説明を増やすと密度が崩れやすい。',
      'interaction-model': '同一ページ内の section / panel 切り替えに向く。ページ遷移リンクとは分ける。',
      accessibility: '`tablist` の baseline を作りやすく、focus-visible と selected を分けやすい。',
    },
    demoKinds: ['underline-overview'],
    tags: ['baseline', '軽量', '本文優先'],
  },
  'pill-tabs': {
    id: 'pill-tabs',
    title: 'ピル型タブ',
    summary:
      '丸い選択面で active state を強く見せる tabs。少数のビューや dashboard の切り替えに向きます。',
    problem:
      '現在選択中の view がすぐ読めないと、dashboard や状態別一覧ではどの集計を見ているのか判断しにくくなります。',
    solution:
      'pill 状の active surface を置き、selected tab を一目で読ませます。必要に応じて count badge も label 内に収めます。',
    whenToUse:
      'overview / revenue / retention のような少数ビュー、状態別一覧、軽い dashboard 切り替えに向いています。',
    layoutNotes:
      'pill container 全体を小さな control 面としてまとめ、panel から離しすぎないようにします。',
    stateNotes:
      'selected は面、hover は淡い背景、focus-visible は outline で分けます。badge は label の補足として扱います。',
    comparisonTip:
      '強い選択面が必要な少数タブに向きます。4件を超える場合や長いラベルでは underline / vertical を検討します。',
    accessibilityNotes:
      '見た目が segmented control に近くても、panel を切り替えるなら tabs semantics を優先します。',
    comparisonSummary: {
      'visual-emphasis': '選択中の面が強い。active view を即座に読ませたい場面に向く。',
      'layout-fit': '少数タブ向き。幅を取りやすいため、多数タブでは scrollable や別レイアウトを検討する。',
      'content-density': 'count badge との相性がよいが、説明文を入れるほど重くなる。',
      'interaction-model': 'view mode より panel 切り替えが主題なら tab semantics を維持する。',
      accessibility: 'pill でも `button` + `role="tab"` とし、`aria-pressed` へ寄せない。',
    },
    demoKinds: ['pill-dashboard'],
    tags: ['selected強調', 'badge', '少数ビュー'],
  },
  'boxed-tabs': {
    id: 'boxed-tabs',
    title: 'ボックス型タブ',
    summary:
      'tab と panel を箱として接続し、編集区画や設定カテゴリの境界を明確にする tabs。',
    problem:
      '設定やフォームの区画を切り替えるとき、panel の境界が曖昧だとどの範囲を編集しているのか分かりにくくなります。',
    solution:
      'active tab と panel の境界をつなげ、現在の編集区画を container として認識できるようにします。',
    whenToUse:
      'settings panel、管理画面の編集セクション、フォーム群の切り替えなど、区画のまとまりを強調したい場面に向きます。',
    layoutNotes:
      'tab の下端を panel と接続し、inactive tab は一段奥に置いて、選択中の面だけを前面に見せます。',
    stateNotes:
      'selected は panel と同じ背景にし、inactive は薄い面へ下げます。disabled は選べない理由も補足します。',
    comparisonTip:
      '区画の境界を明確にしたいなら boxed、本文を軽く読みたいなら underline を優先します。',
    accessibilityNotes:
      'panel がフォームを含む場合も、tab change と form submit の責務を混ぜないようにします。',
    comparisonSummary: {
      'visual-emphasis': 'tab と panel の一体感が強い。現在の編集区画を読みやすい。',
      'layout-fit': '設定画面や admin panel に向く。余白と枠線の設計が重くなりやすい。',
      'content-density': 'panel 内のフォームや説明文を受け止めやすい。',
      'interaction-model': '同じ対象の編集区画切り替えに向く。保存操作は panel 内で別に扱う。',
      accessibility: 'tab change は表示切替、保存は form action として分離する。',
    },
    demoKinds: ['boxed-settings'],
    tags: ['設定向け', '境界明確', 'フォーム区画'],
  },
  'vertical-tabs': {
    id: 'vertical-tabs',
    title: '縦型タブ',
    summary:
      '左に tablist、右に panel を置く tabs。長いラベルや中程度のセクション数を扱いやすくします。',
    problem:
      '横並びタブではラベルが潰れたり、セクション数が増えたときに active 位置を追いにくくなります。',
    solution:
      'tablist を縦に配置し、ラベル幅を確保しながら panel を右側へ固定して、セクション移動と内容確認を同時に行います。',
    whenToUse:
      'settings、docs detail、analytics section など、タブ数が中程度でラベルが長い場面に向いています。',
    layoutNotes:
      '2カラム構成にし、狭い画面では横スクロール型や accordion へ切り替える前提で設計します。',
    stateNotes:
      'selected は左ナビの item 面で示し、panel は右側で安定させます。active item の視線誘導を強めます。',
    comparisonTip:
      '横幅を使える画面で有効です。mobile first の画面では上部 tabs か accordion を優先します。',
    accessibilityNotes:
      '`aria-orientation="vertical"` を付け、arrow key を実装する場合は上下方向に揃えます。',
    comparisonSummary: {
      'visual-emphasis': '左ナビ型で現在セクションを強く示せる。本文面も広く取れる。',
      'layout-fit': 'desktop / tablet の2カラムに向く。mobile では別レイアウトが必要になりやすい。',
      'content-density': '長いラベル、補助ラベル、中程度の項目数に向く。',
      'interaction-model': '同一ページ内の section 切り替え。side navigation のページ遷移とは分ける。',
      accessibility: '`aria-orientation="vertical"` と focus 移動方向を一致させる。',
    },
    demoKinds: ['vertical-sections'],
    tags: ['縦型', '長いラベル', 'desktop向け'],
  },
} satisfies Record<TabsPatternId, Omit<TabsPatternEntry, 'snippets'>>;

export const tabsPatternEntries: TabsPatternEntry[] = tabsPatternOrder.map((patternId) => ({
  ...baseTabsPatternEntries[patternId],
  snippets: normalizeSnippets(tabsPatternSnippets[patternId]),
}));
