import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';

import { IndexModule } from './inventory/index.module';
import { IndexComponent } from './inventory/index.component';
import { PartialsModule } from './inventory/partials/partials.module';
import { AuthModule } from "./inventory/auth/auth.module";
import { SignInComponent } from './inventory/auth/signin.component';
import { SignUpComponent } from './inventory/auth/signup.component';
import { AddEditComponent } from './inventory/inventory/add_edit.component';
import { AuthGuard } from "./inventory/auth/auth.guard";
import { ContactComponent } from './inventory/contact/contact.component';
import { ListComponent } from './inventory/inventory/list.component';
import { FaqComponent } from './inventory/faq/faq.component';
import { InventoryModule } from './inventory/inventory/inventory.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FaqComponent,
  ],
  imports: [
    BrowserModule,
    IndexModule,
    PartialsModule,
    InventoryModule,
    AuthModule,
    RouterModule.forRoot([
      { path: "", component: IndexComponent },
      { path: "ticket/list", component: ListComponent },
      { path: "ticket/:mode", component: AddEditComponent, canActivate: [AuthGuard]},
      { path: "ticket/:mode/:id", component: AddEditComponent, canActivate: [AuthGuard] },
      { path: "users/signin", component: SignInComponent },
      { path: "users/signup", component: SignUpComponent },
      { path: "contact", component: ContactComponent},
      { path: "faq", component: FaqComponent},
      { path: "**", redirectTo: "" }
    ])
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
