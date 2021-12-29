import React, { useState, useContext } from 'react'
import { deleteItem } from '../../services/deleteService';
import { ContentContext } from '../../context/contentContext';

const EditItemControls = ({ itemId, itemType }: EditItemControlsProps): JSX.Element => {
  const { setAddItem, setUpdateItem } = useContext(ContentContext)
  const [editControlsVisible, setEditControlsVisible] = useState<boolean>(false);

  return (
    <div className="edit-menu">
      {editControlsVisible && (
        <div className="edit-menu__controls">
          {/* DELETE */}
          <button
            className="edit-menu__controls-btn btn delete"
            id={`delete-${itemId}`}
            value="delete"
            onClick={() => deleteItem(itemId, itemType)}
          >
            <i className="fas fa-trash-alt fa-1x"></i>
          </button>

          {/* UPDATE */}
          <button
            className="edit-menu__controls-btn btn update"
            id={`update-${itemId}`}
            value="update"
            onClick={() => setUpdateItem(itemType)}
          >
            <i className="fas fa-pen fa-1x"></i>
          </button>
        </div>
      )}

      {/* TOGGLE BUTTONS */}
      <button
        className="edit-menu__toggle-controls"
        value="update"
        onClick={() => setEditControlsVisible(!editControlsVisible)}
      >
        <i className="fas fa-ellipsis-v fa-1x"></i>
      </button>
    </div>
  )
}

export default EditItemControls;