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
      backLink={{to: '/input', label: 'テキストフィールドカテゴリへ戻る'}}
      listSection={
        <>
          <Heading as="h2">{patternCount} デザインの preview / TSX / CSS</Heading>
          <p className={styles.listLead}>
            一覧では UI ライブラリ風の自作テキストフィールドデザインを並べ、各カードから detail ページへ進むと
            default / error / disabled の preview と、hover / focus を含む TSX / CSS、設計メモを個別に確認できます。
          </p>
          <InputPatternGallery density="list" entries={inputPatternEntries} />
          <p className={styles.scopeNote}>
            helper / error / disabled の設計ルールは{' '}
            <Link to="/selector/states-and-validation">states と validation の共通参照</Link>{' '}
            を参照してください。この一覧は CSS を持つ自作デザインの見た目と state 表現だけを対象にしています。
          </p>
        </>
      }
      summary={
        <>
          <Heading as="h2">CSS 付きの自作テキストフィールドデザインを比較する</Heading>
          <p>
            このページでは、アウトライン型 / フィルド型 / アンダーライン型 / ボーダーレス型 / ピル型 の {patternCount} デザインを並べ、
            UI ライブラリ風の text field を自前で持つための見た目と state 表現を見比べます。
          </p>
          <ul className={styles.summaryList}>
            <li>hover / focus を操作で確かめつつ、error / disabled を preview で見比べる</li>
            <li>輪郭線、塗り面、下線のどれを主役にするかで見え方を比較する</li>
            <li>native input の semantics を保ったまま、見た目は CSS module で作る</li>
            <li>TSX と CSS を同じ block で見比べられるようにする</li>
          </ul>
        </>
      }
      summaryAside={
        <>
          <Heading as="h3">収録デザイン</Heading>
          <ul className={styles.summaryList}>
            {inputPatternEntries.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          <p className={styles.scopeNote}>
            ここでは UI ライブラリ風の見た目と state 表現だけを扱い、rules 自体は共通参照へ分けています。
          </p>
        </>
      }
    />
  );
}
