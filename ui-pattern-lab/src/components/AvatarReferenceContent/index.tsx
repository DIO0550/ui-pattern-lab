import type {ReactNode} from 'react';
import clsx from 'clsx';
import PatternReferenceContent, {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import type {ButtonReferenceNote} from '@site/src/components/ButtonReferenceLayout';
import {avatarPatternSnippets} from '@site/src/data/avatarPatternSnippets';
import type {
  AvatarPatternEntry,
  AvatarPatternEntryId,
  AvatarPatternVariantId,
} from '@site/src/data/avatarPatternTypes';

import styles from './styles.module.css';

type Props = {
  entry: AvatarPatternEntry;
};

type AvatarPreviewProps = {
  children?: ReactNode;
  hasImage?: boolean;
  label: string;
  tone?: 'blue' | 'green' | 'gold' | 'pink' | 'neutral';
};

const avatarVariantDefinitions: Readonly<
  Record<
    AvatarPatternVariantId,
    {
      description: string;
      name: string;
      previewNote: string;
    }
  >
> = {
  'card-label': {
    description:
      'カード内で avatar、名前、役割、状態 badge をまとめ、人物の詳細を小さな surface として見せる variant です。',
    name: 'Card Label',
    previewNote:
      'カード単位で主体情報を扱う場合は、avatar を左端の視覚アンカーにし、状態は badge として分離します。',
  },
  icon: {
    description:
      '画像や個人名を持たない Bot、system actor、組織を icon fallback として表示する variant です。',
    name: 'Icon Fallback',
    previewNote:
      'icon fallback でも avatar と同じ size / shape を維持すると、一覧で主体表示のリズムが崩れません。',
  },
  image: {
    description:
      '実画像を使って主体を識別する標準 variant です。読み込み失敗時は同じ領域の fallback へ切り替えます。',
    name: 'Image',
    previewNote:
      '隣に名前がある場合は画像の alt を空にし、avatar 単独で意味を持つ場合だけ label を付けます。',
  },
  initials: {
    description:
      '画像がない人物を短いイニシャルで表す fallback variant です。背景色と文字量を制限して判読性を保ちます。',
    name: 'Initials',
    previewNote:
      'イニシャルは 1〜2 文字程度に抑え、長い名前やメールアドレスを avatar 内へ詰め込まないようにします。',
  },
  'inline-label': {
    description:
      'avatar と名前、役割を横並びにし、コメントヘッダーや担当者表示に使いやすくする variant です。',
    name: 'Inline Label',
    previewNote:
      '名前テキストが隣接しているため avatar は装飾扱いにし、主ラベルを読み上げ対象として残します。',
  },
  'list-label': {
    description:
      '一覧行で avatar、主ラベル、補足情報、状態テキストを整列させる variant です。',
    name: 'List Label',
    previewNote:
      '狭い幅でも avatar と名前を優先し、補足メタ情報は省略可能な領域として扱います。',
  },
  'overlap-group': {
    description:
      '少人数の avatar を重ねて横幅を抑え、参加者の存在をコンパクトに示す group variant です。',
    name: 'Overlap Group',
    previewNote:
      '重ねる場合は outline で境界を残し、個々の avatar が背景へ沈まないようにします。',
  },
  'stacked-group': {
    description:
      '重なりを弱め、顔やイニシャルを読み取りやすく横並びにする group variant です。',
    name: 'Stacked Group',
    previewNote:
      '幅に余裕があるツールバーやカードヘッダーでは、弱い gap の stacked 表示が読みやすくなります。',
  },
  'summary-group': {
    description:
      '表示上限を超えた参加者を +N の summary avatar に寄せる group variant です。',
    name: 'Summary Group',
    previewNote:
      '+N は詳細表示の代わりではなく、表示上限を超えた人数がいることを示す要約として扱います。',
  },
};

/** Renders one avatar preview token. */
function AvatarPreview({
  children,
  hasImage = false,
  label,
  tone = 'blue',
}: AvatarPreviewProps): ReactNode {
  return (
    <span
      aria-label={label}
      className={clsx(styles.avatar, styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}`])}>
      {hasImage ? (
        <span aria-hidden="true" className={styles.imagePattern} />
      ) : (
        children
      )}
    </span>
  );
}

/** Renders the small bot icon used by the icon fallback preview. */
function BotIcon(): ReactNode {
  return (
    <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
      <path d="M12 3a7 7 0 0 0-7 7v3.2L3.8 16h16.4L19 13.2V10a7 7 0 0 0-7-7Z" />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

/** Builds the note cards shown under the shared reference layout. */
function buildNotes(entry: AvatarPatternEntry): readonly ButtonReferenceNote[] {
  return [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'layout', label: 'サイズ / 配置', value: entry.layoutNotes},
    {id: 'state', label: '状態設計', value: entry.stateNotes},
    {id: 'a11y', label: 'アクセシビリティ', value: entry.accessibilityNotes},
  ];
}

/** Builds the preview surface for one avatar variant. */
function buildVariantPreview(variantId: AvatarPatternVariantId): ReactNode {
  if (variantId === 'image') {
    return (
      <div className={styles.previewStack}>
        <div className={styles.avatarSizes}>
          <AvatarPreview hasImage label="山田 葵" />
          <AvatarPreview hasImage label="山田 葵" />
          <AvatarPreview hasImage label="山田 葵" />
        </div>
        <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
      </div>
    );
  }

  if (variantId === 'initials') {
    return (
      <div className={styles.previewStack}>
        <div className={styles.avatarSizes}>
          <AvatarPreview label="山田 葵" tone="green">
            YA
          </AvatarPreview>
          <AvatarPreview label="佐藤 蓮" tone="gold">
            SR
          </AvatarPreview>
          <AvatarPreview label="高橋 結" tone="pink">
            KT
          </AvatarPreview>
        </div>
        <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
      </div>
    );
  }

  if (variantId === 'icon') {
    return (
      <div className={styles.previewStack}>
        <div className={styles.avatarSizes}>
          <AvatarPreview label="通知 Bot" tone="neutral">
            <BotIcon />
          </AvatarPreview>
          <AvatarPreview label="システム" tone="gold">
            <BotIcon />
          </AvatarPreview>
        </div>
        <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
      </div>
    );
  }

  if (variantId === 'overlap-group' || variantId === 'summary-group') {
    return (
      <div className={styles.previewStack}>
        <div className={styles.avatarGroup} aria-label="参加者 8 人">
          <AvatarPreview label="山田 葵" tone="green">
            YA
          </AvatarPreview>
          <AvatarPreview label="佐藤 蓮" tone="gold">
            SR
          </AvatarPreview>
          <AvatarPreview label="高橋 結" tone="pink">
            KT
          </AvatarPreview>
          {variantId === 'summary-group' ? (
            <AvatarPreview label="ほか 5 人" tone="neutral">
              +5
            </AvatarPreview>
          ) : (
            <AvatarPreview label="中村 真央">MN</AvatarPreview>
          )}
        </div>
        <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
      </div>
    );
  }

  if (variantId === 'stacked-group') {
    return (
      <div className={styles.previewStack}>
        <div className={styles.avatarStack} aria-label="レビュー担当 3 人">
          <AvatarPreview hasImage label="山田 葵" />
          <AvatarPreview label="佐藤 蓮" tone="gold">
            SR
          </AvatarPreview>
          <AvatarPreview label="高橋 結" tone="pink">
            KT
          </AvatarPreview>
        </div>
        <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
      </div>
    );
  }

  if (variantId === 'inline-label') {
    return (
      <div className={styles.previewStack}>
        <div className={styles.personInline}>
          <AvatarPreview label="山田 葵" tone="green">
            YA
          </AvatarPreview>
          <span className={styles.personText}>
            <strong>山田 葵</strong>
            <span>プロダクトデザイナー</span>
          </span>
        </div>
        <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
      </div>
    );
  }

  if (variantId === 'card-label') {
    return (
      <div className={styles.previewStack}>
        <article className={styles.personCard}>
          <AvatarPreview label="佐藤 蓮" tone="gold">
            SR
          </AvatarPreview>
          <span className={styles.personText}>
            <strong>佐藤 蓮</strong>
            <span>Design Systems / Tokyo</span>
          </span>
          <span className={styles.statusBadge}>オンライン</span>
        </article>
        <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
      </div>
    );
  }

  return (
    <div className={styles.previewStack}>
      <ul className={styles.personList}>
        <li className={styles.personRow}>
          <AvatarPreview label="高橋 結" tone="pink">
            KT
          </AvatarPreview>
          <span className={styles.personText}>
            <strong>高橋 結</strong>
            <span>コメント 12 件</span>
          </span>
          <span className={styles.presenceText}>離席中</span>
        </li>
      </ul>
      <p className={styles.previewNote}>{avatarVariantDefinitions[variantId].previewNote}</p>
    </div>
  );
}

/** Builds the shared reference variants for one avatar pattern page. */
function buildVariants(entry: AvatarPatternEntry): readonly PatternReferenceVariant[] {
  return entry.variantIds.map((variantId) => ({
    description: avatarVariantDefinitions[variantId].description,
    id: `${entry.id}-${variantId}`,
    name: avatarVariantDefinitions[variantId].name,
    preview: buildVariantPreview(variantId),
    previewClassName: styles.widePreview,
    tabs: buildReferenceCodeTabs(avatarPatternSnippets[entry.id][variantId].items),
  }));
}

/** Renders the shared reference layout for avatar patterns. */
export default function AvatarReferenceContent({entry}: Props): ReactNode {
  return (
    <PatternReferenceContent
      notes={buildNotes(entry)}
      variantNote="Avatar は image / initials / icon fallback を必ず扱い、group や label は avatar 本体とは別の composition として 1 variant block : 1 code panel で分離しています。"
      variantSectionLabel="バリアント"
      variants={buildVariants(entry)}
    />
  );
}
