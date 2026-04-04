import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import InputPatternPageContent from '@site/src/components/InputPatternPageContent';

export default function InputDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="自作テキストフィールドデザイン"
      description="UI ライブラリ風の自作テキストフィールドデザインを、主要状態の preview / TSX / CSS で比較できるページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            自作テキストフィールドデザイン
          </Heading>
          <p className="hero__subtitle">
            UI ライブラリ風の自作テキストフィールドデザインを一覧し、一覧では preview / TSX / CSS、detail では default / error / disabled の preview と hover / focus を含む CSS まで確認できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <InputPatternPageContent />
      </main>
    </Layout>
  );
}
