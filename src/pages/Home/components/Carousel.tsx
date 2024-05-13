import React from 'react';
import { Carousel, Image } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '600px',
  color: '#fff',
  width: '100%',
  objectFit: 'cover',
  textAlign: 'center',
  lineHeight: '160px',
  background: '#fff',
};

const App: React.FC = () => (
  <Carousel autoplay={false} dots={true}>
    <div>
      <img style={contentStyle} src="slide1.avif" />
    </div>
    <div>
      <img style={contentStyle} src="slide2.avif" />
    </div>
    <div>
      <img style={contentStyle} src="slide3.avif" />
    </div>
    <div>
      <img style={contentStyle} src="slide4.avif" />
    </div>
  </Carousel>
);

export default App;
