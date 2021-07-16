import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  encrypt: boolean = true;
  selectedImg: string = null;

  constructor(private service: ServiceService) {}

  ngOnInit() {}

  toggle = () => {
    this.encrypt = !this.encrypt;
  };

  onSubmit = (files: FileList, key: string) => {
    const file = files.item(0);
    console.log("img api call")
 
    this.service.imgEncryption(file, key).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  onSubmitD = (image: any, key: string) => {
    this.service.imgEncryption(image, key).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  onChangeImg = (files: any) => {
    // const file = files.item(0);
    this.selectedImg = files;
    console.log(files);
  };

  // upload(files: FileList) {
  //   const file = files.item(0);

  //   this.filesService.upload(file).subscribe(
  //     res => /* Place your success actions here */,
  //     error => /* Place your error actions here */
  //   );
  // }
}
