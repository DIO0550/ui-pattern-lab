import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type Item = {
  title: string;
  description: string;
};

type Props = {
  items: readonly Item[];
  layout: 'cards' | 'bullets';
};

export default function PatternComparisonAxisGrid({items, layout}: Props): ReactNode {
  if (items.length === 0) {
    return null;
  }

  if (layout === 'bullets') {
    return (
      <div className={styles.bulletSurface}>
        <ul className={styles.bulletList}>
          {items.map((item) => (
            <li className={styles.bulletItem} key={item.title}>
              <span className={styles.bulletTitle}>{item.title}</span>
              <p className={styles.bulletDescription}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article className={styles.card} key={item.title}>
          <div className={styles.cardHeader}>
            <span className={styles.cardEyebrow}>比較軸</span>
            <Heading as="h3" className={styles.cardTitle}>
              {item.title}
            </Heading>
          </div>
          <p className={styles.cardDescription}>{item.description}</p>
        </article>
      ))}
    </div>
  );
}
