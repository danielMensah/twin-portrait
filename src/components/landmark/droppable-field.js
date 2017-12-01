import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLandmark } from '../../actions/landmark-select-actions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorder, getListStyle } from '../../util/managers/dnd-manager';
import DraggableItem from './draggable-item';
import KeyGen from '../../util/landmark-key-generator';

let landmarkObjectArray = [];

class DroppableField extends Component {

  static propTypes = {
    landmarks: PropTypes.array.isRequired,
    landmarkName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.landmarks,
      objectOfItems: {}
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.handleLandmarkList();
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({ items });

    this.handleLandmarkList();
  }

  handleLandmarkList() {
    const { selectLandmark, landmarkName } = this.props;
    const { items } = this.state;

    let newLandmarkObj = {};
    newLandmarkObj[landmarkName] = items.map((item) => KeyGen(item.name));

    landmarkObjectArray.forEach((e, index) => {
      if (Object.keys(e)[0] === landmarkName) {
        landmarkObjectArray.splice(index, 1);
      }
    });

    landmarkObjectArray.push(newLandmarkObj);
    selectLandmark(landmarkObjectArray);

  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction={'horizontal'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {this.state.items.map(item => <DraggableItem key={item.name} item={item}/>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateProps = ({landmarkSelect}) => ({
  selectedLandmarks: landmarkSelect
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLandmark }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(DroppableField);