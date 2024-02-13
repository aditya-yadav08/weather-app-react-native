import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth:3,
    padding:5,
    paddingVertical:20,
    marginVertical:100,
    marginHorizontal:10,
    backgroundColor: 'white',
    fontSize:19,
    borderRadius:16,
    borderBottomColor: '#518341'
  },
  infoView: {
    alignItems: 'center',
  },
  cityCountryText: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#000',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: '#000',
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: '#000',
    marginVertical: 10,
    fontWeight: '500'
  }
});

const App = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const api = {
    key: 'e884f7efe23a0462217c2817fd436642',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  }

  const fetchDataHandler = useCallback(() => {
    console.log("fired")
      setLoading(true);
      setInput('');
      axios({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch( e => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input])
  
  return (
    <View style={styles.root}>
      <ImageBackground 
        source={require('./assets/bg.jpg')}
        resizeMode='cover'
        style={styles.image}
      >
        <View>
          <TextInput 
            placeholder='Enter city name and press return...'
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color={"#000"}/>
          </View>
        )}
        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {`${data.name}, ${data.sys.country}`}
            </Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(data.main.temp)} °C`}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(data.main.temp_min)} °C / Max ${Math.round(data.main.temp_max)} °C`}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default App;