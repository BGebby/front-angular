import { Injectable } from '@angular/core';//inyectar el servicio
import { HttpClient, HttpHeaders } from '@angular/common/http';///peticiones ajax al bakend
import { Observable } from 'rxjs'; //recibir los resultados del bakend
import { User } from '../models/user'; 
import { global } from './global';

@Injectable() 
export class UserService{
	//propiedades
	public url: string;
	public identity;
	public token;
	
	constructor(private _http: HttpClient){
		this.url = global.url;
	}

	prueba(){
		return "Hola mundo desde el servicio de angular";
	}

	register(user): Observable<any>{
		// Convertir el objeto del usuario a un json string
		let params = JSON.stringify(user);

		// Definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		// Hacer peticion ajax
		return this._http.post(this.url+'register', params, {headers: headers});
	}

	signup(user, gettoken = null):Observable<any>{

		// Comprobar si llega el gettoken
		if(gettoken != null){
			user.gettoken = gettoken;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'login', params, {headers: headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != null && identity != undefined && identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token'); //no se convierte a json porque es un string ya

		if(token && token != null && token != undefined && token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	update(user):Observable<any>{
		let params = JSON.stringify(user);

		let headers = new HttpHeaders().set('Content-Type', 'application/json')
									   .set('Authorization', this.getToken());

	   return this._http.put(this.url+'user/update', params, {headers:headers});
	}

	getUsers():Observable<any>{
		return this._http.get(this.url+'users');
	}

	getUser(userId):Observable<any>{
		return this._http.get(this.url+'user/'+userId);
	}

}