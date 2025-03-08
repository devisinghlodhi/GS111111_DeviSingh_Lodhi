import { createReducer, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  store_data: any[];
  sku_data: any[];
}

const initialState: DataState = {
  store_data: [],
  sku_data: [],
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      (action): action is PayloadAction<undefined> => action.type === 'add_store',
      (state, action) => {
        state.store_data = [...state?.store_data, action.payload];
      }
    )
    .addMatcher(
      (action): action is PayloadAction<any> => action.type === 'update_store',
      (state, action) => {
        state.store_data = state.store_data.map((item)=>{
          if(item.seqNo === action.payload.seqNo){
            return {...item, ...action.payload}
          }else{
            return item;
          }
        });
      }
    )
    .addMatcher(
      (action): action is PayloadAction<undefined> => action.type === 'delete_store',
      (state, action) => {
        state.store_data = state.store_data.filter((item)=>item.seqNo !== action.payload);
      }
    )   
    .addMatcher(
      (action): action is PayloadAction<undefined> => action.type === 'add_sku',
      (state, action) => {
        state.sku_data = [...state?.sku_data, action.payload];
      }
    )
    .addMatcher(
      (action): action is PayloadAction<any> => action.type === 'update_sku',
      (state, action) => {
        state.sku_data = state.sku_data.map((item)=>{
          if(item.id === action.payload.id){
            return {...item, ...action.payload}
          }else{
            return item;
          }
        });
      }
    )
    .addMatcher(
      (action): action is PayloadAction<undefined> => action.type === 'delete_sku',
      (state, action) => {
        state.sku_data = state.sku_data.filter((item)=>item.id !== action.payload);
      }
    )   
});