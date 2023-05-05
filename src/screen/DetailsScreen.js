import * as React from 'react';
import { Text,ScrollView, View, Button,StyleSheet,Image, Pressable,ActivityIndicator } from 'react-native';
import { Btn } from '../components/Btn';
import { collection, addDoc, getDocs,getDoc, where, query, doc, updateDoc,deleteDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import EventItem from '../components/EventItem';
import RegList from '../components/RegList';
import EditEventScreen from './EditEventScreen';
export default function DetailsScreen({ route, navigation }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState("");
  const [name, setName] = React.useState("");
  const [isRegistered, setIsRegistered] = React.useState("Register");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [eventStatus, setEventStatus] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [when, setWhen] = React.useState("");
  const [where1, setWhere1] = React.useState("");
  const [timestamp, setTimestamp] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const { itemId } = route.params;
  const { page } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [month, setMonth] = React.useState("");
  const [day, setDay] = React.useState("");
  const [year, setYear] = React.useState("");
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
      setIsLoading(true)
      const q = query(
        collection(db, "registration"),
        where("email", "==", auth.currentUser?.email),
        where("eventID", "==", itemId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size >= 1) {
        setInterval(() => {
          setIsLoading(false)
          setIsRegistered("Registered");
          setIsDisabled(true);
        }, 500);
        
      } else {
        setInterval(() => {
          setIsLoading(false)
        }, 500);
        setIsRegistered("Register");
        setIsDisabled(false);
      }
    };
 
    const fetchEvent = async () => {
      const docRef = doc(db, "events", itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDescription(data.description);
        setTitle(data.title);
        setEmail(data.email);
        setOrganization(data.organization)
        setStatus(data.status);
        setCategory(data.category)
        setEventStatus(data.eventStatus)
        setWhere1(data.where)
        const timestamp = data.when;
        setTimestamp(data.when);
        const date = timestamp.toDate();
        const formattedDate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        setWhen(formattedDate); 
        setMonth(date.getMonth()+1)
        setDay(date.getDate())
        setYear(date.getFullYear())
        setImage(data.image);
      } else {
        console.log("No such document!");
      }
    };
    fetchProfile();
    checkRegistration();
    fetchEvent();

  }, []);

  const deleteRegistration = async () => {
    try{
      const q = query(
        collection(db, "registration"),
        where("email", "==", auth.currentUser?.email),
        where("eventID", "==", itemId)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
  
      
      alert("Registration successfully cancelled.")
      navigation.replace('MyApp');

    }
    catch (error) {
      alert(error);
  
     
    }}
  const registerEvent = async (navigation) => {
    try {
      if (!auth.currentUser) {
        throw new Error("Registration failed, you need to login first");
      }
      
      const docRef = await addDoc(collection(db, "registration"), {
        eventID: itemId,
        eventTitle: title,
        name: name,
        email: auth.currentUser?.email,
        when: timestamp,
        dateRegistered: new Date(),
        image: image? image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC'
     
      });

      setIsRegistered("Registered");
      setIsDisabled(true);
      alert("You are now registered");
      navigation.navigate("My App")
    } catch (error) {
  
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
      <Text> {when} | {where1}</Text>
      <Text>{page=="Events Created"? status +' |' :null} {eventStatus}</Text>
      <Text>Description: {JSON.stringify(description)}</Text>
      {page === "Events Created" && (
        <>
          <Btn
            name="Edit event"
            onPress={() =>
              navigation.navigate("Edit Event", {
                itemId,
                imagePrev: image,
                organization,
                startedDate: when,
                description,
                status,
                category,
                month1: month,
                day1: day,
                year1: year,
              })
            }
          />
          <Pressable onPress={handlePress}>
            <Btn name="View participants" type="btnSecondary" disabled={isDisabled} />
          </Pressable>
        </>
      )}

    {page !== "Events Created"  && (
      <Btn
        name={isLoading ? (
          <ActivityIndicator animating size={"small"} color={"white"} />
        ) : (
          isRegistered === "Registered" ? "Cancel" : "Register"
        )}
        onPress={isRegistered === "Registered" ? deleteRegistration : registerEvent}
        disabled={new Date(timestamp.seconds * 1000) < new Date()}
      />
    )}

    {isOpen && <RegList itemId={itemId} />}
    
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