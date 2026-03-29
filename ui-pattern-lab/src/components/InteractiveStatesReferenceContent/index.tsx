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

function buildDetailNotes(stateValue: string, accessibilityValue: string) {
  return [
    {id: 'state', label: '状態設計', value: stateValue},
    {id: 'a11y', label: 'アクセシビリティ', value: accessibilityValue},
  ] as const;
}

const variants = [
  {
    id: 'default',
    name: 'Default',
    description: '通常時の基準となる状態です。',
    detailNotes: buildDetailNotes(
      '通常時を基準に高さ・余白・ラベル長を固定しておくと、hover や loading に切り替わっても幅が揺れにくくなります。',
      '通常状態でも visible label を主役にし、操作名をそのまま読める構造を保ちます。',
    ),
    preview: (
      <button className={clsx(galleryStyles.demoButton, galleryStyles.primaryButton)} type="button">
        保存する
      </button>
    ),
    tabs: [
      {
        id: 'default-css',
        label: 'CSS',
        code: `.button {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
  min-width: 9rem;
}`,
        highlightedHtml: `<span class="sel">.button</span> {
  <span class="prop">align-items</span>: <span class="val">center</span>;
  <span class="prop">display</span>: <span class="val">inline-flex</span>;
  <span class="prop">gap</span>: <span class="val">0.5rem</span>;
  <span class="prop">min-width</span>: <span class="val">9rem</span>;
}`,
      },
      {
        id: 'default-tsx',
        label: 'TSX',
        code: `<button className={styles.button} type="button">
  保存する
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.button</span><span class="punct">}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  保存する
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'hover',
    name: 'Hover',
    description: '操作可能だと分かる軽い反応を加えます。',
    detailNotes: buildDetailNotes(
      'hover は押下前の予告として扱い、selected や active と意味が混ざらない程度の差分にとどめます。',
      'hover だけに重要情報を寄せず、keyboard 利用時には focus-visible でも同じ対象を識別できるようにします。',
    ),
    preview: (
      <button
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.primaryButton,
          galleryStyles.isHovered,
        )}
        type="button">
        保存する
      </button>
    ),
    tabs: [
      {
        id: 'hover-css',
        label: 'CSS',
        code: `.button:hover {
  box-shadow: 0 0.6rem 1.2rem color-mix(in srgb, var(--ifm-color-primary) 12%, transparent);
  transform: translateY(-1px);
}`,
        highlightedHtml: `<span class="sel">.button:hover</span> {
  <span class="prop">box-shadow</span>: <span class="val">0 0.6rem 1.2rem color-mix(in srgb, var(--ifm-color-primary) 12%, transparent)</span>;
  <span class="prop">transform</span>: <span class="val">translateY(-1px)</span>;
}`,
      },
      {
        id: 'hover-tsx',
        label: 'TSX',
        code: `<button className={clsx(styles.button, styles.isHovered)} type="button">
  保存する
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="tag">clsx</span><span class="punct">(</span><span class="str">styles.button, styles.isHovered</span><span class="punct">)}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  保存する
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'focus-visible',
    name: 'Focus visible',
    description: 'キーボード移動時の輪郭を消しません。',
    detailNotes: buildDetailNotes(
      'focus-visible は hover と別軸の状態として扱い、outline や offset が border / shadow に埋もれないように保ちます。',
      'pointer 操作には過剰表示せず、keyboard 利用時だけ現在位置が分かるよう `:focus-visible` で出し分けます。',
    ),
    preview: (
      <button
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.secondaryButton,
          galleryStyles.isFocusVisible,
        )}
        type="button">
        確認して進む
      </button>
    ),
    tabs: [
      {
        id: 'focus-visible-css',
        label: 'CSS',
        code: `.button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 35%, white);
  outline-offset: 2px;
}`,
        highlightedHtml: `<span class="sel">.button:focus-visible</span> {
  <span class="prop">outline</span>: <span class="val">3px solid color-mix(in srgb, var(--ifm-color-primary) 35%, white)</span>;
  <span class="prop">outline-offset</span>: <span class="val">2px</span>;
}`,
      },
      {
        id: 'focus-visible-tsx',
        label: 'TSX',
        code: `<button className={clsx(styles.button, styles.isFocusVisible)} type="button">
  確認して進む
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="tag">clsx</span><span class="punct">(</span><span class="str">styles.button, styles.isFocusVisible</span><span class="punct">)}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  確認して進む
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'disabled',
    name: 'Disabled',
    description: '入力待ちなど、実行できない理由がある状態です。',
    detailNotes: buildDetailNotes(
      'disabled は未入力や権限不足のように実行不能な理由が明確なときだけ使い、単なる保留状態とは分けて扱います。',
      'native button の `disabled` は focus 対象から外れるため、理由が必要な場合は周辺の helper や説明文で補足します。',
    ),
    preview: (
      <button className={clsx(galleryStyles.demoButton, galleryStyles.secondaryButton)} disabled type="button">
        入力待ち
      </button>
    ),
    tabs: [
      {
        id: 'disabled-css',
        label: 'CSS',
        code: `.button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}`,
        highlightedHtml: `<span class="sel">.button:disabled</span> {
  <span class="prop">cursor</span>: <span class="val">not-allowed</span>;
  <span class="prop">opacity</span>: <span class="val">0.48</span>;
}`,
      },
      {
        id: 'disabled-tsx',
        label: 'TSX',
        code: `<button className={styles.button} disabled type="button">
  入力待ち
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.button</span><span class="punct">}</span>
  <span class="attr">disabled</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  入力待ち
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
  {
    id: 'loading',
    name: 'Loading',
    description: '処理中は再実行を防ぎ、状態を明示します。',
    detailNotes: buildDetailNotes(
      'loading は二重送信防止と進行中の可視化を同時に担うため、spinner を足してもラベル幅と gap を崩さない前提で設計します。',
      '見た目の変化だけで済ませず、`aria-busy` と「保存中...」のような状態文言で処理中であることを伝えます。',
    ),
    preview: (
      <button
        aria-busy="true"
        className={clsx(galleryStyles.demoButton, galleryStyles.primaryButton)}
        disabled
        type="button">
        <span aria-hidden="true" className={galleryStyles.spinner} />
        保存中...
      </button>
    ),
    tabs: [
      {
        id: 'loading-css',
        label: 'CSS',
        code: `.spinner {
  animation: spin 0.8s linear infinite;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 999px;
  height: 0.9rem;
  width: 0.9rem;
}`,
        highlightedHtml: `<span class="sel">.spinner</span> {
  <span class="prop">animation</span>: <span class="val">spin 0.8s linear infinite</span>;
  <span class="prop">border</span>: <span class="val">2px solid currentColor</span>;
  <span class="prop">border-right-color</span>: <span class="val">transparent</span>;
  <span class="prop">border-radius</span>: <span class="val">999px</span>;
  <span class="prop">height</span>: <span class="val">0.9rem</span>;
  <span class="prop">width</span>: <span class="val">0.9rem</span>;
}`,
      },
      {
        id: 'loading-tsx',
        label: 'TSX',
        code: `<button aria-busy="true" className={styles.button} disabled type="button">
  <span className={styles.spinner} aria-hidden="true" />
  保存中...
</button>`,
        highlightedHtml: `<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">aria-busy</span><span class="punct">=</span><span class="str">"true"</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.button</span><span class="punct">}</span>
  <span class="attr">disabled</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  <span class="punct">&lt;</span><span class="tag">span</span> <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.spinner</span><span class="punct">}</span> <span class="attr">aria-hidden</span><span class="punct">=</span><span class="str">"true"</span> <span class="punct">/&gt;</span>
  保存中...
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
      },
    ],
  },
] satisfies readonly ButtonReferenceVariant[];

const guides = [
  {
    id: 'focus-visible-do',
    tone: 'do',
    description:
      'focus-visible は hover と別軸で残し、キーボード操作でも現在位置が分かるようにします。',
    preview: (
      <button
        className={clsx(
          galleryStyles.demoButton,
          galleryStyles.secondaryButton,
          galleryStyles.isFocusVisible,
        )}
        type="button">
        確認して進む
      </button>
    ),
  },
  {
    id: 'loading-dont',
    tone: 'dont',
    description:
      'loading を通常の disabled と同じ見た目のままにすると、処理中なのか入力待ちなのか区別しにくくなります。',
    preview: (
      <button className={clsx(galleryStyles.demoButton, galleryStyles.secondaryButton)} disabled type="button">
        保存する
      </button>
    ),
  },
] satisfies readonly ButtonReferenceGuide[];

/** Renders the reference-style detail content for interactive button states. */
export default function InteractiveStatesReferenceContent({
  entry,
}: Props): ReactNode {
  const notes = [
    {id: 'problem', label: '課題', value: entry.problem},
    {id: 'solution', label: '解決方法', value: entry.solution},
    {id: 'usecase', label: '使いどころ', value: entry.whenToUse},
    {id: 'spacing', label: '余白 / サイズ', value: entry.layoutNotes},
  ] as const;

  return (
    <ButtonReferenceLayout
      guides={guides}
      notes={notes}
      variants={variants}
    />
  );
}
