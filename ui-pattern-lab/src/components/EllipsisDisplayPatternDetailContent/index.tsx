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
        <Link to="/ellipsis-display">表示制限カテゴリ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/ellipsis-display-designs">行動パターン比較</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の行動ルールに加えて、visual variation ごとの preview と対応する
        CSS / TSX サンプル、設計メモをまとめて確認できます。比較一覧へ戻る場合は{' '}
        <Link to="/patterns/ellipsis-display-designs">表示制限パターン</Link>
        、カテゴリ全体へ戻る場合は <Link to="/ellipsis-display">表示制限カテゴリ</Link>
        を参照してください。
      </p>
      <EllipsisDisplayPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
