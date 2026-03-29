import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  CustomSelectPreview,
  PreviewCard,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function CustomSelectOutlineListboxDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="最小の trigger と grouped listbox で、自前描画 selector の操作モデルを固定します。"
          label="outline listbox">
          <CustomSelectPreview
            helperText="button、listbox、roving focus、outside click close を最小構造として揃えます。"
            initialValue="implementation"
            label="担当チーム"
            variant="outline"
          />
        </PreviewCard>
        <PreviewCard
          description="custom select の入口では、見た目より先に interaction contract を安定させるのが重要です。"
          label="設計メモ"
          className={styles.previewCardHiddenInDetail}>
          <div className={styles.selectionSummary}>
            <ul className={styles.summaryPillList}>
              <li className={styles.summaryPill}>button + listbox</li>
              <li className={styles.summaryPill}>group label</li>
              <li className={styles.summaryPill}>roving focus</li>
            </ul>
            <ul className={styles.specList}>
              <li className={styles.specItem}>
                native で足りるなら <Link to="/selector/native-select-compact-options">native select</Link>{' '}
                に戻す
              </li>
              <li className={styles.specItem}>見た目を増やす前に Home / End / Escape を固定する</li>
              <li className={styles.specItem}>検索が必要なら combobox family へ切り替える</li>
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        outline variation は custom select family の baseline です。soft / card variation も同じ
        keyboard contract の上に積みます。
      </p>
    </div>
  );
}
