import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Modal,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useState } from "react";
  import DatePicker from "react-native-modern-datepicker";
  import { getFormatedDate } from "react-native-modern-datepicker";
  
  export default function Picker({selectedStartDate,minimumDate,selected,onSelectedChange,onDateChanged}) {
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
      today.setDate(today.getDate() + 1),
      "YYYY/MM/DD"
    );
  
    
    const handleOnPressStartDate = () => {
      setOpenStartDatePicker(!openStartDatePicker);
    };
    return (
      <>
       
          <View>
                <TouchableOpacity
                  style={styles.inputBtn}
                  onPress={handleOnPressStartDate}
                >
                  <Text>{selectedStartDate}</Text>
                </TouchableOpacity>
           
  
            {/* Create modal for date picker */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={openStartDatePicker}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    minuteInterval={15}
                    minimumDate={startDate}
                    selected={selected}
                    onDateChanged={onDateChanged}
                    onSelectedChange={onSelectedChange}
                    options={{
                      backgroundColor: "#080516",
                      textHeaderColor: "#469ab6",
                      textDefaultColor: "#FFFFFF",
                      selectedTextColor: "#FFF",
                      mainColor: "#469ab6",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />
              
                  
                  <TouchableOpacity onPress={handleOnPressStartDate}>
                    <Text style={{ color: "white" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
      
      </>
    );
  }
  
  const styles = StyleSheet.create({

    inputBtn: {width:'100%',
        height: 40,
        minWidth:100,
        width: 321,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#a0a0a0',
        padding: 8,
        marginBottom: 10,
        backgroundColor:'#fff9',
        borderRadius:8
      },
      submitBtn: {
        backgroundColor: "#342342",
        paddingVertical: 22,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 12,
        marginVertical: 16,
      },
   
    modalView: {
      margin: 20,
      backgroundColor: "#080516",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      padding: 35,
      width: "90%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });