import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CheckboxPatternPageContent from '@site/src/components/CheckboxPatternPageContent';

export default function CheckboxDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="チェックボックスデザインパターン"
      description="checkbox を radio button / switch / select と見比べつつ、複数選択、mixed state、押しやすさの判断を先に整理できるページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            チェックボックスデザインパターン
          </Heading>
          <p className="hero__subtitle">
            複数選択、mixed state、状態設計、モバイルでの押しやすさを先に比較し、
            一覧では比較マトリクスと preview を、詳細ページでは CSS / TSX
            サンプルと設計メモを確認できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <CheckboxPatternPageContent />
      </main>
    </Layout>
  );
}
