import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dataModelsRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dataModelsRoutes),
    RouterModule.forChild(dataModelsRoutes),
  ],
})
export class DataModelsModule {}
