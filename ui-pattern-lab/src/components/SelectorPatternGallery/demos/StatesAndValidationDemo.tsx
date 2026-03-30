import {useId, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import {
  type ButtonReferenceGuide,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import {buildReferenceCodeTabs} from '@site/src/components/PatternReferenceContent';
import {
  PreviewCard,
  SelectorField,
  radioOptions,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

function RadioRequiredErrorPreview(): ReactNode {
  const radioHelpId = useId();
  const radioErrorId = useId();
  const [selectedRequiredPlanId, setSelectedRequiredPlanId] = useState<string | null>(null);
  const [radioTouched, setRadioTouched] = useState(false);
  const showRadioError = radioTouched && selectedRequiredPlanId === null;

  return (
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
  );
}

function SelectHelperErrorPreview(): ReactNode {
  const selectHelpId = useId();
  const selectErrorId = useId();
  const [selectedRequiredTeam, setSelectedRequiredTeam] = useState('');
  const [selectTouched, setSelectTouched] = useState(false);
  const showSelectError = selectTouched && selectedRequiredTeam === '';

  return (
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
  );
}

function CrossCuttingSelectorStatesPreview(): ReactNode {
  const disabledReasonId = useId();

  return (
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
  );
}

function ValidationGuideDoPreview(): ReactNode {
  return (
    <div className={styles.selectionSummary}>
      <label className={styles.selectBlock}>
        <span className={styles.selectLabel}>担当チーム</span>
        <select aria-describedby="selector-validation-guide-do" className={styles.selectControl} defaultValue="">
          <option disabled value="">
            選択してください
          </option>
          <option value="inside-sales">インサイドセールス</option>
        </select>
        <span className={styles.selectHelp} id="selector-validation-guide-do">
          helper / error / disabled 理由を control に関連付けます。
        </span>
        <span className={styles.fieldError}>担当チームを選択してください。</span>
      </label>
    </div>
  );
}

function ValidationGuideDontPreview(): ReactNode {
  return (
    <div className={styles.selectionSummary}>
      <label className={styles.selectBlock}>
        <span className={styles.selectLabel}>担当チーム</span>
        <select className={styles.selectControl} defaultValue="">
          <option value="">選択してください</option>
          <option value="inside-sales">インサイドセールス</option>
        </select>
      </label>
      <p className={styles.selectFootnote}>
        placeholder だけに文脈を任せ、helper / error / disabled 理由を省かないようにします。
      </p>
    </div>
  );
}

const radioValidationTabs = buildReferenceCodeTabs([
  {
    id: 'radio-required-error-css',
    label: 'CSS',
    language: 'css',
    code: `.field {
  display: grid;
  gap: 0.5rem;
}

.errorText,
.helperText {
  font-size: 0.875rem;
  margin: 0;
}

.errorText {
  color: var(--ifm-color-danger);
  font-weight: 600;
}

.field:focus-within {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 30%, white);
  outline-offset: 0.2rem;
}`,
    note: 'required な radio group では、未選択 error と helper text を同じ fieldset の文脈に置きます。',
  },
  {
    id: 'radio-required-error-tsx',
    label: 'TSX',
    language: 'tsx',
    code: `const helperId = 'plan-helper';
const errorId = 'plan-error';

<fieldset className={styles.field}>
  <legend>プランを選択</legend>
  <label>
    <input
      aria-describedby={\`\${helperId} \${errorId}\`}
      aria-invalid="true"
      name="plan"
      type="radio"
    />
    スタンダード
  </label>
  <p className={styles.helperText} id={helperId}>
    未選択のまま送信すると error を表示します。
  </p>
  <p className={styles.errorText} id={errorId}>
    いずれか 1 つを選択してください。
  </p>
</fieldset>`,
    note: 'submit / blur 後の error を helper と同じ文脈に置くと、読み上げでも状態が追いやすくなります。',
  },
]);

const selectValidationTabs = buildReferenceCodeTabs([
  {
    id: 'select-helper-error-css',
    label: 'CSS',
    language: 'css',
    code: `.field {
  display: grid;
  gap: 0.5rem;
}

.helperText,
.errorText {
  font-size: 0.875rem;
  margin: 0;
}

.errorText {
  color: var(--ifm-color-danger);
  font-weight: 600;
}`,
    note: 'select では helper / error を placeholder 風 option だけに寄せず、周辺文言で補います。',
  },
  {
    id: 'select-helper-error-tsx',
    label: 'TSX',
    language: 'tsx',
    code: `const helperId = 'team-helper';
const errorId = 'team-error';

<label className={styles.field}>
  <span>担当チーム</span>
  <select aria-describedby={\`\${helperId} \${errorId}\`} aria-invalid="true">
    <option disabled value="">
      選択してください
    </option>
    <option value="inside-sales">インサイドセールス</option>
    <option value="implementation">導入支援</option>
  </select>
  <span className={styles.helperText} id={helperId}>
    helper は入力前の前提を説明します。
  </span>
  <span className={styles.errorText} id={errorId}>
    担当チームを選択してください。
  </span>
</label>`,
    note: 'helper と error を別要素で置くと、未選択の理由と修正方法を同時に伝えられます。',
  },
]);

const crossCuttingTabs = buildReferenceCodeTabs([
  {
    id: 'selector-reference-css',
    label: 'CSS',
    language: 'css',
    code: `.field:focus-within {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 30%, white);
  outline-offset: 0.2rem;
}

.disabledState {
  opacity: 0.6;
}`,
    note: 'focus-visible と disabled 理由は、selector family 全体で崩さない共通ルールとして扱います。',
  },
  {
    id: 'selector-reference-tsx',
    label: 'TSX',
    language: 'tsx',
    code: `<label className={styles.field}>
  <span>承認者</span>
  <select aria-describedby="approver-disabled-reason" disabled>
    <option>管理者が固定しています</option>
  </select>
</label>

<p id="approver-disabled-reason">
  disabled 理由を文言でも補足します。
</p>`,
    note: 'long label、disabled reason、focus-visible を個別 component ではなく selector 全体の品質ルールとして参照します。',
  },
]);

export const statesAndValidationReferenceVariants = [
  {
    id: 'radio-required-error',
    name: 'Radio required + error',
    description:
      'required な radio group で未選択を許す場合は、submit / blur 後の error 文脈を helper と一緒に固定します。',
    preview: <RadioRequiredErrorPreview />,
    tabs: radioValidationTabs,
  },
  {
    id: 'select-helper-error',
    name: 'Select helper / error',
    description:
      'select では helper / error を placeholder 風 option だけに頼らず、周辺文言でも補います。',
    preview: <SelectHelperErrorPreview />,
    tabs: selectValidationTabs,
  },
  {
    id: 'long-label-disabled-focus',
    name: 'Long label / disabled / focus',
    description:
      '長いラベル、disabled 理由、focus-visible のような cross-cutting rule を 1 つの reference で確認します。',
    preview: <CrossCuttingSelectorStatesPreview />,
    tabs: crossCuttingTabs,
  },
] satisfies readonly ButtonReferenceVariant[];

export const statesAndValidationGuides = [
  {
    id: 'selector-validation-context-do',
    tone: 'do',
    description:
      'helper・error・disabled 理由を control の近くに置き、`aria-describedby` で読み上げ文脈もそろえます。',
    preview: <ValidationGuideDoPreview />,
  },
  {
    id: 'selector-validation-context-dont',
    tone: 'dont',
    description:
      'placeholder や色だけに状態説明を任せると、未選択・error・disabled の違いが伝わりません。',
    preview: <ValidationGuideDontPreview />,
  },
] satisfies readonly ButtonReferenceGuide[];

export default function StatesAndValidationDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="required な radio group で未選択を許す場合は、submit / blur 後の error 文脈を必ず揃えます。"
          label="radio required + error">
          <RadioRequiredErrorPreview />
        </PreviewCard>
        <PreviewCard
          description="select では helper / error を placeholder 風 option だけに頼らず、周辺文言でも補足します。"
          label="select helper / error">
          <SelectHelperErrorPreview />
        </PreviewCard>
        <PreviewCard
          description="長いラベル、disabled 理由、focus-visible のような cross-cutting rule を 1 つの reference で確認します。"
          label="long label / disabled / focus">
          <CrossCuttingSelectorStatesPreview />
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        helper / error / disabled / long label / keyboard guidance は、control ごとではなく selector
        全体の品質ルールとして参照します。
      </p>
    </div>
  );
}
