import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
// import { MustMatch } from '../module/password_match';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx'
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../Services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register_form:FormGroup;
  username;
  password;
  confirm_password;

  admin_data;
  constructor(public formBuilder: FormBuilder,
    public alertController: AlertController,
    public route: Router,
    public registerPageObject: DatabaseService,
    private sqlite: SQLite,
    private storage: Storage) { }

  ngOnInit() {
    this.register_form = this.formBuilder.group({
      username: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9.]+@[a-zA-Z0-9-.]+\\.[a-zA-Z]+$")]],
      password: ["", [Validators.required, Validators.minLength(6),Validators.maxLength(16)]],
      confirm_password: ["", [Validators.required]],
    });
  }

  createAdminTable() {
    this.registerPageObject.createAdminTable();
    this.registerPageObject.getAdminData().then((data) => {
      this.admin_data = data;
      for(var a = 0; a < this.admin_data.length; a++){
        if(this.admin_data[a].Username === this.username){
          this.errorMessage("Username already exists. Try again with a different username.");
        }else{
          this.registerPageObject.insertAdminInfo(this.username,this.password);
          this.register_form.reset();
        }
      }
    });
  }

  async errorMessage(error_message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Subtitle',
      message: error_message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
