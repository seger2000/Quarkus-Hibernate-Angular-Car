import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NewCar} from "./new-car";



@Injectable({
  providedIn: 'root'
})

export class CarService {
  public baseUrl = "http://localhost:8080/car";

  private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>('Initial Value');
  data: Observable<string> = this.dataSource.asObservable();


  private subject = new Subject<any>();
  constructor(private httpClient: HttpClient) { }

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }





  public addCar(car: NewCar):Observable<NewCar>{
    return this.httpClient.post<NewCar>(`${this.baseUrl}/addcar`, car);
  }



}
