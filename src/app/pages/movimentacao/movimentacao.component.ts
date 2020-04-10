import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogComponent } from '../../components/dialog/dialog.component';

export interface Movimentacao {
  navio: string;
  tipoMovimentacao: string;
  dtInicio: string;
  dtFim: string;
}

const ELEMENT_DATA: Movimentacao[] = [
  {navio: 'Jurupira', tipoMovimentacao: 'embarque', dtInicio: '01/01/2020', dtFim: '02/02/2020'},
  {navio: 'Martini', tipoMovimentacao: 'descarga', dtInicio: '02/02/2020', dtFim: '03/02/2020'},
  {navio: 'Conhaque', tipoMovimentacao: 'gate In', dtInicio: '03/02/2020', dtFim: '04/02/2020'},
  {navio: 'Whisky', tipoMovimentacao: 'gate Out', dtInicio: '04/02/2020', dtFim: '04/02/2020'},
  {navio: 'Vodka', tipoMovimentacao: 'posicionamento', dtInicio: '10/03/2020', dtFim: '04/02/2020'},
  {navio: 'Vodka', tipoMovimentacao: 'pilha', dtInicio: '04/02/2020', dtFim: '12/03/2020'},
  {navio: 'Vodka', tipoMovimentacao: 'pesagem', dtInicio: '04/02/2020', dtFim: '13/03/2020'},
  {navio: 'Vodka', tipoMovimentacao: 'scanner', dtInicio: '04/02/2020', dtFim: '14/03/2020'}
];

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css']
})
export class MovimentacaoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  formMovimentacao: FormGroup;
  addForm: boolean = true;
  editForm: boolean = false;
  editMovimentacao: Movimentacao;

  displayedColumns: string[] = ['navio', 'tipoMovimentacao', 'dtInicio', 'dtFim', 'excluir'];
  dataSource: MatTableDataSource<Movimentacao>;

  get navio(): FormControl { return this.formMovimentacao.get('navio') as FormControl; }
  get tipoMovimentacao(): FormControl { return this.formMovimentacao.get('tipoMovimentacao') as FormControl; }
  get dtInicio(): FormControl { return this.formMovimentacao.get('dtInicio') as FormControl; }
  get dtFim(): FormControl { return this.formMovimentacao.get('dtFim') as FormControl; }

  constructor(private fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.criaFormulario();
    this.dataSource = new MatTableDataSource<Movimentacao>(ELEMENT_DATA);
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
    };
    this.dataSource.paginator = this.paginator;
  }

  criaFormulario() {
    this.formMovimentacao = this.fb.group({
      navio: [null, Validators.required],
      tipoMovimentacao: [null, Validators.required],
      dtInicio: [null, Validators.required],
      dtFim: [null, [Validators.required, Validators.maxLength(40)]],
    });
  }

  enviaFormulario() {
    console.log('Value form:', this.formMovimentacao.value);
  }

  excluir(element){
    event.stopPropagation();
    console.log(element);
  }

  edit(row) {
    this.mostrarFormularioEdit();
    this.editMovimentacao = row;
    this.navio.setValue(this.editMovimentacao.navio);
    this.tipoMovimentacao.setValue(this.editMovimentacao.tipoMovimentacao);
    this.dtInicio.setValue(this.editMovimentacao.dtInicio);
    this.dtFim.setValue(this.editMovimentacao.dtFim);
  }

  salvar() {
    this.mostrarFormularioAdd;
  }

  mostrarFormularioAdd() {
    this.addForm = true;
    this.editForm = false;
    this.criaFormulario();
  }

  mostrarFormularioEdit() {
    this.editForm = true;
    this.addForm = false;
  }

  retiraEspacoInicial(campoParams: any) {
    let campo: any;

    campo = campoParams.value.substring(0,1);

    if (campo == ' ') {
      campoParams.setValue('');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abreDialogExcluir(): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((resposta) => {

      if (resposta === true) {
        // this.deletaCliente(id);
        this.snackBarSucesso('Informação deletada com sucesso');
      }
    });
  }

  snackBarSucesso(mensagem: string, action?: string) {
    this.snackBar.open(mensagem, action, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  snackBarErro(mensagem: string, action?: string) {
    this.snackBar.open(mensagem, action, {
      duration: 3000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }


}
