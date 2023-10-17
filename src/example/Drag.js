import React, { useRef, useState } from 'react';

export default function Drag() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
  ]);

  const dragStart = idx => {
    dragItem.current = idx;
  };

  const dragEnter = idx => {
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...list];
    const dragItemConotent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemConotent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    console.log('드랍');
  };
  return (
    <>
      {list &&
        list.map((item, index) => (
          <div
            style={{
              backgroundColor: 'lightblue',
              margin: '20px 25%',
              textAlign: 'center',
              fontSize: '40px',
            }}
            onDragStart={() => dragStart(index)}
            onDragEnter={() => dragEnter(index)}
            onDragOver={e => e.preventDefault()}
            onDragEnd={drop}
            key={index}
            draggable>
            {item}
          </div>
        ))}
    </>
  );
}