import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type PreviewCardProps = {
  label: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export type SelectorFieldControlProps = {
  id?: string;
  'aria-describedby'?: string;
  'aria-errormessage'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
};

type SelectorFieldProps = {
  control: ReactElement<SelectorFieldControlProps>;
  label: string;
  description?: string;
  helperText?: string;
  errorText?: string;
  className?: string;
};

type RadioCardFieldProps = {
  name: string;
  onChange: () => void;
  value: string;
  title: string;
  description: string;
  detail: string;
  selected: boolean;
  badge: string;
};

export type ComboboxOption = {
  id: string;
  label: string;
  note: string;
};

type GroupedSelectOption = {
  value: string;
  label: string;
  description: string;
};

export type SelectOption = GroupedSelectOption & {
  groupLabel: string;
};

export type CustomSelectVariant = 'outline' | 'soft' | 'card';

type CustomSelectPreviewProps = {
  label: string;
  helperText: string;
  initialValue: SelectOption['value'];
  variant: CustomSelectVariant;
};

export const radioOptions = [
  {
    id: 'starter',
    label: 'スターター',
    description: '個人利用向けの最小プラン',
  },
  {
    id: 'standard',
    label: 'スタンダード',
    description: '標準機能をまとめた推奨プラン',
  },
  {
    id: 'enterprise',
    label: 'エンタープライズ',
    description: '監査ログとSSOが必要な組織向け',
  },
] as const;

export const radioCardOptions = [
  {
    id: 'starter',
    title: 'スターター',
    description: '小さなチーム向けの基本プラン',
    detail: '初期導入の検証に向く',
  },
  {
    id: 'team',
    title: 'チーム',
    description: '承認フローと権限管理をまとめて使う',
    detail: '標準の推奨プラン',
  },
  {
    id: 'enterprise',
    title: 'エンタープライズ',
    description: '監査ログやSSOが必要な組織向け',
    detail: '調達・法務レビューに対応',
  },
] as const;

export const teamOptionGroups = [
  {
    id: 'sales',
    label: '営業',
    items: [
      {
        value: 'inside-sales',
        label: 'インサイドセールス',
        description: 'インバウンド商談の一次対応を担当する',
      },
      {
        value: 'field-sales',
        label: 'フィールドセールス',
        description: '大型案件の個別提案や訪問商談を担当する',
      },
    ],
  },
  {
    id: 'support',
    label: 'サポート',
    items: [
      {
        value: 'implementation',
        label: '導入支援',
        description: '初期設定、権限整理、移行支援を担当する',
      },
      {
        value: 'customer-success',
        label: 'カスタマーサクセス',
        description: 'オンボーディングと定着支援を継続的に担当する',
      },
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  items: readonly GroupedSelectOption[];
}>;

export const frequencyOptions = [
  {value: 'daily', label: '毎日'},
  {value: 'weekly', label: '週次'},
  {value: 'monthly', label: '月次'},
] as const;

export const assigneeOptions = [
  {id: 'sato', label: '佐藤 美咲', note: 'CS オンボーディング担当'},
  {id: 'suzuki', label: '鈴木 亮', note: '営業部 / 既存顧客担当'},
  {id: 'sumida', label: '住田 菜月', note: '導入支援 / API 初期設定'},
  {id: 'sugimoto', label: '杉本 遥', note: 'プロダクト連携窓口'},
  {id: 'sudo', label: '須藤 拓海', note: '法務・調達レビュー窓口'},
] as const satisfies readonly ComboboxOption[];

export const flatTeamOptions: SelectOption[] = teamOptionGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    groupLabel: group.label,
  })),
);

/**
 * Preserves existing described-by tokens while appending helper and error ids.
 */
export function buildDescribedBy(
  currentValue: string | undefined,
  ...nextIds: Array<string | undefined>
): string | undefined {
  const ids = [currentValue, ...nextIds].filter(
    (value): value is string => value !== undefined && value.length > 0,
  );

  if (ids.length === 0) {
    return undefined;
  }

  return ids.join(' ');
}

/**
 * Renders the labeled preview shell shared by all selector demos.
 */
export function PreviewCard({
  label,
  description,
  children,
  className,
}: PreviewCardProps): ReactNode {
  return (
    <section className={clsx(styles.previewCard, className)}>
      <div className={styles.previewHeader}>
        <span className={styles.previewLabel}>{label}</span>
        <p className={styles.previewDescription}>{description}</p>
      </div>
      <div className={styles.previewContent}>{children}</div>
    </section>
  );
}

/**
 * Renders a field row while keeping label, helper, and error messaging bound to the control.
 */
