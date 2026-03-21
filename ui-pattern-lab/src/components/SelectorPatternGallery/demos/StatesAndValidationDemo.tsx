import {useId, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import {
  PreviewCard,
  SelectorField,
  radioOptions,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function StatesAndValidationDemo(): ReactNode {
  const radioHelpId = useId();
  const radioErrorId = useId();
  const selectHelpId = useId();
  const selectErrorId = useId();
  const disabledReasonId = useId();
  const [selectedRequiredPlanId, setSelectedRequiredPlanId] = useState<string | null>(null);
  const [selectedRequiredTeam, setSelectedRequiredTeam] = useState('');
  const [radioTouched, setRadioTouched] = useState(false);
  const [selectTouched, setSelectTouched] = useState(false);
  const showRadioError = radioTouched && selectedRequiredPlanId === null;
  const showSelectError = selectTouched && selectedRequiredTeam === '';

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="required な radio group で未選択を許す場合は、submit / blur 後の error 文脈を必ず揃えます。"
          label="radio required + error">
          <fieldset className={styles.optionGroup} onBlurCapture={() => setRadioTouched(true)}>
            <legend className={styles.groupLegend}>請求プランを 1 つ選択</legend>
            <div className={styles.optionStack}>
              {radioOptions.map((option) => (
                <SelectorField
                  className={showRadioError ? styles.errorField : undefined}
                  control={
                    <input
                      aria-describedby={showRadioError ? `${radioHelpId} ${radioErrorId}` : radioHelpId}
                      aria-invalid={showRadioError ? 'true' : undefined}
                      checked={selectedRequiredPlanId === option.id}
                      className={styles.radioInput}
                      name="required-plan"
                      onChange={() => setSelectedRequiredPlanId(option.id)}
                      type="radio"
                      value={option.id}
                    />
                  }
                  description={option.description}
                  key={option.id}
                  label={option.label}
                />
              ))}
            </div>
            <p className={styles.selectHelp} id={radioHelpId}>
              送信前に未選択が許容される場合も、error の出し方を固定します。選択すると radio
              group の error は解消されます。
            </p>
            {showRadioError ? (
              <p className={styles.fieldError} id={radioErrorId}>
                いずれか 1 つを選択してください。
              </p>
            ) : null}
          </fieldset>
        </PreviewCard>
        <PreviewCard
          description="select では helper / error を placeholder 風 option だけに頼らず、周辺文言でも補足します。"
          label="select helper / error">
          <div className={styles.compactForm}>
            <label className={styles.selectBlock}>
              <span className={styles.selectLabel}>担当チーム</span>
              <select
                aria-describedby={showSelectError ? `${selectHelpId} ${selectErrorId}` : selectHelpId}
                aria-invalid={showSelectError ? 'true' : undefined}
                className={styles.selectControl}
                onBlur={() => setSelectTouched(true)}
                onChange={(event) => setSelectedRequiredTeam(event.target.value)}
                value={selectedRequiredTeam}>
                <option disabled value="">
                  選択してください
                </option>
                <option value="inside-sales">インサイドセールス</option>
                <option value="implementation">導入支援</option>
              </select>
              <span className={styles.selectHelp} id={selectHelpId}>
                helper は入力前の前提を説明します。値を選ぶと error は解消されます。
              </span>
              {showSelectError ? (
                <span className={styles.fieldError} id={selectErrorId}>
                  担当チームを選択してください。
                </span>
              ) : null}
            </label>
          </div>
        </PreviewCard>
        <PreviewCard
          description="長いラベル、disabled 理由、focus-visible のような cross-cutting rule を 1 つの reference で確認します。"
          label="long label / disabled / focus">
          <div className={styles.selectionSummary}>
            <SelectorField
              className={styles.focusField}
              control={
                <input
                  checked
                  className={styles.radioInput}
                  onChange={() => undefined}
                  type="radio"
                  value="shared-plan"
                />
              }
              helperText="2 行以上の長いラベルでも label と helper を近接させます。"
              label="複数部署にまたがる承認フローで利用する共通の請求プランを、この画面から選択する"
            />
            <label className={clsx(styles.selectBlock, styles.disabledBlock)}>
              <span className={styles.selectLabel}>承認者</span>
              <select
                aria-describedby={disabledReasonId}
                className={styles.selectControl}
                defaultValue="locked"
                disabled>
                <option value="locked">管理者が固定しています</option>
              </select>
              <span className={styles.selectFootnote} id={disabledReasonId}>
                disabled 理由を文言でも補足します。
              </span>
            </label>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        helper / error / disabled / long label / keyboard guidance は、control ごとではなく
        selector 全体の品質ルールとして参照します。
      </p>
    </div>
  );
}
