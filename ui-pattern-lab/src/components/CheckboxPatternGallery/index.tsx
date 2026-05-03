import type {ComponentPropsWithoutRef, ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import {
  type ButtonReferenceGuide,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import CheckboxPatternMetadataPanel from '@site/src/components/CheckboxPatternMetadataPanel';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
} from '@site/src/components/PatternReferenceContent';
import CheckboxPatternSnippetPanel from '@site/src/components/CheckboxPatternSnippetPanel';
import type {
  CheckboxPatternEntry,
  CheckboxPatternMetadataItem,
} from '@site/src/data/checkboxPatternTypes';

import styles from './styles.module.css';

type Props = {
  entries: CheckboxPatternEntry[];
  density: 'list' | 'detail';
};

type DemoRenderer = () => ReactNode;

type PreviewCardProps = {
  label: string;
  description: string;
  children: ReactNode;
  className?: string;
};

type DemoCheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  indeterminate?: boolean;
};

type CheckboxFieldProps = {
  label: string;
  description?: string;
  helperText?: string;
  errorText?: string;
  control: ReactNode;
  className?: string;
};

type SelectableCardFieldProps = {
  title: string;
  description: string;
  detail: string;
  selected: boolean;
  onChange: () => void;
};

const multiSelectOptions = [
  {
    id: 'comments',
    label: 'コメント通知',
    description: '自分宛てのコメントや返信を受け取る',
  },
  {
    id: 'digest',
    label: '週次ダイジェスト',
    description: '未読の更新をまとめて確認する',
  },
  {
    id: 'product',
    label: 'プロダクト更新',
    description: '重要な新機能だけを知らせる',
  },
] as const;

const notificationChildOptions = [
  {id: 'billing', label: '請求通知'},
  {id: 'exports', label: 'CSV出力完了'},
  {id: 'mentions', label: 'メンション通知'},
] as const;

type NotificationChildId = (typeof notificationChildOptions)[number]['id'];

const initialNotificationState: Record<NotificationChildId, boolean> = {
  billing: true,
  exports: true,
  mentions: false,
};

const mobileOptions = [
  {
    id: 'release',
    label: '新機能リリースのお知らせを受け取る',
    description: '重要な改善だけを受け取り、日々の軽微な更新はまとめて通知します。',
  },
  {
    id: 'summary',
    label: '週末にダイジェストを受け取る',
    description: '未読の更新を 1 つの通知にまとめて確認できます。',
  },
] as const;

const selectableCardOptions = [
  {
    id: 'analytics',
    title: '分析レポート',
    description: '週次の利用状況レポートを受け取る',
    detail: 'CSV と PDF をまとめて配信',
  },
  {
    id: 'security',
    title: 'セキュリティ通知',
    description: '重要な権限変更だけを優先表示する',
    detail: '異常ログインや権限追加を分離して確認',
  },
  {
    id: 'templates',
    title: '共有テンプレート',
    description: 'チーム共通の初期設定をまとめて追加する',
    detail: '新メンバーへの配布作業を短縮',
  },
] as const;

type SelectableCardOptionId = (typeof selectableCardOptions)[number]['id'];

function PreviewCard({label, description, children, className}: PreviewCardProps): ReactNode {
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

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">チェックボックスパターンはまだありません</Heading>
      <p>ギャラリーの受け皿はできていますが、比較対象のエントリはまだ登録されていません。</p>
    </div>
  );
}

function DemoCheckbox({
  className,
  indeterminate = false,
  ...props
}: DemoCheckboxProps): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      {...props}
      className={clsx(styles.checkboxInput, className)}
      ref={inputRef}
      type="checkbox"
    />
  );
}

function CheckboxField({
  label,
  description,
  helperText,
  errorText,
  control,
  className,
}: CheckboxFieldProps): ReactNode {
  return (
    <label className={clsx(styles.checkboxField, className)}>
      <span className={styles.checkboxControlSlot}>{control}</span>
      <span className={styles.checkboxText}>
        <span className={styles.checkboxLabel}>{label}</span>
        {description ? (
          <span className={styles.checkboxDescription}>{description}</span>
        ) : null}
        {helperText ? <span className={styles.checkboxHelper}>{helperText}</span> : null}
        {errorText ? <span className={styles.checkboxError}>{errorText}</span> : null}
      </span>
    </label>
  );
}

