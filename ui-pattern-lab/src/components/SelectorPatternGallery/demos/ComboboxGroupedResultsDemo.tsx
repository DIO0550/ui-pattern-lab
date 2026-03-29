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
  buildComboboxStatusText,
  type ComboboxOption,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

const groupedAssigneeOptions: ReadonlyArray<{
  id: string;
  label: string;
  items: ReadonlyArray<ComboboxOption>;
}> = [
  {
    id: 'sales',
    label: '営業',
    items: [
      {id: 'suzuki', label: '鈴木 亮', note: '既存顧客担当'},
      {id: 'sudo', label: '須藤 拓海', note: '法務・調達レビュー窓口'},
    ],
  },
  {
    id: 'support',
    label: 'サポート',
    items: [
      {id: 'sumida', label: '住田 菜月', note: '導入支援 / API 初期設定'},
      {id: 'sato', label: '佐藤 美咲', note: 'CS オンボーディング担当'},
    ],
  },
];

const flatGroupedAssigneeOptions: ComboboxOption[] = groupedAssigneeOptions.flatMap((group) => [
  ...group.items,
]);

export default function ComboboxGroupedResultsDemo(): ReactNode {
  const comboboxIdPrefix = useId();
  const [inputValue, setInputValue] = useState('');
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string | null>('sumida');
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const filteredGroups = useMemo(() => {
    const keyword = inputValue.trim();

    if (keyword.length === 0) {
      return groupedAssigneeOptions;
    }

    return groupedAssigneeOptions
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => `${item.label} ${item.note}`.includes(keyword)),
      }))
      .filter((group) => group.items.length > 0);
  }, [inputValue]);
  const filteredOptions = filteredGroups.flatMap((group) => group.items);
  const activeOption = filteredOptions[activeIndex];
  const selectedAssignee =
    flatGroupedAssigneeOptions.find((option) => option.id === selectedAssigneeId) ?? null;
  const statusText = buildComboboxStatusText({
    expanded,
    filteredCount: filteredOptions.length,
    selectedLabel: selectedAssignee?.label ?? null,
  });

  function commitSelection(option: ComboboxOption): void {
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
          description="group label を持つ listbox で、候補のまとまりと選択結果の両方を見せる combobox variation です。"
          label="grouped results">
          <div className={styles.comboboxStack}>
            <section className={styles.comboboxFrame}>
              <div className={styles.comboboxMeta}>
                <span className={styles.comboboxCaption} id={`${comboboxIdPrefix}-label`}>
                  担当窓口を選択
                </span>
                <span className={styles.inlineBadge}>
                  {expanded ? 'grouped listbox open' : 'collapsed'}
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
                  placeholder="部署や担当者を検索"
                  role="combobox"
                  value={inputValue}
                />
                {expanded && filteredOptions.length > 0 ? (
                  <ul
                    className={styles.comboboxListbox}
                    id={`${comboboxIdPrefix}-listbox`}
                    role="listbox">
                    {filteredGroups.map((group) => (
                      <li
                        aria-labelledby={`${comboboxIdPrefix}-${group.id}-label`}
                        className={styles.customSelectGroup}
                        key={group.id}
                        role="group">
                        <div
                          className={styles.customSelectGroupLabel}
                          id={`${comboboxIdPrefix}-${group.id}-label`}>
                          {group.label}
                        </div>
                        <ul className={styles.customSelectGroupList} role="presentation">
                          {group.items.map((option) => {
                            const optionIndex = filteredOptions.findIndex(
                              (item) => item.id === option.id,
                            );

                            return (
                              <li
                                aria-selected={selectedAssigneeId === option.id}
                                className={clsx(
                                  styles.comboboxOption,
                                  optionIndex === activeIndex && styles.comboboxOptionActive,
                                  selectedAssigneeId === option.id &&
                                    styles.comboboxOptionSelected,
                                )}
                                id={`${comboboxIdPrefix}-option-${option.id}`}
                                key={option.id}
                                onClick={() => commitSelection(option)}
                                onMouseDown={(event) => event.preventDefault()}
                                role="option">
                                <span className={styles.comboboxOptionLabel}>{option.label}</span>
                                <span className={styles.comboboxOptionNote}>{option.note}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {expanded && filteredOptions.length === 0 ? (
                  <p className={clsx(styles.comboboxOption, styles.comboboxOptionMuted)}>
                    一致する候補はありません。部署名か担当者名を変えて再検索してください。
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
                <li className={styles.summaryPill}>group: {filteredGroups.length} 件</li>
                <li className={styles.summaryPill}>候補数: {filteredOptions.length} 件</li>
                <li className={styles.summaryPill}>{expanded ? '候補表示中' : '閉じた状態'}</li>
              </ul>
            </div>
          </div>
        </PreviewCard>
        <PreviewCard
          description="group label を導入しても、active option と status text の一貫性を崩さないことが重要です。"
          label="設計メモ"
          className={styles.previewCardHiddenInDetail}>
          <ul className={styles.specList}>
            <li className={styles.specItem}>query が空でも group のまとまりを保つ</li>
            <li className={styles.specItem}>Arrow key が group 境界をまたいでも active index を安定させる</li>
            <li className={styles.specItem}>選択済みの候補は group 内でも badge なしで文脈がわかるようにする</li>
          </ul>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        grouped results は視覚探索に効きますが、group label と option の関係が読み上げでも壊れないように注意が必要です。
      </p>
    </div>
  );
}
