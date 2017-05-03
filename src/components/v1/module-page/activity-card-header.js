import { capitalize } from 'lodash';

export default function(type) {
  if (type === 'announcement') {
    return 'made a new Announcement in'
  } else if (type === 'assignment') {
    return 'assigned a new Assignment in'
  } else {
    return `uploaded a new ${capitalize(type)} in`
  }
}