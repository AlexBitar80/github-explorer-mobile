import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Repository from '../pages/Repository';
import Issue from '../pages/Issue';

const Route = createStackNavigator();

const Routes: React.FC = () => (
  <Route.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F5F5F5' },
    }}
  >
    <Route.Screen name="Home" component={Home} />
    <Route.Screen name="Repository" component={Repository} />
    <Route.Screen name="Issue" component={Issue} />
  </Route.Navigator>
);

export default Routes;
