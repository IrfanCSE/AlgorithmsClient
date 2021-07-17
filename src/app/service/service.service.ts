import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

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
    const head = new HttpHeaders();
    head.set("content-type", "image/png");

    return this.http.post(
      `${this.baseUrl}/api/Algorithm/EncryptionImage?key=${key}`,
      image,
      { headers: head ,responseType: "blob"}
    );
  };

  imgDecryption = (image: any, key: string): Observable<Blob> => {
    return this.http.post(
      `${this.baseUrl}/api/Algorithm/DecryptionImage?key=${key}`,
      image,
      { responseType: "blob" }
    );
  };
}
