import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ServiceService } from "src/app/service/service.service";
import * as fileSaver from "file-saver";
import { v4 as uuid } from "uuid";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  encrypt: boolean = true;
  selectedImg: string = null;
  public files: any[];
  previewImg: any;
  previewDImg: any;
  isPreviewImg: boolean = false;
  isPreviewDImg: boolean = false;

  constructor(
    private service: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  toggle = () => {
    this.encrypt = !this.encrypt;
  };

  onSubmit = (key: string) => {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append("file", file, file.name);
    }

    console.log(formData);

    this.service.imgEncryption(formData, key).subscribe(
      (res) => {
        this.previewImg = this.blobToImage(res);
        this.isPreviewImg = true;
        console.log(res);
        const name = uuid();
        fileSaver.saveAs(res, name);
        console.log(this.previewImg);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  onSubmitD = (key: string) => {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append("file", file, file.name);
    }

    this.service.imgDecryption(formData, key).subscribe(
      (res) => {
        this.previewDImg = this.blobToImage(res);
        this.isPreviewDImg = true;
        const name = uuid();
        fileSaver.saveAs(res, name);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  blobToImage = (res: any) => {
    let blob = new Blob([res], { type: "multipart/form-data" });
    let objectURL = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  };

  onChangeImg = (event: any) => {
    console.log(event);
    this.files = null;
    this.files = event.target.files;
    console.log(this.files);
  };

}
