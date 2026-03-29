import {
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import {
  PreviewCard,
  assigneeOptions,
  buildComboboxStatusText,
  type ComboboxOption,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function ComboboxEmptyAndLoadingStatesDemo(): ReactNode {
  const comboboxIdPrefix = useId();
  const [inputValue, setInputValue] = useState('');
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string | null>('sumida');
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingMode, setLoadingMode] = useState(false);
  const filteredOptions = useMemo(() => {
    if (loadingMode) {
      return [] as ComboboxOption[];
    }

    const keyword = inputValue.trim();

    if (keyword.length === 0) {
      return assigneeOptions;
    }

    return assigneeOptions.filter((option) =>
      `${option.label} ${option.note}`.includes(keyword),
    );
  }, [inputValue, loadingMode]);
  const activeOption = filteredOptions[activeIndex];
  const selectedAssignee =
    assigneeOptions.find((option) => option.id === selectedAssigneeId) ?? null;
  const statusText = buildComboboxStatusText({
    expanded,
    filteredCount: filteredOptions.length,
    isLoading: loadingMode && expanded,
    selectedLabel: selectedAssignee?.label ?? null,
  });

  function commitSelection(option: (typeof assigneeOptions)[number]): void {
    setSelectedAssigneeId(option.id);
    setInputValue(option.label);
    setExpanded(false);
    setActiveIndex(0);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
    setExpanded(true);
    setActiveIndex(0);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setExpanded(true);

      if (filteredOptions.length === 0) {
        return;
      }

      setActiveIndex((current) => Math.min(current + 1, filteredOptions.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setExpanded(true);

      if (filteredOptions.length === 0) {
        return;
      }

      setActiveIndex((current) => (current === 0 ? 0 : current - 1));
      return;
    }

    if (event.key === 'Enter') {
      if (expanded && activeOption) {
        event.preventDefault();
        commitSelection(activeOption);
        return;
      }

      setExpanded(true);
      return;
    }

    if (event.key === 'Escape') {
      setExpanded(false);
    }
  }

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          className={styles.referencePreviewCard}
          description="loading / no results / selected を切り替えながら、status text を欠かさない combobox variation です。"
          label="empty / loading states">
          <div className={styles.comboboxStack}>
            <section className={styles.comboboxFrame}>
              <div className={styles.comboboxMeta}>
                <span className={styles.comboboxCaption} id={`${comboboxIdPrefix}-label`}>
                  担当者を検索
                </span>
                <span className={styles.inlineBadge}>
                  {loadingMode ? 'loading mode' : expanded ? 'interactive' : 'collapsed'}
                </span>
              </div>
              <div className={clsx(styles.summaryPillList, styles.previewAuxiliaryHiddenInDetail)}>
                <button
                  className="button button--secondary button--sm"
                  onClick={() => setLoadingMode((current) => !current)}
                  type="button">
                  {loadingMode ? 'loading を止める' : 'loading を表示する'}
                </button>
                <button
                  className="button button--secondary button--sm"
                  onClick={() => {
                    setInputValue('該当なし');
                    setExpanded(true);
                    setActiveIndex(0);
                  }}
                  type="button">
                  no results を試す
                </button>
              </div>
              <div className={styles.comboboxShell}>
                <input
                  aria-activedescendant={
                    expanded && activeOption
                      ? `${comboboxIdPrefix}-option-${activeOption.id}`
                      : undefined
                  }
                  aria-autocomplete="list"
                  aria-controls={
                    expanded && filteredOptions.length > 0
                      ? `${comboboxIdPrefix}-listbox`
                      : undefined
                  }
                  aria-describedby={`${comboboxIdPrefix}-status`}
                  aria-expanded={expanded ? 'true' : 'false'}
                  aria-labelledby={`${comboboxIdPrefix}-label`}
                  className={styles.comboboxInput}
                  onBlur={() => setExpanded(false)}
                  onChange={handleInputChange}
                  onFocus={() => setExpanded(true)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="担当者を検索"
                  role="combobox"
                  value={inputValue}
                />
                {expanded && !loadingMode && filteredOptions.length > 0 ? (
                  <ul
                    className={styles.comboboxListbox}
                    id={`${comboboxIdPrefix}-listbox`}
                    role="listbox">
                    {filteredOptions.map((option, index) => (
                      <li
                        aria-selected={selectedAssigneeId === option.id}
                        className={clsx(
                          styles.comboboxOption,
                          index === activeIndex && styles.comboboxOptionActive,
                          selectedAssigneeId === option.id && styles.comboboxOptionSelected,
                        )}
                        id={`${comboboxIdPrefix}-option-${option.id}`}
                        key={option.id}
                        onClick={() => commitSelection(option)}
                        onMouseDown={(event) => event.preventDefault()}
                        role="option">
                        <span className={styles.comboboxOptionLabel}>{option.label}</span>
                        <span className={styles.comboboxOptionNote}>{option.note}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {expanded && loadingMode ? (
                  <p className={clsx(styles.comboboxOption, styles.comboboxOptionMuted)}>
                    候補を読み込み中です。完了すると結果一覧を更新します。
                  </p>
                ) : null}
                {expanded && !loadingMode && filteredOptions.length === 0 ? (
                  <p className={clsx(styles.comboboxOption, styles.comboboxOptionMuted)}>
                    一致する候補はありません。検索語を変えるか、現在の選択を維持してください。
                  </p>
                ) : null}
                <p
                  aria-live="polite"
                  className={styles.comboboxStatus}
                  id={`${comboboxIdPrefix}-status`}>
                  {statusText}
                </p>
              </div>
            </section>
            <div className={clsx(styles.selectionSummary, styles.previewAuxiliaryHiddenInDetail)}>
              <p className={styles.selectionNote}>現在の値: {selectedAssignee?.label ?? '未確定'}</p>
              <ul className={styles.summaryPillList}>
                <li className={styles.summaryPill}>{loadingMode ? 'loading 中' : 'loading なし'}</li>
                <li className={styles.summaryPill}>query: {inputValue.length > 0 ? inputValue : '空'}</li>
                <li className={styles.summaryPill}>候補数: {filteredOptions.length} 件</li>
              </ul>
            </div>
          </div>
        </PreviewCard>
        <PreviewCard
          description="empty と loading は見た目だけでなく、aria-live の文言も含めて 1 セットで設計します。"
          label="状態設計"
          className={styles.previewCardHiddenInDetail}>
          <ul className={styles.specList}>
            <li className={styles.specItem}>loading / no results / selected を同時に出さない</li>
            <li className={styles.specItem}>現在の値が残るなら status text でも再掲する</li>
            <li className={styles.specItem}>async 実装は扱わず、構造理解用の local state に限定する</li>
          </ul>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        この variation では、状態遷移の説明責任を優先しています。production-ready な async 検索や request race はこのラボのスコープ外です。
      </p>
    </div>
  );
}
