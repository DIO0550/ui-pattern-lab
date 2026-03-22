import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import SelectorPatternGallery from '@site/src/components/SelectorPatternGallery';
import {groupSelectorPatternEntries} from '@site/src/data/selectorPatternCategories';
import {selectorPatternEntries} from '@site/src/data/selectorPatternEntries';
import type {SelectorPatternCategoryId} from '@site/src/data/selectorPatternTypes';

import styles from './styles.module.css';

type Props = {
  title: string;
  description: string;
  lead: string;
  categoryIds: SelectorPatternCategoryId[];
  backLinkPath: string;
  backLinkLabel: string;
};

export default function SelectorPatternCollectionPageContent({
  title,
  description,
  lead,
  categoryIds,
  backLinkPath,
  backLinkLabel,
}: Props): ReactNode {
  const familyEntries = selectorPatternEntries.filter((entry) => categoryIds.includes(entry.category));
  const groupedEntries = groupSelectorPatternEntries(familyEntries);

  return (
    <PatternComparisonPageShell
      backLink={{label: backLinkLabel, to: backLinkPath}}
      summary={
        <>
          <Heading as="h2">{title}</Heading>
          <p>{description}</p>
          <p>{lead}</p>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">このページに含まれるパターン</Heading>
          <ul className={styles.patternList}>
            {groupedEntries.flatMap((group) =>
              group.entries.map((entry) => (
                <li className={styles.patternItem} key={`${group.id}-${entry.id}`}>
                  <span className={styles.groupLabel}>{group.label}</span>
                  <Link to={`/selector/${entry.id}`}>{entry.title}</Link>
                </li>
              )),
            )}
          </ul>
          <p>
            一覧では family 内の差分を比較し、詳細ページで helper / error / disabled、CSS / TSX サンプルを確認します。
          </p>
        </>
      }
      listSection={
        <>
          <Heading as="h2">パターンを比較する</Heading>
          <p>
            family 内の preview と比較要点を先に見比べてから、必要な detail page を読み進められます。
          </p>
          <SelectorPatternGallery density="list" entries={familyEntries} />
        </>
      }
    />
  );
}
