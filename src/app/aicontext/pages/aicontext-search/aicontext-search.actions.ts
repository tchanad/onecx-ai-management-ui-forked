import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { DataTableColumn } from '@onecx/angular-accelerator'
import { AIContext } from '../../../shared/generated'
import { AIContextSearchCriteria } from './aicontext-search.parameters'

export const AIContextSearchActions = createActionGroup({
  source: 'AIContextSearch',
  events: {
    'Search button clicked': props<{
      searchCriteria: AIContextSearchCriteria
    }>(),
    'Reset button clicked': emptyProps(),
    'aIContext search results received': props<{
      results: AIContext[]
      totalNumberOfResults: number
    }>(),
    'aIContext search results loading failed': props<{ error: string | null }>(),
    'Displayed columns changed': props<{
      displayedColumns: DataTableColumn[]
    }>(),
    'Chart visibility rehydrated': props<{
      visible: boolean
    }>(),
    'Chart visibility toggled': emptyProps(),
    'View mode changed': props<{
      viewMode: 'basic' | 'advanced'
    }>(),
    'Export button clicked': emptyProps()
  }
})
