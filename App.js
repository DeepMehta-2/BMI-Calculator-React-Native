import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, StyleSheet, Text, View, Button, Switch } from 'react-native';


export default function App() {

  const [height, setHeight] = React.useState()
  const [weight, setWeight] = React.useState()
  const [result, setResult] = React.useState()
  const [measurement, setMeasurement] = React.useState(true)
  const toggleSwitch = () => setMeasurement(previousState => !previousState)

  const calculate = (height, weight) => {
    //calculation

    if (measurement) {
      // inchs/Lbs
      var result = ((parseFloat(weight)) / (parseFloat(height) * parseFloat(height))) * 703;
    } else {
      //cms/kg
      var result = (parseFloat(weight) * 10000) / (parseFloat(height) * parseFloat(height));
    }
    result = result.toFixed(2);

    if (result < 18.5) {
      setResult(result + '\nUnderweight')
    }
    else if (result >= 18.5 && result <= 24.9) {
      setResult(result + '\nNormal weight')
    }
    else if (result >= 25 && result <= 29.9) {
      setResult(result + '\nOverweight')
    }
    else if (result >= 30) {
      setResult(result + '\nObesity')
    }
  }
  return (

    <View style={styles.container}>

      <Text style={styles.title}>BMI Calculator</Text>

      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

        <Text style={styles.label}>cms/kgs</Text>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          onValueChange={toggleSwitch}
          value={measurement}
        />

        <Text style={styles.label}>in/lbs</Text>

      </View>

      <Text style={styles.label}>Height</Text>

      <TextInput style={styles.input}
        placeholder="Height"
        keyboardType='number-pad'
        onChangeText={text => setHeight(text)} />

      <Text style={styles.label}>Weight</Text>

      <TextInput style={styles.input}
        placeholder="Weight"
        keyboardType='number-pad'
        onChangeText={text => setWeight(text)} />

      <Button
        style={styles.submitButton}
        onPress={() => calculate(height, weight)}
        title="Calculate" />

      <Text style={styles.resultText}>{result}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    width: 100,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#ff6666',
    padding: 10,
    margin: 15,
    height: 45,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  resultText: {
    margin: 20,
    textAlign: "center",
    fontSize: 30,
    color: 'blue'
  },
  label: {
    textAlign: "center",
  }
});
