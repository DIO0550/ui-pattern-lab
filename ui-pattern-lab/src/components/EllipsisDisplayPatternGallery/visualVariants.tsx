import type {ReactNode} from 'react';
import {useId, useState} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import {getEllipsisDisplayVisualVariantSnippets} from '@site/src/data/ellipsisDisplayPatternSnippets';
import type {EllipsisDisplayPatternEntryId} from '@site/src/data/ellipsisDisplayPatternTypes';

import styles from './styles.module.css';

function buildVariant(
  entryId: EllipsisDisplayPatternEntryId,
  variantId: string,
  name: string,
  description: string,
  preview: ReactNode,
  previewClassName?: string,
): PatternReferenceVariant {
  return {
    id: variantId,
    name,
    description,
    preview,
    previewClassName,
    tabs: buildReferenceCodeTabs(
      getEllipsisDisplayVisualVariantSnippets(entryId, variantId).items,
    ),
  };
}

function PillToggleDisclosurePreview(): ReactNode {
  const reactId = useId();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const panelId = `pill-toggle-panel-${reactId}`;
  const statusId = `pill-toggle-status-${reactId}`;
  const buttonId = `pill-toggle-button-${reactId}`;

  return (
    <article className={clsx(styles.disclosureCard, styles.pillDisclosureCard)}>
      <p className={styles.disclosureSummary}>
        契約更新の概要だけ先に表示し、例外条件や担当窓口を含む全文は必要なときだけ開きます。
      </p>
      <div className={styles.pillToggleRow}>
        <button
          aria-controls={panelId}
          aria-describedby={statusId}
          aria-expanded={isOpen}
          className={styles.pillDisclosureButton}
          id={buttonId}
          onClick={() => setIsOpen((current) => !current)}
          type="button">
          <span>{isOpen ? '全文を閉じる' : '全文を表示'}</span>
          <span
            aria-hidden="true"
            className={clsx(
              styles.disclosureButtonIcon,
              isOpen && styles.disclosureButtonIconOpen,
            )}>
            ▾
          </span>
        </button>
        <span className={styles.pillStatusBadge}>{isOpen ? '表示中' : '要約のみ'}</span>
      </div>
      <p
        aria-live="polite"
        className={styles.disclosureStatus}
        id={statusId}>
        {isOpen ? '現在: 全文を表示中です。' : '現在: 要約のみを表示しています。'}
      </p>
      <div
        aria-labelledby={buttonId}
        className={styles.disclosurePanel}
        hidden={!isOpen}
        id={panelId}
        role="region">
        <span className={styles.disclosureLabel}>全文</span>
        <p className={styles.disclosureText}>
          対象顧客、移行タイミング、例外条件、担当窓口、切り戻し時の連絡先を含む完全な文面をここで確認できます。
        </p>
      </div>
    </article>
  );
}

