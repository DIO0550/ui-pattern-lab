import type {ReactNode} from 'react';
import clsx from 'clsx';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import type {ButtonReferenceNote} from '@site/src/components/ButtonReferenceLayout';
import {alertPatternSnippets} from '@site/src/data/alertPatternSnippets';
import type {
  AlertPatternEntry,
  AlertPatternEntryId,
  AlertPatternVariantId,
} from '@site/src/data/alertPatternTypes';

import styles from './styles.module.css';

type Props = {
  entry: AlertPatternEntry;
};

type AlertSeverityId = 'info' | 'success' | 'warning' | 'error' | 'neutral';

type PreviewAlertProps = {
  body: string;
  label: string;
  severity: AlertSeverityId;
  title: string;
  variantId: AlertPatternVariantId;
};

const alertSeverityOrder = ['info', 'success', 'warning', 'error', 'neutral'] as const;

const alertSeverityDefinitions: Readonly<
  Record<
    AlertSeverityId,
    {
      body: string;
      label: string;
      title: string;
    }
  >
> = {
  error: {
    body: '3 件の項目に修正が必要です。',
    label: 'エラー',
    title: '送信できません',
  },
  info: {
    body: '保存前に必須項目を確認してください。',
    label: 'Info',
    title: '入力内容を確認できます',
  },
  neutral: {
    body: '次回メンテナンスは 5 月 12 日です。',
    label: 'Neutral',
    title: 'システムからのお知らせ',
  },
  success: {
    body: '請求設定を更新しました。',
    label: 'Success',
    title: '変更を保存しました',
  },
  warning: {
    body: 'この操作は一部のメンバーに影響します。',
    label: 'Warning',
    title: '影響範囲を確認してください',
  },
} as const;

const alertVariantOrder = [
  'base',
  'outlined',
  'elevated',
  'compact',
  'action',
  'dismissible',
] as const;

const alertVariantDefinitions: Readonly<
  Record<
    AlertPatternVariantId,
    {
      description: string;
      name: string;
      previewNote: string;
    }
  >
> = {
  action: {
    description:
      'Alert の文脈から次の行動へ進ませる variant です。再試行、詳細確認、設定変更など、本文の意味に直結する操作だけを置きます。',
    name: 'Action',
    previewNote:
      '本文だけでは解決できない feedback に使い、primary action は 1 つに絞ると判断しやすくなります。',
  },
  base: {
    description:
      '淡い面と左罫線で文脈内 feedback を常駐させる基本 variant です。フォーム summary や system notice で使いやすい表示です。',
    name: 'Base',
    previewNote:
      'severity の意味を伝えながら、周辺コンテンツに馴染む強さで常駐させたいときの起点になります。',
  },
  compact: {
    description:
      '狭いフォーム行や設定ブロック内で使う密度高めの variant です。短い見出しと本文に絞り、長い説明は別導線へ逃がします。',
    name: 'Compact',
    previewNote:
      'スペースが限られる場所では compact にできますが、validation summary のような重要情報は過度に詰めすぎない設計が必要です。',
  },
  dismissible: {
    description:
      'ユーザーが消しても業務上困らない notice 向けの variant です。必須エラーや危険操作の警告には使わないようにします。',
    name: 'Dismissible',
    previewNote:
      'close button は Alert の右端に固定し、閉じてもよい情報だけに限定すると状態管理が読みやすくなります。',
  },
  elevated: {
    description:
      'カードや一覧より一段強く注意を引く variant です。常駐 notice のまま、周辺 surface から浮かせたい場面に向きます。',
    name: 'Elevated',
    previewNote:
      '影で前面に出すため、画面内に複数並べすぎず、重要な 1 件を目立たせる用途に絞ります。',
  },
  outlined: {
    description:
      '背景塗りを抑え、枠線と icon で意味を示す variant です。高密度な管理画面や一覧内で視覚ノイズを増やしにくい表示です。',
    name: 'Outlined',
    previewNote:
      '背景色の圧を下げたい画面で使いやすく、本文やフォーム項目の近くに軽く添えられます。',
  },
} as const;

