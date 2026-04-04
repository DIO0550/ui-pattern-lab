import {useState} from 'react';
import type {ReactNode} from 'react';
import ButtonReferenceLayout, {
  type ButtonReferenceGuide,
  type ButtonReferenceNote,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import type {CheckboxPatternEntry} from '@site/src/data/checkboxPatternTypes';
import checkboxGalleryStyles from '@site/src/components/CheckboxPatternGallery/styles.module.css';

import styles from './styles.module.css';

type Props = {
  entry: CheckboxPatternEntry;
};

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

const checkboxCriteria = ['複数選択', '未選択を許容', '情報量の多い候補'] as const;
const radioCriteria = ['1 件だけ選択', '必ず 1 つ選ぶ', '単一の form value'] as const;

function buildNotes(entry: CheckboxPatternEntry): ButtonReferenceNote[] {
  return [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'comparison', label: '比較 / 判断軸', value: entry.comparisonTip},
    {id: 'layout', label: '余白 / サイズ', value: entry.layoutNotes},
    {id: 'state', label: '状態設計', value: entry.stateNotes},
    {id: 'a11y', label: 'アクセシビリティ', value: entry.accessibilityNotes},
  ];
}

function PreviewFrame({children}: {children: ReactNode}): ReactNode {
  return <div className={`${checkboxGalleryStyles.root} ${styles.previewRoot}`}>{children}</div>;
}

type SelectableCardFieldProps = {
  controlType?: 'checkbox' | 'radio';
  description: string;
  detail: string;
  name?: string;
  onChange?: () => void;
  selected: boolean;
  title: string;
};

function SelectableCardField({
  controlType = 'checkbox',
  description,
  detail,
  name,
  onChange,
  selected,
  title,
}: SelectableCardFieldProps): ReactNode {
  const inputProps = onChange ? {onChange} : {readOnly: true};

  return (
    <label className={checkboxGalleryStyles.selectableCardOption}>
      <input
        checked={selected}
        className={checkboxGalleryStyles.selectableCardInput}
        name={name}
        type={controlType}
        {...inputProps}
      />
      <span className={checkboxGalleryStyles.selectableCardSurface}>
        <span className={checkboxGalleryStyles.selectableCardHeader}>
          <span className={checkboxGalleryStyles.selectableCardTitle}>{title}</span>
          <span className={checkboxGalleryStyles.selectableCardBadge}>
            {selected ? '選択中' : '未選択'}
          </span>
        </span>
        <span className={checkboxGalleryStyles.selectableCardDescription}>{description}</span>
        <span className={checkboxGalleryStyles.selectableCardDetail}>{detail}</span>
      </span>
    </label>
  );
}

function SelectableCardVariantPreview(): ReactNode {
  const [selectedIds, setSelectedIds] = useState<
    Array<(typeof selectableCardOptions)[number]['id']>
  >(['security']);

  function toggleOption(optionId: (typeof selectableCardOptions)[number]['id']): void {
    setSelectedIds((current) => {
      if (current.includes(optionId)) {
        return current.filter((item) => item !== optionId);
      }

      return [...current, optionId];
    });
  }

  return (
    <PreviewFrame>
      <fieldset className={checkboxGalleryStyles.checkboxGroup}>
        <legend className={checkboxGalleryStyles.groupLegend}>追加する機能パック</legend>
        <div className={checkboxGalleryStyles.selectableCardList}>
          {selectableCardOptions.map((option) => (
            <SelectableCardField
              description={option.description}
              detail={option.detail}
              key={option.id}
              onChange={() => {
                toggleOption(option.id);
              }}
              selected={selectedIds.includes(option.id)}
              title={option.title}
            />
          ))}
        </div>
      </fieldset>
    </PreviewFrame>
  );
}

function FullCardHitAreaGuidePreview(): ReactNode {
  return (
    <div className={`${checkboxGalleryStyles.root} ${styles.guidePreview}`}>
      <SelectableCardField
        description="カード全体を押して選択状態を切り替えます。"
        detail="checkbox の semantics は hidden input 側に残します。"
        selected
        title="カード全体が押せる"
      />
    </div>
  );
}

function SmallCheckboxOnlyGuidePreview(): ReactNode {
  return (
    <div className={styles.badHitArea}>
      <div className={styles.badHitRow}>
        <span aria-hidden="true" className={styles.badCheckbox} />
        <div className={styles.badHitText}>
          <strong className={styles.badHitTitle}>分析レポート</strong>
          <p className={styles.badHitDetail}>checkbox 本体だけを狙わせると、カード UI の利点が消えます。</p>
        </div>
      </div>
    </div>
  );
}

function DecisionCriteriaGuidePreview({
  criteria,
  label,
}: {
  criteria: readonly string[];
  label: string;
}): ReactNode {
  return (
    <div className={`${checkboxGalleryStyles.root} ${styles.criteriaGuide}`}>
      <span className={styles.axisLabel}>{label}</span>
      <ul className={checkboxGalleryStyles.summaryPillList}>
        {criteria.map((item) => (
          <li className={checkboxGalleryStyles.summaryPill} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const guides = [
  {
    id: 'whole-card-hit-area',
    tone: 'do',
    description:
      'checkbox を隠しても、カード全体を label として押せるようにして、視覚的なヒットエリアと実際の操作範囲を一致させます。',
    preview: <FullCardHitAreaGuidePreview />,
  },
  {
    id: 'checkbox-only-hit-area',
    tone: 'dont',
    description:
      'カード UI の横に小さな checkbox だけを残すと、どこを押せるのかが分かりにくくなり、タッチ操作もしづらくなります。',
    preview: <SmallCheckboxOnlyGuidePreview />,
  },
  {
    id: 'use-checkbox-for-multi-select',
    tone: 'do',
    description:
      '複数選択・未選択許容・情報量の多い候補という条件がそろうなら、checkbox card に分ける判断が自然です。',
    preview: <DecisionCriteriaGuidePreview criteria={checkboxCriteria} label="checkbox" />,
  },
  {
    id: 'avoid-single-choice-checkbox-card',
    tone: 'dont',
    description:
      '1 件だけ選ばせる入力を checkbox card のまま表現しないでください。exclusive choice は selector / radio card へ分けます。',
    preview: <DecisionCriteriaGuidePreview criteria={radioCriteria} label="selector" />,
  },
] satisfies readonly ButtonReferenceGuide[];

export default function SelectableCardsReferenceContent({entry}: Props): ReactNode {
  const selectableCardTabs =
    entry.snippets?.items.map((item) => ({
      id: item.id,
      label: item.label,
      code: item.code,
      language: item.language,
      note: item.note,
    })) ?? [];

  const variants: readonly ButtonReferenceVariant[] = [
    {
      id: 'selectable-card',
      name: 'Selectable card',
      description:
        'checkbox の semantics を保ったまま、カード全体を押せる複数選択 UI として見せます。',
      preview: <SelectableCardVariantPreview />,
      tabs: selectableCardTabs,
    },
  ];

  return (
    <ButtonReferenceLayout
      guides={guides}
      notes={buildNotes(entry)}
      variantNote={`selectable card という見た目は共通でも、複数選択・未選択許容・情報量の多い候補なら checkbox を選びます。${radioCriteria.join('・')} を満たして最後に 1 つの form value へ確定するなら radio card へ分けてください。`}
      variantSectionLabel="使い分け"
      variants={variants}
    />
  );
}
