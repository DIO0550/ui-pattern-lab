import type {InputPatternEntryId} from '@site/src/data/inputPatternTypes';

export const INPUT_CATEGORY_PATH = '/input';
export const INPUT_PATTERN_PAGE_PATH = '/patterns/input-designs';

export function buildInputDetailPath(entryId: InputPatternEntryId): string {
  return `${INPUT_CATEGORY_PATH}/${entryId}`;
}
