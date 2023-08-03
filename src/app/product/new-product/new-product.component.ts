import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class NewProductComponent {
  public updateDataId: any;

  productFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
  })



  constructor(private _productService: ProductService, private route: ActivatedRoute, private router: Router) { }


  addProduct() {
    this._productService.saveProductData(this.productFormGroup.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/product'])
    })
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.updateDataId = params.get('id');
    });
    if (this.updateDataId >= 0 && this.updateDataId != null) {
      var data: any;
      this._productService.geSingleProduct(this.updateDataId).subscribe((res) => {
        data = res
        this.productFormGroup.controls['name'].setValue(data.name)
        this.productFormGroup.controls['price'].setValue(data.price)
      })
    }
  }

  updateProduct() {
    this._productService.updateProduct(this.updateDataId, this.productFormGroup.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/product'])
    })
  }

  get name() {
    return this.productFormGroup.get('name')
  }
  get price() {
    return this.productFormGroup.get('price')
  }
}
