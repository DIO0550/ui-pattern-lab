import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternReferenceContent from '@site/src/components/PatternReferenceContent';
import {
  buildReferenceCodeTabs,
  type PatternReferenceVariant,
} from '@site/src/components/PatternReferenceContent';
import {
  type TodoPatternCategoryId,
  todoPatternCategoryMap,
} from '@site/src/data/todoPatternData';
import {assertNever} from '@site/src/utils/assertNever';

import styles from './styles.module.css';

type Props = {
  categoryId: TodoPatternCategoryId;
  entryId: string;
};

function renderLabels(labels: readonly string[], variantId: string): ReactNode {
  return labels.map((label) => {
    if (label === '---') {
      return <span aria-hidden="true" className={styles.separatorLine} key={label} />;
    }

    if (label === '|' || label === '/' || label === '>' || label === '...') {
      return (
        <span aria-hidden="true" className={styles.separatorText} key={`${variantId}-${label}`}>
          {label}
        </span>
      );
    }

    return (
      <span className={styles.previewToken} key={`${variantId}-${label}`}>
        {label}
      </span>
    );
  });
}

function renderSliderPreview(labels: readonly string[]): ReactNode {
  return (
    <div className={styles.sliderPreview}>
      <div className={styles.sliderHeader}>
        <span>{labels[0]}</span>
        <strong>{labels[1]}</strong>
      </div>
      <input aria-label={labels[0]} className={styles.range} defaultValue="64" type="range" />
      <div className={styles.sliderFooter}>
        <span>{labels[2]}</span>
      </div>
    </div>
  );
}

function renderTextareaPreview(labels: readonly string[]): ReactNode {
  return (
    <label className={styles.textareaPreview}>
      <span>{labels[0]}</span>
      <textarea defaultValue={labels[1]} rows={3} />
      <small>{labels[2]}</small>
    </label>
  );
}

function getPreviewTone(categoryId: TodoPatternCategoryId): string {
  switch (categoryId) {
    case 'breadcrumb':
    case 'navigation-menu':
      return styles.navigationTone;
    case 'card':
      return styles.cardTone;
    case 'chip-tag':
    case 'separator':
      return styles.compactTone;
    case 'dialog-modal':
    case 'drawer-sheet':
    case 'dropdown-menu':
    case 'hover-card':
    case 'popover':
    case 'toast-snackbar':
    case 'tooltip':
      return styles.overlayTone;
    case 'slider':
      return styles.formTone;
    case 'textarea':
      return styles.formTone;
    default:
      assertNever(categoryId);
  }
}

function renderPreview(categoryId: TodoPatternCategoryId, variantId: string, labels: readonly string[]): ReactNode {
  if (categoryId === 'slider') {
    return renderSliderPreview(labels);
  }

  if (categoryId === 'textarea') {
    return renderTextareaPreview(labels);
  }

  return (
    <div className={`${styles.previewSurface} ${getPreviewTone(categoryId)}`}>
      <div className={styles.previewRow}>{renderLabels(labels, variantId)}</div>
    </div>
  );
}

/** Renders a detail page with one independent preview and code panel per variant. */
export default function TodoPatternDetailContent({categoryId, entryId}: Props): ReactNode {
  const category = todoPatternCategoryMap[categoryId];
  const entry = category.entries.find((candidate) => candidate.id === entryId);

  if (!entry) {
    return null;
  }

  const variants: readonly PatternReferenceVariant[] = entry.variants.map((variant) => ({
    id: variant.id,
    name: variant.title,
    description: variant.summary,
    preview: renderPreview(category.id, variant.id, variant.labels),
    tabs: buildReferenceCodeTabs([
      {
        id: 'tsx',
        label: 'TSX',
        language: 'tsx',
        code: variant.tsx,
        note: `${variant.title} の構造例です。`,
      },
      {
        id: 'css',
        label: 'CSS',
        language: 'css',
        code: variant.css,
        note: `${variant.title} の最小スタイル例です。`,
      },
    ]),
  }));

  return (
    <main className={styles.root}>
      <section className={`container margin-vert--lg ${styles.header}`}>
        <nav aria-label="戻るリンク">
          <Link className={styles.backLink} to={`/${category.slug}`}>
            <span aria-hidden="true">←</span>
            <span>{category.label}カテゴリへ戻る</span>
          </Link>
        </nav>
        <p className={styles.eyebrow}>リファレンス</p>
        <Heading as="h1">{entry.title}</Heading>
        <p className={styles.summary}>{entry.summary}</p>
      </section>

      <section className={`container margin-bottom--lg ${styles.notesGrid}`}>
        <article>
          <p className={styles.noteLabel}>課題</p>
          <p>{entry.problem}</p>
        </article>
        <article>
          <p className={styles.noteLabel}>設計方針</p>
          <p>{entry.solution}</p>
        </article>
        <article>
          <p className={styles.noteLabel}>アクセシビリティ</p>
          <p>{entry.accessibilityNote}</p>
        </article>
      </section>

      <section className="container margin-bottom--xl">
        <PatternReferenceContent
          notes={[
            {id: 'problem', label: '課題', value: entry.problem},
            {id: 'solution', label: '解決方法', value: entry.solution},
            {
              id: 'accessibility',
              label: 'アクセシビリティ',
              value: entry.accessibilityNote,
            },
          ]}
          variantNote="各バリアントは独立したプレビューとコードパネルとして分けています。"
          variantSectionLabel="バリアント"
          variants={variants}
        />
      </section>
    </main>
  );
}
