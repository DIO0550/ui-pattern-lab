import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import EllipsisDisplayPatternPageContent from '@site/src/components/EllipsisDisplayPatternPageContent';

export default function EllipsisDisplayDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="表示制限パターン"
      description="表示制限の行動パターンを比較し、visual variation は各詳細ページで preview / CSS / TSX と合わせて確認するページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            表示制限パターン
          </Heading>
          <p className="hero__subtitle">
            このページでは「どこまで見せるか」と「全文へどう到達させるか」を比較し、見た目の variation は詳細ページで確認します。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <EllipsisDisplayPatternPageContent />
      </main>
    </Layout>
  );
}
