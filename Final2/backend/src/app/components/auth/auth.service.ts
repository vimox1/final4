import { Injectable } from "@angular/core";
import{HttpClient} from "@angular/common/http";
import{AuthData} from "./auth-data.model";
import {Router} from "@angular/router";
import { Subject } from "rxjs";
import { RegisterData } from "./register-data.model";
import { environment } from "src/environments/environment";


@Injectable({providedIn:"root"})

export class AuthService{
    getToken(){
        return this.token;
    }
    getAuthStatusListner(){

        return this.authStatusListner.asObservable();
    }
    getIsAuth() {
        return this.isAuthenticated;
      }
    private isAuthenticated = false;
    private tokenTimer: NodeJS.Timer;
    private token : string;
    private authStatusListner = new Subject<boolean>();
    constructor(private http: HttpClient , private router : Router){}

    createUser(email:string,password: string,nomcomplet:string,codefiscal:string,adresse:string,genre:string,numtele:string,role:string,datenaiss:Date){
        const registerData: RegisterData = {email, password: password,nomcomplet,codefiscal,adresse,genre,numtele,role,datenaiss };
         this.http.post("http://localhost:3000/auth/register",registerData).subscribe(response=>{
            console.log(response);
        }, error =>{
            console.log(error);
        });


    }


    
    login(email:string,password:string){
        const authData: AuthData = {email, password: password};
                this.http.post<{token: string,expireIn: number}>("http://localhost:3000/auth/login",authData)
                .subscribe(response=>{
                    const token = response.token;
                    this.token=token; //we can use it in other service
                    if (token){
                        const expireInDuration = response.expireIn;
                        this.setAuthTimer(expireInDuration);
                        this.isAuthenticated=true;
                        this.authStatusListner.next(true);
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expireInDuration * 1000);
                        console.log(expirationDate);
                        this.saveAuthData(token, expirationDate);
                        this.router.navigate(['/dashboard/default']);
                    }
                });


    }
    logout(){
        
        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListner.next(false);
        this.router.navigate(['/auth/login']);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
    }

        private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
      }
    
        private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
      }
    
        private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate)
        }
      }

      autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expireIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expireIn > 0) {
          this.token = authInformation.token;
          this.isAuthenticated = true;
          this.setAuthTimer(expireIn / 1000);
          this.authStatusListner.next(true);
        }
      }

      private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }

      getUserInfo(){
        return this.http.get<any>("http://localhost:3000/settings/profile");

      }
}