export function SelectorField({
  control,
  label,
  description,
  helperText,
  errorText,
  className,
}: SelectorFieldProps): ReactNode {
  const generatedControlId = useId();
  const generatedDescriptionId = useId();
  const generatedHelperId = useId();
  const generatedErrorId = useId();
  const controlId = control.props.id ?? generatedControlId;
  const descriptionId = description ? generatedDescriptionId : undefined;
  const helperId = helperText ? generatedHelperId : undefined;
  const errorId = errorText ? generatedErrorId : undefined;
  const describedBy = buildDescribedBy(
    control.props['aria-describedby'],
    descriptionId,
    helperId,
    errorId,
  );
  const enhancedControl = cloneElement(control, {
    id: controlId,
    'aria-describedby': describedBy,
    'aria-invalid': errorText
      ? control.props['aria-invalid'] ?? 'true'
      : control.props['aria-invalid'],
  });

  return (
    <div className={clsx(styles.field, className)}>
      <span className={styles.fieldControlSlot}>{enhancedControl}</span>
      <span className={styles.fieldText}>
        <label className={styles.fieldLabel} htmlFor={controlId}>
          {label}
        </label>
        {description ? (
          <span className={styles.fieldDescription} id={descriptionId}>
            {description}
          </span>
        ) : null}
        {helperText ? (
          <span className={styles.fieldHelper} id={helperId}>
            {helperText}
          </span>
        ) : null}
        {errorText ? (
          <span className={styles.fieldError} id={errorId}>
            {errorText}
          </span>
        ) : null}
      </span>
    </div>
  );
}

/**
 * Renders a card-styled radio option while preserving native radio semantics.
 */
export function RadioCardField({
  name,
  onChange,
  value,
  title,
  description,
  detail,
  selected,
  badge,
}: RadioCardFieldProps): ReactNode {
  return (
    <label className={styles.radioCardOption}>
      <input
        checked={selected}
        className={styles.radioCardInput}
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
      <span className={styles.radioCardSurface}>
        <span className={styles.radioCardHeader}>
          <span className={styles.radioCardTitle}>{title}</span>
          <span className={styles.radioCardBadge}>{badge}</span>
        </span>
        <span className={styles.radioCardDescription}>{description}</span>
        <span className={styles.radioCardDetail}>{detail}</span>
      </span>
    </label>
  );
}

/**
 * Summarizes the current combobox state for screen readers and visual guidance.
 */
export function buildComboboxStatusText({
  expanded,
  filteredCount,
  selectedLabel,
  isLoading = false,
}: {
  expanded: boolean;
  filteredCount: number;
  selectedLabel: string | null;
  isLoading?: boolean;
}): string {
  if (isLoading) {
    return '候補を読み込み中です。読み込みが終わると候補一覧を更新します。';
  }

  if (!expanded && selectedLabel) {
    return `現在の値は ${selectedLabel} です。Enter または下矢印で候補を開きます。`;
  }

  if (!expanded) {
    return '候補はまだ展開していません。Enter または下矢印で開きます。';
  }

  if (filteredCount === 0) {
    return '一致する候補は 0 件です。検索語を変えると候補を絞り直せます。';
  }

  return `${filteredCount} 件の候補があります。上下キーで移動し Enter で確定します。`;
}

/**
 * Renders a simplified self-drawn single-select widget so visual variations share one interaction model.
 */
