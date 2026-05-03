import type {
  AlertPatternEntryId,
  AlertPatternSnippets,
  AlertPatternVariantId,
} from '@site/src/data/alertPatternTypes';

type AlertSeverityId = 'info' | 'success' | 'warning' | 'error' | 'neutral';

const alertSeverityExamples = [
  {
    body: '保存前に必須項目を確認してください。',
    label: 'Info',
    severity: 'info',
    title: '入力内容を確認できます',
  },
  {
    body: '請求設定を更新しました。',
    label: 'Success',
    severity: 'success',
    title: '変更を保存しました',
  },
  {
    body: 'この操作は一部のメンバーに影響します。',
    label: 'Warning',
    severity: 'warning',
    title: '影響範囲を確認してください',
  },
  {
    body: '3 件の項目に修正が必要です。',
    label: 'エラー',
    severity: 'error',
    title: '送信できません',
  },
  {
    body: '次回メンテナンスは 5 月 12 日です。',
    label: 'Neutral',
    severity: 'neutral',
    title: 'システムからのお知らせ',
  },
] as const satisfies ReadonlyArray<{
  body: string;
  label: string;
  severity: AlertSeverityId;
  title: string;
}>;

const alertVariantClassNames: Readonly<Record<AlertPatternVariantId, string>> = {
  action: 'alert--action',
  base: 'alert--base',
  compact: 'alert--compact',
  dismissible: 'alert--dismissible',
  elevated: 'alert--elevated',
  outlined: 'alert--outlined',
} as const;

const alertVariantSummaries: Readonly<Record<AlertPatternVariantId, string>> = {
  action:
    '本文に続けて次の行動を置く variant です。再試行、詳細確認、設定変更など、Alert の文脈から自然に進む操作だけに絞ります。',
  base:
    '淡い面と左罫線で文脈内 feedback を常駐させる基本 variant です。severity の意味を保ちながら、本文周辺に馴染ませます。',
  compact:
    '狭いフォーム行や設定行の近くで使う密度高めの variant です。見出しと短い本文だけに絞り、複数行の説明は避けます。',
  dismissible:
    'ユーザーが消しても業務上困らない system notice 向けの variant です。error や必須 validation summary には使いません。',
  elevated:
    'カードや一覧の上に重ねて注意を引く variant です。画面上の他要素より一段強く示したい常駐 notice に使います。',
  outlined:
    '背景塗りを抑え、境界線と icon で意味を示す variant です。高密度画面で Alert の存在だけを軽く残したいときに向きます。',
} as const;

/** Builds the TSX snippet shown for one alert variant. */
function buildAlertTsxSnippet(variantId: AlertPatternVariantId): string {
  const variantClassName = alertVariantClassNames[variantId];
  const alertLines = alertSeverityExamples
    .map((example) => {
      const actionMarkup =
        variantId === 'action'
          ? `
      <button className="alertAction" type="button">詳細を確認</button>`
          : '';
      const dismissMarkup =
        variantId === 'dismissible'
          ? `
      <button className="alertClose" aria-label="${example.title}を閉じる" type="button">×</button>`
          : '';

      return `  <article className={\`alert ${variantClassName} alert--${example.severity}\`} role="${example.severity === 'error' ? 'alert' : 'status'}">
    <span className="alertIcon" aria-hidden="true"></span>
    <div className="alertContent">
      <span className="alertLabel">${example.label}</span>
      <h3 className="alertTitle">${example.title}</h3>
      <p className="alertBody">${example.body}</p>${actionMarkup}
    </div>${dismissMarkup}
  </article>`;
    })
    .join('\n\n');

  return `<section className="alertStack" aria-label="${variantId} alert examples">
${alertLines}
</section>`;
}

