export type TodoPatternCategoryId =
  | 'breadcrumb'
  | 'card'
  | 'chip-tag'
  | 'dialog-modal'
  | 'drawer-sheet'
  | 'dropdown-menu'
  | 'hover-card'
  | 'navigation-menu'
  | 'popover'
  | 'separator'
  | 'slider'
  | 'textarea'
  | 'toast-snackbar'
  | 'tooltip';

export type TodoPatternVariant = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly labels: readonly string[];
  readonly tsx: string;
  readonly css: string;
};

export type TodoPatternEntry = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly accessibilityNote: string;
  readonly tags: readonly string[];
  readonly variants: readonly TodoPatternVariant[];
};

export type TodoPatternCategory = {
  readonly id: TodoPatternCategoryId;
  readonly label: string;
  readonly slug: string;
  readonly comparePath: string;
  readonly summary: string;
  readonly scope: readonly string[];
  readonly axes: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly entries: readonly TodoPatternEntry[];
};

const sharedCss = `.pattern {
  display: grid;
  gap: 12px;
  max-width: 520px;
}

.surface {
  border: 1px solid #d7dee8;
  border-radius: 8px;
  background: #ffffff;
  padding: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}`;

function buildSnippet(categoryLabel: string, variantTitle: string, labels: readonly string[]): string {
  return `<section className="pattern" aria-label="${categoryLabel}: ${variantTitle}">
  ${labels.map((label) => `<span>${label}</span>`).join('\n  ')}
</section>`;
}

function createVariant(
  categoryLabel: string,
  id: string,
  title: string,
  summary: string,
  labels: readonly string[],
): TodoPatternVariant {
  return {
    id,
    title,
    summary,
    labels,
    tsx: buildSnippet(categoryLabel, title, labels),
    css: sharedCss,
  };
}

function createEntry(
  categoryLabel: string,
  id: string,
  title: string,
  summary: string,
  problem: string,
  solution: string,
  accessibilityNote: string,
  tags: readonly string[],
  variants: readonly Omit<TodoPatternVariant, 'tsx' | 'css'>[],
): TodoPatternEntry {
  return {
    id,
    title,
    summary,
    problem,
    solution,
    accessibilityNote,
    tags,
    variants: variants.map((variant) =>
      createVariant(categoryLabel, variant.id, variant.title, variant.summary, variant.labels),
    ),
  };
}

