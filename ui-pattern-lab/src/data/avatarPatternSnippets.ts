import type {
  AvatarPatternEntryId,
  AvatarPatternSnippets,
  AvatarPatternVariantId,
} from '@site/src/data/avatarPatternTypes';

const avatarVariantSummaries: Readonly<Record<AvatarPatternVariantId, string>> = {
  'card-label':
    'カード内で avatar、名前、役割、補足 badge を近接させ、主体の詳細を読み取りやすくする variant です。',
  icon:
    '名前や画像がない Bot / system actor でも同じ外形を維持する icon fallback variant です。',
  image:
    '実画像を使う標準 variant です。読み込み失敗時も同じサイズの fallback に切り替えます。',
  initials:
    '画像がない人物をイニシャルで表す fallback variant です。短い文字列を中央に置き、背景色で識別しやすくします。',
  'inline-label':
    'avatar と名前、役割を横並びにして、コメントヘッダーや担当者表示に使いやすい variant です。',
  'list-label':
    '一覧行で avatar、主ラベル、補足情報、状態を整列させる variant です。',
  'overlap-group':
    '少人数の参加者を横幅を抑えて見せる overlap group variant です。',
  'stacked-group':
    '重なりを弱めて顔やイニシャルを読みやすくする stacked group variant です。',
  'summary-group':
    '表示上限を超えた人数を +N の summary avatar に寄せる variant です。',
};

/** Builds the TSX snippet shown for one avatar variant. */
function buildAvatarTsxSnippet(variantId: AvatarPatternVariantId): string {
  if (variantId === 'image') {
    return `<span className="avatar" aria-label="山田 葵">
  <img
    src="/img/avatar-aoi.jpg"
    alt=""
    onError={(event) => {
      event.currentTarget.hidden = true;
      event.currentTarget.nextElementSibling?.removeAttribute('hidden');
    }}
  />
  <span className="avatarFallback" hidden>
    YA
  </span>
</span>`;
  }

  if (variantId === 'initials') {
    return `<span className="avatar avatar--initials" aria-label="佐藤 蓮">
  SR
</span>`;
  }

  if (variantId === 'icon') {
    return `<span className="avatar avatar--icon" aria-label="通知 Bot">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3a7 7 0 0 0-7 7v3.2L3.8 16h16.4L19 13.2V10a7 7 0 0 0-7-7Z" />
    <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
  </svg>
</span>`;
  }

  if (variantId === 'overlap-group') {
    return `<div className="avatarGroup" aria-label="参加者 4 人">
  {['YA', 'SR', 'KT', 'MN'].map((initials) => (
    <span className="avatar avatar--initials" key={initials}>
      {initials}
    </span>
  ))}
</div>`;
  }

  if (variantId === 'stacked-group') {
    return `<div className="avatarStack" aria-label="レビュー担当 3 人">
  <span className="avatar avatar--image">
    <img src="/img/member-a.jpg" alt="" />
  </span>
  <span className="avatar avatar--initials">SR</span>
  <span className="avatar avatar--initials">KT</span>
</div>`;
  }

  if (variantId === 'summary-group') {
    return `<div className="avatarGroup" aria-label="参加者 8 人、うち 4 人を表示">
  {['YA', 'SR', 'KT'].map((initials) => (
    <span className="avatar avatar--initials" key={initials}>
      {initials}
    </span>
  ))}
  <span className="avatar avatar--summary">+5</span>
</div>`;
  }

  if (variantId === 'inline-label') {
    return `<div className="personInline">
  <span className="avatar avatar--initials" aria-hidden="true">YA</span>
  <span className="personText">
    <strong>山田 葵</strong>
    <span>プロダクトデザイナー</span>
  </span>
</div>`;
  }

  if (variantId === 'card-label') {
    return `<article className="personCard">
  <span className="avatar avatar--initials" aria-hidden="true">SR</span>
  <div className="personText">
    <strong>佐藤 蓮</strong>
    <span>Design Systems / Tokyo</span>
  </div>
  <span className="statusBadge">オンライン</span>
</article>`;
  }

  return `<li className="personRow">
  <span className="avatar avatar--initials" aria-hidden="true">KT</span>
  <span className="personText">
    <strong>高橋 結</strong>
    <span>コメント 12 件</span>
  </span>
  <span className="presenceText">離席中</span>
</li>`;
}

