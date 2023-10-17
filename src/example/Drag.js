import React, { useRef, useState, useCallback } from 'react';
import PropTest from './PropTest';

export default function Drag() {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [propList, setPropList] = useState([
    {propType : 'type 1', propVal : 'val 1'},
    {propType : 'type 2', propVal : 'val 2'},
    {propType : 'type 3', propVal : 'val 3'},
    {propType : 'type 4', propVal : 'val 4'},
    {propType : 'type 5', propVal : 'val 5'},
    {propType : 'type 6', propVal : 'val 6'}
  ]);

  const dragStart = idx => {
    dragItem.current = idx;
  };

  const dragEnter = idx => {
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...propList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPropList(copyListItems);
    console.log('드랍');
  };

  const newProp = () => {
    setPropList([...propList, {propType : "", propVal : ""}])
  };

  return (
    <>
      {propList &&
        propList.map((item, index) => {
          return <div
          style={{
            backgroundColor: 'lightblue',
            margin: '20px 25%',
            textAlign: 'center',
            fontSize: '20px',
          }}
          onDragStart={() => dragStart(index)}
          onDragEnter={() => dragEnter(index)}
          onDragOver={e => e.preventDefault()}
          onDragEnd={drop}
          key={index}
          draggable>
          <PropTest propType={item.propType} propVal={item.propVal}/>
          <p>{item.propType}</p>
        </div>
        })
      }
      <button onClick={() => newProp()}>+ 추가하기</button>
    </>
  );
}