import { createSelector } from '@ngrx/store'
import { createChildSelectors } from '@onecx/ngrx-accelerator'
import { DataTableColumn, RowListGridData } from '@onecx/portal-integration-angular'
import { AIContextFeature } from '../../aicontext.reducers'
import { initialState } from './aicontext-search.reducers'
import { AIContextSearchViewModel } from './aicontext-search.viewmodel'

export const aIContextSearchSelectors = createChildSelectors(AIContextFeature.selectSearch, initialState)

export const selectResults = createSelector(aIContextSearchSelectors.selectResults, (results): RowListGridData[] => {
  return results.map((item) => ({
    imagePath: '',
    id: item.id ? `${item.id}` : '',
    appId: item.appId ? `${item.appId}` : '',
    name: item.name ? `${item.name}` : '',
    description: item.description ? `${item.description}` : '',
    modificationCount: item.modificationCount ? `${item.modificationCount}` : '',
    modificationUser: item.modificationUser ? `${item.modificationUser}` : '',
    creationUser: item.creationUser ? `${item.creationUser}` : '',
    creationDate: item.creationDate ? `${item.creationDate}` : '',
    modificationDate: item.modificationDate ? `${item.modificationDate}` : ''
  }))
})

export const selectDisplayedColumns = createSelector(
  aIContextSearchSelectors.selectColumns,
  aIContextSearchSelectors.selectDisplayedColumns,
  (columns, displayedColumns): DataTableColumn[] => {
    return (displayedColumns?.map((d) => columns.find((c) => c.id === d)).filter((d) => d) as DataTableColumn[]) ?? []
  }
)

export const selectAIContextSearchViewModel = createSelector(
  aIContextSearchSelectors.selectColumns,
  aIContextSearchSelectors.selectCriteria,
  selectResults,
  selectDisplayedColumns,
  aIContextSearchSelectors.selectViewMode,
  aIContextSearchSelectors.selectChartVisible,
  (columns, searchCriteria, results, displayedColumns, viewMode, chartVisible): AIContextSearchViewModel => ({
    columns,
    searchCriteria,
    results,
    displayedColumns,
    viewMode,
    chartVisible
  })
)
