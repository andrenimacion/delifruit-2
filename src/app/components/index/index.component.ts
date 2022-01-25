import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndexService } from 'src/app/services/index.service';
import { indexAnimation } from '../animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [ indexAnimation ]
})
export class IndexComponent implements OnInit {

  vcap1anit = "inactive"
  vcap2anit = "inactive"
  vcap3anit = "inactive1"
  vcap4anit = "inactive1"
  loading = false

  constructor(private indexsvc:IndexService, private route: Router, private routea:ActivatedRoute) { }
  ngOnInit(){
    //Escucho la activacion del loading
      this.indexsvc.loading.subscribe((data)=>{
        this.loading = data
      })

    //Escucho el cambhio de ruta
    this.indexsvc.route.subscribe((data)=>{ 
      if(data.state){
        if(data.type){
          this.anitenterlogin()
        }else{
          this.anitenter()
        }
      }else{
        this.anitexit()
        this.loading = false
        setTimeout(() => {
          this.route.navigate([data.rute]) 
        }, 800);
      }
    })
  }

  get cap1anit(){ return this.vcap1anit}
  get cap2anit(){ return this.vcap2anit}
  get cap3anit(){ return this.vcap3anit}
  get cap4anit(){ return this.vcap4anit}

  anitenter(){
    setTimeout(() => {
      this.vcap1anit = "actived"
    }, 60);
    setTimeout(() => {
      this.vcap2anit = "actived"
    }, 200);
    setTimeout(() => {
      this.vcap3anit = "actived1"
    }, 100);
    setTimeout(() => {
      this.vcap4anit = "actived1"
    }, 220);
  }

  anitenterlogin(){
    setTimeout(() => {
      this.vcap1anit = "activedlog"
    }, 60);
    setTimeout(() => {
      this.vcap2anit = "activedlog"
    }, 200);
    setTimeout(() => {
      this.vcap3anit = "activedlog1"
    }, 100);
    setTimeout(() => {
      this.vcap4anit = "activedlog1"
    }, 220);
  }

  anitexit(){
    this.vcap1anit = "inactive"
    setTimeout(() => {
    this.vcap2anit = "inactive"
  }, 150);
  setTimeout(() => {
    this.vcap3anit = "inactive1"
  }, 50);
  setTimeout(() => {
    this.vcap4anit = "inactive1"
  }, 200);
  }
}