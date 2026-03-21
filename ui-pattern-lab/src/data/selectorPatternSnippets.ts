import type {
  SelectorPatternEntryId,
  SelectorPatternSnippets,
} from '@site/src/data/selectorPatternTypes';

export const selectorPatternSnippets: Record<
  SelectorPatternEntryId,
  SelectorPatternSnippets
> = {
  'radio-group-single-selection': {
    snippetSummary:
      '候補数が少ない単一選択を、fieldset / legend / radio の基本構造で表現する最小例です。',
    items: [
      {
        id: 'radio-group-single-selection-css',
        label: 'CSS',
        language: 'css',
        code: `.radioGroup {
  display: grid;
  gap: 0.75rem;
}

.radioItem {
  align-items: flex-start;
  cursor: pointer;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
}

.radioControl {
  block-size: 1.125rem;
  inline-size: 1.125rem;
  margin-top: 0.1rem;
}

.radioText {
  display: grid;
  gap: 0.25rem;
}

.radioHint {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
  margin: 0;
}`,
        note:
          '候補を見せたまま比較したい単一選択では、radio button が最も semantics を保ちやすい基本形です。',
      },
      {
        id: 'radio-group-single-selection-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const plans = [
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

<fieldset className={styles.radioGroup}>
  <legend>請求プランを 1 つ選択</legend>
  {plans.map((plan) => (
    <label className={styles.radioItem} key={plan.id}>
      <input
        className={styles.radioControl}
        defaultChecked={plan.id === 'standard'}
        name="billingPlan"
        type="radio"
        value={plan.id}
      />
      <span className={styles.radioText}>
        <span>{plan.label}</span>
        <span className={styles.radioHint}>{plan.description}</span>
      </span>
    </label>
  ))}
</fieldset>`,
        note:
          'default selection や required validation を form field として扱いやすく、checkbox の複数選択と責務を分けられます。',
      },
    ],
  },
  'selectable-radio-cards': {
    snippetSummary:
      '情報量の多い候補を card UI で見せつつ、radio semantics を維持する例です。',
    items: [
      {
        id: 'selectable-radio-cards-css',
        label: 'CSS',
        language: 'css',
        code: `.cardList {
  display: grid;
  gap: 0.75rem;
}

.cardOption {
  cursor: pointer;
  display: block;
  position: relative;
}

.cardInput {
  block-size: 1px;
  inline-size: 1px;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
  margin: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.cardSurface {
  background: var(--ifm-card-background-color);
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 1rem;
  display: grid;
  gap: 0.65rem;
  min-height: 7rem;
  padding: 1rem;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.cardInput:focus-visible + .cardSurface {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 30%, white);
  outline-offset: 2px;
}

.cardInput:checked + .cardSurface {
  background: color-mix(in srgb, var(--ifm-color-primary) 9%, white);
  border-color: var(--ifm-color-primary);
}

.cardBadge {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
}`,
        note:
          '見た目が card でも input[type="radio"] は残し、1 つの field value を mutually exclusive に保ちます。',
      },
      {
        id: 'selectable-radio-cards-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const planCards = [
  {
    id: 'starter',
    title: 'スターター',
    description: '小さなチーム向けの基本プラン',
    meta: '初期導入の検証に向く',
  },
  {
    id: 'team',
    title: 'チーム',
    description: '承認フローと権限管理をまとめて使う',
    meta: '標準の推奨プラン',
  },
  {
    id: 'enterprise',
    title: 'エンタープライズ',
    description: '監査ログやSSOが必要な組織向け',
    meta: '調達・法務レビューに対応',
  },
] as const;

const selectedId = 'team';

<fieldset className={styles.cardList}>
  <legend>請求プランを 1 つ選択</legend>
  {planCards.map((option) => (
    <label className={styles.cardOption} key={option.id}>
      <input
        checked={option.id === selectedId}
        className={styles.cardInput}
        name="billingPlan"
        onChange={() => {}}
        type="radio"
        value={option.id}
      />
      <span className={styles.cardSurface}>
        <span className={styles.cardHeader}>
          <span>{option.title}</span>
          <span className={styles.cardBadge}>
            {option.id === selectedId ? '選択中' : '候補'}
          </span>
        </span>
        <span>{option.description}</span>
        <span>{option.meta}</span>
      </span>
    </label>
  ))}
</fieldset>`,
        note:
          'checkbox card との違いは見た目ではなく semantics と validation です。複数選択や未選択許容が主題なら checkbox に逃がします。',
      },
    ],
  },
  'native-select-compact-options': {
    snippetSummary:
      '候補を圧縮してフォーム密度とモバイル native picker を優先する、native select baseline の例です。',
    items: [
      {
        id: 'native-select-compact-options-css',
        label: 'CSS',
        language: 'css',
        code: `.field {
  display: grid;
  gap: 0.5rem;
  max-width: 20rem;
}

.label {
  font-weight: 700;
}

.selectControl {
  appearance: auto;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.75rem;
  min-height: 2.75rem;
  padding: 0.65rem 0.8rem;
}

.helperText,
.footnote {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
  margin: 0;
}`,
        note:
          '見た目の自由度より、候補圧縮と native picker の扱いやすさを優先したいときに native select を使います。',
      },
      {
        id: 'native-select-compact-options-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const teamOptions = [
  {
    group: '営業',
    items: [
      {value: 'inside-sales', label: 'インサイドセールス'},
      {value: 'field-sales', label: 'フィールドセールス'},
    ],
  },
  {
    group: 'サポート',
    items: [
      {value: 'implementation', label: '導入支援'},
      {value: 'customer-success', label: 'カスタマーサクセス'},
    ],
  },
] as const;
const helperId = 'team-helper';

<label className={styles.field}>
  <span className={styles.label}>担当チーム</span>
  <select
    aria-describedby={helperId}
    className={styles.selectControl}
    defaultValue=""
    required>
    <option disabled value="">
      選択してください
    </option>
    {teamOptions.map((group) => (
      <optgroup key={group.group} label={group.group}>
        {group.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </optgroup>
    ))}
  </select>
  <span className={styles.helperText} id={helperId}>
    placeholder option だけに意味を持たせず、label と helper text でも未選択状態を伝えます。
  </span>
</label>`,
        note:
          'iOS Safari などでは先頭 option の見え方が期待とずれることがあるため、required や helper text でも未選択状態を補います。optgroup の移動感はブラウザ差があります。',
      },
    ],
  },
  'custom-select-outline-listbox': {
    snippetSummary:
      'button trigger、grouped listbox、roving focus を最小構造で扱う custom select baseline の例です。',
    items: [
      {
        id: 'custom-select-outline-listbox-css',
        label: 'CSS',
        language: 'css',
        code: `.field {
  display: grid;
  gap: 0.5rem;
  max-width: 24rem;
}

.trigger {
  align-items: center;
  background: var(--ifm-card-background-color);
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  min-height: 2.75rem;
  padding: 0.65rem 0.8rem;
}

.listbox {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.9rem;
  display: grid;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0.5rem;
}

.groupLabel {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.option {
  border-radius: 0.6rem;
  padding: 0.55rem 0.65rem;
}

.optionActive {
  background: color-mix(in srgb, var(--ifm-color-primary) 8%, white);
}`,
        note:
          'outline variation は custom select の土台です。見た目が軽くても keyboard / focus / close ルールは自前で固定する必要があります。',
      },
      {
        id: 'custom-select-outline-listbox-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const groups = [
  {
    id: 'sales',
    label: '営業',
    items: [
      {value: 'inside-sales', label: 'インサイドセールス'},
      {value: 'field-sales', label: 'フィールドセールス'},
    ],
  },
  {
    id: 'support',
    label: 'サポート',
    items: [
      {value: 'implementation', label: '導入支援'},
      {value: 'customer-success', label: 'カスタマーサクセス'},
    ],
  },
] as const;

const activeValue = 'implementation';
const selectedValue = 'implementation';

<div className={styles.field}>
  <span id="team-label">担当チーム</span>
  <button
    aria-controls="team-listbox"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-labelledby="team-label"
    className={styles.trigger}
    type="button">
    <span>導入支援</span>
    <span aria-hidden="true">▾</span>
  </button>
  <ul aria-labelledby="team-label" className={styles.listbox} id="team-listbox" role="listbox">
    {groups.map((group) => (
      <li aria-labelledby={group.id} key={group.id} role="group">
        <div className={styles.groupLabel} id={group.id}>
          {group.label}
        </div>
        <ul role="presentation">
          {group.items.map((item) => (
            <li
              aria-selected={item.value === selectedValue}
              className={
                item.value === activeValue
                  ? styles.option + ' ' + styles.optionActive
                  : styles.option
              }
              key={item.value}
              role="option"
              tabIndex={item.value === activeValue ? 0 : -1}>
              {item.label}
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
</div>`,
        note:
          'button / listbox の関係、group label、roving tabindex を先に固定しておくと、soft / card variation を同じ操作モデルで増やしやすくなります。',
      },
    ],
  },
  'custom-select-soft-options': {
    snippetSummary:
      'supporting text と group token を伴う option row を soft surface で扱う custom select の例です。',
    items: [
      {
        id: 'custom-select-soft-options-css',
        label: 'CSS',
        language: 'css',
        code: `.trigger {
  align-items: flex-start;
  background: color-mix(in srgb, var(--ifm-color-primary) 8%, white);
  border: 1px solid color-mix(in srgb, var(--ifm-color-primary) 20%, white);
  border-radius: 0.75rem;
  display: grid;
  gap: 0.35rem;
  padding: 0.75rem 0.85rem;
}

.token {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
}

.option {
  border: 1px solid transparent;
  border-radius: 0.75rem;
  display: grid;
  gap: 0.2rem;
  padding: 0.65rem 0.75rem;
}

.optionSelected {
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, white);
  border-color: color-mix(in srgb, var(--ifm-color-primary) 25%, white);
}`,
        note:
          'supporting text を持つ custom select では、selected / active の差に加えて option row の情報階層も示す必要があります。',
      },
      {
        id: 'custom-select-soft-options-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const selectedValue = 'customer-success';

<div className={styles.field}>
  <span id="soft-select-label">担当チーム</span>
  <button
    aria-controls="soft-select-listbox"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-labelledby="soft-select-label"
    className={styles.trigger}
    type="button">
    <span className={styles.token}>サポート</span>
    <span>カスタマーサクセス</span>
    <span>オンボーディングと定着支援を継続的に担当する</span>
  </button>
  <ul id="soft-select-listbox" role="listbox">
    <li
      aria-selected={false}
      className={styles.option}
      role="option"
      tabIndex={-1}>
      <span>導入支援</span>
      <span>初期設定、権限整理、移行支援を担当する</span>
    </li>
    <li
      aria-selected={true}
      className={styles.option + ' ' + styles.optionSelected}
      role="option"
      tabIndex={0}>
      <span>カスタマーサクセス</span>
      <span>オンボーディングと定着支援を継続的に担当する</span>
    </li>
  </ul>
</div>`,
        note:
          'description を option row に載せても、single-select であることと keyboard 移動の土台は outline variation と同じです。',
      },
    ],
  },
  'custom-select-card-options': {
    snippetSummary:
      'card 風 option row と選択 badge を伴う custom select の高密度 variation です。',
    items: [
      {
        id: 'custom-select-card-options-css',
        label: 'CSS',
        language: 'css',
        code: `.optionCard {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 1rem;
  display: grid;
  gap: 0.4rem;
  padding: 0.85rem;
}

.optionCardSelected {
  border-color: var(--ifm-color-primary);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ifm-color-primary) 25%, white);
}

.optionHeader {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}

.badge {
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
}`,
        note:
          'card variation は radio card に近づきやすいため、常時比較ではなく「開いたときだけ高密度」を守るのがポイントです。',
      },
      {
        id: 'custom-select-card-options-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const selectedValue = 'field-sales';

<ul aria-labelledby="card-select-label" role="listbox">
  <li
    aria-selected={false}
    className={styles.optionCard}
    role="option"
    tabIndex={-1}>
    <div className={styles.optionHeader}>
      <span>インサイドセールス</span>
      <span className={styles.badge}>営業</span>
    </div>
    <span>インバウンド商談の一次対応を担当する</span>
  </li>
  <li
    aria-selected={true}
    className={styles.optionCard + ' ' + styles.optionCardSelected}
    role="option"
    tabIndex={0}>
    <div className={styles.optionHeader}>
      <span>フィールドセールス</span>
      <span className={styles.badge}>選択中</span>
    </div>
    <span>大型案件の個別提案や訪問商談を担当する</span>
  </li>
</ul>`,
        note:
          '選択状態を card で強く見せても、開閉可能な listbox の責務にとどめ、radio card の常時比較とは切り分けます。',
      },
    ],
  },
  'combobox-search-and-filter': {
    snippetSummary:
      '検索付き単一選択の baseline 構造例です。async 検索や popover 制御を含む production-ready 実装ではありません。',
    items: [
      {
        id: 'combobox-search-and-filter-css',
        label: 'CSS',
        language: 'css',
        code: `.comboboxField {
  display: grid;
  gap: 0.5rem;
  max-width: 24rem;
}

.comboboxInput {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.75rem;
  min-height: 2.75rem;
  padding: 0.65rem 0.8rem;
}

.listbox {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.9rem;
  display: grid;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0.4rem;
}

.option {
  border-radius: 0.6rem;
  padding: 0.55rem 0.65rem;
}

.optionActive {
  background: color-mix(in srgb, var(--ifm-color-primary) 10%, white);
}

.statusText {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
  margin: 0;
}`,
        note:
          'combobox は「検索可能な single-select」であり、freeform text 入力と同義ではありません。候補 0 件時は aria-live か常時読める status text で結果件数を補足します。',
      },
      {
        id: 'combobox-search-and-filter-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const listboxId = 'assignee-listbox';
const statusId = 'assignee-status';
const activeOptionId = 'assignee-option-suzuki';

<div className={styles.comboboxField}>
  <label htmlFor="assignee-combobox">担当者を選択</label>
  <input
    aria-activedescendant={activeOptionId}
    aria-autocomplete="list"
    aria-controls={listboxId}
    aria-describedby={statusId}
    aria-expanded="true"
    className={styles.comboboxInput}
    id="assignee-combobox"
    onChange={() => {}}
    role="combobox"
    value="す"
  />
  <ul className={styles.listbox} id={listboxId} role="listbox">
    <li aria-selected={false} className={styles.option} role="option">
      佐藤 美咲
    </li>
    <li
      aria-selected={true}
      className={styles.option + ' ' + styles.optionActive}
      id={activeOptionId}
      role="option">
      鈴木 亮
    </li>
  </ul>
  <p aria-live="polite" className={styles.statusText} id={statusId}>
    2 件の候補があります。上下キーで移動し Enter で確定します。
  </p>
</div>`,
        note:
          'IME、仮想スクロール、非同期検索、popover の位置計算はこの例のスコープ外です。ラボ上では簡易な live demo を動かしつつ、production-ready 実装とは切り分けます。',
      },
    ],
  },
  'combobox-grouped-results': {
    snippetSummary:
      'group label つき listbox で、候補のまとまりを見せる combobox variation の例です。',
    items: [
      {
        id: 'combobox-grouped-results-css',
        label: 'CSS',
        language: 'css',
        code: `.listbox {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.9rem;
  display: grid;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0.5rem;
}

.group {
  display: grid;
  gap: 0.25rem;
}

.groupLabel {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.option {
  border-radius: 0.6rem;
  display: grid;
  gap: 0.1rem;
  padding: 0.55rem 0.65rem;
}`,
        note:
          'group label がある combobox では、検索後も候補の所属が見えるように listbox 内の見出し構造を保ちます。',
      },
      {
        id: 'combobox-grouped-results-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const resultGroups = [
  {
    id: 'sales',
    label: '営業',
    items: [
      {id: 'inside-sales', label: 'インサイドセールス', note: 'インバウンド商談の一次対応'},
    ],
  },
  {
    id: 'support',
    label: 'サポート',
    items: [
      {id: 'implementation', label: '導入支援', note: '初期設定と移行支援を担当'},
      {id: 'customer-success', label: 'カスタマーサクセス', note: '定着支援を継続的に担当'},
    ],
  },
] as const;

<ul aria-labelledby="grouped-combobox-label" className={styles.listbox} role="listbox">
  {resultGroups.map((group) => (
    <li aria-labelledby={group.id} className={styles.group} key={group.id} role="group">
      <div className={styles.groupLabel} id={group.id}>
        {group.label}
      </div>
      {group.items.map((item) => (
        <div aria-selected={item.id === 'implementation'} className={styles.option} key={item.id} role="option">
          <span>{item.label}</span>
          <span>{item.note}</span>
        </div>
      ))}
    </li>
  ))}
</ul>`,
        note:
          'group label を持つと視覚的な探索コストは下がりますが、Arrow key で group 境界をまたいでも active option と読み上げ文脈が破綻しないように設計する必要があります。',
      },
    ],
  },
  'combobox-empty-and-loading-states': {
    snippetSummary:
      'loading / no results / selected を aria-live とともに扱う combobox variation の例です。',
    items: [
      {
        id: 'combobox-empty-and-loading-states-css',
        label: 'CSS',
        language: 'css',
        code: `.statusRow {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
  margin: 0;
}

.statePanel {
  border: 1px dashed var(--ifm-color-emphasis-300);
  border-radius: 0.9rem;
  padding: 0.75rem;
}

.emptyState,
.loadingState {
  color: var(--ifm-color-emphasis-700);
  margin: 0;
}`,
        note:
          'empty と loading は見た目だけでなく、aria-live で現在状態を 1 つの文として伝えると読み上げが安定します。',
      },
      {
        id: 'combobox-empty-and-loading-states-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const isLoading = true;
const hasResults = false;
const selectedLabel = '導入支援';

<div className={styles.comboboxField}>
  <label htmlFor="status-combobox">担当チームを検索</label>
  <input
    aria-autocomplete="list"
    aria-describedby="status-combobox-status"
    aria-expanded="false"
    className={styles.comboboxInput}
    id="status-combobox"
    role="combobox"
    value="導"
  />
  <div className={styles.statePanel}>
    {isLoading ? (
      <p className={styles.loadingState}>候補を読み込み中です…</p>
    ) : hasResults ? null : (
      <p className={styles.emptyState}>一致する候補はありません。検索語を変えてください。</p>
    )}
  </div>
  <p aria-live="polite" className={styles.statusRow} id="status-combobox-status">
    {isLoading
      ? '候補を読み込み中です。'
      : hasResults
        ? '候補があります。'
        : '一致する候補は 0 件です。現在の選択は ' + selectedLabel + ' です。'}
  </p>
</div>`,
        note:
          'このラボでは local state による構造例だけを扱い、production の async 検索や request race は別途設計対象として切り分けます。',
      },
    ],
  },
  'states-and-validation': {
    snippetSummary:
      'radio / select / custom select / combobox に共通する helper、error、disabled、aria 関連付けをまとめる reference 例です。',
    items: [
      {
        id: 'states-and-validation-css',
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
}

.disabledState {
  opacity: 0.6;
}`,
        note:
          'focus-visible、disabled、error、helper は色だけに依存せず、outline と補助文でも区別します。',
      },
      {
        id: 'states-and-validation-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const helperId = 'plan-helper';
const errorId = 'plan-error';

<fieldset className={styles.field}>
  <legend>プランを選択</legend>
  <label>
    <input
      aria-describedby={helperId + ' ' + errorId}
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
</fieldset>

<label className={styles.field + ' ' + styles.disabledState}>
  <span>承認者</span>
  <select disabled>
    <option>管理者が固定しています</option>
  </select>
</label>`,
        note:
          'long label、helper/error、disabled 理由、スクリーンリーダー文脈を control ごとに欠かさず関連付けるための参照ページとして扱います。',
      },
    ],
  },
};
