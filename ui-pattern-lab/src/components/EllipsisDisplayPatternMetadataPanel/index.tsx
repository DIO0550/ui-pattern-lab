import type {ReactNode} from 'react';
import clsx from 'clsx';
import EllipsisDisplayPatternSectionCard from '@site/src/components/EllipsisDisplayPatternSectionCard';

import styles from './styles.module.css';

type EllipsisDisplayPatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'accessibility';

export type EllipsisDisplayPatternMetadataItem = {
  label: string;
  value: string;
  tone: EllipsisDisplayPatternMetadataTone;
};

type EllipsisDisplayPatternMetadataPanelProps = {
  density: 'list' | 'detail';
  entryTitle: string;
  items: EllipsisDisplayPatternMetadataItem[];
};

export default function EllipsisDisplayPatternMetadataPanel({
  density,
  entryTitle,
  items,
}: EllipsisDisplayPatternMetadataPanelProps): ReactNode {
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
      <EllipsisDisplayPatternSectionCard
        ariaLabel={`${entryTitle}の設計メモ`}
        label="課題 / 解決方法"
        title="設計メモ">
        {metadataList}
      </EllipsisDisplayPatternSectionCard>
    );
  }

  return (
    <section aria-label={`${entryTitle}の設計メモ`} className={styles.wrapper}>
      {metadataList}
    </section>
  );
}
