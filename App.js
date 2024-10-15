// import React from 'react';
// import { Text, View } from 'react-native';

// const App = () => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Autierus a gostosa</Text>
//     </View>
//   );
// };

// export default App;
// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';

// const App = () => {
//   return <AppNavigator />;
// };

// export default App;

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';
import { UserProvider } from './src/screens/ThemeContext';
const App = () => {
  return <UserProvider>
    <AppNavigator />
  </UserProvider>;
  
  // return <AppNavigator />;
};

export default App;

App.js