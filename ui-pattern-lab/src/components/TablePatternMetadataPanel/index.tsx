import type {ReactNode} from 'react';
import clsx from 'clsx';
import TablePatternSectionCard from '@site/src/components/TablePatternSectionCard';

import styles from './styles.module.css';

type TablePatternMetadataTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'accessibility';

export type TablePatternMetadataItem = {
  label: string;
  value: string;
  tone: TablePatternMetadataTone;
};

type TablePatternMetadataPanelProps = {
  density: 'list' | 'detail';
  entryTitle: string;
  items: TablePatternMetadataItem[];
};

export default function TablePatternMetadataPanel({
  density,
  entryTitle,
  items,
}: TablePatternMetadataPanelProps): ReactNode {
  const visibleItems = density === 'list' ? items.slice(0, 2) : items;

  const metadataList = (
    <dl
      className={clsx(
        styles.root,
        density === 'detail' ? styles.detailRoot : styles.listRoot,
      )}>
      {visibleItems.map((item) => (
        <div
          className={clsx(
            styles.item,
            density === 'list' && styles.listItem,
            styles[item.tone],
          )}
          key={`${item.tone}-${item.label}`}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={clsx(styles.value, density === 'list' && styles.listValue)}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );

  if (density === 'detail') {
    return (
      <TablePatternSectionCard
        ariaLabel={`${entryTitle}の設計メモ`}
        label="課題 / 解決方法"
        title="設計メモ">
        {metadataList}
      </TablePatternSectionCard>
    );
  }

  return (
    <section aria-label={`${entryTitle}の設計メモ`} className={styles.wrapper}>
      {metadataList}
    </section>
  );
}
