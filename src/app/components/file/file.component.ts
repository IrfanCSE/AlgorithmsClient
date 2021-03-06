import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ServiceService } from "src/app/service/service.service";
import * as fileSaver from "file-saver";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
})
export class FileComponent implements OnInit {
  encrypt: boolean = true;
  selectedImg: string = null;
  public files: any[];
  previewImg: any;
  previewDImg: any;
  isPreviewImg: boolean = false;
  isPreviewDImg: boolean = false;
  encrypting: boolean = false;
  errorText: string = "";
  reg = new RegExp("^[0-9]*$");

  error: boolean = false;
  imgreg = new RegExp("([/|.|w|s|-])*.(?:jpg|jpeg|gif|png)");

  // imagePath: any;
  imgURL: any;

  constructor(
    private service: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  toggle = () => {
    this.encrypt = !this.encrypt;
    this.previewDImg = null;
    this.imgURL = null;
  };

  onSubmit = (key: string) => {
    if (key.length < 4) {
      this.error = true;
      this.errorText = "error:: minimum 4 and maximum 16 digit allow";
    } else if (!this.reg.test(key)) {
      this.error = true;
      this.errorText = "error:: only numeric allow";
    } else if (this.files?.length === undefined) {
      this.error = true;
      this.errorText = "error:: empty file";
    } else if (this.imgreg.test(this.files[0].name)) {
      this.error = true;
      this.errorText = "error:: image file not allow";
    } else {
      this.error = false;

      const formData = new FormData();
      let fileName: any;
      for (const file of this.files) {
        formData.append("file", file, file.name);
        fileName = file.name;
      }

      console.log(formData);

      this.encrypting = true;
      this.imgURL = null;

      this.service.imgEncryption(formData, key).subscribe(
        (res) => {
          this.previewImg = this.blobToImage(res);
          this.isPreviewImg = true;
          console.log(res);
          // const name = uuid();
          fileSaver.saveAs(res, fileName);
          console.log(this.previewImg);
          this.encrypting = false;
          this.imgURL = "../../../assets/aes_done.png";
        },
        (err) => {
          console.log(err);
          this.imgURL = "../../../assets/error.png";
          this.encrypting = false;
        }
      );
    }
  };

  onSubmitD = (key: string) => {
    if (key.length < 4) {
      this.error = true;
      this.errorText = "error:: minimum 4 and maximum 16 digit allow";
    } else if (!this.reg.test(key)) {
      this.error = true;
      this.errorText = "error:: only numeric allow";
    } else if (this.files?.length === undefined) {
      this.error = true;
      this.errorText = "error:: empty file";
    } else if (this.imgreg.test(this.files[0].name)) {
      this.error = true;
      this.errorText = "error:: image file not allow";
    } else {
      this.error = false;

      const formData = new FormData();
      let fileName: any;
      for (const file of this.files) {
        formData.append("file", file, file.name);
        fileName = file.name;
      }

      this.encrypting = true;
      this.previewDImg = null;

      this.service.imgDecryption(formData, key).subscribe(
        (res) => {
          this.previewDImg = this.blobToImage(res);
          this.isPreviewDImg = true;
          // const name = uuid();
          window.open(this.previewDImg.changingThisBreaksApplicationSecurity);
          console.log(this.previewDImg);
          fileSaver.saveAs(res, fileName);
          this.encrypting = false;
          // this.previewDImg = "../../../assets/aes_done.png";
        },
        (err) => {
          console.log(err);
          this.previewDImg = "../../../assets/error.png";
          this.encrypting = false;
        }
      );
    }
  };

  blobToImage = (res: any) => {
    let blob = new Blob([res], { type: "multipart/form-data" });
    let objectURL = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  };

  onChangeImg = (event: any) => {
    if (this.imgreg.test(event.target.files[0].name)) {
      alert("this is an image, use image section");
      this.error = true;
      this.errorText = "error:: image file not allow";
    } else {
      this.error = false;

      this.files = event.target.files;
      this.setpreviewImg();
    }
  };

  setpreviewImg = () => {
    var reader = new FileReader();
    // this.imagePath = this.files;
    reader.readAsDataURL(this.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  };
}
