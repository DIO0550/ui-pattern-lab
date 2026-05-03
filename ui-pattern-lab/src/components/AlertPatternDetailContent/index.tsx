import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ContextualAlertReferenceContent from '@site/src/components/ContextualAlertReferenceContent';
import {alertPatternEntries} from '@site/src/data/alertPatternEntries';
import type {AlertPatternEntryId} from '@site/src/data/alertPatternTypes';

import styles from './styles.module.css';

const ALERT_CATEGORY_PATH = '/alert';
const ALERT_PATTERN_PAGE_PATH = '/patterns/alert-designs';

type Props = {
  entryId: AlertPatternEntryId;
};

/** Renders the detail shell for one alert pattern page. */
export default function AlertPatternDetailContent({entryId}: Props): ReactNode {
  const entry = alertPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown alert pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <nav aria-label="パンくず">
        <ol className={styles.backLinks}>
          <li>
            <Link to={ALERT_CATEGORY_PATH}>アラート</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li>
            <Link to={ALERT_PATTERN_PAGE_PATH}>アラートデザインパターン</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li aria-current="page">{entry.title}</li>
        </ol>
      </nav>
      <p className={styles.lead}>
        このページでは「{entry.title}」の base / outlined / elevated / compact / action / dismissible
        preview に加えて、対応する TSX / CSS サンプルと設計メモをまとめて確認できます。一覧へ戻る場合は{' '}
        <Link to={ALERT_PATTERN_PAGE_PATH}>アラートデザインパターン</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to={ALERT_CATEGORY_PATH}>アラート</Link> を参照してください。
      </p>
      <p className={styles.contextNote}>
        ここで扱う Alert はページ内に残る feedback です。一時的に消える通知は toast、明示的な承認が必要な判断は
        dialog / modal へ切り分けてください。
      </p>
      <ContextualAlertReferenceContent entry={entry} />
    </div>
  );
}
