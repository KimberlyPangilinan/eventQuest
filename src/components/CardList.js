import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

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

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.number, {color: textColor}]}>80</Text>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const CardList = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item,handle}) => {
    const backgroundColor = item.id === selectedId ? '#7865f0' : '#f1f0f4' ;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id)
            navigation.navigate('Details', {
            itemId: item.id,
            otherParam: 'anything you want here',
          });
        
        }}
        backgroundColor={backgroundColor}
        textColor={color}
        
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