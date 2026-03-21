import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  CustomSelectPreview,
  PreviewCard,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function CustomSelectSoftOptionsDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="supporting text と group token を option row に載せる soft surface の variation です。"
          label="soft options">
          <CustomSelectPreview
            helperText="selected / active の差に加え、supporting text の情報階層も保ちます。"
            initialValue="customer-success"
            label="担当チーム"
            variant="soft"
          />
        </PreviewCard>
        <PreviewCard
          description="説明文を載せても、single-select の責務と native との差分は明確にしておきます。"
          label="使いどころ">
          <div className={styles.selectionSummary}>
            <ul className={styles.summaryPillList}>
              <li className={styles.summaryPill}>supporting text</li>
              <li className={styles.summaryPill}>group token</li>
              <li className={styles.summaryPill}>single-select 維持</li>
            </ul>
            <ul className={styles.specList}>
              <li className={styles.specItem}>
                native select の説明不足だけを補いたいときに向く
              </li>
              <li className={styles.specItem}>
                常時比較が必要なら <Link to="/selector/selectable-radio-cards">radio cards</Link> を優先する
              </li>
              <li className={styles.specItem}>検索支援や表記揺れ吸収までは扱わない</li>
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        soft variation は情報密度を少し上げるだけにとどめ、option row が複数選択 UI に見えないようにします。
      </p>
    </div>
  );
}
