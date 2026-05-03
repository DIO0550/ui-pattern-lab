import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import AvatarReferenceContent from '@site/src/components/AvatarReferenceContent';
import {avatarPatternEntries} from '@site/src/data/avatarPatternEntries';
import type {AvatarPatternEntryId} from '@site/src/data/avatarPatternTypes';

import styles from './styles.module.css';

const AVATAR_CATEGORY_PATH = '/avatar';
const AVATAR_PATTERN_PAGE_PATH = '/patterns/avatar-designs';

type Props = {
  entryId: AvatarPatternEntryId;
};

/** Renders the detail shell for one avatar pattern page. */
export default function AvatarPatternDetailContent({entryId}: Props): ReactNode {
  const entry = avatarPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown avatar pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <nav aria-label="パンくず">
        <ol className={styles.backLinks}>
          <li>
            <Link to={AVATAR_CATEGORY_PATH}>アバター</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li>
            <Link to={AVATAR_PATTERN_PAGE_PATH}>アバターデザインパターン</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li aria-current="page">{entry.title}</li>
        </ol>
      </nav>
      <p className={styles.lead}>
        このページでは「{entry.title}」の variant preview と、対応する TSX / CSS
        サンプルを確認できます。一覧へ戻る場合は{' '}
        <Link to={AVATAR_PATTERN_PAGE_PATH}>アバターデザインパターン</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to={AVATAR_CATEGORY_PATH}>アバター</Link> を参照してください。
      </p>
      <p className={styles.contextNote}>
        Avatar 本体は主体の識別に責務を絞ります。オンライン状態、承認状態、件数などは indicator や{' '}
        <Link to="/badge">バッジ</Link> として近接配置してください。
      </p>
      <AvatarReferenceContent entry={entry} />
    </div>
  );
}
