import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HardwareThreat } from 'src/app/model/hardwareThreat';
import { OsThreat } from 'src/app/model/osThreat';
import { SoftwareThreat } from 'src/app/model/softwareThreat';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-add-threat',
  templateUrl: './add-threat.component.html',
  styleUrls: ['./add-threat.component.css'],
})
export class AddThreatComponent implements OnInit {
  constructor(
    private serverService: ServerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  addSoftwareThreatForm = new FormGroup({
    name: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    affected1: new FormControl('', Validators.required),
    affected2: new FormControl(''),
    affected3: new FormControl(''),
    affected4: new FormControl(''),
    affected5: new FormControl(''),
    overview: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    impact1: new FormControl('', Validators.required),
    impact2: new FormControl(''),
    impact3: new FormControl(''),
    impact4: new FormControl(''),
    impact5: new FormControl(''),
    solution1: new FormControl('', Validators.required),
    solution2: new FormControl(''),
    solution3: new FormControl(''),
    solution4: new FormControl(''),
    solution5: new FormControl(''),
    reference1: new FormControl('', Validators.required),
    reference2: new FormControl(''),
    reference3: new FormControl(''),
    reference4: new FormControl(''),
    reference5: new FormControl(''),
    disclaimer: new FormControl('', Validators.required),
  });

  addHardwareThreatForm = new FormGroup({
    name: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    affected1: new FormControl('', Validators.required),
    affected2: new FormControl(''),
    affected3: new FormControl(''),
    affected4: new FormControl(''),
    affected5: new FormControl(''),
    overview: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    impact1: new FormControl('', Validators.required),
    impact2: new FormControl(''),
    impact3: new FormControl(''),
    impact4: new FormControl(''),
    impact5: new FormControl(''),
    solution1: new FormControl('', Validators.required),
    solution2: new FormControl(''),
    solution3: new FormControl(''),
    solution4: new FormControl(''),
    solution5: new FormControl(''),
    reference1: new FormControl('', Validators.required),
    reference2: new FormControl(''),
    reference3: new FormControl(''),
    reference4: new FormControl(''),
    reference5: new FormControl(''),
    disclaimer: new FormControl('', Validators.required),
  });

  addOsThreatForm = new FormGroup({
    name: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    affected1: new FormControl('', Validators.required),
    affected2: new FormControl(''),
    affected3: new FormControl(''),
    affected4: new FormControl(''),
    affected5: new FormControl(''),
    overview: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    impact1: new FormControl('', Validators.required),
    impact2: new FormControl(''),
    impact3: new FormControl(''),
    impact4: new FormControl(''),
    impact5: new FormControl(''),
    solution1: new FormControl('', Validators.required),
    solution2: new FormControl(''),
    solution3: new FormControl(''),
    solution4: new FormControl(''),
    solution5: new FormControl(''),
    reference1: new FormControl('', Validators.required),
    reference2: new FormControl(''),
    reference3: new FormControl(''),
    reference4: new FormControl(''),
    reference5: new FormControl(''),
    disclaimer: new FormControl('', Validators.required),
  });

  addSoftwareThreat() {
    const affected: string[] = [];
    const impact: string[] = [];
    const solution: string[] = [];
    const reference: string[] = [];

    affected.push(this.addSoftwareThreatForm.get('affected1')?.value as string);
    if ((this.addSoftwareThreatForm.get('affected2')?.value as string) != '')
      affected.push(
        this.addSoftwareThreatForm.get('affected2')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('affected3')?.value as string) != '')
      affected.push(
        this.addSoftwareThreatForm.get('affected3')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('affected4')?.value as string) != '')
      affected.push(
        this.addSoftwareThreatForm.get('affected4')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('affected5')?.value as string) != '')
      affected.push(
        this.addSoftwareThreatForm.get('affected5')?.value as string
      );

    impact.push(this.addSoftwareThreatForm.get('impact1')?.value as string);
    if ((this.addSoftwareThreatForm.get('impact2')?.value as string) != '')
      impact.push(this.addSoftwareThreatForm.get('impact2')?.value as string);
    if ((this.addSoftwareThreatForm.get('impact3')?.value as string) != '')
      impact.push(this.addSoftwareThreatForm.get('impact3')?.value as string);
    if ((this.addSoftwareThreatForm.get('impact4')?.value as string) != '')
      impact.push(this.addSoftwareThreatForm.get('impact4')?.value as string);
    if ((this.addSoftwareThreatForm.get('impact5')?.value as string) != '')
      impact.push(this.addSoftwareThreatForm.get('impact5')?.value as string);

    solution.push(this.addSoftwareThreatForm.get('solution1')?.value as string);
    if ((this.addSoftwareThreatForm.get('solution2')?.value as string) != '')
      solution.push(
        this.addSoftwareThreatForm.get('solution2')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('solution3')?.value as string) != '')
      solution.push(
        this.addSoftwareThreatForm.get('solution3')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('solution4')?.value as string) != '')
      solution.push(
        this.addSoftwareThreatForm.get('solution4')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('solution5')?.value as string) != '')
      solution.push(
        this.addSoftwareThreatForm.get('solution5')?.value as string
      );

    reference.push(
      this.addSoftwareThreatForm.get('reference1')?.value as string
    );
    if ((this.addSoftwareThreatForm.get('reference2')?.value as string) != '')
      reference.push(
        this.addSoftwareThreatForm.get('reference2')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('reference3')?.value as string) != '')
      reference.push(
        this.addSoftwareThreatForm.get('reference3')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('reference4')?.value as string) != '')
      reference.push(
        this.addSoftwareThreatForm.get('reference4')?.value as string
      );
    if ((this.addSoftwareThreatForm.get('reference5')?.value as string) != '')
      reference.push(
        this.addSoftwareThreatForm.get('reference5')?.value as string
      );

    const softwareThreat: SoftwareThreat = {
      name: this.addSoftwareThreatForm.get('name')?.value as string,
      version: this.addSoftwareThreatForm.get('version')?.value as string,
      affected: affected,
      overview: this.addSoftwareThreatForm.get('overview')?.value as string,
      description: this.addSoftwareThreatForm.get('description')
        ?.value as string,
      impact: impact,
      solution: solution,
      reference: reference,
      publisher: this.addSoftwareThreatForm.get('publisher')?.value as string,
      disclaimer: this.addSoftwareThreatForm.get('disclaimer')?.value as string,
    };

    console.log(softwareThreat);
    this.serverService.addSoftwareThreat(softwareThreat).subscribe((res) => {
      console.log(res);
      this.toastrService.success('Added!', 'Software');
    });
    this.clearSoftwareInfo();
  }

  addHardwareThreat() {
    const affected: string[] = [];
    const impact: string[] = [];
    const solution: string[] = [];
    const reference: string[] = [];

    affected.push(this.addHardwareThreatForm.get('affected1')?.value as string);
    if ((this.addHardwareThreatForm.get('affected2')?.value as string) != '')
      affected.push(
        this.addHardwareThreatForm.get('affected2')?.value as string
      );
    if ((this.addHardwareThreatForm.get('affected3')?.value as string) != '')
      affected.push(
        this.addHardwareThreatForm.get('affected3')?.value as string
      );
    if ((this.addHardwareThreatForm.get('affected4')?.value as string) != '')
      affected.push(
        this.addHardwareThreatForm.get('affected4')?.value as string
      );
    if ((this.addHardwareThreatForm.get('affected5')?.value as string) != '')
      affected.push(
        this.addHardwareThreatForm.get('affected5')?.value as string
      );

    impact.push(this.addHardwareThreatForm.get('impact1')?.value as string);
    if ((this.addHardwareThreatForm.get('impact2')?.value as string) != '')
      impact.push(this.addHardwareThreatForm.get('impact2')?.value as string);
    if ((this.addHardwareThreatForm.get('impact3')?.value as string) != '')
      impact.push(this.addHardwareThreatForm.get('impact3')?.value as string);
    if ((this.addHardwareThreatForm.get('impact4')?.value as string) != '')
      impact.push(this.addHardwareThreatForm.get('impact4')?.value as string);
    if ((this.addHardwareThreatForm.get('impact5')?.value as string) != '')
      impact.push(this.addHardwareThreatForm.get('impact5')?.value as string);

    solution.push(this.addHardwareThreatForm.get('solution1')?.value as string);
    if ((this.addHardwareThreatForm.get('solution2')?.value as string) != '')
      solution.push(
        this.addHardwareThreatForm.get('solution2')?.value as string
      );
    if ((this.addHardwareThreatForm.get('solution3')?.value as string) != '')
      solution.push(
        this.addHardwareThreatForm.get('solution3')?.value as string
      );
    if ((this.addHardwareThreatForm.get('solution4')?.value as string) != '')
      solution.push(
        this.addHardwareThreatForm.get('solution4')?.value as string
      );
    if ((this.addHardwareThreatForm.get('solution5')?.value as string) != '')
      solution.push(
        this.addHardwareThreatForm.get('solution5')?.value as string
      );

    reference.push(
      this.addHardwareThreatForm.get('reference1')?.value as string
    );
    if ((this.addHardwareThreatForm.get('reference2')?.value as string) != '')
      reference.push(
        this.addHardwareThreatForm.get('reference2')?.value as string
      );
    if ((this.addHardwareThreatForm.get('reference3')?.value as string) != '')
      reference.push(
        this.addHardwareThreatForm.get('reference3')?.value as string
      );
    if ((this.addHardwareThreatForm.get('reference4')?.value as string) != '')
      reference.push(
        this.addHardwareThreatForm.get('reference4')?.value as string
      );
    if ((this.addHardwareThreatForm.get('reference5')?.value as string) != '')
      reference.push(
        this.addHardwareThreatForm.get('reference5')?.value as string
      );

    const hardwareThreat: HardwareThreat = {
      name: this.addHardwareThreatForm.get('name')?.value as string,
      version: this.addHardwareThreatForm.get('version')?.value as string,
      affected: affected,
      overview: this.addHardwareThreatForm.get('overview')?.value as string,
      description: this.addHardwareThreatForm.get('description')
        ?.value as string,
      impact: impact,
      solution: solution,
      reference: reference,
      model: this.addHardwareThreatForm.get('model')?.value as string,
      disclaimer: this.addHardwareThreatForm.get('disclaimer')?.value as string,
    };

    console.log(hardwareThreat);
    this.serverService.addHardwareThreat(hardwareThreat).subscribe((res) => {
      console.log(res);
      this.toastrService.success('Added!', 'Hardware');
    });
    this.clearHardwareInfo();
  }

  addOsThreat() {
    const affected: string[] = [];
    const impact: string[] = [];
    const solution: string[] = [];
    const reference: string[] = [];

    affected.push(this.addOsThreatForm.get('affected1')?.value as string);
    if ((this.addOsThreatForm.get('affected2')?.value as string) != '')
      affected.push(this.addOsThreatForm.get('affected2')?.value as string);
    if ((this.addOsThreatForm.get('affected3')?.value as string) != '')
      affected.push(this.addOsThreatForm.get('affected3')?.value as string);
    if ((this.addOsThreatForm.get('affected4')?.value as string) != '')
      affected.push(this.addOsThreatForm.get('affected4')?.value as string);
    if ((this.addOsThreatForm.get('affected5')?.value as string) != '')
      affected.push(this.addOsThreatForm.get('affected5')?.value as string);

    impact.push(this.addOsThreatForm.get('impact1')?.value as string);
    if ((this.addOsThreatForm.get('impact2')?.value as string) != '')
      impact.push(this.addOsThreatForm.get('impact2')?.value as string);
    if ((this.addOsThreatForm.get('impact3')?.value as string) != '')
      impact.push(this.addOsThreatForm.get('impact3')?.value as string);
    if ((this.addOsThreatForm.get('impact4')?.value as string) != '')
      impact.push(this.addOsThreatForm.get('impact4')?.value as string);
    if ((this.addOsThreatForm.get('impact5')?.value as string) != '')
      impact.push(this.addOsThreatForm.get('impact5')?.value as string);

    solution.push(this.addOsThreatForm.get('solution1')?.value as string);
    if ((this.addOsThreatForm.get('solution2')?.value as string) != '')
      solution.push(this.addOsThreatForm.get('solution2')?.value as string);
    if ((this.addOsThreatForm.get('solution3')?.value as string) != '')
      solution.push(this.addOsThreatForm.get('solution3')?.value as string);
    if ((this.addOsThreatForm.get('solution4')?.value as string) != '')
      solution.push(this.addOsThreatForm.get('solution4')?.value as string);
    if ((this.addOsThreatForm.get('solution5')?.value as string) != '')
      solution.push(this.addOsThreatForm.get('solution5')?.value as string);

    reference.push(this.addOsThreatForm.get('reference1')?.value as string);
    if ((this.addOsThreatForm.get('reference2')?.value as string) != '')
      reference.push(this.addOsThreatForm.get('reference2')?.value as string);
    if ((this.addOsThreatForm.get('reference3')?.value as string) != '')
      reference.push(this.addOsThreatForm.get('reference3')?.value as string);
    if ((this.addOsThreatForm.get('reference4')?.value as string) != '')
      reference.push(this.addOsThreatForm.get('reference4')?.value as string);
    if ((this.addOsThreatForm.get('reference5')?.value as string) != '')
      reference.push(this.addOsThreatForm.get('reference5')?.value as string);

    const osThreat: OsThreat = {
      name: this.addOsThreatForm.get('name')?.value as string,
      version: this.addOsThreatForm.get('version')?.value as string,
      affected: affected,
      overview: this.addOsThreatForm.get('overview')?.value as string,
      description: this.addOsThreatForm.get('description')?.value as string,
      impact: impact,
      solution: solution,
      reference: reference,
      disclaimer: this.addOsThreatForm.get('disclaimer')?.value as string,
    };

    console.log(osThreat);
    this.serverService.addOsThreat(osThreat).subscribe((res) => {
      console.log(res);
      this.toastrService.success('Added!', 'OS');
    });
    this.clearOsInfo();
  }

  clearOsInfo() {
    this.addOsThreatForm.reset();
  }

  clearSoftwareInfo() {
    this.addSoftwareThreatForm.reset();
  }

  clearHardwareInfo() {
    this.addHardwareThreatForm.reset();
  }
}
