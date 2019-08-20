import React, { useEffect }from "react";
let slides = [
  {
    background: "https://ununsplash.imgix.net/photo-1434828927397-62ea053f7a35?dpr=2&fit=crop&fm=jpg&h=700&q=75&w=1050",
    text: "America",
    link: "https://unsplash.com/anthonydelanoix"
  },
  {
    background: "https://images.unsplash.com/photo-1434394673726-e8232a5903b4?q=80&fm=jpg&s=b154bdf22a4885c8e2dd1b845c5fe996",
    text: "Mountains",
    link: "https://unsplash.com/aleskrivec"
  },
  {
    background: "https://images.unsplash.com/photo-1432691301971-c8b920198bd7?q=80&fm=jpg&s=d6b5970179cd2bc77c3b56165da56f80",
    text: "Shore",
    link: "https://unsplash.com/intrepid"
  }
  
]

const Slide = React.createClass({

  render: function(){
    let background = this.props.background;
    let text = this.props.text;
    let link = this.props.link;
    let active = this.props.active;
         
    let slideStyle = {
      backgroundImage: 'url(' + background + ')'  
    };
    
    return(
    <div className="slider__slide" data-active={active} style={slideStyle}>
      <div className="slider__slide__text"><a href={link}>{text}</a></div>
      
      </div>
      );
  }
});

const Slider = React.createClass({
  
  getInitialState : function(){
    return {
      activeSlide: 0
    }  
  },
  
  nextSlide: function(){
    let slide = this.state.activeSlide + 1 < this.props.slides.length ? this.state.activeSlide + 1 : 0;
    this.setState({
      activeSlide: slide
    });
  },
  
  previousSlide: function(){
    let slide = this.state.activeSlide - 1 < 0 ? this.props.slides.length - 1:  this.state.activeSlide - 1;
    this.setState({
      activeSlide: slide
    });
  },
  
  render: function(){
    let slides = this.props.slides;
    
    return(
      <div className="slider">
      {slides.map((slide, index, array) =>
          < Slide background={slide.background} active={index === this.state.activeSlide} /> )}
            <div className="slider__next" onClick={this.nextSlide}><i className="fa fa-4x fa-arrow-circle-right"></i></div>
            <div className="slider__previous" onClick={this.previousSlide}><i className="fa fa-4x fa-arrow-circle-left"></i>
</div>
            </div>
    );
  }
});

React.render(<Slider slides={slides} />, document.getElementById("slider"));