/** Resolves the CSS severity class for one preview alert. */
function getSeverityClassName(severity: AlertSeverityId): string {
  if (severity === 'info') {
    return styles.severityInfo;
  }

  if (severity === 'success') {
    return styles.severitySuccess;
  }

  if (severity === 'warning') {
    return styles.severityWarning;
  }

  if (severity === 'error') {
    return styles.severityError;
  }

  return styles.severityNeutral;
}

/** Resolves the CSS variant class for one preview alert. */
function getVariantClassName(variantId: AlertPatternVariantId): string {
  if (variantId === 'base') {
    return styles.baseVariant;
  }

  if (variantId === 'outlined') {
    return styles.outlinedVariant;
  }

  if (variantId === 'elevated') {
    return styles.elevatedVariant;
  }

  if (variantId === 'compact') {
    return styles.compactVariant;
  }

  if (variantId === 'action') {
    return styles.actionVariant;
  }

  return styles.dismissibleVariant;
}

/** Renders one alert example inside the preview grid. */
function PreviewAlert({
  body,
  label,
  severity,
  title,
  variantId,
}: PreviewAlertProps): ReactNode {
  const role = severity === 'error' ? 'alert' : 'status';

  return (
    <article
      className={clsx(
        styles.alert,
        getVariantClassName(variantId),
        getSeverityClassName(severity),
      )}
      role={role}>
      <span aria-hidden="true" className={styles.alertIcon} />
      <div className={styles.alertContent}>
        <span className={styles.alertLabel}>{label}</span>
        <h3 className={styles.alertTitle}>{title}</h3>
        <p className={styles.alertBody}>{body}</p>
        {variantId === 'action' ? (
          <button className={styles.alertAction} type="button">
            詳細を確認
          </button>
        ) : null}
      </div>
      {variantId === 'dismissible' ? (
        <button className={styles.alertClose} type="button" aria-label={`${title}を閉じる`}>
          ×
        </button>
      ) : null}
    </article>
  );
}

/** Builds the note cards shown under the shared reference layout. */
function buildNotes(entry: AlertPatternEntry): readonly ButtonReferenceNote[] {
  return [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'layout', label: '配置 / 密度', value: entry.layoutNotes},
    {id: 'state', label: '状態設計', value: entry.stateNotes},
    {id: 'a11y', label: 'アクセシビリティ', value: entry.accessibilityNotes},
  ];
}

/** Builds the preview surface for one alert variant. */
function buildVariantPreview(variantId: AlertPatternVariantId): ReactNode {
  return (
    <div className={styles.previewStack}>
      <div className={styles.previewGrid}>
        {alertSeverityOrder.map((severity) => {
          const severityDefinition = alertSeverityDefinitions[severity];

          return (
            <PreviewAlert
              body={severityDefinition.body}
              key={severity}
              label={severityDefinition.label}
              severity={severity}
              title={severityDefinition.title}
              variantId={variantId}
            />
          );
        })}
      </div>
      <p className={styles.previewNote}>{alertVariantDefinitions[variantId].previewNote}</p>
    </div>
  );
}

/** Builds the shared reference variants for the contextual alert page. */
function buildVariants(entryId: AlertPatternEntryId): readonly PatternReferenceVariant[] {
  return alertVariantOrder.map((variantId) => ({
    description: alertVariantDefinitions[variantId].description,
    id: `${entryId}-${variantId}`,
    name: alertVariantDefinitions[variantId].name,
    preview: buildVariantPreview(variantId),
    previewClassName: styles.widePreview,
    tabs: buildReferenceCodeTabs(alertPatternSnippets[entryId][variantId].items),
  }));
}

/** Renders the shared reference layout for the first alert pattern. */
export default function ContextualAlertReferenceContent({entry}: Props): ReactNode {
  return (
    <PatternReferenceContent
      notes={buildNotes(entry)}
      variantNote="Alert はページ内に残る feedback として扱い、severity と visual style と behavior を分離します。base / outlined / elevated / compact / action / dismissible を 1 variant block : 1 code panel で確認できます。"
      variantSectionLabel="バリアント"
      variants={buildVariants(entry.id)}
    />
  );
}
