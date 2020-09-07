import React from 'react';
import { useRoute } from '@react-navigation/native';

import { WebView } from 'react-native-webview';

interface Params {
  html_url: string;
}

const Issue: React.FC = () => {
  const route = useRoute();

  const routeParams = route.params as Params;

  return <WebView source={{ uri: routeParams.html_url }} />;
};

export default Issue;
