import type {
  AccordionPatternEntryId,
  AccordionPatternSnippets,
  AccordionPatternVariantId,
} from '@site/src/data/accordionPatternTypes';

const accordionVariantSummaries: Readonly<Record<AccordionPatternVariantId, string>> = {
  contained:
    'カードや設定面の中で、各 section を少し強い surface として見せる accordion です。',
  faq: '質問と回答を素早く拾えるよう、見出しの可読性と回答本文の行間を優先する FAQ 向け accordion です。',
  multiple:
    '複数 section を同時に開ける accordion です。比較や参照をしながら読む情報に向いています。',
  single:
    '常に 1 section だけを開く accordion です。長い説明群で読む範囲を絞りたいときに使います。',
} as const;

const accordionVariantClassNames: Readonly<Record<AccordionPatternVariantId, string>> = {
  contained: 'accordion--contained',
  faq: 'accordion--faq',
  multiple: 'accordion--multiple',
  single: 'accordion--single',
} as const;

/** Builds the TSX snippet shown for one accordion variant. */
function buildAccordionTsxSnippet(variantId: AccordionPatternVariantId): string {
  const className = accordionVariantClassNames[variantId];
  const allowsMultiple =
    variantId === 'multiple' || variantId === 'contained' || variantId === 'faq';
  const isFaqVariant = variantId === 'faq';

  return `import {useState} from 'react';

const items = [
  {
    id: 'overview',
    title: '導入前に確認すること',
    summary: '情報の入口を短く見せる',
    body: '重要な要点だけを先に見せ、詳細はユーザーが必要なときに展開します。',
  },
  {
    id: 'details',
    title: '表示条件と例外を整理する',
    summary: '条件と補足をまとめる',
    body: '条件、例外、補足説明を見出しの直下に置き、文脈を保ったまま読めるようにします。',
  },
  {
    id: 'notes',
    title: 'キーボード操作を確認する',
    summary: '状態と移動を明確にする',
    body: '開閉状態は aria-expanded と chevron の向きで示し、本文領域は trigger と関連づけます。',
  },
];

export function AccordionExample() {
  const [openIds, setOpenIds] = useState(${allowsMultiple ? `['overview', 'details']` : `['overview']`});

  const toggleItem = (itemId: string) => {
    setOpenIds((currentIds) => {
      const isOpen = currentIds.includes(itemId);

      if (${allowsMultiple}) {
        return isOpen
          ? currentIds.filter((currentId) => currentId !== itemId)
          : [...currentIds, itemId];
      }

      return isOpen ? [] : [itemId];
    });
  };

  return (
    <section className={\`accordion ${className}\`} aria-label="Accordion example">
      {items.map((item, itemIndex) => {
        const isOpen = openIds.includes(item.id);
        const panelId = \`\${item.id}-panel\`;
        const buttonId = \`\${item.id}-trigger\`;

        return (
          <article className="accordionItem" key={item.id}>
            <h3 className="accordionHeading">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="accordionTrigger"
                id={buttonId}
                onClick={() => toggleItem(item.id)}
                type="button">
                <span className="triggerContent">
                  <span className="titleRow">
                    ${isFaqVariant ? `<span className="questionMark">Q{itemIndex + 1}</span>` : ''}
                    <span className="itemTitle">{item.title}</span>
                  </span>
                  ${isFaqVariant ? '' : `<span className="itemSummary">{item.summary}</span>`}
                </span>
                <span
                  aria-hidden="true"
                  className={\`accordionChevron \${isOpen ? 'accordionChevron--open' : ''}\`}
                />
              </button>
            </h3>
            <div
              aria-labelledby={buttonId}
              className="accordionPanel"
              hidden={!isOpen}
              id={panelId}
              role="region">
              ${isFaqVariant ? `<span className="answerMark">A</span>` : ''}
              <p>{item.body}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}`;
}

