import type {
  SelectorPatternCategoryId,
  SelectorPatternEntry,
} from './selectorPatternTypes';

export type SelectorPatternCategory = {
  id: SelectorPatternCategoryId;
  label: string;
  description: string;
  landingPath: string;
};

export type SelectorPatternCategoryGroup = SelectorPatternCategory & {
  entries: SelectorPatternEntry[];
};

export const selectorPatternCategories = [
  {
    id: 'radio',
    label: 'Radio',
    description:
      '候補を見せたまま比較し、1 つの値へ絞る family です。radio group と radio card をまとめます。',
    landingPath: '/patterns/selector-designs',
  },
  {
    id: 'native-select',
    label: 'Native select',
    description:
      '候補を圧縮し、フォーム密度と mobile native picker を優先する baseline family です。',
    landingPath: '/selector/native-select-compact-options',
  },
  {
    id: 'custom-select',
    label: 'Custom select',
    description:
      '自前描画の trigger / listbox / option を使い、見た目と option 表現を拡張する family です。',
    landingPath: '/patterns/selector-custom-select-designs',
  },
  {
    id: 'combobox',
    label: 'Combobox',
    description:
      '検索と候補絞り込みで single-select を支える family です。baseline と variation を比較します。',
    landingPath: '/patterns/selector-combobox-designs',
  },
  {
    id: 'reference',
    label: 'States / validation',
    description:
      'helper、error、disabled、long label、screen reader guidance を横断で確認する参照 family です。',
    landingPath: '/selector/states-and-validation',
  },
] as const satisfies readonly SelectorPatternCategory[];

/**
 * Returns the shared family metadata used by selector detail pages and overview surfaces.
 */
export function getSelectorPatternCategoryById(
  categoryId: SelectorPatternCategoryId,
): SelectorPatternCategory {
  const category = selectorPatternCategories.find((item) => item.id === categoryId);

  if (!category) {
    throw new Error(`Unknown selector pattern category: ${categoryId}`);
  }

  return category;
}

/**
 * Groups selector entries by the shared family metadata used across overview surfaces.
 */
export function groupSelectorPatternEntries(
  entries: readonly SelectorPatternEntry[],
): SelectorPatternCategoryGroup[] {
  return selectorPatternCategories
    .map((category) => ({
      ...category,
      entries: entries.filter((entry) => entry.category === category.id),
    }))
    .filter((category) => category.entries.length > 0);
}
