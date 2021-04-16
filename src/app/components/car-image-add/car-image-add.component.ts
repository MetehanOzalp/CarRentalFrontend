import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css'],
})
export class CarImageAddComponent implements OnInit {
  carImageAddForm: FormGroup;
  carId: number;
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = parseInt(params['carId']);
    });
    this.createCarImageAddForm();
  }

  createCarImageAddForm() {
    this.carImageAddForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      imagePath: ['', Validators.required],
    });
  }

  addImage() {
    if (this.carImageAddForm.valid) {
      const formData = new FormData();
      formData.append('CarId', this.carImageAddForm.get('carId').value);
      formData.append('Image', this.selectedFile, this.selectedFile.name);
      this.carImageService.addImage(formData).subscribe((response) => {
        this.toastrService.success(response.message);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const file = (event.target as HTMLInputElement).files[0];
    this.carImageAddForm.patchValue({
      imagePath: file,
    });
    this.carImageAddForm.get('imagePath').updateValueAndValidity();
  }
}