/** Builds the CSS snippet shown for one accordion variant. */
function buildAccordionCssSnippet(variantId: AccordionPatternVariantId): string {
  const variantStyles: Readonly<Record<AccordionPatternVariantId, string>> = {
    contained: `.accordion--contained {
  background: color-mix(in srgb, var(--ifm-color-primary) 7%, var(--ifm-background-surface-color));
  border: 1px solid color-mix(in srgb, var(--ifm-color-primary) 22%, var(--ifm-color-emphasis-200));
  border-radius: 0.9rem;
  gap: 0.75rem;
  padding: 0.85rem;
}

.accordion--contained .accordionItem {
  background: var(--ifm-background-surface-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.75rem;
}`,
    faq: `.accordion--faq {
  border-top: 1px solid var(--ifm-color-emphasis-200);
}

.accordion--faq .accordionItem {
  border-bottom: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0;
}

.accordion--faq .accordionTrigger {
  font-size: 1rem;
}

.accordion--faq .accordionPanel {
  color: var(--ifm-color-emphasis-700);
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
  line-height: 1.8;
}`,
    multiple: `.accordion--multiple {
  gap: 0.85rem;
}

.accordion--multiple .accordionItem {
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.85rem;
  box-shadow: 0 0.55rem 1.35rem color-mix(in srgb, var(--ifm-color-emphasis-500) 9%, transparent);
}`,
    single: `.accordion--single {
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.6rem;
  overflow: hidden;
}

.accordion--single .accordionItem + .accordionItem {
  border-top: 1px solid var(--ifm-color-emphasis-200);
}`,
  } as const;

  return `.accordion {
  display: grid;
}

.accordionItem {
  background: var(--ifm-background-surface-color);
}

.accordionHeading {
  margin: 0;
}

.accordionTrigger {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--ifm-font-color-base);
  cursor: pointer;
  display: flex;
  font: inherit;
  font-weight: 700;
  gap: 1rem;
  justify-content: space-between;
  min-height: 4rem;
  padding: 1rem 1.1rem;
  text-align: left;
  width: 100%;
}

.accordionTrigger:hover {
  background: color-mix(in srgb, var(--ifm-color-primary) 6%, transparent);
}

.accordionTrigger:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--ifm-color-primary) 45%, transparent);
  outline-offset: -3px;
}

.triggerContent {
  display: grid;
  gap: 0.3rem;
}

.titleRow {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.itemTitle {
  font-weight: 800;
}

.itemSummary {
  color: var(--ifm-color-emphasis-700);
  font-size: 0.86rem;
  line-height: 1.5;
}

.accordionChevron {
  border-color: var(--ifm-color-emphasis-700);
  border-style: solid;
  border-width: 0 2px 2px 0;
  display: block;
  flex: 0 0 auto;
  height: 0.62rem;
  transform: rotate(45deg);
  transition: transform 160ms ease;
  width: 0.62rem;
}

.accordionChevron--open {
  border-color: var(--ifm-color-primary);
  transform: rotate(-135deg);
}

.accordionPanel {
  color: var(--ifm-color-emphasis-700);
  line-height: 1.75;
  padding: 0 1.1rem 1.1rem;
}

.accordionPanel p {
  margin: 0;
}

.questionMark,
.answerMark {
  align-items: center;
  border-radius: 999px;
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 900;
  height: 1.8rem;
  justify-content: center;
  width: 1.8rem;
}

.questionMark {
  background: color-mix(in srgb, var(--ifm-color-primary) 12%, var(--ifm-background-surface-color));
  color: var(--ifm-color-primary);
}

.answerMark {
  background: var(--ifm-color-emphasis-100);
  color: var(--ifm-color-emphasis-700);
}

${variantStyles[variantId]}`;
}

/** Creates the snippet bundle for one accordion variant. */
function buildAccordionVariantSnippets(
  variantId: AccordionPatternVariantId,
): AccordionPatternSnippets {
  return {
    items: [
      {
        code: buildAccordionTsxSnippet(variantId),
        id: `${variantId}-tsx`,
        label: 'TSX',
        language: 'tsx',
        note:
          'button と panel を aria-controls / aria-labelledby で対応させ、開閉状態を aria-expanded に反映します。',
      },
      {
        code: buildAccordionCssSnippet(variantId),
        id: `${variantId}-css`,
        label: 'CSS',
        language: 'css',
        note:
          'variant ごとの差分は container class に寄せ、trigger と panel の基本構造は共通化します。',
      },
    ],
    snippetSummary: accordionVariantSummaries[variantId],
  };
}

export const accordionPatternSnippets: Record<
  AccordionPatternEntryId,
  Record<AccordionPatternVariantId, AccordionPatternSnippets>
> = {
  'disclosure-accordion': {
    contained: buildAccordionVariantSnippets('contained'),
    faq: buildAccordionVariantSnippets('faq'),
    multiple: buildAccordionVariantSnippets('multiple'),
    single: buildAccordionVariantSnippets('single'),
  },
};
