import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { DatabaseService } from '../Services/database.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  LogIn_Form: FormGroup;
  username;
  password;
  databaseObj: SQLiteObject;
  admin_data;
  constructor(public formBuilder: FormBuilder,
    public alertController: AlertController,
    public logInServiceObject: DatabaseService,
    public route: Router,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private sqlite: SQLite,
    private storage: Storage) {}

  ngOnInit() {
    this.LogIn_Form = this.formBuilder.group({
      username: ["", [Validators.required,Validators.pattern("[a-zA-Z0-9.]+@[a-zA-Z0-9-.]+\\.[a-zA-Z]+$")]],
      password: ["", Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(16)])]
    });
  }

  logIn() {
    
    this.logInServiceObject.getAdminData().then((data) => {
      this.admin_data = data;
      for(var a = 0; a < this.admin_data.length; a++){

        if(this.username != this.admin_data[a].Username) {
          this.errorMessage("Username is wrong. The user might not exist. Try again!");
        }else{
          if(this.password != this.admin_data[a].Password){
            this.errorMessage("Your password is wrong.Try again!");
          }else{
            this.route.navigateByUrl('/home');
            this.LogIn_Form.reset();
          }
        }
      }
    });
  }
  
  async errorMessage(error_message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      // subHeader: 'Subtitle',
      message: error_message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
      spinner: 'lines'
    });
    await loading.present();
    loading.dismiss();
  }

}
