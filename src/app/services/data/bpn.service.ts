
import { EventEmitter, Injectable } from "@angular/core";
import { Bpn } from "./data.interface";





@Injectable()
export class BpnService{
    public bpn: Bpn
    
    public setBpn(bpn: Bpn){
        
        this.bpn = bpn
      }
      
}