import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

import { Categoria } from 'src/app/common/global-types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss'],
})
export class CategoryUpdateComponent {
  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  categoria: Categoria = {
    nome_categoria: this.categoriaService.getName(),
    descricao_categoria: '',
  };
  alertCategoria: boolean = false;
  alertMessage: string = '';

  editCategoria(categoria: Categoria) {
    this.categoriaService
      .editCategory(categoria.nome_categoria, categoria.descricao_categoria)
      .subscribe(
        (categoriaEditada) => {
          console.log(categoriaEditada);
          this.alertMessage = 'Descrição editada com sucesso';
          this.alertCategoria = true;
          this.clearCategoria();
          this.router.navigate(['home', 'categoria']);
        },
        (erro) => {
          if (erro.error.message === 'Essa categoria não existe no sistema') {
            this.alertMessage = 'Categoria inexisente';
            this.alertCategoria = true;
          }
        }
      );
  }

  sairDaCriacao() {
    this.router.navigate(['home', 'categoria']);
  }

  clearCategoria(): void {
    this.categoria.descricao_categoria = '';
  }

  clearErros(): void {
    this.alertCategoria = false;
  }
}