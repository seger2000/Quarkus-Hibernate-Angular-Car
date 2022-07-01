import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarElementComponent } from './car-element/car-element.component';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import {NZ_ICONS, NzIconModule} from "ng-zorro-antd/icon";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

import * as AllIcons from "@ant-design/icons-angular/icons";
import { IconDefinition } from "@ant-design/icons-angular";

import { CarTableComponent } from './car-table/car-table.component';
import { CarFormComponent } from './car-form/car-form.component';
import {NzRadioModule} from "ng-zorro-antd/radio";


registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent,
    CarElementComponent,
    CarTableComponent,
    CarFormComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzIconModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzModalModule,
    NzButtonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },{ provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
