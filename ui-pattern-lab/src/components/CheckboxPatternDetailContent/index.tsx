import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import CheckboxPatternGallery from '@site/src/components/CheckboxPatternGallery';
import {checkboxPatternEntries} from '@site/src/data/checkboxPatternEntries';
import type {CheckboxPatternEntryId} from '@site/src/data/checkboxPatternTypes';

import styles from './styles.module.css';

type Props = {
  entryId: CheckboxPatternEntryId;
};

export default function CheckboxPatternDetailContent({entryId}: Props): ReactNode {
  const entry = checkboxPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown checkbox pattern entry: ${entryId}`);
  }

  const showToggleReference = entry.id === 'single-checkbox-and-indeterminate';
  const showSelectorReference = entry.id === 'selectable-cards';

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/checkbox">チェックボックス</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview に加えて、対応する CSS / TSX
        サンプルと設計メモをまとめて確認できます。比較一覧へ戻る場合は{' '}
        <Link to="/patterns/checkbox-designs">チェックボックスデザインパターン</Link>
        、カテゴリ全体へ戻る場合は <Link to="/checkbox">チェックボックス</Link>
        を参照してください。
      </p>
      {showSelectorReference ? (
        <p className={styles.contextNote}>
          card 見た目でも最終的に 1 つの field value を選ばせるなら{' '}
          <Link to="/selector/selectable-radio-cards">セレクタ / カード型の radio selection</Link>{' '}
          を参照してください。checkbox card では 0 件以上の複数選択と確認入力を優先します。
        </p>
      ) : null}
      {showToggleReference ? (
        <p className={styles.contextNote}>
          押下状態のトグル UI を見せたい場合は{' '}
          <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link>{' '}
          を参照してください。checkbox では送信前の確認や mixed state の表現を優先します。
        </p>
      ) : null}
      <CheckboxPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
