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

function CardMeta({meta}: Pick<Props, 'meta'>): ReactNode {
  if (!meta) {
    return null;
  }

  return (
    <p className={styles.meta}>
      <span className={styles.metaPill}>{meta}</span>
    </p>
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
        <div className={styles.cardBody}>
          <CardHeader badge={props.badge} eyebrow={props.eyebrow} />
          <Heading as="h3" className={styles.title} id={props.titleId}>
            {props.title}
          </Heading>
          <p className={styles.description}>{props.description}</p>
        </div>
        <div className={styles.familyFooter}>
          {props.meta ? <p className={styles.supportingText}>{props.meta}</p> : null}
          <p className={styles.primaryLinkRow}>
            <Link className={styles.primaryLink} to={props.to}>
              {props.primaryLinkLabel}
            </Link>
          </p>
          {props.supplementalLinks?.length ? (
            <ul className={styles.supplementalLinkList}>
              {props.supplementalLinks.map((link) => (
                <li className={styles.supplementalLinkItem} key={`${props.title}-${link.to}`}>
                  <Link className={styles.supplementalLink} to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <Link
      aria-labelledby={props.titleId}
      className={styles.cardLink}
      to={props.to}>
      <article className={cardClassName}>
        <div className={styles.cardBody}>
          <CardHeader badge={props.badge} eyebrow={props.eyebrow} />
          <Heading as="h3" className={styles.title} id={props.titleId}>
            {props.title}
          </Heading>
          <p className={styles.description}>{props.description}</p>
        </div>
        <div className={styles.cardFooter}>
          <CardMeta meta={props.meta} />
          <span className={styles.cardAction}>詳細を見る</span>
        </div>
      </article>
    </Link>
  );
}
