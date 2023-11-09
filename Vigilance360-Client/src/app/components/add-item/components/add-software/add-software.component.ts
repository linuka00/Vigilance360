import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/service/item.service';
import { AuthService } from 'src/app/service/auth.service';
import { Software } from 'src/app/model/software';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-software',
  templateUrl: './add-software.component.html',
  styleUrls: ['./add-software.component.css'],
})
export class AddSoftwareComponent implements OnInit {
  devices$: Observable<any[]>;
  software$: Observable<any[]>;
  buttonText: string = 'Add Software';
  softwareId: string | undefined;
  showModal = false;

  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.devices$ = itemService
      .getAllDevice(this.authService.currentUser.user_id)
      .snapshotChanges();
    this.software$ = itemService
      .getAllSoftware(this.authService.currentUser.user_id)
      .snapshotChanges();
  }

  ngOnInit(): void {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  close() {
    this.toggleModal();
    this.addSoftwareForm.reset();
    this.buttonText = 'Add Device';
  }

  addSoftwareForm = new FormGroup({
    // d_id:new FormControl("",Validators.required),
    d_id: new FormControl(''),
    name: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
  });

  addSoftware() {
    let software: Software = {
      name: this.addSoftwareForm.get('name')?.value as string,
      publisher: this.addSoftwareForm.get('publisher')?.value as string,
      version: this.addSoftwareForm.get('version')?.value as string,
      u_id: this.authService.currentUser.user_id,
      d_id: this.addSoftwareForm.get('d_id')?.value as string,
    } as Software;
    if (this.buttonText == 'Add Software') {
      this.itemService
        .addSoftware(software)
        .then((value) => {
          this.toastr.success('Added!', 'Software');
          this.addSoftwareForm.reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      this.itemService
        .updateSoftware(this.softwareId as string, software)
        .then((result) => {
          this.toastr.success('Updated!', 'Software');
          this.addSoftwareForm.reset();
          this.toggleModal();
        })
        .catch((err) => {
          console.log(err.message);
        });
      this.buttonText = 'Add Device';
    }
  }

  deleteSoftware(software_id: string) {
    this.itemService
      .removeSoftware(software_id)
      .then((result) => {
        this.toastr.success('Deleted!', 'Software');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  updateSoftware(software_id: string, software: Software) {
    this.toggleModal();
    this.addSoftwareForm.patchValue(software);
    if (this.buttonText == 'Update Software') {
      this.buttonText = 'Add Software';
      this.addSoftwareForm.reset();
    } else this.buttonText = 'Update Software';
    this.softwareId = software_id;
  }
}
