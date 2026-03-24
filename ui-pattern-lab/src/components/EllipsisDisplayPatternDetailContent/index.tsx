import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import EllipsisDisplayPatternGallery from '@site/src/components/EllipsisDisplayPatternGallery';
import {ellipsisDisplayPatternEntries} from '@site/src/data/ellipsisDisplayPatternEntries';
import type {EllipsisDisplayPatternEntryId} from '@site/src/data/ellipsisDisplayPatternTypes';

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
    <div className="container margin-vert--lg">
      <p className="margin-bottom--sm">
        <Link to="/ellipsis-display">省略表示カテゴリ</Link>
        {' / '}
        <Link to="/patterns/ellipsis-display-designs">パターン比較</Link>
      </p>
      <p>
        「{entry.title}」の preview、CSS / TSX 例、設計メモをまとめて確認できます。
      </p>
      <EllipsisDisplayPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
