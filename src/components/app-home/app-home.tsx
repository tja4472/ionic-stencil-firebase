import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
})
export class AppHome {
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Ionic Stencil Firebase</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <p>Blah!!!</p>

        <e2e-attribute-basic
          single="Single"
          multi-word="Multi Word"
          my-custom-attr="My Custom Attr"
        />

        <ion-button data-testId="showModalPageButton" href={'/show-modal'}>
          Show Modal page
        </ion-button>
        <ion-button href={'/firebase'}>Show Firebase page</ion-button>
        <ion-button href={'/gizmos'}>Show Gizmos page</ion-button>
        <ion-button href={'/sign-in'}>Sign In</ion-button>
      </ion-content>,
    ];
  }
}
