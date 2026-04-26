import {paginationPatternSnippets} from '@site/src/data/paginationPatternSnippets';
import type {
  PaginationComparisonAxis,
  PaginationPatternEntry,
  PaginationPatternId,
  PaginationPatternSnippets,
} from '@site/src/data/paginationPatternTypes';

function normalizeSnippets(
  snippets: PaginationPatternSnippets,
): PaginationPatternSnippets | undefined {
  const items = snippets.items.filter((item) => item.code.trim().length > 0);

  if (items.length === 0) {
    return undefined;
  }

  return {
    ...snippets,
    items,
  };
}

export const paginationComparisonAxes = [
  {
    id: 'interaction-model',
    title: '操作モデル',
    description:
      'ページ番号で位置を直接選ぶのか、append を明示トリガーで進めるのか、自動追加読込へ任せるのかを切り分けます。',
  },
  {
    id: 'data-fetching',
    title: '読込単位',
    description:
      'page 単位の置き換え、明示的な batch append、sentinel ベースの自動 append では失敗時の扱いが変わります。',
  },
  {
    id: 'ux-fit',
    title: '向いている UX',
    description:
      '位置把握、再訪しやすさ、気軽な探索、文脈の連続性のどれを優先するかで最適なパターンが変わります。',
  },
  {
    id: 'accessibility',
    title: 'アクセシビリティ',
    description:
      '`aria-current="page"`、button label、live region、footer 到達性の補助など、核になる配慮が異なります。',
  },
  {
    id: 'performance',
    title: 'パフォーマンス',
    description:
      'known total の扱い、append 時の描画負荷、virtualize の必要性、scroll 位置保持の難しさを比較します。',
  },
] as const satisfies readonly PaginationComparisonAxis[];

export const paginationPatternOrder = [
  'page-numbers',
  'load-more',
  'infinite-scroll',
] as const satisfies readonly PaginationPatternId[];

