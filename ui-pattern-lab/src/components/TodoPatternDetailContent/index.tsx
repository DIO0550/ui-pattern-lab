import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import {
  type TodoPatternCategoryId,
  todoPatternCategoryMap,
} from '@site/src/data/todoPatternData';
import {assertNever} from '@site/src/utils/assertNever';

import styles from './styles.module.css';

type Props = {
  categoryId: TodoPatternCategoryId;
  entryId: string;
};

function BreadcrumbVariantPreview({variantId}: {variantId: string}): ReactNode {
  const [expanded, setExpanded] = useState(false);

  if (variantId === 'slash') {
    return (
      <nav aria-label="パンくずリスト" className={styles.breadcrumbNav}>
        <ol className={styles.breadcrumbList}>
          <li>
            <span className={styles.breadcrumbLink}>ホーム</span>
          </li>
          <li aria-hidden="true" className={styles.breadcrumbDivider}>
            /
          </li>
          <li>
            <span className={styles.breadcrumbLink}>設定</span>
          </li>
          <li aria-hidden="true" className={styles.breadcrumbDivider}>
            /
          </li>
          <li aria-current="page" className={styles.breadcrumbCurrent}>
            通知
          </li>
        </ol>
      </nav>
    );
  }

  if (variantId === 'chevron') {
    return (
      <nav aria-label="カテゴリ階層" className={styles.breadcrumbNav}>
        <ol className={styles.breadcrumbList}>
          <li>
            <span className={styles.breadcrumbPillLink}>商品</span>
          </li>
          <li aria-hidden="true" className={styles.breadcrumbChevron}>
            ›
          </li>
          <li>
            <span className={styles.breadcrumbPillLink}>家具・インテリア</span>
          </li>
          <li aria-hidden="true" className={styles.breadcrumbChevron}>
            ›
          </li>
          <li aria-current="page" className={styles.breadcrumbPillCurrent}>
            オフィスチェア
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="深い階層のパンくずリスト" className={styles.breadcrumbNav}>
      <ol className={styles.breadcrumbList}>
        <li>
          <span className={styles.breadcrumbLink}>ホーム</span>
        </li>
        <li aria-hidden="true" className={styles.breadcrumbDivider}>
          /
        </li>
        {expanded ? (
          <>
            <li>
              <span className={styles.breadcrumbLink}>組織管理</span>
            </li>
            <li aria-hidden="true" className={styles.breadcrumbDivider}>
              /
            </li>
            <li>
              <span className={styles.breadcrumbLink}>セキュリティ</span>
            </li>
            <li aria-hidden="true" className={styles.breadcrumbDivider}>
              /
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                aria-expanded={expanded}
                aria-label="省略された中間階層を展開"
                className={styles.breadcrumbEllipsisButton}
                onClick={() => setExpanded(true)}
                type="button">
                •••
              </button>
            </li>
            <li aria-hidden="true" className={styles.breadcrumbDivider}>
              /
            </li>
          </>
        )}
        <li>
          <span className={styles.breadcrumbLink}>権限ロール</span>
        </li>
        <li aria-hidden="true" className={styles.breadcrumbDivider}>
          /
        </li>
        <li aria-current="page" className={styles.breadcrumbCurrent}>
          メンバー招待
        </li>
      </ol>
    </nav>
  );
}

function CardVariantPreview({variantId}: {variantId: string}): ReactNode {
  const [selected, setSelected] = useState(true);

  if (variantId === 'vertical') {
    return (
      <article className={styles.verticalCard}>
        <div aria-hidden="true" className={styles.cardMedia}>
          <span className={styles.cardMediaBadge}>UI ガイド</span>
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
          <button className={styles.primaryActionBtn} type="button">
            詳細を見る
          </button>
        </footer>
      </article>
    );
  }

  if (variantId === 'horizontal') {
    return (
      <article className={styles.horizontalCard}>
        <div aria-hidden="true" className={styles.horizontalThumb}>
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
            <button className={styles.secondaryActionBtn} type="button">
              比較に追加
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (variantId === 'overlay') {
    return (
      <article className={styles.overlayCard}>
        <div className={styles.overlayBackdrop}>
          <span className={styles.overlayBadge}>新着特集</span>
          <div className={styles.overlayContent}>
            <h3 className={styles.overlayTitle}>2026年 アクセシブル UI 設計トレンド</h3>
            <p className={styles.overlayMeta}>キーボード操作とコントラスト設計の実践例</p>
            <button className={styles.overlayButton} type="button">
              特集を読む →
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <button
      aria-pressed={selected}
      className={clsx(styles.interactiveCard, selected && styles.interactiveCardSelected)}
      onClick={() => setSelected((prev) => !prev)}
      type="button">
      <div className={styles.interactiveHeader}>
        <span className={styles.cardTitle}>チームプラン</span>
        <span className={clsx(styles.interactiveBadge, selected && styles.interactiveBadgeSelected)}>
          {selected ? '✓ 選択中' : '未選択'}
        </span>
      </div>
      <p className={styles.cardText}>
        最大 25 メンバー・監査ログ・カスタム権限ロールを含む標準構成（クリックで選択切替）
      </p>
      <div className={styles.priceText}>月額 ¥12,000 / ワークスペース</div>
    </button>
  );
}

function ChipTagVariantPreview({variantId}: {variantId: string}): ReactNode {
  const [activeFilters, setActiveFilters] = useState<readonly string[]>(['在庫あり', '送料無料']);
  const [tokens, setTokens] = useState<readonly string[]>(['勤務地: 東京', 'リモート可', '正社員']);

  if (variantId === 'readonly') {
    return (
      <div className={styles.surfaceFrame}>
        <ul aria-label="記事のカテゴリタグ" className={styles.tagList}>
          {['デザインシステム', 'React / TypeScript', 'アクセシビリティ'].map((tag) => (
            <li className={styles.readonlyTag} key={tag}>
              <span aria-hidden="true" className={styles.tagDot} />
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variantId === 'filter') {
    const filterCandidates = ['在庫あり', '送料無料', '即日発送', 'セール対象'] as const;
    return (
      <div className={styles.surfaceFrame}>
        <div aria-label="絞り込み条件" className={styles.tagList} role="group">
          {filterCandidates.map((label) => {
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
        </div>
        <span className={styles.helperCaption}>選択中: {activeFilters.length} 件</span>
      </div>
    );
  }

  return (
    <div className={styles.surfaceFrame}>
      <div className={styles.tagList}>
        {tokens.map((token) => (
          <span className={styles.removableChip} key={token}>
            <span>{token}</span>
            <button
              aria-label={`${token} を削除`}
              className={styles.removeChipBtn}
              onClick={() => setTokens((prev) => prev.filter((item) => item !== token))}
              type="button">
              ×
            </button>
          </span>
        ))}
        {tokens.length < 3 ? (
          <button
            className={styles.resetLinkBtn}
            onClick={() => setTokens(['勤務地: 東京', 'リモート可', '正社員'])}
            type="button">
            初期条件に戻す
          </button>
        ) : null}
      </div>
    </div>
  );
}

function DialogModalVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'confirmation') {
    return (
      <div className={styles.modalBackdrop}>
        <section
          aria-label="公開設定の保存確認"
          aria-modal="true"
          className={styles.dialogSurface}
          role="dialog">
          <div className={styles.dialogHeader}>
            <span className={styles.infoBadge}>確認</span>
            <h3 className={styles.dialogTitle}>公開設定の変更を保存しますか？</h3>
          </div>
          <p className={styles.cardText}>
            変更を保存すると、ワークスペース内の全メンバーに新しい通知ルールが即時適用されます。
          </p>
          <footer className={styles.dialogFooter}>
            <button className={styles.secondaryActionBtn} type="button">
              キャンセル
            </button>
            <button className={styles.primaryActionBtn} type="button">
              変更を保存
            </button>
          </footer>
        </section>
      </div>
    );
  }

  if (variantId === 'form') {
    return (
      <div className={styles.modalBackdrop}>
        <section
          aria-label="メンバー招待フォーム"
          aria-modal="true"
          className={styles.dialogSurface}
          role="dialog">
          <div className={styles.dialogHeaderRow}>
            <h3 className={styles.dialogTitle}>メンバーを招待</h3>
            <button aria-label="閉じる" className={styles.iconCloseBtn} type="button">
              ×
            </button>
          </div>
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
            <button className={styles.secondaryActionBtn} type="button">
              キャンセル
            </button>
            <button className={styles.primaryActionBtn} type="button">
              招待メールを送信
            </button>
          </footer>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.modalBackdrop}>
      <section
        aria-label="プロジェクト削除の確認"
        aria-modal="true"
        className={clsx(styles.dialogSurface, styles.destructiveDialog)}
        role="dialog">
        <div className={styles.dialogHeader}>
          <span className={styles.dangerBadge}>取り消し不可</span>
          <h3 className={styles.dialogTitle}>プロジェクト「UI Pattern Lab」を削除しますか？</h3>
        </div>
        <p className={styles.cardText}>
          関連する 24 件のドキュメントと共有リンクがすべて失われます。この操作は元に戻せません。
        </p>
        <footer className={styles.dialogFooter}>
          <button className={styles.secondaryActionBtn} type="button">
            キャンセル
          </button>
          <button className={styles.dangerActionBtn} type="button">
            完全に削除する
          </button>
        </footer>
      </section>
    </div>
  );
}

function DrawerSheetVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'side') {
    return (
      <div className={styles.drawerViewport}>
        <div aria-hidden="true" className={styles.drawerBackgroundStub}>
          <span>一覧画面</span>
          <small>背後のコンテキスト</small>
        </div>
        <aside aria-label="案件詳細ドロワー" className={styles.sideDrawer}>
          <div className={styles.dialogHeaderRow}>
            <div>
              <span className={styles.cardEyebrow}>ISSUE-104</span>
              <h3 className={styles.dialogTitle}>決済フローの監査</h3>
            </div>
            <button aria-label="ドロワーを閉じる" className={styles.iconCloseBtn} type="button">
              ×
            </button>
          </div>
          <div className={styles.drawerMetaList}>
            <div className={styles.drawerMetaRow}>
              <span>ステータス</span>
              <span className={styles.stockBadge}>レビュー中</span>
            </div>
            <div className={styles.drawerMetaRow}>
              <span>担当者</span>
              <strong>佐藤 葵</strong>
            </div>
          </div>
          <div className={styles.dialogFooter}>
            <button className={styles.primaryActionBtn} type="button">
              変更を保存
            </button>
          </div>
        </aside>
      </div>
    );
  }

  if (variantId === 'bottom') {
    return (
      <div className={styles.bottomSheetFrame}>
        <section aria-label="共有オプション" className={styles.bottomSheet}>
          <div aria-hidden="true" className={styles.sheetHandle} />
          <div className={styles.dialogHeader}>
            <h3 className={styles.dialogTitle}>ドキュメントを共有</h3>
            <span className={styles.helperCaption}>リンクを知っているメンバーが閲覧できます</span>
          </div>
          <div className={styles.sheetActionStack}>
            <button className={styles.sheetActionBtn} type="button">
              🔗 共有リンクをコピー
            </button>
            <button className={styles.sheetActionBtn} type="button">
              📄 PDF として書き出す
            </button>
            <button className={styles.secondaryActionBtn} type="button">
              閉じる
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <aside aria-label="絞り込み条件ドロワー" className={styles.surfaceFrame}>
      <div className={styles.dialogHeaderRow}>
        <h3 className={styles.dialogTitle}>絞り込み条件</h3>
        <button className={styles.resetLinkBtn} type="button">
          すべてクリア
        </button>
      </div>
      <div className={styles.filterGroupStack}>
        <div className={styles.filterGroup}>
          <span className={styles.filterGroupLabel}>価格帯</span>
          <div className={styles.tagList}>
            <span className={clsx(styles.filterChip, styles.filterChipActive)}>✓ ¥5,000〜¥15,000</span>
            <span className={styles.filterChip}>¥15,000以上</span>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterGroupLabel}>在庫ステータス</span>
          <label className={styles.checkboxInline}>
            <input defaultChecked type="checkbox" />
            <span>在庫ありのみ表示</span>
          </label>
        </div>
      </div>
      <div className={styles.dialogFooter}>
        <button className={styles.secondaryActionBtn} type="button">
          キャンセル
        </button>
        <button className={styles.primaryActionBtn} type="button">
          42 件を表示
        </button>
      </div>
    </aside>
  );
}

function DropdownMenuVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'actions') {
    return (
      <div className={styles.menuContainer}>
        <button aria-expanded="true" aria-haspopup="menu" className={styles.menuTrigger} type="button">
          <span>ファイル操作</span>
          <span aria-hidden="true">▾</span>
        </button>
        <div aria-label="ファイル操作メニュー" className={styles.menuPopup} role="menu">
          <button className={styles.menuItem} role="menuitem" type="button">
            <span>開く</span>
            <kbd className={styles.menuShortcut}>⌘O</kbd>
          </button>
          <button className={styles.menuItem} role="menuitem" type="button">
            <span>名前を変更...</span>
            <kbd className={styles.menuShortcut}>⏎</kbd>
          </button>
          <button className={styles.menuItem} role="menuitem" type="button">
            <span>複製を作成</span>
            <kbd className={styles.menuShortcut}>⌘D</kbd>
          </button>
        </div>
      </div>
    );
  }

  if (variantId === 'grouped') {
    return (
      <div className={styles.menuContainer}>
        <button aria-expanded="true" aria-haspopup="menu" className={styles.menuTrigger} type="button">
          <span>表示設定</span>
          <span aria-hidden="true">▾</span>
        </button>
        <div aria-label="表示設定メニュー" className={styles.menuPopup} role="menu">
          <div className={styles.menuGroupLabel}>表示オプション</div>
          <button className={styles.menuItem} role="menuitem" type="button">
            <span>コンパクト表示</span>
            <span className={styles.menuCheck}>✓</span>
          </button>
          <button className={styles.menuItem} role="menuitem" type="button">
            <span>更新日順で並び替え</span>
          </button>
          <div className={styles.menuDivider} role="separator" />
          <div className={styles.menuGroupLabel}>ワークスペース</div>
          <button className={styles.menuItem} role="menuitem" type="button">
            <span>表示列をカスタマイズ...</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.menuContainer}>
      <button aria-expanded="true" aria-haspopup="menu" className={styles.menuTrigger} type="button">
        <span>その他操作</span>
        <span aria-hidden="true">•••</span>
      </button>
      <div aria-label="プロジェクト操作メニュー" className={styles.menuPopup} role="menu">
        <button className={styles.menuItem} role="menuitem" type="button">
          <span>共有リンクをコピー</span>
        </button>
        <button className={styles.menuItem} role="menuitem" type="button">
          <span>アーカイブへ移動</span>
        </button>
        <div className={styles.menuDivider} role="separator" />
        <button className={clsx(styles.menuItem, styles.menuItemDanger)} role="menuitem" type="button">
          <span>プロジェクトを削除...</span>
          <span aria-hidden="true">⌫</span>
        </button>
      </div>
    </div>
  );
}

function HoverCardVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'profile') {
    return (
      <div className={styles.overlayStack}>
        <div className={styles.triggerLine}>
          レビュアー: <span className={styles.mentionPill}>@aoi.sato</span>
        </div>
        <div aria-label="佐藤 葵のプロフィール" className={styles.hoverCardSurface} role="region">
          <div className={styles.profileHeader}>
            <span aria-hidden="true" className={styles.avatarCircle}>
              AS
            </span>
            <div className={styles.profileMeta}>
              <strong>佐藤 葵</strong>
              <span>リードプロダクトデザイナー</span>
            </div>
          </div>
          <p className={styles.cardText}>
            デザインシステム・アクセシビリティ基盤を担当。東京オフィス在籍。
          </p>
          <div className={styles.profileStatsRow}>
            <span>
              公開パターン <strong>12件</strong>
            </span>
            <span>
              レビュー完了 <strong>48件</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variantId === 'term') {
    return (
      <div className={styles.overlayStack}>
        <p className={styles.triggerLine}>
          カスタム UI では <span className={styles.termUnderline}>WAI-ARIA</span> 属性で意味を補います。
        </p>
        <div aria-label="WAI-ARIA の用語解説" className={styles.hoverCardSurface} role="note">
          <div className={styles.horizontalHeader}>
            <strong>WAI-ARIA</strong>
            <span className={styles.infoBadge}>用語解説</span>
          </div>
          <p className={styles.cardText}>
            HTML だけでは表現しきれないカスタム UI の役割（role）や開閉・選択状態（aria-expanded 等）を支援技術へ伝える仕様です。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlayStack}>
      <div className={styles.triggerLine}>
        添付: <span className={styles.fileLinkText}>📄 2026年度_エンタープライズ見積書.pdf</span>
      </div>
      <div aria-label="ファイル概要" className={styles.hoverCardSurface} role="region">
        <div className={styles.horizontalHeader}>
          <span className={styles.cardEyebrow}>PDF ・ 1.4 MB</span>
          <span className={styles.warningBadge}>承認待ち</span>
        </div>
        <strong className={styles.cardTitle}>2026年度_エンタープライズ見積書.pdf</strong>
        <p className={styles.cardText}>最終更新: 2時間前（経理チーム 鈴木） / 有効期限: 2026年12月末</p>
      </div>
    </div>
  );
}

function NavigationMenuVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'horizontal') {
    return (
      <nav aria-label="メインナビゲーション" className={styles.horizontalNav}>
        <span className={styles.navBrand}>PatternLab</span>
        <ul className={styles.horizontalNavList}>
          <li>
            <span aria-current="page" className={clsx(styles.navItem, styles.navItemActive)}>
              概要
            </span>
          </li>
          <li>
            <span className={styles.navItem}>プロダクト</span>
          </li>
          <li>
            <span className={styles.navItem}>料金プラン</span>
          </li>
          <li>
            <span className={styles.navItem}>サポート</span>
          </li>
        </ul>
      </nav>
    );
  }

  if (variantId === 'sidebar') {
    return (
      <nav aria-label="管理画面サイドバー" className={styles.sidebarNav}>
        <div className={styles.menuGroupLabel}>ワークスペース管理</div>
        <ul className={styles.sidebarNavList}>
          <li>
            <span aria-current="page" className={clsx(styles.sidebarNavItem, styles.sidebarNavItemActive)}>
              <span>ダッシュボード</span>
              <span className={styles.infoBadge}>新着</span>
            </span>
          </li>
          <li>
            <span className={styles.sidebarNavItem}>
              <span>メンバー・権限</span>
              <span className={styles.countPill}>24</span>
            </span>
          </li>
          <li>
            <span className={styles.sidebarNavItem}>
              <span>セキュリティ設定</span>
            </span>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="製品メガメニュー" className={styles.surfaceFrame}>
      <div className={styles.megaBar}>
        <span className={clsx(styles.navItem, styles.navItemActive)}>製品ラインナップ ▾</span>
        <span className={styles.navItem}>導入事例</span>
        <span className={styles.navItem}>ドキュメント</span>
      </div>
      <div className={styles.megaGrid}>
        <div className={styles.megaCard}>
          <strong>データ分析基盤</strong>
          <span>リアルタイム集計とコホート比較</span>
        </div>
        <div className={styles.megaCard}>
          <strong>ワークフロー自動化</strong>
          <span>承認ルールと通知トリガーの設計</span>
        </div>
        <div className={styles.megaCard}>
          <strong>外部サービス連携</strong>
          <span>Webhook・API・SSO コネクタ</span>
        </div>
      </div>
    </nav>
  );
}

function PopoverVariantPreview({variantId}: {variantId: string}): ReactNode {
  const [selectedPreset, setSelectedPreset] = useState('明日');

  if (variantId === 'quick-edit') {
    return (
      <div className={styles.overlayStack}>
        <button aria-expanded="true" className={styles.menuTrigger} type="button">
          <span>表示名: Team Alpha</span>
          <span aria-hidden="true">✎</span>
        </button>
        <div aria-label="表示名のクイック編集" className={styles.popoverSurface} role="dialog">
          <label className={styles.formField}>
            <span>ワークスペース表示名</span>
            <input defaultValue="Team Alpha" type="text" />
          </label>
          <div className={styles.dialogFooter}>
            <button className={styles.secondaryActionBtn} type="button">
              キャンセル
            </button>
            <button className={styles.primaryActionBtn} type="button">
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variantId === 'picker') {
    const presets = ['今日中', '明日', '来週月曜', '期限なし'] as const;
    return (
      <div className={styles.overlayStack}>
        <button aria-expanded="true" className={styles.menuTrigger} type="button">
          <span>📅 期限: {selectedPreset}</span>
          <span aria-hidden="true">▾</span>
        </button>
        <div aria-label="期限プリセット選択" className={styles.popoverSurface} role="dialog">
          <span className={styles.filterGroupLabel}>クイック期限設定</span>
          <div className={styles.presetGrid}>
            {presets.map((preset) => (
              <button
                aria-pressed={selectedPreset === preset}
                className={clsx(
                  styles.presetChoiceBtn,
                  selectedPreset === preset && styles.presetChoiceBtnActive,
                )}
                key={preset}
                onClick={() => setSelectedPreset(preset)}
                type="button">
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlayStack}>
      <div className={styles.triggerLine}>
        <span>ゲスト閲覧権限</span>
        <button aria-expanded="true" aria-label="ゲスト閲覧権限の説明" className={styles.helpCircleBtn} type="button">
          ?
        </button>
      </div>
      <div aria-label="権限の補足説明" className={styles.popoverSurface} role="dialog">
        <strong className={styles.cardTitle}>ゲスト閲覧権限とは？</strong>
        <p className={styles.cardText}>
          閲覧者はページとコメントの参照のみ可能で、設定変更やメンバー招待は行えません。
        </p>
        <span className={styles.fileLinkText}>権限マトリクスを詳しく見る →</span>
      </div>
    </div>
  );
}

function SeparatorVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'horizontal') {
    return (
      <div className={styles.surfaceFrame}>
        <div className={styles.sectionBlock}>
          <strong>プロフィール公開範囲</strong>
          <span className={styles.helperCaption}>チームメンバー全員に表示</span>
        </div>
        <hr className={styles.horizontalSeparator} />
        <div className={styles.sectionBlock}>
          <strong>メールダイジェスト通知</strong>
          <span className={styles.helperCaption}>毎週月曜 9:00 に送信</span>
        </div>
      </div>
    );
  }

  if (variantId === 'vertical') {
    return (
      <div aria-label="エディタ操作バー" className={styles.toolbarSurface} role="toolbar">
        <button className={styles.secondaryActionBtn} type="button">
          元に戻す
        </button>
        <button className={styles.secondaryActionBtn} type="button">
          やり直す
        </button>
        <span aria-orientation="vertical" className={styles.verticalSeparator} role="separator" />
        <button className={styles.secondaryActionBtn} type="button">
          下書き保存
        </button>
        <span aria-orientation="vertical" className={styles.verticalSeparator} role="separator" />
        <button className={styles.primaryActionBtn} type="button">
          公開する
        </button>
      </div>
    );
  }

  return (
    <div className={styles.surfaceFrame}>
      <div className={styles.labelledSeparator} role="separator">
        <span>今日 ・ 2026年11月20日</span>
      </div>
      <div className={styles.sectionBlock}>
        <strong>デザインシステム v2.4 を公開</strong>
        <span className={styles.helperCaption}>14:20 ・ 佐藤 葵</span>
      </div>
    </div>
  );
}

function SliderVariantPreview({variantId}: {variantId: string}): ReactNode {
  const [volume, setVolume] = useState(64);
  const [minPrice, setMinPrice] = useState(3000);
  const [maxPrice, setMaxPrice] = useState(12000);
  const steps = ['コンパクト', '標準', 'ゆったり'] as const;
  const [stepIndex, setStepIndex] = useState(1);

  if (variantId === 'single') {
    return (
      <div className={styles.surfaceFrame}>
        <div className={styles.sliderHeader}>
          <span>通知音量</span>
          <output className={styles.sliderValuePill}>{volume}%</output>
        </div>
        <input
          aria-label="通知音量"
          className={styles.range}
          max={100}
          min={0}
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          value={volume}
        />
        <div className={styles.sliderFooter}>
          <span>0%（ミュート）</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    );
  }

  if (variantId === 'range') {
    return (
      <div className={styles.surfaceFrame}>
        <div className={styles.sliderHeader}>
          <span>予算レンジ</span>
          <strong className={styles.sliderValuePill}>
            ¥{minPrice.toLocaleString()} 〜 ¥{maxPrice.toLocaleString()}
          </strong>
        </div>
        <div className={styles.dualSliderGrid}>
          <label className={styles.subSliderRow}>
            <span>下限</span>
            <input
              aria-label="予算の下限"
              className={styles.range}
              max={maxPrice - 1000}
              min={0}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              step={1000}
              type="range"
              value={minPrice}
            />
          </label>
          <label className={styles.subSliderRow}>
            <span>上限</span>
            <input
              aria-label="予算の上限"
              className={styles.range}
              max={20000}
              min={minPrice + 1000}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              step={1000}
              type="range"
              value={maxPrice}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.surfaceFrame}>
      <div className={styles.sliderHeader}>
        <span>表示密度</span>
        <output className={styles.sliderValuePill}>{steps[stepIndex]}</output>
      </div>
      <input
        aria-label="表示密度"
        aria-valuetext={steps[stepIndex]}
        className={styles.range}
        max={2}
        min={0}
        onChange={(e) => setStepIndex(Number(e.target.value))}
        step={1}
        type="range"
        value={stepIndex}
      />
      <div className={styles.sliderFooter}>
        {steps.map((label, idx) => (
          <span className={clsx(idx === stepIndex && styles.activeStepTick)} key={label}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function TextareaVariantPreview({variantId}: {variantId: string}): ReactNode {
  const [autoGrowText, setAutoGrowText] = useState(
    '1行目: プロジェクト背景\n2行目: 対象ユーザーと利用シナリオ\n3行目: 改行すると行数に合わせて領域が広がります。',
  );
  const [feedback, setFeedback] = useState('UI の余白について');

  if (variantId === 'fixed') {
    return (
      <div className={styles.surfaceFrame}>
        <div className={styles.horizontalHeader}>
          <strong className={styles.fieldLabelText}>レビューコメント</strong>
          <span className={styles.countPill}>3行固定 ・ 任意</span>
        </div>
        <textarea
          aria-label="レビューコメント"
          className={styles.textareaControl}
          defaultValue="見出しと本文のコントラスト比が改善され、モバイルでも読みやすくなっています。"
          rows={3}
        />
        <span className={styles.helperCaption}>Markdown 記法（太字・リスト）を利用できます。</span>
      </div>
    );
  }

  if (variantId === 'auto-grow') {
    const lineCount = Math.min(8, Math.max(3, autoGrowText.split('\n').length + 1));
    return (
      <div className={styles.surfaceFrame}>
        <div className={styles.horizontalHeader}>
          <strong className={styles.fieldLabelText}>機能仕様の要約</strong>
          <span className={styles.infoBadge}>現在 {lineCount} 行（最大 8 行）</span>
        </div>
        <textarea
          aria-label="機能仕様の要約"
          className={clsx(styles.textareaControl, styles.textareaAutoGrow)}
          onChange={(e) => setAutoGrowText(e.target.value)}
          rows={lineCount}
          value={autoGrowText}
        />
        <span className={styles.helperCaption}>改行を追加すると最大 8 行まで自動で高さが拡張されます。</span>
      </div>
    );
  }

  const isTooShort = feedback.trim().length < 20;
  return (
    <div className={clsx(styles.surfaceFrame, isTooShort && styles.surfaceFrameError)}>
      <div className={styles.horizontalHeader}>
        <strong className={styles.fieldLabelText}>改善フィードバック（20文字以上）</strong>
        <span className={styles.dangerBadge}>必須</span>
      </div>
      <textarea
        aria-invalid={isTooShort}
        aria-label="改善フィードバック"
        className={clsx(styles.textareaControl, isTooShort && styles.textareaControlError)}
        maxLength={200}
        onChange={(e) => setFeedback(e.target.value)}
        rows={3}
        value={feedback}
      />
      <div className={styles.horizontalHeader}>
        <span className={isTooShort ? styles.errorText : styles.helperCaption}>
          {isTooShort
            ? '具体的な再現手順を含めて 20 文字以上で入力してください。'
            : '入力条件を満たしています。'}
        </span>
        <span className={styles.helperCaption}>{feedback.length} / 200</span>
      </div>
    </div>
  );
}

function ToastSnackbarVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'success') {
    return (
      <div aria-live="polite" className={styles.toastSurface} role="status">
        <span aria-hidden="true" className={styles.toastSuccessIcon}>
          ✓
        </span>
        <div className={styles.toastBody}>
          <strong>通知設定を保存しました</strong>
          <span>変更はすべての端末へ即時反映されます</span>
        </div>
        <span className={styles.fileLinkText}>今すぐ確認</span>
        <button aria-label="通知を閉じる" className={styles.iconCloseBtn} type="button">
          ×
        </button>
      </div>
    );
  }

  if (variantId === 'undo') {
    return (
      <div aria-live="polite" className={styles.snackbarSurface} role="status">
        <span>スレッド「Q4 リリース計画」をアーカイブしました</span>
        <div className={styles.snackbarActions}>
          <button className={styles.undoActionBtn} type="button">
            元に戻す
          </button>
          <button aria-label="閉じる" className={styles.snackbarCloseBtn} type="button">
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div aria-label="通知スタック" className={styles.toastStack}>
      <div className={styles.stackCardPrimary} role="status">
        <span aria-hidden="true" className={styles.stackDotActive} />
        <div className={styles.toastBody}>
          <strong>3 名への招待メールを送信しました</strong>
          <span>たった今 ・ メンバー管理</span>
        </div>
      </div>
      <div className={styles.stackCardSecondary} role="status">
        <span aria-hidden="true" className={styles.stackDotMuted} />
        <div className={styles.toastBody}>
          <strong>デザインレビューに新しいコメントが追加されました</strong>
          <span>1分前 ・ #ui-review</span>
        </div>
      </div>
      <div className={styles.stackCardTertiary} role="status">
        <span aria-hidden="true" className={styles.stackDotMuted} />
        <div className={styles.toastBody}>
          <strong>クラウド同期が完了しました</strong>
          <span>3分前 ・ バックグラウンド処理</span>
        </div>
      </div>
    </div>
  );
}

function TooltipVariantPreview({variantId}: {variantId: string}): ReactNode {
  if (variantId === 'icon-label') {
    return (
      <div className={styles.surfaceFrame}>
        <div className={styles.tooltipDemoRow}>
          <div className={styles.tooltipAnchor}>
            <span className={styles.tooltipBubble} role="tooltip">
              変更を保存 (⌘S)
            </span>
            <button aria-label="変更を保存" className={styles.iconActionBtn} type="button">
              💾
            </button>
          </div>
          <button aria-label="共有リンクを作成" className={styles.iconActionBtn} type="button">
            🔗
          </button>
          <button aria-label="項目を削除" className={styles.iconActionBtn} type="button">
            🗑️
          </button>
        </div>
      </div>
    );
  }

  if (variantId === 'disabled-reason') {
    return (
      <div className={styles.surfaceFrame}>
        <div className={styles.disabledTooltipStack}>
          <span className={styles.tooltipBubble} role="tooltip">
            公開には管理者権限と必須項目の入力が必要です
          </span>
          <div className={styles.triggerLine}>
            <button aria-disabled="true" className={styles.disabledPrimaryBtn} type="button">
              本番環境へ公開
            </button>
            <span className={styles.warningBadge}>権限不足</span>
          </div>
        </div>
      </div>
    );
  }

  const placements = [
    {id: 'top', label: '上 (Top)'},
    {id: 'right', label: '右 (Right)'},
    {id: 'bottom', label: '下 (Bottom)'},
    {id: 'left', label: '左 (Left)'},
  ] as const;

  return (
    <div className={styles.placementGrid}>
      {placements.map((item) => (
        <div className={styles.placementCell} key={item.id}>
          <span className={styles.placementTarget}>基準ボタン</span>
          <span className={styles.tooltipBubble} role="tooltip">
            {item.label} に表示
          </span>
        </div>
      ))}
    </div>
  );
}

function renderPreview(
  categoryId: TodoPatternCategoryId,
  variantId: string,
): ReactNode {
  switch (categoryId) {
    case 'breadcrumb':
      return <BreadcrumbVariantPreview variantId={variantId} />;
    case 'card':
      return <CardVariantPreview variantId={variantId} />;
    case 'chip-tag':
      return <ChipTagVariantPreview variantId={variantId} />;
    case 'dialog-modal':
      return <DialogModalVariantPreview variantId={variantId} />;
    case 'drawer-sheet':
      return <DrawerSheetVariantPreview variantId={variantId} />;
    case 'dropdown-menu':
      return <DropdownMenuVariantPreview variantId={variantId} />;
    case 'hover-card':
      return <HoverCardVariantPreview variantId={variantId} />;
    case 'navigation-menu':
      return <NavigationMenuVariantPreview variantId={variantId} />;
    case 'popover':
      return <PopoverVariantPreview variantId={variantId} />;
    case 'separator':
      return <SeparatorVariantPreview variantId={variantId} />;
    case 'slider':
      return <SliderVariantPreview variantId={variantId} />;
    case 'textarea':
      return <TextareaVariantPreview variantId={variantId} />;
    case 'toast-snackbar':
      return <ToastSnackbarVariantPreview variantId={variantId} />;
    case 'tooltip':
      return <TooltipVariantPreview variantId={variantId} />;
    default:
      return assertNever(categoryId);
  }
}

/** Renders a detail page with one independent preview and code panel per variant. */
export default function TodoPatternDetailContent({categoryId, entryId}: Props): ReactNode {
  const category = todoPatternCategoryMap[categoryId];
  const entry = category.entries.find((candidate) => candidate.id === entryId);

  if (!entry) {
    return null;
  }

  const variants: readonly PatternReferenceVariant[] = entry.variants.map((variant) => ({
    id: variant.id,
    name: variant.title,
    description: variant.summary,
    preview: renderPreview(category.id, variant.id),
    tabs: buildReferenceCodeTabs([
      {
        id: 'tsx',
        label: 'TSX',
        language: 'tsx',
        code: variant.tsx,
        note: `${variant.title} の構造とセマンティクス例です。`,
      },
      {
        id: 'css',
        label: 'CSS',
        language: 'css',
        code: variant.css,
        note: `${variant.title} のカスタムスタイル例です。`,
      },
    ]),
  }));

  return (
    <main className={styles.root}>
      <section className={`container margin-vert--lg ${styles.header}`}>
        <nav aria-label="戻るリンク">
          <Link className={styles.backLink} to={`/${category.slug}`}>
            <span aria-hidden="true">←</span>
            <span>{category.label}カテゴリへ戻る</span>
          </Link>
        </nav>
        <p className={styles.eyebrow}>リファレンス</p>
        <Heading as="h1">{entry.title}</Heading>
        <p className={styles.summary}>{entry.summary}</p>
      </section>

      <section className={`container margin-bottom--lg ${styles.notesGrid}`}>
        <article>
          <p className={styles.noteLabel}>課題</p>
          <p>{entry.problem}</p>
        </article>
        <article>
          <p className={styles.noteLabel}>設計方針</p>
          <p>{entry.solution}</p>
        </article>
        <article>
          <p className={styles.noteLabel}>アクセシビリティ</p>
          <p>{entry.accessibilityNote}</p>
        </article>
      </section>

      <section className="container margin-bottom--xl">
        <PatternReferenceContent
          notes={[
            {id: 'problem', label: '課題', value: entry.problem},
            {id: 'solution', label: '解決方法', value: entry.solution},
            {
              id: 'accessibility',
              label: 'アクセシビリティ',
              value: entry.accessibilityNote,
            },
          ]}
          variantNote="各バリアントは 1 variant block : 1 code panel として、独立したカスタム UI プレビューと TSX / CSS コードパネルに分けています。"
          variantSectionLabel="バリアント"
          variants={variants}
        />
      </section>
    </main>
  );
}
