import {useState} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import ButtonReferenceLayout, {
  type ButtonReferenceGuide,
  type ButtonReferenceVariant,
} from '@site/src/components/ButtonReferenceLayout';
import galleryStyles from '@site/src/components/ButtonPatternGallery/styles.module.css';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

type Props = {
  entry: ButtonPatternEntry;
};

type ConnectedButtonShape = 'leading' | 'middle' | 'trailing';

type ConnectedGroupButtonProps = {
  ariaPressed?: boolean;
  isSelected?: boolean;
  label: string;
  onClick?: () => void;
  shape: ConnectedButtonShape;
  tone?: 'primary' | 'secondary';
};

/** Returns the connected-group shape class for the requested button position. */
function getConnectedButtonShapeClassName(shape: ConnectedButtonShape): string {
  if (shape === 'leading') {
    return galleryStyles.groupLeadingButton;
  }

  if (shape === 'middle') {
    return galleryStyles.groupMiddleButton;
  }

  return galleryStyles.groupTrailingButton;
}

/** Returns the visual tone class for the connected group button. */
function getConnectedButtonToneClassName(tone: 'primary' | 'secondary'): string {
  if (tone === 'primary') {
    return galleryStyles.primaryButton;
  }

  return galleryStyles.secondaryButton;
}

/** Renders a button that participates in a connected button group preview. */
function ConnectedGroupButton({
  ariaPressed,
  isSelected = false,
  label,
  onClick,
  shape,
  tone = 'secondary',
}: ConnectedGroupButtonProps): ReactNode {
  return (
    <button
      aria-pressed={ariaPressed}
      className={clsx(
        galleryStyles.demoButton,
        getConnectedButtonToneClassName(tone),
        getConnectedButtonShapeClassName(shape),
        isSelected && galleryStyles.isSelected,
      )}
      onClick={onClick}
      type="button">
      {label}
    </button>
  );
}

const densityOptions = [
  {id: 'compact', label: '高密度'},
  {id: 'default', label: '標準'},
  {id: 'comfortable', label: 'ゆったり'},
] as const;

