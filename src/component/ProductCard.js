export default function ProductCard (props) {
    return (
        <div className="card" key={props.item.productId} style={{backgroundColor:"#3B3B3B",color:"white",width: "30rem", marginLeft: "12px", marginTop:"5px", marginBottom:"5px"}}>    
            <div className="card-body">
                <h3 className="card-title">Name: {props.item.name}</h3>
                <p className="card-text">Product Id: {props.item.productId}</p>
                <p className="card-text">Launch Date: {props.item.launchDate.slice(0,10)}</p>
                <p className="card-text">Amount (USD): {props.item.srp}</p>
                <p className="card-text">Category Id: {props.item.category_id}</p>
                <p className="card-text">Category: {props.item.category_name}</p>
                <p className="card-text">Supplier: {props.item.supplier_name}</p>
                <button className="btn btn-secondary" style={{border:"1px", marginRight:"8px"}} onClick={()=>props.updatefunction(props.item.productId)}> Edit </button>
                <button className="btn btn-danger" style={{border:"1px"}} onClick={()=>props.deletefunction(props.item.productId)}> Delete </button>
            </div>
        </div>
    )
        
}