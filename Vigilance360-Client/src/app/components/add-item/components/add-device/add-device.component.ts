import { Component, OnDestroy, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, async, map } from 'rxjs';
import { Device } from 'src/app/model/device';
import { AuthService } from 'src/app/service/auth.service';
import { ItemService } from 'src/app/service/item.service';
import { Software } from './../../../../model/software';
import { Os } from 'src/app/model/os';
import { Hardware } from 'src/app/model/hardware';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  devices$:Observable<any>;
  buttonText:string="Add Device";
  deviceId:string | undefined
  showModal = false;
  // subscription:any;

  constructor(private itemService:ItemService,private authService:AuthService,private toastr: ToastrService) { 
    this.devices$=itemService.getAllDevice(authService.currentUser.user_id).snapshotChanges();
  }

  ngOnInit(): void {
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  close(){
    this.toggleModal();
    this.addDeviceForm.reset()
    this.buttonText="Add Device";
  }

  addDeviceForm=new FormGroup({
    brand:new FormControl("",Validators.required),
    model:new FormControl("",Validators.required),
    system_type:new FormControl("",Validators.required),
    type:new FormControl("",Validators.required),
  })

  addDevice(){
    let device:Device={
      type:this.addDeviceForm.get('type')?.value as string,
      brand:this.addDeviceForm.get('brand')?.value as string,
      system_type:this.addDeviceForm.get('system_type')?.value as string,
      model:this.addDeviceForm.get('model')?.value as string,
      u_id:this.authService.currentUser.user_id 
    }
    if(this.buttonText=="Add Device"){
      this.itemService.addDevice(device).then(res=>{
        this.toastr.success('Added!', 'Device');
        this.addDeviceForm.reset()
      }).catch(err=>{
        alert(err.meesage)
      })
    }else{
      this.itemService.updateDevice(this.deviceId as string,device).then(result=>{
        this.toastr.success('Updated!', 'Device');
        this.addDeviceForm.reset()
        this.toggleModal()
      }).catch(err=>{
        console.log(err.message)
      })
      this.buttonText="Add Device";
    }
  }

  deleteDevice(device_id:string){
    this.itemService.removeDevice(device_id).then(result=>{
      this.toastr.success('Deleted!', 'Device');
      this.itemService.removeOsByDeviceId(device_id)
      this.itemService.removeHardwareByDeviceId(device_id)
      this.itemService.removeSoftwareByDeviceId(device_id)
    }).catch(err=>{
      console.log(err.message)
    })
  }

  updateDevice(device_id:string,device:Device){
    this.toggleModal()
    this.addDeviceForm.patchValue(device);
    this.buttonText="Update Device";
    this.deviceId=device_id;
  }

  // ngOnDestroy(): void {
  //   this.subscription!.unsubscribe();
  // }
  
}
