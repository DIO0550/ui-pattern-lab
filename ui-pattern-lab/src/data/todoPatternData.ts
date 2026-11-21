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

export const todoPatternCategories = [
  {
    id: 'breadcrumb',
    label: 'パンくずリスト',
    slug: 'breadcrumb',
    comparePath: '/patterns/breadcrumb-designs',
    summary:
      '現在位置までの階層を示し、上位ページへ素早く戻るための補助ナビゲーションです。',
    scope: ['ドキュメント階層', '商品カテゴリ経路', '設定サブページ'],
    axes: [
      {
        title: '区切り記号',
        description: 'スラッシュ / 山括弧 / ドットなど、階層の深さと視認性に合わせて選びます。',
      },
      {
        title: '現在地',
        description: '末尾の現在地項目はリンクにせず、aria-current="page" で現在位置を伝えます。',
      },
      {
        title: '省略',
        description: '深い階層は中間階層の折りたたみ展開と長文省略を分けて扱います。',
      },
    ],
    entries: [
      {
        id: 'hierarchy-breadcrumb',
        title: '階層パンくず',
        summary:
          'スラッシュ区切り・山括弧区切り・省略メニューを分け、現在位置までの導線を整理する基本パターン。',
        problem:
          'グローバルナビゲーションと混同すると、現在地の補助導線なのか大域移動なのかが曖昧になります。',
        solution:
          '階層ごとのリンク項目、区切り記号、現在地項目の責務を明確に分け、4階層以上になる場合のみ中間省略メニューを使います。',
        accessibilityNote:
          'nav に aria-label="パンくずリスト" を付け、順序付きリスト（ol）と現在地の aria-current="page" を組み合わせます。',
        tags: ['ナビゲーション', '階層構造', '現在地表示'],
        variants: [
          {
            id: 'slash',
            title: 'スラッシュ区切り',
            summary: 'ドキュメントや設定画面で軽やかに階層を見せるスラッシュ区切り。',
            labels: ['ホーム', '/', '設定', '/', '通知'],
            tsx: `<nav aria-label="パンくずリスト" className={styles.breadcrumbNav}>
  <ol className={styles.breadcrumbList}>
    <li className={styles.breadcrumbItem}>
      <a className={styles.breadcrumbLink} href="#home">ホーム</a>
    </li>
    <li aria-hidden="true" className={styles.breadcrumbDivider}>/</li>
    <li className={styles.breadcrumbItem}>
      <a className={styles.breadcrumbLink} href="#settings">設定</a>
    </li>
    <li aria-hidden="true" className={styles.breadcrumbDivider}>/</li>
    <li aria-current="page" className={styles.breadcrumbCurrent}>通知</li>
  </ol>
</nav>`,
            css: `.breadcrumbNav {
  padding: 0.65rem 0.9rem;
  border: 1px solid #d7dee8;
  border-radius: 0.75rem;
  background: #ffffff;
}

.breadcrumbList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumbLink {
  color: #334155;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}

.breadcrumbLink:hover {
  color: #0284c7;
  text-decoration: underline;
}

.breadcrumbDivider {
  color: #94a3b8;
  font-size: 0.85rem;
}

.breadcrumbCurrent {
  color: #0f172a;
  font-size: 0.875rem;
  font-weight: 700;
}`,
          },
          {
            id: 'chevron',
            title: '山括弧区切り',
            summary: 'EC やプロダクトのカテゴリ階層を視覚的に強く示すシェブロン区切り。',
            labels: ['商品', '>', '家具', '>', 'チェア'],
            tsx: `<nav aria-label="カテゴリ階層" className={styles.breadcrumbNav}>
  <ol className={styles.breadcrumbList}>
    <li>
      <a className={styles.pillLink} href="#products">商品</a>
    </li>
    <li aria-hidden="true" className={styles.chevron}>›</li>
    <li>
      <a className={styles.pillLink} href="#furniture">家具・インテリア</a>
    </li>
    <li aria-hidden="true" className={styles.chevron}>›</li>
    <li aria-current="page" className={styles.pillCurrent}>オフィスチェア</li>
  </ol>
</nav>`,
            css: `.breadcrumbList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pillLink {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
}

.chevron {
  color: #64748b;
  font-weight: 700;
}

.pillCurrent {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.82rem;
  font-weight: 700;
}`,
          },
          {
            id: 'collapsed',
            title: '省略メニュー',
            summary: '深い階層で中間項目を折りたたみ、必要に応じて展開できる表示。',
            labels: ['ホーム', '...', '権限', 'メンバー招待'],
            tsx: `const [expanded, setExpanded] = useState(false);

<nav aria-label="深い階層のパンくずリスト" className={styles.breadcrumbNav}>
  <ol className={styles.breadcrumbList}>
    <li><a className={styles.breadcrumbLink} href="#home">ホーム</a></li>
    <li aria-hidden="true" className={styles.breadcrumbDivider}>/</li>
    {expanded ? (
      <>
        <li><a className={styles.breadcrumbLink} href="#org">組織管理</a></li>
        <li aria-hidden="true" className={styles.breadcrumbDivider}>/</li>
        <li><a className={styles.breadcrumbLink} href="#security">セキュリティ</a></li>
        <li aria-hidden="true" className={styles.breadcrumbDivider}>/</li>
      </>
    ) : (
      <>
        <li>
          <button
            aria-expanded={expanded}
            aria-label="省略された中間階層を展開"
            className={styles.ellipsisButton}
            onClick={() => setExpanded(true)}
            type="button">
            •••
          </button>
        </li>
        <li aria-hidden="true" className={styles.breadcrumbDivider}>/</li>
      </>
    )}
    <li><a className={styles.breadcrumbLink} href="#roles">権限ロール</a></li>
    <li aria-hidden="true" className={styles.breadcrumbDivider}>/</li>
    <li aria-current="page" className={styles.breadcrumbCurrent}>メンバー招待</li>
  </ol>
</nav>`,
            css: `.ellipsisButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 1.5rem;
  padding: 0 0.45rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.4rem;
  background: #f8fafc;
  color: #334155;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.ellipsisButton:hover {
  background: #e2e8f0;
}

.ellipsisButton:focus-visible {
  outline: 2px solid #0284c7;
  outline-offset: 2px;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'card',
    label: 'カード',
    slug: 'card',
    comparePath: '/patterns/card-designs',
    summary:
      '関連する見出し・メディア・要約・アクションを 1 つの視覚的サーフェスにまとめるデータ表示パターンです。',
    scope: ['記事・メディアプレビュー', '商品・プラン要約', 'ダッシュボードウィジェット'],
    axes: [
      {
        title: '構造',
        description: 'ヘッダー / メディア / 本文 / フッター / アクションの優先順位を先に決めます。',
      },
      {
        title: 'レイアウト',
        description: '縦型 / 横型 / オーバーレイで情報密度とビジュアル比率のバランスを分けます。',
      },
      {
        title: '操作',
        description: 'カード全体クリックと内部ボタンを併用する場合はフォーカス競合を避けます。',
      },
    ],
    entries: [
      {
        id: 'content-card',
        title: 'コンテンツカード',
        summary:
          '縦型・横型・オーバーレイ・操作可能カードを分け、情報のまとまりとアクション境界を整理するパターン。',
        problem:
          '単なる枠線付きボックスとして乱用すると、何が主情報でどこが押せるのかが読み取りづらくなります。',
        solution:
          'メディア・見出し・メタ情報・アクションの階層を固定し、閲覧用カードと選択可能カードの見た目・挙動を分離します。',
        accessibilityNote:
          '見出し階層（h3 等）を保ち、選択やクリック可能なカードではフォーカスリングと選択状態（aria-pressed 等）を明示します。',
        tags: ['データ表示', 'レイアウト', 'サーフェス'],
        variants: [
          {
            id: 'vertical',
            title: '縦型',
            summary: 'ビジュアル、見出し、本文、アクションを上から順に読ませる標準カード。',
            labels: ['ヘッダー', 'プレビュー画像', '本文', '詳細を見る'],
            tsx: `<article className={styles.verticalCard}>
  <div aria-hidden="true" className={styles.cardMedia}>
    <span className={styles.mediaBadge}>UI ガイド</span>
  </div>
  <div className={styles.cardBody}>
    <span className={styles.cardEyebrow}>デザインシステム</span>
    <h3 className={styles.cardTitle}>カスタムトークン設計の基礎</h3>
    <p className={styles.cardText}>
      余白・色・タイポグラフィの役割を分離し、ダークモードにも破綻しない UI 面を構築します。
    </p>
  </div>
  <footer className={styles.cardFooter}>
    <span className={styles.cardMeta}>読了目安 6分</span>
    <button className={styles.cardAction} type="button">詳細を見る</button>
  </footer>
</article>`,
            css: `.verticalCard {
  display: grid;
  overflow: hidden;
  max-width: 340px;
  border: 1px solid #d7dee8;
  border-radius: 0.9rem;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.cardMedia {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  height: 120px;
  padding: 0.75rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
}

.mediaBadge {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.65);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
}

.cardBody {
  display: grid;
  gap: 0.35rem;
  padding: 1rem 1.1rem 0.75rem;
}

.cardFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.1rem 1rem;
  border-top: 1px solid #f1f5f9;
}`,
          },
          {
            id: 'horizontal',
            title: '横型',
            summary: 'コンパクトなサムネイルと要約を横並びにし、縦高を抑える一覧向けカード。',
            labels: ['サムネイル', '製品名', '在庫あり', '比較する'],
            tsx: `<article className={styles.horizontalCard}>
  <div aria-hidden="true" className={styles.thumbnail}>
    <span>CHAIR</span>
  </div>
  <div className={styles.horizontalContent}>
    <div className={styles.horizontalHeader}>
      <h3 className={styles.cardTitle}>エルゴノミクスチェア Pro</h3>
      <span className={styles.stockBadge}>在庫あり</span>
    </div>
    <p className={styles.cardText}>メッシュ背面・4D アームレスト・ランバーサポート搭載</p>
    <div className={styles.horizontalFooter}>
      <strong className={styles.priceText}>¥64,800</strong>
      <button className={styles.secondaryButton} type="button">比較に追加</button>
    </div>
  </div>
</article>`,
            css: `.horizontalCard {
  display: grid;
  grid-template-columns: 108px minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  padding: 0.9rem;
  border: 1px solid #d7dee8;
  border-radius: 0.85rem;
  background: #ffffff;
}

.thumbnail {
  display: grid;
  place-items: center;
  height: 100%;
  min-height: 92px;
  border-radius: 0.65rem;
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  color: #0369a1;
  font-size: 0.78rem;
  font-weight: 800;
}

.horizontalContent {
  display: grid;
  gap: 0.4rem;
}

.horizontalHeader,
.horizontalFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}`,
          },
          {
            id: 'overlay',
            title: 'オーバーレイ',
            summary: 'ビジュアル面の上にコントラストを確保したグラデーションと主見出しを重ねるカード。',
            labels: ['新着', '特集記事', '読む'],
            tsx: `<article className={styles.overlayCard}>
  <div className={styles.overlayBackdrop}>
    <span className={styles.overlayBadge}>新着特集</span>
    <div className={styles.overlayContent}>
      <h3 className={styles.overlayTitle}>2026年 アクセシブル UI 設計トレンド</h3>
      <p className={styles.overlayMeta}>キーボード操作とコントラスト設計の実践例</p>
      <button className={styles.overlayButton} type="button">特集を読む →</button>
    </div>
  </div>
</article>`,
            css: `.overlayCard {
  position: relative;
  overflow: hidden;
  border-radius: 0.95rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0284c7 100%);
  color: #ffffff;
}

.overlayBackdrop {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 190px;
  padding: 1.15rem;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.86) 100%);
}

.overlayTitle {
  margin: 0;
  color: #ffffff;
  font-size: 1.05rem;
}

.overlayButton {
  justify-self: start;
  margin-top: 0.5rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-weight: 700;
}`,
          },
          {
            id: 'interactive',
            title: '操作可能',
            summary: 'ホバー・フォーカス・選択状態の輪郭差を持ち、カード全体で選択を切り替えられるカード。',
            labels: ['選択中', 'チームプラン', '月額見積もり'],
            tsx: `const [selected, setSelected] = useState(true);

<button
  aria-pressed={selected}
  className={clsx(styles.interactiveCard, selected && styles.interactiveCardSelected)}
  onClick={() => setSelected((prev) => !prev)}
  type="button">
  <div className={styles.interactiveHeader}>
    <span className={styles.interactiveTitle}>チームプラン</span>
    <span className={styles.interactiveBadge}>{selected ? '選択中' : '未選択'}</span>
  </div>
  <p className={styles.interactiveDesc}>
    最大 25 メンバー・監査ログ・カスタム権限ロールを含む標準構成
  </p>
  <div className={styles.interactivePrice}>月額 ¥12,000 / ワークスペース</div>
</button>`,
            css: `.interactiveCard {
  display: grid;
  gap: 0.5rem;
  width: 100%;
  padding: 1.05rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.85rem;
  background: #ffffff;
  text-align: left;
  cursor: pointer;
  transition: border-color 140ms ease, box-shadow 140ms ease;
}

.interactiveCardSelected {
  border-color: #0284c7;
  background: #f0f9ff;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.16);
}

.interactiveCard:focus-visible {
  outline: 3px solid #0284c7;
  outline-offset: 2px;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'chip-tag',
    label: 'チップ・タグ',
    slug: 'chip-tag',
    comparePath: '/patterns/chip-tag-designs',
    summary:
      '分類ラベル、絞り込み条件、選択済みトークンをコンパクトに扱うデータ表示・操作パターンです。',
    scope: ['読み取り専用タグ', 'トグル可能なフィルターチップ', '削除可能な選択トークン'],
    axes: [
      {
        title: '意味',
        description: 'タグは静的な属性・分類、チップは選択や削除を伴う操作トークンとして使い分けます。',
      },
      {
        title: '操作',
        description: '読み取り専用 / 選択トグル / 削除ボタン付きで視覚的なアフォーダンスを明確に分けます。',
      },
      {
        title: '密度',
        description: '複数並ぶ際の折り返し gap と、削除ボタンの最小ヒット領域（24px以上）を確保します。',
      },
    ],
    entries: [
      {
        id: 'chip-tag-token',
        title: 'チップ・タグトークン',
        summary:
          '読み取り専用タグ・フィルターチップ・削除可能チップを分離し、バッジやボタンとの責務境界を明確にするパターン。',
        problem:
          '押せるチップと単なる分類タグが同じ見た目だと、ユーザーがクリック可否を判断できません。',
        solution:
          '静的な分類は span タグ、ON/OFF 絞り込みは aria-pressed 付き button、条件解除は個別 aria-label 付き削除ボタンで構成します。',
        accessibilityNote:
          '削除ボタンには「東京の条件を削除」のように対象名を含めた aria-label を付与します。',
        tags: ['トークン', 'フィルター', '分類表示'],
        variants: [
          {
            id: 'readonly',
            title: '読み取り専用タグ',
            summary: '記事カテゴリや技術スタックなどの属性を非操作ラベルとして表示します。',
            labels: ['デザイン', 'React', 'アクセシビリティ'],
            tsx: `<ul aria-label="記事のカテゴリタグ" className={styles.tagList}>
  <li className={styles.readonlyTag}>
    <span aria-hidden="true" className={styles.tagDot} />
    デザインシステム
  </li>
  <li className={styles.readonlyTag}>
    <span aria-hidden="true" className={styles.tagDot} />
    React / TypeScript
  </li>
  <li className={styles.readonlyTag}>
    <span aria-hidden="true" className={styles.tagDot} />
    アクセシビリティ
  </li>
</ul>`,
            css: `.tagList {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.readonlyTag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.45rem;
  background: #f8fafc;
  color: #334155;
  font-size: 0.8rem;
  font-weight: 600;
}

.tagDot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 999px;
  background: #64748b;
}`,
          },
          {
            id: 'filter',
            title: 'フィルターチップ',
            summary: 'クリックで選択状態（active / inactive）が切り替わる絞り込み用チップ。',
            labels: ['在庫あり', '送料無料', 'セール対象'],
            tsx: `const [activeFilters, setActiveFilters] = useState<string[]>(['在庫あり', '送料無料']);

<div aria-label="絞り込み条件" className={styles.chipGroup} role="group">
  {['在庫あり', '送料無料', '即日発送', 'セール対象'].map((label) => {
    const isSelected = activeFilters.includes(label);
    return (
      <button
        aria-pressed={isSelected}
        className={clsx(styles.filterChip, isSelected && styles.filterChipActive)}
        key={label}
        onClick={() =>
          setActiveFilters((prev) =>
            isSelected ? prev.filter((item) => item !== label) : [...prev, label],
          )
        }
        type="button">
        <span aria-hidden="true">{isSelected ? '✓' : '+'}</span>
        <span>{label}</span>
      </button>
    );
  })}
</div>`,
            css: `.chipGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filterChip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background: #ffffff;
  color: #334155;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}

.filterChipActive {
  border-color: #0284c7;
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 700;
}`,
          },
          {
            id: 'removable',
            title: '削除可能チップ',
            summary: '適用中の検索条件やタグを個別の削除ボタンで解除できるトークン。',
            labels: ['勤務地: 東京', 'リモート可', '正社員'],
            tsx: `const [tokens, setTokens] = useState(['勤務地: 東京', 'リモート可', '正社員']);

<div className={styles.tokenBar}>
  <div className={styles.chipGroup}>
    {tokens.map((token) => (
      <span className={styles.removableChip} key={token}>
        <span>{token}</span>
        <button
          aria-label={\`\${token} を削除\`}
          className={styles.removeButton}
          onClick={() => setTokens((prev) => prev.filter((item) => item !== token))}
          type="button">
          ×
        </button>
      </span>
    ))}
  </div>
</div>`,
            css: `.removableChip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.35rem 0.25rem 0.7rem;
  border: 1px solid #bae6fd;
  border-radius: 999px;
  background: #f0f9ff;
  color: #0c4a6e;
  font-size: 0.82rem;
  font-weight: 600;
}

.removeButton {
  display: inline-grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border: 0;
  border-radius: 999px;
  background: rgba(2, 132, 199, 0.14);
  color: #0369a1;
  font-weight: 700;
  cursor: pointer;
}

.removeButton:hover {
  background: rgba(2, 132, 199, 0.28);
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'dialog-modal',
    label: 'ダイアログ・モーダル',
    slug: 'dialog-modal',
    comparePath: '/patterns/dialog-modal-designs',
    summary:
      '現在の作業文脈を一時的に遮断し、重要な意思決定やまとまった入力を完了させるオーバーレイパターンです。',
    scope: ['保存・公開の確認ダイアログ', 'インライン作成フォームモーダル', '危険操作の最終ガード'],
    axes: [
      {
        title: '割り込み度',
        description: '背後操作を止めてでもユーザー判断が必要か、インライン展開で足りるかを切り分けます。',
      },
      {
        title: '幅と内容',
        description: '短い確認・フォーム入力・破壊的操作でヘッダー、本文、フッターボタン配置を変えます。',
      },
      {
        title: '閉じ方',
        description: 'Escape キー、キャンセルボタン、危険操作時の誤操作防止ガードを明確にします。',
      },
    ],
    entries: [
      {
        id: 'modal-dialog',
        title: 'モーダルダイアログ',
        summary:
          '確認ダイアログ・フォームモーダル・危険操作ガードを分け、タイトル・本文・主操作の責務を固定するパターン。',
        problem:
          'あらゆる通知や軽い編集までモーダルにすると、作業の中断が頻発し閉じ方の期待も揃いません。',
        solution:
          '目的別にモーダルの構造（ヘッダー・説明・フッターの主/副アクション）を設計し、破壊的操作では影響範囲を明示します。',
        accessibilityNote:
          'role="dialog"、aria-modal="true"、aria-labelledby によるタイトル関連付け、フォーカストラップと閉じた後のトリガー復帰を扱います。',
        tags: ['オーバーレイ', '意思決定', 'フォーカス管理'],
        variants: [
          {
            id: 'confirmation',
            title: '確認ダイアログ',
            summary: '変更内容の保存や公開前に、短い説明とキャンセル / 確定ボタンを提示する基本形。',
            labels: ['変更を保存しますか', 'キャンセル', '保存する'],
            tsx: `<div className={styles.modalBackdrop}>
  <section
    aria-describedby="confirm-dialog-desc"
    aria-labelledby="confirm-dialog-title"
    aria-modal="true"
    className={styles.dialogSurface}
    role="dialog">
    <header className={styles.dialogHeader}>
      <span className={styles.dialogBadge}>確認</span>
      <h3 className={styles.dialogTitle} id="confirm-dialog-title">
        公開設定の変更を保存しますか？
      </h3>
    </header>
    <p className={styles.dialogBody} id="confirm-dialog-desc">
      変更を保存すると、ワークスペース内の全メンバーに新しい通知ルールが即時適用されます。
    </p>
    <footer className={styles.dialogFooter}>
      <button className={styles.ghostButton} type="button">キャンセル</button>
      <button className={styles.primaryButton} type="button">変更を保存</button>
    </footer>
  </section>
</div>`,
            css: `.modalBackdrop {
  padding: 1.1rem;
  border-radius: 0.9rem;
  background: rgba(15, 23, 42, 0.45);
}

.dialogSurface {
  display: grid;
  gap: 0.85rem;
  max-width: 420px;
  margin: 0 auto;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.85rem;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.22);
}

.dialogFooter {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
}`,
          },
          {
            id: 'form',
            title: 'フォームモーダル',
            summary: '画面遷移せずに新規メンバー招待などの短いフォーム入力を完結させる構成。',
            labels: ['メンバーを招待', 'メールアドレス', '招待を送信'],
            tsx: `<div className={styles.modalBackdrop}>
  <section
    aria-labelledby="invite-dialog-title"
    aria-modal="true"
    className={styles.dialogSurface}
    role="dialog">
    <header className={styles.dialogHeaderRow}>
      <h3 className={styles.dialogTitle} id="invite-dialog-title">メンバーを招待</h3>
      <button aria-label="閉じる" className={styles.iconCloseButton} type="button">×</button>
    </header>
    <div className={styles.formStack}>
      <label className={styles.formField}>
        <span>メールアドレス</span>
        <input defaultValue="aoi.sato@example.com" type="email" />
      </label>
      <label className={styles.formField}>
        <span>付与するロール</span>
        <select defaultValue="editor">
          <option value="editor">編集者（プロジェクト編集可）</option>
          <option value="viewer">閲覧者（読み取り専用）</option>
        </select>
      </label>
    </div>
    <footer className={styles.dialogFooter}>
      <button className={styles.ghostButton} type="button">キャンセル</button>
      <button className={styles.primaryButton} type="button">招待メールを送信</button>
    </footer>
  </section>
</div>`,
            css: `.dialogHeaderRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.formStack {
  display: grid;
  gap: 0.75rem;
}

.formField {
  display: grid;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
}

.formField input,
.formField select {
  padding: 0.5rem 0.65rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font: inherit;
}`,
          },
          {
            id: 'destructive',
            title: '危険操作ガード',
            summary: '取り消しできない削除操作で、影響範囲の警告と危険色の確定ボタンを分離する構成。',
            labels: ['プロジェクトを削除', 'この操作は元に戻せません', '削除する'],
            tsx: `<div className={styles.modalBackdrop}>
  <section
    aria-describedby="delete-dialog-desc"
    aria-labelledby="delete-dialog-title"
    aria-modal="true"
    className={clsx(styles.dialogSurface, styles.destructiveDialog)}
    role="dialog">
    <header className={styles.dialogHeader}>
      <span className={styles.dangerBadge}>取り消し不可</span>
      <h3 className={styles.dialogTitle} id="delete-dialog-title">
        プロジェクト「UI Pattern Lab」を削除しますか？
      </h3>
    </header>
    <p className={styles.dialogBody} id="delete-dialog-desc">
      関連する 24 件のドキュメントと共有リンクがすべて失われます。この操作は元に戻せません。
    </p>
    <footer className={styles.dialogFooter}>
      <button className={styles.ghostButton} type="button">キャンセル</button>
      <button className={styles.dangerButton} type="button">完全に削除する</button>
    </footer>
  </section>
</div>`,
            css: `.destructiveDialog {
  border-color: #fecaca;
}

.dangerBadge {
  display: inline-flex;
  width: fit-content;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 0.72rem;
  font-weight: 700;
}

.dangerButton {
  padding: 0.45rem 0.9rem;
  border: 0;
  border-radius: 0.5rem;
  background: #dc2626;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'drawer-sheet',
    label: 'ドロワー・シート',
    slug: 'drawer-sheet',
    comparePath: '/patterns/drawer-sheet-designs',
    summary:
      '画面端からスライドインし、一覧の文脈を保ったまま詳細確認・絞り込み・モバイル操作を提供するオーバーレイです。',
    scope: ['右サイド詳細・編集ドロワー', 'モバイル向けボトムシート', '一覧絞り込みドロワー'],
    axes: [
      {
        title: '出現方向',
        description: 'デスクトップの詳細参照は右サイドドロワー、モバイルの片手操作はボトムシートを選びます。',
      },
      {
        title: '背後操作',
        description: '背景を遮断するモーダルシートか、一覧を見比べられる補助パネルかで設計を分けます。',
      },
      {
        title: '内容量',
        description: '長いフォームやフィルター群ではヘッダーとフッターを固定し、中間領域をスクロールさせます。',
      },
    ],
    entries: [
      {
        id: 'drawer-sheet-panel',
        title: 'ドロワー・シートパネル',
        summary:
          'サイドドロワー・ボトムシート・フィルタードロワーを分け、出現方向と固定フッターの責務を整理するパターン。',
        problem:
          '中央モーダルと同じ感覚でドロワーを使うと、なぜ画面端から出るのか・元画面とどう連携するのかが曖昧になります。',
        solution:
          '一覧との文脈維持には右サイドドロワー、モバイルの短いアクションにはボトムシート、複数条件の適用にはフッター固定のフィルタードロワーを使います。',
        accessibilityNote:
          '開閉トリガーの aria-expanded、シート内の見出し関連付け、Escape キーでのクローズとフォーカス復帰を実装します。',
        tags: ['オーバーレイ', 'パネル', 'レスポンシブ'],
        variants: [
          {
            id: 'side',
            title: 'サイドドロワー',
            summary: '一覧の選択行の文脈を残したまま、右端から詳細確認・ステータス編集面を展開するデスクトップ向け構成。',
            labels: ['詳細パネル', 'ステータス', '保存'],
            tsx: `<div className={styles.viewportFrame}>
  <div aria-hidden="true" className={styles.backgroundStub}>
    <span>一覧画面（背後のコンテキスト）</span>
  </div>
  <aside aria-label="案件詳細ドロワー" className={styles.sideDrawer}>
    <header className={styles.drawerHeader}>
      <div>
        <span className={styles.drawerEyebrow}>ISSUE-104</span>
        <h3 className={styles.drawerTitle}>決済フローのアクセシビリティ監査</h3>
      </div>
      <button aria-label="ドロワーを閉じる" className={styles.closeBtn} type="button">×</button>
    </header>
    <div className={styles.drawerBody}>
      <div className={styles.metaRow}><span>ステータス</span><strong>レビュー中</strong></div>
      <div className={styles.metaRow}><span>担当者</span><strong>佐藤 葵</strong></div>
    </div>
    <footer className={styles.drawerFooter}>
      <button className={styles.primaryBtn} type="button">変更を保存</button>
    </footer>
  </aside>
</div>`,
            css: `.viewportFrame {
  display: grid;
  grid-template-columns: 1fr minmax(240px, 68%);
  overflow: hidden;
  border: 1px solid #cbd5e1;
  border-radius: 0.85rem;
  background: #e2e8f0;
}

.sideDrawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  border-left: 1px solid #cbd5e1;
  background: #ffffff;
  box-shadow: -8px 0 24px rgba(15, 23, 42, 0.12);
}`,
          },
          {
            id: 'bottom',
            title: 'ボトムシート',
            summary: 'モバイル画面の下部から立ち上がり、ハンドルバーと片手操作しやすいアクション群を並べるシート。',
            labels: ['共有', 'リンクをコピー', '閉じる'],
            tsx: `<div className={styles.mobileSheetFrame}>
  <section aria-label="共有オプション" className={styles.bottomSheet}>
    <div aria-hidden="true" className={styles.sheetHandle} />
    <header className={styles.sheetHeader}>
      <h3 className={styles.drawerTitle}>ドキュメントを共有</h3>
      <p className={styles.sheetSub}>リンクを知っているメンバーが閲覧できます</p>
    </header>
    <div className={styles.sheetActionList}>
      <button className={styles.sheetActionBtn} type="button">共有リンクをコピー</button>
      <button className={styles.sheetActionBtn} type="button">PDF として書き出す</button>
      <button className={styles.sheetCancelBtn} type="button">閉じる</button>
    </div>
  </section>
</div>`,
            css: `.mobileSheetFrame {
  padding-top: 2rem;
  border-radius: 0.9rem;
  background: rgba(15, 23, 42, 0.42);
}

.bottomSheet {
  display: grid;
  gap: 0.75rem;
  padding: 0.75rem 1.1rem 1.1rem;
  border-radius: 1rem 1rem 0.8rem 0.8rem;
  background: #ffffff;
  box-shadow: 0 -10px 25px rgba(15, 23, 42, 0.16);
}

.sheetHandle {
  width: 2.5rem;
  height: 0.28rem;
  margin: 0 auto;
  border-radius: 999px;
  background: #cbd5e1;
}`,
          },
          {
            id: 'filter',
            title: 'フィルタードロワー',
            summary: '複数の絞り込み条件をまとめて編集し、下部固定フッターでリセットや件数付き適用を行うドロワー。',
            labels: ['絞り込み', '価格帯', '適用する'],
            tsx: `<aside aria-label="絞り込み条件ドロワー" className={styles.filterDrawer}>
  <header className={styles.drawerHeader}>
    <h3 className={styles.drawerTitle}>絞り込み条件</h3>
    <button className={styles.resetLink} type="button">すべてクリア</button>
  </header>
  <div className={styles.filterSectionList}>
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>価格帯</span>
      <div className={styles.chipRow}>
        <span className={styles.activeChip}>¥5,000〜¥15,000</span>
        <span className={styles.inactiveChip}>¥15,000以上</span>
      </div>
    </div>
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>在庫ステータス</span>
      <label className={styles.checkRow}>
        <input defaultChecked type="checkbox" /> 在庫ありのみ表示
      </label>
    </div>
  </div>
  <footer className={styles.filterFooter}>
    <button className={styles.ghostButton} type="button">キャンセル</button>
    <button className={styles.primaryBtn} type="button">42 件を表示</button>
  </footer>
</aside>`,
            css: `.filterDrawer {
  display: grid;
  gap: 0.85rem;
  padding: 1.05rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.85rem;
  background: #ffffff;
}

.filterSectionList {
  display: grid;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-block: 1px solid #f1f5f9;
}

.filterFooter {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'dropdown-menu',
    label: 'ドロップダウンメニュー',
    slug: 'dropdown-menu',
    comparePath: '/patterns/dropdown-menu-designs',
    summary:
      'トリガーボタンからコマンドやアクションの一覧を一時展開するオーバーレイメニューです。',
    scope: ['行・カードの操作メニュー', 'グループ分けされた設定メニュー', '危険操作を含むコンテキストメニュー'],
    axes: [
      {
        title: '選択か実行か',
        description: 'フォーム値を選ぶセレクトボックスと混同せず、即座にコマンドを実行するメニューとして設計します。',
      },
      {
        title: '項目構成',
        description: 'ショートカット表示、セクション見出し、区切り線、危険操作の視覚的分離を整えます。',
      },
      {
        title: '配置',
        description: 'トリガー直下の整列と、画面端での折り返し余白を確保します。',
      },
    ],
    entries: [
      {
        id: 'dropdown-action-menu',
        title: 'アクションメニュー',
        summary:
          '基本アクションリスト・グループメニュー・危険操作分離メニューを分け、コマンド実行の階層を整理するパターン。',
        problem:
          '値選択用のカスタムセレクトとコマンド実行メニューが同じ見た目だと、押した瞬間に何が起きるか予測できません。',
        solution:
          'トリガーの aria-expanded とメニューリストを近接配置し、通常操作・設定グループ・削除などの危険操作を区切り線と配色で分離します。',
        accessibilityNote:
          'トリガーに aria-haspopup="menu" と aria-expanded を付与し、上下矢印キーでの移動と Escape クローズに対応させます。',
        tags: ['メニュー', 'コマンド実行', 'オーバーレイ'],
        variants: [
          {
            id: 'actions',
            title: 'アクションリスト',
            summary: '開く・名前変更・複製など、対象アイテムに対する基本コマンドをショートカット付きで並べる構成。',
            labels: ['開く', '名前を変更', '複製'],
            tsx: `<div className={styles.menuContainer}>
  <button aria-expanded="true" aria-haspopup="menu" className={styles.menuTrigger} type="button">
    <span>ファイル操作</span>
    <span aria-hidden="true">▾</span>
  </button>
  <ul aria-label="ファイル操作メニュー" className={styles.menuPopup} role="menu">
    <li role="none">
      <button className={styles.menuItem} role="menuitem" type="button">
        <span>開く</span>
        <kbd className={styles.shortcut}>⌘O</kbd>
      </button>
    </li>
    <li role="none">
      <button className={styles.menuItem} role="menuitem" type="button">
        <span>名前を変更...</span>
        <kbd className={styles.shortcut}>⏎</kbd>
      </button>
    </li>
    <li role="none">
      <button className={styles.menuItem} role="menuitem" type="button">
        <span>複製を作成</span>
        <kbd className={styles.shortcut}>⌘D</kbd>
      </button>
    </li>
  </ul>
</div>`,
            css: `.menuContainer {
  display: grid;
  gap: 0.4rem;
  max-width: 260px;
}

.menuTrigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.4rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.55rem;
  background: #ffffff;
  font-weight: 700;
}

.menuPopup {
  display: grid;
  gap: 0.2rem;
  margin: 0;
  padding: 0.35rem;
  border: 1px solid #d7dee8;
  border-radius: 0.7rem;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  list-style: none;
}

.menuItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.45rem 0.65rem;
  border: 0;
  border-radius: 0.45rem;
  background: transparent;
  font-size: 0.85rem;
  cursor: pointer;
}

.menuItem:hover {
  background: #f1f5f9;
}`,
          },
          {
            id: 'grouped',
            title: 'グループメニュー',
            summary: '関連する操作をセクションラベルと区切り線（role="separator"）で構造化したメニュー。',
            labels: ['表示', '並び替え', '---', '設定'],
            tsx: `<div className={styles.menuContainer}>
  <div aria-label="表示設定メニュー" className={styles.menuPopup} role="menu">
    <div className={styles.menuGroupLabel}>表示オプション</div>
    <button className={styles.menuItem} role="menuitem" type="button">
      <span>コンパクト表示</span>
      <span className={styles.checkMark}>✓</span>
    </button>
    <button className={styles.menuItem} role="menuitem" type="button">
      <span>更新日順で並び替え</span>
    </button>
    <div className={styles.menuSeparator} role="separator" />
    <div className={styles.menuGroupLabel}>ワークスペース</div>
    <button className={styles.menuItem} role="menuitem" type="button">
      <span>表示列をカスタマイズ...</span>
    </button>
  </div>
</div>`,
            css: `.menuGroupLabel {
  padding: 0.3rem 0.65rem 0.15rem;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 800;
}

.menuSeparator {
  height: 1px;
  margin: 0.25rem 0.35rem;
  background: #e2e8f0;
}

.checkMark {
  color: #0284c7;
  font-weight: 800;
}`,
          },
          {
            id: 'destructive',
            title: '危険操作項目',
            summary: 'アーカイブなどの通常操作と、取り消しづらい削除アクションを区切り線と危険色で明確に分離するメニュー。',
            labels: ['アーカイブ', '---', '削除'],
            tsx: `<div className={styles.menuContainer}>
  <div aria-label="プロジェクト操作メニュー" className={styles.menuPopup} role="menu">
    <button className={styles.menuItem} role="menuitem" type="button">
      <span>リンクをコピー</span>
    </button>
    <button className={styles.menuItem} role="menuitem" type="button">
      <span>アーカイブへ移動</span>
    </button>
    <div className={styles.menuSeparator} role="separator" />
    <button className={clsx(styles.menuItem, styles.menuItemDanger)} role="menuitem" type="button">
      <span>プロジェクトを削除...</span>
      <span aria-hidden="true">⌫</span>
    </button>
  </div>
</div>`,
            css: `.menuItemDanger {
  color: #dc2626;
  font-weight: 700;
}

.menuItemDanger:hover,
.menuItemDanger:focus-visible {
  background: #fef2f2;
  color: #b91c1c;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'hover-card',
    label: 'ホバーカード',
    slug: 'hover-card',
    comparePath: '/patterns/hover-card-designs',
    summary:
      'リンクやトリガーへのホバー・フォーカス時に、遷移先の要約やプロフィールをリッチにプレビューするオーバーレイです。',
    scope: ['ユーザープロフィールプレビュー', '専門用語・略語解説カード', 'ドキュメント・案件サマリー'],
    axes: [
      {
        title: '情報量',
        description: '1行のツールチップより構造化された情報を持ち、ポップオーバーほど複雑なフォーム操作は持ち込みません。',
      },
      {
        title: '表示条件',
        description: 'マウスホバーだけでなく、キーボードフォーカスでも同じ補足情報を確認できるようにします。',
      },
      {
        title: '操作',
        description: '必須の業務アクションをホバーカード内に閉じ込めず、あくまで遷移前のプレビューとして扱います。',
      },
    ],
    entries: [
      {
        id: 'hover-preview-card',
        title: 'ホバープレビューカード',
        summary:
          'プロフィール・用語解説・対象サマリーの3種類のホバーカードを分け、トリガーとプレビュー面の関係を整理するパターン。',
        problem:
          'ツールチップに長文や複数項目を詰め込むと読みづらく、ポップオーバーにすると毎回クリックが必要になります。',
        solution:
          'トリガー要素の直下に、アバター・見出し・メタ情報を構造化した軽量プレビューカードを配置します。',
        accessibilityNote:
          'ホバー操作だけに依存せず、トリガーへのキーボードフォーカス時にもプレビュー内容へ到達できるように設計します。',
        tags: ['プレビュー', 'オーバーレイ', '補足情報'],
        variants: [
          {
            id: 'profile',
            title: 'プロフィールプレビュー',
            summary: 'メンションや担当者名に重ねた際、役職・所属・最近の活動件数をまとめて表示するカード。',
            labels: ['佐藤 葵', 'Product Designer', '最近の投稿 12件'],
            tsx: `<div className={styles.hoverCardDemo}>
  <span className={styles.triggerText}>
    担当: <a className={styles.mentionTrigger} href="#user-aoi">@aoi.sato</a>
  </span>
  <div className={styles.hoverCardSurface} role="region" aria-label="佐藤 葵のプロフィール">
    <div className={styles.profileHeader}>
      <span aria-hidden="true" className={styles.avatarCircle}>AS</span>
      <div>
        <strong className={styles.profileName}>佐藤 葵</strong>
        <span className={styles.profileRole}>リードプロダクトデザイナー</span>
      </div>
    </div>
    <p className={styles.profileBio}>
      デザインシステム・アクセシビリティ基盤を担当。東京オフィス在籍。
    </p>
    <div className={styles.profileStats}>
      <span>公開パターン <strong>12件</strong></span>
      <span>レビュー完了 <strong>48件</strong></span>
    </div>
  </div>
</div>`,
            css: `.hoverCardDemo {
  display: grid;
  gap: 0.5rem;
}

.mentionTrigger {
  padding: 0.15rem 0.45rem;
  border-radius: 0.35rem;
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 700;
  text-decoration: none;
}

.hoverCardSurface {
  display: grid;
  gap: 0.65rem;
  max-width: 320px;
  padding: 0.95rem;
  border: 1px solid #d7dee8;
  border-radius: 0.8rem;
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
}`,
          },
          {
            id: 'term',
            title: '用語プレビュー',
            summary: '本文中の専門用語や略語（ARIA など）に対し、定義と具体例を構造化して補足するカード。',
            labels: ['ARIA', 'アクセシビリティ API への意味づけ'],
            tsx: `<div className={styles.hoverCardDemo}>
  <p className={styles.contextSentence}>
    カスタム UI では <button className={styles.termTrigger} type="button">WAI-ARIA</button> 属性で状態を補います。
  </p>
  <div className={styles.hoverCardSurface} role="note" aria-label="WAI-ARIA の用語解説">
    <div className={styles.termHeader}>
      <span className={styles.termBadge}>用語解説</span>
      <strong>WAI-ARIA</strong>
    </div>
    <p className={styles.profileBio}>
      Accessible Rich Internet Applications の略。HTML だけでは表現しきれないカスタム UI の役割（role）や状態（aria-expanded 等）を支援技術へ伝えます。
    </p>
  </div>
</div>`,
            css: `.termTrigger {
  padding: 0 0.25rem;
  border: 0;
  border-bottom: 2px dotted #0284c7;
  background: transparent;
  color: #0369a1;
  font: inherit;
  font-weight: 700;
  cursor: help;
}

.termHeader {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.termBadge {
  padding: 0.12rem 0.45rem;
  border-radius: 0.35rem;
  background: #f1f5f9;
  color: #475569;
  font-size: 0.72rem;
  font-weight: 700;
}`,
          },
          {
            id: 'object',
            title: '対象サマリー',
            summary: '文書リンクやチケット番号から、ファイル種別・更新日時・承認ステータスを即座に確認するカード。',
            labels: ['見積書.pdf', '更新 2時間前', '承認待ち'],
            tsx: `<div className={styles.hoverCardDemo}>
  <a className={styles.fileTrigger} href="#file-quote">📄 2026年度_エンタープライズ見積書.pdf</a>
  <div className={styles.hoverCardSurface} role="region" aria-label="ファイル概要">
    <div className={styles.objectRow}>
      <span className={styles.fileTypeBadge}>PDF・1.4 MB</span>
      <span className={styles.statusPending}>承認待ち</span>
    </div>
    <strong className={styles.profileName}>2026年度_エンタープライズ見積書.pdf</strong>
    <p className={styles.profileBio}>
      最終更新: 2時間前（経理チーム 鈴木） / 有効期限: 2026年12月末
    </p>
  </div>
</div>`,
            css: `.fileTrigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #0284c7;
  font-weight: 700;
  text-decoration: underline;
}

.objectRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.statusPending {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: #fef3c7;
  color: #b45309;
  font-size: 0.72rem;
  font-weight: 700;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'navigation-menu',
    label: 'ナビゲーションメニュー',
    slug: 'navigation-menu',
    comparePath: '/patterns/navigation-menu-designs',
    summary:
      'サイトやアプリケーションの主要セクション間を横断移動するためのプライマリナビゲーションパターンです。',
    scope: ['ヘッダー横型ナビゲーション', '管理画面サイドバーナビ', '複数列メガメニュー'],
    axes: [
      {
        title: '階層',
        description: 'トップレベル項目数とサブカテゴリの深さに応じて、横型・サイドバー・メガメニューを選びます。',
      },
      {
        title: '現在地',
        description: 'アクティブなセクションを aria-current="page" と視覚的インジケーターで明示します。',
      },
      {
        title: '責務境界',
        description: 'ページ間の大域移動はナビゲーションメニュー、同一画面内のパネル切り替えはタブに分担させます。',
      },
    ],
    entries: [
      {
        id: 'primary-navigation-menu',
        title: 'プライマリナビゲーション',
        summary:
          '横型ナビゲーション・サイドバーナビゲーション・メガメニューを分け、大域移動の情報設計を整理するパターン。',
        problem:
          'パンくずやタブと見た目が似すぎると、クリック時にページ遷移するのか画面内切り替えなのかが判断できません。',
        solution:
          '大域移動を nav ランドマークに集約し、項目数や階層深度に合わせて横並び・縦積み・マルチカラム展開を使い分けます。',
        accessibilityNote:
          'nav に固有の aria-label を付け、現在ページには aria-current="page"、展開メニューには aria-expanded を設定します。',
        tags: ['ナビゲーション', '情報設計', 'ランドマーク'],
        variants: [
          {
            id: 'horizontal',
            title: '横型ナビゲーション',
            summary: 'ヘッダー上部に主要セクションを並列配置し、現在地をアクティブピルや下線で示す標準構成。',
            labels: ['概要', 'プロダクト', '料金', 'サポート'],
            tsx: `<nav aria-label="メインナビゲーション" className={styles.horizontalNav}>
  <span className={styles.brandLogo}>PatternLab</span>
  <ul className={styles.horizontalList}>
    <li><a aria-current="page" className={clsx(styles.navLink, styles.navLinkActive)} href="#overview">概要</a></li>
    <li><a className={styles.navLink} href="#products">プロダクト</a></li>
    <li><a className={styles.navLink} href="#pricing">料金プラン</a></li>
    <li><a className={styles.navLink} href="#support">サポート</a></li>
  </ul>
</nav>`,
            css: `.horizontalNav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border: 1px solid #d7dee8;
  border-radius: 0.8rem;
  background: #ffffff;
}

.horizontalList {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navLink {
  padding: 0.35rem 0.7rem;
  border-radius: 0.5rem;
  color: #475569;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}

.navLinkActive {
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 700;
}`,
          },
          {
            id: 'sidebar',
            title: 'サイドバーナビゲーション',
            summary: '管理画面やドキュメントサイトで、セクション見出しと項目リストを縦方向に整理する構成。',
            labels: ['ダッシュボード', 'ユーザー', '設定'],
            tsx: `<nav aria-label="管理画面サイドバー" className={styles.sidebarNav}>
  <div className={styles.sidebarGroupLabel}>ワークスペース管理</div>
  <ul className={styles.sidebarList}>
    <li>
      <a aria-current="page" className={clsx(styles.sidebarLink, styles.sidebarLinkActive)} href="#dashboard">
        <span>ダッシュボード</span>
        <span className={styles.sidebarBadge}>新着</span>
      </a>
    </li>
    <li>
      <a className={styles.sidebarLink} href="#users">
        <span>メンバー・権限</span>
        <span className={styles.sidebarCount}>24</span>
      </a>
    </li>
    <li>
      <a className={styles.sidebarLink} href="#settings">
        <span>セキュリティ設定</span>
      </a>
    </li>
  </ul>
</nav>`,
            css: `.sidebarNav {
  max-width: 250px;
  padding: 0.75rem;
  border: 1px solid #d7dee8;
  border-radius: 0.8rem;
  background: #ffffff;
}

.sidebarList {
  display: grid;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebarLink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 0.65rem;
  border-radius: 0.5rem;
  color: #334155;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}

.sidebarLinkActive {
  border-left: 3px solid #0284c7;
  background: #f0f9ff;
  color: #0369a1;
  font-weight: 700;
}`,
          },
          {
            id: 'mega',
            title: 'メガメニュー',
            summary: '複数の機能カテゴリを説明文つきのマルチカラムグリッドで展開し、全体像を見渡せる大規模ナビゲーション。',
            labels: ['製品', '分析', '自動化', '連携'],
            tsx: `<nav aria-label="製品メガメニュー" className={styles.megaMenuSurface}>
  <div className={styles.megaTriggerBar}>
    <button aria-expanded="true" className={styles.megaTriggerBtn} type="button">
      製品ラインナップ ▾
    </button>
    <span className={styles.megaGhostLink}>導入事例</span>
    <span className={styles.megaGhostLink}>ドキュメント</span>
  </div>
  <div className={styles.megaGrid}>
    <a className={styles.megaItem} href="#analytics">
      <strong>データ分析基盤</strong>
      <span>リアルタイム集計とコホート比較</span>
    </a>
    <a className={styles.megaItem} href="#automation">
      <strong>ワークフロー自動化</strong>
      <span>承認ルールと通知トリガーの設計</span>
    </a>
    <a className={styles.megaItem} href="#integrations">
      <strong>外部サービス連携</strong>
      <span>Webhook・API・SSO コネクタ</span>
    </a>
  </div>
</nav>`,
            css: `.megaMenuSurface {
  display: grid;
  gap: 0.75rem;
  padding: 0.9rem;
  border: 1px solid #d7dee8;
  border-radius: 0.85rem;
  background: #ffffff;
}

.megaGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.55rem;
  padding-top: 0.65rem;
  border-top: 1px solid #f1f5f9;
}

.megaItem {
  display: grid;
  gap: 0.2rem;
  padding: 0.55rem;
  border-radius: 0.55rem;
  background: #f8fafc;
  color: #0f172a;
  text-decoration: none;
}

.megaItem span {
  color: #64748b;
  font-size: 0.75rem;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'popover',
    label: 'ポップオーバー',
    slug: 'popover',
    comparePath: '/patterns/popover-designs',
    summary:
      'トリガーの直近に軽量な入力フォーム・ピッカー・補足アクションを展開する非モーダルオーバーレイです。',
    scope: ['その場でのクイック編集', '日付・カラー等のピッカー', 'アクション付き文脈ヘルパー'],
    axes: [
      {
        title: '操作量',
        description: '1〜2 項目の編集や選択に留め、長大なフォームはドロワーやモーダルへ切り分けます。',
      },
      {
        title: '閉じ方',
        description: '外側クリック、Escape キー、保存完了後の自動クローズ挙動を揃えます。',
      },
      {
        title: '配置',
        description: 'トリガー要素との視覚的つながり（矢印や近接余白）を保ちます。',
      },
    ],
    entries: [
      {
        id: 'popover-panel',
        title: 'ポップオーバーパネル',
        summary:
          'クイック編集・ピッカー・文脈ヘルパーを分け、トリガー近くで完結する軽量インタラクションを整理するパターン。',
        problem:
          'ツールチップにボタンや入力欄を入れたり、逆に1項目の変更だけで画面全体をモーダル遮断すると操作負荷が合いません。',
        solution:
          'トリガー直下にフォーカス可能な軽量パネルを出し、その場で値を更新・選択してすぐ元の作業へ戻れるようにします。',
        accessibilityNote:
          'トリガーに aria-expanded と aria-controls を設定し、展開時のフォーカス移動と Escape クローズを保証します。',
        tags: ['オーバーレイ', 'クイック操作', 'ピッカー'],
        variants: [
          {
            id: 'quick-edit',
            title: 'クイック編集',
            summary: 'テーブルセルやヘッダーの表示名をその場で書き換えて保存するインライン編集ポップオーバー。',
            labels: ['表示名', 'Team Alpha', '保存'],
            tsx: `<div className={styles.popoverDemo}>
  <button aria-expanded="true" className={styles.popoverTrigger} type="button">
    表示名: Team Alpha ✎
  </button>
  <div aria-label="表示名のクイック編集" className={styles.popoverPanel} role="dialog">
    <label className={styles.popoverField}>
      <span>ワークスペース表示名</span>
      <input defaultValue="Team Alpha" type="text" />
    </label>
    <div className={styles.popoverActions}>
      <button className={styles.ghostSmBtn} type="button">キャンセル</button>
      <button className={styles.primarySmBtn} type="button">保存</button>
    </div>
  </div>
</div>`,
            css: `.popoverDemo {
  display: grid;
  gap: 0.45rem;
  max-width: 280px;
}

.popoverPanel {
  display: grid;
  gap: 0.65rem;
  padding: 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
}

.popoverField {
  display: grid;
  gap: 0.25rem;
  font-size: 0.78rem;
  font-weight: 700;
}

.popoverActions {
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
}`,
          },
          {
            id: 'picker',
            title: 'ピッカー',
            summary: '期限日やプリセット候補をトリガー直下で素早く選択するピッカーポップオーバー。',
            labels: ['今日', '明日', '来週'],
            tsx: `const [selectedPreset, setSelectedPreset] = useState('明日');

<div className={styles.popoverDemo}>
  <button aria-expanded="true" className={styles.popoverTrigger} type="button">
    📅 期限: {selectedPreset}
  </button>
  <div aria-label="期限プリセット選択" className={styles.popoverPanel} role="dialog">
    <span className={styles.pickerHeading}>クイック期限設定</span>
    <div className={styles.presetGrid}>
      {['今日中', '明日', '来週月曜', '期限なし'].map((preset) => (
        <button
          aria-pressed={selectedPreset === preset}
          className={clsx(styles.presetBtn, selectedPreset === preset && styles.presetBtnActive)}
          key={preset}
          onClick={() => setSelectedPreset(preset)}
          type="button">
          {preset}
        </button>
      ))}
    </div>
  </div>
</div>`,
            css: `.presetGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem;
}

.presetBtn {
  padding: 0.4rem 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.45rem;
  background: #f8fafc;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.presetBtnActive {
  border-color: #0284c7;
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 700;
}`,
          },
          {
            id: 'helper',
            title: '文脈ヘルパー',
            summary: '設定項目の横にある「?」ボタンから、補足説明と詳細ドキュメントへのリンクを提示するポップオーバー。',
            labels: ['権限とは', '閲覧者は編集できません', '詳しく見る'],
            tsx: `<div className={styles.popoverDemo}>
  <div className={styles.helperTriggerRow}>
    <span>ゲスト閲覧権限</span>
    <button aria-expanded="true" aria-label="ゲスト閲覧権限の説明を表示" className={styles.helpIconBtn} type="button">
      ?
    </button>
  </div>
  <div aria-label="権限の補足説明" className={styles.popoverPanel} role="dialog">
    <strong className={styles.helperTitle}>ゲスト閲覧権限とは？</strong>
    <p className={styles.helperText}>
      閲覧者はページとコメントの参照のみ可能で、設定変更やメンバー招待は行えません。
    </p>
    <a className={styles.helperLink} href="#docs-roles">権限マトリクスを詳しく見る →</a>
  </div>
</div>`,
            css: `.helperTriggerRow {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 700;
}

.helpIconBtn {
  display: inline-grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background: #f8fafc;
  font-size: 0.75rem;
  font-weight: 800;
}

.helperLink {
  color: #0284c7;
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'separator',
    label: 'セパレーター',
    slug: 'separator',
    comparePath: '/patterns/separator-designs',
    summary:
      '情報グループや操作クラスターの境界を控えめな線と余白で整理する構造パターンです。',
    scope: ['フォームセクション区切り', 'ツールバー内の縦区切り', '日付やORを示すラベル付き区切り'],
    axes: [
      {
        title: '方向',
        description: '縦積みコンテンツには横線（horizontal）、横並びツールバーには縦線（vertical）を使います。',
      },
      {
        title: '強さ',
        description: '余白だけで足りる箇所と、明示的な境界線やラベル付き区切りが必要な箇所を分けます。',
      },
      {
        title: '意味',
        description: '純粋な装飾線は aria-hidden、構造的な区切りは role="separator" と aria-orientation を使い分けます。',
      },
    ],
    entries: [
      {
        id: 'structural-separator',
        title: '構造セパレーター',
        summary:
          '横型・縦型・ラベル付き区切りを分け、過剰な枠線を増やさずに情報の塊を整理するパターン。',
        problem:
          'あらゆる要素の間へ強い線を引くと画面が煩雑になり、逆に余白だけでは別グループとの境界が伝わらないことがあります。',
        solution:
          'セクション転換には横セパレーター、ツールバーのボタングループ境界には縦セパレーター、タイムラインやログイン分岐にはラベル付き区切りを使います。',
        accessibilityNote:
          '縦方向セパレーターを意味的な区切りとして使う場合は role="separator" aria-orientation="vertical" を明示します。',
        tags: ['構造', 'ディバイダー', 'レイアウト'],
        variants: [
          {
            id: 'horizontal',
            title: '横型セパレーター',
            summary: 'カードや設定フォーム内の縦方向セクションを穏やかに分ける水平ディバイダー。',
            labels: ['プロフィール', '---', '通知設定'],
            tsx: `<div className={styles.sectionCard}>
  <div className={styles.sectionBlock}>
    <strong>プロフィール公開範囲</strong>
    <span>チームメンバー全員に表示</span>
  </div>
  <hr className={styles.horizontalDivider} />
  <div className={styles.sectionBlock}>
    <strong>メールダイジェスト通知</strong>
    <span>毎週月曜 9:00 に送信</span>
  </div>
</div>`,
            css: `.sectionCard {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #d7dee8;
  border-radius: 0.8rem;
  background: #ffffff;
}

.horizontalDivider {
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
  background: #e2e8f0;
}`,
          },
          {
            id: 'vertical',
            title: '縦型セパレーター',
            summary: 'ツールバーやヘッダー内で、異なる役割のアクション群を分ける垂直ディバイダー。',
            labels: ['元に戻す', '|', '保存', '|', '公開'],
            tsx: `<div aria-label="エディタ操作バー" className={styles.toolbarSurface} role="toolbar">
  <button className={styles.toolBtn} type="button">元に戻す</button>
  <button className={styles.toolBtn} type="button">やり直す</button>
  <span aria-orientation="vertical" className={styles.verticalDivider} role="separator" />
  <button className={styles.toolBtn} type="button">下書き保存</button>
  <span aria-orientation="vertical" className={styles.verticalDivider} role="separator" />
  <button className={styles.toolPrimaryBtn} type="button">公開する</button>
</div>`,
            css: `.toolbarSurface {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.65rem;
  border: 1px solid #d7dee8;
  border-radius: 0.7rem;
  background: #ffffff;
}

.verticalDivider {
  width: 1px;
  height: 1.35rem;
  margin: 0 0.2rem;
  background: #cbd5e1;
}`,
          },
          {
            id: 'labelled',
            title: 'ラベル付き区切り',
            summary: 'タイムラインの日付見出しや「または」の分岐など、境界自体に短い意味を持たせるディバイダー。',
            labels: ['--- 今日 ---', '更新履歴'],
            tsx: `<div className={styles.timelineStack}>
  <div className={styles.labelledDivider} role="separator">
    <span>今日・2026年11月20日</span>
  </div>
  <div className={styles.timelineEvent}>
    <strong>デザインシステム v2.4 を公開</strong>
    <span>14:20 ・ 佐藤 葵</span>
  </div>
</div>`,
            css: `.labelledDivider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 0.76rem;
  font-weight: 700;
}

.labelledDivider::before,
.labelledDivider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #cbd5e1;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'slider',
    label: 'スライダー',
    slug: 'slider',
    comparePath: '/patterns/slider-designs',
    summary:
      '連続値や段階的な設定値をトラック上のつまみ操作で視覚的に調整する入力パターンです。',
    scope: ['音量・不透明度などの単一連続値', '最小〜最大の価格帯レンジ', '目盛り付きの段階値設定'],
    axes: [
      {
        title: '値の種類',
        description: '単一値（single）、上限・下限の範囲（range）、離散ステップ（stepped）を明確に分けます。',
      },
      {
        title: '精度',
        description: '大まかな体感調整はスライダー、1円単位などの厳密指定は数値入力併用で補います。',
      },
      {
        title: 'ラベル',
        description: '項目名・現在値・最小値・最大値・単位を常時可視表示します。',
      },
    ],
    entries: [
      {
        id: 'range-slider',
        title: 'レンジスライダー',
        summary:
          '単一値・範囲値・段階値スライダーを分け、現在値のフィードバックと目盛り設計を整理するパターン。',
        problem:
          '現在値や単位を隠したままスライダーだけを置くと、いま何%・何円に設定されているのかが正確に分かりません。',
        solution:
          'トラックの塗り比率と現在値ラベルを同期させ、範囲指定や段階ステップでは境界値・目盛りラベルを併記します。',
        accessibilityNote:
          'input type="range" に label または aria-label、min / max / step、必要に応じた aria-valuetext を設定し、左右矢印キーで操作可能にします。',
        tags: ['フォーム', '値調整', 'インタラクティブ'],
        variants: [
          {
            id: 'single',
            title: '単一値スライダー',
            summary: '音量や表示ズーム率など、1つの連続値をリアルタイムに調整して現在値を大きく示す基本形。',
            labels: ['音量', '64%', '0 - 100'],
            tsx: `const [volume, setVolume] = useState(64);

<div className={styles.sliderCard}>
  <div className={styles.sliderHeader}>
    <label htmlFor="volume-slider">通知音量</label>
    <output className={styles.sliderValue} htmlFor="volume-slider">{volume}%</output>
  </div>
  <input
    className={styles.rangeInput}
    id="volume-slider"
    max={100}
    min={0}
    onChange={(e) => setVolume(Number(e.target.value))}
    type="range"
    value={volume}
  />
  <div className={styles.sliderScale}>
    <span>0%（ミュート）</span>
    <span>50%</span>
    <span>100%</span>
  </div>
</div>`,
            css: `.sliderCard {
  display: grid;
  gap: 0.55rem;
  padding: 1rem;
  border: 1px solid #d7dee8;
  border-radius: 0.8rem;
  background: #ffffff;
}

.sliderHeader,
.sliderScale {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sliderValue {
  padding: 0.15rem 0.55rem;
  border-radius: 0.4rem;
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 800;
}

.rangeInput {
  width: 100%;
  accent-color: #0284c7;
}`,
          },
          {
            id: 'range',
            title: '範囲値スライダー',
            summary: '価格帯の下限と上限を同時に扱い、選択中の価格レンジをハイライト表示する構成。',
            labels: ['価格帯', '3,000円', '12,000円'],
            tsx: `const [minPrice, setMinPrice] = useState(3000);
const [maxPrice, setMaxPrice] = useState(12000);

<div className={styles.sliderCard}>
  <div className={styles.sliderHeader}>
    <span>予算レンジ</span>
    <strong className={styles.sliderValue}>
      ¥{minPrice.toLocaleString()} 〜 ¥{maxPrice.toLocaleString()}
    </strong>
  </div>
  <div className={styles.dualInputs}>
    <label className={styles.subSliderLabel}>
      <span>下限</span>
      <input
        max={maxPrice - 1000}
        min={0}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        step={1000}
        type="range"
        value={minPrice}
      />
    </label>
    <label className={styles.subSliderLabel}>
      <span>上限</span>
      <input
        max={20000}
        min={minPrice + 1000}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        step={1000}
        type="range"
        value={maxPrice}
      />
    </label>
  </div>
</div>`,
            css: `.dualInputs {
  display: grid;
  gap: 0.5rem;
}

.subSliderLabel {
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
}`,
          },
          {
            id: 'stepped',
            title: '段階値スライダー',
            summary: 'UI の情報密度（コンパクト / 標準 / ゆったり）など、意味のある離散ステップを目盛り付きで選ぶ構成。',
            labels: ['密度', '標準', 'ゆったり'],
            tsx: `const steps = ['コンパクト', '標準', 'ゆったり'] as const;
const [stepIndex, setStepIndex] = useState(1);

<div className={styles.sliderCard}>
  <div className={styles.sliderHeader}>
    <label htmlFor="density-slider">表示密度</label>
    <output className={styles.sliderValue} htmlFor="density-slider">
      {steps[stepIndex]}
    </output>
  </div>
  <input
    aria-valuetext={steps[stepIndex]}
    className={styles.rangeInput}
    id="density-slider"
    max={2}
    min={0}
    onChange={(e) => setStepIndex(Number(e.target.value))}
    step={1}
    type="range"
    value={stepIndex}
  />
  <div className={styles.stepTicks}>
    {steps.map((label, idx) => (
      <span className={clsx(idx === stepIndex && styles.activeTick)} key={label}>
        {label}
      </span>
    ))}
  </div>
</div>`,
            css: `.stepTicks {
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 0.76rem;
  font-weight: 600;
}

.activeTick {
  color: #0284c7;
  font-weight: 800;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'textarea',
    label: 'テキストエリア',
    slug: 'textarea',
    comparePath: '/patterns/textarea-designs',
    summary:
      'コメント、説明文、フィードバックなど複数行にわたる自由文入力を受け付けるフォームパターンです。',
    scope: ['短文コメント欄（固定高さ）', '入力量に追従する自動伸長欄', '文字数カウンター・エラー検証付き入力欄'],
    axes: [
      {
        title: '高さ制御',
        description: '行数固定、内容に応じた自動伸長（max-height 付き）、手動リサイズ可否を用途で使い分けます。',
      },
      {
        title: '補助情報',
        description: '入力前のヒント文、残り文字数カウンター、エラーメッセージの位置を揃えます。',
      },
      {
        title: '状態表現',
        description: 'フォーカスリング、文字数超過・必須エラー時の輪郭と文言を明確に示します。',
      },
    ],
    entries: [
      {
        id: 'multiline-textarea',
        title: '複数行テキストエリア',
        summary:
          '固定高さ・自動伸長・バリデーション付きテキストエリアを分け、複数行入力の余白とフィードバックを整理するパターン。',
        problem:
          '単一行 input の高さを広げただけの設計にすると、長文入力時のスクロールや文字数上限、エラー理由が伝わりにくくなります。',
        solution:
          'ラベル・補助文・文字数カウンター・エラーメッセージを textarea と一貫した構造で組み合わせます。',
        accessibilityNote:
          'label と textarea を関連付け、補助文やエラーメッセージは aria-describedby、異常時は aria-invalid="true" で伝えます。',
        tags: ['フォーム', '複数行入力', 'バリデーション'],
        variants: [
          {
            id: 'fixed',
            title: '固定高さ',
            summary: '3〜4行程度の短いコメントや備考を、レイアウト高さを変えずに受け付ける標準構成。',
            labels: ['コメント', '3 行固定', '任意'],
            tsx: `<div className={styles.textareaCard}>
  <div className={styles.labelRow}>
    <label htmlFor="comment-fixed">レビューコメント</label>
    <span className={styles.optionalBadge}>任意</span>
  </div>
  <textarea
    className={styles.fixedTextarea}
    defaultValue="見出しと本文のコントラスト比が改善され、モバイルでも読みやすくなっています。"
    id="comment-fixed"
    rows={3}
  />
  <span className={styles.helperText}>Markdown 記法（太字・リスト）を利用できます。</span>
</div>`,
            css: `.textareaCard {
  display: grid;
  gap: 0.45rem;
  padding: 1rem;
  border: 1px solid #d7dee8;
  border-radius: 0.8rem;
  background: #ffffff;
}

.labelRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
}

.fixedTextarea {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.55rem;
  font: inherit;
  line-height: 1.6;
  resize: none;
}`,
          },
          {
            id: 'auto-grow',
            title: '自動伸長',
            summary: '改行や文字数に応じて行数が自然に広がり、一覧性を保ったまま長文を編集できる構成。',
            labels: ['説明', '入力に合わせて拡張', '最大 8 行'],
            tsx: `const [text, setText] = useState(
  '1行目: プロジェクト背景\\n2行目: 対象ユーザーと利用シナリオ\\n3行目: 入力すると行数に合わせて領域が拡張されます。',
);
const lineCount = Math.min(8, Math.max(3, text.split('\\n').length + 1));

<div className={styles.textareaCard}>
  <div className={styles.labelRow}>
    <label htmlFor="desc-autogrow">機能仕様の要約</label>
    <span className={styles.metaBadge}>現在 {lineCount} 行（最大 8 行）</span>
  </div>
  <textarea
    className={styles.autoGrowTextarea}
    id="desc-autogrow"
    onChange={(e) => setText(e.target.value)}
    rows={lineCount}
    value={text}
  />
  <span className={styles.helperText}>改行を追加すると最大 8 行まで自動で高さが広がります。</span>
</div>`,
            css: `.autoGrowTextarea {
  width: 100%;
  max-height: 13rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid #0284c7;
  border-radius: 0.55rem;
  background: #f8fafc;
  font: inherit;
  line-height: 1.6;
  transition: height 120ms ease;
}`,
          },
          {
            id: 'validation',
            title: 'バリデーション・文字数管理',
            summary: '必須チェック・最小文字数エラー・現在文字数カウンターを同時表示するテキストエリア。',
            labels: ['フィードバック', '12 / 200', '必須項目です'],
            tsx: `const [feedback, setFeedback] = useState('UI の余白について');
const isTooShort = feedback.trim().length < 20;

<div className={clsx(styles.textareaCard, isTooShort && styles.textareaCardError)}>
  <div className={styles.labelRow}>
    <label htmlFor="feedback-validation">改善フィードバック（20文字以上）</label>
    <span className={styles.requiredBadge}>必須</span>
  </div>
  <textarea
    aria-describedby="feedback-error feedback-count"
    aria-invalid={isTooShort}
    className={clsx(styles.fixedTextarea, isTooShort && styles.inputError)}
    id="feedback-validation"
    maxLength={200}
    onChange={(e) => setFeedback(e.target.value)}
    rows={3}
    value={feedback}
  />
  <div className={styles.footerRow}>
    <span className={styles.errorText} id="feedback-error">
      {isTooShort ? '具体的な再現手順を含めて 20 文字以上で入力してください。' : '入力条件を満たしています。'}
    </span>
    <span className={styles.counterText} id="feedback-count">{feedback.length} / 200</span>
  </div>
</div>`,
            css: `.textareaCardError {
  border-color: #fecaca;
  background: #fffafa;
}

.inputError {
  border-color: #dc2626;
  background: #ffffff;
}

.footerRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.errorText {
  color: #dc2626;
  font-size: 0.78rem;
  font-weight: 700;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'toast-snackbar',
    label: 'トースト・スナックバー',
    slug: 'toast-snackbar',
    comparePath: '/patterns/toast-snackbar-designs',
    summary:
      '保存完了やバックグラウンド処理の結果を画面端へ一時表示し、作業を止めずにフィードバックを返すパターンです。',
    scope: ['保存・送信完了の成功トースト', '取り消し（Undo）付きスナックバー', '複数通知の積み上げ（スタック）表示'],
    axes: [
      {
        title: '重要度',
        description: '一時通知で流してよい成功・軽微な結果に限定し、ユーザーの修正が必要なエラーはページ内アラートに残します。',
      },
      {
        title: '操作',
        description: '「元に戻す」などのアクションを含める場合は、操作に十分な表示時間とフォーカス到達性を確保します。',
      },
      {
        title: '配置',
        description: '複数通知が同時に発生した際の積み上げ順と上限件数（2〜3件）を決めます。',
      },
    ],
    entries: [
      {
        id: 'toast-feedback',
        title: '一時通知フィードバック',
        summary:
          '成功トースト・取り消しスナックバー・積み上げ通知を分け、非阻害フィードバックの設計を整理するパターン。',
        problem:
          '重要なエラーメッセージを自動消去されるトーストだけで流すと、ユーザーが内容を読む前に消えて復帰できなくなります。',
        solution:
          '自動消去してよい成功通知、直後の Undo を提供するスナックバー、複数イベントのスタック表示を明確に分けます。',
        accessibilityNote:
          'role="status"（aria-live="polite"）を基本とし、ホバー・フォーカス中は自動消去タイマーを一時停止します。',
        tags: ['フィードバック', '一時通知', '非阻害UI'],
        variants: [
          {
            id: 'success',
            title: '成功トースト',
            summary: '設定の保存完了などをステータスアイコン・補足リンク・閉じるボタン付きで穏やかに知らせる通知。',
            labels: ['保存しました', '今すぐ確認'],
            tsx: `<div aria-live="polite" className={styles.toastSurface} role="status">
  <span aria-hidden="true" className={styles.successIcon}>✓</span>
  <div className={styles.toastContent}>
    <strong className={styles.toastTitle}>通知設定を保存しました</strong>
    <span className={styles.toastSub}>変更はすべての端末へ即時反映されます</span>
  </div>
  <a className={styles.toastLink} href="#Check">確認</a>
  <button aria-label="通知を閉じる" className={styles.toastClose} type="button">×</button>
</div>`,
            css: `.toastSurface {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border: 1px solid #bbf7d0;
  border-radius: 0.8rem;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
}

.successIcon {
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  background: #dcfce7;
  color: #15803d;
  font-weight: 800;
}`,
          },
          {
            id: 'undo',
            title: '取り消しスナックバー',
            summary: 'アーカイブや削除直後に、高コントラストなバーと「元に戻す」アクションを提示する構成。',
            labels: ['アーカイブしました', '元に戻す'],
            tsx: `<div aria-live="polite" className={styles.snackbarSurface} role="status">
  <span className={styles.snackbarMessage}>スレッド「Q4 リリース計画」をアーカイブしました</span>
  <div className={styles.snackbarActions}>
    <button className={styles.undoButton} type="button">元に戻す</button>
    <button aria-label="閉じる" className={styles.snackbarDismiss} type="button">×</button>
  </div>
</div>`,
            css: `.snackbarSurface {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: #0f172a;
  color: #f8fafc;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.22);
}

.undoButton {
  padding: 0.3rem 0.65rem;
  border: 1px solid rgba(56, 189, 248, 0.45);
  border-radius: 0.45rem;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-weight: 700;
  cursor: pointer;
}`,
          },
          {
            id: 'stacked',
            title: '積み上げ通知',
            summary: 'バックグラウンド同期やコメント追加など、連続して届いた通知を最新順に重ねて見せる構成。',
            labels: ['同期完了', 'コメントが追加されました', '招待を送信しました'],
            tsx: `<div aria-label="通知スタック" className={styles.toastStack}>
  <div className={styles.stackItemPrimary} role="status">
    <span className={styles.stackDot} />
    <div>
      <strong>3 名への招待メールを送信しました</strong>
      <span>たった今</span>
    </div>
  </div>
  <div className={styles.stackItemSecondary} role="status">
    <span className={styles.stackDotMuted} />
    <div>
      <strong>デザインレビューに新しいコメント</strong>
      <span>1分前</span>
    </div>
  </div>
  <div className={styles.stackItemTertiary} role="status">
    <span className={styles.stackDotMuted} />
    <div>
      <strong>クラウド同期が完了しました</strong>
      <span>3分前</span>
    </div>
  </div>
</div>`,
            css: `.toastStack {
  display: grid;
  gap: 0.45rem;
}

.stackItemPrimary,
.stackItemSecondary,
.stackItemTertiary {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid #d7dee8;
  border-radius: 0.7rem;
  background: #ffffff;
}

.stackItemSecondary {
  transform: scale(0.98);
  opacity: 0.92;
}

.stackItemTertiary {
  transform: scale(0.96);
  opacity: 0.82;
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'tooltip',
    label: 'ツールチップ',
    slug: 'tooltip',
    comparePath: '/patterns/tooltip-designs',
    summary:
      'アイコンボタンの名称や無効化の理由など、1文程度の短い補足マイクロコピーをホバー・フォーカス時に表示するパターンです。',
    scope: ['アイコンボタンのラベル補足', '操作できないボタンの無効理由', '上下左右の配置バリエーション'],
    axes: [
      {
        title: '短さ',
        description: '1行〜短文のテキストのみに限定し、リッチな構造やリンクを含める場合はホバーカード・ポップオーバーへ分けます。',
      },
      {
        title: '到達性',
        description: 'マウスホバー時だけでなく、キーボードフォーカス時にも確実に表示し、Escape キーで閉じられるようにします。',
      },
      {
        title: '必須情報',
        description: '入力条件など操作に不可欠な情報はツールチップに隠さず、常時読めるヘルパーテキストとして配置します。',
      },
    ],
    entries: [
      {
        id: 'short-tooltip',
        title: '短文ツールチップ',
        summary:
          'アイコンラベル・無効理由・配置バリエーションを分け、短文マイクロコピーの表示設計を整理するパターン。',
        problem:
          '重要な注意事項をツールチップの中に閉じ込めると、タッチ端末ユーザーや画面を流し読みするユーザーが見落とします。',
        solution:
          'アイコンボタンの機能名補足や、なぜ現在無効になっているかの短い理由説明に用途を絞り、吹き出し矢印で対象との対応を明示します。',
        accessibilityNote:
          'role="tooltip" と aria-describedby でトリガーと関連付け、無効理由を示す場合はフォーカス可能なラッパーや補助ボタンを用意します。',
        tags: ['マイクロコピー', 'アクセシビリティ', 'オーバーレイ'],
        variants: [
          {
            id: 'icon-label',
            title: 'アイコンラベル補足',
            summary: '省スペースなアイコンボタン群に対し、機能名とショートカットキーを吹き出しで補足する構成。',
            labels: ['保存', '共有', '削除'],
            tsx: `<div className={styles.tooltipDemoRow}>
  <div className={styles.tooltipAnchor}>
    <span className={styles.tooltipBubble} id="tip-save" role="tooltip">
      変更を保存 (⌘S)
    </span>
    <button aria-describedby="tip-save" aria-label="変更を保存" className={styles.iconBtn} type="button">
      💾
    </button>
  </div>
  <button aria-label="共有リンクを作成" className={styles.iconBtn} type="button">🔗</button>
  <button aria-label="項目を削除" className={styles.iconBtn} type="button">🗑️</button>
</div>`,
            css: `.tooltipAnchor {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.tooltipBubble {
  padding: 0.3rem 0.6rem;
  border-radius: 0.45rem;
  background: #0f172a;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}

.iconBtn {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.55rem;
  background: #ffffff;
}`,
          },
          {
            id: 'disabled-reason',
            title: '無効理由の補足',
            summary: '操作できないボタンの近くで「なぜ現在押せないのか」を短い文言で案内する構成。',
            labels: ['権限がありません', '入力後に有効になります'],
            tsx: `<div className={styles.disabledTooltipDemo}>
  <div className={styles.tooltipBubble} id="tip-disabled-reason" role="tooltip">
    公開には管理者権限と必須項目の入力が必要です
  </div>
  <div className={styles.disabledActionRow}>
    <button
      aria-describedby="tip-disabled-reason"
      aria-disabled="true"
      className={styles.disabledPrimaryBtn}
      type="button">
      本番環境へ公開
    </button>
    <span className={styles.disabledHintBadge}>権限不足</span>
  </div>
</div>`,
            css: `.disabledTooltipDemo {
  display: grid;
  justify-items: start;
  gap: 0.45rem;
}

.disabledPrimaryBtn {
  padding: 0.45rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.55rem;
  background: #f1f5f9;
  color: #94a3b8;
  font-weight: 700;
  cursor: not-allowed;
}`,
          },
          {
            id: 'placement',
            title: '配置（上・右・下・左）',
            summary: '画面端や隣接要素との重なりを避けるための 4 方向（上・右・下・左）の配置比較。',
            labels: ['上', '右', '下', '左'],
            tsx: `<div className={styles.placementGrid}>
  {(['上 (Top)', '右 (Right)', '下 (Bottom)', '左 (Left)'] as const).map((dir) => (
    <div className={styles.placementCell} key={dir}>
      <span className={styles.placementTarget}>基準ボタン</span>
      <span className={styles.tooltipBubble} role="tooltip">{dir} に表示</span>
    </div>
  ))}
</div>`,
            css: `.placementGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.placementCell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.65rem;
  border: 1px dashed #cbd5e1;
  border-radius: 0.6rem;
  background: #f8fafc;
}`,
          },
        ],
      },
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
