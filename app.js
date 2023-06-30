const express = require("express");
const app = express();

app.use(express.json());

//user
const { loadUser } = require("./user_model");

const userData = loadUser(); /// user data comes

const admin = require("firebase-admin");
const credentials = require("./fir-question-cb6bc-firebase-adminsdk-6n3rc-b57c4d2bf6.json");
const { async } = require("@firebase/util");
const { resolve } = require("path");
const { rejects } = require("assert");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// const emails = ["email1@gmail.com", "email2@gmail.com", "email3@gmail.com"];

// const addEmail = (user) => {
//   return new Promise(async (resolve, rejects) => {
//     try {
//       const userRecord = await admin.auth().createUser({
//         email: user.email,
//         password: user.password,
//       });
//       console.log("here ||||||");
//       console.log(userRecord.uid);
//       console.log("here");

//       const { name, email, password, phoneNo } = user;

//       await admin.firestore().collection("usersData").doc(userRecord.uid).set({
//         name,
//         email,
//         password,
//         phoneNo,
//       });

//       //   await admin.firestore().collection("usersData").doc(userRecord.uid).add({
//       //     uid: ,
//       //     name,
//       //     email,
//       //     password,
//       //     phoneNo,
//       //   });

//       //   await admin
//       //     .firestore()
//       //     .collection(collectionName)
//       //
//       //     .set({
//       //       name,
//       //       email,
//       //       password,
//       //       phoneNo,
//       //     });

//       resolve();
//     } catch (error) {
//       rejects();
//     }
//   });
// };

// const addEmailsInFirebase = () => {
//   let validEmails = [];
//   let invalidEmails = [];

//   for (let user of userData) {
//     addEmail(user)
//       .then(() => {
//         validEmails.push(user.email);
//         console.log("valid Emails:-", validEmails);
//       })
//       .catch(() => {
//         invalidEmails.push(user.email);

//         console.log("invalid Emails:-", invalidEmails);
//       });
//   }
// };

// addEmailsInFirebase();

const deleteAllUsers = (nextPageToken) => {
  let uids = [];
  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then((listUsersResult) => {
      uids = uids.concat(
        listUsersResult.users.map((userRecord) => userRecord.uid)
      );
      console.log(uids);
      if (listUsersResult.pageToken) {
        deleteAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    })
    .finally(() => {
      admin.auth().deleteUsers(uids);
    });
};

  deleteAllUsers();
