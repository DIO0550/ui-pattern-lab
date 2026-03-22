import type {ReactNode} from 'react';
import PatternCatalogCard from '@site/src/components/PatternCatalogCard';

import styles from './styles.module.css';

type PatternCompareCardItem = {
  id: string;
  title: string;
  summary: string;
  to: string;
  tags: string[];
};

type Props = {
  items: PatternCompareCardItem[];
};

export default function PatternCompareCardGrid({items}: Props): ReactNode {
  return (
    <div className={styles.grid}>
      {items.map((item) => {
        const [badge, ...restTags] = item.tags;
        const meta = restTags.length > 0 ? restTags.join(' / ') : undefined;

        return (
          <PatternCatalogCard
            badge={badge}
            description={item.summary}
            eyebrow="比較メモ"
            key={item.id}
            meta={meta}
            title={item.title}
            to={item.to}
            variant="default"
          />
        );
      })}
    </div>
  );
}
