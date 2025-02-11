
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { LetDirective } from '@ngrx/component'
import { BreadcrumbService, PortalCoreModule } from '@onecx/portal-integration-angular'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { AIKnowledgeDocumentCreateUpdateComponent } from './aiknowledge-document-create-update.component'
import { AIKnowledgeDocument, AIKnowledgeDocumentStatusEnum } from 'src/app/shared/generated'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe('AIKnowledgeDocumentCreateUpdateComponent', () => {
  let component: AIKnowledgeDocumentCreateUpdateComponent
  let fixture: ComponentFixture<AIKnowledgeDocumentCreateUpdateComponent>

  const mockActivatedRoute = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AIKnowledgeDocumentCreateUpdateComponent],
      imports: [
        PortalCoreModule,
        FormsModule,
        ReactiveFormsModule,
        LetDirective,
        TranslateTestingModule.withTranslations(
          'en',
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          require('./../../../../../../assets/i18n/en.json')
          // eslint-disable-next-line @typescript-eslint/no-require-imports
        ).withTranslations('de', require('./../../../../../../assets/i18n/de.json')),
        HttpClientTestingModule
      ],
      providers: [BreadcrumbService, { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    }).compileComponents()

    fixture = TestBed.createComponent(AIKnowledgeDocumentCreateUpdateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render form field in for dialog box', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('#name')).toBeTruthy()
    expect(compiled.querySelector('#documentRefId')).toBeTruthy()
  })

  it('should reset dialoag form values when ocx button is clicked', () => {

    const initialValueDialogResult: AIKnowledgeDocument = {
      id: '1',
      name: '',
      documentRefId: '',
      status: undefined
    }
    component.dialogResult = { ...initialValueDialogResult }

    expect(component.dialogResult.name).toBe('')
    expect(component.dialogResult.documentRefId).toBe('')
    expect(component.dialogResult.status).toBe(undefined)

    component.vm.itemToEdit = {
      id: '1',
      name: 'Test Document',
      documentRefId: '1234567890',
      status: AIKnowledgeDocumentStatusEnum.New
    }
    component.ocxDialogButtonClicked()
    expect(component.dialogResult.name).toBeNull()
    expect(component.dialogResult.documentRefId).toBeNull()
  })

  it('should update form value state when edit button is clicked', () => {
    const initialValueDialogResult: AIKnowledgeDocument = {
      id: '',
      name: '',
      documentRefId: ''
    }
    const expectedResult = {
      id: '1',
      name: 'Test Document',
      documentRefId: '1234567890',
      status: 'NEW'
    }

    component.vm.itemToEdit = {
      ...initialValueDialogResult,
      id: '1',
      name: 'Test Document',
      documentRefId: '1234567890',
      status: AIKnowledgeDocumentStatusEnum.New
    }

    component.primaryButtonEnabled.emit()
    expect(component.vm.itemToEdit).toMatchObject(expectedResult)
  })
})