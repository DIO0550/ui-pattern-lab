import type {ReactNode} from 'react';
import clsx from 'clsx';
import SelectorPatternSectionCard from '@site/src/components/SelectorPatternSectionCard';
import type {SelectorPatternMetadataItem} from '@site/src/data/selectorPatternTypes';

import styles from './styles.module.css';

type Props = {
  density: 'list' | 'detail';
  entryTitle: string;
  items: SelectorPatternMetadataItem[];
};

export default function SelectorPatternMetadataPanel({
  density,
  entryTitle,
  items,
}: Props): ReactNode {
  const visibleItems =
    density === 'list'
      ? items.filter((item) => item.tone === 'problem' || item.tone === 'solution' || item.tone === 'comparison')
      : items;

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
      <SelectorPatternSectionCard
        ariaLabel={`${entryTitle}の設計メモ`}
        label="設計メモ"
        title="課題 / 解決方法 / 使いどころ / 比較メモ">
        {metadataList}
      </SelectorPatternSectionCard>
    );
  }

  return (
    <section aria-label={`${entryTitle}の設計メモ`} className={styles.wrapper}>
      {metadataList}
    </section>
  );
}
