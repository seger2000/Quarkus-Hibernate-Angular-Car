import { Component, OnInit,Input, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../car.service";
import {Subscription} from "rxjs";
import {NewCar} from "../new-car";

class CarStruct {
  id!: number;
 name!: string;
 model!: string;
 numbermoldel!: number;
 datatime!: string;
}

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})


@Injectable({
  providedIn: 'root',
})

export class CarFormComponent implements OnInit {

  public validateForm: FormGroup;

  isVisible = false;
  clickEventsubscription!:Subscription;

  carStruct!: CarStruct;

  constructor(private fb: FormBuilder, private carService:CarService) {
    this.clickEventsubscription = this.carService.getClickEvent().subscribe(() => this.isVisible = true) ;

  }
  
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: ['horizontal'],
      name: [null, [Validators.required]],
      model: [null, [Validators.required]],
      number: [null, [Validators.required]]

    });
  }


  showView(carStruct:CarStruct):void{
  
       console.log(Object.values(this.validateForm.controls));
    
    // this.validateForm.controls.get("name").setValue(carStruct.name);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      let name = this.validateForm.get("name")?.value;
      let model = this.validateForm.get("model")?.value;
      let number = this.validateForm.get("number")?.value;

      let newcar = new NewCar();
      newcar.name = name;
      newcar.model = model;
      newcar.numbermoldel = parseInt(number);
      this.carService.addCar(newcar).subscribe();
      this.isVisible = false;
      location.reload();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  get isHorizontal(): boolean {
    // @ts-ignore
    return this.validateForm.controls.formLayout?.value === 'horizontal';

  }




  handleOk(): void {
    this.submitForm()
    console.log('Button ok clicked!');

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
