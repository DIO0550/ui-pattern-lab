import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ListPatternGallery from '@site/src/components/ListPatternGallery';
import {listPatternEntries} from '@site/src/data/listPatternEntries';
import type {ListPatternEntryId} from '@site/src/data/listPatternTypes';

import styles from './styles.module.css';

type ListPatternDetailContentProps = {
  entryId: ListPatternEntryId;
};

export default function ListPatternDetailContent({
  entryId,
}: ListPatternDetailContentProps): ReactNode {
  const entry = listPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown list pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <div className={styles.backLinks}>
        <Link to="/list">リスト</Link>
        <span aria-hidden="true">/</span>
        <Link to="/patterns/list-designs">リスト比較一覧</Link>
      </div>
      <p className={styles.lead}>
        このページでは「{entry.title}」の preview と CSS / TSX サンプル、設計メモを 1
        つの variant block として確認できます。比較一覧へ戻る場合は{' '}
        <Link to="/patterns/list-designs">リスト比較一覧</Link>
        、カテゴリ全体へ戻る場合は <Link to="/list">リスト</Link> を参照してください。
      </p>
      <ListPatternGallery density="detail" entries={[entry]} />
    </div>
  );
}
