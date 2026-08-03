import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-amqCGhuVH4SQacTgFxiwngoqr0iSQXI",
  authDomain: "ug-elibrary.firebaseapp.com",
  projectId: "ug-elibrary",
  appId: "1:400672445968:web:1cb4713476c5facf60dc95"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  try {
    const q = query(collection(db, 'resources'));
    const snap = await getDocs(q);
    let found = false;
    snap.forEach(doc => {
      const data = doc.data();
      if (data.title === "UNIT 2" || data.name === "UNIT 2") {
        found = true;
        console.log("Found document ID:", doc.id);
        console.log("Fields:");
        console.log("title:", data.title);
        console.log("name:", data.name);
        console.log("fileUrl:", data.fileUrl);
        console.log("url:", data.url);
        console.log("subject:", data.subject);
        console.log("semester:", data.semester);
        console.log("Entire Data:", JSON.stringify(data, null, 2));
      }
    });
    if (!found) console.log("UNIT 2 not found");
  } catch (e) {
    console.error("Error:", e);
  }
}
check();
