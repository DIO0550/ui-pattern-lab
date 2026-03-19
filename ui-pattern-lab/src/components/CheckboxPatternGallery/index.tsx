import type {ComponentPropsWithoutRef, ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import CheckboxPatternMetadataPanel from '@site/src/components/CheckboxPatternMetadataPanel';
import CheckboxPatternSectionCard from '@site/src/components/CheckboxPatternSectionCard';
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

function PreviewCard({label, description, children}: PreviewCardProps): ReactNode {
  return (
    <section className={styles.previewCard}>
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
          description="checkbox は未選択のままでも成立し、必要な分だけ組み合わせられます。">
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
          description="情報量の多い候補を複数選択させるときに向く派生パターンです。">
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
          label="Focus visible"
          description="キーボード移動時の輪郭を消しません。">
          <CheckboxField
            className={styles.focusField}
            control={<DemoCheckbox checked readOnly />}
            helperText="outline と helper text を併用して現在位置を見失わないようにします。"
            label="キーボード操作でも見失わない"
          />
        </PreviewCard>
        <PreviewCard
          label="Disabled"
          description="操作不可の理由を文言でも補います。">
          <CheckboxField
            control={<DemoCheckbox checked disabled readOnly />}
            helperText="権限がないため変更できません。"
            label="管理者が固定した設定"
          />
        </PreviewCard>
        <PreviewCard
          label="Error"
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
          label="Mixed"
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
          description="checkbox は各項目の説明を見せながら複数選択させたいときに向きます。">
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
            return (
              <div className={styles.detailContent} id={entry.id} key={entry.id}>
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

                <CheckboxPatternSectionCard
                  ariaLabel={`${entry.title}のプレビュー`}
                  label="見た目"
                  title="プレビュー">
                  <div className={styles.demoPanel}>
                    <Demo />
                  </div>
                </CheckboxPatternSectionCard>

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
