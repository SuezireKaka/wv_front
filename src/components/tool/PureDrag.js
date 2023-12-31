import React, { useRef, useState } from 'react';
import PropTest from 'example/PropTest';

export default function PureDrag({propList = [], onChange = f => f}) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [summonedCnt, setSummonedCnt] = useState(0)

  const dragStart = idx => {
    dragItem.current = idx;
  };

  const dragEnter = idx => {
    dragOverItem.current = idx;
  };

  const drop = () => {
    let min = Math.min(dragItem.current, dragOverItem.current);
    let max = Math.max(dragItem.current, dragOverItem.current);
    // 수정하기로 예약되어 있었거나 min~max에 있는 건 다 수정 예약
    const copyListItems = [...propList].map((prop, idx) => {return {... prop, isEdited : prop.isEdited || (idx >= min && idx <= max)}});
    const dragItemContent = copyListItems[dragItem.current];
    
    
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    onChange(copyListItems);
  };

  const newProp = () => {
    setSummonedCnt(summonedCnt + 1)
    onChange([...propList, {key : summonedCnt, propType : "", propVal : "", isSafe : false, isEdited : true}])
  };

  const setType = (index, value) => {
    let newList = editRes(index, "propType", value);
    let propTypeList = newList.map(prop => prop.propType)
    newList = newList.map((prop, idx) => {return {...prop, isSafe : checkQuality(idx, prop.propType, propTypeList)}})
    newList[index].isSafe = checkQuality(index, value, propTypeList)
    newList[index].isEdited = true;
    onChange(newList)
  }

  const setVal = (index, value) => {
    onChange(editRes(index, "propVal", value))
  }

  const editRes = (index, prop, value) => {
    let newList = [...propList]
    newList[index][prop] = value
    newList[index].isEdited = true;
    return newList
  }

  function checkQuality(index, value, propTypeList) {
    // 비어있지 않으면 일단 합격
    return value !== "" && ! propTypeList.filter((_, idx) => idx !== index).includes(value)
  }

  const onRemove = (index) => {
    onChange([...propList].filter((_, idx) => {return idx !== index}))
  }

  console.log("프로퍼티들 상태 좀 보자", propList)

  return (
    <>
      {propList && propList.length > 0 ?
        propList.map((item, index) => {
          return <div
          style={{
            backgroundColor: item.isSafe ? 'lightblue' : 'pink',
            textAlign: 'center',
          }}
          onDrag={() => dragStart(index)}
          onDragEnter={() => dragEnter(index)}
          onDragOver={e => e.preventDefault()}
          onDragEnd={drop}
          key={index}
          draggable="true">
          {/* 임시 위치 표시*/}
          <p>{index}</p>
          <PropTest key={index} level={index}
            propType={item.propType}
            propVal={item.propVal}
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