import { combineReducers } from "redux";

const galleryReducer = (state = { gallery: [] }, action) => {
    switch (action.type) {
        case "SET_GALLERY":
            return {
                ...state,
                gallery: action.payload,
            };

        default:
            return state;
    }
};

const communityReducer = (state = { community: [] }, action) => {
    switch (action.type) {
        case "SET_COMMUNITY":
            return {
                ...state,
                community: action.payload,
            };

        default:
            return state;
    }
};

const reducers = combineReducers({
    galleryReducer,
    communityReducer,
});

export default reducers;
