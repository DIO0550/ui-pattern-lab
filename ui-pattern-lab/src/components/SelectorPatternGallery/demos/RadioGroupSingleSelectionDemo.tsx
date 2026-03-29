import {useState, type ReactNode} from 'react';
import {
  PreviewCard,
  SelectorField,
  radioOptions,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function RadioGroupSingleSelectionDemo(): ReactNode {
  const [selectedPlanId, setSelectedPlanId] = useState<(typeof radioOptions)[number]['id']>(
    'standard',
  );
  const selectedPlan =
    radioOptions.find((option) => option.id === selectedPlanId) ?? radioOptions[0];

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="候補数が少ない単一選択では、全候補を見せたまま比較できる radio group が基本になります。"
          label="radio group">
          <fieldset className={styles.optionGroup}>
            <legend className={styles.groupLegend}>請求プランを 1 つ選択</legend>
            <div className={styles.optionStack}>
              {radioOptions.map((option) => (
                <SelectorField
                  control={
                    <input
                      checked={option.id === selectedPlanId}
                      className={styles.radioInput}
                      name="plan"
                      onChange={() => setSelectedPlanId(option.id)}
                      type="radio"
                      value={option.id}
                    />
                  }
                  description={option.description}
                  helperText={
                    option.id === 'standard'
                      ? '既定値を持つ場合は helper text で理由を補足します。'
                      : undefined
                  }
                  key={option.id}
                  label={option.label}
                />
              ))}
            </div>
          </fieldset>
        </PreviewCard>
        <PreviewCard
          description="1 つの field value を扱う前提が、見た目だけでなく validation と semantics でも伝わるようにします。"
          label="判断軸"
          className={styles.previewCardHiddenInDetail}>
          <div className={styles.selectionSummary}>
            <p className={styles.selectionNote}>現在の値: {selectedPlan.label}</p>
            <ul className={styles.summaryPillList}>
              <li className={styles.summaryPill}>候補を一覧で比較</li>
              <li className={styles.summaryPill}>required を扱いやすい</li>
              <li className={styles.summaryPill}>未選択も明示しやすい</li>
            </ul>
            <ul className={styles.specList}>
              <li className={styles.specItem}>候補が少ない単一選択をその場で比較できる</li>
              <li className={styles.specItem}>card でなくても helper / error を近接配置しやすい</li>
              <li className={styles.specItem}>
                候補圧縮や検索が必要なら select / combobox に切り替える
              </li>
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        候補数が増えて一覧が重いなら native select、検索が必要なら combobox を検討します。
      </p>
    </div>
  );
}
