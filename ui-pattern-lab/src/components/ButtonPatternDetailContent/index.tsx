import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ButtonPatternGallery from '@site/src/components/ButtonPatternGallery';
import ButtonGroupReferenceContent from '@site/src/components/ButtonGroupReferenceContent';
import ButtonToolbarReferenceContent from '@site/src/components/ButtonToolbarReferenceContent';
import DestructiveButtonReferenceContent from '@site/src/components/DestructiveButtonReferenceContent';
import HierarchyButtonReferenceContent from '@site/src/components/HierarchyButtonReferenceContent';
import IconAndCompoundReferenceContent from '@site/src/components/IconAndCompoundReferenceContent';
import InteractiveStatesReferenceContent from '@site/src/components/InteractiveStatesReferenceContent';
import SpacingAndSizingReferenceContent from '@site/src/components/SpacingAndSizingReferenceContent';
import ToggleAndSelectionReferenceContent from '@site/src/components/ToggleAndSelectionReferenceContent';
import {buttonPatternEntries} from '@site/src/data/buttonPatternEntries';
import type {ButtonPatternEntryId} from '@site/src/data/buttonPatternTypes';

import styles from './styles.module.css';

type ButtonPatternDetailContentProps = {
  entryId: ButtonPatternEntryId;
};

export default function ButtonPatternDetailContent({
  entryId,
}: ButtonPatternDetailContentProps): ReactNode {
  const entry = buttonPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown button pattern entry: ${entryId}`);
  }

  const showSelectorReference = entry.id === 'toggle-and-selection';
  const showButtonGroupReference = entry.id === 'button-group';
  const showButtonToolbarReference = entry.id === 'button-toolbar';

  const detailContent =
    entry.id === 'destructive-actions' ? (
      <DestructiveButtonReferenceContent entry={entry} />
    ) : entry.id === 'hierarchy-and-emphasis' ? (
      <HierarchyButtonReferenceContent entry={entry} />
    ) : entry.id === 'interactive-states' ? (
      <InteractiveStatesReferenceContent entry={entry} />
    ) : entry.id === 'icon-and-compound-actions' ? (
      <IconAndCompoundReferenceContent entry={entry} />
    ) : entry.id === 'button-group' ? (
      <ButtonGroupReferenceContent entry={entry} />
    ) : entry.id === 'button-toolbar' ? (
      <ButtonToolbarReferenceContent entry={entry} />
    ) : entry.id === 'toggle-and-selection' ? (
      <ToggleAndSelectionReferenceContent entry={entry} />
    ) : entry.id === 'spacing-and-sizing' ? (
      <SpacingAndSizingReferenceContent entry={entry} />
    ) : (
      <ButtonPatternGallery density="detail" entries={[entry]} />
    );

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/button">ボタン</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/button-designs">ボタンデザインパターン</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview に加えて、対応する CSS / TSX
        サンプルと設計メモをまとめて確認できます。比較一覧へ戻る場合は
        {' '}
        <Link to="/patterns/button-designs">ボタンデザインパターン</Link>
        、カテゴリ全体へ戻る場合は <Link to="/button">ボタン</Link> を参照してください。
      </p>
      {showSelectorReference ? (
        <p className={styles.contextNote}>
          1 つの form value を選ぶ radio / native select / combobox や、排他選択の radio card
          を扱いたい場合は{' '}
          <Link to="/patterns/selector-designs">セレクタデザインパターン</Link>{' '}
          を参照してください。toggle-and-selection では押した瞬間に状態や表示モードが変わる UI を扱います。
        </p>
      ) : null}
      {showButtonGroupReference ? (
        <p className={styles.contextNote}>
          button-group では複数ボタンのまとまりと役割分担を扱います。pressed の意味づけは{' '}
          <Link to="/button/toggle-and-selection">トグル・選択</Link>、icon-only や split button
          の individual affordance は{' '}
          <Link to="/button/icon-and-compound-actions">アイコン・複合アクション</Link>{' '}
          もあわせて参照してください。
        </p>
      ) : null}
      {showButtonToolbarReference ? (
        <p className={styles.contextNote}>
          ボタンツールバーでは複数 cluster を束ねる container を扱います。1 つの group 境界そのものは{' '}
          <Link to="/button/button-group">ボタングループ</Link>、input や結果件数が主役の toolbar は{' '}
          <Link to="/controller/sort-filter-toolbar">sort / filter toolbar</Link> を参照してください。
        </p>
      ) : null}
      {detailContent}
    </div>
  );
}
