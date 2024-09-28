import { useEffect, useState } from "react"
import Modal from 'react-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { editProduct } from "../../services/ProductServies";
import { getCategory } from "../../services/categoryServies";

function EditProduct(props) {
  const { item, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(item);
  const [dataCategory, setDataCategory] = useState([]);
  useEffect( async () => {
    const result = await getCategory();
    
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const handleOnchange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value
    });
  }

  const openModal = () => {
    console.log(item);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await editProduct(item.id, data)
    if (result) {
      setShowModal(false);
      onReload();
      Swal.fire({
        icon: "success",
        title: "Bạn đã tạo mới thành công ",
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <>
      <button onClick={openModal}> Chỉnh sửa</button>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Tiêu đề </td>
                <td>
                  <input type="text" name="title" onChange={handleOnchange} value={data.title} required />
                </td>
              </tr>
              {dataCategory.length > 0 && (<tr>
                <td>Danh mục </td>
                <td>
                  <select name='category' onChange={handleOnchange} value={data.category}>
                    {dataCategory.map((item, index) => (
                      <option key={index} value={item}>{item}</option>

                    ))}
                  </select>
                </td>
              </tr>)}
              <tr>
                <td>Giá </td>
                <td>
                  <input type="text" name="price" onChange={handleOnchange} value={data.price} required />
                </td>
              </tr>
              <tr>
                <td>Giảm giá </td>
                <td>
                  <input type="text" name="discountPercentage" onChange={handleOnchange} value={data.discountPercentage} required />
                </td>
              </tr>
              <tr>
                <td>Số lượng còn lại </td>
                <td>
                  <input type="text" name="stock" onChange={handleOnchange} value={data.stock} required />
                </td>
              </tr>
              <tr>
                <td>Đường dẩn ảnh </td>
                <td>
                  <input type="text" name="thumbnail" onChange={handleOnchange} value={data.thumbnail} required />
                </td>
              </tr>
              <tr>
                <td>Mô tả </td>
                <td>
                  <textarea rows={4} name="description" onChange={handleOnchange} value={data.description} />
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={closeModal}>Hủy </button>
                </td>
                <td><input type="submit" value="Cập nhật" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  )
}
export default EditProduct