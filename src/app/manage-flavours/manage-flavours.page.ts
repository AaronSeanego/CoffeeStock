import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera,CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { DatabaseService } from '../Services/database.service';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-manage-flavours',
  templateUrl: './manage-flavours.page.html',
  styleUrls: ['./manage-flavours.page.scss'],
})
export class ManageFlavoursPage implements OnInit {
  manage_flavours_form:FormGroup;
  Barcode;
  flavourName:string;
  pricePerBox:Number;
  pricePerPod:Number;
  podsPerBox:Number;

  image = '/assets/LogoIcon.svg';
  cameraIcon = '/assets/imagePlaceholder.svg';

  photo_url;
  constructor(public formBuilder:FormBuilder,
    private camera: Camera,
    public manageFlavoursObject: DatabaseService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private file: File,
    private storage: Storage,
    private file_path: FilePath) { }

  ngOnInit() {
    this.manage_flavours_form = this.formBuilder.group({
      barcode: ["", [Validators.required]],
      flavour_name: ["",[Validators.required]],
      price_per_box: ["", [Validators.required]],
      price_per_pod: ["", [Validators.required]],
      pods_per_box: ["", [Validators.required]]
    });
  }

  addFlavours() {

    if(this.photo_url == null){
      this.photo_url = this.image;
    }else{
    }

    this.manageFlavoursObject.createFlavoursTable();
    this.manageFlavoursObject.addFlavours(
      this.Barcode,
      this.flavourName,
      this.pricePerBox,
      this.pricePerPod,
      this.podsPerBox,
      this.photo_url);
  }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData.text == ''){
      }else{
        this.Barcode = barcodeData.text;
      }
     }).catch(err => {
         console.log('Error', err);
         this.barcodeAlert("Error: " + JSON.stringify(err));
     });
  }

  uploadImages(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {

      if(imageData == 'undefined'){
      }else{
        this.photo_url = 'data:image/jpeg;base64,' + imageData;
        this.cameraIcon = this.photo_url;
      }
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):<ion-icon name="images-outline"></ion-icon>

      // let base64image = 'data:image/jpeg;base64,' + imageData;
     
    }, (err) => {
    });
  }

  async imageAlert(imageData) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Results from image upload',
      message: imageData,
      buttons: ['OK']
    });

    await alert.present();
  }

  async barcodeAlert(barcodeData) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Results from barcode',
      message: barcodeData,
      buttons: ['OK']
    });

    await alert.present();
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      cssClass: 'action_sheet',
      buttons: [{
        text: 'Load from Library',
        // role: 'destructive',
        icon: 'images-outline',
        handler: () => {
          this.uploadImages(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Use Camera',
        icon: 'camera-outline',
        handler: () => {
          this.uploadImages(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
