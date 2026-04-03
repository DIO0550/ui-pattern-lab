import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import InputPatternGallery from '@site/src/components/InputPatternGallery';
import PatternComparisonPageShell from '@site/src/components/PatternComparisonPageShell';
import {inputPatternEntries} from '@site/src/data/inputPatternEntries';

import styles from './styles.module.css';

export default function InputPatternPageContent(): ReactNode {
  const patternCount = inputPatternEntries.length;

  return (
    <PatternComparisonPageShell
      backLink={{to: '/input', label: '入力カテゴリへ戻る'}}
      listSection={
        <>
          <Heading as="h2">{patternCount} パターンの preview とコード</Heading>
          <p className={styles.listLead}>
            一覧では input の主要差分だけを並べ、各カードから detail ページへ進むと variant ごとの
            preview とコードを個別に確認できます。
          </p>
          <InputPatternGallery density="list" entries={inputPatternEntries} />
          <p className={styles.scopeNote}>
            textarea / file input / date picker / OTP は今回のスコープ外です。helper / error /
            disabled の横断ルールは{' '}
            <Link to="/selector/states-and-validation">states と validation の共通参照</Link>{' '}
            を参照してください。
          </p>
        </>
      }
      summary={
        <>
          <Heading as="h2">単一行 input の差分を比較する</Heading>
          <p>
            入力カテゴリでは、単一行のテキスト入力を 基本、補助文、バリデーション、アドオン、非編集状態、自作デザイン の {patternCount} パターンで整理します。
          </p>
          <ul className={styles.summaryList}>
            <li>label は常設し、placeholder は補助的な例示に限定する</li>
            <li>helper / error / success を 1フィールド1メッセージで扱う</li>
            <li>leading / trailing adornment を置いても読み順と padding を崩さない</li>
            <li>disabled / readOnly / required を別の責務として分ける</li>
            <li>独自 surface を足す場合も、label・helper・focus の意味は input 本体に残す</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">収録パターン</Heading>
          <ul className={styles.summaryList}>
            {inputPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <p className={styles.scopeNote}>
            selector との境界は「候補を選ぶ UI ではなく text-like な field を扱うこと」です。
          </p>
        </>
      }
    />
  );
}
