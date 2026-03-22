import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';

import styles from './styles.module.css';

type CardTone = 'default' | 'muted';

type SupplementalLink = {
  to: string;
  label: string;
};

type CommonProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  meta?: string;
  titleId?: string;
  className?: string;
};

type FeaturedCardProps = CommonProps & {
  to: string;
  variant: 'featured';
  tone?: never;
  primaryLinkLabel?: never;
  supplementalLinks?: never;
};

type DefaultCardProps = CommonProps & {
  to: string;
  variant: 'default';
  tone?: CardTone;
  primaryLinkLabel?: never;
  supplementalLinks?: never;
};

type FamilyCardProps = CommonProps & {
  to: string;
  variant: 'family';
  tone?: CardTone;
  primaryLinkLabel: string;
  supplementalLinks?: SupplementalLink[];
};

type Props = FeaturedCardProps | DefaultCardProps | FamilyCardProps;

function CardHeader({badge, eyebrow}: Pick<Props, 'badge' | 'eyebrow'>): ReactNode {
  return (
    <div className={styles.cardHeader}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      {badge ? <span className={styles.badge}>{badge}</span> : null}
    </div>
  );
}

function buildCardClassName(props: Props): string {
  return clsx(
    styles.card,
    props.variant === 'featured' && styles.featuredCard,
    props.variant === 'family' && styles.familyCard,
    props.tone === 'muted' && styles.mutedTone,
    props.className,
  );
}

export default function PatternCatalogCard(props: Props): ReactNode {
  const cardClassName = buildCardClassName(props);

  if (props.variant === 'family') {
    return (
      <article className={cardClassName}>
        <CardHeader badge={props.badge} eyebrow={props.eyebrow} />
        <Heading as="h3" className={styles.title} id={props.titleId}>
          {props.title}
        </Heading>
        <p className={styles.description}>{props.description}</p>
        {props.meta ? <p className={styles.supportingText}>{props.meta}</p> : null}
        <p className={styles.primaryLinkRow}>
          <Link className={styles.primaryLink} to={props.to}>
            {props.primaryLinkLabel}
          </Link>
        </p>
        {props.supplementalLinks?.length ? (
          <ul className={styles.supplementalLinkList}>
            {props.supplementalLinks.map((link) => (
              <li key={`${props.title}-${link.to}`}>
                <Link className={styles.supplementalLink} to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    );
  }

  return (
    <Link
      aria-labelledby={props.titleId}
      className={styles.cardLink}
      to={props.to}>
      <article className={cardClassName}>
        <CardHeader badge={props.badge} eyebrow={props.eyebrow} />
        <Heading as="h3" className={styles.title} id={props.titleId}>
          {props.title}
        </Heading>
        <p className={styles.description}>{props.description}</p>
        {props.meta ? <p className={styles.meta}>{props.meta}</p> : null}
      </article>
    </Link>
  );
}
