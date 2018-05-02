import { Component, Prop, State } from '@stencil/core';

import { Gizmo } from './gizmo.model';
import { GizmoDataService } from './gizmo.data.service';

@Component({
  tag: 'app-gizmo',
  styleUrl: 'app-gizmo.scss',
})
export class AppGizmo {
  @State() data: Gizmo[] = [];

  @Prop({ connect: 'ion-modal-controller' })
  modalCtrl: HTMLIonModalControllerElement;

  private readonly userId = 'roNQiXFu3LQBzV860lsvXlGYCm03';

  componentDidLoad() {
    //
    console.log('AppGizmo:componentDidLoad');
    const dataService = new GizmoDataService();
    dataService.getItems$(this.userId).subscribe((x) => {
      this.data = x;
    });
  }

  addItem() {
    console.log('AppGizmo:addItem()');
    this.showModal();
  }

  private showModal() {
    this.modalCtrl.create({ component: 'app-gizmo-detail' }).then((x) => {
      x.present();
    });
  }

  /*
    openDetailPage(title: any) {
    if (title) {
      this.modalCtrl.create({
        component: 'page-details',
        componentProps: {
          title: title,
          data: this.data,
        }
      }).then(m => m.present());
    }
  }
  */
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <stencil-route-link url="/">
              <ion-button>
                <ion-icon slot="icon-only" name="arrow-back" />
              </ion-button>
            </stencil-route-link>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.addItem()}>
              <ion-icon slot="icon-only" name="add" />
            </ion-button>
          </ion-buttons>
          <ion-title>Gizmos(Cloud Firestore)</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-list>
          {this.data.map((item) => (
            <ion-item>
              <p>
                <strong>{item.name}</strong>
              </p>
              <p>{item.description}</p>
            </ion-item>
          ))}
        </ion-list>
      </ion-content>,
    ];
  }
}
