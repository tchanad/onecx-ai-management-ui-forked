import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import {
    Observable,
    of//, throwError
} from 'rxjs'
import {
    AIKnowledgeDocument,
    AIKnowledgeDocumentBffService,
    // AIKnowledgeDocumentSearchRequest,
    // AIKnowledgeDocumentSearchResponse,
    AIKnowledgeDocumentStatusEnum,
    // Configuration
} from 'src/app/shared/generated'
import { AIKnowledgeDocumentSearchEffects } from './aiknowledge-document-search.effects'
import {
    Action,
    Store
    // , StoreModule
} from '@ngrx/store'
import { AIKnowledgeDocumentSearchActions } from './aiknowledge-document-search.actions'
import { AIKnowledgeDocumentSearchViewModel } from './aiknowledge-document-search.viewmodel'
import { AIKnowledgeDocumentSearchColumns } from './aiknowledge-document-search.columns'
// import { AIKnowledgeDocumentSearchComponent } from './aiknowledge-document-search.component'
import {
    ColumnType
    // , PortalCoreModule, UserService
} from '@onecx/portal-integration-angular'
// import { LetDirective } from '@ngrx/component'
// import { TranslateTestingModule } from 'ngx-translate-testing'
// import { HttpClientTestingModule } from '@angular/common/http/testing'
// import { NoopAnimationsModule } from '@angular/platform-browser/animations'
// import { DialogService } from 'primeng/dynamicdialog'
import { initialState } from './aiknowledge-document-search.reducers'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
// import { TranslateService } from '@ngx-translate/core'
import { selectAIKnowledgeDocumentSearchViewModel } from './aiknowledge-document-search.selectors'
// import { AIKnowledgeDocumentSearchHarness } from './aiknowledge-document-search.harness'
// import { TestbedHarnessEnvironment } from '@onecx/angular-accelerator/testing'
import { ActivatedRoute, Router } from '@angular/router'
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
// import { Actions } from '@ngrx/effects'
import { PortalDialogService } from '@onecx/portal-integration-angular'
import { PortalMessageService } from '@onecx/portal-integration-angular'
import { ExportDataService } from '@onecx/portal-integration-angular'
import { cold, hot } from 'jest-marbles'
import { Message } from 'primeng/api'

