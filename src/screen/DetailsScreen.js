import * as React from 'react';
import { Text,ScrollView, View, Button,StyleSheet,Image, Pressable } from 'react-native';
import { Btn } from '../components/Btn';
import { collection, addDoc, getDocs,getDoc, where, query, doc, updateDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import EventItem from '../components/EventItem';
import RegList from '../components/RegList';
export default function DetailsScreen({ route, navigation }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState("");
  const [name, setName] = React.useState("");
  const [isRegistered, setIsRegistered] = React.useState("Register");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [when, setWhen] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { itemId } = route.params;
  const { page } = route.params;

  React.useEffect(() => {
    const fetchProfile = async () => {
      const q = query(
        collection(db, "userProfile"),
        where("email", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const doc = querySnapshot.docs[0];
        setName(doc.data().name);
      }
    };

    const checkRegistration = async () => {
      const q = query(
        collection(db, "registration"),
        where("email", "==", auth.currentUser?.email),
        where("eventID", "==", itemId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size >= 1) {
        setIsRegistered("Registered");
        setIsDisabled(true);
      } else {
        setIsRegistered("Register");
        setIsDisabled(false);
      }
    };
    const fetchEvent = async () => {
      const docRef = doc(db, "events", itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document data:", data);
        console.log(data.email);
        setDescription(data.description);
        setTitle(data.title);
        setEmail(data.email);
        setOrganization(data.organization)
        const timestamp = data.when;
const date = timestamp.toDate();
const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
setWhen(formattedDate); 
        setImage(data.image);
      } else {
        console.log("No such documentm!");
      }
    };
    fetchProfile();
    checkRegistration();
    fetchEvent();
  }, []);


  const registerEvent = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error("Registration failed, you need to login first");
      }
      
      const docRef = await addDoc(collection(db, "registration"), {
        eventID: itemId,
        eventTitle: title,
        name: name,
        email: auth.currentUser?.email,
        dateRegistered: new Date(),
     
      });
  
      console.log("Document written with ID: ", docRef.id);
      setIsRegistered("Registered");
      setIsDisabled(true);
      alert("You are now registered");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      navigation.replace('Login');
    }
  };
  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ScrollView contentContainerStyle={{  alignItems: "center", justifyContent: "center", padding:48 ,gap:16}}>
        <Image source={{uri:image? image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC'}}
        style={{width: 320, height: 320,borderRadius:8,marginVertical:16}} />
       
      <Text style={styles.heading}>{title}</Text>
      <Text>by: {email}{organization}</Text>
      <Text>Event ID: {itemId}</Text>
      <Text>Description: {JSON.stringify(description)}</Text>
      <Text>{ auth.currentUser?.email}</Text>
      {page==="Events Created"?<>
      <Pressable onPress={registerEvent}><Btn name="Edit event" disabled={isDisabled}  /></Pressable> 
      <Pressable onPress={handlePress}><Btn name="View participants" type="btnSecondary" disabled={isDisabled} /></Pressable> 
      </>:page==="Events Registered"? null : <Btn name={isRegistered} disabled={isDisabled} onPress={registerEvent} />
      
      }
     {isOpen?
      <RegList itemId={itemId}/>
     :
     null
     }
    
    </ScrollView>
  );
}


const styles= StyleSheet.create({
  heading: {
    fontWeight:'bold',
    textAlign:'center',
    fontSize:24
  }
})