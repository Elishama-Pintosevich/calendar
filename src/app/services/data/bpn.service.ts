import { EventEmitter, Injectable } from "@angular/core";
import { Bpn } from "./data.interface";
import { LocalStorageService } from "./localStorage.service";





@Injectable()
export class BpnService{
    public bpn: Bpn
    
    constructor(private localStorage: LocalStorageService){}

    public setBpn(bpn: Bpn){
        
        this.bpn = bpn
        this.localStorage.setItem('bpn', bpn)
      }

    public getBpn(){
      return this.localStorage.getItem('bpn') ?? this.bpn
    }  
      
}