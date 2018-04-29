import { Component, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'tjaexa-show-modal',
  styleUrl: 'tjaexa-show-modal.scss',
  host: {
    'data-testid' : "showModalPage"
  }
})
export class ShowModal {
  //
  @Prop({ connect: 'ion-modal-controller' })
  modalCtrl: HTMLIonModalControllerElement;

  @Listen('body:ionModalDidDismiss')
  modalDidDismiss(event: CustomEvent) {
    if (event) {
      console.log('modalDidDismiss:event>', event);
      // console.log('modalDidDismiss:event.detail.namespace>', 
      // event.detail.namespace);      
      console.log('modalDidDismiss:event.detail.data>', event.detail.data);      
    }
  }

  async showModalForm() {
    const modal = await this.modalCtrl.create({
      component: 'tjaexa-modal-form',
      componentProps: {},
    });
    await modal.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Show Modal</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-button data-testId="showModalFormButton" onClick={() => this.showModalForm()}>
          Show Modal Form
        </ion-button>
      </ion-content>,
    ];
  }
}
