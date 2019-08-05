const INITIAL_STATE = {
    publication: null,
  };

const applySetPublications = (state, action) => ({
    ...state,
    publication: action.publication,
});
  
  
function publicationsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'Publication_added': {
        return applySetPublications(state, action);
      }
      default:
        return state;
    }
}
export default publicationsReducer;