import { Component, State } from '@stencil/core';

// This import loads the firebase namespace along with all its type information.
import firebase from '@firebase/app';

// import firebase from 'firebase';


// import firebase from '@firebase/app';
// import '@firebase/auth';
// import '@firebase/firestore';
import { User } from '@firebase/auth-types';

import { BehaviorSubject } from 'rxjs';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { Todo } from './todo.model';

const DATA_COLLECTION = 'current-todos';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description?: string;
  index: number;
  name: string;
  isComplete: boolean;
}

@Component({
  tag: 'app-firebase',
  styleUrl: 'app-firebase.scss',
})
export class AppFirebase {
  private email: string = null;
  private password: string = null;

  private authHasChecked$ = new BehaviorSubject(false);
  private authIsAuthorized$ = new BehaviorSubject(false);
  userId: string;
  afs: FirebaseFirestore;

  @State() hasChecked: boolean;
  @State() isAuthorized: boolean;
  @State() data: Todo[] = [];

  dummy = 'Dummy String';

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
  }

  doSignIn() {
    console.log('doSignIn:email>', this.email);
    console.log('doSignIn:password>', this.password);

    firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    /*
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.userLogged = true;
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
      });
    */
  }

  doListenForData() {
    this.afs = firebase.firestore;

    this.firestoreCollection('default-list', this.userId).onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log('AA>', doc.id, '=>', doc.data());
          const aaa = this.fromFirestoreDoc(doc.data() as FirestoreDoc);
          console.log('AA>', aaa);
        });

        const bb = querySnapshot.docs.map((x) =>
          this.fromFirestoreDoc(x.data() as FirestoreDoc),
        );

        console.log('BB>', bb);
        this.data = [...bb];
      },
    );

    /*    
    this.firestoreCollection('default-list', this.userId).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log('AA>', doc.id, '=>', doc.data());
      })
    });
*/
  }

  private firestoreCollection(todoListId: string, userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection('todo-lists')
      .doc(todoListId)
      .collection(DATA_COLLECTION);
  }

  private fromFirestoreDoc(x: FirestoreDoc): Todo {
    //
    const result: Todo = {
      description: x.description,
      id: x.id,
      index: x.index,
      isComplete: x.isComplete,
      name: x.name,
    };

    return result;
  }

  doSignOut() {
    firebase.auth().signOut();
  }

  componentDidLoad() {
    //
    console.log('AppFirebase:componentDidLoad');
  }

  componentWillLoad() {
    //
    console.log('AppFirebase:componentWillLoad');
    this.authHasChecked$.subscribe((x) => {
      console.log('authHasChecked$>', x);
      this.hasChecked = x;
    });

    this.authIsAuthorized$.subscribe((x) => {
      console.log('authIsAuthorized$>', x);
      this.isAuthorized = x;
    });

    firebase.auth().onAuthStateChanged((firebaseUser: User) => {
      console.log('onAuthStateChanged>', firebaseUser);
      this.authHasChecked$.next(true);

      if (firebaseUser) {
        this.authIsAuthorized$.next(true);
        this.userId = firebaseUser.uid;
        console.log('userId>', this.userId);        
      } else {
        this.authIsAuthorized$.next(false);
        this.userId = null;
      }
    });
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
            <ion-title>Firebase</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <stencil-route-link url="/profile/stencil">
            <ion-button>AAAAAAA</ion-button>
          </stencil-route-link>
          <ion-grid>
            <ion-row>
              <ion-col col-6>
                <ion-item>
                  <ion-input
                    type="email"
                    placeholder="Email"
                    value={this.email}
                    onInput={(event) => this.handleEmailChange(event)}
                  />
                </ion-item>
              </ion-col>
              <ion-col col-6>
                <ion-item>
                  <ion-input
                    type="password"
                    placeholder="Password"
                    value={this.password}
                    min-length='7'
                    onInput={(event) => this.handlePasswordChange(event)}
                  />
                </ion-item>
                <ion-button float-right onClick={() => this.doSignIn()}>
                  Sign In
                </ion-button>
                <ion-button float-right onClick={() => this.doSignOut()}>
                  Sign Out
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-item>
                <div>
                  Has Checked:{' '}
                  {this.hasChecked ? <scan>True</scan> : <scan>False</scan>}
                </div>
                <p>AAAAA: {JSON.stringify(this.hasChecked)}</p>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item>
                <div>
                  Is Authorized:{' '}
                  {this.isAuthorized ? <scan>True</scan> : <scan>False</scan>}
                </div>
                <div>BBBBB: {JSON.stringify(this.isAuthorized)}</div>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item>
                <ion-button onClick={() => this.doListenForData()}>
                  Listen for data
                </ion-button>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item>
                <div>Data: {JSON.stringify(this.data)}</div>
              </ion-item>
            </ion-row>
          </ion-grid>

          <ion-row>
            <ion-list no-lines>
              {this.data.map((item) => (
                <ion-item>
                  <div>{item.name}</div>
                  <p>{item.description}</p>
                </ion-item>
              ))}
            </ion-list>
          </ion-row>
        </ion-content>
      </ion-page>
    );
  }
}
