import { createFeatureSelector } from '@ngrx/store'
import { AIContextFeature } from './aicontext.reducers'
import { AIContextState } from './aicontext.state'

export const selectAIContextFeature = createFeatureSelector<AIContextState>(AIContextFeature.name)
