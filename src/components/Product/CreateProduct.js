import { useEffect, useState } from "react"
import Modal from 'react-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { getCategory } from "../../services/categoryServies";
import { createProduct } from "../../services/ProductServies";

function CreateProduct(props) {
  const {onReload} = props;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [dataCategory, setDataCategory] = useState([]);
  useEffect(() => {
    const fectchApi = async () => {
      const  result = await getCategory();
          setDataCategory(result);
    }
    fectchApi();
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
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  const result = await createProduct(data);
    if(result){
      setShowModal(false);
      onReload();
      Swal.fire({
        icon: "success",
        title: "cập nhật sản phảm thành công ",
        showConfirmButton: false,
        timer: 1500
      })
    }

  }
  return (
    <>
      <button onClick={openModal}> + tạo một sản phảm mới</button>
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
                  <input type="text" name="title" onChange={handleOnchange} required />
                </td>
              </tr>
              {dataCategory.length > 0 && (<tr>
                <td>Danh mục </td>
                <td>
                  <select name='category' onChange={handleOnchange}>
                    {dataCategory.map((item, index) => (
                      <option key={index} value={item}>{item}</option>

                    ))}
                  </select>
                </td>
              </tr>)}
              <tr>
                <td>Giá </td>
                <td>
                  <input type="text" name="price" onChange={handleOnchange} required />
                </td>
              </tr>
              <tr>
                <td>Giảm giá </td>
                <td>
                  <input type="text" name="discountPercentage" onChange={handleOnchange} required />
                </td>
              </tr>
              <tr>
                <td>Số lượng còn lại </td>
                <td>
                  <input type="text" name="stock" onChange={handleOnchange} required />
                </td>
              </tr>
              <tr>
                <td>Đường dẩn ảnh </td>
                <td>
                  <input type="text" name="thumbnail" onChange={handleOnchange} required />
                </td>
              </tr>
              <tr>
                <td>Mô tả </td>
                <td>
                  <textarea rows={4} name="description" onChange={handleOnchange} />
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={closeModal}>Hủy </button>
                </td>
                <td><input type="submit" value="Tạo mới" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  )
}
export default CreateProduct