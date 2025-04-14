import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { isValidDate } from '@onecx/accelerator'
import { Action, BreadcrumbService, DataTableColumn, ExportDataService } from '@onecx/portal-integration-angular'
import { PrimeIcons } from 'primeng/api'
import { map, Observable } from 'rxjs'
import { AIContextSearchActions } from './aicontext-search.actions'
import { AIContextSearchCriteria, aIContextSearchCriteriasSchema } from './aicontext-search.parameters'
import { selectAIContextSearchViewModel } from './aicontext-search.selectors'
import { AIContextSearchViewModel } from './aicontext-search.viewmodel'

@Component({
  selector: 'app-aicontext-search',
  templateUrl: './aicontext-search.component.html',
  styleUrls: ['./aicontext-search.component.scss']
})
export class AIContextSearchComponent implements OnInit {
  viewModel$: Observable<AIContextSearchViewModel> = this.store.select(selectAIContextSearchViewModel)

  headerActions$: Observable<Action[]> = this.viewModel$.pipe(
    map((vm) => {
      const actions: Action[] = [
        {
          labelKey: 'AI_CONTEXT_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          icon: PrimeIcons.DOWNLOAD,
          titleKey: 'AI_CONTEXT_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          show: 'asOverflow',
          actionCallback: () => this.exportItems()
        },
        {
          labelKey: vm.chartVisible
            ? 'AI_CONTEXT_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'AI_CONTEXT_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          icon: PrimeIcons.EYE,
          titleKey: vm.chartVisible
            ? 'AI_CONTEXT_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'AI_CONTEXT_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          show: 'asOverflow',
          actionCallback: () => this.toggleChartVisibility()
        }
      ]
      return actions
    })
  )

  diagramColumnId = 'id'
  diagramColumn$ = this.viewModel$.pipe(
    map((vm) => vm.columns.find((e) => e.id === this.diagramColumnId) as DataTableColumn)
  )

  public aIContextSearchFormGroup: FormGroup = this.formBuilder.group({
    ...(Object.fromEntries(aIContextSearchCriteriasSchema.keyof().options.map((k) => [k, null])) as Record<
      keyof AIContextSearchCriteria,
      unknown
    >)
  } satisfies Record<keyof AIContextSearchCriteria, unknown>)

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public readonly locale: string,
    private readonly exportDataService: ExportDataService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setItems([
      {
        titleKey: 'AI_CONTEXT_SEARCH.BREADCRUMB',
        labelKey: 'AI_CONTEXT_SEARCH.BREADCRUMB',
        routerLink: '/aicontext'
      }
    ])
    this.viewModel$.subscribe((vm) => this.aIContextSearchFormGroup.patchValue(vm.searchCriteria))
  }

  search(formValue: FormGroup) {
    const searchCriteria = Object.entries(formValue.getRawValue()).reduce(
      (acc: Partial<AIContextSearchCriteria>, [key, value]) => ({
        ...acc,
        [key]: isValidDate(value)
          ? new Date(
            Date.UTC(
              value.getFullYear(),
              value.getMonth(),
              value.getDate(),
              value.getHours(),
              value.getMinutes(),
              value.getSeconds()
            )
          )
          : value || undefined
      }),
      {}
    )
    this.store.dispatch(AIContextSearchActions.searchButtonClicked({ searchCriteria }))
  }

  resetSearch() {
    this.store.dispatch(AIContextSearchActions.resetButtonClicked())
  }

  exportItems() {
    this.store.dispatch(AIContextSearchActions.exportButtonClicked())
  }

  viewModeChanged(viewMode: 'basic' | 'advanced') {
    this.store.dispatch(
      AIContextSearchActions.viewModeChanged({
        viewMode: viewMode
      })
    )
  }

  onDisplayedColumnsChange(displayedColumns: DataTableColumn[]) {
    this.store.dispatch(AIContextSearchActions.displayedColumnsChanged({ displayedColumns }))
  }

  toggleChartVisibility() {
    this.store.dispatch(AIContextSearchActions.chartVisibilityToggled())
  }
}
