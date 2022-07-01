import {Component, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import {CarService} from "../car.service";
import {CarFormComponent} from '../car-form/car-form.component';

class CarStruct {
   id!: number;
  name!: string;
  model!: string;
  numbermoldel!: number;
  datatime!: string;
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
   carUrl = 'http://localhost:8080/car/';
  constructor(private http: HttpClient) {}

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<CarStruct[]> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);

      });
    });
    console.log("mere"+params)
    return this.http.get<CarStruct[]>(this.carUrl+'/'+pageIndex+'/'+pageSize+'/'+sortField+'/'+sortOrder)
  }
}


@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css']
})

export class CarTableComponent implements OnInit {
  total = 1;
  listOfRandomUser!:CarStruct[]
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  nameCar!:string;



  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading = false;
      this.total = 10;
      this.listOfRandomUser = data;
      console.log(this.listOfRandomUser);
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private randomUserService: RandomUserService,private carService:CarService,
              private carFormComponent:CarFormComponent) {}

  showFormView(data:CarStruct):void{
    this.carService.sendClickEvent();
    this.carFormComponent.showView(data);
    
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    console.log(this.nameCar)
  }

  showForm():void{
    this.carService.sendClickEvent();
  }

}
