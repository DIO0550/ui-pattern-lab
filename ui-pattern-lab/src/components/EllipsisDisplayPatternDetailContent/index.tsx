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
        <Link to="/ellipsis-display">省略表示</Link>
        {' / '}
        <Link to="/patterns/ellipsis-display-designs">省略表示パターン比較</Link>
      </p>
      <p>
        このページでは「{entry.title}」の preview に加えて、対応する CSS / TSX
        例と設計メモをまとめて確認できます。比較一覧へ戻る場合は
        {' '}
        <Link to="/patterns/ellipsis-display-designs">省略表示パターン比較</Link>
        、カテゴリ入口へ戻る場合は <Link to="/ellipsis-display">省略表示</Link>
        {' '}を参照してください。
      </p>
      <EllipsisDisplayPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
