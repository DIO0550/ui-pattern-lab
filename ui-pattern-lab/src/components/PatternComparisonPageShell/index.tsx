import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

type BackLink = {
  to: string;
  label: string;
};

type Props = {
  summary: ReactNode;
  summaryAside: ReactNode;
  axisSection?: ReactNode;
  listSection: ReactNode;
  backLink?: BackLink;
};

export default function PatternComparisonPageShell({
  summary,
  summaryAside,
  axisSection,
  listSection,
  backLink,
}: Props): ReactNode {
  return (
    <div className={styles.root}>
      <section className={`container margin-vert--xl ${styles.introSection}`}>
        {backLink ? (
          <nav aria-label="戻るリンク" className={styles.backLinkNav}>
            <Link className={styles.backLink} to={backLink.to}>
              {backLink.label}
            </Link>
          </nav>
        ) : null}

        <div className={styles.heroGrid}>
          <div className={styles.introCopy}>{summary}</div>
          <aside className={styles.summaryCard}>{summaryAside}</aside>
        </div>
      </section>

      {axisSection}

      <section className={`container margin-bottom--xl ${styles.listSection}`}>
        {listSection}
      </section>
    </div>
  );
}
