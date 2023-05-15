import React from 'react';
import Frame from '../components/Frame';
import AnimatedGif from '../components/AnimatedGif ';

function Chamcham(){
	return (
			<>
				{/* <Proverb /> */}
				<Frame color={"#000000"} />
				<div style={{height: 330}}></div>
				<div style={{textAlign:'center'}}>
					<div style={{width: 837, height: 373, backgroundImage : `url(images/titletext.png)`, marginLeft: 100, color: 'black'}}>
						dsfdsfsfsdfsdsdfdsf
					</div>
					<AnimatedGif />
				</div>
			</>
		);
}
export default Chamcham;