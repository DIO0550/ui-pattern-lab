import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import EllipsisDisplayPatternPageContent from '@site/src/components/EllipsisDisplayPatternPageContent';

export default function EllipsisDisplayDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="省略表示パターン"
      description="各省略パターンの判断軸と要点を比較し、詳細ページで preview / CSS / TSX 例を確認できる比較ページです。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            省略表示パターン
          </Heading>
          <p className="hero__subtitle">
            このページでは各パターンの判断軸と要点を比較し、preview / CSS / TSX
            例は詳細ページで確認します。
          </p>
        </div>
      </header>

      <main>
        <EllipsisDisplayPatternPageContent />
      </main>
    </Layout>
  );
}
