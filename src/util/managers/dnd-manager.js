// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// using some little inline style helpers to make the app look okay
const grid = 10;
export const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  cursor: 'pointer',
  padding: grid * 2,
  margin: `10px`,
  borderRadius: '25%',
  width: '145px',
  textAlign: 'center',
  border: isDragging ? 'solid 5px lightgreen' : 'solid 5px #fff',

  // change background colour if dragging
  background: 'rgb(255, 200, 200)',

  // styles we need to apply on draggables
  ...draggableStyle,
});
export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  display: 'flex',
  margin: "10px 10px 10px 0",
  borderRadius: '10px',
  overflowX: 'scroll'
});