export const todoPatternCategories = [
  {
    id: 'breadcrumb',
    label: 'パンくずリスト',
    slug: 'breadcrumb',
    comparePath: '/patterns/breadcrumb-designs',
    summary:
      '現在位置までの階層を示し、上位ページへ戻るための補助 navigation です。',
    scope: ['docs hierarchy', 'product category', 'settings subpage'],
    axes: [
      {
        title: '区切り記号',
        description: 'slash / chevron / dot など、階層の深さと読みやすさに合わせて選びます。',
      },
      {
        title: '現在地',
        description: 'current item はリンクにせず、aria-current で現在位置を伝えます。',
      },
      {
        title: '省略',
        description: '深い階層は collapsed menu と truncation を別 variant として扱います。',
      },
    ],
    entries: [
      createEntry(
        'パンくずリスト',
        'hierarchy-breadcrumb',
        '階層パンくず',
        'slash / chevron / collapsed menu を分けて、現在位置までの導線を整理する基本パターン。',
        'primary navigation と混同すると、現在地の補助導線なのか大域移動なのかが曖昧になります。',
        '階層ごとの item、separator、current item の責務を分け、深い階層だけ省略 variant を使います。',
        'nav に aria-label を付け、現在地には aria-current="page" を付与します。',
        ['navigation', 'hierarchy', 'current'],
        [
          {
            id: 'slash',
            title: 'スラッシュ区切り',
            summary: 'docs や設定画面で軽く見せる slash 区切り。',
            labels: ['ホーム', '/', '設定', '/', '通知'],
          },
          {
            id: 'chevron',
            title: '山括弧区切り',
            summary: 'プロダクト階層を強めに示す chevron 区切り。',
            labels: ['商品', '>', '家具', '>', 'チェア'],
          },
          {
            id: 'collapsed',
            title: '省略メニュー',
            summary: '深い階層で中間 item を折りたたむ表示。',
            labels: ['ホーム', '...', '権限', 'メンバー招待'],
          },
        ],
      ),
    ],
  },
  {
    id: 'card',
    label: 'カード',
    slug: 'card',
    comparePath: '/patterns/card-designs',
    summary:
      '関連する情報、メディア、アクションをひとまとまりに見せる data display です。',
    scope: ['article preview', 'product summary', 'dashboard widget'],
    axes: [
      {
        title: '構造',
        description: 'header / media / body / footer / actions の必要性を先に決めます。',
      },
      {
        title: 'レイアウト',
        description: 'vertical / horizontal / overlay で情報量と画像比率の扱いを分けます。',
      },
      {
        title: '操作',
        description: 'clickable card と内部 action を同時に持たせる場合は focus 順を明確にします。',
      },
    ],
    entries: [
      createEntry(
        'カード',
        'content-card',
        'コンテンツカード',
        'vertical / horizontal / overlay / interactive を分けて、情報のまとまりを見せるカード。',
        '枠だけをカード化すると、何が主情報で何が操作なのかが読み取りづらくなります。',
        'header、body、media、actions の役割を固定し、clickable と selectable を分けます。',
        'カード全体をリンクにする場合でも、内部ボタンとのフォーカス競合を避けます。',
        ['data-display', 'layout', 'action'],
        [
          {
            id: 'vertical',
            title: '縦型',
            summary: '画像、本文、アクションを上から読む標準カード。',
            labels: ['ヘッダー', 'プレビュー画像', '本文', '詳細を見る'],
          },
          {
            id: 'horizontal',
            title: '横型',
            summary: '小さな画像と要約を横に並べる一覧向けカード。',
            labels: ['サムネイル', '製品名', '在庫あり', '比較する'],
          },
          {
            id: 'overlay',
            title: 'オーバーレイ',
            summary: 'メディア上に短いラベルと主アクションを重ねるカード。',
            labels: ['新着', '特集記事', '読む'],
          },
          {
            id: 'interactive',
            title: '操作可能',
            summary: 'hover / focus / selected を持つ選択可能カード。',
            labels: ['選択中', 'チームプラン', '月額見積もり'],
          },
        ],
      ),
    ],
  },
  {
    id: 'chip-tag',
    label: 'チップ・タグ',
    slug: 'chip-tag',
    comparePath: '/patterns/chip-tag-designs',
    summary:
      '属性、フィルタ、軽い状態を短いラベルとして扱う compact data display です。',
    scope: ['filter chip', 'tag label', 'removable token'],
    axes: [
      {
        title: '意味',
        description: 'tag は分類、chip は選択や削除可能な token として使い分けます。',
      },
      {
        title: '操作',
        description: 'readonly / clickable / removable を同じ見た目にしすぎないようにします。',
      },
      {
        title: '密度',
        description: '長い文言や多数表示では wrap、overflow、削除 button のサイズを決めます。',
      },
    ],
    entries: [
      createEntry(
        'チップ・タグ',
        'chip-tag-token',
        'チップ・タグトークン',
        'readonly tag、filter chip、removable chip を分ける compact token パターン。',
        '押せるのか単なる分類なのかが曖昧だと、badge や button と責務が混ざります。',
        '意味だけの tag と操作可能な chip を variant で分離し、削除操作は明示します。',
        '削除 button には対象が分かる aria-label を付けます。',
        ['data-display', 'filter', 'token'],
        [
          {
            id: 'readonly',
            title: '読み取り専用タグ',
            summary: '分類や属性を非操作ラベルとして表示します。',
            labels: ['Design', 'React', 'Accessible'],
          },
          {
            id: 'filter',
            title: 'フィルターチップ',
            summary: 'active / inactive が切り替わる絞り込み token。',
            labels: ['在庫あり', '送料無料', 'セール対象'],
          },
          {
            id: 'removable',
            title: '削除可能チップ',
            summary: '選択済み条件を x button で外せる token。',
            labels: ['東京 x', 'リモート x', '正社員 x'],
          },
        ],
      ),
    ],
  },
  {
    id: 'dialog-modal',
    label: 'ダイアログ・モーダル',
    slug: 'dialog-modal',
    comparePath: '/patterns/dialog-modal-designs',
    summary:
      '現在の文脈を一時的に止め、確認や入力を完了させる overlay pattern です。',
    scope: ['confirmation', 'form modal', 'destructive guard'],
    axes: [
      {
        title: '割り込み度',
        description: '確認だけか、入力完了まで背後操作を止めるのかを分けます。',
      },
      {
        title: '幅と内容',
        description: '短い確認、フォーム、詳細表示で footer と scroll の扱いを変えます。',
      },
      {
        title: '閉じ方',
        description: 'escape、backdrop、cancel、destructive action の扱いを明確にします。',
      },
    ],
    entries: [
      createEntry(
        'ダイアログ・モーダル',
        'modal-dialog',
        'モーダルダイアログ',
        'confirmation / form / destructive guard を分ける overlay パターン。',
        '全ての overlay を同じ modal にすると、割り込み度や閉じ方の期待が揃いません。',
        '目的別にタイトル、説明、主操作、キャンセル操作を固定して設計します。',
        'role="dialog"、aria-modal、初期 focus、focus trap、閉じた後の focus 復帰を扱います。',
        ['overlay', 'confirmation', 'focus'],
        [
          {
            id: 'confirmation',
            title: '確認',
            summary: '短い確認と cancel / confirm を持つ基本形。',
            labels: ['変更を保存しますか', 'キャンセル', '保存'],
          },
          {
            id: 'form',
            title: 'フォームモーダル',
            summary: 'フォーム入力を modal 内で完了させる構成。',
            labels: ['メンバーを招待', 'メールアドレス', '招待する'],
          },
          {
            id: 'destructive',
            title: '危険操作ガード',
            summary: '取り消しづらい操作を確認する危険操作用。',
            labels: ['プロジェクトを削除', 'この操作は元に戻せません', '削除する'],
          },
        ],
      ),
    ],
  },
  {
    id: 'drawer-sheet',
    label: 'ドロワー・シート',
    slug: 'drawer-sheet',
    comparePath: '/patterns/drawer-sheet-designs',
    summary:
      '画面端から補助的な詳細、フォーム、ナビゲーションを出す overlay pattern です。',
    scope: ['side panel', 'mobile sheet', 'filter drawer'],
    axes: [
      {
        title: '出現方向',
        description: 'side drawer と bottom sheet は画面サイズとタスク時間で選びます。',
      },
      {
        title: '背後操作',
        description: 'modal sheet か non-modal side panel かで focus と backdrop を変えます。',
      },
      {
        title: '内容量',
        description: '長いフォームや filter は header / footer fixed と scroll 領域を分けます。',
      },
    ],
    entries: [
      createEntry(
        'ドロワー・シート',
        'drawer-sheet-panel',
        'ドロワー・シートパネル',
        'side drawer / bottom sheet / filter drawer を分ける補助 overlay。',
        'drawer を dialog の代替として使いすぎると、画面端から出る意味が弱くなります。',
        '短時間の補助操作か、長い編集かで出現方向と footer の固定を選びます。',
        'modal の場合は dialog と同様に focus trap と復帰を扱います。',
        ['overlay', 'panel', 'responsive'],
        [
          {
            id: 'side',
            title: 'サイドドロワー',
            summary: '詳細確認や編集を右側から出す desktop 向け。',
            labels: ['詳細パネル', 'ステータス', '保存'],
          },
          {
            id: 'bottom',
            title: 'ボトムシート',
            summary: 'モバイルで片手操作しやすい下部 sheet。',
            labels: ['共有', 'リンクをコピー', '閉じる'],
          },
          {
            id: 'filter',
            title: 'フィルタードロワー',
            summary: '一覧の絞り込み条件をまとめて編集する drawer。',
            labels: ['絞り込み', '価格帯', '適用する'],
          },
        ],
      ),
    ],
  },
  {
    id: 'dropdown-menu',
    label: 'ドロップダウンメニュー',
    slug: 'dropdown-menu',
    comparePath: '/patterns/dropdown-menu-designs',
    summary:
      'button から短い action list を展開する command menu です。',
    scope: ['action menu', 'overflow menu', 'account menu'],
    axes: [
      {
        title: '選択か実行か',
        description: 'select と混同せず、dropdown menu は command 実行を中心に扱います。',
      },
      {
        title: '項目構成',
        description: 'group、separator、destructive item の視認性を決めます。',
      },
      {
        title: '配置',
        description: 'trigger からの alignment と viewport collision を考慮します。',
      },
    ],
    entries: [
      createEntry(
        'ドロップダウンメニュー',
        'dropdown-action-menu',
        'アクションメニュー',
        'action / grouped / destructive を分ける dropdown menu。',
        '選択フォームと command menu が同じ見た目だと、値を選ぶ操作か実行かが曖昧です。',
        'trigger と menuitem の関係を明確にし、危険操作は group と色で分けます。',
        'keyboard navigation、escape close、trigger focus 復帰を扱います。',
        ['overlay', 'menu', 'command'],
        [
          {
            id: 'actions',
            title: 'アクションリスト',
            summary: '編集、複製、共有などの短い操作一覧。',
            labels: ['開く', '名前を変更', '複製'],
          },
          {
            id: 'grouped',
            title: 'グループメニュー',
            summary: '関連操作を separator で分ける menu。',
            labels: ['表示', '並び替え', '---', '設定'],
          },
          {
            id: 'destructive',
            title: '危険操作項目',
            summary: '削除などの危険操作を末尾に分離する menu。',
            labels: ['アーカイブ', '---', '削除'],
          },
        ],
      ),
    ],
  },
  {
    id: 'hover-card',
    label: 'ホバーカード',
    slug: 'hover-card',
    comparePath: '/patterns/hover-card-designs',
    summary:
      'hover / focus に応じて、対象の補足情報を短く見せる preview overlay です。',
    scope: ['profile preview', 'term preview', 'object summary'],
    axes: [
      {
        title: '情報量',
        description: 'tooltip より情報量が多く、popover より操作を少なくします。',
      },
      {
        title: '表示条件',
        description: 'hover だけでなく keyboard focus でも内容を確認できるようにします。',
      },
      {
        title: '操作',
        description: '中に primary action を置く場合は hover 解除で消えない設計が必要です。',
      },
    ],
    entries: [
      createEntry(
        'ホバーカード',
        'hover-preview-card',
        'ホバープレビューカード',
        'profile / term / object summary を短く表示する hover card。',
        'tooltip に長文を詰めると読みにくく、popover にすると操作 UI になりすぎます。',
        '短い見出し、メタ情報、補足テキストに絞って preview として設計します。',
        'hover だけに依存せず、focus や click fallback を用意します。',
        ['overlay', 'preview', 'hover'],
        [
          {
            id: 'profile',
            title: 'プロフィールプレビュー',
            summary: '人物やチームの要約を見せる hover card。',
            labels: ['佐藤 葵', 'Product Designer', '最近の投稿 12件'],
          },
          {
            id: 'term',
            title: '用語プレビュー',
            summary: '用語や略語の補足説明を表示する card。',
            labels: ['ARIA', 'アクセシビリティ API への意味づけ'],
          },
          {
            id: 'object',
            title: '対象サマリー',
            summary: 'ファイルや案件の状態を短く見せる preview。',
            labels: ['見積書.pdf', '更新 2時間前', '承認待ち'],
          },
        ],
      ),
    ],
  },
  {
    id: 'navigation-menu',
    label: 'ナビゲーションメニュー',
    slug: 'navigation-menu',
    comparePath: '/patterns/navigation-menu-designs',
    summary:
      '主要セクションや階層を横断移動する primary navigation pattern です。',
    scope: ['site navigation', 'product navigation', 'mega menu'],
    axes: [
      {
        title: '階層',
        description: 'top-level、submenu、mega menu の深さと頻度を整理します。',
      },
      {
        title: '現在地',
        description: 'active item、section label、breadcrumb との責務を分けます。',
      },
      {
        title: 'レスポンシブ',
        description: 'desktop nav と mobile drawer/menu の情報構造を揃えます。',
      },
    ],
    entries: [
      createEntry(
        'ナビゲーションメニュー',
        'primary-navigation-menu',
        'プライマリナビゲーション',
        'horizontal / sidebar / mega menu を分ける primary navigation。',
        'breadcrumb や tab と混同すると、移動範囲と現在地の意味が曖昧になります。',
        '大域移動を navigation menu に集約し、ページ内切り替えは tabs に分けます。',
        '現在ページは aria-current で示し、submenu は keyboard で到達できるようにします。',
        ['navigation', 'primary', 'responsive'],
        [
          {
            id: 'horizontal',
            title: '横型ナビゲーション',
            summary: '上部に主要セクションを並べる desktop navigation。',
            labels: ['概要', 'プロダクト', '料金', 'サポート'],
          },
          {
            id: 'sidebar',
            title: 'サイドバーナビゲーション',
            summary: '管理画面や docs で縦方向に階層を見せる navigation。',
            labels: ['ダッシュボード', 'ユーザー', '設定'],
          },
          {
            id: 'mega',
            title: 'メガメニュー',
            summary: '複数カテゴリをまとめて展開する大規模 navigation。',
            labels: ['製品', '分析', '自動化', '連携'],
          },
        ],
      ),
    ],
  },
  {
    id: 'popover',
    label: 'ポップオーバー',
    slug: 'popover',
    comparePath: '/patterns/popover-designs',
    summary:
      'trigger の近くに軽い入力や補助操作を表示する overlay pattern です。',
    scope: ['quick edit', 'picker', 'context helper'],
    axes: [
      {
        title: '操作量',
        description: '軽い入力や picker までに留め、長いフォームは drawer/modal に分けます。',
      },
      {
        title: '閉じ方',
        description: 'outside click、escape、保存後 close の期待を明確にします。',
      },
      {
        title: '配置',
        description: 'trigger との関係と viewport collision を考慮します。',
      },
    ],
    entries: [
      createEntry(
        'ポップオーバー',
        'popover-panel',
        'ポップオーバーパネル',
        'quick edit / picker / helper を分ける軽量 overlay。',
        'tooltip に操作を入れたり modal に軽すぎる操作を入れると、割り込み度が合いません。',
        'trigger 近くで完結する短い操作に限定し、長い編集は別 pattern に逃がします。',
        'trigger と panel の関連付け、escape close、focus 移動を扱います。',
        ['overlay', 'picker', 'quick-action'],
        [
          {
            id: 'quick-edit',
            title: 'クイック編集',
            summary: '短い値をその場で編集する popover。',
            labels: ['表示名', 'Team Alpha', '保存'],
          },
          {
            id: 'picker',
            title: 'ピッカー',
            summary: '日付や色などの候補を近くで選ぶ popover。',
            labels: ['今日', '明日', '来週'],
          },
          {
            id: 'helper',
            title: '文脈ヘルパー',
            summary: '補足説明と軽い action をまとめる helper。',
            labels: ['権限とは', '閲覧者は編集できません', '詳しく見る'],
          },
        ],
      ),
    ],
  },
  {
    id: 'separator',
    label: 'セパレーター',
    slug: 'separator',
    comparePath: '/patterns/separator-designs',
    summary:
      '情報グループの境界を控えめに示す structural visual pattern です。',
    scope: ['menu group', 'form section', 'content divider'],
    axes: [
      {
        title: '方向',
        description: 'horizontal / vertical で配置と余白の意味を分けます。',
      },
      {
        title: '強さ',
        description: 'border、space、labelled divider を情報の区切りの強さで使い分けます。',
      },
      {
        title: '意味',
        description: '装飾か構造かで role="separator" の必要性を判断します。',
      },
    ],
    entries: [
      createEntry(
        'セパレーター',
        'structural-separator',
        '構造セパレーター',
        'horizontal / vertical / labelled divider を分ける境界表現。',
        '線を増やしすぎると UI が重くなり、余白だけでは境界が伝わらない場合があります。',
        '情報グループの粒度に合わせて、余白、薄い線、ラベル付き区切りを選びます。',
        '意味のある区切りは role="separator" と orientation を検討します。',
        ['structure', 'divider', 'layout'],
        [
          {
            id: 'horizontal',
            title: '横型',
            summary: 'フォームやカード内の縦方向グループを分ける線。',
            labels: ['プロフィール', '---', '通知設定'],
          },
          {
            id: 'vertical',
            title: '縦型',
            summary: 'toolbar 内で action group を分ける縦線。',
            labels: ['元に戻す', '|', '保存', '|', '公開'],
          },
          {
            id: 'labelled',
            title: 'ラベル付き区切り',
            summary: '日付や区分名を中央に持つ区切り。',
            labels: ['--- 今日 ---', '更新履歴'],
          },
        ],
      ),
    ],
  },
  {
    id: 'slider',
    label: 'スライダー',
    slug: 'slider',
    comparePath: '/patterns/slider-designs',
    summary:
      '連続値や範囲を視覚的につまみで調整する input controller です。',
    scope: ['volume', 'price range', 'image adjustment'],
    axes: [
      {
        title: '値の種類',
        description: 'single value、range、stepped value を分けます。',
      },
      {
        title: '精度',
        description: '正確な入力が必要なら number input との併用を検討します。',
      },
      {
        title: 'ラベル',
        description: '最小値、最大値、現在値、単位を明示します。',
      },
    ],
    entries: [
      createEntry(
        'スライダー',
        'range-slider',
        'レンジスライダー',
        'single / range / stepped を分ける値調整 controller。',
        '細かい数値入力を slider だけに任せると、正確な指定が難しくなります。',
        '目安調整は slider、厳密値は input 併用として責務を分けます。',
        'input type="range" には label と現在値の読み上げ文脈を用意します。',
        ['form', 'controller', 'range'],
        [
          {
            id: 'single',
            title: '単一値',
            summary: '音量や透明度など 1 つの連続値を調整します。',
            labels: ['音量', '64%', '0 - 100'],
          },
          {
            id: 'range',
            title: '範囲値',
            summary: '価格帯など最小値と最大値を調整します。',
            labels: ['価格帯', '3,000円', '12,000円'],
          },
          {
            id: 'stepped',
            title: '段階値',
            summary: '段階のある値を tick とラベルで示します。',
            labels: ['密度', '標準', 'ゆったり'],
          },
        ],
      ),
    ],
  },
  {
    id: 'textarea',
    label: 'テキストエリア',
    slug: 'textarea',
    comparePath: '/patterns/textarea-designs',
    summary:
      '複数行の自由入力を扱う form input pattern です。',
    scope: ['comment', 'feedback', 'description field'],
    axes: [
      {
        title: '高さ',
        description: 'fixed、auto grow、max height で入力量への追従を決めます。',
      },
      {
        title: '補助情報',
        description: 'helper text、error、character count の位置を揃えます。',
      },
      {
        title: '制限',
        description: 'maxlength、required、readonly、disabled を視覚と文言で示します。',
      },
    ],
    entries: [
      createEntry(
        'テキストエリア',
        'multiline-textarea',
        '複数行テキストエリア',
        'fixed / auto grow / validation を分ける multiline input。',
        '単一行 input の延長で扱うと、高さ、文字数、エラー表示の設計が不足します。',
        '入力量と用途に合わせて高さ、helper、counter、validation をセットで決めます。',
        'label、説明、エラーメッセージを textarea と関連付けます。',
        ['form', 'input', 'multiline'],
        [
          {
            id: 'fixed',
            title: '固定高さ',
            summary: 'コメントなどの短い複数行入力。',
            labels: ['コメント', '3 行固定', '任意'],
          },
          {
            id: 'auto-grow',
            title: '自動伸長',
            summary: '入力量に応じて高さが伸びる説明欄。',
            labels: ['説明', '入力に合わせて拡張', '最大 8 行'],
          },
          {
            id: 'validation',
            title: 'バリデーション',
            summary: '文字数とエラーを明示する textarea。',
            labels: ['フィードバック', '12 / 200', '必須項目です'],
          },
        ],
      ),
    ],
  },
  {
    id: 'toast-snackbar',
    label: 'トースト・スナックバー',
    slug: 'toast-snackbar',
    comparePath: '/patterns/toast-snackbar-designs',
    summary:
      '操作結果や軽い通知を一時表示する feedback pattern です。',
    scope: ['save result', 'undo action', 'system notification'],
    axes: [
      {
        title: '重要度',
        description: 'toast は軽い結果、alert はページ上に残す重要情報として分けます。',
      },
      {
        title: '操作',
        description: 'undo や detail link を持たせる場合は表示時間を十分に確保します。',
      },
      {
        title: '配置',
        description: 'stack、viewport edge、mobile bottom の重なりを考慮します。',
      },
    ],
    entries: [
      createEntry(
        'トースト・スナックバー',
        'toast-feedback',
        '一時通知フィードバック',
        'success / undo / stacked を分ける transient feedback。',
        '重要なエラーを toast だけで流すと、ユーザーが見逃して復帰できません。',
        '一時通知に留める情報と、ページ内に残す alert を分けます。',
        '自動消去の一時停止、読み上げ領域、close button の有無を検討します。',
        ['feedback', 'notification', 'transient'],
        [
          {
            id: 'success',
            title: '成功トースト',
            summary: '保存完了など軽い成功結果を知らせます。',
            labels: ['保存しました', '今すぐ確認'],
          },
          {
            id: 'undo',
            title: '取り消しスナックバー',
            summary: '取り消し action を短時間だけ提供します。',
            labels: ['アーカイブしました', '元に戻す'],
          },
          {
            id: 'stacked',
            title: '積み上げ通知',
            summary: '複数通知を重ねて扱う表示。',
            labels: ['同期完了', 'コメントが追加されました', '招待を送信しました'],
          },
        ],
      ),
    ],
  },
  {
    id: 'tooltip',
    label: 'ツールチップ',
    slug: 'tooltip',
    comparePath: '/patterns/tooltip-designs',
    summary:
      '短い補足説明を hover / focus 時に表示する microcopy overlay です。',
    scope: ['icon explanation', 'disabled reason', 'short hint'],
    axes: [
      {
        title: '短さ',
        description: 'tooltip は 1 文程度に留め、長文は hover card や helper text に分けます。',
      },
      {
        title: '到達性',
        description: 'hover だけでなく keyboard focus でも表示される必要があります。',
      },
      {
        title: '必須情報',
        description: '操作に必須の説明は tooltip に閉じ込めず、画面上に出します。',
      },
    ],
    entries: [
      createEntry(
        'ツールチップ',
        'short-tooltip',
        '短文ツールチップ',
        'icon label / disabled reason / placement を分ける短文補足。',
        '重要な説明を tooltip に隠すと、タッチ端末やキーボード利用で見落とされます。',
        'アイコンの名前や短い理由だけを補足し、必須情報は常時表示します。',
        'trigger は focus 可能にし、tooltip は短く、escape や blur で閉じます。',
        ['overlay', 'hint', 'accessibility'],
        [
          {
            id: 'icon-label',
            title: 'アイコンラベル',
            summary: 'アイコンボタンの意味を短く補足します。',
            labels: ['保存', '共有', '削除'],
          },
          {
            id: 'disabled-reason',
            title: '無効理由',
            summary: '無効化の理由を短く説明します。',
            labels: ['権限がありません', '入力後に有効になります'],
          },
          {
            id: 'placement',
            title: '配置',
            summary: 'top / right / bottom / left の配置差を確認します。',
            labels: ['上', '右', '下', '左'],
          },
        ],
      ),
    ],
  },
] satisfies readonly TodoPatternCategory[];

export const todoPatternCategoryMap = todoPatternCategories.reduce(
  (categoryMap, category) => ({
    ...categoryMap,
    [category.id]: category,
  }),
  {} as Record<TodoPatternCategoryId, TodoPatternCategory>,
);
