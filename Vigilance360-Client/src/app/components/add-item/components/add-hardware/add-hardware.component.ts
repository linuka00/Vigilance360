import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/model/device';
import { ItemService } from 'src/app/service/item.service';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Hardware } from 'src/app/model/hardware';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hardware',
  templateUrl: './add-hardware.component.html',
  styleUrls: ['./add-hardware.component.css'],
})
export class AddHardwareComponent implements OnInit {
  devices$: Observable<any[]>;
  hardware$: Observable<any[]>;
  buttonText: string = 'Add Hardware';
  hardwareId: string | undefined;
  showModal = false;

  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.devices$ = itemService
      .getAllDevice(this.authService.currentUser.user_id)
      .snapshotChanges();
    this.hardware$ = itemService
      .getAllHardware(this.authService.currentUser.user_id)
      .snapshotChanges();
  }

  ngOnInit(): void {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  close() {
    this.toggleModal();
    this.addHardwareForm.reset();
    this.buttonText = 'Add Device';
  }

  addHardwareForm = new FormGroup({
    // d_id:new FormControl("",Validators.required),
    d_id: new FormControl(''),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  addHardware() {
    let hardware: Hardware = {
      name: this.addHardwareForm.get('name')?.value as string,
      brand: this.addHardwareForm.get('brand')?.value as string,
      model: this.addHardwareForm.get('model')?.value as string,
      category: this.addHardwareForm.get('category')?.value as string,
      u_id: this.authService.currentUser.user_id,
      d_id: this.addHardwareForm.get('d_id')?.value as string,
    } as Hardware;

    if (this.buttonText == 'Add Hardware') {
      this.itemService
        .addHardware(hardware)
        .then((value) => {
          this.toastr.success('Added!', 'Hardware');
          this.addHardwareForm.reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      this.itemService
        .updateHardware(this.hardwareId as string, hardware)
        .then((result) => {
          this.toastr.success('Updated!', 'Hardware');
          this.addHardwareForm.reset();
          this.toggleModal();
        })
        .catch((err) => {
          console.log(err.message);
        });
      this.buttonText = 'Add Device';
    }
  }

  deleteHardware(hardware_id: string) {
    this.itemService
      .removeHardware(hardware_id)
      .then((result) => {
        this.toastr.success('Deleted!', 'Hardware');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  updateHardware(hardware_id: string, hardware: Hardware) {
    this.toggleModal();
    this.addHardwareForm.patchValue(hardware);
    if (this.buttonText == 'Update Hardware') {
      this.buttonText = 'Add Hardware';
      this.addHardwareForm.reset();
    } else this.buttonText = 'Update Hardware';
    this.hardwareId = hardware_id;
  }
}
