export default function (facialHair) {
  facialHair = facialHair.options[facialHair.selectedIndex].value;

  switch (facialHair) {
    case 'none':
      facialHair = { mustache: false, beard: false };
      break;
    case 'mustache':
      facialHair = { mustache: true, beard: false };
      break;
    case 'beard':
      facialHair = { mustache: false, beard: true };
      break;
    default:
      facialHair = { mustache: true, beard: true };
  }

  return facialHair;
}