import '@ionic/core';
import { Component, Prop, Listen } from '@stencil/core';

// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/firestore';

import { MY_FIREBASE_APP_CONFIG } from './my-firebase-app-config';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss',
})
export class MyApp {
  @Prop({ connect: 'ion-toast-controller' })
  toastCtrl: HTMLIonToastControllerElement;

  constructor() {
    console.log('MyApp:constructor');
    firebase.initializeApp(MY_FIREBASE_APP_CONFIG);
    // firebase.firestore();
  }

  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */
  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload',
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  renderRouter() {
    return (
      <ion-router useHash={false}>
        <ion-route-redirect from="/" to="/home" />

        <ion-route url="/home" component="app-home" />
        <ion-route url="/firebase" component="app-firebase" />
        <ion-route url="/firebase-cloud-firestore" component="page-firebase-cloud-firestore" />        
        <ion-route url="/gizmos" component="app-gizmo" />
        <ion-route url="/sign-in" component="app-sign-in" />

        <ion-route url="/show-modal" component="tjaexa-show-modal" />

        <ion-route url="/profile/:name" component="app-profile" />
      </ion-router>
    );
  }

  render() {
    return (
      <ion-app>
        {this.renderRouter()}
        <ion-nav />
      </ion-app>
    );
  }
}
