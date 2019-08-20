import React,{useState} from 'react'
import './a.css'
function ImageSlideShow(props) {
    
const [firstImg,setfirstImg]=useState('');
var mainImg = firstImg ? firstImg : props.images[0];
  return (
		<div>
          <div>
            <img className ="focusMainImg" src={mainImg}/>
          </div>
          <div>{props.images.map((image, key) => {
              return(
         
              	<img key={key} className ={mainImg==image? "selectedThumbnail" :"allThumbnail"}  					
                				src={image} onClick={(e)=>setfirstImg(e.target.src)}/>
                    )})}
          </div>

         
    </div>
  )
}

export default ImageSlideShow