function SelectableCardField({
  title,
  description,
  detail,
  selected,
  onChange,
}: SelectableCardFieldProps): ReactNode {
  return (
    <label className={styles.selectableCardOption}>
      <input
        checked={selected}
        className={styles.selectableCardInput}
        onChange={onChange}
        type="checkbox"
      />
      <span className={styles.selectableCardSurface}>
        <span className={styles.selectableCardHeader}>
          <span className={styles.selectableCardTitle}>{title}</span>
          <span className={styles.selectableCardBadge}>
            {selected ? '選択中' : '未選択'}
          </span>
        </span>
        <span className={styles.selectableCardDescription}>{description}</span>
        <span className={styles.selectableCardDetail}>{detail}</span>
      </span>
    </label>
  );
}

function MultipleIndependentSelectionDemo(): ReactNode {
  const [selectedIds, setSelectedIds] = useState<
    Array<(typeof multiSelectOptions)[number]['id']>
  >(['digest']);

  function toggleOption(optionId: (typeof multiSelectOptions)[number]['id']): void {
    setSelectedIds((current) => {
      if (current.includes(optionId)) {
        return current.filter((item) => item !== optionId);
      }

      return [...current, optionId];
    });
  }

  const selectedLabels = multiSelectOptions
    .filter((option) => selectedIds.includes(option.id))
    .map((option) => option.label);
  const summaryItems =
    selectedLabels.length > 0 ? selectedLabels : ['まだ何も選択していません'];

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="複数選択"
          description="0 件以上を自由に組み合わせられるのが checkbox の前提です。">
          <fieldset className={styles.checkboxGroup}>
            <legend className={styles.groupLegend}>受け取りたい通知</legend>
            <div className={styles.checkboxStack}>
              {multiSelectOptions.map((option) => (
                <CheckboxField
                  control={
                    <DemoCheckbox
                      checked={selectedIds.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                    />
                  }
                  description={option.description}
                  key={option.id}
                  label={option.label}
                />
              ))}
            </div>
          </fieldset>
        </PreviewCard>
        <PreviewCard
          label="選択結果"
          description="checkbox は未選択のままでも成立し、必要な分だけ組み合わせられます。"
          className={styles.previewCardHiddenInDetail}>
          <div className={styles.selectionSummary}>
            <p className={styles.selectionNote}>
              {selectedLabels.length > 0
                ? `現在は ${selectedLabels.length} 件を選択中です。`
                : '未選択の状態も有効な入力として扱えます。'}
            </p>
            <ul className={styles.summaryPillList}>
              {summaryItems.map((item) => (
                <li className={styles.summaryPill} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        radio button は 1 件だけの選択、select は候補圧縮に向きます。checkbox は複数選択と未選択をそのまま許容したいときに選びます。
      </p>
    </div>
  );
}

function SingleCheckboxAndIndeterminateDemo(): ReactNode {
  const [childState, setChildState] = useState(initialNotificationState);
  const [agreed, setAgreed] = useState(false);
  const selectedCount = notificationChildOptions.filter(
    (option) => childState[option.id],
  ).length;
  const isAllChecked = selectedCount === notificationChildOptions.length;
  const isMixed = selectedCount > 0 && !isAllChecked;

  function setAllChildren(nextChecked: boolean): void {
    setChildState({
      billing: nextChecked,
      exports: nextChecked,
      mentions: nextChecked,
    });
  }

  function toggleChild(optionId: NotificationChildId): void {
    setChildState((current) => ({
      ...current,
      [optionId]: !current[optionId],
    }));
  }

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="select-all / mixed"
          description="親は子の状態から checked / mixed / unchecked を導出します。">
          <div className={styles.checkboxStack}>
            <CheckboxField
              control={
                <DemoCheckbox
                  aria-checked={isMixed ? 'mixed' : isAllChecked}
                  checked={isAllChecked}
                  indeterminate={isMixed}
                  onChange={(event) => setAllChildren(event.currentTarget.checked)}
                />
              }
              helperText={`3 件中 ${selectedCount} 件を選択中`}
              label="管理者向け通知をすべて選択"
            />
            <div className={styles.childGroup}>
              {notificationChildOptions.map((option) => (
                <CheckboxField
                  className={styles.childField}
                  control={
                    <DemoCheckbox
                      checked={childState[option.id]}
                      onChange={() => toggleChild(option.id)}
                    />
                  }
                  key={option.id}
                  label={option.label}
                />
              ))}
            </div>
          </div>
        </PreviewCard>
        <PreviewCard
          label="単独同意"
          description="送信前の確認は即時切り替え UI と分けて扱います。">
          <div className={styles.checkboxStack}>
            <CheckboxField
              control={
                <DemoCheckbox
                  checked={agreed}
                  onChange={() => setAgreed((current) => !current)}
                />
              }
              helperText="送信前に内容を確認できます。"
              label="利用規約に同意する"
            />
            <p className={styles.selectionNote}>
              {agreed
                ? '同意済みです。送信フローを進められます。'
                : '同意すると送信できます。'}
            </p>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        押下状態のトグル UI を見せたい場合は{' '}
        <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link>{' '}
        を参照してください。checkbox では送信前の確認や mixed state の表現を優先します。
      </p>
    </div>
  );
}

function MixedSelectionReferencePreview(): ReactNode {
  const [childState, setChildState] = useState(initialNotificationState);
  const selectedCount = notificationChildOptions.filter(
    (option) => childState[option.id],
  ).length;
  const isAllChecked = selectedCount === notificationChildOptions.length;
  const isMixed = selectedCount > 0 && !isAllChecked;

  function setAllChildren(nextChecked: boolean): void {
    setChildState({
      billing: nextChecked,
      exports: nextChecked,
      mentions: nextChecked,
    });
  }

  function toggleChild(optionId: NotificationChildId): void {
    setChildState((current) => ({
      ...current,
      [optionId]: !current[optionId],
    }));
  }

  return (
    <div className={styles.referencePreviewFrame}>
      <div className={styles.checkboxStack}>
        <CheckboxField
          control={
            <DemoCheckbox
              aria-checked={isMixed ? 'mixed' : isAllChecked}
              checked={isAllChecked}
              indeterminate={isMixed}
              onChange={(event) => setAllChildren(event.currentTarget.checked)}
            />
          }
          helperText={`3 件中 ${selectedCount} 件を選択中`}
          label="管理者向け通知をすべて選択"
        />
        <div className={styles.childGroup}>
          {notificationChildOptions.map((option) => (
            <CheckboxField
              className={styles.childField}
              control={
                <DemoCheckbox
                  checked={childState[option.id]}
                  onChange={() => toggleChild(option.id)}
                />
              }
              key={option.id}
              label={option.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SingleConsentReferencePreview(): ReactNode {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className={styles.referencePreviewFrame}>
      <div className={styles.checkboxStack}>
        <CheckboxField
          control={
            <DemoCheckbox
              checked={agreed}
              onChange={() => setAgreed((current) => !current)}
            />
          }
          helperText="送信前に内容を確認できます。"
          label="利用規約に同意する"
        />
        <p className={styles.selectionNote}>
          {agreed
            ? '同意済みです。送信フローを進められます。'
            : '同意すると送信できます。'}
        </p>
      </div>
    </div>
  );
}

function SelectableCardsDemo(): ReactNode {
  const [selectedIds, setSelectedIds] = useState<Array<SelectableCardOptionId>>([
    'security',
  ]);
  const selectedTitles = selectableCardOptions
    .filter((option) => selectedIds.includes(option.id))
    .map((option) => option.title);
  const summaryItems =
    selectedTitles.length > 0 ? selectedTitles : ['未選択の状態も許容できます'];

  function toggleCard(optionId: SelectableCardOptionId): void {
    setSelectedIds((current) => {
      if (current.includes(optionId)) {
        return current.filter((item) => item !== optionId);
      }

      return [...current, optionId];
    });
  }

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="selectable card"
          description="カード全体を押下対象にしつつ、semantics は checkbox のまま維持します。">
          <fieldset className={styles.checkboxGroup}>
            <legend className={styles.groupLegend}>追加する機能パック</legend>
            <div className={styles.selectableCardList}>
              {selectableCardOptions.map((option) => (
                <SelectableCardField
                  description={option.description}
                  detail={option.detail}
                  key={option.id}
                  onChange={() => toggleCard(option.id)}
                  selected={selectedIds.includes(option.id)}
                  title={option.title}
                />
              ))}
            </div>
          </fieldset>
        </PreviewCard>
        <PreviewCard
          label="判断軸"
          description="情報量の多い候補を複数選択させるときに向く派生パターンです。"
          className={styles.previewCardHiddenInDetail}>
          <div className={styles.selectionSummary}>
            <p className={styles.selectionNote}>
              {selectedTitles.length > 0
                ? `現在は ${selectedTitles.length} 件のカードを選択中です。`
                : '未選択のまま送信する設計もできます。'}
            </p>
            <ul className={styles.summaryPillList}>
              {summaryItems.map((item) => (
                <li className={styles.summaryPill} key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <ul className={styles.specList}>
              <li className={styles.specItem}>
                カード全体を label にして、小さな checkbox だけを押させない
              </li>
              <li className={styles.specItem}>
                selected は border / background / badge を重ねて見せる
              </li>
              <li className={styles.specItem}>
                1 件だけの排他選択なら radio button を選ぶ
              </li>
            </ul>
          </div>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        1 件だけをカードから選ばせるなら radio button を検討します。押した瞬間に状態を切り替える操作なら{' '}
        <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link>{' '}
        を参照してください。checkbox card は説明量の多い候補を複数選択させたいときに使います。
      </p>
    </div>
  );
}

function StatesAndAccessibilityDemo(): ReactNode {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="Unchecked / Checked"
          description="通常状態と選択済みの基準を先にそろえます。">
          <div className={styles.checkboxStack}>
            <CheckboxField control={<DemoCheckbox readOnly />} label="通知を受け取る" />
            <CheckboxField
              control={<DemoCheckbox checked readOnly />}
              label="コメントも受け取る"
            />
          </div>
        </PreviewCard>
        <PreviewCard
          label="フォーカス表示"
          description="キーボード移動時の輪郭を消しません。">
          <CheckboxField
            className={styles.focusField}
            control={<DemoCheckbox checked readOnly />}
            helperText="outline と helper text を併用して現在位置を見失わないようにします。"
            label="キーボード操作でも見失わない"
          />
        </PreviewCard>
        <PreviewCard
          label="無効"
          description="操作不可の理由を文言でも補います。">
          <CheckboxField
            control={<DemoCheckbox checked disabled readOnly />}
            helperText="権限がないため変更できません。"
            label="管理者が固定した設定"
          />
        </PreviewCard>
        <PreviewCard
          label="エラー"
          description="aria-invalid と補助文をセットで示します。">
          <CheckboxField
            className={styles.errorField}
            control={<DemoCheckbox aria-invalid="true" readOnly />}
            errorText="同意しないと次へ進めません。"
            helperText="送信前に内容を確認できます。"
            label="利用規約に同意する"
          />
        </PreviewCard>
        <PreviewCard
          label="一部選択"
          description="一部選択中は mixed を視覚差分でも示します。">
          <CheckboxField
            control={<DemoCheckbox aria-checked="mixed" indeterminate readOnly />}
            helperText="子設定の一部だけが有効です。"
            label="チーム共有権限"
          />
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        focus-visible、disabled、error、mixed は色だけでなく outline、helper、文言で意味を重ねます。
      </p>
    </div>
  );
}

const checkboxStateBaseCss = `.checkboxField {
  align-items: flex-start;
  background: var(--checkbox-gallery-surface);
  border: 1px solid color-mix(in srgb, var(--checkbox-gallery-emphasis) 12%, var(--checkbox-gallery-border));
  border-radius: 0.9rem;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
  padding: 0.75rem;
}

.checkboxInput {
  accent-color: var(--ifm-color-primary);
  block-size: 1.125rem;
  inline-size: 1.125rem;
  margin: 0;
}`;

function buildCheckboxDetailNotes(
  entry: CheckboxPatternEntry,
  metadataItems: CheckboxPatternMetadataItem[],
) {
  return metadataItems.map((item) => ({
    id: `${entry.id}-${item.tone}`,
    label: item.label,
    value: item.value,
  }));
}

function buildSingleCheckboxReferenceVariants(): readonly ButtonReferenceVariant[] {
  return [
    {
      id: 'select-all-mixed',
      name: 'Select-all / mixed',
      description: '親は子の状態から checked / mixed / unchecked を導出します。',
      preview: <MixedSelectionReferencePreview />,
      previewClassName: styles.compactReferenceVariantPreview,
      tabs: buildReferenceCodeTabs([
        {
          id: 'single-checkbox-parent-css',
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
          note: '親子関係は余白とインデントで見せ、mixed state は文言でも意味を補います。',
        },
        {
          id: 'single-checkbox-parent-tsx',
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
</>`,
          note: 'mixed state は見た目だけでなく、`indeterminate` と `aria-checked="mixed"` をそろえて扱います。',
        },
      ]),
    },
    {
      id: 'single-consent',
      name: '単独同意',
      description: '送信前の確認は、即時切り替え UI と分けて扱います。',
      preview: <SingleConsentReferencePreview />,
      previewClassName: styles.compactReferenceVariantPreview,
      tabs: buildReferenceCodeTabs([
        {
          id: 'single-checkbox-consent-css',
          label: 'CSS',
          language: 'css',
          code: `.parentItem {
  align-items: flex-start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
}

.checkboxHelper {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
  margin: 0;
}`,
          note: '単独同意は親子選択と混ぜず、確認入力として読める余白と文言を保ちます。',
        },
        {
          id: 'single-checkbox-consent-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `<label className={styles.parentItem}>
  <input type="checkbox" />
  <span className={styles.checkboxLabel}>
    <span>利用規約に同意する</span>
    <span className={styles.checkboxHelper}>
      送信前の確認として扱う単独 checkbox です。
    </span>
  </span>
</label>`,
          note: '即時設定の ON / OFF を強調したい場合は switch や toggle button を選びます。',
        },
      ]),
    },
  ] as const;
}

function buildCheckboxStateReferenceVariants(): readonly ButtonReferenceVariant[] {
  return [
    {
      id: 'unchecked',
      name: 'Unchecked',
      description: '通常時の未選択状態です。',
      previewClassName: styles.compactReferenceVariantPreview,
      preview: (
        <div className={styles.referencePreviewFrame}>
          <CheckboxField control={<DemoCheckbox readOnly />} label="通知を受け取る" />
        </div>
      ),
      tabs: [
        {
          id: 'unchecked-css',
          label: 'CSS',
          language: 'css',
          code: checkboxStateBaseCss,
        },
        {
          id: 'unchecked-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `<label className={styles.checkboxField}>
  <span className={styles.checkboxControlSlot}>
    <input className={styles.checkboxInput} readOnly type="checkbox" />
  </span>
  <span className={styles.checkboxText}>
    <span className={styles.checkboxLabel}>通知を受け取る</span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'checked',
      name: 'Checked',
      description: '選択済みの基準状態です。',
      previewClassName: styles.compactReferenceVariantPreview,
      preview: (
        <div className={styles.referencePreviewFrame}>
          <CheckboxField
            control={<DemoCheckbox checked readOnly />}
            label="コメントも受け取る"
          />
        </div>
      ),
      tabs: [
        {
          id: 'checked-css',
          label: 'CSS',
          language: 'css',
          code: checkboxStateBaseCss,
          note: 'checked state 自体は native checkbox の状態で表現し、レイアウトは unchecked と同じ基準を使います。',
        },
        {
          id: 'checked-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `<label className={styles.checkboxField}>
  <span className={styles.checkboxControlSlot}>
    <input checked className={styles.checkboxInput} readOnly type="checkbox" />
  </span>
  <span className={styles.checkboxText}>
    <span className={styles.checkboxLabel}>コメントも受け取る</span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'focus-visible',
      name: 'フォーカス表示',
      description: 'キーボード移動時の輪郭を示す状態です。',
      previewClassName: styles.compactReferenceVariantPreview,
      preview: (
        <div className={styles.referencePreviewFrame}>
          <CheckboxField
            className={styles.focusField}
            control={<DemoCheckbox checked readOnly />}
            helperText="outline と helper text を併用して現在位置を見失わないようにします。"
            label="キーボード操作でも見失わない"
          />
        </div>
      ),
      tabs: [
        {
          id: 'focus-visible-css',
          label: 'CSS',
          language: 'css',
          code: `${checkboxStateBaseCss}

.focusField {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 30%, white);
  outline-offset: 2px;
}`,
        },
        {
          id: 'focus-visible-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `<label className={clsx(styles.checkboxField, styles.focusField)}>
  <span className={styles.checkboxControlSlot}>
    <input checked className={styles.checkboxInput} readOnly type="checkbox" />
  </span>
  <span className={styles.checkboxText}>
    <span className={styles.checkboxLabel}>キーボード操作でも見失わない</span>
    <span className={styles.checkboxHelper}>
      outline と helper text を併用して現在位置を見失わないようにします。
    </span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'disabled',
      name: '無効',
      description: '操作不可の理由を補う状態です。',
      previewClassName: styles.compactReferenceVariantPreview,
      preview: (
        <div className={styles.referencePreviewFrame}>
          <CheckboxField
            control={<DemoCheckbox checked disabled readOnly />}
            helperText="権限がないため変更できません。"
            label="管理者が固定した設定"
          />
        </div>
      ),
      tabs: [
        {
          id: 'disabled-css',
          label: 'CSS',
          language: 'css',
          code: `${checkboxStateBaseCss}

.checkboxInput:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}`,
        },
        {
          id: 'disabled-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `<label className={styles.checkboxField}>
  <span className={styles.checkboxControlSlot}>
    <input checked className={styles.checkboxInput} disabled readOnly type="checkbox" />
  </span>
  <span className={styles.checkboxText}>
    <span className={styles.checkboxLabel}>管理者が固定した設定</span>
    <span className={styles.checkboxHelper}>権限がないため変更できません。</span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'error',
      name: 'エラー',
      description: 'aria-invalid と補助文を併記する状態です。',
      previewClassName: styles.compactReferenceVariantPreview,
      preview: (
        <div className={styles.referencePreviewFrame}>
          <CheckboxField
            className={styles.errorField}
            control={<DemoCheckbox aria-invalid="true" readOnly />}
            errorText="同意しないと次へ進めません。"
            helperText="送信前に内容を確認できます。"
            label="利用規約に同意する"
          />
        </div>
      ),
      tabs: [
        {
          id: 'error-css',
          label: 'CSS',
          language: 'css',
          code: `${checkboxStateBaseCss}

.errorField {
  background: color-mix(in srgb, var(--ifm-color-danger) 8%, var(--checkbox-gallery-surface));
  border-color: color-mix(in srgb, var(--ifm-color-danger) 35%, var(--checkbox-gallery-border));
}

.errorField .checkboxInput {
  accent-color: var(--ifm-color-danger);
}

.checkboxError {
  color: var(--ifm-color-danger);
  font-weight: 600;
}`,
        },
        {
          id: 'error-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `const helperId = 'terms-helper';
const errorId = 'terms-error';

<label className={clsx(styles.checkboxField, styles.errorField)}>
  <span className={styles.checkboxControlSlot}>
    <input
    aria-describedby={\`\${helperId} \${errorId}\`}
    aria-invalid="true"
    className={styles.checkboxInput}
    readOnly
    type="checkbox"
  />
  </span>
  <span className={styles.checkboxText}>
    <span className={styles.checkboxLabel}>利用規約に同意する</span>
    <span className={styles.checkboxHelper} id={helperId}>
      送信前に内容を確認できます。
    </span>
    <span className={styles.checkboxError} id={errorId}>
      同意しないと次へ進めません。
    </span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'mixed',
      name: '一部選択',
      description: '一部選択中を示す状態です。',
      previewClassName: styles.compactReferenceVariantPreview,
      preview: (
        <div className={styles.referencePreviewFrame}>
          <CheckboxField
            control={<DemoCheckbox aria-checked="mixed" indeterminate readOnly />}
            helperText="子設定の一部だけが有効です。"
            label="チーム共有権限"
          />
        </div>
      ),
      tabs: [
        {
          id: 'mixed-css',
          label: 'CSS',
          language: 'css',
          code: checkboxStateBaseCss,
          note:
            'mixed の視覚差分は native checkbox に委ねつつ、meaning は `indeterminate` property と `aria-checked="mixed"` を合わせて扱います。',
        },
        {
          id: 'mixed-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.indeterminate = true;
  }
}, []);

<label className={styles.checkboxField}>
  <span className={styles.checkboxControlSlot}>
    <input
    aria-checked="mixed"
    className={styles.checkboxInput}
    ref={inputRef}
    readOnly
    type="checkbox"
  />
  </span>
  <span className={styles.checkboxText}>
    <span className={styles.checkboxLabel}>チーム共有権限</span>
    <span className={styles.checkboxHelper}>子設定の一部だけが有効です。</span>
  </span>
</label>`,
          note:
            'mixed state は見た目だけではなく、DOM property の indeterminate と `aria-checked="mixed"` を揃えて扱います。',
        },
      ],
    },
  ] as const;
}

const checkboxStateGuides = [
  {
    id: 'state-context-do',
    tone: 'do',
    description:
      'error や mixed の意味は色だけに頼らず、helper / error 文言と関連付けを近くに置いて補います。',
    preview: (
      <div className={styles.referencePreviewFrame}>
        <CheckboxField
          className={styles.errorField}
          control={<DemoCheckbox aria-invalid="true" readOnly />}
          errorText="同意しないと次へ進めません。"
          helperText="送信前に内容を確認できます。"
          label="利用規約に同意する"
        />
      </div>
    ),
  },
  {
    id: 'state-context-dont',
    tone: 'dont',
    description:
      '赤い見た目や checked 状態だけで意味を伝えようとすると、何を直せばいいかや現在の状態が読み取りにくくなります。',
    preview: (
      <div className={styles.referencePreviewFrame}>
        <div className={styles.selectionSummary}>
          <CheckboxField
            control={<DemoCheckbox aria-invalid="true" readOnly />}
            label="利用規約に同意する"
          />
          <p className={styles.checkboxHelper}>
            補助文や error 文言がなく、状態の意味が UI から読み取りにくい例です。
          </p>
        </div>
      </div>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

const singleCheckboxGuides = [
  {
    id: 'single-checkbox-do',
    tone: 'do',
    description:
      '送信前の確認は単独 checkbox と helper 文で補い、mixed state が必要な親子選択とは分けて扱います。',
    preview: (
      <div className={styles.referencePreviewFrame}>
        <div className={styles.checkboxStack}>
          <CheckboxField
            control={<DemoCheckbox readOnly />}
            helperText="送信前に内容を確認できます。"
            label="利用規約に同意する"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'single-checkbox-dont',
    tone: 'dont',
    description:
      '即時切り替えの ON / OFF と同じノリで扱うと、確認入力なのか設定変更なのかが読み取りにくくなります。',
    preview: (
      <div className={styles.referencePreviewFrame}>
        <div className={styles.selectionSummary}>
          <p className={styles.selectionNote}>通知をオンにする</p>
          <CheckboxField control={<DemoCheckbox checked readOnly />} label="利用規約" />
        </div>
      </div>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

function renderStatesAndAccessibilityDetail(
  entry: CheckboxPatternEntry,
  metadataItems: CheckboxPatternMetadataItem[],
): ReactNode {
  return (
    <PatternReferenceContent
      guides={checkboxStateGuides}
      notes={buildCheckboxDetailNotes(entry, metadataItems)}
      variantNote={entry.snippets?.snippetSummary}
      variants={buildCheckboxStateReferenceVariants()}
    />
  );
}

function renderSingleCheckboxAndIndeterminateDetail(
  entry: CheckboxPatternEntry,
  metadataItems: CheckboxPatternMetadataItem[],
): ReactNode {
  return (
    <PatternReferenceContent
      guides={singleCheckboxGuides}
      notes={buildCheckboxDetailNotes(entry, metadataItems)}
      variantNote={entry.snippets?.snippetSummary}
      variants={buildSingleCheckboxReferenceVariants()}
    />
  );
}

function MobileAndTouchTargetsDemo(): ReactNode {
  const [selectedIds, setSelectedIds] = useState<
    Array<(typeof mobileOptions)[number]['id']>
  >(['release']);

  function toggleOption(optionId: (typeof mobileOptions)[number]['id']): void {
    setSelectedIds((current) => {
      if (current.includes(optionId)) {
        return current.filter((item) => item !== optionId);
      }

      return [...current, optionId];
    });
  }

  return (
    <div className={styles.demoFrame}>
      <div className={styles.previewGrid}>
        <PreviewCard
          label="長いラベル"
          description="ラベル全体を 48px 相当のタップ領域にして、縦並びでも押しやすく保ちます。">
          <div className={styles.touchStack}>
            {mobileOptions.map((option) => (
              <CheckboxField
                className={styles.touchField}
                control={
                  <DemoCheckbox
                    checked={selectedIds.includes(option.id)}
                    onChange={() => toggleOption(option.id)}
                  />
                }
                description={option.description}
                key={option.id}
                label={option.label}
              />
            ))}
          </div>
        </PreviewCard>
        <PreviewCard
          label="モバイルでの判断軸"
          description="checkbox は各項目の説明を見せながら複数選択させたいときに向きます。"
          className={styles.previewCardHiddenInDetail}>
          <ul className={styles.specList}>
            <li className={styles.specItem}>min-height は 48px 相当を目安にする</li>
            <li className={styles.specItem}>checkbox 本体だけでなくラベル全体をタップ可能にする</li>
            <li className={styles.specItem}>長文は縦に折り返し、行間を十分に取る</li>
            <li className={styles.specItem}>候補数が多い場合は select も検討する</li>
          </ul>
        </PreviewCard>
      </div>
      <p className={styles.demoNote}>
        候補数が多くて一覧密度を優先するなら select、即時切り替えを強調するなら switch を検討します。checkbox は説明文を見せながら複数選択させたい場面に向きます。
      </p>
    </div>
  );
}

const demoByKind: Record<CheckboxPatternEntry['demoKind'], DemoRenderer> = {
  'multiple-independent-selection': MultipleIndependentSelectionDemo,
  'selectable-cards': SelectableCardsDemo,
  'single-checkbox-and-indeterminate': SingleCheckboxAndIndeterminateDemo,
  'states-and-accessibility': StatesAndAccessibilityDemo,
  'mobile-and-touch-targets': MobileAndTouchTargetsDemo,
};

function buildMetadataItems(entry: CheckboxPatternEntry): CheckboxPatternMetadataItem[] {
  return [
    {label: '課題', tone: 'problem', value: entry.problem},
    {label: '解決方法', tone: 'solution', value: entry.solution},
    {label: '使いどころ', tone: 'usage', value: entry.whenToUse},
    {
      label: '他コントロールを選ぶ目安',
      tone: 'comparison',
      value: entry.comparisonTip,
    },
    {label: 'レイアウト', tone: 'layout', value: entry.layoutNotes},
    {label: '状態設計', tone: 'state', value: entry.stateNotes},
    {
      label: 'アクセシビリティ',
      tone: 'accessibility',
      value: entry.accessibilityNotes,
    },
  ];
}

export default function CheckboxPatternGallery({entries, density}: Props): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      aria-label="チェックボックスデザインパターンギャラリー"
      className={styles.root}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => {
          const Demo = demoByKind[entry.demoKind];
          const metadataItems = buildMetadataItems(entry);
          const crossReference =
            entry.id === 'single-checkbox-and-indeterminate' ? (
              <p className={styles.crossReference}>
                押下状態のトグル UI を見せたい場合は{' '}
                <Link to="/button/toggle-and-selection">ボタン / トグル・選択</Link>{' '}
                を参照してください。checkbox では mixed state と送信前の確認を優先します。
              </p>
            ) : null;

          if (density === 'detail') {
            if (entry.id === 'states-and-accessibility') {
              return (
                <div className={styles.detailContent} id={entry.id} key={entry.id}>
                  {renderStatesAndAccessibilityDetail(entry, metadataItems)}
                </div>
              );
            }

            if (entry.id === 'single-checkbox-and-indeterminate') {
              return (
                <div className={styles.detailContent} id={entry.id} key={entry.id}>
                  {renderSingleCheckboxAndIndeterminateDetail(entry, metadataItems)}
                </div>
              );
            }

            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
                <PatternReferenceContent
                  id={entry.id}
                  notes={buildCheckboxDetailNotes(entry, metadataItems)}
                  preview={
                    <div
                      className={clsx(
                        styles.demoPanel,
                        styles.detailPreviewPanel,
                      )}>
                      <Demo />
                    </div>
                  }
                  snippets={entry.snippets}
                  summary={entry.summary}
                  title={entry.title}
                />
              </div>
            );
          }

          return (
            <article className={styles.card} id={entry.id} key={entry.id}>
              <div className={styles.cardHeader}>
                <Heading as="h3" className={styles.cardTitle}>
                  {entry.title}
                </Heading>
                <p className={styles.cardSummary}>{entry.summary}</p>
                <ul aria-label={`${entry.title}のタグ`} className={styles.tagList}>
                  {entry.tags.map((tag) => (
                    <li className={styles.tag} key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.demoPanel}>
                <Demo />
              </div>

              {crossReference}

              <CheckboxPatternSnippetPanel
                density={density}
                entryTitle={entry.title}
                snippets={entry.snippets}
              />

              <CheckboxPatternMetadataPanel
                density={density}
                entryTitle={entry.title}
                items={metadataItems}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
