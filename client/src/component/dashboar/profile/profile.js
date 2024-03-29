
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { previewUser } from "../../../actions/profileAction";
import { getpostprofile } from "../../../actions/postAction";
import Postprofile from './rightprofile/postprofile';
import {Link} from 'react-router-dom';
import './profile.scss'
const DashBoar = props => {
  const { profile } = props.profile;
  // const { listpost } = props;
  // useEffect(() => {
  // listpost && listpost();
  // }, [listpost]);
  const {getpostprofile,previewUser}=props;
  const id=props.match.params.id;
  useEffect(() => {
    if (id) {
      getpostprofile(id);      
    }
  }, [getpostprofile,id]);
 
  useEffect( () => {
      previewUser(id);
  }, [id,previewUser]);
  useEffect(() => {
    if(!id){
      getpostprofile(id)
    }
}, [getpostprofile,id]);
  const post=props.post.post

  return (
    <div className='row'>
      <div className='profile'>
      <div className='profile__img'>{}
      <img alt=''  src={"../upload/avatar/defaultBcg.jpeg"}/>
      </div>
        
        <div className='row'>
                  <div  className='profile__imageprofile'>
               
                {(profile.Image===undefined) ?
                  
                  <img
                  src={`../upload/noimage/noimage.jpg`}
                  alt=''
                />:<img
                  src={`../upload/user/${profile.Image[profile.Image.length-1]}`}
                  alt=''
                /> }
                  </div>

                </div>
         <div className='row'>
           <div className='col-sm-5'>
           <div className='profile__profileleft'> 
           <div className='row'>
            <div className="profile__profileleft--profilefullName">{profile.fullName}</div>
         </div>
         <div className='row'>
         <div className="profile__profileleft--emailprofile">{profile.email}</div>
         </div>
         <div className='row'>
         {props.match.params.id===props.user.user.id?<div className="profile__profileLink">
           <Link to={`/UpdateProfile/${profile._id}`}>Edit<i className="far fa-edit"></i></Link>
         </div>:''}
         
         </div>
         <div className='row'>
        <div className='profile__profileleft--Detail'>
            Status:{profile.Status ?profile.Status:'Không có '}
        </div>
      </div>
      <div className='row'>
        <div className='profile__profileleft--Detail'>
            Adress:{profile.Address ?profile.Address:'Không có thông tin'}
        </div>
      </div>
      <div className='row'>
        <div className='profile__profileleft--Detail'>
            Phone:{profile.Phone ?profile.Phone:'Không có thông tin'}
        </div>
      </div>

      <div className='row'>
        <div className='profile__profileleft--Detail'>
          Hình Ảnh
        </div>
      </div>
          <div className='row'>
          {(post.length)>0 ?post.map((post,index)=>(
          <div key={index} className='col-sm-4'>
            
              <div key={index} className='profile__profileleft--Imageprofile'>
            
                <img src={`../upload/post/${post.Image[post.Image.length-1]}`} alt=''/>
              </div>
            
            
          </div>
          )):''}
          </div>
           </div>
         
           </div>
           <div className='col-sm-7'>
           <div className='profilerightname'>
           <Postprofile 
           profile={props.post.post}
      
           />
           </div>
         
           </div>
         </div>
        
      </div>
     
    </div>
    
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile,
    post: state.post
  };
};
export default connect(
  mapStateToProps,
  { previewUser, getpostprofile }
)(DashBoar);
