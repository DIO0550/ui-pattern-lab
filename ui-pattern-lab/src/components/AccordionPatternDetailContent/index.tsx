import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import DisclosureAccordionReferenceContent from '@site/src/components/DisclosureAccordionReferenceContent';
import {accordionPatternEntries} from '@site/src/data/accordionPatternEntries';
import type {AccordionPatternEntryId} from '@site/src/data/accordionPatternTypes';

import styles from './styles.module.css';

const ACCORDION_CATEGORY_PATH = '/accordion';
const ACCORDION_PATTERN_PAGE_PATH = '/patterns/accordion-designs';

type Props = {
  entryId: AccordionPatternEntryId;
};

/** Renders the detail shell for one accordion pattern page. */
export default function AccordionPatternDetailContent({entryId}: Props): ReactNode {
  const entry = accordionPatternEntries.find((item) => item.id === entryId);

  if (!entry) {
    throw new Error(`Unknown accordion pattern entry: ${entryId}`);
  }

  return (
    <div className={`margin-vert--lg ${styles.root}`}>
      <nav aria-label="パンくず">
        <ol className={styles.backLinks}>
          <li>
            <Link to={ACCORDION_CATEGORY_PATH}>アコーディオン</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li>
            <Link to={ACCORDION_PATTERN_PAGE_PATH}>アコーディオンデザインパターン</Link>
          </li>
          <li aria-hidden="true" className={styles.backLinkDivider}>
            ›
          </li>
          <li aria-current="page">{entry.title}</li>
        </ol>
      </nav>
      <p className={styles.lead}>
        このページでは「{entry.title}」の単一開閉 / 複数開閉 / カード型 / FAQ 型 preview に加えて、対応する
        TSX / CSS サンプルと設計メモをまとめて確認できます。一覧へ戻る場合は{' '}
        <Link to={ACCORDION_PATTERN_PAGE_PATH}>アコーディオンデザインパターン</Link>、カテゴリ全体へ戻る場合は{' '}
        <Link to={ACCORDION_CATEGORY_PATH}>アコーディオン</Link> を参照してください。
      </p>
      <p className={styles.contextNote}>
        ここで扱う accordion は、同じ階層の情報を見出し単位で開閉する disclosure UI です。ページ全体の view
        を切り替える場合は <Link to="/tabs">タブ</Link>、長文の省略や全文表示が主題なら{' '}
        <Link to="/ellipsis-display">表示制限</Link> へ切り分けてください。
      </p>
      <DisclosureAccordionReferenceContent entry={entry} />
    </div>
  );
}
