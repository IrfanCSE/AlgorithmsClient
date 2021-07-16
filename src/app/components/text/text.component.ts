import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/service/service.service";

@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"],
})
export class TextComponent implements OnInit {
  encrypt: boolean = true;
  encryptText: string = "";
  decryptText: string = "";
  constructor(private service: ServiceService) {}

  ngOnInit() {}

  toggle = () => {
    this.encrypt = !this.encrypt;
  };

  onSubmit = (message: string, key: string) => {
    this.service.msgEncryption(message, key).subscribe(
      (res: any) => {
        console.log(res);
        this.encryptText = res?.value;
      },
      (err) => {
        console.log(err);
      }
    );
  };

  onSubmitD = (message: string, key: string) => {
    this.service.msgDecryption(message, key).subscribe(
      (res: any) => {
        console.log(res);
        this.decryptText = res?.value;
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
