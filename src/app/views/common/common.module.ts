import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule} from '@angular/material/dialog';
import { FileUploadModule} from 'ng2-file-upload';
import { MatExpansionModule} from '@angular/material/expansion';
import {
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxDataGridComponent
} from 'devextreme-angular';


@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    NgSelectModule,
    DxDataGridModule,
    MatDialogModule,
    FileUploadModule,
    MatExpansionModule
  ],
  entryComponents: []
})
export class CommonformModule { }
