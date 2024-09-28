import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { deleteProduct } from '../../services/ProductServies';


function DeleteProduct(props) {
    const { item, onReload } = props;
    const deleteItem = async () => {
        const result = await deleteProduct(item.id);
        if(result){
            onReload();
            Swal.fire({
                title: "Đã xóa!",
                text: "Bạn đã xóa thành công.",
                icon: "success"
            });

        }
       


    }

    const handleDelete =() => {
        // console.log(item.id);
        Swal.fire({
            title: " bạn có chắc muốn xóa không ?",
            text: "Nếu bạn xóa bạn sẽ không khôi phục được !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vẫn xóa",
            cancelButtonText: "Huy"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteItem();
            }
        });
    }
    return (
        <>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}
export default DeleteProduct