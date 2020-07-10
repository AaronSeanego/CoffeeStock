import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { reject, resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  data = [];
  Flavours = [];
  constructor(private sqlite: SQLite,
    private route: Router) { }

  public createDB():void {
    this.sqlite.create({
      name: 'CofeeStock.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.databaseObj = db;
        // console.log("Database CoffeeStock was successfully created!");
        // alert("Database CoffeeStock was successfully created!");
    }).catch(e => {
      // console.log(e);
      // alert(e);
    });
  }

  public deleteTable() {
    this.databaseObj.executeSql('DROP TABLE Flavours'
    ,[]).then(() => {
    }).catch(error => {
    });
  }

  public createAdminTable():void {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS Admin(' + 
    'Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,' + 
    'Username VARCHAR(20) UNIQUE, ' + 
    'Password STRING(16))'
      ,[]).then(() => {
        // console.log("Table created!");
      }).catch(e => {
        console.log(e);
      });
  }

  public insertAdminInfo(username, password) {
    if((username === null) && (password === null)){
      alert("Fill all fields!");
      return;
    }

    this.databaseObj.executeSql('INSERT INTO Admin(Username, Password) VALUES (?,?)'
    ,[username,password]).then(() => {
      // console.log("Data inserted!");
      alert("Data inserted!")
      this.route.navigateByUrl('/home');
    }).catch(e => {
      // console.log(e);
      alert(e);
    });
  }

  public deleteAdmin(id):void {
    this.databaseObj.executeSql('DELETE FROM Admin WHERE Id = ?'
    ,[id]).then(() => {
      alert("Record deleted from database!");
      this.route.navigateByUrl('/login');
    }).catch(e => {
      alert(e);
    });
  }

  public getAdminData() {

    return new Promise((resolve, reject) => {
      this.databaseObj.executeSql('SELECT * FROM Admin',[]).then((res) => {
        this.data = [];

        if(res.rows.length > 0){
          for(var i = 0; i < res.rows.length; i++){
            this.data.push(res.rows.item(i));
          }

          resolve(this.data);
        }
        // console.log(this.data);
      }).catch(error => {
        console.log(error);
      });

    });
  }


  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  public createFlavoursTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS Flavours(' + 
    'Id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
    'Barcode INTEGER UNIQUE NOT NULL,' + 
    'Name VARCHAR NOT NULL,' +
    'PricePerBox DOUBLE NOT NULL,' + 
    'PricePerPod DOUBLE NOT NULL,' + 
    'PodsPerBox INTEGER NOT NULL,' +
    'PhotoName BLOB)', []).then(() => {
      // alert("Table Flavours was created successfully!");
    }).catch(e => {
      // alert("error" + JSON.stringify(e));
    });
  }

  public addFlavours(barcode,name,price_per_box,price_per_pod,pods_per_box,photo_url):void {
    this.databaseObj.executeSql('INSERT INTO Flavours(Barcode,Name,PricePerBox,PricePerPod,PodsPerBox,PhotoName) VALUES (?,?,?,?,?,?)'
    ,[barcode,name,price_per_box,price_per_pod,pods_per_box,photo_url]).then(() => {
      // alert("Flavour data was added into your table");
      this.route.navigateByUrl('/home');
    }).catch(e => {
      alert("error" + JSON.stringify(e));
    });
  }

  public updateFlavours(id,barcode,name,price_per_box,price_per_pod,pods_per_box,photo_url) {
    this.databaseObj.executeSql('UPDATE Flavours SET(Barcode,Name,PricePerBox,PricePerPod,PodsPerBox,PhotoName) = (?,?,?,?,?,?) WHERE Id = ?'
    ,[barcode,name,price_per_box,price_per_pod,pods_per_box,photo_url,id]).then(() => {
      alert(name + " was updated!");
      this.route.navigateByUrl('/home');
    }).catch(error => {
      alert("Error" + JSON.stringify(error));
    });
  }

  public getFlavours() {
    return new Promise((resolve,reject) => {
      this.databaseObj.executeSql('SELECT * FROM Flavours'
      ,[]).then((data) => {
        this.Flavours = [];

        if(data.rows.length > 0){
          for(var i = 0; i < data.rows.length; i++){
            this.Flavours.push(data.rows.item(i));
          }

          resolve(this.Flavours);
        }else{
        }
      });
    });
  }

  public deleteFlavours(id) {
    this.databaseObj.executeSql('DELETE FROM Flavours WHERE Id = ?'
    ,[id]).then(() => {
      // alert("Flavour deleted");
    }).catch(e => {
      alert(e);
    });
  }
}
