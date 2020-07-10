import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../Services/database.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions,PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-edit-flavours',
  templateUrl: './edit-flavours.page.html',
  styleUrls: ['./edit-flavours.page.scss'],
})
export class EditFlavoursPage implements OnInit {
  edit_flavours_form:FormGroup;
  flavourID;
  Barcode;
  flavourName;
  pricePerBox;
  pricePerPod;
  podsPerBox;
  photoName;
  image
  photo_url = "/assets/LogoIcon.svg";
  constructor(public formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    public editPageObject: DatabaseService,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private file: File,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,) { }

  ngOnInit() {
    this.edit_flavours_form = this.formBuilder.group({
      barcode: ["", [Validators.required]],
      flavour_name: ["", [Validators.required]],
      price_per_box: ["", Validators.compose([Validators.required,Validators.pattern("^[0-9.]+$")])],
      price_per_pod: ["", Validators.compose([Validators.required,Validators.pattern("^[0-9.]+$")])],
      pods_per_box: ["", Validators.compose([Validators.required,Validators.pattern("^[0-9.]+$")])]
    });

    this.router.queryParams.subscribe(data => {
      console.log(data);
      this.flavourID = data.ID;
      this.Barcode = data.Code;
      this.flavourName = data.Name;
      this.pricePerBox = data.PricePerBox;
      this.pricePerPod = data.PricePerPod;
      this.podsPerBox = data.PodsPerBox;
      this.photoName = data.PhotoName;
    });
  }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData.text == ''){
      }else{
        this.Barcode = barcodeData.text;
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  editFlavours() {
    this.editPageObject.updateFlavours(
      this.flavourID,
      this.Barcode,
      this.flavourName,
      this.pricePerBox,
      this.pricePerPod,
      this.podsPerBox,
      this.photo_url);
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
      console.log(imageData);

      if(imageData == ''){
      }else{
        this.photoName = 'data:image/jpeg;base64,' + imageData; 
      }
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):<ion-icon name="images-outline"></ion-icon>

      let base64image = 'data:image/jpeg;base64,' + imageData;
     
    }, (err) => {
     // Handle error
    });
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
