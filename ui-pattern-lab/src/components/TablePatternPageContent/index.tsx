import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import TablePatternGallery from '@site/src/components/TablePatternGallery';
import {tablePatternEntries} from '@site/src/data/tablePatternEntries';

export default function TablePatternPageContent(): ReactNode {
  return (
    <>
      <section className="container margin-vert--xl">
        <div className="row">
          <div className="col col--7">
            <Heading as="h2">このページで比較できること</Heading>
            <p>
              ここでは、テーブルそのものの見た目ではなく、情報量の多い表を
              どう見せるかという設計パターンに絞って比較します。各パターン
              ごとに、解決したい課題、向いている場面、アクセシビリティ上の
              注意点に加えて、核心 CSS と最小限のコード例も確認できます。
            </p>
            <ul>
              <li>狭い画面でも意味を失わない見せ方</li>
              <li>列を省かずに比較性を保つ方法</li>
              <li>長い表でヘッダーの文脈を保つ方法</li>
              <li>長文セルを崩さずに扱う方法</li>
              <li>一覧では要約、詳細では全文を見るためのコード導線</li>
            </ul>
          </div>
          <div className="col col--5">
            <div className="card">
              <div className="card__body">
                <Heading as="h3">初回収録パターン</Heading>
                <ul>
                  {tablePatternEntries.map((entry) => (
                    <li key={entry.id}>{entry.title}</li>
                  ))}
                </ul>
                <p className="margin-bottom--0">
                  デモはあえて小さめにして、プロダクト固有の装飾よりも
                  パターンの差分が見えることを優先しています。コード例は
                  一覧では折りたたみ、詳細ページでは展開表示します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container margin-bottom--xl">
        <Heading as="h2">パターンを比較する</Heading>
        <p>
          下のカードから、各パターンのデモ、課題、解決方法、使いどころを
          まとめて確認できます。CSS / コード例は要約つきで折りたたまれており、
          詳細ページでは全文を読み比べられます。
        </p>
        <TablePatternGallery density="list" entries={tablePatternEntries} />
      </section>
    </>
  );
}
