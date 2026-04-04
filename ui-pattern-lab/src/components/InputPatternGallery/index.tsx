import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import InputPatternMetadataPanel from '@site/src/components/InputPatternMetadataPanel';
import InputPatternSnippetPanel from '@site/src/components/InputPatternSnippetPanel';
import {buildInputDetailPath} from '@site/src/data/inputPatternPaths';
import type {InputPatternEntry} from '@site/src/data/inputPatternTypes';
import {assertNever} from '@site/src/utils/assertNever';

import {
  getCustomDesignPreviewDefinition,
  renderCustomDesignPreviewCard,
} from './customDesign';
import styles from './styles.module.css';

type Props = {
  entries: InputPatternEntry[];
  density: 'list' | 'detail';
};

function EmptyState(): ReactNode {
  return (
    <div className={styles.emptyState}>
      <Heading as="h3">自作テキストフィールドデザインはまだありません</Heading>
      <p>カテゴリの受け皿はできていますが、比較対象のエントリはまだ登録されていません。</p>
    </div>
  );
}

function renderPreview(entryId: InputPatternEntry['id']): ReactNode {
  switch (entryId) {
    case 'outline-text-field':
      return renderCustomDesignPreviewCard(getCustomDesignPreviewDefinition('outline'));
    case 'filled-text-field':
      return renderCustomDesignPreviewCard(getCustomDesignPreviewDefinition('filled'));
    case 'underline-text-field':
      return renderCustomDesignPreviewCard(getCustomDesignPreviewDefinition('underline'));
    case 'borderless-text-field':
      return renderCustomDesignPreviewCard(getCustomDesignPreviewDefinition('borderless'));
    case 'pill-text-field':
      return renderCustomDesignPreviewCard(getCustomDesignPreviewDefinition('pill'));
    default:
      return assertNever(entryId);
  }
}

export default function InputPatternGallery({entries, density}: Props): ReactNode {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <section aria-label="自作テキストフィールドデザインギャラリー" className={styles.root}>
      <div className={clsx(styles.grid, density === 'detail' && styles.detailGrid)}>
        {entries.map((entry) => (
          <article className={styles.card} id={entry.id} key={entry.id}>
            <div className={styles.cardHeader}>
              <div className={styles.entryHeader}>
                <Heading as="h3" className={styles.cardTitle}>
                  <Link className={styles.titleLink} to={buildInputDetailPath(entry.id)}>
                    {entry.title}
                  </Link>
                </Heading>
                <Link className={styles.detailLink} to={buildInputDetailPath(entry.id)}>
                  詳細へ
                </Link>
              </div>
              <p className={styles.cardSummary}>{entry.description}</p>
              <ul aria-label={`${entry.title}のタグ`} className={styles.tagList}>
                {entry.tags.map((tag) => (
                  <li className={styles.tag} key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.demoPanel}>{renderPreview(entry.id)}</div>

            <InputPatternSnippetPanel
              density={density}
              entryTitle={entry.title}
              snippets={entry.snippets}
            />

            <InputPatternMetadataPanel density={density} entry={entry} />
          </article>
        ))}
      </div>
    </section>
  );
}
