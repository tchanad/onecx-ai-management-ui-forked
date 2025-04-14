import { DataTableColumn, RowListGridData } from '@onecx/portal-integration-angular'
import { AIContextSearchCriteria } from './aicontext-search.parameters'

export interface AIContextSearchViewModel {
  columns: DataTableColumn[]
  searchCriteria: AIContextSearchCriteria
  results: RowListGridData[]
  displayedColumns: DataTableColumn[]
  viewMode: 'basic' | 'advanced'
  chartVisible: boolean
}
