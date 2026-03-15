import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import TablePatternPageContent from '@site/src/components/TablePatternPageContent';

export default function TableDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="テーブルデザインパターン"
      description="狭い画面、横スクロール、固定ヘッダー、省略表示を含むテーブルUIパターンを比較します。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            テーブルデザインパターン
          </Heading>
          <p className="hero__subtitle">
            情報量の多いテーブルを、狭い画面や長いスクロール領域でも
            読みやすく保つための見せ方を比較します。
          </p>
        </div>
      </header>

      <main>
        <TablePatternPageContent />
      </main>
    </Layout>
  );
}
