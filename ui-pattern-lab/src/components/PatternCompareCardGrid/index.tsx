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

function buildCardMeta(tags: string[]): string | undefined {
  const [, ...restTags] = tags;

  if (restTags.length === 0) {
    return undefined;
  }

  return restTags.join(' / ');
}

export default function PatternCompareCardGrid({items}: Props): ReactNode {
  if (items.length === 0) {
    return null;
  }

  const [featuredItem, ...regularItems] = items;

  return (
    <>
      <div className="margin-bottom--lg">
        <PatternCatalogCard
          badge={featuredItem.tags[0]}
          description={featuredItem.summary}
          eyebrow="比較メモ"
          meta={buildCardMeta(featuredItem.tags)}
          title={featuredItem.title}
          to={featuredItem.to}
          variant={regularItems.length > 0 ? 'featured' : 'default'}
        />
      </div>
      {regularItems.length > 0 ? (
        <div className={styles.grid}>
          {regularItems.map((item) => (
            <PatternCatalogCard
              badge={item.tags[0]}
              description={item.summary}
              eyebrow="比較メモ"
              key={item.id}
              meta={buildCardMeta(item.tags)}
              title={item.title}
              to={item.to}
              variant="default"
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
