import { isDev } from './env-mode';
export default function (path) {
  return isDev() ? `http://localhost:3000${path}` : `https://twin-portrait.herokuapp.com${path}`;
}