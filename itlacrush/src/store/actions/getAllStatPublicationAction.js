import Firebase from "../../config/fire";

export const GET_TODO = "getting"

const databaseRef = Firebase.publication;
// this is to get the stat-cards table from firebase


const getAllStatPublicationAction = (publication) => async dispatch => {
  // this function will get all the entires of the
  // stat-cards table, in a json format
  databaseRef.on("value", snapshot => {
    dispatch({
      type: "getAllStatCards",
      // if the json returns null, i.e. the
      // stat-cards table is blank - empty
      // then we'll return an empty object
      payload: snapshot.val() || {}
    });
  });
};
export default getAllStatPublicationAction;