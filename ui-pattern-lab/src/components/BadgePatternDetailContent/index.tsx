import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import TextAndNumberBadgeReferenceContent from '@site/src/components/TextAndNumberBadgeReferenceContent';
import {badgePatternEntries} from '@site/src/data/badgePatternEntries';
import type {BadgePatternEntryId} from '@site/src/data/badgePatternTypes';

import styles from './styles.module.css';

const BADGE_CATEGORY_PATH = '/badge';
const BADGE_PATTERN_PAGE_PATH = '/patterns/badge-designs';

type Props = {
  entryId: BadgePatternEntryId;
};

/** Renders the detail shell for one badge pattern page. */
export default function BadgePatternDetailContent({entryId}: Props): ReactNode {
  const entry = badgePatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown badge pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <nav aria-label="パンくず">
        <ol className={styles.backLinks}>
          <li>
            <Link to={BADGE_CATEGORY_PATH}>バッジ</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li>
            <Link to={BADGE_PATTERN_PAGE_PATH}>バッジデザインパターン</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li aria-current="page">{entry.title}</li>
        </ol>
      </nav>
      <p className={styles.lead}>
        このページでは「{entry.title}」の Filled / Outlined / Soft / Surface preview に加えて、対応する
        TSX / CSS サンプルと設計メモをまとめて確認できます。一覧へ戻る場合は{' '}
        <Link to={BADGE_PATTERN_PAGE_PATH}>バッジデザインパターン</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to={BADGE_CATEGORY_PATH}>バッジ</Link> を参照してください。
      </p>
      <p className={styles.contextNote}>
        ここで扱う badge は非インタラクティブな補足ラベルです。クリック、削除、選択の affordance
        を持たせたい場合は <Link to="/button">ボタン</Link> や{' '}
        <Link to="/button/icon-and-compound-actions">アイコン・複合アクション</Link>{' '}
        へ切り分けてください。
      </p>
      <TextAndNumberBadgeReferenceContent entry={entry} />
    </div>
  );
}
