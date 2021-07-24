import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ServiceService } from "src/app/service/service.service";
import * as fileSaver from "file-saver";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  encrypt: boolean = true;
  selectedImg: string = null;
  public files: any[];
  previewImg: any;
  previewDImg: any;
  isPreviewImg: boolean = false;
  isPreviewDImg: boolean = false;
  encrypting: boolean = false;

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
    const formData = new FormData();
    for (const file of this.files) {
      formData.append("file", file, file.name);
    }

    console.log(formData);

    this.encrypting = true;
    this.imgURL = null;

    this.service.imgEncryption(formData, key).subscribe(
      (res) => {
        this.previewImg = this.blobToImage(res);
        this.isPreviewImg = true;
        console.log(res);
        const name = uuid();
        fileSaver.saveAs(res, name);
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
  };

  onSubmitD = (key: string) => {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append("file", file, file.name);
    }

    this.encrypting = true;
    this.previewDImg = null;

    this.service.imgDecryption(formData, key).subscribe(
      (res) => {
        this.previewDImg = this.blobToImage(res);
        this.isPreviewDImg = true;
        const name = uuid();
        window.open(this.previewDImg.changingThisBreaksApplicationSecurity);
        console.log(this.previewDImg);
        fileSaver.saveAs(res, name);
        this.encrypting = false;
        // this.previewDImg = "../../../assets/aes_done.png";
      },
      (err) => {
        console.log(err);
        this.previewDImg = "../../../assets/error.png";
        this.encrypting = false;
      }
    );
  };

  blobToImage = (res: any) => {
    let blob = new Blob([res], { type: "image/jpeg" });
    let objectURL = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  };

  onChangeImg = (event: any) => {
    console.log(event);
    this.files = event.target.files;

    this.setpreviewImg();
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
