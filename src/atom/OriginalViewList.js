import React, { useState } from 'react';
import axios from 'api/axios';
import { AxiosPost } from 'toolbox/Fetch';
import OriginalFileView from './OriginalFileView';

//개량판
export default function OriginalViewList({ imgDtoList, x, y }) {
    console.log("ThumbnailList render ", imgDtoList);

    const thumbnailRequestTarget = ["video", "image"];

    function renderImg(afdto, blob) {
        const thumbFile = new File([blob.data], "image");
        const imgUrl = (window.URL || window.webkitURL).createObjectURL(thumbFile);
        return  <img src={imgUrl} width={x} height={y}/>
    }

    return <>
        {imgDtoList?.map(afdto => {
            if (thumbnailRequestTarget.includes(afdto.contentType)) {
                return <AxiosPost uri={`/attach/anonymous/getOriginalFile`} body={afdto}
                    renderSuccess={renderImg} />
            } else if (afdto.contentType === "audio") {
                const imgUrl = process.env.PUBLIC_URL + "/images/audio.png";
                return <img src={imgUrl} />;
            } else {
                const imgUrl = process.env.PUBLIC_URL + "/images/unknown.png";
                return <img src={imgUrl} />;
            }
        })}
    </>
}
