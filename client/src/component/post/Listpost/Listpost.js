import React, { useEffect, useState }from "react";
import ReactMoment from "react-moment";
import { connect } from "react-redux";
import { listpost, likeandunlike, deletepost,postedit } from "../../../actions/postAction";
import ListComment from "../Listcomment/Listcomment";
import NewPost from "../newpost/newpost";
import NewPost1 from "../newpost/newpost.1";
import NewComment from "../commentpost/newcoment";
import RightPost from '../righpost/rightpost';
import {Link} from 'react-router-dom';
import "./listpost.scss";
import { Button,Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap";
const ListPost = props => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);
  const [isShowing3, setIsShowing3] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  function toggle2() {
    setIsShowing2(!isShowing2);
  }
  function toggle3() {
    setIsShowing3(!isShowing2);
  }
  const posts = props.post.posts;
  const likeandunlike1 = async(id) => {
   await props.likeandunlike(id);
  };
  const deletepost = async(id) => {
    await props.deletepost(id);
    toggle2();
  };

  const { listpost } = props;
  useEffect(() => {
   listpost();
  }, [listpost]);
 
  return (
    <div className="row">
      <div className="Posts">
      <div className='row'>
      {/* <VD/> */}
      <div className="new">
        <Button color="btn btn-link" style={{color:'#009688'}} onClick={toggle}>
          New <i className="fa fa-plus-square" aria-hidden="true" />
        </Button>
        <NewPost isShowing={isShowing} toggle={toggle} />
      </div>
      </div>
        <div className="row">
          <div className="col-sm-8">
                {(posts && posts.length) > 0
                  ? posts.map((post, index) => (
                      <div key={index} className="posts">
                        {(post.User.Image && post.User.Image.length) > 0 ? (
                          <div className='posts__icon'>
                          <img alt=''
                            src={`../upload/user/${
                              post.User.Image[post.User.Image.length - 1]
                            }`}
                            
                          />
                          </div>
                        
                        ) : (
                          <div className='posts__icon'>
                          <img alt=''
                            src={"../upload/noimage/noimage.jpg"}
                            
                          />
                          </div>
                        
                        )}
                        
                        {post.User._id===props.user.user.id?<div>
                          <div className="posts__edit">
                          <Link to={`/EditPost/${post._id}`}><i className="far fa-edit"></i></Link>
                        </div>
                        <div className="posts__delete"  onClick={toggle2}>
                        <Button color='link'><i className="fa fa-trash" aria-hidden="true"></i></Button>
                        <Modal isOpen={isShowing2} toggle={toggle2} >
                          <ModalHeader toggle={toggle}>Delete</ModalHeader>
                          <ModalBody>
                                  Are you sure?
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={deletepost.bind(null,post._id)}>Yes</Button>{' '}
                            <Button color="secondary" onClick={toggle2}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
 
                        </div>
                        </div>
                        :''}
                        
                        <div className="posts__name">
                        <Button color="btn btn-link" style={{color:'#009688'}} onClick={toggle3}>
          New <i className="fa fa-plus-square" aria-hidden="true" />
        </Button>
                        <NewPost1 isShowing3={isShowing3} toggle={toggle3} post={post}/>
                        <span className="posts__name--ten">
                        {post.User.fullName}
                        </span>
                        </div>
                        <div className="posts__time">
                          {<ReactMoment fromNow>{post.Date}</ReactMoment>}
                        </div>
                        <div className="posts__detail">
                          <p>{post.Detail}</p>
                        </div>
                        <div className="posts__image">
                          {(post.Image && post.Image.length) > 0 ? (
                            <img alt='' src={`../upload/post/${post.Image[post.Image.length-1]}`} />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="posts__menu">
                          <button
                            className="posts__menu--button"
                            onClick={likeandunlike1.bind(this,post._id)}
                          >
                            <i className="fas fa-thumbs-up" /> Thích (
                            {post.Like.length})
                          </button>
                          <button className="posts__menu--button">
                            <i className="far fa-comment-alt" /> Bình luận (
                            {post.Comment.length})
                          </button>
                          <button className="posts__menu--button">
                            <i className="fas fa-share-alt" /> Share
                          </button>
                        </div>
                        <div className="comment">
                          <ListComment comment={post.Comment} />
                        </div>
                        <div className="newcomment">
                          <NewComment id={post._id} />
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              <div className="col-sm-4" >
         <RightPost/>
          </div> 
          </div>
          
          
        </div>
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
  { listpost, likeandunlike, deletepost,postedit }
)(ListPost);
