import React from 'react'

function PostCard(props) {
  return (
    <>
      <div className="card m-2" >
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted"> Author: {props.author}</h6>
                    <h6 className="card-subtitle mb-2 text-muted"> Description: <div>{props.story}</div></h6>
                </div>
        </div>
    </>
  )
}

export default PostCard