import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../../../common/usuario';
import Swal from 'sweetalert2'
import { from } from 'rxjs';

@Component({
  selector: 'app-admin-painel',
  templateUrl: './admin-painel.component.html',
  styleUrls: ['./admin-painel.component.scss'],
})
export class AdminPainelComponent {
  listaUsers: User[] = [];
  passorwdTest: any = '';
  userLogged = this.criaUser();

  constructor(private userservice: UserService, private router: Router) {}

  criaUser(): User {
    let user: User = {
      nomeCompleto: '',
      cpf: '',
      celular: '',
      dataNasci: '',
      email: '',
      emailC: '',
      senha: '',
      senhaC: '',
      endereco: '',
      complemento: '',
      cep: '',
      estado: '',
      cidade: '',
      permissao: 0,
    };

    return user;
  }

  //Método responsável por pegar as informações do usuário da secção e realiza o request dos usuários que irão aparecer na tabela
  ngOnInit(): void {
    this.userservice.getCurrentUser().subscribe((result) => {
      this.userLogged = result[0];
    });

    this.userservice.gelAllUsers().subscribe((result) => {
      this.listaUsers = result;
    });
  }

  //Método que cria o alert de Erro
  alertError(msg: string){
    const error = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    
      error.fire({
      icon: 'error',
      title: msg
    })
  };

  //Método que cria o alert de Sucesso
  async alertAcept(msg: string){
     const sucess = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    
     sucess.fire({
      icon: 'success',
      title: msg
    })
  };

  //Método que cria o alert para receber a senha do usuário para validação das mudanças a serem realizadas
  async alertSenha(msg: string, user:User){
    const { value: formValues }  = await Swal.fire({
      title: `${msg} ${user.nomeCompleto}?\nEmail: ${user.email}\nCPF: ${user.cpf}`,
      html:
        '<label>Senha do Admin</label><input id="swal-input1" class="swal2-input" type="password" name="Senha">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const val1 = (document.getElementById(
          'swal-input1'
        ) as HTMLInputElement).value;
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
        ];
      }
    });

    this.passorwdTest = formValues;
  };

  //Método que realiza a requisição de delete usuário no servidor
  async delteUser(user: User) {
    
    await this.alertSenha('Deletar o Usuário', user);
    this.userservice.deleteUser(user, this.passorwdTest[0]).subscribe((result) => {
      if (result.Sucess) {
        this.alertAcept('Usuário Removido com sucesso');
      } else {
        this.alertError('Senha inserida está incorreta');
      }
    });  
  }

  //Método que realiza a requisição de mudança de permissão ao servidor usuário no servidor
  async changePermission(user: User) {
    await this.alertSenha('Trocar a permissão do', user)

    this.userservice
      .updateUserPermission(user, this.passorwdTest)
      .subscribe((result) => {
        if (result.Sucess) {
          this.alertAcept('Usuário Teve a permissão alterada com sucesso');
        } else {
          this.alertError('Senha inserida está incorreta');
        }
      });
  }
}
