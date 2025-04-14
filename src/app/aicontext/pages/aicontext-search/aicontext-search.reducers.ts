import { routerNavigatedAction, RouterNavigatedAction } from '@ngrx/router-store'
import { createReducer, on } from '@ngrx/store'
import { AIContextSearchActions } from './aicontext-search.actions'
import { aIContextSearchColumns } from './aicontext-search.columns'
import { aIContextSearchCriteriasSchema } from './aicontext-search.parameters'
import { AIContextSearchState } from './aicontext-search.state'

export const initialState: AIContextSearchState = {
  columns: aIContextSearchColumns,
  results: [],
  displayedColumns: null,
  viewMode: 'basic',
  chartVisible: false,
  searchLoadingIndicator: false,
  criteria: {}
}

export const AIContextSearchReducer = createReducer(
  initialState,
  on(routerNavigatedAction, (state: AIContextSearchState, action: RouterNavigatedAction) => {
    const results = aIContextSearchCriteriasSchema.safeParse(action.payload.routerState.root.queryParams)
    if (results.success) {
      return {
        ...state,
        criteria: results.data,
        searchLoadingIndicator: Object.keys(action.payload.routerState.root.queryParams).length != 0
      }
    }
    return state
  }),
  on(
    AIContextSearchActions.resetButtonClicked,
    (state: AIContextSearchState): AIContextSearchState => ({
      ...state,
      results: initialState.results,
      criteria: {}
    })
  ),
  on(
    AIContextSearchActions.searchButtonClicked,
    (state: AIContextSearchState, { searchCriteria }): AIContextSearchState => ({
      ...state,
      searchLoadingIndicator: true,
      criteria: searchCriteria
    })
  ),
  on(
    AIContextSearchActions.aIContextSearchResultsReceived,
    (state: AIContextSearchState, { results }): AIContextSearchState => ({
      ...state,
      results
    })
  ),
  on(
    AIContextSearchActions.aIContextSearchResultsLoadingFailed,
    (state: AIContextSearchState): AIContextSearchState => ({
      ...state,
      results: []
    })
  ),
  on(
    AIContextSearchActions.chartVisibilityRehydrated,
    (state: AIContextSearchState, { visible }): AIContextSearchState => ({
      ...state,
      chartVisible: visible
    })
  ),
  on(
    AIContextSearchActions.chartVisibilityToggled,
    (state: AIContextSearchState): AIContextSearchState => ({
      ...state,
      chartVisible: !state.chartVisible
    })
  ),
  on(
    AIContextSearchActions.viewModeChanged,
    (state: AIContextSearchState, { viewMode }): AIContextSearchState => ({
      ...state,
      viewMode: viewMode
    })
  ),
  on(
    AIContextSearchActions.displayedColumnsChanged,
    (state: AIContextSearchState, { displayedColumns }): AIContextSearchState => ({
      ...state,
      displayedColumns: displayedColumns.map((v) => v.id)
    })
  )
)
