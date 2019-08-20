import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux';
import { listpost} from "../../../actions/postAction";
import './a.css'
function ImageSlideShow(props) {
  const [firstImg,setfirstImg]=useState('');
  useEffect(()=>{
    props.listpost()
  },[props.listpost])
  const post=props.post.posts
let images= ['https://sohanews.sohacdn.com/zoom/434_271/2019/8/16/tai-xuong-1565966619551972663581-crop-15659666254781684725077.jpg','https://sohanews.sohacdn.com/zoom/216_271/2019/8/17/s-400-khai-hoa-1566005392040887353284-crop-15660054219471038238745.gif','https://sohanews.sohacdn.com/zoom/260_162/2019/8/17/photo-2-1566029791991452431465-crop-1566029968382103976308.jpg'];
 var mainImg = firstImg ? firstImg :images[0]
  return (
    <div>
    <div>
            <img className ="focusMainImg" src={mainImg}/>
          </div>
          <div>{images.map((image, key) => {
              return(
         
              	<img key={key} className ={mainImg===image? "selectedThumbnail" :"allThumbnail"}  					
                				src={image} onClick={(e)=>setfirstImg(e.target.src)}/>
                    )})}
          </div>
               
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}
export default connect(mapStateToProps,{listpost})(ImageSlideShow)
