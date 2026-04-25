import type {ReactNode} from 'react';
import clsx from 'clsx';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import type {ButtonReferenceNote} from '@site/src/components/ButtonReferenceLayout';
import {badgePatternSnippets} from '@site/src/data/badgePatternSnippets';
import type {
  BadgePatternEntry,
  BadgePatternEntryId,
  BadgePatternVariantId,
} from '@site/src/data/badgePatternTypes';

import styles from './styles.module.css';

type Props = {
  entry: BadgePatternEntry;
};

type BadgeToneId = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

type PreviewBadgeProps = {
  children: ReactNode;
  isCount?: boolean;
  tone: BadgeToneId;
  variantId: BadgePatternVariantId;
};

const badgeToneOrder = ['default', 'primary', 'success', 'warning', 'error', 'info'] as const;

const badgeToneDefinitions: Readonly<
  Record<
    BadgeToneId,
    {
      count: string;
      label: string;
      text: string;
    }
  >
> = {
  default: {count: '0', label: 'Default', text: '下書き'},
  error: {count: '2', label: 'Error', text: '差し戻し'},
  info: {count: '99+', label: 'Info', text: '更新情報'},
  primary: {count: '8', label: 'Primary', text: '新着'},
  success: {count: '24', label: 'Success', text: '確認済み'},
  warning: {count: '3', label: 'Warning', text: '要確認'},
} as const;

const badgeVariantOrder = ['filled', 'outlined', 'soft', 'surface'] as const;

const badgeVariantDefinitions: Readonly<
  Record<
    BadgePatternVariantId,
    {
      description: string;
      name: string;
      previewNote: string;
    }
  >
> = {
  filled: {
    description:
      '最も強い視認性でステータスや件数を補足する variant です。通知、重要度高めの属性、空状態ではない件数表示に向きます。',
    name: 'Filled',
    previewNote:
      '色面を主役にした variant なので、情報の重さを strongest に寄せたい badge に向いています。',
  },
  outlined: {
    description:
      '輪郭線で存在を示し、背景塗りを抑える variant です。高密度な一覧やニュートラルな surface の中でも圧を出しすぎません。',
    name: 'Outlined',
    previewNote:
      '枠線で badge の境界だけを残し、本文やカード本文の近くで軽く添えたいときに使いやすい variant です。',
  },
  soft: {
    description:
      '淡い色面でトーンを添える variant です。状態の意味は持たせつつ、Filled より柔らかく情報を補足できます。',
    name: 'Soft',
    previewNote:
      '色の気配は残しつつ、背景面の圧を抑えて補足情報を自然に馴染ませたい場面に向いています。',
  },
  surface: {
    description:
      '背景 surface に寄せて軽く浮かせる variant です。カードや table のセル周辺で、badge 自体の存在だけを穏やかに示します。',
    name: 'Surface',
    previewNote:
      'ニュートラルな面の中で badge の境界を保ちたいときに使いやすく、色面を押し出しすぎません。',
  },
} as const;

/** Resolves the CSS tone class for one preview badge. */
function getToneClassName(tone: BadgeToneId): string {
  if (tone === 'default') {
    return styles.toneDefault;
  }

  if (tone === 'primary') {
    return styles.tonePrimary;
  }

  if (tone === 'success') {
    return styles.toneSuccess;
  }

  if (tone === 'warning') {
    return styles.toneWarning;
  }

  if (tone === 'error') {
    return styles.toneError;
  }

  return styles.toneInfo;
}

/** Resolves the CSS variant class for one preview badge. */
function getVariantClassName(variantId: BadgePatternVariantId): string {
  if (variantId === 'filled') {
    return styles.filledVariant;
  }

  if (variantId === 'outlined') {
    return styles.outlinedVariant;
  }

  if (variantId === 'soft') {
    return styles.softVariant;
  }

  return styles.surfaceVariant;
}

/** Renders one badge chip inside the preview grid. */
function PreviewBadge({
  children,
  isCount = false,
  tone,
  variantId,
}: PreviewBadgeProps): ReactNode {
  return (
    <span
      className={clsx(
        styles.badge,
        getVariantClassName(variantId),
        getToneClassName(tone),
        isCount && styles.countBadge,
      )}>
      {children}
    </span>
  );
}

/** Builds the note cards shown under the shared reference layout. */
function buildNotes(entry: BadgePatternEntry): readonly ButtonReferenceNote[] {
  return [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'spacing', label: '余白 / サイズ', value: entry.layoutNotes},
    {id: 'state', label: '状態設計', value: entry.stateNotes},
    {id: 'a11y', label: 'アクセシビリティ', value: entry.accessibilityNotes},
  ];
}

/** Builds the preview surface for one badge variant. */
function buildVariantPreview(variantId: BadgePatternVariantId): ReactNode {
  return (
    <div className={styles.previewStack}>
      <div className={styles.previewGrid}>
        {badgeToneOrder.map((tone) => {
          const toneDefinition = badgeToneDefinitions[tone];

          return (
            <article className={styles.previewCard} key={tone}>
              <span className={styles.previewLabel}>{toneDefinition.label}</span>
              <div className={styles.badgeRow}>
                <PreviewBadge tone={tone} variantId={variantId}>
                  {toneDefinition.text}
                </PreviewBadge>
                <PreviewBadge isCount tone={tone} variantId={variantId}>
                  {toneDefinition.count}
                </PreviewBadge>
              </div>
            </article>
          );
        })}
      </div>
      <p className={styles.previewNote}>{badgeVariantDefinitions[variantId].previewNote}</p>
    </div>
  );
}

/** Builds the shared reference variants for the text-and-number badge page. */
function buildVariants(entryId: BadgePatternEntryId): readonly PatternReferenceVariant[] {
  return badgeVariantOrder.map((variantId) => ({
    description: badgeVariantDefinitions[variantId].description,
    id: `${entryId}-${variantId}`,
    name: badgeVariantDefinitions[variantId].name,
    preview: buildVariantPreview(variantId),
    previewClassName: styles.widePreview,
    tabs: buildReferenceCodeTabs(badgePatternSnippets[entryId][variantId].items),
  }));
}

/** Renders the shared reference layout for the first badge pattern. */
export default function TextAndNumberBadgeReferenceContent({
  entry,
}: Props): ReactNode {
  return (
    <PatternReferenceContent
      notes={buildNotes(entry)}
      variantNote="Badge は非インタラクティブな補足ラベルとして扱い、Filled / Outlined / Soft / Surface を 1 variant block : 1 code panel で分離しています。各 block では 6 色の tone と、0 / 8 / 24 / 99+ の件数差を同じ preview 内で確認できます。"
      variantSectionLabel="バリアント"
      variants={buildVariants(entry.id)}
    />
  );
}
