import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ProductComponent implements OnInit {
  public productData: any;
  constructor(
    private _productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit() {
    this.featchData();
  }

  featchData() {
    this._productService.getAllProductData().subscribe((data) => {
      this.productData = data
    })
  }

  updateProduct(id: number) {
    this._productService.geSingleProduct(id).subscribe((data) => {
      console.log(data);
    });
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe((data) => {
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
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.featchData()
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