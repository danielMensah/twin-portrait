export default function (landmarkName) {
  return `${landmarkName.replace(/\s/g, '_').toLowerCase()}`;
}