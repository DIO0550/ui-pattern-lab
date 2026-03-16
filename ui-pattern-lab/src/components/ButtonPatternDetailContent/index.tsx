import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ButtonPatternGallery from '@site/src/components/ButtonPatternGallery';
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

  return (
    <div className={`container margin-vert--lg ${styles.root}`}>
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
      <ButtonPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
