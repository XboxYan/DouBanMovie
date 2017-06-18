import React, { PureComponent } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import Home from './pages/Home';
import Movie from './pages/Movie';
import Live from './pages/Live';
import Me from './pages/Me';
import HomeMore from './pages/Home/HomeMore';
import MovieDetail from './pages/MovieDetail';

//TabNavigatorConfig
const TabNavigatorConfig = {
    tabBarComponent:TabBarBottom,
    tabBarPosition:'bottom',
    animationEnabled:false,
    lazy:true,
    //backBehavior:'none',
    swipeEnabled:false,
    tabBarOptions:{
        showLabel:false,
        style:{
            height:48,
            backgroundColor: '#fff',
            borderTopWidth:0,
        }
    }
}

//Root
const Root = TabNavigator({
    Home: { screen: Home },
    Movie: { screen: Movie },
    Live: { screen: Live },
    Me: { screen: Me },
},TabNavigatorConfig);

//StackNavigatorConfig
const StackNavigatorConfig = {
    headerMode:'none',
    navigationOptions:{
        gesturesEnabled:true
    },
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal
    })
}
//StackNavigator
const App = StackNavigator({
    Root: { screen: Root },
    HomeMore:{ screen: HomeMore },
    MovieDetail:{ screen: MovieDetail}
},StackNavigatorConfig);

export default App;