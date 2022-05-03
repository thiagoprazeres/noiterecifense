import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  eventos: any;

  constructor(public actionSheetController: ActionSheetController) {
    fetch('https://dot7.com.br/noiterecifenseapi2/eventos.json').then((res) => {
      if(res.ok) {
        res.json().then((json) => {
          console.log(json);
          this.eventos = json;
        })
      }
    });
    console.log();
  }
  async presentActionSheet(evento) {
    const _data = evento.date.split('-');
    // const data = (new Date(evento.date)).toISOString().replace(/-|:|\.\d\d\d/g,"");
    const data = _data[0]+_data[1]+_data[2]+'T030000Z';
    console.log(data);
    // console.info(this.platform.platforms());
    const actionSheet = await this.actionSheetController.create({
      header: evento.title,
      buttons: [{
        text: 'Localização',
        icon: 'map',
        handler: () => {
          window.open('https://www.google.com/maps?q=' + evento.location, '_system');
        }
      },
      // {
      //   text: 'Comprar ingresso',
      //   icon: 'cash',
      //   handler: () => {
      //     console.log('Share clicked');
      //   }
      // }, 
      {
        text: 'Save the date',
        icon: 'calendar',
        handler: () => {
          const googleCalendarUrl = 'http://www.google.com/calendar/event?action=TEMPLATE&text=' + evento.title + '&dates=' + data + '/' + data + '&location=' + evento.location;
          console.log(googleCalendarUrl);
          window.open(googleCalendarUrl, '_system');
        }
      },
      {
        text: 'Cancelar',
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
