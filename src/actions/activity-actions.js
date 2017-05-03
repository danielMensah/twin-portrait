import ActionTypes from '../constants/action-types'

const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at tellus at dolor mattis accumsan at non orci. Cras nec mollis nunc. Morbi tempus, nunc eget ultricies euismod, purus massa consequat nisl, nec efficitur neque mauris sed felis. Maecenas dapibus mauris efficitur eros blandit, eget laoreet tellus blandit. Nulla congue lacus non vulputate lacinia. Sed sit amet leo sed dui ultricies sagittis. Donec at turpis vitae ipsum mollis porttitor sit amet ac enim. Phasellus suscipit lacus auctor, hendrerit ligula at, consequat dui. Quisque pulvinar scelerisque purus, ut porttitor dui luctus sed. Pellentesque vitae gravida ligula.';

const testJson = {
  activities : [
    {
      type: "announcement",
      author: "Jessica Jones",
      content: content,
      module: "Programming 2",
      date: "yesterday",
      comments: [
        {
          author: "Daniel Mensah",
          comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          date: "2 hours ago"
        },
        {
          author: "John Mainer",
          comment: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          date: "3 minutes ago"
        }
      ]
    },
    {
      type: "workshop",
      author: "Luke Cage",
      content: content,
      module: "Database",
      date: "15 days ago",
      comments: [
        {
          author: "Dave Rogue",
          comment: "When an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          date: "a minutes ago"
        },
        {
          author: "Elena Mu",
          comment: "Okay thanks.",
          date: "yesterday"
        }
      ]
    }
  ]
};

export function fetchActivities() {

  return dispatch => {
    dispatch({
      type: ActionTypes.ACTIVITIES.FETCH_ACTIVITIES,
      payload: testJson
    });
  }
}