import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import TablePatternGallery from '@site/src/components/TablePatternGallery';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';
import type {TablePatternEntryId} from '@site/src/data/tablePatternTypes';

type TablePatternDetailContentProps = {
  entryId: TablePatternEntryId;
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
        このページでは「{entry.title}」のプレビューに加えて、対応する CSS /
        コード例もまとめて確認できます。比較一覧へ戻る場合は
        {' '}
        <Link to="/patterns/table-designs">テーブルデザインパターン</Link>
        、テーブルカテゴリ全体へ戻る場合は <Link to="/table">テーブル</Link>
        {' '}を参照してください。
      </p>
      <TablePatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
