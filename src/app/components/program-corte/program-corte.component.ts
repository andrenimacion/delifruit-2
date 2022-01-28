import { COMPILER_OPTIONS, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { VirtualAction } from 'rxjs';
import { IndexedDBService } from 'src/app/Database/indexed-db.service';
import { Dp08acalService } from 'src/app/services/dp08acal.service';
import { Prcor01Service } from 'src/app/services/prcor01.service';
import { ReportsService } from 'src/app/services/reports.service';


@Component({
  selector: 'app-program-corte',
  templateUrl: './program-corte.component.html',
  styleUrls: ['./program-corte.component.css']
})
export class ProgramCorteComponent implements OnInit {

  public haciendasArr: any = [];
  public bg_hac: string = '#FFDBB8';
  public _sema: string = '';
  public dia: string = '';
  public hacienda: string = '';
  constructor( private masterService: ReportsService, private indexedDB: IndexedDBService, private pr01: Prcor01Service, private Dp08acal: Dp08acalService ) { }
  
  public xdias: string[] = [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo' ];
  //`${new Date().getFullYear}`
  ngOnInit(): void {
    const x: any = localStorage.getItem('sema-push');
    const y: any = localStorage.getItem('Dia-box');
    const z: any = localStorage.getItem('Hacienda-box');
    this._sema = x;
    this.dia = y;
    this.hacienda = z;
    this.getHaciendas( 'HCIE_GR', 'sgrupo', 'asc' );
    this.getSemanas( 'asc', '2022', 'sema' );
    this.getTextarea();

    this.putSema('04', 'btnradio1-04')

  }

  //#region fx:[ALPTABLA]
  /* Obtengo las haciendas */
  /*------------------------------------------------------------------------------------------- */
  subscrib: any;
  getHaciendas( data: string, properties: string, order: string ) {

    this.subscrib = this.masterService.getMaster3( data, properties, order ).subscribe(
    {
      
      next:(x:any)=> {
        this.haciendasArr = x;
      },
      
      error:(err)=> {
        console.error(err);
        console.warn('Hemos tenido un problema al cargar las haciendas');
      },
      
      complete:()=> {
        console.log(this.haciendasArr);
      }
      
    }    
    )
  }

  getCellBox(id: any) {
    
    console.log(id);
    const sparateString = id.split(':');
    console.log(sparateString);
    this.dia = sparateString[1];
    localStorage.setItem('Dia-box', this.dia);
    this.hacienda = sparateString[2];
    localStorage.setItem('Hacienda-box', this.hacienda);
  }
  /*------------------------------------------------------------------------------------------- */
  //#endregion 

  //#region fx:[Prcor01]
  public arrBox: any = [];
  saveTextArea(id: any) {

    const xx = <HTMLInputElement> document.getElementById(`${id}`);  
    const xusercod = sessionStorage.getItem('Code_user');

    this.arrBox = {
      hacienda:    this.hacienda,
      semana:      this._sema,
      dia:         this.dia,
      descripcion: xx.value,
      cod_user:    xusercod,
      date_mod:    new Date(),
      idbox:       id    
    }

    this.pr01.savePr01( this.arrBox ).subscribe( {
      next: () => {
        console.log('Actividad guardada con éxito')
        this.getTextarea();
      },
      error:    () => { },
      complete: () => { }
    })

  }

  public arrBoxGet: any = [];
  getTextarea() {
    this.pr01.getPr01().subscribe(
    {
      next: (gbox) => { 
        this.arrBoxGet = gbox;
      },
      error:    () => {},
      complete: () => { 
        for( let i = 0; i <= this.arrBoxGet.length; i++ ) {
          let sem_con: any = this.arrBoxGet[i].semana
          let haci_con: any = this.arrBoxGet[i].hacienda
          let dia_con: any = this.arrBoxGet[i].dia
          let idbox_con: any = this.arrBoxGet[i].idbox
          console.log(idbox_con);
        }

        // console.log(this.arrBoxGet);
      
      }
    })
  }
  
  //#endregion

  //#region fx: [SEMANA]
  public arrSemanas: any = [];
  getSemanas(order: string, anio: string, properties: string) {
    this.Dp08acal.getSemanas(order, anio, properties).subscribe({
      next: (semanas) => {
        this.arrSemanas = semanas;
      },
      error: () => {

      },
      complete: () => {
        console.log(this.arrSemanas);
      }

    })
  }
  //#endregion

  putSema(semana: string, id: any) {
    console.log(semana);
    this._sema = semana;
    localStorage.setItem('sema-push', this._sema);

    var div = <HTMLDivElement> document.getElementById(`${id}`);
    console.log(div.clientWidth);
    div.scrollLeft = (Number(semana)-1) * div.clientWidth;
    
  }
  detectCalendar(id: any) {
    
  }



  ngOnDestroy(): void {
    this.subscrib.unsubscribe();
    //this.getTextarea.unsubscribe();
  }

}
