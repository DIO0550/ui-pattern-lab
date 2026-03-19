import type {
  CheckboxPatternEntryId,
  CheckboxPatternSnippets,
} from '@site/src/data/checkboxPatternTypes';

export const checkboxPatternSnippets: Record<
  CheckboxPatternEntryId,
  CheckboxPatternSnippets
> = {
  'multiple-independent-selection': {
    snippetSummary:
      '複数の独立した候補を checkbox で並べ、ラベル全体を押下領域に含める最小構成です。',
    items: [
      {
        id: 'multiple-independent-selection-css',
        label: 'CSS',
        language: 'css',
        code: `.checkboxGroup {
  display: grid;
  gap: 0.75rem;
}

.checkboxItem {
  align-items: flex-start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
}

.checkboxControl {
  block-size: 1.125rem;
  inline-size: 1.125rem;
  margin-top: 0.1rem;
}

.checkboxLabel {
  display: grid;
  gap: 0.25rem;
}

.checkboxHint {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
  margin: 0;
}`,
        note:
          'checkbox 本体とテキストを別々に押させず、ラベル全体をクリック可能にすると複数選択でも誤操作が減ります。',
      },
      {
        id: 'multiple-independent-selection-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const channels = [
  {id: 'email', label: 'メール通知', description: '新着コメントを受け取る'},
  {id: 'digest', label: '週次ダイジェスト', description: '毎週の要約を受け取る'},
  {id: 'product', label: 'プロダクト更新', description: '新機能や改善を知る'},
] as const;

<fieldset className={styles.checkboxGroup}>
  <legend>受け取りたい通知を選択</legend>
  {channels.map((channel) => (
    <label className={styles.checkboxItem} key={channel.id}>
      <input
        className={styles.checkboxControl}
        defaultChecked={channel.id === 'digest'}
        name="notificationChannels"
        type="checkbox"
        value={channel.id}
      />
      <span className={styles.checkboxLabel}>
        <span>{channel.label}</span>
        <span className={styles.checkboxHint}>{channel.description}</span>
      </span>
    </label>
  ))}
</fieldset>`,
        note:
          'radio button ではなく checkbox を選ぶことで、0 件以上の自由な組み合わせと未選択状態をそのまま許容できます。',
      },
    ],
  },
  'selectable-cards': {
    snippetSummary:
      'checkbox の semantics を保ったまま、カード全体を選択状態として見せる selectable card の例です。',
    items: [
      {
        id: 'selectable-cards-css',
        label: 'CSS',
        language: 'css',
        code: `.cardList {
  display: grid;
  gap: 0.75rem;
}

.cardOption {
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

.cardOption:hover .cardSurface {
  transform: translateY(-1px);
}

.cardInput:focus-visible + .cardSurface {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 30%, white);
  outline-offset: 2px;
}

.cardInput:checked + .cardSurface {
  background: color-mix(in srgb, var(--ifm-color-primary) 9%, white);
  border-color: var(--ifm-color-primary);
}

.cardHeader {
  align-items: flex-start;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.cardBadge {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
}

.cardInput:checked + .cardSurface .cardBadge {
  background: var(--ifm-color-primary);
  border-color: var(--ifm-color-primary);
  color: white;
}`,
        note:
          '四角い checkbox を消しても、input[type="checkbox"] 自体は残し、カード全体を label として押せる構造にします。',
      },
      {
        id: 'selectable-cards-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const optionCards = [
  {
    id: 'analytics',
    title: '分析レポート',
    description: '週次の利用状況レポートを受け取る',
    meta: 'CSV と PDF をまとめて配信',
  },
  {
    id: 'security',
    title: 'セキュリティ通知',
    description: '重要な権限変更だけを優先表示する',
    meta: '異常ログインや権限追加を分離して確認',
  },
  {
    id: 'templates',
    title: '共有テンプレート',
    description: 'チーム共通の初期設定をまとめて追加する',
    meta: '新メンバーへの配布作業を短縮',
  },
] as const;

const [selectedIds, setSelectedIds] = useState<
  Array<(typeof optionCards)[number]['id']>
>(['security']);

function toggleOption(optionId: (typeof optionCards)[number]['id']): void {
  setSelectedIds((current) => {
    if (current.includes(optionId)) {
      return current.filter((item) => item !== optionId);
    }

    return [...current, optionId];
  });
}

<fieldset className={styles.cardList}>
  <legend>追加する機能パックを選択</legend>
  {optionCards.map((option) => {
    const isSelected = selectedIds.includes(option.id);

    return (
      <label className={styles.cardOption} key={option.id}>
        <input
          checked={isSelected}
          className={styles.cardInput}
          onChange={() => toggleOption(option.id)}
          type="checkbox"
        />
        <span className={styles.cardSurface}>
          <span className={styles.cardHeader}>
            <span>{option.title}</span>
            <span className={styles.cardBadge}>
              {isSelected ? '選択中' : '未選択'}
            </span>
          </span>
          <span>{option.description}</span>
          <span>{option.meta}</span>
        </span>
      </label>
    );
  })}
</fieldset>`,
        note:
          '1 件だけの排他選択なら radio に寄せ、カード型でも複数選択・未選択の両方を許容したいときに checkbox を選びます。',
      },
    ],
  },
  'single-checkbox-and-indeterminate': {
    snippetSummary:
      '単独の同意 checkbox と、select-all で indeterminate を扱う親子パターンの最小例です。',
    items: [
      {
        id: 'single-checkbox-and-indeterminate-css',
        label: 'CSS',
        language: 'css',
        code: `.parentItem,
.childItem {
  align-items: flex-start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
}

.childGroup {
  display: grid;
  gap: 0.75rem;
  margin-left: 1.75rem;
}

.checkboxHelper {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
  margin: 0;
}`,
        note:
          '親子関係は余白とインデントで見せ、単独同意や select-all の意味が混ざらないように配置差を付けます。',
      },
      {
        id: 'single-checkbox-and-indeterminate-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const checkboxItems = [
  {id: 'billing', label: '請求通知', checked: true},
  {id: 'exports', label: 'CSV出力完了', checked: true},
  {id: 'mentions', label: 'メンション通知', checked: false},
] as const;
const [items, setItems] = useState({
  billing: checkboxItems[0].checked,
  exports: checkboxItems[1].checked,
  mentions: checkboxItems[2].checked,
});
const parentRef = useRef<HTMLInputElement>(null);
const checkedCount = Object.values(items).filter(Boolean).length;
const isAllChecked = checkedCount === Object.keys(items).length;
const isMixed = checkedCount > 0 && !isAllChecked;

useEffect(() => {
  if (!parentRef.current) {
    return;
  }

  parentRef.current.indeterminate = isMixed;
}, [isMixed]);

<>
  <label className={styles.parentItem}>
    <input
      ref={parentRef}
      aria-checked={isMixed ? 'mixed' : isAllChecked}
      checked={isAllChecked}
      onChange={(event) => {
        const nextChecked = event.currentTarget.checked;
        setItems({
          billing: nextChecked,
          exports: nextChecked,
          mentions: nextChecked,
        });
      }}
      type="checkbox"
    />
    <span className={styles.checkboxLabel}>
      <span>管理者に関連する通知をすべて選択</span>
      <span className={styles.checkboxHelper}>
        一部だけ選ばれているときは mixed を表示します。
      </span>
    </span>
  </label>

  <div className={styles.childGroup}>
    {checkboxItems.map((item) => (
      <label className={styles.childItem} key={item.id}>
        <input
          checked={items[item.id]}
          onChange={(event) => {
            const nextChecked = event.currentTarget.checked;
            setItems((current) => ({
              ...current,
              [item.id]: nextChecked,
            }));
          }}
          type="checkbox"
        />
        <span>{item.label}</span>
      </label>
    ))}
  </div>

  <label className={styles.parentItem}>
    <input type="checkbox" />
    <span className={styles.checkboxLabel}>
      <span>利用規約に同意する</span>
      <span className={styles.checkboxHelper}>送信前の確認として扱う単独 checkbox です。</span>
    </span>
  </label>
</>`,
        note:
          '即時設定の ON / OFF を強調したいなら switch や toggle button の方が適しています。checkbox は一括選択や送信前の確認に向きます。',
      },
    ],
  },
  'states-and-accessibility': {
    snippetSummary:
      'checked / disabled / error / helper text / mixed を、支援技術向け属性と合わせて整理する例です。',
    items: [
      {
        id: 'states-and-accessibility-css',
        label: 'CSS',
        language: 'css',
        code: `.checkboxItem {
  align-items: flex-start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
}

.checkboxItem:focus-within {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 30%, white);
  outline-offset: 0.25rem;
}

.checkboxItemError {
  border-color: var(--ifm-color-danger);
}

.helperText,
.errorText {
  font-size: 0.875rem;
  margin: 0;
}

.errorText {
  color: var(--ifm-color-danger);
}`,
        note:
          'focus-visible、error、helper は色だけでなく outline と補助文でも区別し、状態の意味が重ならないようにします。',
      },
      {
        id: 'states-and-accessibility-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const helperId = 'terms-helper';
const errorId = 'terms-error';

<label className={styles.checkboxItem}>
  <input
    aria-describedby={\`\${helperId} \${errorId}\`}
    aria-invalid="true"
    className={styles.checkboxControl}
    type="checkbox"
  />
  <span className={styles.checkboxLabel}>
    <span>利用規約に同意する</span>
    <span className={styles.helperText} id={helperId}>
      送信前に内容を確認できます。
    </span>
    <span className={styles.errorText} id={errorId}>
      同意しないと次へ進めません。
    </span>
  </span>
</label>

<label className={styles.checkboxItem}>
  <input checked disabled readOnly type="checkbox" />
  <span className={styles.checkboxLabel}>管理者が固定した必須設定</span>
</label>`,
        note:
          'フォーム入力としての semantics を保ちたいときは checkbox を使い、error や helper の読み上げ先を `aria-describedby` で明示します。',
      },
    ],
  },
  'mobile-and-touch-targets': {
    snippetSummary:
      '長いラベルと説明文を含む checkbox をモバイルで押しやすく保つ、縦積みレイアウトの例です。',
    items: [
      {
        id: 'mobile-and-touch-targets-css',
        label: 'CSS',
        language: 'css',
        code: `.touchList {
  display: grid;
  gap: 0.75rem;
}

.touchItem {
  align-items: flex-start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
  min-height: 3rem;
  padding: 0.75rem;
}

.touchControl {
  block-size: 1.125rem;
  inline-size: 1.125rem;
  margin-top: 0.2rem;
}

.touchTitle {
  font-weight: 600;
}

.touchDescription {
  color: var(--ifm-color-emphasis-700);
  margin: 0.25rem 0 0;
}`,
        note:
          'checkbox 自体ではなくラベル全体に 48px 相当の高さを持たせると、長文でもタップしやすさが保てます。',
      },
      {
        id: 'mobile-and-touch-targets-tsx',
        label: 'TSX',
        language: 'tsx',
        code: `const mobileOptions = [
  {
    id: 'release',
    title: '新機能リリースのお知らせを受け取る',
    description: '重要な改善だけを受け取り、日々の軽微な更新はまとめて通知します。',
  },
  {
    id: 'summary',
    title: '週末にダイジェストを受け取る',
    description: '未読の更新を 1 つの通知にまとめて確認できます。',
  },
] as const;

<div className={styles.touchList}>
  {mobileOptions.map((option) => (
    <label className={styles.touchItem} key={option.id}>
      <input className={styles.touchControl} type="checkbox" />
      <span>
        <span className={styles.touchTitle}>{option.title}</span>
        <span className={styles.touchDescription}>{option.description}</span>
      </span>
    </label>
  ))}
</div>`,
        note:
          '候補を折りたたんで一覧密度を優先したいなら select を検討し、各項目の説明を見せながら選ばせたいなら checkbox を維持します。',
      },
    ],
  },
};
