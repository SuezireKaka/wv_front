import React, { useRef, useState } from 'react';
import PropTest from './PropTest';

export default function Drag() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const lookUpId = useRef();

  const PROPERTIES_LIST_URL = "http://localhost:8080/tool/anonymous/listPropertiesOf/"

  const [propList, setPropList] = useState([
    {propType : 'type 1', propVal : 'val 1', isSafe : true, lineNum : 1},
    {propType : 'type 2', propVal : 'val 2', isSafe : true, lineNum : 1},
    {propType : 'type 3', propVal : 'val 3', isSafe : true, lineNum : 1},
    {propType : 'type 4', propVal : 'val 4', isSafe : true, lineNum : 1},
    {propType : 'type 5', propVal : 'val 5', isSafe : true, lineNum : 1},
    {propType : 'type 6', propVal : 'val 6', isSafe : true, lineNum : 1}
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

  function lookUp(id) {
    let uri = PROPERTIES_LIST_URL + id
    fetch(uri).then(response => response.json())
      .then((resData) => {
        setPropList(resData.map(prop => {return {...prop, isSafe : true}}));
      })
      .catch(setPropList([]));
  }

  const newProp = () => {
    setPropList([...propList, {propType : "", propVal : ""}])
  };

  const setType = (index, value) => {
    let [newList, propTypeList] = editRes(index, "propType", value);
    let safe = checkQuality(value, propTypeList)
    if (safe) {
      newList = newList.map(prop => {
        let safe = value !== prop.propType
        return {...prop, isSafe : safe}
      })
    }
    newList[index].isSafe = ! propTypeList.includes(value)
    setPropList(newList)
  }

  const setVal = (index, value) => {
    setPropList(editRes(index, "propVal", value)[0])
  }

  const editRes = (index, prop, value) => {
    let newList = [...propList]
    let propTypeList = newList.map(prop => prop.propType)
    newList[index][prop] = value
    return [newList, propTypeList]
  }

  function checkQuality(value) {
    // 비어있지 않으면 일단 합격
    return value !== ""
  }

  const onRemove = (index) => {
    setPropList([...propList].filter((_, idx) => {return idx !== index}))
  }

  console.log(propList)

  return (
    <>
      <input ref={lookUpId} type="text" placeholder='커스텀 오브젝트 ID'/>
      <button onClick={e => lookUp(lookUpId.current.value)}>조회하기</button>
      <br/>
      <button>저장하기</button>
      {propList && propList.length > 0 ?
        propList.map((item, index) => {
          return <div
          style={{
            backgroundColor: 'lightblue',
            margin: '20px 30%',
            textAlign: 'center',
          }}
          onDragStart={() => dragStart(index)}
          onDragEnter={() => dragEnter(index)}
          onDragOver={e => e.preventDefault()}
          onDragEnd={drop}
          key={index}
          draggable>
          <PropTest key={index} idx={index}
            propType={item.propType}
            propVal={item.propVal}
            lineNum={item.lineNum}
            setType={setType}
            setVal={setVal}
          />
          <br/>
          <button onClick={() => onRemove(index)}>제거하기</button>
          <p style={{color : "#ff0000"}}>
            {item.isSafe
            ? ""
            : item.propType
            ? "속성 이름이 중복되었습니다" 
            : "속성 이름이 비어있습니다"}
          </p>
        </div>
        })
      : <p>{"(속성이 없습니다)"}</p>
      }
      <button onClick={() => newProp()}>+ 추가하기</button>
    </>
  );
}