import React, { useEffect, useState } from "react";
import { BASEURL } from "../utils/URL";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";
function UserStore() {
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [store, setStore] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [storeId, setStoreId] = useState("");
  const openProductModal = () => {
    setIsProductModal(true);
  };
  const closeProductModal = () => {
    setIsProductModal(false);
  };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const openShowProduct = () => {
    setShowProductModal(true);
  };
  const closeShowProduct = () => {
    setShowProductModal(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const getProducts = async () => {
    const result = await axios.get(`${BASEURL}/store/getProduct/${storeId}`);
    if (result.status == 200) {
      toast.success("products fetched");
    }
  };
  const getStores = async () => {
    const result = await axios.get(`${BASEURL}/store/getStores/${userId}`);
    if (result.status == 200) {
      console.log(result);
      setStore(result.data.stores);
    }
  };
  const createStore = async () => {
    const result = await axios.post(`${BASEURL}/store/createStore`, {
      storeName: name,
      address: address,
      userId: userId,
    });
    if (result.status == 200) {
      toast.success("store created");
      getStores();
      closeModal();
    }
  };
  const addProduct = async () => {
    const result = await axios.post(`${BASEURL}/store/addProduct`, {
      name: productName,
      price: price,
      storeId: storeId,
    });
    console.log(result);
    if (result.status == 200) {
      toast.success("product added");
      closeProductModal();
      getStores();
    }
  };
  useEffect(() => {
    getStores();
  }, []);

  return (
    <div>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name
            </th>
            {/* <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          User Name
        </th> */}
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Address
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Products
            </th>
            {/* <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          Mobile
        </th> */}
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              <div className="flex flex-row justify-around">
                <p>Actions</p>
                <button
                  className="bg-white text-gray-600 rounded-md p-1"
                  onClick={openModal}
                >
                  Add Store
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {store &&
            store.map((item, index) => {
              return (
                <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Name
                    </span>
                    {item?.storeName}
                  </td>
                  {/* <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
              <span className="inline-block w-1/3 md:hidden font-bold">
                User Name
              </span>
              ecampbell088
            </td> */}
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Address
                    </span>
                    {item?.address}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      products
                    </span>
                    <select id="stores" name="stores">
                      {item?.products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  {/* <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Mobile
                </span>
                {item?.phone}
              </td> */}
                  <td className="p-2 md:border md:border-grey-500 text-left  md:table-cell flex flex-row justify-center">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Actions
                    </span>
                    <button
                      onClick={() => {
                        openProductModal();
                        setStoreId(store[index]._id);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                    >
                      Add Product
                    </button>

                    {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
                      Delete
                    </button> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal
        isOpen={showProductModal}
        onRequestClose={closeShowProduct}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-500 opacity-75"
      >
        <div className="modal-content bg-white w-1/3 rounded-lg shadow-lg p-4 text-black flex flex-col justify-center items-center">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Name
                </th>
                {/* <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          User Name
        </th> */}
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  price
                </th>
                {/* <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
          Mobile
        </th> */}
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {products &&
                products.map((item, index) => {
                  return (
                    <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span className="inline-block w-1/3 md:hidden font-bold">
                          Name
                        </span>
                        {item?.name}
                      </td>

                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span className="inline-block w-1/3 md:hidden font-bold">
                          price
                        </span>
                        {item?.price}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal>
      <Modal
        isOpen={isProductModal}
        onRequestClose={closeProductModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-500 opacity-75"
      >
        <div className="modal-content bg-white w-1/3 rounded-lg shadow-lg p-4 text-black flex flex-col justify-center items-center">
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            placeholder="Product Name"
            className="appearance-none block w-60 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></input>
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="Price"
            className="appearance-none block w-60 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></input>

          <div className="flex flex-row gap-5">
            <button
              onClick={() => {
                addProduct();
              }}
              className="bg-green-300 hover:text-gray-800 text-white border-black rounded-md p-2 mt-2  text-xl right-0"
            >
              Submit
            </button>
            <button
              onClick={closeProductModal}
              className="bg-gray-600 hover:text-gray-800 text-white border-black rounded-md p-2 mt-2  text-xl right-0"
            >
              close
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-500 opacity-75"
      >
        <div className="modal-content bg-white w-1/3 rounded-lg shadow-lg p-4 text-black flex flex-col justify-center items-center">
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            className="appearance-none block w-60 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></input>
          <input
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address"
            className="appearance-none block w-60 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></input>

          <div className="flex flex-row gap-5">
            <button
              onClick={() => {
                createStore();
              }}
              className="bg-green-300 hover:text-gray-800 text-white border-black rounded-md p-2 mt-2  text-xl right-0"
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-600 hover:text-gray-800 text-white border-black rounded-md p-2 mt-2  text-xl right-0"
            >
              close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserStore;
