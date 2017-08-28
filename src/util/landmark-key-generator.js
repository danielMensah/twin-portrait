export default function (landmarkName, landmark) {
  const landmark1 = landmark === 'eyebrows' ? 'eb' : landmark;
  return `${landmark1.toUpperCase()}_${landmarkName.replace(/\s/g, '_').toUpperCase()}`;
}