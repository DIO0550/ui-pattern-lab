import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  patternsSidebar: [
    'index',
    {
      type: 'category',
      label: 'テーブル',
      link: {
        type: 'doc',
        id: 'table',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'table/responsive-stack',
        'table/horizontal-scroll',
        'table/sticky-header',
        'table/cell-truncation',
      ],
    },
  ],
};

export default sidebars;
