import React, { useState, useContext } from 'react'
import { deleteItem } from '../../services/deleteService';
import { ContentContext } from '../../context/contentContext';
import { AuthContext } from '../../context/authContext';

const EditItemControls = ({ item, itemType, color }: EditItemControlsProps): JSX.Element => {
  // App State - Context
  const { setUpdateItemType, setUpdateItem } = useContext(ContentContext);
  const { authToken } = useContext(AuthContext);
  // Component State - Show Controls or Not
  const [editControlsVisible, setEditControlsVisible] = useState<boolean>(false);

  return (
    <div className="edit-menu">
      {editControlsVisible && (
        <div className="edit-menu__controls">
          {/* DELETE */}
          <button
            className="edit-menu__controls-btn btn delete"
            id={`delete-${item._id}`}
            value="delete"
            onClick={() => deleteItem(item._id, itemType, authToken)}
          >
            <i className="fas fa-trash-alt fa-1x"></i>
          </button>

          {/* UPDATE */}
          <button
            className="edit-menu__controls-btn btn update"
            id={`update-${item._id}`}
            value="update"
            onClick={() => {
              setUpdateItemType(itemType)
              setUpdateItem(item)
              setEditControlsVisible(!editControlsVisible)
            }}
          >
            <i className="fas fa-pen fa-1x"></i>
          </button>
        </div>
      )}

      {/* TOGGLE BUTTONS */}
      <button
        className="edit-menu__toggle-controls"
        value="update"
        style={{
          color: color
        }}
        onClick={() => {
          setEditControlsVisible(!editControlsVisible)
        }}
      >
        <i className="fas fa-ellipsis-v fa-1x"></i>
      </button>
    </div>
  )
}

export default EditItemControls;