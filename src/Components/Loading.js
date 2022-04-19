import React from "react";
function Loading() {
  return (
    <div style={blurBackground}>
    <div style={loadingStyle}> </div>
    </div>
  )
  
}

const loadingStyle={
  borderRadius: '50%',
  height: '80px',
  width: '80px',
   backgroundColor: 'transparent',
  left: '50%',
  position: 'fixed',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '3',
  borderWidth:'5px',
  borderStyle: ' solid solid dotted dotted',
  borderColor:'#47b577',
  animation:'loading 2s linear infinite '
}

const blurBackground={
  backgroundColor:'rgba(56, 56, 56 ,0.7)',
  position:'fixed',
  left:'0',
  top:'0',
  height:'100vh',
  width:'100vw',
  zIndex:'2'
}



export default Loading;
