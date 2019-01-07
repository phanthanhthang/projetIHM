import { Adresse } from './dataInterfaces/adresse';
import { InfirmierInterface } from './dataInterfaces/infirmier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabinetInterface } from './dataInterfaces/cabinet';
import { PatientInterface } from './dataInterfaces/patient';
import { sexeEnum } from './dataInterfaces/sexe';


@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {
  private _cabinet:CabinetInterface;

  private _http: HttpClient;

  public get http():HttpClient {return this._http}
  constructor(http: HttpClient) {
    this._http = http;
  }
  
  async getData( url: string ): Promise<CabinetInterface>
  {
    //get HTTP response as text
    const response = await this.http.get(url, { responseType: 'text' }).toPromise();

    //parse the response with DOMParser
    let parser = new DOMParser();
    let doc = parser.parseFromString(response, "application/xml");

    //if no doc, exit
    if(!doc) return null;

    //default cabinet
    const cabinet: CabinetInterface = {
      infirmiers: [],
      patientsNonAffectés: [],
      adresse: this.getAdressFrom( doc.querySelector( "cabinet" ) )
    };
    
    
  }
  
  private getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville       : (node = root.querySelector("adresse > ville")     ) ? node.textContent                    : "",
      codePostal  : (node = root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue         : (node = root.querySelector("adresse > rue")       ) ? node.textContent                    : "",
      numéro      : (node = root.querySelector("adresse > numéro")    ) ? node.textContent                    : "",
      étage       : (node = root.querySelector("adresse > étage")     ) ? node.textContent                    : "",
    };
  }
  
}
