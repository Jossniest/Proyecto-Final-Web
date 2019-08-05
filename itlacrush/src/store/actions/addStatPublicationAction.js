
import Firebase from "../../config/fire";
const databaseRef = Firebase.publication;


export const TODO_ADDED = "added";
export const ERROR = "error"

const addStatPublicationAction = (
    title,
    selectuser,
    otheruser,
    img,
    body,
    url,
    publicConfession,
    privatePublication,
    name,
    lastname,
    id,
    createdAt
  ) => async dispatch => {
    databaseRef
      // the push function will send to our firebase the new object
      .push()
      // and will set in a new row of the table stat-cards
      // with the bellow object
      .set({
        title: title,
        selectuser: selectuser,
        otheruser: otheruser,
        img: img,
        body: body,
        url: url,
        publicConfession: publicConfession,
        privatePublication: privatePublication,
        name: 'Jose',
        lastname: 'Caminero',
        id: '123',
        createdAt: new Date()
      })
      // when the push has terminated, we will dispatch to our
      // reducer that we have successfully added a new row
      .then(() => {
        dispatch({
          type: TODO_ADDED
          
        });
      });
  };

export default addStatPublicationAction;