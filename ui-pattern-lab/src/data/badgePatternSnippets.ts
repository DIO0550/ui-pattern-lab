import type {
  BadgePatternEntryId,
  BadgePatternSnippets,
  BadgePatternVariantId,
} from '@site/src/data/badgePatternTypes';

type BadgeToneId = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

const badgeToneExamples = [
  {count: '0', label: '標準', text: '下書き', tone: 'default'},
  {count: '8', label: 'Primary', text: '新着', tone: 'primary'},
  {count: '24', label: 'Success', text: '確認済み', tone: 'success'},
  {count: '3', label: 'Warning', text: '要確認', tone: 'warning'},
  {count: '2', label: 'エラー', text: '差し戻し', tone: 'error'},
  {count: '99+', label: 'Info', text: '更新情報', tone: 'info'},
] as const satisfies ReadonlyArray<{
  count: string;
  label: string;
  text: string;
  tone: BadgeToneId;
}>;

const badgeVariantClassNames: Readonly<Record<BadgePatternVariantId, string>> = {
  filled: 'badge--filled',
  outlined: 'badge--outlined',
  soft: 'badge--soft',
  surface: 'badge--surface',
} as const;

const badgeVariantSummaries: Readonly<Record<BadgePatternVariantId, string>> = {
  filled:
    '背景色を主役にして、ステータスや重要度を最もはっきり補足する基本 variant です。',
  outlined:
    '情報の存在は示しつつ塗り面を抑え、一覧や密度高めの surface でも圧を出しすぎない variant です。',
  soft:
    '淡い色面でトーンを添え、本文やカード本文の近くで補足情報をやわらかく伝える variant です。',
  surface:
    '背景 surface に寄せて軽く浮かせ、ニュートラルな面の中でも badge の境界を保ちたいときの variant です。',
} as const;

/** Builds the TSX snippet shown for one badge variant. */
function buildBadgeTsxSnippet(variantId: BadgePatternVariantId): string {
  const variantClassName = badgeVariantClassNames[variantId];
  const toneLines = badgeToneExamples
    .map(
      (example) => `  <article className="toneCard">
    <span className="toneLabel">${example.label}</span>
    <div className="badgeRow">
      <span className={\`badge ${variantClassName} badge--${example.tone}\`}>
        ${example.text}
      </span>
      <span className={\`badge ${variantClassName} badge--${example.tone} badge--count\`}>
        ${example.count}
      </span>
    </div>
  </article>`,
    )
    .join('\n\n');

  return `<section className="badgeGrid" aria-label="${variantId} badge examples">
${toneLines}
</section>`;
}

/** Builds the CSS snippet shown for one badge variant. */
function buildBadgeCssSnippet(variantId: BadgePatternVariantId): string {
  const variantStyles: Readonly<Record<BadgePatternVariantId, string>> = {
    filled: `.badge--filled {
  background: var(--badge-accent);
  border-color: var(--badge-accent);
  color: var(--badge-contrast);
}`,
    outlined: `.badge--outlined {
  background: transparent;
  border-color: color-mix(in srgb, var(--badge-accent) 54%, transparent);
  color: var(--badge-accent);
}`,
    soft: `.badge--soft {
  background: color-mix(in srgb, var(--badge-accent) 13%, var(--ifm-background-surface-color));
  border-color: transparent;
  color: var(--badge-accent);
}`,
    surface: `.badge--surface {
  background: var(--ifm-background-surface-color);
  border-color: color-mix(in srgb, var(--badge-accent) 18%, var(--ifm-color-emphasis-300));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--badge-accent) 8%, transparent);
  color: var(--badge-accent);
}`,
  } as const;

  return `.badgeGrid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.toneCard {
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1rem;
  padding: 0.8rem;
}

.toneLabel {
  color: var(--ifm-color-emphasis-700);
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  margin-bottom: 0.55rem;
}

.badgeRow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  --badge-accent: var(--ifm-color-emphasis-700);
  --badge-contrast: #ffffff;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 999px;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 700;
  justify-content: center;
  min-height: 2rem;
  padding: 0.25rem 0.7rem;
  white-space: nowrap;
}

.badge--count {
  font-variant-numeric: tabular-nums;
  min-width: 3.2rem;
}

${variantStyles[variantId]}

.badge--default {
  --badge-accent: var(--ifm-color-emphasis-700);
}

.badge--primary {
  --badge-accent: var(--ifm-color-primary);
}

.badge--success {
  --badge-accent: var(--ifm-color-success);
}

.badge--warning {
  --badge-accent: #b86500;
  --badge-contrast: #ffffff;
}

.badge--error {
  --badge-accent: var(--ifm-color-danger);
}

.badge--info {
  --badge-accent: #1474c4;
}`;
}

/** Creates the snippet bundle for one badge variant. */
function buildBadgeVariantSnippets(
  variantId: BadgePatternVariantId,
): BadgePatternSnippets {
  return {
    items: [
      {
        code: buildBadgeTsxSnippet(variantId),
        id: `${variantId}-tsx`,
        label: 'TSX',
        language: 'tsx',
        note:
          'テキスト badge と数値 badge を同じ tone card に置き、色ごとの役割差と桁数差を一度に確認できる構成です。',
      },
      {
        code: buildBadgeCssSnippet(variantId),
        id: `${variantId}-css`,
        label: 'CSS',
        language: 'css',
        note:
          'variant ごとの差分だけを切り替え、tone ごとの色指定は CSS custom property に寄せると保守しやすくなります。',
      },
    ],
    snippetSummary: badgeVariantSummaries[variantId],
  };
}

export const badgePatternSnippets: Record<
  BadgePatternEntryId,
  Record<BadgePatternVariantId, BadgePatternSnippets>
> = {
  'text-and-number-badge': {
    filled: buildBadgeVariantSnippets('filled'),
    outlined: buildBadgeVariantSnippets('outlined'),
    soft: buildBadgeVariantSnippets('soft'),
    surface: buildBadgeVariantSnippets('surface'),
  },
};
