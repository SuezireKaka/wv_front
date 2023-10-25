import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
export default function Test1() {

  return (
  <>
      <Carousel  fade>
      
      <Carousel.Item>
   
          <div className='slidercontents'>
              <div className='wrapText'>
                  <h1>시작화면 넘기기1</h1>
                  <h1>asdfadsfg</h1>
                  <div className="d-none d-md-block">
                      <pre>1111111111111111111111111<br/>
                        1111111111111111<br/>
                        11111111111111111<br/>
                      </pre>
                  </div>
  
              </div>
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='slidercontents'>
              <div className='wrapText'>
                  <h1>시작화면 넘기기2</h1>
                  <div className="d-none d-md-block">
                      <pre>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ<br/>
                        ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ<br/>
                        ㅁㅁㅁㅁㅁㅁㅁㅁ<br/>
  
                      </pre>
                  </div>
   
              </div>
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='slidercontents'>
              <div className='wrapText'>
                  <h1>시작화면 넘기기3</h1>
                  <div className="d-none d-md-block">
                      <pre>ㅁㄴㅇㄹ654ㅇㅁㄴ56ㄹ0<br/>
                        ㅁㄴㅇㄹ654ㅇㅁㄴ56ㄹ0ㅁㅇㄴ<br/>
                        ㅁㄴㅇㄹ1654<br/>
  
                      </pre>
                  </div>
   
              </div>
          </div>
      </Carousel.Item>
  </Carousel>
</>
)
}
