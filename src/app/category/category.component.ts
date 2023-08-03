import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { CategoryService } from './category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CategoryComponent {
  public categoryData: any;


  constructor(
    private _categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit() {
    this.featchData()
  }
  featchData() {
    this._categoryService.getAllCategoryData().subscribe((data) => {
      this.categoryData = data
    })
  }

  updateProduct(id: number) {
    this._categoryService.getSingleCategory(id).subscribe((data) => {
      console.log(data);
    });
  }

  deleteProduct(id: number) {
    this._categoryService.deleteCategory(id).subscribe((data) => {
      console.log("delete succesfully completed");
    });
  }

  confirm(id: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteProduct(id)
        this.featchData()
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            this.confirmationService.close()
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            this.confirmationService.close()
            break;
        }
      }
    });
  }
}