describe('AIKnowledgeDocumentSearchEffects', () => {
    // let component: AIKnowledgeDocumentSearchComponent
    // let fixture: ComponentFixture<AIKnowledgeDocumentSearchComponent>
    let store: MockStore<Store>
    // let formBuilder: FormBuilder

    // Mock Implementation
    class MockPortalDialogService {
        openDialog = jest.fn(() => ({
            afterClosed: () => of({ confirmed: true })
        }))
        openConfirmDialog = jest.fn(() => of(true))
        primaryButtonEnabled$ = { emit: jest.fn() }
        buttonClicked$ = { emit: jest.fn() }
    }

    class MockAIKnowledgeDocumentBffService {
        searchAIKnowledgeDocuments = jest.fn(() =>
            of([{ id: 'doc-1', name: 'Test Doc', documentRefId: 'doc-ref-id-01', status: AIKnowledgeDocumentStatusEnum.New }])
        )
        createAIKnowledgeDocument = jest.fn(() =>
            of({ documentId: 'new-doc', documentRefId: 'doc-ref-id-01', status: AIKnowledgeDocumentStatusEnum.Processing, success: true })
        )
        deleteAIKnowledgeDocument = jest.fn(() =>
            of({ success: true })
        )
        getAIKnowledgeDocumentById = jest.fn(() =>
            of({ id: 'doc-1', name: 'Test Doc', documentRefId: 'doc-ref-id-01', status: AIKnowledgeDocumentStatusEnum.New })
        )
        updateAIKnowledgeDocument = jest.fn(() =>
            of({ success: true })
        )
    }

    class MockPortalMessageService {
        success = jest.fn()
        error = jest.fn()
        info = jest.fn()
        warning = jest.fn()
        message$ = of({} as Message)
    }

    class MockExportDataService {
        exportToExcel = jest.fn()
        exportToCsv = jest.fn()
    }

    const mockActivatedRoute = {
        snapshot: {
            queryParams: { search: 'Test' },
            params: { id: '123' }
        },
        queryParams: of({})
    }

    const mockRouter = {
        navigate: jest.fn(),
        navigateByUrl: jest.fn()
    }
    // const mockStore = {
    //     dispatch: jest.fn(),
    //     select: jest.fn(() => of({})),
    //     pipe: jest.fn()
    // }
    // const mockMessageService = {
    //     success: jest.fn(),
    //     error: jest.fn(),
    //     message$: of({} as Message)
    // }

    // const mockExportDataService = {
    //     exportToExcel: jest.fn(),
    //     exportToCsv: jest.fn()
    // }

    const baseAIKnowledgeDocumentSearchViewModel: AIKnowledgeDocumentSearchViewModel = {
        columns: AIKnowledgeDocumentSearchColumns,
        searchCriteria: {
            id: undefined,
            name: undefined
        },
        results: [],
        displayedColumns: [],
        viewMode: 'basic',
        chartVisible: false
    }

    let effects: AIKnowledgeDocumentSearchEffects
    let actions$ = new Observable<Action>() // Initialize with empty observable
    let bffService: MockAIKnowledgeDocumentBffService
    // let messageService: MockPortalMessageService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AIKnowledgeDocumentSearchEffects,
                provideMockActions(() => actions$),
                { provide: PortalDialogService, useClass: MockPortalDialogService },
                { provide: AIKnowledgeDocumentBffService, useClass: MockAIKnowledgeDocumentBffService },
                {
                    provide: ActivatedRoute, useValue: mockActivatedRoute
                },
                { provide: Router, useValue: mockRouter },
                // {
                //     provide: Store, useValue: {
                //         dispatch: jest.fn(),
                //         select: jest.fn(() => of({})),
                //         pipe: jest.fn()
                //     }
                // },
                { provide: PortalMessageService, useClass: MockPortalMessageService },
                { provide: ExportDataService, useClass: MockExportDataService },
                provideMockStore({
                    initialState: { aIKnowledgeDocument: { search: initialState } }
                })
            ]
        })

        effects = TestBed.inject(AIKnowledgeDocumentSearchEffects)
        bffService = TestBed.inject(AIKnowledgeDocumentBffService) as unknown as MockAIKnowledgeDocumentBffService
        // messageService = TestBed.inject(PortalMessageService) as unknown as MockPortalMessageService

        store = TestBed.inject(MockStore)
        store.overrideSelector(selectAIKnowledgeDocumentSearchViewModel, baseAIKnowledgeDocumentSearchViewModel)
        store.refreshState()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    describe('searchAIKnowledgeDocuments', () => {
        it('should return search success for ai knowledge documents with results', () => {
            // const doneFn = jest.fn()
            //     store.overrideSelector(selectAIKnowledgeDocumentSearchViewModel, {
            //       ...baseAIKnowledgeDocumentSearchViewModel,
            //       results: [
            //         {
            //           id: '1',
            //           imagePath: '',
            //           column_1: 'val_1'
            //         }
            //       ],
            //       columns: [
            //         {
            //           columnType: ColumnType.STRING,
            //           nameKey: 'COLUMN_KEY',
            //           id: 'column_1'
            //         }
            //       ]
            //     })
            //     store.refreshState()

            //     store.scannedActions$.pipe(ofType(AIKnowledgeDocumentSearchActions.resetButtonClicked)).subscribe(() => {
            //       doneFn()
            //     })
            store.overrideSelector(selectAIKnowledgeDocumentSearchViewModel, {
                ...baseAIKnowledgeDocumentSearchViewModel,
                results: [
                    { id: '1', imagePath: '', column_1: 'val_1' },
                    { id: '1', imagePath: '', column_1: 'val_1' }
                ],
                columns: [
                    {
                        columnType: ColumnType.STRING,
                        nameKey: 'COLUMN_KEY',
                        id: 'column_1'
                    }
                ]
            })
            store.refreshState()

            const results: AIKnowledgeDocument[] = [
                { id: '1', name: 'Test Doc 1', documentRefId: 'doc-ref-id-01', status: AIKnowledgeDocumentStatusEnum.New },
                { id: '2', name: 'Test Doc 2', documentRefId: 'doc-ref-id-02', status: AIKnowledgeDocumentStatusEnum.Processing }
            ]

            bffService.searchAIKnowledgeDocuments.mockReturnValue(of(results))

            const action = {
                type: '[AIKnowledgeDocumentSearch] Search button clicked',
                searchCriteria: { name: 'Test' }
            }
            const completion = AIKnowledgeDocumentSearchActions.aIKnowledgeDocumentSearchResultsReceived({
                results: results,
                totalNumberOfResults: results.length
            })

            actions$ = hot('-a', { a: action })
            const expected = cold('-b', { b: completion })

            expect(effects.searchByUrl$).toBeObservable(expected)
        })
    })
})