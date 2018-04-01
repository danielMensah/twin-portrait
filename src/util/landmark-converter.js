export default function (key, landmarkName) {
  if (key === 'eyebrows') return `EB_${landmarkName.replace(/\s/g, '_').toUpperCase()}`;
  return `${key.toUpperCase()}_${landmarkName.replace(/\s/g, '_').toUpperCase()}`;
}