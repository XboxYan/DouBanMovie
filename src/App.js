import React, { PureComponent } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import { Platform } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import Home from './pages/Home';
import Movie from './pages/Movie';
import Live from './pages/Live';
import Me from './pages/Me';
import HomeMore from './pages/Home/HomeMore';
import MovieDetail from './pages/MovieDetail';
import Comment from './pages/MovieDetail/Comment';

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
const MainApp = StackNavigator({
    Root: { screen: Home,path:'home/root' },
    HomeMore:{ screen: HomeMore },
    MovieDetail:{ 
        screen: MovieDetail,
        path:'movie/:movieid'
    },
    Comment:{screen:Comment}
},StackNavigatorConfig);

const prefix = Platform.OS == 'android' ? 'doubanmovie://doubanmovie/' : 'doubanmovie://';

const App = () => <MainApp uriPrefix={prefix} />;

export default App;