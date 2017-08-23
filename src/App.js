import React, { PureComponent } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import { Platform } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import Home from './pages/Home';
import Movie from './pages/Movie';
import Live from './pages/Live';
import Me from './pages/Me';
import MovieDetail from './pages/Movie/index';
import MovieMore from './pages/Movie/MovieMore';
import Comment from './pages/Movie/Comment';
import Search from './pages/Movie/Search';

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
    cardStyle:{
        backgroundColor:'#f1f1f1',
    },
    navigationOptions:{
        gesturesEnabled:true
    },
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal
    })
}
//StackNavigator
const MainApp = StackNavigator({
    Root: { screen: Home },
    Search:{ screen: Search },
    MovieMore:{ screen: MovieMore },
    MovieDetail:{ 
        screen: MovieDetail,
        path:'movie/:movieid'
    },
    Comment:{
        screen:Comment,      
    }
},StackNavigatorConfig);

const prefix = Platform.OS == 'android' ? 'doubanmovie://doubanmovie/' : 'doubanmovie://';

const App = () => <MainApp uriPrefix={prefix} />;

export default App;