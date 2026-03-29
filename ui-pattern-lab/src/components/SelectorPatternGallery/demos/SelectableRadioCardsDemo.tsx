import {useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  PreviewCard,
  RadioCardField,
  radioCardOptions,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function SelectableRadioCardsDemo(): ReactNode {
  const [selectedPlanId, setSelectedPlanId] = useState<
    (typeof radioCardOptions)[number]['id']
  >('team');
  const selectedPlan =
    radioCardOptions.find((option) => option.id === selectedPlanId) ?? radioCardOptions[1];

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="情報量の多い候補でも、1 つの field value を選ぶなら radio semantics を保ったまま card にします。"
          label="radio cards">
          <fieldset className={styles.optionGroup}>
            <legend className={styles.groupLegend}>請求プランを 1 つ選択</legend>
            <div className={styles.radioCardList}>
              {radioCardOptions.map((option) => (
                <RadioCardField
                  badge={option.id === selectedPlanId ? '選択中' : '候補'}
                  description={option.description}
                  detail={option.detail}
                  key={option.id}
                  name="planCard"
                  onChange={() => setSelectedPlanId(option.id)}
                  selected={option.id === selectedPlanId}
                  title={option.title}
                  value={option.id}
                />
              ))}
            </div>
          </fieldset>
        </PreviewCard>
        <PreviewCard
          description="checkbox card と違い、複数同時選択や select-all は前提にしません。"
          label="境界メモ"
          className={styles.previewCardHiddenInDetail}>
          <div className={styles.selectionSummary}>
            <p className={styles.selectionNote}>現在の値: {selectedPlan.title}</p>
            <ul className={styles.summaryPillList}>
              <li className={styles.summaryPill}>1 つの form value</li>
              <li className={styles.summaryPill}>default selection を持てる</li>
              <li className={styles.summaryPill}>required validation を載せやすい</li>
            </ul>
            <ul className={styles.specList}>
              <li className={styles.specItem}>
                複数カードを同時選択するなら{' '}
                <Link to="/checkbox/selectable-cards">checkbox / カード型の複数選択</Link>
              </li>
              <li className={styles.specItem}>
                押した瞬間に表示モードを切り替えるなら{' '}
                <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link>
              </li>
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        見た目が card でも、semantics / validation / default selection の観点で radio と
        checkbox を分けます。
      </p>
    </div>
  );
}
