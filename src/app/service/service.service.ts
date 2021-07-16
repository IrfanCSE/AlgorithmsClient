import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  baseUrl: string = environment.url;
  constructor(private http: HttpClient) {}

  msgEncryption = (message: string, key: string) => {
    return this.http.get(
      `${this.baseUrl}/api/Algorithm/EncryptionMessage?message=${message}&key=${key}`
    );
  };

  msgDecryption = (message: string, key: string) => {
    return this.http.get(
      `${this.baseUrl}/api/Algorithm/DecryptionMessage?message=${message}&key=${key}`
    );
  };

  imgEncryption = (image: any, key: string) => {
    return this.http.post(
      `${this.baseUrl}/api/Algorithm/EncryptionImage?key=${key}`,
      image
    );
  };

  imgDecryption = (image: any, key: string) => {
    return this.http.post(
      `${this.baseUrl}/api/Algorithm/DecryptionImage?key=${key}`,
      image
    );
  };
}