function buildSingleLineVariants(): readonly PatternReferenceVariant[] {
  return [
    buildVariant(
      'single-line-ellipsis',
      'single-line-notification-title',
      '通知タイトル',
      '詳細画面への全文導線を残したまま、一覧の高さを 1 行へそろえる基本形です。',
      (
        <article className={styles.singleLineCard}>
          <span className={styles.singleLineLabel}>通知タイトル</span>
          <p className={styles.singleLineValue}>
            支払い条件の更新に伴う請求タイミング調整のご案内
          </p>
          <p className={styles.singleLineMeta}>詳細画面で全文を確認</p>
        </article>
      ),
    ),
    buildVariant(
      'single-line-ellipsis',
      'single-line-project-name',
      'プロジェクト名',
      'カード見出しを 1 行へ統一し、比較しやすい縦リズムを保つ variation です。',
      (
        <article className={styles.singleLineCard}>
          <span className={styles.singleLineLabel}>プロジェクト名</span>
          <p className={styles.singleLineValue}>
            北陸エリア向けオンボーディング手順と FAQ 再編のドラフト
          </p>
          <p className={styles.singleLineMeta}>一覧では 1 行に統一</p>
        </article>
      ),
    ),
    buildVariant(
      'single-line-ellipsis',
      'single-line-shared-link',
      '共有リンク',
      '長い英数字や slug でも折り返さずに扱い、行高を増やさない例です。',
      (
        <article className={styles.singleLineCard}>
          <span className={styles.singleLineLabel}>共有リンク</span>
          <p className={styles.singleLineValue}>
            release-note-approval-and-customer-handoff-plan-v2026-final
          </p>
          <p className={styles.singleLineMeta}>長い英数字も折り返さず省略</p>
        </article>
      ),
    ),
    buildVariant(
      'single-line-ellipsis',
      'single-line-fixed-label-row',
      '固定幅ラベル列',
      'ラベルと値を 2 カラムで分け、ラベル幅を崩さずに値側だけを省略する基本レイアウトです。',
      (
        <article className={styles.singleLineCard}>
          <span className={styles.singleLineLabel}>固定幅ラベル列</span>
          <div className={styles.responsiveLineRow}>
            <span className={styles.responsiveLinePrefix}>件名</span>
            <p className={styles.responsiveLineValue}>
              共有前の確認事項を含む案内文を 1 行にそろえて表示します。
            </p>
          </div>
          <p className={styles.singleLineMeta}>ラベル幅を固定して情報密度を保つ</p>
        </article>
      ),
    ),
    buildVariant(
      'single-line-ellipsis',
      'single-line-responsive-panel',
      '可変幅パネル',
      '分割ビューや可変幅 panel でも省略位置を追従させる responsive variation です。',
      (
        <div className={styles.resizableFrame}>
          <article className={styles.singleLineCard}>
            <span className={styles.singleLineLabel}>可変幅の行</span>
            <div className={styles.responsiveLineRow}>
              <span className={styles.responsiveLinePrefix}>件名</span>
              <p className={styles.responsiveLineValue}>
                横幅が変わる分割ビューでも、契約更新の案内文を 1 行のまま保ちながら省略位置を追従させます。
              </p>
            </div>
            <p className={styles.singleLineMeta}>ドラッグで横幅を変えると省略位置も追従</p>
          </article>
        </div>
      ),
    ),
    buildVariant(
      'single-line-ellipsis',
      'gradient-fade-label-row',
      'gradient fade label row',
      '末尾の記号を強く出さず、フェードで切れ感を見せる 1 行 variation です。',
      (
        <article className={styles.singleLineCard}>
          <div className={styles.fadeRow}>
            <span className={styles.singleLineLabel}>依頼内容</span>
            <p className={styles.fadeValue}>
              監査ログの公開範囲と通知文面の確定版を一覧内で確認するための調整メモ
            </p>
            <span className={styles.gradientMeta}>確認待ち</span>
          </div>
          <p className={styles.singleLineMeta}>フェードで視線を止めすぎずに切れ感を見せる</p>
        </article>
      ),
    ),
    buildVariant(
      'single-line-ellipsis',
      'meta-chip-truncation',
      'meta chip truncation',
      '右端の補助 chip を固定し、中央テキストだけを省略する高密度 list 向け variation です。',
      (
        <article className={styles.singleLineCard}>
          <span className={styles.singleLineLabel}>レビュー対象</span>
          <div className={styles.chipRow}>
            <p className={styles.chipValue}>
              契約更新の例外条件と窓口一覧をまとめた社内共有文面
            </p>
            <span className={styles.chip}>要確認</span>
          </div>
          <p className={styles.singleLineMeta}>補助 chip を固定しても一覧の行高は変えない</p>
        </article>
      ),
    ),
  ] as const;
}

function buildMultiLineVariants(): readonly PatternReferenceVariant[] {
  return [
    buildVariant(
      'multi-line-clamp',
      'multi-line-short-summary',
      '短文の要約',
      '3 行クランプで card 高さをそろえる最も基本的な variation です。',
      (
        <article className={styles.clampCard}>
          <Heading as="h4" className={styles.clampTitle}>
            短文の要約
          </Heading>
          <p className={styles.clampSummary}>
            公開準備の前に承認と FAQ 更新を済ませ、短い要約だけ先に比較したいケースです。
          </p>
        </article>
      ),
    ),
    buildVariant(
      'multi-line-clamp',
      'multi-line-long-token',
      '長大 token',
      '長い識別子や参照番号を含んでも、3 行以内で比較しやすく保つ variation です。',
      (
        <article className={styles.clampCard}>
          <Heading as="h4" className={styles.clampTitle}>
            長大 token
          </Heading>
          <p className={styles.clampSummary}>
            公開メモでは INV-2026-Q1-SUPER-LONG-CUSTOMER-REFERENCE-AAAAAAAAAAAAAAAA を含む補足も読みたいものの、
            一覧では 3 行に抑えて比較したいケースです。
          </p>
        </article>
      ),
    ),
    buildVariant(
      'multi-line-clamp',
      'multi-line-multilingual',
      '多言語混在',
      '日本語と英語が混在する説明文でも高さ差を抑える variation です。',
      (
        <article className={styles.clampCard}>
          <Heading as="h4" className={styles.clampTitle}>
            多言語混在
          </Heading>
          <p className={styles.clampSummary}>
            日本語の説明を中心にしつつ English release note と API status memo を同じカードで扱い、
            密度を保ったまま比較したいケースです。
          </p>
        </article>
      ),
    ),
    buildVariant(
      'multi-line-clamp',
      'soft-card-clamp',
      'soft card clamp',
      '柔らかい surface と 3 行クランプを組み合わせ、情報量を残しつつ圧迫感を下げる variation です。',
      (
        <article className={clsx(styles.clampCard, styles.softClampCard)}>
          <span className={styles.gradientMeta}>公開予定</span>
          <Heading as="h4" className={styles.clampTitle}>
            soft card clamp
          </Heading>
          <p className={clsx(styles.clampSummary, styles.softClampSummary)}>
            リリースノートの補足文を柔らかい面の中にまとめ、一覧の高さ差を抑えながら 3 行分の文脈を残します。
          </p>
        </article>
      ),
    ),
    buildVariant(
      'multi-line-clamp',
      'dense-list-clamp',
      'dense list clamp',
      '高密度 list row の中で 2〜3 行の文脈だけを残す variation です。',
      (
        <div className={styles.denseList}>
          <article className={styles.denseRow}>
            <strong>運用メモ</strong>
            <p className={styles.denseRowSummary}>
              FAQ 更新前に対象顧客と例外連絡先だけ先に把握したいので、本文は 2 行だけ残して比較します。
            </p>
          </article>
          <article className={styles.denseRow}>
            <strong>確認事項</strong>
            <p className={styles.denseRowSummary}>
              監査ログの公開範囲と切り戻し条件を、一覧密度を崩さない範囲で 2 行にまとめて見せます。
            </p>
          </article>
        </div>
      ),
    ),
  ] as const;
}

