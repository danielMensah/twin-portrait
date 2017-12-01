import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import { getItemStyle } from '../../util/managers/dnd-manager';
import {Image} from 'react-bootstrap';

class DraggableItem extends Component {

  static propTypes = {
    item: PropTypes.any.isRequired
  };

  render() {
    const { item } = this.props;

    return (
      <Draggable key={item.name} draggableId={item.name}>
        {(provided, snapshot) => (
          <div>
            <div ref={provided.innerRef}
                 style={getItemStyle(
                   provided.draggableStyle,
                   snapshot.isDragging
                 )}
                 {...provided.dragHandleProps}>
              <div>
                <Image style={{marginBottom: '10px'}} src={item.img}/>
                {item.name}
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

export default DraggableItem;