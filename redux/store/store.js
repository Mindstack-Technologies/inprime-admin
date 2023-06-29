// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers'

// const store = configureStore({
//   reducer: rootReducer
// })
// export default store;


// import { configureStore } from '@reduxjs/toolkit'

// import profileReducer from '../transfer/transferDetails'

// export default configureStore ({

//     reducer: {
//         profile: profileReducer
//     }
// })


// store.js
import { configureStore } from '@reduxjs/toolkit';
// import profileReducer from '../transfer/transferDetails';
import labelReducer from '../transfer/transferDetails';

export default configureStore({
  reducer: {
    // profile: profileReducer,
    label: labelReducer,
  },
});




// import { configureStore } from '@reduxjs/toolkit';
// import conditionsReducer from '../transfer/conditionalSlice';

// const store = configureStore({
//   reducer: {
//     conditions: conditionsReducer,
//   },
// });

// export default store;
