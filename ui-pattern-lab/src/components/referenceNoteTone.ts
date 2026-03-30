export type ReferenceNoteTone =
  | 'problem'
  | 'solution'
  | 'usage'
  | 'layout'
  | 'state'
  | 'accessibility'
  | 'default';

/** Maps reference-note ids and labels to the shared metadata tone palette. */
export function getReferenceNoteTone(noteId: string, label: string): ReferenceNoteTone {
  const normalizedId = noteId.toLowerCase();

  if (normalizedId.includes('problem') || label.includes('課題')) {
    return 'problem';
  }

  if (normalizedId.includes('solution') || label.includes('解決方法')) {
    return 'solution';
  }

  if (
    normalizedId.includes('usecase') ||
    normalizedId.includes('usage') ||
    label.includes('使いどころ') ||
    label.includes('向いている場面')
  ) {
    return 'usage';
  }

  if (
    normalizedId.includes('layout') ||
    normalizedId.includes('spacing') ||
    label.includes('余白') ||
    label.includes('レイアウト')
  ) {
    return 'layout';
  }

  if (normalizedId.includes('state') || label.includes('状態')) {
    return 'state';
  }

  if (
    normalizedId.includes('a11y') ||
    normalizedId.includes('accessibility') ||
    label.includes('アクセシビリティ')
  ) {
    return 'accessibility';
  }

  return 'default';
}
