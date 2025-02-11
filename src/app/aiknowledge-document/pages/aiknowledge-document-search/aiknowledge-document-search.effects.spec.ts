import { TestBed } from '@angular/core/testing'
// import {
//     ActivatedRoute,
//     NavigationExtras,
//     Router,
//     RouterState,
//     RouterStateSnapshot,
//     RoutesRecognized
// } from '@angular/router'
import { Action, Store } from '@ngrx/store'
import {
    MockStore,
    // createMockStore 
} from '@ngrx/store/testing'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { DialogService } from 'primeng/dynamicdialog'
import { AIKnowledgeDocumentSearchActions } from './aiknowledge-document-search.actions'
import { AIKnowledgeDocumentSearchColumns } from './aiknowledge-document-search.columns'
// import { initialState } from './aiknowledge-document-search.reducers'
import { selectAIKnowledgeDocumentSearchViewModel } from './aiknowledge-document-search.selectors'
import { AIKnowledgeDocumentSearchViewModel } from './aiknowledge-document-search.viewmodel'
import {
    Observable,
    // ReplaySubject, of, throwError
} from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import {
    hot,
    //  cold 
} from 'jest-marbles'
import 'jasmine'
import { AIKnowledgeDocumentBffService, AIKnowledgeDocumentSearchRequest, AIKnowledgeDocumentSearchResponse, AIKnowledgeDocumentStatusEnum, Configuration } from 'src/app/shared/generated'
import { AIKnowledgeDocumentSearchEffects } from './aiknowledge-document-search.effects'
// import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TranslateService } from '@ngx-translate/core'
// import { Type } from '@angular/core'
// import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store'
import {
    ExportDataService,
    // PortalDialogService, 
    PortalMessageService
} from '@onecx/portal-integration-angular'
import {
    // HttpClient, 
    HttpHeaders
} from '@angular/common/http'
import { CustomHttpParameterCodec } from 'src/app/shared/generated/encoder'

// class MockRouter implements Partial<Router> {

//     effectsActions: ReplaySubject<any>

//     constructor(effectsActions: ReplaySubject<any>) { this.effectsActions = effectsActions }

//     events = new ReplaySubject<any>(1)
//     routerState = {
//         root: {},
//         snapshot: {
//             root: {}
//         }
//     } as RouterState
//     routeFor = (component: Type<any>) => {
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         this.routerState!.root!.component! = component
//     }

//     setRouterUrl = (url: string) => {
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         this.routerState!.snapshot.url = url
//     }

//     configureNavigationUrl = (routerAction: RouterNavigatedAction, currentUrl: string, newUrl: string) => {
//         this.setRouterUrl(currentUrl)
//         routerAction.payload = {
//             event: {
//                 urlAfterRedirects: newUrl
//             }
//         } as any
//     }

//     setRouterParams = (params: any) => {
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         this.routerState!.snapshot.root.queryParams = params
//     }

//     configureQueryParams = (routerAction: RouterNavigatedAction, routerParams: any, actionParams: any) => {
//         this.setRouterParams(routerParams)
//         routerAction.payload = {
//             routerState: {
//                 root: {
//                     queryParams: actionParams
//                 }
//             }
//         } as any
//     }

//     simulateNavigation = (routerAction: RouterNavigatedAction) => {
//         ; (this.events as ReplaySubject<any>).next(new RoutesRecognized(0, '', '', {} as RouterStateSnapshot))
//         this.effectsActions.next(routerAction)
//     }

//     navigate(commands: any[], extras?: NavigationExtras | undefined): Promise<boolean> {
//         const routerNavigatedAction = {
//             type: ROUTER_NAVIGATED
//         } as RouterNavigatedAction
//         routerNavigatedAction.payload = {
//             routerState: {
//                 root: {
//                     queryParams: extras?.queryParams
//                 }
//             }
//         } as any
//         this.simulateNavigation(routerNavigatedAction)
//         return Promise.resolve(true)
//     }
// }

