import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {collection, query, where, getDocs,getCountFromServer} from 'firebase/firestore';
import { db,auth } from '../config/firebase';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Upcoming Events',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Events Registered',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Events Created',
  },
];

const Item = ({item, onPress, backgroundColor, textColor, count}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.number, {color: textColor}]}>{count}</Text>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const CardList = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState();
  const [createdCount, setCreatedCount] = useState(0);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    try{ 
      const fetchCreated = async () => {
        const coll = collection(db, "events");
        const q = query(coll,  where('email', '==', auth.currentUser ? auth.currentUser.email : null));

        const snapshot = await getCountFromServer(q);
        console.log('created count: ', snapshot.data().count);
        console.log(auth.currentUser.email)
        setCreatedCount(snapshot.data().count);
      };
      const fetchUpcoming = async () => {
        const coll = collection(db, "registration");
        const q = query(coll,  where('email', '==', auth.currentUser ? auth.currentUser.email : null),
        where('when', '>=', new Date()));

        const snapshot = await getCountFromServer(q);
        console.log('registered count: ', snapshot.data().count);

        setUpcomingCount(snapshot.data().count);
      };
      const fetchRegistered = async () => {
        const coll = collection(db, "registration");
        const q = query(coll, where('email', '==', auth.currentUser ? auth.currentUser.email : null));

        const snapshot = await getCountFromServer(q);
        console.log('registered count: ', snapshot.data().count);
        console.log(auth.currentUser.email)
        setRegisteredCount(snapshot.data().count);
      };
      fetchUpcoming()
      fetchCreated();
      fetchRegistered();

    
    }catch(error){
        console.log(error)
    }
   
  }, []);

  const renderItem = ({item,handle}) => {
    const backgroundColor = item.id === selectedId ? '#7865f0' : '#f1f0f4' ;
    const color = item.id === selectedId ? 'white' : 'black';
    const count =       item.id === 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba' ? upcomingCount :
    item.id === '3ac68afc-c605-48d3-a4f8-fbd91aa97f63' ? registeredCount :
    item.id === '58694a0f-3da1-471f-bd96-145571e29d72' ? createdCount :
           
              0;
    
    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id)
            navigation.navigate(item.title, {
  
          });
        }}
        backgroundColor={backgroundColor}
        textColor={color}
        count={count}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
  },
  item: {
    height:164,
    minWidth:320,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c7c4ce',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16
  },
  number: {
    fontSize: 24,
    fontWeight:'bold'
  },
});

export default CardList;