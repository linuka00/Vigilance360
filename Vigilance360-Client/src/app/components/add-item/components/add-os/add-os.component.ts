import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Os } from 'src/app/model/os';
import { AuthService } from 'src/app/service/auth.service';
import { ItemService } from 'src/app/service/item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-os',
  templateUrl: './add-os.component.html',
  styleUrls: ['./add-os.component.css'],
})
export class AddOsComponent implements OnInit {
  devices$: Observable<any[]>;
  os$: Observable<any[]>;
  buttonText: string = 'Add Os';
  osId: string | undefined;
  showModal = false;

  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.devices$ = itemService
      .getAllDevice(this.authService.currentUser.user_id)
      .snapshotChanges();
    this.os$ = itemService
      .getAllOs(this.authService.currentUser.user_id)
      .snapshotChanges();
  }

  ngOnInit(): void {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  close() {
    this.toggleModal();
    this.addOsForm.reset();
    this.buttonText = 'Add Device';
  }

  addOsForm = new FormGroup({
    // d_id:new FormControl("",Validators.required),
    d_id: new FormControl(''),
    edition: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    system_type: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
  });

  addOs() {
    let os: Os = {
      name: this.addOsForm.get('name')?.value as string,
      edition: this.addOsForm.get('edition')?.value as string,
      system_type: this.addOsForm.get('system_type')?.value as string,
      version: this.addOsForm.get('version')?.value as string,
      u_id: this.authService.currentUser.user_id,
      d_id: this.addOsForm.get('d_id')?.value as string,
    } as Os;

    if (this.buttonText == 'Add Os') {
      this.itemService
        .addOs(os)
        .then((value) => {
          this.toastr.success('Added!', 'Os');
          this.addOsForm.reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      this.itemService
        .updateOs(this.osId as string, os)
        .then((result) => {
          this.toastr.success('Updated!', 'Os');
          this.addOsForm.reset();
          this.toggleModal();
        })
        .catch((err) => {
          console.log(err.message);
        });
      this.buttonText = 'Add Device';
    }
  }

  deleteOs(os_id: string) {
    this.itemService
      .removeOs(os_id)
      .then((result) => {
        this.toastr.success('Deleted!', 'Os');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  updateOs(os_id: string, os: Os) {
    this.toggleModal();
    this.addOsForm.patchValue(os);
    if (this.buttonText == 'Update Os') {
      this.buttonText = 'Add Os';
      this.addOsForm.reset();
    } else this.buttonText = 'Update Os';
    this.osId = os_id;
  }
}