function buildFullTextVariants(): readonly PatternReferenceVariant[] {
  return [
    buildVariant(
      'full-text-supplement',
      'full-text-contract-guide',
      '契約更新案内',
      '要約の下に全文補足を近接配置し、hover 依存にしない基本形です。',
      (
        <article className={styles.supplementCard}>
          <Heading as="h4" className={styles.supplementTitle}>
            契約更新案内
          </Heading>
          <p className={styles.supplementPreview}>
            契約更新の案内文は要約だけ先に表示し、完全な文面は同じカード内で補足します。
          </p>
          <div className={styles.supplementFullText}>
            <span className={styles.supplementLabel}>全文補足</span>
            <p className={styles.supplementText}>
              例外条件、担当窓口、切り戻しの連絡先を含む完全な文面も同じカード内で参照できます。
            </p>
          </div>
        </article>
      ),
    ),
    buildVariant(
      'full-text-supplement',
      'full-text-review-memo',
      '審査メモ',
      'レビュー待ちの要約と補足理由を同一 card にまとめる variation です。',
      (
        <article className={styles.supplementCard}>
          <Heading as="h4" className={styles.supplementTitle}>
            審査メモ
          </Heading>
          <p className={styles.supplementPreview}>
            レビュー待ちのメモは短い要約で一覧比較し、必要な詳細だけ近接した補足面で読みます。
          </p>
          <div className={styles.supplementFullText}>
            <span className={styles.supplementLabel}>全文補足</span>
            <p className={styles.supplementText}>
              判定理由や例外手順のように省略できない情報だけを、同じ card の下部へ展開します。
            </p>
          </div>
        </article>
      ),
    ),
    buildVariant(
      'full-text-supplement',
      'inline-note-panel',
      'inline note panel',
      '要約面と全文面を横並び panel に分け、視線移動を短くする variation です。',
      (
        <div className={styles.notePanels}>
          <article className={styles.notePanel}>
            <span className={styles.supplementLabel}>要約</span>
            <p className={styles.supplementText}>
              承認フローの要点だけを先に見せ、全文は隣の note panel に分けて表示します。
            </p>
          </article>
          <article className={styles.notePanel}>
            <span className={styles.supplementLabel}>全文補足</span>
            <p className={styles.supplementText}>
              例外条件、担当者、切り戻し手順、連絡先まで含む全文を近接 panel で確認できます。
            </p>
          </article>
        </div>
      ),
      styles.wideVariantSurface,
    ),
  ] as const;
}

function buildAccessibleVariants(): readonly PatternReferenceVariant[] {
  return [
    buildVariant(
      'accessible-disclosure',
      'pill-toggle-disclosure',
      'pill toggle disclosure',
      'pill 状のトリガーと状態表示を組み合わせ、要約から全文へ明示的に移動する variation です。',
      <PillToggleDisclosurePreview />,
    ),
  ] as const;
}

export function buildDisplayLimitVisualVariants(
  entryId: EllipsisDisplayPatternEntryId,
): readonly PatternReferenceVariant[] | null {
  switch (entryId) {
    case 'single-line-ellipsis':
      return buildSingleLineVariants();
    case 'multi-line-clamp':
      return buildMultiLineVariants();
    case 'full-text-supplement':
      return buildFullTextVariants();
    case 'accessible-disclosure':
      return buildAccessibleVariants();
    default:
      return null;
  }
}
