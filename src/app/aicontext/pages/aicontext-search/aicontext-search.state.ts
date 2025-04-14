import { DataTableColumn } from '@onecx/portal-integration-angular'
import { AIContext } from 'src/app/shared/generated'
import { AIContextSearchCriteria } from './aicontext-search.parameters'

export interface AIContextSearchState {
  columns: DataTableColumn[]
  results: AIContext[]
  displayedColumns: string[] | null
  viewMode: 'basic' | 'advanced'
  chartVisible: boolean
  searchLoadingIndicator: boolean
  criteria: AIContextSearchCriteria
}
