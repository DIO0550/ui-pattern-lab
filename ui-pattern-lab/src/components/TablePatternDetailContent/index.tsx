import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import TablePatternGallery from '@site/src/components/TablePatternGallery';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';
import type {TablePatternEntryId} from '@site/src/data/tablePatternTypes';

import styles from './styles.module.css';

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
    <div className={`margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/table">テーブル</Link>
        <span aria-hidden="true">/</span>
        <Link to="/table">テーブル比較一覧</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview に加えて、対応する CSS / TSX
        サンプルと設計メモをまとめて確認できます。比較一覧へ戻る場合は{' '}
        <Link to="/table">テーブル比較一覧</Link>
        、カテゴリ全体へ戻る場合は <Link to="/table">テーブル</Link> を参照してください。
      </p>
      <TablePatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
