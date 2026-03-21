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
    {
      type: 'category',
      label: '省略表示',
      link: {
        type: 'doc',
        id: 'ellipsis-display',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'ellipsis-display/single-line-ellipsis',
        'ellipsis-display/multi-line-clamp',
        'ellipsis-display/full-text-supplement',
        'ellipsis-display/accessible-disclosure',
      ],
    },
    {
      type: 'category',
      label: 'ボタン',
      link: {
        type: 'doc',
        id: 'button',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'button/hierarchy-and-emphasis',
        'button/interactive-states',
        'button/destructive-actions',
        'button/icon-and-compound-actions',
        'button/toggle-and-selection',
        'button/spacing-and-sizing',
      ],
    },
    {
      type: 'category',
      label: 'チェックボックス',
      link: {
        type: 'doc',
        id: 'checkbox',
      },
      collapsible: true,
      collapsed: true,
      items: [
        'checkbox/multiple-independent-selection',
        'checkbox/selectable-cards',
        'checkbox/single-checkbox-and-indeterminate',
        'checkbox/states-and-accessibility',
        'checkbox/mobile-and-touch-targets',
      ],
    },
    {
      type: 'category',
      label: 'セレクタ',
      link: {
        type: 'doc',
        id: 'selector',
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Radio',
          collapsible: true,
          collapsed: false,
          items: [
            'selector/radio-group-single-selection',
            'selector/selectable-radio-cards',
          ],
        },
        {
          type: 'category',
          label: 'Native select',
          collapsible: true,
          collapsed: false,
          items: ['selector/native-select-compact-options'],
        },
        {
          type: 'category',
          label: 'Custom select',
          collapsible: true,
          collapsed: false,
          items: [
            'selector/custom-select-outline-listbox',
            'selector/custom-select-soft-options',
            'selector/custom-select-card-options',
          ],
        },
        {
          type: 'category',
          label: 'Combobox',
          collapsible: true,
          collapsed: false,
          items: [
            'selector/combobox-search-and-filter',
            'selector/combobox-grouped-results',
            'selector/combobox-empty-and-loading-states',
          ],
        },
        {
          type: 'category',
          label: 'States / validation',
          collapsible: true,
          collapsed: false,
          items: ['selector/states-and-validation'],
        },
      ],
    },
  ],
};

export default sidebars;
