import type {AlertPatternEntry} from '@site/src/data/alertPatternTypes';

export const alertPatternEntries: AlertPatternEntry[] = [
  {
    id: 'contextual-alert',
    title: '文脈内アラート',
    summary:
      'ページ内に残る info / success / warning / error / neutral の feedback を、severity と visual style を分けて整理する基本 Alert です。',
    problem:
      '一時通知の toast と同じ扱いでページ内メッセージを置くと、ユーザーが後から参照すべき情報、フォーム全体のエラー、危険操作の注意が流れてしまいます。',
    solution:
      'Alert は文脈の近くに常駐する feedback として扱い、severity は意味、visual style は表示の強さ、behavior は本文のみ / action 付き / dismissible に分けて設計します。',
    whenToUse:
      'フォームの validation summary、システムメンテナンス告知、破壊的操作前の注意、処理成功後も残しておきたい完了情報に向いています。',
    layoutNotes:
      'Alert は関連するフォーム、設定ブロック、一覧の直上など、読むべき文脈に隣接させます。本文は 1-2 行を基本にし、長い補足はリンクや詳細領域へ逃がします。',
    stateNotes:
      '常駐メッセージを基本にし、dismissible はユーザーが消しても業務上困らない情報に限定します。action button 付きは本文だけの Alert と別 variant として扱います。',
    accessibilityNotes:
      '重要度に応じて role="status" / role="alert" を使い分け、見出しと本文で色以外にも意味が伝わる構成にします。閉じるボタンには内容が分かる aria-label を付けます。',
    tags: ['alert', 'feedback', 'validation', 'system notice'],
  },
];
