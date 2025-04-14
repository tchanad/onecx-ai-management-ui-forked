import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { LetDirective } from '@ngrx/component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import { addInitializeModuleGuard, PortalCoreModule } from '@onecx/portal-integration-angular'
import { CalendarModule } from 'primeng/calendar'
import { SharedModule } from '../shared/shared.module'
import { AIContextFeature } from './aicontext.reducers'
import { routes } from './aicontext.routes'
import { AIContextSearchComponent } from './pages/aicontext-search/aicontext-search.component'
import { AIContextSearchEffects } from './pages/aicontext-search/aicontext-search.effects'

@NgModule({
  declarations: [AIContextSearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    LetDirective,
    PortalCoreModule.forMicroFrontend(),
    RouterModule.forChild(addInitializeModuleGuard(routes)),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    StoreModule.forFeature(AIContextFeature),
    EffectsModule.forFeature([AIContextSearchEffects]),
    TranslateModule
  ]
})
export class AIContextModule { }
