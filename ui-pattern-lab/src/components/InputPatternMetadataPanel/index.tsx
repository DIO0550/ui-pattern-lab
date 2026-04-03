import type {ReactNode} from 'react';
import clsx from 'clsx';
import InputPatternSectionCard from '@site/src/components/InputPatternSectionCard';
import type {InputPatternEntry} from '@site/src/data/inputPatternTypes';

import styles from './styles.module.css';

type Props = {
  density: 'list' | 'detail';
  entry: InputPatternEntry;
};

function TagList({tags}: {tags: string[]}): ReactNode {
  return (
    <ul aria-label="input パターンのタグ" className={styles.tagList}>
      {tags.map((tag) => (
        <li className={styles.tag} key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function InputPatternMetadataPanel({density, entry}: Props): ReactNode {
  const content = (
    <div className={clsx(styles.root, density === 'detail' && styles.detailRoot)}>
      <div className={styles.item}>
        <span className={styles.label}>タグ</span>
        <TagList tags={entry.tags} />
      </div>
      {entry.comparisonTip ? (
        <div className={styles.item}>
          <span className={styles.label}>比較メモ</span>
          <p className={styles.value}>{entry.comparisonTip}</p>
        </div>
      ) : null}
    </div>
  );

  if (density === 'detail') {
    return (
      <InputPatternSectionCard
        ariaLabel={`${entry.title}の使い分けメモ`}
        description={entry.description}
        label="使い分け"
        title="タグ / 比較メモ">
        {content}
      </InputPatternSectionCard>
    );
  }

  return (
    <section aria-label={`${entry.title}の使い分けメモ`} className={styles.wrapper}>
      {content}
    </section>
  );
}
