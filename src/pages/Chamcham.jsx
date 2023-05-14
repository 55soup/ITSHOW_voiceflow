import React from 'react';
import Frame from '../components/Frame';
import Spacemotion from '../image/spacemotion.gif'
import AnimatedGif from '../components/AnimatedGif ';

function Chamcham(){
	return (
			<>
				{/* <Proverb /> */}
				<Frame color={"#000000"} />
				<div style={{textAlign:'center',}}>
					{/* <img src={Spacemotion} style={{width:909, height:621, zIndex:-3, marginTop: 590}}/> */}
					<AnimatedGif />
					</div>
			</>
		);
}
export default Chamcham;