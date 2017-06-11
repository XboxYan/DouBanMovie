import React, { PureComponent } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import Home from './pages/Home';
import Movie from './pages/Movie';
import Live from './pages/Live';
import Me from './pages/Me';

//TabNavigatorConfig
const TabNavigatorConfig = {
    tabBarComponent:TabBarBottom,
    tabBarPosition:'bottom',
    animationEnabled:false,
    lazy:true,
    swipeEnabled:false,
    tabBarOptions:{
        showLabel:false,
        style:{
            height:48,
            backgroundColor: '#fff',
            borderTopWidth:0,
        }
    },
    
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
    headerMode:'none'
}
//StackNavigator
const App = StackNavigator({
    Root: { screen: Root },
},StackNavigatorConfig);

export default App;