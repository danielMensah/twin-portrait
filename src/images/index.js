import almond from './eyes/EYE_ALMOND.png';
import deepSet from './eyes/EYE_DEEP_SET.png';
import downturned from './eyes/EYE_DOWNTURNED.png';
import hooded from './eyes/EYE_HOODED.png';
import flatShaped from './eye-brows/EB_FLAT_SHAPED.png';
import hardAngled from './eye-brows/EB_HARD_ANGLED.png';
import rounded from './eye-brows/EB_ROUNDED.png';
import aquiline from './noses/NOSE_AQUILINE.png';
import flat from './noses/NOSE_FLAT.png';
import hooked from './noses/NOSE_HOOKED.png';
import snub from './noses/NOSE_SNUB.png';

export const NOSES = [
  {
    img: aquiline,
    name: 'Aquiline',
    key: 'NOSE_AQUILINE'
  },
  {
    img: flat,
    name: 'Flat',
    key: 'NOSE_FLAT'
  },
  {
    img: hooked,
    name: 'Roman Hooked',
    key: 'NOSE_ROMAN_HOOKED'
  },
  {
    img: snub,
    name: 'Snub',
    key: 'NOSE_SNUB'
  }
];

export const EYEBROWS = [
  {
    img: flatShaped,
    name: 'Flat Shaped',
    key: 'EB_FLAT_SHAPED'
  },
  {
    img: hardAngled,
    name: 'Angled',
    key: 'EB_ANGLED'
  },
  {
    img: rounded,
    name: 'Rounded',
    key: 'EB_ROUNDED'
  }
];

export const EYES = [
  {
    img: almond,
    name: 'Monolid Almond',
    key: 'EYE_MONOLID_ALMOND'
  },
  {
    img: deepSet,
    name: 'Deep Set',
    key: 'EYE_DEEP_SET'
  },
  {
    img: downturned,
    name: 'Downturned',
    key: 'EYE_DOWNTURNED'
  },
  {
    img: hooded,
    name: 'Hooded',
    key: 'EYE_HOODED'
  }
];