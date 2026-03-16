import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type ButtonPatternSectionCardProps = {
  ariaLabel: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function ButtonPatternSectionCard({
  ariaLabel,
  label,
  title,
  description,
  children,
  className,
}: ButtonPatternSectionCardProps): ReactNode {
  return (
    <section aria-label={ariaLabel} className={clsx(styles.root, className)}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <Heading as="h4" className={styles.title}>
          {title}
        </Heading>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
