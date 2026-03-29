import {useId, useState, type ChangeEvent, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  PreviewCard,
  flatTeamOptions,
  frequencyOptions,
  teamOptionGroups,
} from '@site/src/components/SelectorPatternGallery/shared';

import styles from '../styles.module.css';

export default function NativeSelectCompactOptionsDemo(): ReactNode {
  const teamHelpId = useId();
  const frequencyHelpId = useId();
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('weekly');
  const selectedTeamLabel =
    flatTeamOptions.find((option) => option.value === selectedTeam)?.label ?? '未選択';
  const selectedFrequencyLabel =
    frequencyOptions.find((option) => option.value === selectedFrequency)?.label ??
    frequencyOptions[0].label;

  function handleTeamChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedTeam(event.target.value);
  }

  function handleFrequencyChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedFrequency(event.target.value);
  }

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          description="候補を圧縮し、フォーム密度と native picker を優先したいときは select が向きます。"
          label="compact select">
          <div className={styles.compactForm}>
            <label className={styles.selectBlock}>
              <span className={styles.selectLabel}>担当チーム</span>
              <select
                aria-describedby={teamHelpId}
                className={styles.selectControl}
                onChange={handleTeamChange}
                value={selectedTeam}>
                <option disabled value="">
                  選択してください
                </option>
                {teamOptionGroups.map((group) => (
                  <optgroup key={group.id} label={group.label}>
                    {group.items.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <span className={styles.selectHelp} id={teamHelpId}>
                placeholder option だけに未選択の意味を寄せず、helper text でも補足します。
              </span>
            </label>
            <label className={styles.selectBlock}>
              <span className={styles.selectLabel}>通知頻度</span>
              <select
                aria-describedby={frequencyHelpId}
                className={styles.selectControl}
                onChange={handleFrequencyChange}
                value={selectedFrequency}>
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className={styles.selectFootnote} id={frequencyHelpId}>
                モバイルでは native picker に委ねられるため、候補説明は helper text 側で補います。
              </span>
            </label>
            <p className={styles.selectFootnote}>
              現在の値: 担当チームは {selectedTeamLabel}、通知頻度は {selectedFrequencyLabel}
            </p>
          </div>
        </PreviewCard>
        <PreviewCard
          description="native select を baseline にし、要件が超えたときだけ custom select / combobox へ進みます。"
          label="切り替えの目安"
          className={styles.previewCardHiddenInDetail}>
          <div className={styles.selectionSummary}>
            <ul className={styles.summaryPillList}>
              <li className={styles.summaryPill}>候補圧縮が主題</li>
              <li className={styles.summaryPill}>mobile picker と相性が良い</li>
              <li className={styles.summaryPill}>標準 semantics をそのまま使える</li>
            </ul>
            <ul className={styles.specList}>
              <li className={styles.specItem}>候補を常時比較したいなら radio に戻す</li>
              <li className={styles.specItem}>
                option row を自前描画したいときだけ{' '}
                <Link to="/patterns/selector-custom-select-designs">
                  custom select 比較ページ
                </Link>{' '}
                へ進む
              </li>
              <li className={styles.specItem}>検索が必要なら combobox に切り替える</li>
              <li className={styles.specItem}>
                複数選択や select-all が必要なら checkbox 系に逃がす
              </li>
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        native select を基準にしつつ、自前描画に切り替えるなら grouped listbox、keyboard、
        active / selected state を別途設計します。
      </p>
    </div>
  );
}
