import { TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { Action, Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
// import { TranslateTestingModule } from 'ngx-translate-testing'
import { DialogService } from 'primeng/dynamicdialog'
import { AIKnowledgeDocumentSearchActions } from './aiknowledge-document-search.actions'
import { AIKnowledgeDocumentSearchColumns } from './aiknowledge-document-search.columns'
import { initialState } from './aiknowledge-document-search.reducers'
import { selectAIKnowledgeDocumentSearchViewModel } from './aiknowledge-document-search.selectors'
import { AIKnowledgeDocumentSearchViewModel } from './aiknowledge-document-search.viewmodel'
import { Observable } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { hot, cold } from 'jest-marbles'
import 'jasmine'
import { AIKnowledgeDocumentBffService, AIKnowledgeDocumentSearchResponse, AIKnowledgeDocumentStatusEnum } from 'src/app/shared/generated'
import { AIKnowledgeDocumentSearchEffects } from './aiknowledge-document-search.effects'

// import enTranslations from './../../../../assets/i18n/en.json'
// import deTranslations from './../../../../assets/i18n/de.json'

describe('AIKnowledgeDocumentSearchEffects', () => {
    let actions$ = new Observable<Action>()
    let effects: AIKnowledgeDocumentSearchEffects
    let store: MockStore<Store>
    const mockedAIKnowledgeDocumentBffService = {
        searchAIKnowledgeDocuments: jest.fn()
    }
    const mockActivatedRoute = {
        snapshot: {
            data: {}
        }
    }
    const mockSuccessSearchResponse: AIKnowledgeDocumentSearchResponse = {
        results: [{
            modificationCount: 0,
            id: "1",
            name: "Test 1",
            documentRefId: "012",
            status: AIKnowledgeDocumentStatusEnum.Processing
        }, {
            modificationCount: 1,
            id: "2",
            name: "Test 2",
            documentRefId: "123",
            status: AIKnowledgeDocumentStatusEnum.New
        }],
        totalNumberOfResults: 2
    }
    const baseAIKnowledgeDocumentSearchViewModel: AIKnowledgeDocumentSearchViewModel = {
        columns: AIKnowledgeDocumentSearchColumns,
        searchCriteria: {
            id: undefined,
            name: undefined,
            status: undefined
        },
        results: [],
        displayedColumns: [],
        viewMode: 'basic',
        chartVisible: false
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DialogService,
                provideMockActions(() => actions$),
                provideMockStore({ initialState: { aIKnowledgeDocument: { search: initialState } } }),
                { provide: AIKnowledgeDocumentBffService, useValue: mockedAIKnowledgeDocumentBffService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                AIKnowledgeDocumentSearchEffects
            ],
            imports: [
                // TranslateTestingModule.withTranslations('en', enTranslations).withTranslations(
                //     'de', deTranslations
                // ),
            ]
        })
        store = TestBed.inject(MockStore)
        store.overrideSelector(selectAIKnowledgeDocumentSearchViewModel, baseAIKnowledgeDocumentSearchViewModel)
        store.refreshState()

        effects = TestBed.inject(AIKnowledgeDocumentSearchEffects)
        mockedAIKnowledgeDocumentBffService.searchAIKnowledgeDocuments.mockClear()
    })

    it('should dispatch search for AIKnowledge Document details received', () => {
        // Arrange
        actions$ = hot('-a', { a: AIKnowledgeDocumentSearchActions.searchButtonClicked({ searchCriteria: { name: 'Test' } }) })

        store.refreshState()

        // Act
        mockedAIKnowledgeDocumentBffService.searchAIKnowledgeDocuments.mockReturnValue(
            cold('--a', { a: mockSuccessSearchResponse })
        )

        // Assert
        const expected = hot('---b', {
            b: AIKnowledgeDocumentSearchActions.aIKnowledgeDocumentSearchResultsReceived({
                results: mockSuccessSearchResponse.results,
                totalNumberOfResults: mockSuccessSearchResponse.totalNumberOfResults
            })
        })
        console.log('expected', expected)
        expect(effects.syncParamsToUrl$).toBe(expected)
    })
})