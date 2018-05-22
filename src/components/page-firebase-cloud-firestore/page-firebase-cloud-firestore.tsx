import { Component, State } from '@stencil/core';

// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These are imported in my-app.tsx.
// These imports load individual services into the firebase namespace.
// import 'firebase/auth';
// import 'firebase/firestore';

import { User } from '@firebase/auth-types';
import { FirebaseFirestore } from '@firebase/firestore-types';

import { BehaviorSubject } from 'rxjs';

import { Task } from './task.model';

const DATA_COLLECTION = 'tasks';
const USERS_COLLECTION = 'users';

// https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

interface FirestoreDoc {
  id: string;
  name: string;
  sysDateCreated: string;
  sysDateUpdated: string;
}

@Component({
  tag: 'page-firebase-cloud-firestore',
  styleUrl: 'page-firebase-cloud-firestore.css',
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
  @State() data: Task[] = [];

  dummy = 'Dummy String';

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
  }

  doCreateItem(): any {
    console.log('## doCreateItem ##');
    // this.firestoreCollection(this.userId)
    const now = Date().toString();
    const doc: FirestoreDoc = {
      id: '',
      name: 'Task:' + now,
      sysDateCreated: now,
      sysDateUpdated: now,
    };

    // Add a new document with a generated id.
    const newRef = this.firestoreCollection(this.userId).doc();
    doc.id = newRef.id;
    newRef.set(doc);
  }

  doDeleteItem(item: Task): any {
    console.log('## doDeleteItem ##');
    console.log('item>', item);
    this.firestoreCollection(this.userId)
      .doc(item.id)
      .delete();
  }

  doUpdateItem(item: Task): any {
    console.log('## doUpdateItem ##');
    console.log('item>', item);
    const now = Date().toString();
    const doc: FirestoreDoc = {
      id: item.id,
      name: 'Task(U):' + now,
      sysDateCreated: item.sysDateCreated,
      sysDateUpdated: now,
    };

    this.firestoreCollection(this.userId)
      .doc(item.id)
      .set(doc);
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

  doSignOut() {
    firebase.auth().signOut();
  }

  doListenForData() {
    // this.afs = firebase.firestore();

    this.firestoreCollection(this.userId).onSnapshot((querySnapshot) => {
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
    });

    /*    
    this.firestoreCollection('default-list', this.userId).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log('AA>', doc.id, '=>', doc.data());
      })
    });
*/
  }

  private firestoreCollection(userId: string) {
    //
    return (
      this.afs
        .collection(USERS_COLLECTION)
        .doc(userId)
        // .collection('todo-lists')
        // .doc(todoListId)
        .collection(DATA_COLLECTION)
    );
  }

  private fromFirestoreDoc(x: FirestoreDoc): Task {
    //
    const result: Task = {
      id: x.id,
      name: x.name,
      sysDateCreated: x.sysDateCreated,
      sysDateUpdated: x.sysDateUpdated,
    };

    return result;
  }

  componentDidLoad() {
    //
    console.log('AppFirebase:componentDidLoad');
    this.afs = firebase.firestore();
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

  /*
  private createItem(item: Gizmo, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    doc.id = this.afs.createId();
    const recordToSet: FirestoreDoc = {
      ...doc,
      sysDateCreatedOn: dateNow,
      sysDateUpdatedOn: dateNow,
    };  
  */

  /*
           <ion-row>
            <ion-item>
              <div>Data: {JSON.stringify(this.data)}</div>
            </ion-item>
          </ion-row>
  */

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Cloud Firestore</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-grid>
        <ion-row>
            <ion-item>
              <ion-label>
                <h2>Sign In Details</h2>
                <p>
                  email: a.a@a.com<br />
                  password: password
                </p>
              </ion-label>
            </ion-item>
          </ion-row>          
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
                  min-length="7"
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
              <ion-label>
                <h2>Authentication</h2>
                <p>
                  Has Checked: {this.hasChecked ? 'True' : 'False'} <br />
                  Is Authorized: {this.isAuthorized ? 'True' : 'False'}
                </p>
              </ion-label>
            </ion-item>
          </ion-row>
          <ion-row>
            <ion-item>
              <ion-button onClick={() => this.doListenForData()}>
                Listen for data
              </ion-button>
            </ion-item>
          </ion-row>
        </ion-grid>

        <ion-list>
          <ion-list-header color="secondary">
            Item List
            <ion-button onClick={() => this.doCreateItem()} slot="end">
              Create
            </ion-button>
          </ion-list-header>
          {this.data.map((item) => (
            <ion-item-divider>
              <ion-item>
                <ion-label>
                  <h2>{item.name}</h2>
                  <p>Date Created: {item.sysDateCreated}</p>
                  <p>Date Updated: {item.sysDateUpdated}</p>
                </ion-label>
                <ion-button onClick={() => this.doUpdateItem(item)} slot="end">
                  Update
                </ion-button>
                <ion-button onClick={() => this.doDeleteItem(item)} slot="end">
                  Delete
                </ion-button>
              </ion-item>
            </ion-item-divider>
          ))}
        </ion-list>
      </ion-content>,
    ];
  }
}
