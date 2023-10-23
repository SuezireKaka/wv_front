import React, { useState } from 'react';
import PopupDom from './PopupDom ';
import { ZipCode } from './ZipCode';
 
const DaumTest = ({setAddress=f=>f}) => {
	// 팝업창 상태 관리
    const [postButtonText, setPostButtonText] = useState("우편번호 검색")
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 팝업창 열기
    const openPostCode = () => {
        if(isPopupOpen==false){
            setIsPopupOpen(true)
            setPostButtonText("닫기")}
        else{
            setIsPopupOpen(false)
            setPostButtonText("우편번호 검색")
        }
    }

    return(
        <div>
        	
            <button type='button' onClick={openPostCode}>{postButtonText}</button>
            
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <ZipCode setAddress={setAddress} />
                    </PopupDom>
                )}
            </div>
        </div>
    )
}
 
export default DaumTest;