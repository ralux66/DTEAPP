import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidationError } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from '../demo-file-picker.adapter';
import { DteService } from '../dte.service';
interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-process-bill',
  templateUrl: './process-bill.component.html',
  styleUrls: ['./process-bill.component.css'],
  //standalone: true,

})
export class ProcessBillComponent {
  constructor(private http: HttpClient, private dteService: DteService) { }
  public adapter = new DemoFilePickerAdapter(this.http, this.dteService);

  public ngOnInit(): void { }

  public uploadSuccess(event: any): void {
    console.log(event);
  }

  public onValidationError(error: ValidationError): void {
    alert(`Validation Error ${error.error} in ${error.file?.name}`);
  }

}
