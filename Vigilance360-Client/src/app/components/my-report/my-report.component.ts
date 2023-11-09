import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ThreatService } from 'src/app/service/threat.service';
import jsPDF from 'jspdf';
import { ItemService } from 'src/app/service/item.service';
import { Observable, filter, map } from 'rxjs';
import { Device } from 'src/app/model/device';
const domtoimage = require('dom-to-image');

@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.css'],
})
export class MyReportComponent implements OnInit {
  threat$;

  email;
  date;

  identify_threats = 0;
  check_threat_relevance = 0;
  relevant_threats = 0;
  threat_clearance = 0;
  highRiskPrecentage = 0;
  mediumRiskPrecentage = 0;
  clearPrecentage = 0;

  constructor(
    private threatService: ThreatService,
    private authService: AuthService,
    private itemService: ItemService
  ) {
    this.threat$ = threatService
      .getThreat(authService.currentUser.user_id)
      .valueChanges();
    this.email = authService.currentUser.email;
    this.date = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    this.getThreatCount();
  }

  setHighRiskPrecentage() {
    this.highRiskPrecentage = this.relevant_threats / this.identify_threats;
  }
  setMediumRiskPrecentage() {
    this.mediumRiskPrecentage =
      this.check_threat_relevance / this.identify_threats;
  }
  setClearPrecentage() {
    this.clearPrecentage = this.threat_clearance / this.identify_threats;
  }

  getThreatCount() {
    this.threat$.subscribe((data) => {
      this.clearThreatCount();
      data.forEach((threat) => {
        this.identify_threats++;
        if (threat.status == 1) {
          // this.identify_threats.push(threat);
        } else if (threat.status == 2) {
          this.check_threat_relevance++;
        } else if (threat.status == 3) {
          this.relevant_threats++;
        } else if (threat.status == 4) {
          this.threat_clearance++;
        }
      });
      this.setHighRiskPrecentage();
      this.setMediumRiskPrecentage();
      this.setClearPrecentage();
    });
  }

  clearThreatCount() {
    this.identify_threats = 0;
    this.check_threat_relevance = 0;
    this.relevant_threats = 0;
    this.threat_clearance = 0;
  }

  ngOnInit(): void {}

  downloadPDF() {
    const contentToConvert = document.getElementById('contentToConvert');

    if (contentToConvert) {
      const contentHeight = contentToConvert.scrollHeight;
      const windowWidth = window.innerWidth;

      domtoimage
        .toPng(contentToConvert, { height: contentHeight, width: windowWidth })
        .then((dataUrl: any) => {
          const pdf = new jsPDF('p', 'px', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const img = new Image();
          img.src = dataUrl;

          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;

            const ratio = imgWidth / imgHeight;
            const finalWidth = pdfWidth;
            const finalHeight = finalWidth / ratio;

            pdf.addImage(dataUrl, 'PNG', 0, 0, finalWidth, finalHeight);
            pdf.save('myReport.pdf');
          };
        })
        .catch((error: any) => {
          console.error('Error converting to PNG:', error);
        });
    }
  }

  downloadSinglePDF(id: string) {
    console.log(id);
    const contentToConvert = document.getElementById(id);

    if (contentToConvert) {
      const contentHeight = contentToConvert.scrollHeight;
      const windowWidth = window.innerWidth;

      domtoimage
        .toPng(contentToConvert, { height: contentHeight, width: windowWidth })
        .then((dataUrl: any) => {
          const pdf = new jsPDF('p', 'px', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const img = new Image();
          img.src = dataUrl;

          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;

            const ratio = imgWidth / imgHeight;
            const finalWidth = pdfWidth * 1.4;
            const finalHeight = finalWidth / ratio;

            pdf.addImage(dataUrl, 'PNG', -25, 20, finalWidth, finalHeight);
            pdf.save('myReport.pdf');
          };
        })
        .catch((error: any) => {
          console.error('Error converting to PNG:', error);
        });
    }
  }
}
