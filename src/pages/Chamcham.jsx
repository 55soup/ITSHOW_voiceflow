import React from 'react';
import Frame from '../components/Frame';
import Spacemotion from '../image/spacemotion.gif'
function Chamcham(){
	return (
			<>
				{/* <Proverb /> */}
				<Frame color={"#000000"} />
				<div style={{textAlign:'center',}}><img src={Spacemotion} style={{width:838, height:621, zIndex:-3}}/></div>
			</>
		);
}
export default Chamcham;