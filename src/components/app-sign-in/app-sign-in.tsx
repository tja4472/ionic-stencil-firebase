import { Component, State } from '@stencil/core';

@Component({
  tag: 'app-sign-in',
  styleUrl: 'app-sign-in.scss',
})
export class AppSignIn {
  //
  @State() email: string = null;
  @State() password: string = null;

  async handleEmailChange(event) {
    this.email = event.target.value;
  }

  async handlePasswordChange(event) {
    this.password = event.target.value;
  }

  async handleSubmit(event) {
    //
    console.log('handleSubmit');
    event.preventDefault();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Sign In</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <ion-list>
            <ion-item>
              <ion-label position="fixed">Username</ion-label>
              <ion-input
                type="email"
                placeholder="Email"
                value={this.email}
                onInput={(event) => this.handleEmailChange(event)}
              />
            </ion-item>
            <ion-item>
              <ion-label position="fixed">Password</ion-label>
              <ion-input
                type="password"
                placeholder="Password"
                value={this.password}
                min-length="7"
                onInput={(event) => this.handlePasswordChange(event)}
              />
            </ion-item>
          </ion-list>
          <button type="submit">aaaa</button>
          <ion-button type="submit">Sign In</ion-button>
        </form>
      </ion-content>,
    ];
  }
}
