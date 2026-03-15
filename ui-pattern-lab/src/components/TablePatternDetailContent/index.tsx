import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import TablePatternGallery from '@site/src/components/TablePatternGallery';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';

type TablePatternDetailContentProps = {
  entryId: string;
};

export default function TablePatternDetailContent({
  entryId,
}: TablePatternDetailContentProps): ReactNode {
  const entry = tablePatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown table pattern entry: ${entryId}`);
  }

  return (
    <div className="container margin-vert--lg">
      <p>
        このページでは「{entry.title}」を個別に確認できます。テーブルカテゴリへ
        戻る場合は <Link to="/table">テーブル</Link> を参照してください。
      </p>
      <TablePatternGallery entries={[entry]} />
    </div>
  );
}
