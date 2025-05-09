import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // ✅
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

    async login(email: string, password: string) {
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        return result.user;
    }
    
    async register(email: string, password: string) {
        const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
        return result.user;
    }
    
    logout() {
        return this.afAuth.signOut();
    }
    
    getCurrentUser() {
        return this.afAuth.authState;
    }
}