/** Builds the CSS snippet shown for one alert variant. */
function buildAlertCssSnippet(variantId: AlertPatternVariantId): string {
  const variantStyles: Readonly<Record<AlertPatternVariantId, string>> = {
    action: `.alert--action {
  align-items: start;
}

.alertAction {
  background: var(--alert-accent);
  border: 0;
  border-radius: 0.45rem;
  color: var(--alert-contrast);
  font-weight: 700;
  margin-top: 0.75rem;
  padding: 0.45rem 0.8rem;
}`,
    base: `.alert--base {
  background: color-mix(in srgb, var(--alert-accent) 10%, var(--surface));
  border-color: color-mix(in srgb, var(--alert-accent) 24%, transparent);
  border-left-color: var(--alert-accent);
  border-left-width: 0.35rem;
}`,
    compact: `.alert--compact {
  gap: 0.65rem;
  padding: 0.65rem 0.75rem;
}

.alert--compact .alertBody {
  font-size: 0.875rem;
}`,
    dismissible: `.alert--dismissible {
  grid-template-columns: auto minmax(0, 1fr) auto;
}

.alertClose {
  align-items: center;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--alert-accent) 28%, transparent);
  border-radius: 999px;
  color: var(--alert-accent);
  display: inline-flex;
  font-size: 1rem;
  height: 2rem;
  justify-content: center;
  width: 2rem;
}`,
    elevated: `.alert--elevated {
  background: var(--surface);
  border-color: color-mix(in srgb, var(--alert-accent) 18%, var(--border));
  box-shadow: 0 18px 45px color-mix(in srgb, var(--alert-accent) 16%, transparent);
}`,
    outlined: `.alert--outlined {
  background: transparent;
  border-color: color-mix(in srgb, var(--alert-accent) 42%, var(--border));
}`,
  } as const;

  return `.alertStack {
  display: grid;
  gap: 0.8rem;
}

.alert {
  --alert-accent: #2563eb;
  --alert-contrast: #ffffff;
  --surface: #ffffff;
  --border: #d9e1ec;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  color: #172033;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: auto minmax(0, 1fr);
  padding: 0.9rem;
}

.alertIcon {
  background: var(--alert-accent);
  border-radius: 999px;
  height: 0.85rem;
  margin-top: 0.3rem;
  width: 0.85rem;
}

.alertLabel,
.alertTitle,
.alertBody {
  margin: 0;
}

.alertLabel {
  color: var(--alert-accent);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.alertTitle {
  font-size: 1rem;
  font-weight: 800;
}

.alertBody {
  color: #4a5568;
  line-height: 1.6;
}

${variantStyles[variantId]}

.alert--info {
  --alert-accent: #2563eb;
}

.alert--success {
  --alert-accent: #168a4a;
}

.alert--warning {
  --alert-accent: #b45309;
}

.alert--error {
  --alert-accent: #dc2626;
}

.alert--neutral {
  --alert-accent: #5f6b7a;
}`;
}

/** Creates the snippet bundle for one alert variant. */
function buildAlertVariantSnippets(
  variantId: AlertPatternVariantId,
): AlertPatternSnippets {
  return {
    items: [
      {
        code: buildAlertTsxSnippet(variantId),
        id: `${variantId}-tsx`,
        label: 'TSX',
        language: 'tsx',
        note:
          'severity は class と role で表し、visual style は variant class に分けると、意味と見た目を独立して調整できます。',
      },
      {
        code: buildAlertCssSnippet(variantId),
        id: `${variantId}-css`,
        label: 'CSS',
        language: 'css',
        note:
          'severity ごとの色は CSS custom property に寄せ、variant は面・枠・影・密度・操作部だけを切り替えます。',
      },
    ],
    snippetSummary: alertVariantSummaries[variantId],
  };
}

export const alertPatternSnippets: Record<
  AlertPatternEntryId,
  Record<AlertPatternVariantId, AlertPatternSnippets>
> = {
  'contextual-alert': {
    action: buildAlertVariantSnippets('action'),
    base: buildAlertVariantSnippets('base'),
    compact: buildAlertVariantSnippets('compact'),
    dismissible: buildAlertVariantSnippets('dismissible'),
    elevated: buildAlertVariantSnippets('elevated'),
    outlined: buildAlertVariantSnippets('outlined'),
  },
};
