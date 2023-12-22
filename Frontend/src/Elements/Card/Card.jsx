import React from 'react'

function Card(props) {
    return (
        <>
            <div className="card m-2" >
                <div className="card-body">
                    <h5 className="card-title">Comapny : {props.companyName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"> Description: {props.title}</h6>
                    <p className="card-text">Batches Eligible: {props.batchEligible}</p>
                    <a href={props.applyLink} class="card-link">Click Here to Apply</a>
                </div>
            </div>
        </>
    )
}

export default Card