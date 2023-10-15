import React, { useState } from 'react';
import PopupDom from './PopupDom ';
import { ZipCode } from './ZipCode';
 
const DaumTest = ({setAddress=f=>f}) => {
	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
 
    return(
        <div>
        	
            <button type='button' onClick={openPostCode}>우편번호 검색</button>
            
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <ZipCode onClose={closePostCode} setAddress={setAddress} />
                    </PopupDom>
                )}
            </div>
        </div>
    )
}
 
export default DaumTest;