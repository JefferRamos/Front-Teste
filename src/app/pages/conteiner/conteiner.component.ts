import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogComponent } from '../../components/dialog/dialog.component';

export interface Conteiner {
  nome: string;
  numCtrl: string;
  tipo: string;
  status: string;
  categoria: string;
}

const ELEMENT_DATA: Conteiner[] = [
  {nome: 'Rivaldo', numCtrl: 'AAAA1111111', tipo: '20', status: 'cheio', categoria: 'importacao'},
  {nome: 'Bebeto', numCtrl: 'BBBB2222222', tipo: '20', status: 'cheio', categoria: 'importacao'},
  {nome: 'Romário', numCtrl: 'CCCC3333333', tipo: '40', status: 'vazio', categoria: 'exportação'},
  {nome: 'Raí', numCtrl: 'DDDD4444444', tipo: '40', status: 'vazio', categoria: 'exportação'},
  {nome: 'Dunga', numCtrl: 'EEE5555555', tipo: '20', status: 'cheio', categoria: 'importacao'}
];

@Component({
  selector: 'app-conteiner',
  templateUrl: './conteiner.component.html',
  styleUrls: ['./conteiner.component.css']
})
export class ConteinerComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  formConteiner: FormGroup;
  addForm: boolean = true;
  editForm: boolean = false;
  editCntr: Conteiner;

  selectStatus = [{status: 'Cheio'}, {status: 'Vazio'}];
  displayedColumns: string[] = ['nome', 'numCtrl', 'tipo', 'status', 'categoria', 'excluir'];
  dataSource: MatTableDataSource<Conteiner>;

  get nome(): FormControl { return this.formConteiner.get('nome') as FormControl; }
  get numCtrl(): FormControl { return this.formConteiner.get('numCtrl') as FormControl; }
  get tipo(): FormControl { return this.formConteiner.get('tipo') as FormControl; }
  get status(): FormControl { return this.formConteiner.get('status') as FormControl; }
  get categoria(): FormControl { return this.formConteiner.get('categoria') as FormControl; }

  constructor(private fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.selectStatus;
    this.criaFormulario();
    this.dataSource = new MatTableDataSource<Conteiner>(ELEMENT_DATA);
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
    };
  }

  criaFormulario() {
    this.formConteiner = this.fb.group({
      nome: [null, Validators.required],
      numCtrl: [null, Validators.required],
      tipo: [null, Validators.required],
      status: [null, [Validators.required, Validators.maxLength(40)]],
      categoria: [null, Validators.required]
    });
  }

  enviaFormulario() {
    console.log('Value form:', this.formConteiner.value);
  }

  excluir(element){
    event.stopPropagation();
    console.log(element);
  }

  edit(row) {
    this.mostrarFormularioEdit();
    this.editCntr = row;
    this.nome.setValue(this.editCntr.nome);
    this.numCtrl.setValue(this.editCntr.numCtrl);
    this.tipo.setValue(this.editCntr.tipo);
    this.status.setValue(this.editCntr.status);
    this.categoria.setValue(this.editCntr.categoria);
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
