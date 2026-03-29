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
              <span aria-hidden="true">←</span>
              <span>{backLink.label}</span>
            </Link>
          </nav>
        ) : null}

        <div className={styles.heroSurface}>
          <div className={styles.heroGrid}>
            <div className={styles.introCopy}>
              <p className={styles.introEyebrow}>比較ページ</p>
              {summary}
            </div>
            <aside className={styles.summaryCard}>
              <p className={styles.summaryEyebrow}>要点メモ</p>
              <div className={styles.summaryContent}>{summaryAside}</div>
            </aside>
          </div>
        </div>
      </section>

      {axisSection}

      <section className={`container margin-bottom--xl ${styles.listSection}`}>
        <div className={styles.listSectionSurface}>
          <p className={styles.listEyebrow}>比較候補</p>
          {listSection}
        </div>
      </section>
    </div>
  );
}
