import { Component, OnInit } from '@angular/core';
import { Deudor } from '../../models/deudor';
import { DeudoresService } from '../../services/deudores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {
  Titulo = 'Deudores';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)'
  };
  AccionABMC = 'L';
  DeudoresArray: Deudor[] = null;
  submitted: boolean = false;

  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' }
  ];
  FormRegistro: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private deudoresService: DeudoresService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      DeudorId: [0],
      DeudorApeNom: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
      ],
      DeudorMonto: [
        null,
        [Validators.required, Validators.pattern('^\\d{1,7}$')]
      ],
      DeudorIncobrable: [true]
    });

    this.GetDeudores();
  }

  GetDeudores() {
    this.deudoresService.get().subscribe((res: Deudor[]) => {
      this.DeudoresArray = res;
    });
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ DeudorIncobrable: true, DeudorId: 0 });
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
  }

  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }
    const itemCopy = { ...this.FormRegistro.value };

    if (this.AccionABMC == 'A') {
      //this.modalDialogService.BloquearPantalla();
      this.deudoresService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
      });
    } else {
      this.deudoresService
        .put(itemCopy.DeudorId, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
        });
    }
  }
  Volver() {
    this.AccionABMC = 'L';
  }
}
