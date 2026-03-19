import type {ReactNode} from 'react';
import clsx from 'clsx';
import CheckboxPatternSectionCard from '@site/src/components/CheckboxPatternSectionCard';
import type {CheckboxPatternMetadataItem} from '@site/src/data/checkboxPatternTypes';

import styles from './styles.module.css';

type Props = {
  density: 'list' | 'detail';
  entryTitle: string;
  items: CheckboxPatternMetadataItem[];
};

export default function CheckboxPatternMetadataPanel({
  density,
  entryTitle,
  items,
}: Props): ReactNode {
  const metadataList = (
    <dl className={clsx(styles.root, density === 'detail' && styles.detailRoot)}>
      {items.map((item) => (
        <div
          className={clsx(styles.item, styles[item.tone])}
          key={`${item.tone}-${item.label}`}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );

  if (density === 'detail') {
    return (
      <CheckboxPatternSectionCard
        ariaLabel={`${entryTitle}の設計メモ`}
        label="設計メモ"
        title="課題 / 解決方法 / 使いどころ / 比較メモ">
        {metadataList}
      </CheckboxPatternSectionCard>
    );
  }

  return (
    <section aria-label={`${entryTitle}の設計メモ`} className={styles.wrapper}>
      {metadataList}
    </section>
  );
}
