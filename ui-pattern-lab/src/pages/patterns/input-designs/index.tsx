import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import InputPatternPageContent from '@site/src/components/InputPatternPageContent';

export default function InputDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="入力デザインパターン"
      description="単一行 input の基本、補助文、バリデーション、アドオン、非編集状態、自作デザインを preview とコードで比較できるページです。">
      <header className="hero hero--primary pattern-page-hero">
        <div className="container pattern-page-hero__inner">
          <Heading as="h1" className="hero__title">
            入力デザインパターン
          </Heading>
          <p className="hero__subtitle">
            単一行 text input の基本形、補助文、validation、addon、disabled / readOnly / required、自作デザインを整理し、一覧では preview とコード、detail では variant ごとの差分を確認できます。
          </p>
        </div>
      </header>

      <main className="pattern-page-main">
        <InputPatternPageContent />
      </main>
    </Layout>
  );
}
