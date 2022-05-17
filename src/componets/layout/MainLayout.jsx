import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import firebaseApp from "../../../credentials";
import { getAuth } from "firebase/auth";
import { MainHeader } from "./MainHeader";
import { MainNavbar } from "./MainNavbar";
import { MainCointent } from "./MainCointent";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
const { Content, Footer } = Layout;
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const MainLayout = () => {
  const [navValue, setNavValue] = useState("1");
  const [navMin, setNavMin] = useState(false);
  const getCurrentUser = async () => {
    const UserRef = collection(db, "Users");
    const q = query(UserRef, where("email", "==", `${auth.currentUser.email}`));
    const querySnapshot = await getDocs(q);
    const _path = querySnapshot?.docs[0]._document.data.value.mapValue.fields;
    const name = _path.name.stringValue;
    auth.currentUser.displayName = name;
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <Layout>
      <Layout>
        <MainHeader setNavMin={setNavMin} navMin={navMin} />
      </Layout>
      <Layout className={navMin ? "main-content-min" : "main-layout"}>
        <MainNavbar
          setNavValue={setNavValue}
          setNavMin={setNavMin}
          navValue={navValue}
          navMin={navMin}
        />
        <Content>
          <MainCointent navValue={navValue} navMin={navMin} />
        </Content>
      </Layout>
    </Layout>
  );
};
