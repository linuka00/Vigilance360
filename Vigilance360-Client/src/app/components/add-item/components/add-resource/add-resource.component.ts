import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResourceService } from 'src/app/service/resource.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css'],
})
export class AddResourceComponent implements OnInit {
  showModal = false;
  buttonText: string = 'Add Url';
  urls$: Observable<any[]>;
  constructor(private resourceService: ResourceService) {
    this.urls$ = this.resourceService.getAllUrl();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  ngOnInit(): void {}

  close() {
    this.toggleModal();
    this.addResourceForm.reset();
    this.buttonText = 'Add Url';
  }

  addResourceForm = new FormGroup({
    url: new FormControl('', Validators.required),
  });

  addUrl() {
    this.resourceService
      .addUrl(this.addResourceForm.get('url')?.value?.toString()!)
      .then((value) => {})
      .catch((value) => {
        console.log(value);
      });
  }
  deleteUrl(url_id: string) {
    this.resourceService
      .deleteUrl(url_id)
      .then((value) => {})
      .catch((value) => {
        console.log(value);
      });
  }
}
