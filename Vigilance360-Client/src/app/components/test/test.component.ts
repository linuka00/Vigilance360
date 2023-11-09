import { Component, OnInit } from '@angular/core';
import { User } from './../../model/user';
import { UserService } from './../../service/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/service/auth.service';
import { ThreatService } from 'src/app/service/threat.service';
import { Threat } from 'src/app/model/threat';
import { ItemService } from 'src/app/service/item.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo } from '@angular/fire/auth'
import { Observable, map } from 'rxjs';
import { ServerService } from 'src/app/service/server.service';
import { Device } from './../../model/device';
import { Software } from 'src/app/model/software';
import { Hardware } from './../../model/hardware';
import { Os } from 'src/app/model/os';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  isAnalysis = this.authService.isAnalysis();
  isClickEnabled=true

  deviceCount$;
  softwareCount$;
  hardwareCount$;
  osCount$;

  constructor(
    private authService: AuthService,
    private threatService: ThreatService,
    private itemService: ItemService,
    private serverService:ServerService,
    private toastr:ToastrService
  ) {
    this.deviceCount$=this.itemService.getAllDevice(this.authService.currentUser.user_id).valueChanges().pipe(
      map((devices) => devices.length)
    );
    this.softwareCount$=this.itemService.getAllSoftware(this.authService.currentUser.user_id).valueChanges().pipe(
      map((software) => software.length)
    );
    this.hardwareCount$=this.itemService.getAllHardware(this.authService.currentUser.user_id).valueChanges().pipe(
      map((hardware) => hardware.length)
    );
    this.osCount$=this.itemService.getAllOs(this.authService.currentUser.user_id).valueChanges().pipe(
      map((os) => os.length)
    );
  }

  ngOnInit(): void {
    this.loadThreat()
  }

  identify_threats: Threat[] = [];
  check_threat_relevance: Threat[] = [];
  relevant_threats: Threat[] = [];
  threat_clearance: Threat[] = [];

  loadThreat() {
    this.threatService
      .getThreat(this.authService.currentUser.user_id)
      .valueChanges()
      .subscribe((data) => {
        this.clearArray();
        data.forEach((threat) => {
          this.identify_threats.push(threat);
          if (threat.status == 1) {
            // this.identify_threats.push(threat);
          } else if (threat.status == 2) {
            this.check_threat_relevance.push(threat);
          } else if (threat.status == 3) {
            this.relevant_threats.push(threat);
          }else if (threat.status == 4) {
            this.threat_clearance.push(threat);
          }
        });
      });
  }

  drop(event: CdkDragDrop<Threat[]>) {
    if (event.previousContainer == event.container) {
      const previousValue = this.getArray(event.previousContainer.data)[
        event.previousIndex
      ];
      this.moveItemInArray(
        this.getArray(event.previousContainer.data),
        previousValue,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const previousValue = this.getArray(event.previousContainer.data)[
        event.previousIndex
      ];
      this.transferArrayItem(
        this.getArray(event.container.data),
        this.getArray(event.previousContainer.data),
        previousValue,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getArray(arr: Threat[]) {
    if (arr == this.relevant_threats) return this.relevant_threats;
    return this.threat_clearance;
  }

  moveItemInArray(
    arr: Threat[],
    previousValue: Threat,
    previousIndex: number,
    currentIndex: number
  ) {
    arr.splice(previousIndex, 1);
    arr.splice(currentIndex, 0, previousValue);
  }

  transferArrayItem(
    addArr: Threat[],
    removeArr: Threat[],
    previousValue: Threat,
    previousIndex: number,
    currentIndex: number
  ) {
    previousValue.status = this.getStatus(addArr);
    console.log(previousValue)
    this.threatService.updateThreat(previousValue.id, previousValue);
    this.loadThreat();
  }

  clearArray() {
    this.identify_threats= [];
    this.check_threat_relevance= [];
    this.relevant_threats= [];
    this.threat_clearance = [];
  }

  getStatus(arr: Threat[]): number {
    if (this.getArray(arr) == this.identify_threats) return 1;
    if (this.getArray(arr) == this.check_threat_relevance) return 2;
    if (this.getArray(arr) == this.relevant_threats) return 3;
    if (this.getArray(arr) == this.threat_clearance) return 4;
    return -1;
  }

  delete(key: string) {
    this.threatService.deleteThreat(key);
  }

  scanNow(){
    this.isClickEnabled=false
    this.serverService.sendRequestToServer(this.authService.currentUser.user_id).subscribe(res=>{
      this.isClickEnabled=true;
      localStorage.setItem("isScan","true")
    }, err=>{
      this.toastr.error('Something went wrong', 'Scan');
      this.isClickEnabled=true;
    })
  }
}