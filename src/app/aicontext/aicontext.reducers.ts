import { combineReducers, createFeature } from '@ngrx/store'
import { AIContextState } from './aicontext.state'
import { AIContextSearchReducer } from './pages/aicontext-search/aicontext-search.reducers'

export const AIContextFeature = createFeature({
  name: 'aIContext',
  reducer: combineReducers<AIContextState>({
    search: AIContextSearchReducer
  })
})
