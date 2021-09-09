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
  error: boolean = false;
  errorText: string = "";
  reg = new RegExp("^[0-9]*$");

  constructor(private service: ServiceService) {}

  ngOnInit() {}

  toggle = () => {
    this.encrypt = !this.encrypt;
  };

  onSubmit = (message: string, key: string) => {
    if (key.length < 4) {
      this.error = true;
      this.errorText = "error:: minimum 4 and maximum 16 digit allow";
    } else if (!this.reg.test(key)) {
      this.error = true;
      this.errorText = "error:: only numeric allow";
    } else if (message.length == 0) {
      this.error = true;
      this.errorText = "error:: empty message";
    } else {
      this.error = false;
      this.service.msgEncryption(message, key).subscribe(
        (res: any) => {
          console.log(res);
          this.encryptText = res?.value;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  onSubmitD = (message: string, key: string) => {
    if (key.length < 4) {
      this.error = true;
      this.errorText = "error:: minimum 4 and maximum 16 digit allow";
    } else if (!this.reg.test(key)) {
      this.error = true;
      this.errorText = "error:: only numeric allow";
    } else if (message.length == 0) {
      this.error = true;
      this.errorText = "error:: empty message";
    } else {
      this.error = false;

      this.service.msgDecryption(message, key).subscribe(
        (res: any) => {
          console.log(res);
          this.decryptText = res?.value;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
}
