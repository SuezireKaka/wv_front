import React, { useRef, useState } from 'react';
import PropTest from './PropTest';

export default function Drag() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const lookUpId = useRef();

  const PROPERTIES_LIST_URL = "http://localhost:8080/tool/anonymous/listPropertiesOf/"
  const PROPERTIES_SYNC_URL = "http://localhost:8080/tool/anonymous/syncPropertiesOf/"

  /*{propType : 'type 1', propVal : 'val 1', isSafe : true, editType : "R", level : 0},
  {propType : 'type 2', propVal : 'val 2', isSafe : true, editType : "R", level : 1},
  {propType : 'type 3', propVal : 'val 3', isSafe : true, editType : "R", level : 2},
  {propType : 'type 4', propVal : 'val 4', isSafe : true, editType : "R", level : 3}*/

  const [propList, setPropList] = useState();

  // 어떤 때는 인덱스로 해야 하고 어떤 때는 레벨로 해야 하다보니까 난리다 아주
  // 인덱스가 필요한 시점 : create 판단, 정렬시 짝 맞추기
  // 레벨이 필요한 시점 : post시 삭제된 녀석의 정보

  const [initCount, setInitCount] = useState(4);
  const [deleteCount, setDeleteCount] = useState(0);

  const dragStart = idx => {
    dragItem.current = idx;
  };

  const dragEnter = idx => {
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...propList];
    const dragItemContent = copyListItems[dragItem.current];
    let min = Math.min(dragItem.current, dragOverItem.current);
    let max = Math.max(dragItem.current, dragOverItem.current);
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    for (let i = min; i <= max; i++) {
      copyListItems[i].editType = i >= initCount 
        ? "C" 
        : min === max
        ? copyListItems[i].editType
        : copyListItems[i].editType === "D"
        ? "D"
        : "U"
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setPropList(copyListItems);
  };

  function lookUp(id) {
    let uri = PROPERTIES_LIST_URL + id
    fetch(uri).then(response => response.json())
      .then((resData) => {
        setPropList(resData.map((prop) => {return {...prop, isSafe : true, editType : "R"}}));
        setInitCount(resData.length)
      })
      .catch(setPropList([]));
  }

  function commit(id) {
    let uri = PROPERTIES_SYNC_URL + id
    
  }

  const newProp = () => {
    setPropList([...propList, {propType : "", propVal : "", isSafe : false, editType : "C", level : propList.length}])
  };

  const setType = (level, value) => {
    let [newList, propTypeList] = editRes(level, "propType", value);
    let safe = checkQuality(value, propTypeList)
    if (safe) {
      newList = newList.map(prop => {
        let safe = prop.editType === "D" || value !== prop.propType
        return {...prop, isSafe : safe}
      })
    }
    newList.filter().isSafe = safe && ! propTypeList.includes(value) 
    setPropList(newList)
  }

  const setVal = (level, value) => {
    setPropList(editRes(level, "propVal", value)[0])
  }

  const editRes = (level, prop, value) => {
    let newList = [...propList]
    let propTypeList = newList.filter(prop => prop.editType !== "D").map(prop => prop.propType)
    newList[level][prop] = value
    if (index < initCount) {
      newList[index].editType = "U"
    }
    return [newList, propTypeList]
  }

  function checkQuality(value) {
    // 비어있지 않으면 일단 합격
    return value !== ""
  }

  const onRemove = (level) => {
    //setPropList([...propList].filter((_, idx) => {return idx !== index})) - 백앤드 최적화 생각 안 하고 짠 코드
    let copy = [...propList]
    let target = copy.filter(prop => prop.level === level)[0]
    if (target.editType === "C") {
      setPropList(copy.filter(prop => prop.level !== level ))
    }
    else {
      target.editType = "D"
      setDeleteCount(deleteCount + 1)
      setPropList(copy)
    }
    
  }

  // .filter(item => item.editType !== "D") - 유저한테 보일 때 최종적으로 넣기

  return (
    <>
      <input ref={lookUpId} type="text" placeholder='커스텀 오브젝트 ID'/>
      <button onClick={e => lookUp(lookUpId.current.value)}>조회하기</button>
      <br/>
      <button disabled={
        ! propList.reduce((accumulator, currentValue) => accumulator && currentValue.isSafe, true)
      } onClick={e => commit(lookUpId.current.value)}>저장하기</button>
      {propList && propList.length > 0 ?
        propList.filter(item => item.editType !== "D").map(item => {
          // 임시 색깔 표시
          let backgroundColor = item.editType === "C"
                  ? 'lightgreen'
                  : item.editType === "R"
                  ? 'lightblue'
                  : item.editType === "U"
                  ? 'pink'
                  : item.editType === "D"
                  ? 'grey'
                  : 'white'
          return <div
          style={{
            backgroundColor: backgroundColor,
            margin: '20px 30%',
            textAlign: 'center',
          }}
          onDragStart={() => dragStart(item.level)}
          onDragEnter={() => dragEnter(item.level)}
          onDragOver={e => e.preventDefault()}
          onDragEnd={drop}
          key={item.level}
          draggable>
          {/* 임시 위치 표시*/}
          <p>{item.level}</p>
          <PropTest key={item.level} level={item.level}
            propType={item.propType}
            propVal={item.propVal}
            setType={setType}
            setVal={setVal}
          />
          <br/>
          <button onClick={() => onRemove(item.level)}>제거하기</button>
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