describe('AIKnowledgeDocumentSearchEffects', () => {
    // let activatedRouteMock: Partial<ActivatedRoute> = {}
    // let mockedRouter: MockRouter
    let store: MockStore
    // const initialState = {}

    let effects: AIKnowledgeDocumentSearchEffects
    let actions$ = new Observable<Action>()
    // let mockedRouter: Router;
    // let mockedStore: Store;
    // let mockedPortalMessageService: PortalMessageService;
    // let mockedExportDataService: ExportDataService;

    // const mockedHttpClient = {} as HttpClient;
    // const mockedBasePath = 'http://localhost';
    // const mockedConfiguration = new Configuration();

    const mockedAIKnowledgeDocumentBffService = {
        basePath: 'http://localhost',
        defaultHeaders: new HttpHeaders(),
        configuration: new Configuration(),
        encoder: new CustomHttpParameterCodec(),
        searchAIKnowledgeDocuments: jest.fn()
    } as unknown as AIKnowledgeDocumentBffService

    // const mockedPortalDialogService: Partial<PortalDialogService> = {
    //     openDialog: jest.fn()
    // }

    const mockedPortalMessageService: Partial<PortalMessageService> = {
        error: jest.fn()
    }

    const mockedExportDataService: Partial<ExportDataService> = {
        exportCsv: jest.fn()
    }

    // let effectsActions: ReplaySubject<any>

    // const initEffects = () => {
    //     return new AIKnowledgeDocumentBffService(
    //         mockedPortalDialogService as PortalDialogService,
    //         effectsActions,
    //         activatedRouteMock as ActivatedRoute,
    //         mockedAIKnowledgeDocumentBffService as AIKnowledgeDocumentBffService,
    //         mockedRouter as any,
    //         store,
    //         mockedPortalMessageService as PortalMessageService,
    //         mockedExportDataService as ExportDataService
    //     )
    // }

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
                AIKnowledgeDocumentSearchEffects,
                provideMockActions(() => actions$),
                // { provide: Router, useValue: MockRouter },
                { provide: Store, useValue: MockStore },
                { provide: PortalMessageService, useValue: mockedPortalMessageService },
                { provide: ExportDataService, useValue: mockedExportDataService },
                { provide: AIKnowledgeDocumentBffService, useValue: mockedAIKnowledgeDocumentBffService },
                DialogService
            ],
            imports: [
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                TranslateTestingModule.withTranslations('en', require('./../../../../assets/i18n/en.json')).withTranslations(
                    'de',
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    require('./../../../../assets/i18n/de.json')
                ),
            ]
        })
        effects = TestBed.inject(AIKnowledgeDocumentSearchEffects)
        // effectsActions = new ReplaySubject<any>(1)
        // activatedRouteMock = TestBed.inject(ActivatedRoute)
        // activatedRouteMock.queryParams = new ReplaySubject<any>(1)

        // mockedRouter = new MockRouter(actions$)
        // store = createMockStore({ initialState })
        const translateService = TestBed.inject(TranslateService)
        translateService.use('en')
        store = TestBed.inject(MockStore)
        store.overrideSelector(selectAIKnowledgeDocumentSearchViewModel, baseAIKnowledgeDocumentSearchViewModel)
        store.refreshState()
        // jest.resetAllMocks()
    })

    it('should dispatch search for AIKnowledge Document details received', () => {
        // Arrange
        const searchRequest: AIKnowledgeDocumentSearchRequest = {
            name: 'Test'
        }
        actions$ = hot('-a', { a: AIKnowledgeDocumentSearchActions.searchButtonClicked({ searchCriteria: { name: 'Test' } }) })

        store.refreshState()

        // Act
        mockedAIKnowledgeDocumentBffService.searchAIKnowledgeDocuments(searchRequest

            // cold('--a', { a: mockSuccessSearchResponse })
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
// describe('AIKnowledgeDocumentSearchEffects', () => {
//     let actions$ = new Observable<Action>()
//     let effects: AIKnowledgeDocumentSearchEffects
//     let store: MockStore<Store>
//     const mockedAIKnowledgeDocumentBffService = {
//         searchAIKnowledgeDocuments: jest.fn()
//     }
//     const mockActivatedRoute = {
//         snapshot: {
//             data: {}
//         }
//     }
//     const mockSuccessSearchResponse: AIKnowledgeDocumentSearchResponse = {
//         results: [{
//             modificationCount: 0,
//             id: "1",
//             name: "Test 1",
//             documentRefId: "012",
//             status: AIKnowledgeDocumentStatusEnum.Processing
//         }, {
//             modificationCount: 1,
//             id: "2",
//             name: "Test 2",
//             documentRefId: "123",
//             status: AIKnowledgeDocumentStatusEnum.New
//         }],
//         totalNumberOfResults: 2
//     }
//     const baseAIKnowledgeDocumentSearchViewModel: AIKnowledgeDocumentSearchViewModel = {
//         columns: AIKnowledgeDocumentSearchColumns,
//         searchCriteria: {
//             id: undefined,
//             name: undefined,
//             status: undefined
//         },
//         results: [],
//         displayedColumns: [],
//         viewMode: 'basic',
//         chartVisible: false
//     }

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 DialogService,
//                 provideMockActions(() => actions$),
//                 provideMockStore({ initialState: { aIKnowledgeDocument: { search: initialState } } }),
//                 { provide: AIKnowledgeDocumentBffService, useValue: mockedAIKnowledgeDocumentBffService },
//                 { provide: ActivatedRoute, useValue: mockActivatedRoute },
//                 provideRouter([]),
//                 AIKnowledgeDocumentSearchEffects
//             ],
//             imports: [
//                 TranslateTestingModule.withTranslations('en', require('./../../../../assets/i18n/en.json')).withTranslations(
//                     'de',
//                     require('./../../../../assets/i18n/de.json')
//                 ),
//                 HttpClientTestingModule
//             ]
//         })
//         store = TestBed.inject(MockStore)
//         const translateService = TestBed.inject(TranslateService)
//         translateService.use('en')
//         store.overrideSelector(selectAIKnowledgeDocumentSearchViewModel, baseAIKnowledgeDocumentSearchViewModel)
//         store.refreshState()

//         effects = TestBed.inject(AIKnowledgeDocumentSearchEffects)
//         mockedAIKnowledgeDocumentBffService.searchAIKnowledgeDocuments.mockClear()
//     })

//     it('should dispatch search for AIKnowledge Document details received', () => {
//         // Arrange
//         actions$ = hot('-a', { a: AIKnowledgeDocumentSearchActions.searchButtonClicked({ searchCriteria: { name: 'Test' } }) })

//         store.refreshState()

//         // Act
//         mockedAIKnowledgeDocumentBffService.searchAIKnowledgeDocuments.mockReturnValue(
//             cold('--a', { a: mockSuccessSearchResponse })
//         )

//         // Assert
//         const expected = hot('---b', {
//             b: AIKnowledgeDocumentSearchActions.aIKnowledgeDocumentSearchResultsReceived({
//                 results: mockSuccessSearchResponse.results,
//                 totalNumberOfResults: mockSuccessSearchResponse.totalNumberOfResults
//             })
//         })
//         console.log('expected', expected);
//         expect(effects.syncParamsToUrl$).toBe(expected);
//     })
// })