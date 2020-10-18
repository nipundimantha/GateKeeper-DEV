import {
    SUPPLIER_LIST_REQUEST,
    SUPPLIER_LIST_SUCCESS,
    SUPPLIER_LIST_FAIL,
    SUPPLIER_DETAILS_REQUEST,
    SUPPLIER_DETAILS_SUCCESS,
    SUPPLIER_DETAILS_FAIL,
    SUPPLIER_SAVE_REQUEST,
    SUPPLIER_SAVE_SUCCESS,
    SUPPLIER_SAVE_FAIL,
    SUPPLIER_DELETE_REQUEST,
    SUPPLIER_DELETE_SUCCESS,
    SUPPLIER_DELETE_FAIL,
    SUPPLIER_REVIEW_SAVE_SUCCESS,
    SUPPLIER_REVIEW_SAVE_REQUEST,
    SUPPLIER_REVIEW_SAVE_FAIL,
    SUPPLIER_REVIEW_SAVE_RESET,
  } from '../constants/supplierConstants';

  /**
   * 
   * @param {*} state 
   * @param {*} action 
   */
  
  function supplierListReducer(state = { suppliers: [] }, action) {
    switch (action.type) {
      case SUPPLIER_LIST_REQUEST:
        return { loading: true, suppliers: [] };
      case SUPPLIER_LIST_SUCCESS:
        return { loading: false, suppliers: action.payload };
      case SUPPLIER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function supplierDetailsReducer(state = { supplier: { reviews: [] } }, action) {
    switch (action.type) {
      case SUPPLIER_DETAILS_REQUEST:
        return { loading: true };
      case SUPPLIER_DETAILS_SUCCESS:
        return { loading: false, supplier: action.payload };
      case SUPPLIER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function supplierDeleteReducer(state = { supplier: {} }, action) {
    switch (action.type) {
      case SUPPLIER_DELETE_REQUEST:
        return { loading: true };
      case SUPPLIER_DELETE_SUCCESS:
        return { loading: false, supplier: action.payload, success: true };
      case SUPPLIER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function supplierSaveReducer(state = { supplier: {} }, action) {
    switch (action.type) {
      case SUPPLIER_SAVE_REQUEST:
        return { loading: true };
      case SUPPLIER_SAVE_SUCCESS:
        return { loading: false, success: true, supplier: action.payload };
      case SUPPLIER_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  function supplierReviewSaveReducer(state = {}, action) {
    switch (action.type) {
      case SUPPLIER_REVIEW_SAVE_REQUEST:
        return { loading: true };
      case SUPPLIER_REVIEW_SAVE_SUCCESS:
        return { loading: false, review: action.payload, success: true };
      case SUPPLIER_REVIEW_SAVE_FAIL:
        return { loading: false, errror: action.payload };
      case SUPPLIER_REVIEW_SAVE_RESET:
        return {};
      default:
        return state;
    }
  }
  
  export {
    supplierListReducer,
    supplierDetailsReducer,
    supplierSaveReducer,
    supplierDeleteReducer,
    supplierReviewSaveReducer,
  };
  