const basePaginationPatternEntries = {
  'page-numbers': {
    id: 'page-numbers',
    title: 'page numbers',
    summary:
      'current page、prev / next、ページ番号、件数要約、page size control を一体で扱い、閲覧位置を明確に保つパターンです。',
    problem:
      '一覧の現在位置と表示件数が離れていると、どこまで見たのか、どれだけ残っているのかが把握しにくくなります。',
    solution:
      'ページ番号、件数要約、表示件数 selector を同じ controller 面へ集約し、結果セットの閲覧状態を明示します。',
    whenToUse:
      '検索結果、table、admin list のように、再訪や位置把握を保ちながら一覧を移動したい場面に向いています。',
    layoutNotes:
      'summary text・page size・prev / next・ページ番号を同じ領域にまとめ、結果一覧の直近で視線移動を短く保ちます。',
    stateNotes:
      'first / last の disabled、empty / single-page、page size 変更後の clamp、helper text、`aria-current="page"` を一貫して扱います。',
    comparisonTip:
      'user-facing な page size control を持たせるのは v1 では page numbers のみです。load more / infinite scroll の batch size は UI へ出しません。',
    accessibilityNotes:
      '`nav` と `aria-label`、current page の `aria-current="page"`、prev / next の disabled、helper text の `aria-live="polite"` を揃えます。',
    comparisonSummary: {
      'interaction-model':
        'ページ番号と prev / next で現在位置を直接選ぶ。page size control もこのパターンにのみ含める。',
      'data-fetching':
        'ページ単位で結果を置き換える前提。known total と max pages を計算しやすい。',
      'ux-fit':
        '再訪しやすさ、位置把握、管理画面や table の安定した閲覧に向く。',
      accessibility:
        '`aria-current="page"` を中心に設計しやすく、keyboard でも現在位置を理解しやすい。',
      performance:
        'page 単位で描画を切り替えるため、append 型より DOM が増えにくい。',
    },
    demoKinds: [
      'page-numbers-search',
      'page-numbers-table',
      'page-numbers-admin-list',
    ],
    exposesPageSizeControl: true,
    tags: ['位置把握', 'page size', '再訪しやすい'],
  },
  'load-more': {
    id: 'load-more',
    title: 'load more',
    summary:
      '明示的な追加読込で結果を append し、閲覧の連続性を保ちながらユーザー主導で次の chunk を開くパターンです。',
    problem:
      '一覧の連続性を保ちたい一方で、auto append による位置喪失や footer 到達不能までは持ち込みたくない場面があります。',
    solution:
      'append を user action に限定し、loading / error / end を footer 近くで明示して、読み進める責任範囲をはっきりさせます。',
    whenToUse:
      '商品一覧、記事一覧、ギャラリーなど、探索の流れを保ちつつ追加読込の主導権はユーザーに残したい場面に向いています。',
    layoutNotes:
      '追加読込ボタン、loading、error、end メッセージを一覧末尾にまとめ、現在どこまで読んだかを見失いにくくします。',
    stateNotes:
      '`ready` / `loading` / `error` / `end` を明示し、retry action を inline で戻せるようにします。',
    comparisonTip:
      'page size selector は UI に含めません。1 回で 20 件追加するなどの batch size は説明テキストで扱います。',
    accessibilityNotes:
      'button label を具体化し、append 後の件数変化は visible text で補います。error は inline alert と retry action を併置します。',
    comparisonSummary: {
      'interaction-model':
        '「さらに読み込む」で append する。位置の直接指定はできず、ユーザー主導で進める。',
      'data-fetching':
        '固定 chunk を追加読込する。失敗時は retry を同じ位置に出しやすい。',
      'ux-fit':
        '探索体験を保ちつつ、footer 到達や読込タイミングの制御も残したい場面に向く。',
      accessibility:
        '明示ボタンがあるぶん操作契機が分かりやすい。append 後の変化は件数文言で補足する。',
      performance:
        'append で DOM は増えるが、auto append より読込量を抑制しやすい。',
    },
    demoKinds: ['load-more-demo'],
    exposesPageSizeControl: false,
    tags: ['逐次追加', '明示トリガー', '探索向け'],
  },
  'infinite-scroll': {
    id: 'infinite-scroll',
    title: 'infinite scroll',
    summary:
      '末尾到達を契機に自動追加読込し、文脈を切らさずに長い一覧を流し読みさせるパターンです。',
    problem:
      '手を止めずに連続探索させたい一方で、現在位置や footer 到達性、再訪しやすさは弱くなりやすい構造です。',
    solution:
      'auto append の利点を認めつつ、loading / error / end の状態と fallback action を明示し、弱点を compare / detail 両方で補います。',
    whenToUse:
      'SNS 風 feed、発見的な探索面、短い判断を連続させる一覧など、位置指定より文脈維持を優先する場面に向いています。',
    layoutNotes:
      'contained scroll area と sentinel 周辺に状態表示を置き、auto append が起きる位置と失敗時の戻り先を見せます。',
    stateNotes:
      '`ready` / `loading` / `error` / `end` を sentinel 周辺で出し分け、manual fallback を補助的に置きます。',
    comparisonTip:
      'page size selector は出しません。auto append を採る代わりに、位置把握・footer 到達性・再訪性の弱さを補助文で明記します。',
    accessibilityNotes:
      '自動で増える一覧は変化の契機が見えにくいため、loading / error / end 文言、fallback action、scroll area のラベルを揃えます。',
    comparisonSummary: {
      'interaction-model':
        '末尾到達で自動追加読込する。ページ位置の直接指定はできず、文脈維持を優先する。',
      'data-fetching':
        'sentinel 起点で batch append する。error 復帰や end 判定の可視化が重要になる。',
      'ux-fit':
        '探索の流れは強いが、位置把握・footer 到達・再訪しやすさは弱くなりやすい。',
      accessibility:
        '自動変化のため状態説明が必須。scroll area のラベルと fallback action を足して理解を支える。',
      performance:
        '長い一覧では描画負荷が増えやすく、virtualize やメモリ使用量の検討が必要になりやすい。',
    },
    demoKinds: ['infinite-scroll-demo'],
    exposesPageSizeControl: false,
    tags: ['自動追加', '文脈維持', 'footer注意'],
  },
} satisfies Record<PaginationPatternId, Omit<PaginationPatternEntry, 'snippets'>>;

export const paginationPatternEntries: PaginationPatternEntry[] =
  paginationPatternOrder.map((patternId) => ({
    ...basePaginationPatternEntries[patternId],
    snippets: normalizeSnippets(paginationPatternSnippets[patternId]),
  }));
