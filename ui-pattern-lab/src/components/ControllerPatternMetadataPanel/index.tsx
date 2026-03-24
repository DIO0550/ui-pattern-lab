import type {ReactNode} from 'react';
import clsx from 'clsx';
import ControllerPatternSectionCard from '@site/src/components/ControllerPatternSectionCard';
import type {ControllerPatternMetadataItem} from '@site/src/data/controllerPatternTypes';

import styles from './styles.module.css';

type Props = {
  density: 'list' | 'detail';
  entryTitle: string;
  items: ControllerPatternMetadataItem[];
};

export default function ControllerPatternMetadataPanel({
  density,
  entryTitle,
  items,
}: Props): ReactNode {
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
      <ControllerPatternSectionCard
        ariaLabel={`${entryTitle}の設計メモ`}
        label="設計メモ"
        title="課題 / 解決方法 / 使いどころ">
        {metadataList}
      </ControllerPatternSectionCard>
    );
  }

  return (
    <section aria-label={`${entryTitle}の設計メモ`} className={styles.wrapper}>
      {metadataList}
    </section>
  );
}
