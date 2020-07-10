import { Component } from '@angular/core';
import { DatabaseService } from '../Services/database.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Admin_Object;
  Flavours_Object;
  check:boolean;
  empty:boolean = false;
  constructor(public homePageObject: DatabaseService,
    private route: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController) {
      this.loadingFlavours();
    }

    ngOnInit() {
      this.loadingFlavours();
    }

    logOut(){
      this.route.navigateByUrl('/login');
    }
  
    syncData() {
      this.syncDataLoader();
    }

    deleteFlavours(id,name) {
      this.deleteConfirmation(id,name);
    }
    
    editFlavours(id,barcode,name,price_per_box,price_per_pod,pods_per_box,photoName) {
      this.route.navigate(['edit-flavours'], {queryParams: {ID:id,Code: barcode,Name:name,
        PricePerBox:price_per_box,PricePerPod:price_per_pod,
        PodsPerBox:pods_per_box,PhotoName: photoName}});
    }
  
    deleteFlavour(id,name) {

    }

    async errorMessage(error_message) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: error_message,
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async loadingFlavours() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000,
        spinner: 'lines'
      });
      await loading.present();
      this.homePageObject.getFlavours().then((data) => {
        if(isNullOrUndefined(data)){
        }else{
          this.Flavours_Object = data;
        }
        loading.dismiss();
      });
      // const { role, data } = await loading.onDidDismiss();
      // console.log('Loading dismissed!');
    }

    async syncDataLoader() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Sync data...',
        duration: 2000,
        spinner: 'lines'
      });
      await loading.present();
      this.homePageObject.getFlavours().then((data) => {
        if(isNullOrUndefined(data)){
        }else{
          this.Flavours_Object = data;
        }
        loading.dismiss();
      });
      // const { role, data } = await loading.onDidDismiss();
      // console.log('Loading dismissed!');
    }
  
    async deleteMessage(delete_message) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: delete_message,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
    async deleteConfirmation(id,name) {
      const alert = await this.alertController.create({
        cssClass: 'delete_message',
        header: 'Confirm!',
        message: 'Are you sure want to delete ' + name + ' from the list?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.homePageObject.deleteFlavours(id);
              this.loadingFlavours();
              this.presentToast(name + " was removed from list.");
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    async presentToast(toast_message) {
      const toast = await this.toastController.create({
        header: "Alert",
        message: toast_message,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }

}
