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
  selectedFile: File[] = [];

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
      for (let i = 0; i < this.selectedFile.length; i++) {
        formData.append('CarId', this.carImageAddForm.get('carId').value);
        formData.append(
          'Image',
          this.selectedFile[i],
          this.selectedFile[i].name
        );
      }
      this.carImageService.addImage(formData).subscribe((response) => {
        this.toastrService.success(response.message);
      });
    }
  }

  onFileSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile[i] = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.carImageAddForm.patchValue({
        imagePath: file,
      });
      this.carImageAddForm.get('imagePath').updateValueAndValidity();
    }
  }
}
