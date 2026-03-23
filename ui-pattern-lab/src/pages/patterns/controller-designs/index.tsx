import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ControllerPatternPageContent from '@site/src/components/ControllerPatternPageContent';

export default function ControllerDesignPatternsPage(): ReactNode {
  return (
    <Layout
      title="表示制御デザインパターン"
      description="view switch、scope control、continuous adjustment の観点から、controller 系 UI を比較しながら選ぶためのページです。">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            表示制御デザインパターン
          </Heading>
          <p className="hero__subtitle">
            segmented control、tabs、sort / filter toolbar、pagination、range slider、
            quantity stepper を比較し、どの controller が view state をどう変えるかを先に整理できます。
          </p>
        </div>
      </header>

      <main>
        <ControllerPatternPageContent />
      </main>
    </Layout>
  );
}
