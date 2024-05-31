import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  FilePickerAdapter,
  UploadResponse,
  UploadStatus,
  FilePreviewModel,
} from 'ngx-awesome-uploader';
import { DteService } from './dte.service';
 
import { Router } from '@angular/router';

export class DemoFilePickerAdapter extends FilePickerAdapter {

  constructor(private http: HttpClient, private dteService: DteService, private router: Router) {
    super();
  }

  public uploadFile(
    fileItem: FilePreviewModel
  ): Observable<UploadResponse | undefined> {
    const customerguid = sessionStorage.getItem('customerguid')?.toString();
   
    const DocumentObj = new FormData();
    DocumentObj.append('file', fileItem.file, customerguid);

    return this.dteService.SetUploadFile(DocumentObj).pipe(
      //return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          const responseFromBackend = res.body;
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED,
          };
        } else if (res.type === HttpEventType.UploadProgress && res.total) {
          /** Compute and show the % done: */
          const uploadProgress = +Math.round((100 * res.loaded) / res.total);
          return {
            status: UploadStatus.IN_PROGRESS,
            progress: uploadProgress,
          };
        } else {
          //return undefined;          
          const responseFromBackend = "Ok";
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED,
          };
        };
       
      }),
      catchError((er) => {
        //console.log(er);
        return of({ status: UploadStatus.ERROR, body: er });
      })
    );
  }
  
  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    const id = 50;
    const responseFromBackend = fileItem.uploadResponse;
    console.log(fileItem);
    const removeApi =
      'https://run.mocky.io/v3/dedf88ec-7ce8-429a-829b-bd2fc55352bc';
    return this.http.post(removeApi, { id });
  }
}
