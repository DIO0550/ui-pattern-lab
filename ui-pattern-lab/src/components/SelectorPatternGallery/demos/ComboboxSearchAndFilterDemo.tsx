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
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function ComboboxSearchAndFilterDemo(): ReactNode {
  const comboboxIdPrefix = useId();
  const [inputValue, setInputValue] = useState('');
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const filteredOptions = useMemo(() => {
    const keyword = inputValue.trim();

    if (keyword.length === 0) {
      return assigneeOptions;
    }

    return assigneeOptions.filter((option) =>
      `${option.label} ${option.note}`.includes(keyword),
    );
  }, [inputValue]);
  const activeOption = filteredOptions[activeIndex];
  const selectedAssignee =
    assigneeOptions.find((option) => option.id === selectedAssigneeId) ?? null;
  const statusText = buildComboboxStatusText({
    expanded,
    filteredCount: filteredOptions.length,
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
      setActiveIndex((current) =>
        filteredOptions.length === 0 ? 0 : Math.min(current + 1, filteredOptions.length - 1),
      );
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setExpanded(true);
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
          description="自前描画の combobox を簡略化した live demo です。検索・候補描画・確定値の連動を確認できます。"
          label="live combobox">
          <div className={styles.comboboxStack}>
            <section className={styles.comboboxFrame}>
              <div className={styles.comboboxMeta}>
                <span className={styles.comboboxCaption} id={`${comboboxIdPrefix}-label`}>
                  担当者を選択
                </span>
                <span className={styles.inlineBadge}>
                  {expanded ? 'listbox open' : 'collapsed'}
                </span>
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
                {expanded && filteredOptions.length > 0 ? (
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
                {expanded && filteredOptions.length === 0 ? (
                  <p className={clsx(styles.comboboxOption, styles.comboboxOptionMuted)}>
                    一致する候補はありません。入力を変えるか候補一覧を見直してください。
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
            <div className={styles.selectionSummary}>
              <p className={styles.selectionNote}>現在の値: {selectedAssignee?.label ?? '未確定'}</p>
              <ul className={styles.summaryPillList}>
                <li className={styles.summaryPill}>query: {inputValue.length > 0 ? inputValue : '空'}</li>
                <li className={styles.summaryPill}>候補数: {filteredOptions.length} 件</li>
                <li className={styles.summaryPill}>{expanded ? '候補表示中' : '閉じた状態'}</li>
              </ul>
            </div>
          </div>
        </PreviewCard>
        <PreviewCard
          description="searchable single-select の最小構造だけを扱い、production で必要な周辺要件は切り分けます。"
          label="scope と非 scope">
          <ul className={styles.specList}>
            <li className={styles.specItem}>
              検索・候補描画・Enter 確定まで動く最小の single-select combobox
            </li>
            <li className={styles.specItem}>結果件数や no results は status text でも補足する</li>
            <li className={styles.specItem}>IME、async 検索、popover 位置計算は今回の初回スコープ外</li>
            <li className={styles.specItem}>
              freeform 作成や multi-select token picker は follow-up に分離する
            </li>
          </ul>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        ここでは自前描画の簡易 combobox を動かしていますが、production では IME、async 検索、
        スクロール位置、外側クリックでの close などを追加で設計する必要があります。
      </p>
    </div>
  );
}
