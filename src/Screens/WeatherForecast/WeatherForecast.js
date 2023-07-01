//import liraries
import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {GET_WEATHER, SEARCH_COUNTRY} from '../../config/url';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import {moderateScale, textScale, width} from '../../styles/responsiveSize';

// create a component
const WeatherForecast = () => {
  const [searchVisibility, setSearchVisibtility] = useState(false);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState([]);
  const [samedayWeather, setSameDayWeather] = useState([]);

  const toggleSearch = () => {
    setSearchVisibtility(!searchVisibility);
  };

  console.log(samedayWeather,"samedayWeather")

  useEffect(() => {
    search.length && searchCountry();
  }, [search]);
  useEffect(() => GetWeather(), []);

  const searchCountry = () => {
    let query = `&q=${search}`;
    axios
      .get(SEARCH_COUNTRY + query)
      .then(res => {
        setLocations(res?.data);
      })
      .catch(error => console.log(error, 'getweather catch error'));
  };

  const GetWeather = (city = 'Abohar') => {
    let query = `&q=${city}&days=7&aqi=yes&alerts=yes`;
    axios
      .get(GET_WEATHER + query)
      .then(res => {
        console.log(res, 'weather report list');
        setWeather(res?.data);
        setSameDayWeather(res?.data?.current);
        toggleSearch();
        setSearch('');
      })
      .catch(error => console.log(error, 'getweather catch error'));
  };

  return (
    <ImageBackground source={imagePath.weatherBg} style={styles.container}>
      <SafeAreaView style={{marginHorizontal: moderateScale(20)}}>
        {/* search bar and search results */}
        <View
          style={{
            ...styles.searchMainView,
            backgroundColor: searchVisibility
              ? 'rgba(255,255,255,0.2)'
              : 'transparent',
          }}>
          <View>
            {searchVisibility ? (
              <TextInput
                placeholder="Search City"
                style={styles.searchTxtInput}
                placeholderTextColor={colors.whiteOpacity50}
                value={search}
                onChangeText={setSearch}
              />
            ) : null}
          </View>

          <TouchableOpacity onPress={toggleSearch} style={styles.searchView}>
            <Image source={imagePath.search} style={styles.search} />
          </TouchableOpacity>
        </View>

        {/* forecastView */}
        <View style={styles.forecastView}>
          <Text style={styles.cityName}>
            {weather?.location?.name},{' '}
            <Text style={{color: colors.whiteOpacity70}}>
              {weather?.location?.country}
            </Text>
          </Text>
          <Image
            source={{uri: `https:${samedayWeather?.condition?.icon || samedayWeather?.day?.condition?.icon}`}}
            style={{...styles.cloudImg}}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={styles.mainTemp}>{samedayWeather?.temp_c || samedayWeather?.day?.avgtemp_c}&#176;C</Text>
            <Text style={styles.dayInShortTxt}>
              {samedayWeather?.condition?.text || samedayWeather?.day?.condition?.text}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: width - 40,
              ...commonStyles.rowSpaceBtwAlCen,
            }}>
            <View style={commonStyles.rowAlignCen}>
              <Image source={imagePath.wind} style={styles.tempIcon} />
              <Text style={styles.dayInShortTxt}>
                {samedayWeather?.wind_kph || samedayWeather?.day?.maxwind_kph} Km/hr
              </Text>
            </View>
            <View style={commonStyles.rowAlignCen}>
              <Image source={imagePath.humidity} style={styles.tempIcon} />
              <Text style={styles.dayInShortTxt}>
                {samedayWeather?.humidity || samedayWeather?.day?.avghumidity}%
              </Text>
            </View>
            <View style={commonStyles.rowAlignCen}>
              <Image source={imagePath.sun} style={styles.tempIcon} />
              <Text style={styles.dayInShortTxt}>
                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.dailyforecastView}>
            <Image source={imagePath.calender} style={styles.tempIcon} />
            <Text style={styles.weatherTemp}>Daily Forecast</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {weather?.forecast?.forecastday?.map((item, index) => {
              const date = new Date(item.date);
              const options = {weekday: 'long'};
              let dayName = date.toLocaleDateString('en-US', options);
              dayName = dayName.split(',')[0];

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSameDayWeather(item)}
                  style={styles.dayWeatherView}>
                  <Image
                    source={{
                      uri: `https:${item?.day?.condition?.icon}`,
                    }}
                    style={styles.dayWeatherIcon}
                  />
                  <Text style={styles.weatherDay}>{dayName}</Text>
                  <Text style={styles.weatherTemp}>
                    {item?.day?.avgtemp_c}&#176;
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {locations && locations.length && searchVisibility ? (
          <View style={styles.searchListContainer}>
            {locations.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => GetWeather(item?.name)}
                  style={{
                    borderBottomWidth: index == locations.length - 1 ? 0 : 1,
                    ...styles.searchItemView,
                  }}>
                  <Text>
                    {item?.name}, {item?.region}, {item?.country}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </SafeAreaView>
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  searchView: {
    padding: moderateScale(12),
    backgroundColor: colors.lightGrey,
    borderRadius: moderateScale(30),
  },
  searchTxtInput: {
    width: width - 98,
    paddingLeft: moderateScale(15),
    fontSize: textScale(16),
    // backgroundColor:'red'
  },
  searchMainView: {
    ...commonStyles.rowSpaceBtwAlCen,
    borderRadius: moderateScale(30),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
  forecastView: {
    //   flex:0.5,
    height: moderateScale(500),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor:'red',
  },
  cloudImg: {
    height: moderateScale(150),
    width: moderateScale(150),
  },
  tempIcon: {
    height: moderateScale(22),
    width: moderateScale(22),
    marginRight: moderateScale(10),
    tintColor: colors.whiteOpacity70,
  },
  dayWeatherIcon: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  dayWeatherView: {
    alignItems: 'center',
    backgroundColor: colors.whiteOpacity25,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    paddingBottom: moderateScale(15),
    marginRight: moderateScale(18),
  },
  weatherDay: {
    fontSize: textScale(14),
    marginTop: moderateScale(12),
    color: colors.white,
    marginBottom: moderateScale(5),
  },
  weatherTemp: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    color: colors.whiteOpacity70,
  },
  dailyforecastView: {
    ...commonStyles.rowAlignCen,
    marginBottom: moderateScale(12),
  },
  mainTemp: {
    fontSize: textScale(60),
    fontWeight: '600',
    color: colors.white,
  },
  dayInShortTxt: {
    fontSize: textScale(18),
    fontWeight: '700',
    color: colors.whiteOpacity70,
  },
  cityName: {
    fontSize: textScale(22),
    fontWeight: '700',
    color: colors.white,
  },
  searchItemView: {
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    borderColor: colors.graphGrey,
  },
  searchListContainer: {
    //   height: moderateScale(100),
    backgroundColor: colors.white,
    marginTop: moderateScale(10),
    borderRadius: moderateScale(30),
    padding: moderateScale(15),
    position: 'absolute',
    top: moderateScale(110),
    width: width - 45,
  },
});

//make this component available to the app
export default WeatherForecast;
