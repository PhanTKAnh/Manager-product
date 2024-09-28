import {useEffect, useState} from "react"
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getProductList } from "../../services/ProductServies";
function ProductList(props){
    const {reload} = props;
    const [data,setData] = useState([]);
    const [editReload,setEditReload] = useState(false);
    const handleReload = () => {
        setEditReload(!editReload)
    }

    useEffect(()=> {
        const fectchApi = async () => {
            const result = await getProductList();
            setData(result.reverse());
        }
        fectchApi();
    },[reload,editReload]);
    console.log(data)
    return (
        <>
        <divv className="product__list">
            {data.map(item =>( 
                <div className="product__item" key={item.id}>
                    <div className="product__image">
                    <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <h4 className="product__title">{item.title}</h4>
                    <p className="product__price">{item.price}$</p>
                    <p className="product__discount">{item.discountPercentage}%</p>
                    <EditProduct onReload={handleReload} item={item} />
                    <DeleteProduct  onReload={handleReload} item={item} />
                </div>
            ))}
        </divv>

        </>
    )
}
export default ProductList