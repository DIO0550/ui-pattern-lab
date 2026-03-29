import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  CustomSelectPreview,
  PreviewCard,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function CustomSelectCardOptionsDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="card 風 option row で差分を強く見せつつ、開閉可能な listbox の責務にとどめる variation です。"
          label="card options">
          <CustomSelectPreview
            helperText="見た目は濃くても、radio card のような常時一覧比較とは切り分けます。"
            initialValue="field-sales"
            label="担当チーム"
            variant="card"
          />
        </PreviewCard>
        <PreviewCard
          description="option row が高密度になるほど、radio card や combobox との差分を明示しておく必要があります。"
          label="比較メモ"
          className={styles.previewCardHiddenInDetail}>
          <div className={styles.selectionSummary}>
            <ul className={styles.summaryPillList}>
              <li className={styles.summaryPill}>高密度 option row</li>
              <li className={styles.summaryPill}>selected badge</li>
              <li className={styles.summaryPill}>開いたときだけ比較</li>
            </ul>
            <ul className={styles.specList}>
              <li className={styles.specItem}>
                常時比較が価値なら <Link to="/selector/selectable-radio-cards">radio cards</Link> へ寄せる
              </li>
              <li className={styles.specItem}>検索や結果件数の説明が必要なら combobox へ切り替える</li>
              <li className={styles.specItem}>Esc と focus return のルールを崩さない</li>
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        card variation は表現力が高い一方で責務が膨らみやすいため、「開閉可能な single-select」に収めることが重要です。
      </p>
    </div>
  );
}
