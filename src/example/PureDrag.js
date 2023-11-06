import React, { useRef, useState, useContext } from 'react';
import PropTest from './PropTest';

export default function PureDrag({propList = [], onChange = f => f}) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [summonedCnt, setSummonedCnt] = useState(0)

  const dragStart = idx => {
    console.log("지금 이걸 드래그하는 중", idx);
    dragItem.current = idx;
  };

  const dragEnter = idx => {
    console.log("지금 여길 지나다니는 중", idx);
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...propList];
    console.log("지금 레퍼런스 내놔", dragItem)
    const dragItemContent = copyListItems[dragItem.current];
    console.log("지금 드래그 내놔", dragItemContent)
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    console.log("드래그 결과 내놔", copyListItems);
    onChange(copyListItems);
  };

  const newProp = () => {
    setSummonedCnt(summonedCnt + 1)
    onChange([...propList, {key : summonedCnt, propType : "", propVal : "", isSafe : false, isEdited : false}])
  };

  const setType = (index, value) => {
    let newList = editRes(index, "propType", value);
    let propTypeList = newList.map(prop => prop.propType)
    newList = newList.map((prop, idx) => {return {...prop, isSafe : checkQuality(idx, prop.propType, propTypeList)}})
    newList[index].isSafe = checkQuality(index, value, propTypeList)
    onChange(newList)
  }

  const setVal = (index, value) => {
    onChange(editRes(index, "propVal", value))
  }

  const editRes = (index, prop, value) => {
    let newList = [...propList]
    newList[index][prop] = value
    return newList
  }

  function checkQuality(index, value, propTypeList) {
    // 비어있지 않으면 일단 합격
    return value !== "" && ! propTypeList.filter((_, idx) => idx !== index).includes(value)
  }

  const onRemove = (index) => {
    onChange([...propList].filter((_, idx) => {return idx !== index}))
  }

  console.log("지금 반영 안 돼?", propList && ! propList.length > 0 &&
  ! propList.reduce((accumulator, currentValue) => accumulator && currentValue.isSafe, true))

  return (
    <>
      {propList && propList.length > 0 ?
        propList.map((item, index) => {
          console.log("이 아이템은 뭐야?", item)
          let bgColor = item.isSafe ? 'lightblue' : 'pink'
          return <div
          style={{
            backgroundColor: bgColor,
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