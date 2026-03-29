import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import EllipsisDisplayPatternGallery from '@site/src/components/EllipsisDisplayPatternGallery';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';
import type {EllipsisDisplayPatternEntryId} from '@site/src/data/ellipsisDisplayPatternTypes';

import styles from './styles.module.css';

type EllipsisDisplayPatternDetailContentProps = {
  entryId: EllipsisDisplayPatternEntryId;
};

export default function EllipsisDisplayPatternDetailContent({
  entryId,
}: EllipsisDisplayPatternDetailContentProps): ReactNode {
  const entry = ellipsisDisplayPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown ellipsis-display pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/ellipsis-display">省略表示カテゴリ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/ellipsis-display-designs">パターン比較</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview に加えて、対応する CSS / TSX
        サンプルと設計メモをまとめて確認できます。比較一覧へ戻る場合は{' '}
        <Link to="/patterns/ellipsis-display-designs">省略表示デザインパターン</Link>
        、カテゴリ全体へ戻る場合は <Link to="/ellipsis-display">省略表示カテゴリ</Link>
        を参照してください。
      </p>
      <EllipsisDisplayPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
