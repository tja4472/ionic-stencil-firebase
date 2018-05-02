import { Component, Prop } from '@stencil/core';
import { ModalController } from '@ionic/core';

@Component({
  tag: 'app-gizmo-detail',
  styleUrl: 'app-gizmo-detail.scss',
})
export class AppGizmoDetail {
  //
  @Prop({ connect: 'ion-modal-controller' })
  modalCtrl: ModalController;

  modalController: any;
  componentDidLoad() {
    //
    console.log('AppGizmoDetail:componentDidLoad');

  // initialize controller
  this.modalController = document.querySelector('ion-modal-controller');
  this.modalController.componentOnReady().then((x) => {
    console.log('XXXXXXX>', x);
  });    
  }

  async exit() {

   //  await this.modalCtrl.create();
   //  await this.modalCtrl.dismiss();

/*    
    this.modalCtrl.create().then((x) => {
      console.log('AppGizmoDetail:exit:x>', x);
      x.dismiss();
    });    
 */
this.modalController.dismiss();
    // this.modalCtrl.dismiss();
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <stencil-route-link url="/">
                <ion-button>
                  <ion-icon slot="icon-only" name="arrow-back" />
                </ion-button>
              </stencil-route-link>
            </ion-buttons>
            <ion-title>Gizmo</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-button onClick={() => this.exit()}>Exit</ion-button>
        </ion-content>
      </ion-page>
    );
  }
}
