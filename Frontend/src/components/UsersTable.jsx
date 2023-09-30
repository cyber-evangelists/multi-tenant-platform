import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { BASEURL } from "../utils/URL";
import { toast } from "react-toastify";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [numberOfStores, setNumberOfStores] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const getUsers = async () => {
    const result = await axios.get(`${BASEURL}/user/getUsers`);
    console.log(result.data);
    setUsers(result.data.users);
  };
  const createUser = async () => {
    const result = await axios.post(`${BASEURL}/user/createUser`, {
      email: email,
      name: name,
      numberOfStores: numberOfStores,
    });
    if (result.status == 200) {
      toast.success("User Added");
      getUsers();
      closeModal();
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
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
              Email Address
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
                  Add User
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {users &&
            users.map((item, index) => {
              return (
                <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Name
                    </span>
                    {item?.name}
                  </td>
                  {/* <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    User Name
                  </span>
                  ecampbell088
                </td> */}
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Email Address
                    </span>
                    {item?.email}
                  </td>
                  {/* <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Mobile
                    </span>
                    {item?.phone}
                  </td> */}
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Actions
                    </span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="appearance-none block w-60 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></input>
          <input
            type="number"
            onChange={(e) => {
              setNumberOfStores(e.target.value);
            }}
            placeholder="No of stores"
            className="appearance-none block w-60 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></input>
          <div className="flex flex-row gap-5">
            <button
              onClick={() => {
                createUser();
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
    </>
  );
}

export default UsersTable;
