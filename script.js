// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8uuh6GUliXgkYk7O34YVzjuX5jA3Kaz4",
    authDomain: "todo-list-127c5.firebaseapp.com",
    projectId: "todo-list-127c5",
    storageBucket: "todo-list-127c5.appspot.com",
    messagingSenderId: "87019294068",
    appId: "1:87019294068:web:d6314ee961478627f67021"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig)

import {
    getFirestore,
    collection,
    doc,
    query,
    where,
    getDoc,
    getDocs,
    deleteDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const db = getFirestore(app)
const docRef = doc(db, "todoitems", "1");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}

const listeRef = document.getElementById("liste")
// const q = query(collection(db, "todoitems"), where("erFerdig", "==", false));
// const querySnapshot = await getDocs(q);
const querySnapshot = await getDocs(collection(db, "todoitems"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data())
    const item = document.createElement("li")
    item.innerHTML = doc.data().tekst
    item.dataset.id = doc.id
    if (doc.data().erFerdig) {
        item.classList.add("ferdig")
    }
    listeRef.appendChild(item)
    item.addEventListener("click", klikk)
})

async function klikk(event) {
    console.log("klikk")
    console.log(event.target)
    // Fjern objektet fra lista vår lokalt: 
    listeRef.removeChild(event.target)
    // Fjern objektet fra Google Firestore: 
    const id = event.target.dataset.id
    await deleteDoc(doc(db, "todoitems", id));
}


document.getElementById("btn").addEventListener("click", leggTilOppgave)

async function leggTilOppgave() {
    const oppgaveTekst = document.getElementById("oppgave").value
    console.log(oppgaveTekst)
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "todoitems"), {
        tekst: oppgaveTekst,
        erFerdig: false
    });
    console.log("Document written with ID: ", docRef.id);

    const item = document.createElement("li")
    item.innerHTML = oppgaveTekst
    item.dataset.id = docRef.id
    listeRef.appendChild(item)
    item.addEventListener("click", klikk)
    
}

