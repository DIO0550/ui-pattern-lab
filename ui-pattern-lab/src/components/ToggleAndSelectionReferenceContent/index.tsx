import {useState} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import ButtonReferenceLayout, {type ButtonReferenceVariant} from '@site/src/components/ButtonReferenceLayout';
import galleryStyles from '@site/src/components/ButtonPatternGallery/styles.module.css';
import type {ButtonPatternEntry} from '@site/src/data/buttonPatternTypes';

type Props = {
  entry: ButtonPatternEntry;
};

/** Renders the reference-style detail content for toggle and selection buttons. */
export default function ToggleAndSelectionReferenceContent({
  entry,
}: Props): ReactNode {
  const views = [
    {id: 'list', label: 'リスト'},
    {id: 'board', label: 'ボード'},
    {id: 'calendar', label: 'カレンダー'},
  ] as const;
  const [isPinned, setIsPinned] = useState(false);
  const [selectedView, setSelectedView] = useState<(typeof views)[number]['id']>('list');

  const variants = [
    {
      id: 'toggle',
      name: 'Toggle',
      description: '実行ではなく ON / OFF の切り替えを表します。',
      preview: (
        <button
          aria-pressed={isPinned}
          className={clsx(
            galleryStyles.demoButton,
            galleryStyles.secondaryButton,
            galleryStyles.toggleButton,
            isPinned && galleryStyles.isSelected,
          )}
          onClick={() => {
            setIsPinned((current) => !current);
          }}
          type="button">
          比較対象に固定
        </button>
      ),
      tabs: [
        {
          id: 'toggle-css',
          label: 'CSS',
          code: `.toggleButton[aria-pressed='true'] {
  background: color-mix(in srgb, var(--ifm-color-primary) 14%, transparent);
  border-color: var(--ifm-color-primary);
  color: var(--ifm-color-primary);
}`,
          highlightedHtml: `<span class="sel">.toggleButton[aria-pressed='true']</span> {
  <span class="prop">background</span>: <span class="val">color-mix(in srgb, var(--ifm-color-primary) 14%, transparent)</span>;
  <span class="prop">border-color</span>: <span class="val">var(--ifm-color-primary)</span>;
  <span class="prop">color</span>: <span class="val">var(--ifm-color-primary)</span>;
}`,
        },
        {
          id: 'toggle-tsx',
          label: 'TSX',
          code: `const [isPinned, setIsPinned] = useState(false);

<button
  aria-pressed={isPinned}
  className={styles.toggleButton}
  onClick={() => setIsPinned((current) => !current)}
  type="button">
  比較対象に固定
</button>`,
          highlightedHtml: `<span class="kw">const</span> [<span class="prop">isPinned</span>, <span class="prop">setIsPinned</span>] = <span class="tag">useState</span>(<span class="val">false</span>);

<span class="punct">&lt;</span><span class="tag">button</span>
  <span class="attr">aria-pressed</span><span class="punct">=</span><span class="punct">{</span><span class="prop">isPinned</span><span class="punct">}</span>
  <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.toggleButton</span><span class="punct">}</span>
  <span class="attr">onClick</span><span class="punct">=</span><span class="punct">{()</span> <span class="punct">=&gt;</span> <span class="tag">setIsPinned</span><span class="punct">((</span><span class="prop">current</span><span class="punct">)</span> <span class="punct">=&gt;</span> !<span class="prop">current</span><span class="punct">)}</span>
  <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span>
<span class="punct">&gt;</span>
  比較対象に固定
<span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>`,
        },
      ],
    },
    {
      id: 'segmented-selection',
      name: 'Segmented selection',
      description: '候補の中から 1 つだけ選ぶグループです。',
      preview: (
        <div aria-label="表示形式" className={galleryStyles.segmentedGroup} role="group">
          {views.map((view) => (
            <button
              aria-pressed={selectedView === view.id}
              className={clsx(
                galleryStyles.demoButton,
                galleryStyles.segmentButton,
                selectedView === view.id && galleryStyles.isSelected,
              )}
              key={view.id}
              onClick={() => {
                setSelectedView(view.id);
              }}
              type="button">
              {view.label}
            </button>
          ))}
        </div>
      ),
      tabs: [
        {
          id: 'segmented-selection-css',
          label: 'CSS',
          code: `.segmentGroup {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.segmentButton[aria-pressed='true'] {
  background: var(--ifm-color-primary);
  color: #ffffff;
}`,
          highlightedHtml: `<span class="sel">.segmentGroup</span> {
  <span class="prop">display</span>: <span class="val">inline-flex</span>;
  <span class="prop">flex-wrap</span>: <span class="val">wrap</span>;
  <span class="prop">gap</span>: <span class="val">0.5rem</span>;
}

<span class="sel">.segmentButton[aria-pressed='true']</span> {
  <span class="prop">background</span>: <span class="val">var(--ifm-color-primary)</span>;
  <span class="prop">color</span>: <span class="val">#ffffff</span>;
}`,
        },
        {
          id: 'segmented-selection-tsx',
          label: 'TSX',
          code: `const [selectedView, setSelectedView] = useState<'list' | 'board'>('list');

<div className={styles.segmentGroup} role="group" aria-label="表示形式">
  {(['list', 'board'] as const).map((view) => (
    <button
      aria-pressed={selectedView === view}
      className={styles.segmentButton}
      key={view}
      onClick={() => setSelectedView(view)}
      type="button">
      {view === 'list' ? 'リスト' : 'ボード'}
    </button>
  ))}
</div>`,
          highlightedHtml: `<span class="kw">const</span> [<span class="prop">selectedView</span>, <span class="prop">setSelectedView</span>] = <span class="tag">useState</span><span class="punct">&lt;</span><span class="tag">'list' | 'board'</span><span class="punct">&gt;</span>(<span class="str">'list'</span>);

<span class="punct">&lt;</span><span class="tag">div</span> <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.segmentGroup</span><span class="punct">}</span> <span class="attr">role</span><span class="punct">=</span><span class="str">"group"</span> <span class="attr">aria-label</span><span class="punct">=</span><span class="str">"表示形式"</span><span class="punct">&gt;</span>
  <span class="punct">{</span>([<span class="str">'list'</span>, <span class="str">'board'</span>] <span class="kw">as const</span>).<span class="tag">map</span>((<span class="prop">view</span>) <span class="punct">=&gt;</span> (
    <span class="punct">&lt;</span><span class="tag">button</span>
      <span class="attr">aria-pressed</span><span class="punct">=</span><span class="punct">{</span><span class="prop">selectedView</span> === <span class="prop">view</span><span class="punct">}</span>
      <span class="attr">className</span><span class="punct">=</span><span class="punct">{</span><span class="str">styles.segmentButton</span><span class="punct">}</span>
      <span class="attr">key</span><span class="punct">=</span><span class="punct">{</span><span class="prop">view</span><span class="punct">}</span>
      <span class="attr">onClick</span><span class="punct">=</span><span class="punct">{()</span> <span class="punct">=&gt;</span> <span class="tag">setSelectedView</span><span class="punct">(</span><span class="prop">view</span><span class="punct">)}</span>
      <span class="attr">type</span><span class="punct">=</span><span class="str">"button"</span><span class="punct">&gt;</span>
      <span class="punct">{</span><span class="prop">view</span> === <span class="str">'list'</span> ? <span class="str">'リスト'</span> : <span class="str">'ボード'</span><span class="punct">}</span>
    <span class="punct">&lt;/</span><span class="tag">button</span><span class="punct">&gt;</span>
  ))<span class="punct">}</span>
<span class="punct">&lt;/</span><span class="tag">div</span><span class="punct">&gt;</span>`,
        },
      ],
    },
  ] satisfies readonly ButtonReferenceVariant[];

  return (
    <ButtonReferenceLayout
      entry={entry}
      variantNote="単独トグルと選択群では pressed の意味が異なるため、ラベルとグルーピングで選択可能数を誤読させないようにします。"
      variants={variants}
    />
  );
}
