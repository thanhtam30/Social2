import React, { useEffect,useState}from "react";

import { connect } from "react-redux";
import { listpost} from "../../../actions/postAction";
import {Row,Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import './listproduc.scss'
import { Button } from "@material-ui/core";
const ListPost = props => {
  const [active,setactive]=useState(1);
  
const {listpost}=props;
 useEffect(()=>{
   listpost();
 },[listpost]);
 const post=props.post.posts


  return (
    <div className='row'>
        {post.map((post,index)=>(
          <div key={index}  className='col-md-4 Product'>
             <div className='Product__Detail'>{post.Detail}</div>
          {post.Image===undefined ||post.Image.length===0?
            <img  src={'../upload/noimage/noimage.jpg'}></img>:
            <img  src={`../upload/post/${post.Image[post.Image.length-1]}`}></img>
          }
        
        {/* <button

                    className="btn btn-info Product__add-to-cart">Add to cart
                </button> */}
          </div>
        ))}
    </div>
  
  );
};
const mapStateToProps = state => {
  return {
    post: state.post,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { listpost }
)(ListPost);
