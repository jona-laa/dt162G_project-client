import React, { useContext } from 'react'
import { ContentContext } from '../../context/contentContext';

const AddItemButton = ({ itemType, color }: AddItemButtonProps): JSX.Element => {
  const { setAddItemType } = useContext(ContentContext)

  return (
    <button
      className="add-item-btn"
      style={{
        color: color
      }}
      aria-label={`add ${itemType} item`}
      value={`add ${itemType} item`}
      onClick={() => setAddItemType(itemType)}
    >
      +
    </button>
  )
}

export default AddItemButton;