/** Builds the CSS snippet shown for one avatar variant. */
function buildAvatarCssSnippet(variantId: AvatarPatternVariantId): string {
  const groupStyles =
    variantId === 'overlap-group' || variantId === 'summary-group'
      ? `
.avatarGroup {
  align-items: center;
  display: flex;
  padding-left: 0.6rem;
}

.avatarGroup .avatar {
  margin-left: -0.6rem;
  outline: 2px solid var(--ifm-background-surface-color);
}
`
      : '';
  const stackStyles =
    variantId === 'stacked-group'
      ? `
.avatarStack {
  align-items: center;
  display: flex;
  gap: 0.35rem;
}
`
      : '';
  const labelStyles =
    variantId === 'inline-label' || variantId === 'card-label' || variantId === 'list-label'
      ? `
.personInline,
.personCard,
.personRow {
  align-items: center;
  display: flex;
  gap: 0.75rem;
}

.personCard,
.personRow {
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.75rem;
  padding: 0.8rem;
}

.personText {
  display: grid;
  gap: 0.15rem;
  min-width: 0;
}

.personText strong,
.personText span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.personText span,
.presenceText {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.875rem;
}

.statusBadge {
  border: 1px solid color-mix(in srgb, #12805c 38%, transparent);
  border-radius: 999px;
  color: #12805c;
  font-size: 0.8125rem;
  font-weight: 700;
  margin-left: auto;
  padding: 0.2rem 0.55rem;
}

.presenceText {
  margin-left: auto;
}
`
      : '';

  return `.avatar {
  align-items: center;
  background: #eef3f8;
  border: 1px solid color-mix(in srgb, #315f7d 18%, transparent);
  border-radius: 999px;
  color: #24465f;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 800;
  inline-size: 2.5rem;
  justify-content: center;
  line-height: 1;
  block-size: 2.5rem;
  overflow: hidden;
}

.avatar img {
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
}

.avatar svg {
  block-size: 1.2rem;
  fill: none;
  inline-size: 1.2rem;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.avatar--initials {
  background: #eaf5f1;
  color: #1b6654;
}

.avatar--icon {
  background: #f4f1e8;
  color: #7a5b18;
}

.avatar--summary {
  background: var(--ifm-color-emphasis-100);
  color: var(--ifm-color-emphasis-800);
}
${groupStyles}${stackStyles}${labelStyles}`;
}

/** Creates the snippet bundle for one avatar variant. */
function buildAvatarVariantSnippets(
  variantId: AvatarPatternVariantId,
): AvatarPatternSnippets {
  return {
    items: [
      {
        code: buildAvatarTsxSnippet(variantId),
        id: `${variantId}-tsx`,
        label: 'TSX',
        language: 'tsx',
        note:
          '画像、fallback、ラベル、summary を variant ごとに分け、1 つの preview と 1 つの code panel の対応を明確にします。',
      },
      {
        code: buildAvatarCssSnippet(variantId),
        id: `${variantId}-css`,
        label: 'CSS',
        language: 'css',
        note:
          'avatar 本体の寸法を固定し、group や label は composition 側の class として切り分けます。',
      },
    ],
    snippetSummary: avatarVariantSummaries[variantId],
  };
}

export const avatarPatternSnippets: Record<
  AvatarPatternEntryId,
  Record<AvatarPatternVariantId, AvatarPatternSnippets>
> = {
  'avatar-group': {
    'card-label': buildAvatarVariantSnippets('card-label'),
    icon: buildAvatarVariantSnippets('icon'),
    image: buildAvatarVariantSnippets('image'),
    initials: buildAvatarVariantSnippets('initials'),
    'inline-label': buildAvatarVariantSnippets('inline-label'),
    'list-label': buildAvatarVariantSnippets('list-label'),
    'overlap-group': buildAvatarVariantSnippets('overlap-group'),
    'stacked-group': buildAvatarVariantSnippets('stacked-group'),
    'summary-group': buildAvatarVariantSnippets('summary-group'),
  },
  'avatar-with-label': {
    'card-label': buildAvatarVariantSnippets('card-label'),
    icon: buildAvatarVariantSnippets('icon'),
    image: buildAvatarVariantSnippets('image'),
    initials: buildAvatarVariantSnippets('initials'),
    'inline-label': buildAvatarVariantSnippets('inline-label'),
    'list-label': buildAvatarVariantSnippets('list-label'),
    'overlap-group': buildAvatarVariantSnippets('overlap-group'),
    'stacked-group': buildAvatarVariantSnippets('stacked-group'),
    'summary-group': buildAvatarVariantSnippets('summary-group'),
  },
  'standalone-avatar': {
    'card-label': buildAvatarVariantSnippets('card-label'),
    icon: buildAvatarVariantSnippets('icon'),
    image: buildAvatarVariantSnippets('image'),
    initials: buildAvatarVariantSnippets('initials'),
    'inline-label': buildAvatarVariantSnippets('inline-label'),
    'list-label': buildAvatarVariantSnippets('list-label'),
    'overlap-group': buildAvatarVariantSnippets('overlap-group'),
    'stacked-group': buildAvatarVariantSnippets('stacked-group'),
    'summary-group': buildAvatarVariantSnippets('summary-group'),
  },
};
