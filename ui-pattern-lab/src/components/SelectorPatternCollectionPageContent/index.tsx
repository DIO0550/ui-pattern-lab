import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import SelectorPatternGallery from '@site/src/components/SelectorPatternGallery';
import {groupSelectorPatternEntries} from '@site/src/data/selectorPatternCategories';
import {selectorPatternEntries} from '@site/src/data/selectorPatternEntries';
import type {SelectorPatternCategoryId} from '@site/src/data/selectorPatternTypes';

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
    <div className="container margin-vert--xl">
      <nav aria-label="戻るリンク">
        <Link to={backLinkPath}>{backLinkLabel}</Link>
      </nav>

      <section className="margin-top--md">
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
        <p>{lead}</p>
      </section>

      <section className="margin-top--lg">
        <Heading as="h2">このページに含まれるパターン</Heading>
        <ul>
          {groupedEntries.map((group) =>
            group.entries.map((entry) => (
              <li key={entry.id}>
                <strong>{group.label}</strong>: <Link to={`/selector/${entry.id}`}>{entry.title}</Link>
              </li>
            )),
          )}
        </ul>
      </section>

      <section className="margin-top--lg">
        <Heading as="h2">パターンを比較する</Heading>
        <SelectorPatternGallery density="list" entries={familyEntries} />
      </section>
    </div>
  );
}