export function CustomSelectPreview({
  label,
  helperText,
  initialValue,
  variant,
}: CustomSelectPreviewProps): ReactNode {
  const customSelectorIdPrefix = useId();
  const customSelectFieldRef = useRef<HTMLDivElement | null>(null);
  const customSelectTriggerRef = useRef<HTMLButtonElement | null>(null);
  const customSelectOptionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(findTeamOptionIndex(initialValue));
  const selectedOption =
    flatTeamOptions.find((option) => option.value === selectedValue) ?? flatTeamOptions[0];

  function openSelector(): void {
    setExpanded(true);
    setActiveIndex(findTeamOptionIndex(selectedValue));
  }

  function closeSelector(returnFocus: boolean): void {
    setExpanded(false);

    if (returnFocus) {
      customSelectTriggerRef.current?.focus();
    }
  }

  function commitSelection(value: string): void {
    setSelectedValue(value);
    closeSelector(true);
  }

  useEffect(() => {
    if (!expanded) {
      return;
    }

    customSelectOptionRefs.current[activeIndex]?.focus();
  }, [activeIndex, expanded]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    function handlePointerDown(event: PointerEvent): void {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!customSelectFieldRef.current?.contains(target)) {
        setExpanded(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [expanded]);

  return (
    <div
      className={styles.customSelectField}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;

        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setExpanded(false);
        }
      }}
      ref={customSelectFieldRef}>
      <span className={styles.selectLabel} id={`${customSelectorIdPrefix}-label`}>
        {label}
      </span>
      <button
        aria-labelledby={`${customSelectorIdPrefix}-label`}
        aria-controls={expanded ? `${customSelectorIdPrefix}-listbox` : undefined}
        aria-expanded={expanded}
        aria-haspopup="listbox"
        className={clsx(
          styles.customSelectTrigger,
          variant === 'soft' && styles.customSelectTriggerSoft,
          variant === 'card' && styles.customSelectTriggerCard,
        )}
        onClick={() => {
          if (expanded) {
            closeSelector(false);
            return;
          }

          openSelector();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openSelector();
            return;
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            closeSelector(false);
          }
        }}
        ref={customSelectTriggerRef}
        type="button">
        {variant === 'outline' ? (
          <>
            <span>{selectedOption.label}</span>
            <span aria-hidden="true" className={styles.customSelectChevron}>
              ▾
            </span>
          </>
        ) : variant === 'soft' ? (
          <>
            <span className={styles.customSelectTriggerMeta}>
              <span className={styles.customSelectToken}>{selectedOption.groupLabel}</span>
              <span className={styles.customSelectTriggerStack}>
                <span className={styles.customSelectTriggerTitle}>{selectedOption.label}</span>
                <span className={styles.customSelectTriggerDescription}>
                  {selectedOption.description}
                </span>
              </span>
            </span>
            <span aria-hidden="true" className={styles.customSelectChevron}>
              ▾
            </span>
          </>
        ) : (
          <>
            <span className={styles.customSelectTriggerCardContent}>
              <span className={styles.customSelectToken}>{selectedOption.groupLabel}</span>
              <span className={styles.customSelectTriggerStack}>
                <span className={styles.customSelectTriggerTitle}>{selectedOption.label}</span>
                <span className={styles.customSelectTriggerDescription}>
                  {selectedOption.description}
                </span>
              </span>
            </span>
            <span aria-hidden="true" className={styles.customSelectChevron}>
              ▾
            </span>
          </>
        )}
      </button>
      {expanded ? (
        <ul
          aria-labelledby={`${customSelectorIdPrefix}-label`}
          className={clsx(
            styles.customSelectListbox,
            variant === 'soft' && styles.customSelectListboxSoft,
            variant === 'card' && styles.customSelectListboxCard,
          )}
          id={`${customSelectorIdPrefix}-listbox`}
          role="listbox">
          {teamOptionGroups.map((group) => (
            <li
              aria-labelledby={`${customSelectorIdPrefix}-${group.id}-label`}
              className={styles.customSelectGroup}
              key={group.id}
              role="group">
              <div
                className={styles.customSelectGroupLabel}
                id={`${customSelectorIdPrefix}-${group.id}-label`}>
                {group.label}
              </div>
              <ul className={styles.customSelectGroupList} role="presentation">
                {group.items.map((item) => {
                  const optionIndex = findTeamOptionIndex(item.value);
                  const isActive = flatTeamOptions[activeIndex]?.value === item.value;
                  const isSelected = item.value === selectedValue;

                  return (
                    <li
                      aria-selected={isSelected}
                      className={clsx(
                        styles.customSelectOption,
                        variant === 'soft' && styles.customSelectOptionSoft,
                        variant === 'card' && styles.customSelectOptionCard,
                        isActive && styles.customSelectOptionActive,
                        isSelected && styles.customSelectOptionSelected,
                        variant === 'card' && isSelected && styles.customSelectOptionCardSelected,
                      )}
                      key={item.value}
                      onClick={() => {
                        commitSelection(item.value);
                      }}
                      onFocus={() => {
                        setActiveIndex(optionIndex);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown') {
                          event.preventDefault();
                          setActiveIndex((current) =>
                            Math.min(current + 1, flatTeamOptions.length - 1),
                          );
                          return;
                        }

                        if (event.key === 'ArrowUp') {
                          event.preventDefault();
                          setActiveIndex((current) => (current === 0 ? 0 : current - 1));
                          return;
                        }

                        if (event.key === 'Home') {
                          event.preventDefault();
                          setActiveIndex(0);
                          return;
                        }

                        if (event.key === 'End') {
                          event.preventDefault();
                          setActiveIndex(flatTeamOptions.length - 1);
                          return;
                        }

                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          commitSelection(item.value);
                          return;
                        }

                        if (event.key === 'Escape') {
                          event.preventDefault();
                          closeSelector(true);
                          return;
                        }

                        if (event.key === 'Tab') {
                          closeSelector(false);
                        }
                      }}
                      ref={(element) => {
                        customSelectOptionRefs.current[optionIndex] = element;
                      }}
                      role="option"
                      tabIndex={isActive ? 0 : -1}>
                      {variant === 'outline' ? (
                        item.label
                      ) : (
                        <div className={styles.customSelectOptionMeta}>
                          <div className={styles.customSelectOptionHeader}>
                            <span className={styles.customSelectOptionLabel}>{item.label}</span>
                            <span className={styles.customSelectOptionBadge}>
                              {isSelected ? '選択中' : group.label}
                            </span>
                          </div>
                          <span className={styles.customSelectOptionNote}>{item.description}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
      <p className={styles.selectFootnote}>
        現在の値: {selectedOption.label}。{helperText}
      </p>
    </div>
  );
}

/**
 * Maps a team option value to the roving tabindex index used by custom selectors.
 */
function findTeamOptionIndex(value: string): number {
  return flatTeamOptions.findIndex((option) => option.value === value);
}
