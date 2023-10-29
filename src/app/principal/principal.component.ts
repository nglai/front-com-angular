import { ClienteService } from './../servico/cliente.service';
import { Component } from '@angular/core';
import { Cliente } from '../model/Cliente';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  cliente = new Cliente();

  btnCadastro: boolean = true;

  tabela:boolean = true;

  clientes:Cliente[] = [];

  constructor(private servico:ClienteService){}

  selecionar():void {
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno)
  }

  selecionarClienteEspecifico(posicao:number):void {
    this.cliente = this.clientes[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }


  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {
      this.clientes.push(retorno);
      this.cliente = new Cliente(); //Limpar os campos
      alert('Cliente cadastrado com sucesso!')
    });
  }

  editar():void {
    this.servico.editar(this.cliente)
    .subscribe(retorno => {
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo = retorno.codigo
      });
      this.clientes[posicao] = retorno;
      this.cliente = new Cliente(); //Limpar formulario
      this.btnCadastro = true;
      this.tabela = true;
      alert("Cliente alterado com sucesso!")
      this.selecionar()
    })
  }

  remover():void {
    this.servico.remover(this.cliente.codigo)
    .subscribe(retorno => {
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo = this.cliente.codigo;
      });
      this.clientes.splice(posicao, 1);
      this.cliente = new Cliente(); //Limpar formulario
      this.btnCadastro = true;
      this.tabela = true;
      alert("Cliente removido com sucesso!")
      this.selecionar()
    })
  }

  cancelar():void {
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
  }

  ngOnInit(){
    this.selecionar();
  }
}
