import React from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import PrepCarousel from '../components/PrepCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';

// todo: move to types file?
type WayfindingStackParamList = {
  WayfindingHome: undefined;
  Route: {
    routeID: string;
    routeTitle: string;
  };
};

type Props = StackScreenProps<WayfindingStackParamList, 'Route'>;

function WFRoutePage({navigation, route}: Props): JSX.Element {
  const {routeID, routeTitle} = route.params;

  const headers = ['Before Procedure', 'During Procedure', 'After Procedure'];

  const images = [
    'https://images.pexels.com/photos/6234634/pexels-photo-6234634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/6129141/pexels-photo-6129141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/6129644/pexels-photo-6129644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ];

  const text = [
    'lorem impsomfalmlkmflkda;nfdsbkjf bahfdvlnjfjhbf nlajhfc mkanh mdjanhf mkdsha;clkjfa n vjdfj m;ldn sh;ljf al;h;la jl njdv jkalmcjf laks cjhd;fhjdsl mjfakld;amj, lmfaj;lfdhnaipg s g;lkajdfon;vja;njhdl;jfondsj;m av njfdsamvfad fvadfdasjmfmcasjdfjaniv jdaLorem ipsum dolor sit amet consectetur adipisicing elit. Ad abquibusdam quidem odio pariatur, ipsam consectetur corruptimaiores!',
    'A fuga et ad aut vero fugiat perferendis pariatur maxime voluptates asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eaque minus commodi eius pariatur nam. Doloremque animi molestiae doloribus eaque, voluptates a consectetur autem corrupti adipisci temporibus, iusto dolore dignissimos?',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque totam quibusdam itaque voluptates dolorum laboriosam corrupti suscipit possimus aliquam, consequuntur odio ut quo nulla non sequi, sit, temporibus tempore. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id ipsa fuga aliquid, soluta delectus placeat, omnis voluptate consequatur in nulla itaque, odit eius ullam expedita? Quam eaque delectus asperiores rem! ',
  ];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <View style={styles.background}>
          <BackButton />
          <PrepCarousel bodyText={text} imageURLs={images} headers={headers} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#003a5d',
    height: '100%',
    display: 'flex',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#003a5d',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default WFRoutePage;
