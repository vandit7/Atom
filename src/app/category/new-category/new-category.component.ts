import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['../../app.component.scss']
})
export class NewCategoryComponent {
  public updateDataId: any;
  categoryFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(private _categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }


  addProduct() {
    this._categoryService.saveCategoryData(this.categoryFormGroup.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/category'])
    })
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.updateDataId = params.get('id');
    });
    if (this.updateDataId >= 0 && this.updateDataId != null) {
      var data: any;
      this._categoryService.getSingleCategory(this.updateDataId).subscribe((res) => {
        data = res
        this.categoryFormGroup.controls['name'].setValue(data.name)
      })
    }
  }

  updateProduct() {
    this._categoryService.updateCategory(this.updateDataId, this.categoryFormGroup.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/category'])
    })
  }

  get name() {
    return this.categoryFormGroup.get('empno')
  }
}
