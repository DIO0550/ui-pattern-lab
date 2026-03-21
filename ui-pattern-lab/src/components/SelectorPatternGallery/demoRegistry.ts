import type {ReactNode} from 'react';
import type {SelectorDemoKind} from '@site/src/data/selectorPatternTypes';

import ComboboxEmptyAndLoadingStatesDemo from './demos/ComboboxEmptyAndLoadingStatesDemo';
import ComboboxGroupedResultsDemo from './demos/ComboboxGroupedResultsDemo';
import ComboboxSearchAndFilterDemo from './demos/ComboboxSearchAndFilterDemo';
import CustomSelectCardOptionsDemo from './demos/CustomSelectCardOptionsDemo';
import CustomSelectOutlineListboxDemo from './demos/CustomSelectOutlineListboxDemo';
import CustomSelectSoftOptionsDemo from './demos/CustomSelectSoftOptionsDemo';
import NativeSelectCompactOptionsDemo from './demos/NativeSelectCompactOptionsDemo';
import RadioGroupSingleSelectionDemo from './demos/RadioGroupSingleSelectionDemo';
import SelectableRadioCardsDemo from './demos/SelectableRadioCardsDemo';
import StatesAndValidationDemo from './demos/StatesAndValidationDemo';

type DemoRenderer = () => ReactNode;

export const demoRegistry: Record<SelectorDemoKind, DemoRenderer> = {
  'radio-group-single-selection': RadioGroupSingleSelectionDemo,
  'selectable-radio-cards': SelectableRadioCardsDemo,
  'native-select-compact-options': NativeSelectCompactOptionsDemo,
  'custom-select-outline-listbox': CustomSelectOutlineListboxDemo,
  'custom-select-soft-options': CustomSelectSoftOptionsDemo,
  'custom-select-card-options': CustomSelectCardOptionsDemo,
  'combobox-search-and-filter': ComboboxSearchAndFilterDemo,
  'combobox-grouped-results': ComboboxGroupedResultsDemo,
  'combobox-empty-and-loading-states': ComboboxEmptyAndLoadingStatesDemo,
  'states-and-validation': StatesAndValidationDemo,
};