const guides = [
  {
    id: 'related-actions',
    tone: 'do',
    description:
      '同じ対象に対する操作だけを 1 グループにまとめ、group 名と主操作の優先順位で文脈を補います。',
    preview: (
      <div aria-label="記事操作" className={galleryStyles.buttonGroupConnected} role="group">
        <ConnectedGroupButton label="比較" shape="leading" />
        <ConnectedGroupButton label="複製" shape="middle" />
        <ConnectedGroupButton label="公開" shape="trailing" tone="primary" />
      </div>
    ),
  },
  {
    id: 'mixed-intent',
    tone: 'dont',
    description:
      '無関係な操作や危険操作まで 1 列に詰め込みすぎると、どこまでが同じ判断単位か分かりにくくなります。',
    preview: (
      <div className={galleryStyles.buttonToolbar}>
        <button className={clsx(galleryStyles.demoButton, galleryStyles.secondaryButton)} type="button">
          フィルタ
        </button>
        <button className={clsx(galleryStyles.demoButton, galleryStyles.ghostButton)} type="button">
          ヘルプ
        </button>
        <button className={clsx(galleryStyles.demoButton, galleryStyles.dangerButton)} type="button">
          完全削除
        </button>
      </div>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

/** Renders the reference-style detail content for button-group patterns. */
export default function ButtonGroupReferenceContent({entry}: Props): ReactNode {
  const [selectedDensity, setSelectedDensity] =
    useState<(typeof densityOptions)[number]['id']>('default');
  const selectedDensityLabel =
    densityOptions.find((option) => option.id === selectedDensity)?.label ?? '標準';

  const variants = [
    {
      id: 'action-group',
      name: 'Action Group',
      description: '同じ対象への独立 action を 1 かたまりとして近接配置します。',
      preview: (
        <div className={galleryStyles.buttonStack}>
          <div aria-label="カード操作" className={galleryStyles.buttonGroupConnected} role="group">
            <ConnectedGroupButton label="比較" shape="leading" />
            <ConnectedGroupButton label="複製" shape="middle" />
            <ConnectedGroupButton label="公開" shape="trailing" tone="primary" />
          </div>
          <p className={galleryStyles.selectionNote}>
            各ボタンは独立 action のまま保ち、同じ対象にかかる操作だけをまとめます。
          </p>
        </div>
      ),
      tabs: [
        {
          id: 'action-group-css',
          label: 'CSS',
          language: 'css',
          code: `.actionGroup {
  display: inline-flex;
  gap: 0;
}

.actionGroup > * + * {
  margin-inline-start: -1px;
}

.groupButton {
  border-radius: 0;
}

.groupButton:first-child {
  border-bottom-left-radius: 999px;
  border-top-left-radius: 999px;
}

.groupButton:last-child {
  border-bottom-right-radius: 999px;
  border-top-right-radius: 999px;
}`,
          note: 'connected group は境界共有で「同じ判断単位の action 群」だと読めるようにします。',
        },
        {
          id: 'action-group-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `<div aria-label="カード操作" className={styles.actionGroup} role="group">
  <button className={styles.groupButton} type="button">
    比較
  </button>
  <button className={styles.groupButton} type="button">
    複製
  </button>
  <button className={styles.groupButtonPrimary} type="button">
    公開
  </button>
</div>`,
          note: '見た目だけでなく `role="group"` とラベルで文脈を補うのが基本です。',
        },
      ],
      detailNotes: [
        {
          id: 'action-style',
          label: '見た目',
          value: '密度が高い場面は connected、余白が取れる場面は separated に切り替えると整理しやすくなります。',
        },
        {
          id: 'action-orientation',
          label: '向き',
          value: 'デスクトップは horizontal を基本にし、縦ツール群や狭い幅では vertical も検討します。',
        },
        {
          id: 'action-boundary',
          label: '責務境界',
          value: '各ボタンは独立した action のまま保ち、selected state を主役にはしません。',
        },
      ],
    },
    {
      id: 'toggle-group',
      name: 'Toggle Group',
      description: '2〜4 個の候補から現在値を切り替える grouped toggle です。',
      preview: (
        <div className={galleryStyles.buttonStack}>
          <div aria-label="表示密度" className={galleryStyles.buttonGroupConnected} role="group">
            {densityOptions.map((option, index) => (
              <ConnectedGroupButton
                ariaPressed={selectedDensity === option.id}
                isSelected={selectedDensity === option.id}
                key={option.id}
                label={option.label}
                onClick={() => {
                  setSelectedDensity(option.id);
                }}
                shape={
                  index === 0
                    ? 'leading'
                    : index === densityOptions.length - 1
                      ? 'trailing'
                      : 'middle'
                }
              />
            ))}
          </div>
          <p className={galleryStyles.selectionNote}>現在の密度: {selectedDensityLabel}</p>
        </div>
      ),
      tabs: [
        {
          id: 'toggle-group-css',
          label: 'CSS',
          language: 'css',
          code: `.toggleGroup {
  display: inline-flex;
  gap: 0;
}

.toggleButton[aria-pressed='true'] {
  background: color-mix(in srgb, var(--ifm-color-primary) 14%, transparent);
  border-color: var(--ifm-color-primary);
  color: var(--ifm-color-primary);
}`,
          note:
            'Toggle Group では押下状態を視覚差と属性値の両方で伝えますが、責務の中心は「グループ内の現在値」です。',
        },
        {
          id: 'toggle-group-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `const [selectedDensity, setSelectedDensity] =
  useState<'compact' | 'default' | 'comfortable'>('default');

<div aria-label="表示密度" className={styles.toggleGroup} role="group">
  {(['compact', 'default', 'comfortable'] as const).map((option) => (
    <button
      aria-pressed={selectedDensity === option}
      className={styles.toggleButton}
      key={option}
      onClick={() => setSelectedDensity(option)}
      type="button">
      {option}
    </button>
  ))}
</div>`,
          note:
            'pressed の意味そのものを深掘りしたい場合は「トグル・選択」を参照し、Button Group では container と現在値の関係を整理します。',
        },
      ],
      detailNotes: [
        {
          id: 'toggle-count',
          label: '候補数',
          value: '2〜4 個程度に絞り、候補が多い場合は selector へ逃がすほうが認知負荷を抑えやすくなります。',
        },
        {
          id: 'toggle-boundary',
          label: '責務境界',
          value: 'Button Group は container のまとまりを扱い、単独トグルや pressed の意味設計は toggle-and-selection が主担当です。',
        },
        {
          id: 'toggle-orientation',
          label: '向き',
          value: '横並びで比較しやすい候補に向きます。長いラベルや多段説明が必要なら別レイアウトへ分けます。',
        },
      ],
    },
    {
      id: 'split-button',
      name: 'Split Button',
      description: '主操作と追加オプションを隣接させつつ、役割は別ボタンとして保ちます。',
      preview: (
        <div className={galleryStyles.buttonStack}>
          <div aria-label="保存操作" className={galleryStyles.splitButton} role="group">
            <button
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.primaryButton,
                galleryStyles.splitPrimary,
              )}
              type="button">
              保存して共有
            </button>
            <button
              aria-expanded="false"
              aria-haspopup="menu"
              aria-label="保存オプション"
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.secondaryButton,
                galleryStyles.splitSecondary,
              )}
              type="button">
              ▾
            </button>
          </div>
          <p className={galleryStyles.selectionNote}>
            主操作と補助メニューを 1 つの見た目に寄せつつ、読み上げは分離したまま保ちます。
          </p>
        </div>
      ),
      tabs: [
        {
          id: 'split-button-css',
          label: 'CSS',
          language: 'css',
          code: `.splitButton {
  display: inline-flex;
}

.splitPrimary {
  border-bottom-right-radius: 0;
  border-right-width: 0;
  border-top-right-radius: 0;
}

.splitSecondary {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  min-width: 2.75rem;
}`,
          note: '見た目は一体化させても、操作対象は 2 つの button として分離しておきます。',
        },
        {
          id: 'split-button-tsx',
          label: 'TSX',
          language: 'tsx',
          code: `<div aria-label="保存操作" className={styles.splitButton} role="group">
  <button className={styles.splitPrimary} type="button">
    保存して共有
  </button>
  <button
    aria-expanded="false"
    aria-haspopup="menu"
    aria-label="保存オプション"
    className={styles.splitSecondary}
    type="button">
    ▾
  </button>
</div>`,
          note:
            '主操作の文言と menu trigger の accessible name を分けると、見た目を共有しつつ役割の誤読を防げます。',
        },
      ],
      detailNotes: [
        {
          id: 'split-boundary',
          label: '責務境界',
          value: '主操作は左、追加オプションは右の menu trigger に分け、1 クリックで別結果が出る曖昧さを避けます。',
        },
        {
          id: 'split-a11y',
          label: 'アクセシビリティ',
          value: '`aria-haspopup` と個別ラベルを付け、主操作と補助操作を別々に読めるようにします。',
        },
        {
          id: 'split-layout',
          label: '見た目',
          value: '一体化した境界共有を使いつつ、primary / secondary の強弱で主操作を先に読めるようにします。',
        },
      ],
    },
  ] satisfies readonly ButtonReferenceVariant[];

  return (
    <ButtonReferenceLayout
      entry={entry}
      guides={guides}
      variantNote="Button Group は複数ボタンのまとまりと役割分担を扱います。pressed の意味づけそのものは「トグル・選択」で、icon-only や split の詳細な affordance は「アイコン・複合アクション」で補います。"
      variantSectionLabel="グループパターン"
      variants={variants}
    />
  );
}
